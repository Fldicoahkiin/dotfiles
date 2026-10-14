#!/usr/bin/env python3
"""Inject zh-Hans <target> elements into an Xcode-exported XLIFF.

Read translations from a JSON map (trans-unit id -> target text), insert a
missing <target state="translated"> after each matching <source>, and verify
that source and target use the same format arguments. Existing targets are
left unchanged. If validation fails, the input file is not modified.

Usage:
    python3 inject_targets.py <file.xliff> <translations.json>

translations.json format (omit a key, or use "", to leave it untranslated):
    {
      "Save": "存储",
      "%lld Processes Selected": "已选择 %lld 个进程",
      "Select process\n(Will reset search)": "选择进程\n（将重置搜索）"
    }

Keys are XML-unescaped trans-unit ids with real newlines. Target text is plain
text and is XML-escaped on write. After running, verify the result with:
    xmllint --noout <file.xliff>
"""

import html
import json
import os
import re
import stat
import sys
import tempfile
from xml.sax.saxutils import escape


FORMAT_TOKEN = re.compile(
    r"%#@[^@]+@|"
    r"%(?:\d+\$)?[#0\- +']*\d*(?:\.\d+)?"
    r"(?:hh|h|ll|l|q|L|z|j|t)?[@%diouxXeEfFgGaAcsp]"
)
UNIT = re.compile(
    r"^[ \t]*<trans-unit\b.*?^[ \t]*</trans-unit>(?:\r?\n|$)",
    re.MULTILINE | re.DOTALL,
)
UNIT_ID = re.compile(r'<trans-unit\b[^>]*\bid="([^"]*)"')
SOURCE = re.compile(
    r"(?P<indent>^[ \t]*)<source(?P<body>/>|>.*?</source>)"
    r"(?P<newline>\r?\n|$)",
    re.MULTILINE | re.DOTALL,
)
TARGET = re.compile(r"<target(?:\s|>)")


def specifiers(text):
    """Return argument-indexed format tokens, allowing positional reordering."""
    parsed = []
    next_position = 1
    for match in FORMAT_TOKEN.finditer(text):
        token = match.group(0)
        if token == "%%":
            continue
        if token.startswith("%#@"):
            parsed.append(("named", token))
            continue

        position_match = re.match(r"%(?:(\d+)\$)?(.*)", token, re.DOTALL)
        explicit_position, remainder = position_match.groups()
        if explicit_position is None:
            position = next_position
            next_position += 1
        else:
            position = int(explicit_position)
        parsed.append((position, f"%{remainder}"))
    return sorted(parsed, key=lambda item: (str(item[0]), item[1]))


def source_text(source_match):
    body = source_match.group("body")
    if body == "/>":
        return ""
    return html.unescape(body[1 : -len("</source>")])


def write_atomic(path, content):
    directory = os.path.dirname(os.path.abspath(path))
    mode = stat.S_IMODE(os.stat(path).st_mode)
    descriptor, temporary_path = tempfile.mkstemp(
        prefix=f".{os.path.basename(path)}.",
        dir=directory,
        text=True,
    )
    try:
        with os.fdopen(descriptor, "w", encoding="utf-8", newline="") as file:
            file.write(content)
        os.chmod(temporary_path, mode)
        os.replace(temporary_path, path)
    finally:
        if os.path.exists(temporary_path):
            os.unlink(temporary_path)


def inject(xliff_path, translations):
    with open(xliff_path, encoding="utf-8", newline="") as file:
        original = file.read()

    injected = 0
    skipped = []
    mismatches = []
    invalid = []

    def rewrite(unit_match):
        nonlocal injected
        unit = unit_match.group(0)
        id_match = UNIT_ID.search(unit)
        if id_match is None:
            return unit

        unit_id = html.unescape(id_match.group(1))
        if TARGET.search(unit):
            return unit

        target = translations.get(unit_id, "")
        if not isinstance(target, str):
            invalid.append((unit_id, type(target).__name__))
            return unit
        if not target:
            if not unit_id.startswith("CFBundle") and unit_id not in (
                "",
                "NSHumanReadableCopyright",
            ):
                skipped.append(unit_id)
            return unit
        source_match = SOURCE.search(unit)
        if source_match is None:
            invalid.append((unit_id, "missing <source>"))
            return unit

        source_specifiers = specifiers(source_text(source_match))
        target_specifiers = specifiers(target)
        if source_specifiers != target_specifiers:
            mismatches.append((unit_id, source_specifiers, target_specifiers))
            return unit

        newline = source_match.group("newline") or "\n"
        target_line = (
            f'{source_match.group("indent")}<target state="translated">'
            f"{escape(target)}</target>{newline}"
        )
        insertion_point = source_match.end()
        if not source_match.group("newline"):
            target_line = newline + target_line
        injected += 1
        return unit[:insertion_point] + target_line + unit[insertion_point:]

    updated = UNIT.sub(rewrite, original)

    if invalid:
        print("INVALID TRANSLATIONS (input file was not changed):")
        for unit_id, reason in invalid:
            print(f"  id={unit_id!r}: {reason}")
        return 1

    if mismatches:
        print("PLACEHOLDER MISMATCHES (input file was not changed):")
        for unit_id, source, target in mismatches:
            print(f"  id={unit_id!r}\n    source={source}\n    target={target}")
        return 1

    if injected:
        write_atomic(xliff_path, updated)

    print(f"injected {injected} target(s); {len(skipped)} unit(s) left untranslated")
    print("placeholder parity: OK")
    return 0


def main():
    if len(sys.argv) != 3:
        sys.exit("usage: python3 inject_targets.py <file.xliff> <translations.json>")
    xliff_path, json_path = sys.argv[1], sys.argv[2]
    try:
        with open(json_path, encoding="utf-8") as file:
            translations = json.load(file)
    except (OSError, json.JSONDecodeError) as error:
        sys.exit(f"cannot read translations JSON: {error}")
    if not isinstance(translations, dict):
        sys.exit("translations JSON must be an object mapping id -> target string")
    sys.exit(inject(xliff_path, translations))


if __name__ == "__main__":
    main()
