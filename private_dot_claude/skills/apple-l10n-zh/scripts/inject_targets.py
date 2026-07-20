#!/usr/bin/env python3
"""Inject zh-Hans <target> elements into an Xcode-exported XLIFF.

Reads translations from a JSON map (trans-unit id -> target text), inserts a
<target state="translated"> after each matching <source> (matching how Xcode
marks a finished translation), and verifies that every target keeps the same
set of printf-style format specifiers as its source.

Usage:
    python3 inject_targets.py <file.xliff> <translations.json>

translations.json format (omit a key, or use "", to leave it untranslated):
    {
      "Save": "存储",
      "%lld Processes Selected": "已选择 %lld 个进程",
      "Select process\n(Will reset search)": "选择进程\n（将重置搜索）"
    }

Keys are the trans-unit id, XML-unescaped, with real newlines. Target text is
plain (it is XML-escaped on write). Existing <target> elements are left as-is.
After running, confirm the file is well-formed:  xmllint --noout <file.xliff>
"""
import html
import json
import re
import sys
from xml.sax.saxutils import escape

# printf-style format specifier, incl. positional (%1$@) and length mods (%lld).
FORMAT_SPEC = re.compile(
    r"%(?:\d+\$)?[#0\- +']*\d*(?:\.\d+)?(?:hh|h|ll|l|q|L|z|j|t)?[@%diouxXeEfFgGaAcsp]"
)
ID_LINE = re.compile(r'<trans-unit id="(.*)" xml:space="preserve">')
# Xcode indents <source>/<target>/<note> by 8 spaces; match it.
INDENT = " " * 8


def specifiers(text):
    """Sorted format specifiers in text, ignoring the literal %% escape."""
    return sorted(s for s in FORMAT_SPEC.findall(text) if s != "%%")


def inject(xliff_path, translations):
    with open(xliff_path, encoding="utf-8") as f:
        lines = f.readlines()

    out, current_id = [], None
    source_parts, in_source = None, False
    injected, skipped, mismatches = 0, [], []

    for line in lines:
        m = ID_LINE.search(line)
        if m:
            current_id = html.unescape(m.group(1))
            source_parts, in_source = None, False

        # Capture source text: single-line, self-closing, or multi-line.
        if "<source/>" in line:
            source_text = ""
        elif "<source>" in line and "</source>" in line:
            source_text = html.unescape(
                re.search(r"<source>(.*)</source>", line, re.S).group(1)
            )
        elif "<source>" in line:
            in_source, source_parts, source_text = True, [line.split("<source>", 1)[1]], None
        elif in_source and "</source>" in line:
            source_parts.append(line.split("</source>", 1)[0])
            source_text, in_source = html.unescape("".join(source_parts)), False
        else:
            source_text = None

        out.append(line)
        if "<target" in line:  # respect any target already present in the file
            continue

        source_ended = ("<source/>" in line) or ("</source>" in line and not in_source)
        if source_ended and current_id is not None:
            target = translations.get(current_id, "")
            if target:
                if source_text is not None and specifiers(source_text) != specifiers(target):
                    mismatches.append((current_id, specifiers(source_text), specifiers(target)))
                out.append(f'{INDENT}<target state="translated">{escape(target)}</target>\n')
                injected += 1
            elif not current_id.startswith("CFBundle") and current_id not in ("", "NSHumanReadableCopyright"):
                skipped.append(current_id)
            current_id = None

    with open(xliff_path, "w", encoding="utf-8") as f:
        f.writelines(out)

    print(f"injected {injected} target(s); {len(skipped)} unit(s) left untranslated")
    if mismatches:
        print("\nPLACEHOLDER MISMATCHES (fix — these break the app at runtime):")
        for cid, src, tgt in mismatches:
            print(f"  id={cid!r}\n    source={src}\n    target={tgt}")
        return 1
    print("placeholder parity: OK")
    return 0


def main():
    if len(sys.argv) != 3:
        sys.exit("usage: python3 inject_targets.py <file.xliff> <translations.json>")
    xliff_path, json_path = sys.argv[1], sys.argv[2]
    try:
        with open(json_path, encoding="utf-8") as f:
            translations = json.load(f)
    except (OSError, json.JSONDecodeError) as e:
        sys.exit(f"cannot read translations JSON: {e}")
    if not isinstance(translations, dict):
        sys.exit("translations JSON must be an object mapping id -> target string")
    sys.exit(inject(xliff_path, translations))


if __name__ == "__main__":
    main()
