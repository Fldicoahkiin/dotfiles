import importlib.util
import tempfile
import unittest
from pathlib import Path


SCRIPT_PATH = Path(__file__).parents[1] / "scripts" / "inject_targets.py"
SPEC = importlib.util.spec_from_file_location("inject_targets", SCRIPT_PATH)
INJECT_TARGETS = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(INJECT_TARGETS)


def xliff(unit):
    return f'''<?xml version="1.0" encoding="UTF-8"?>
<xliff version="1.2">
  <file source-language="en" target-language="zh-Hans">
    <body>
{unit}
    </body>
  </file>
</xliff>
'''


class InjectTargetsTest(unittest.TestCase):
    def run_inject(self, content, translations):
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "test.xliff"
            path.write_text(content, encoding="utf-8")
            result = INJECT_TARGETS.inject(path, translations)
            return result, path.read_text(encoding="utf-8")

    def test_inserts_missing_target(self):
        content = xliff(
            '''      <trans-unit id="Save" xml:space="preserve">
        <source>Save</source>
        <note/>
      </trans-unit>'''
        )

        result, updated = self.run_inject(content, {"Save": "存储"})

        self.assertEqual(result, 0)
        self.assertIn('<target state="translated">存储</target>', updated)

    def test_leaves_existing_target_unchanged(self):
        content = xliff(
            '''      <trans-unit id="Save" xml:space="preserve">
        <source>Save</source>
        <target state="translated">存储</target>
        <note/>
      </trans-unit>'''
        )

        result, updated = self.run_inject(content, {"Save": "另存"})

        self.assertEqual(result, 0)
        self.assertEqual(updated, content)
        self.assertEqual(updated.count("<target"), 1)

    def test_mismatch_does_not_modify_file(self):
        content = xliff(
            '''      <trans-unit id="Process %@" xml:space="preserve">
        <source>Process %@</source>
        <note/>
      </trans-unit>'''
        )

        result, updated = self.run_inject(content, {"Process %@": "进程"})

        self.assertEqual(result, 1)
        self.assertEqual(updated, content)

    def test_non_string_translation_does_not_modify_file(self):
        content = xliff(
            '''      <trans-unit id="Save" xml:space="preserve">
        <source>Save</source>
        <note/>
      </trans-unit>'''
        )

        result, updated = self.run_inject(content, {"Save": 0})

        self.assertEqual(result, 1)
        self.assertEqual(updated, content)

    def test_accepts_positional_reordering(self):
        content = xliff(
            '''      <trans-unit id="%lld %@" xml:space="preserve">
        <source>%lld %@</source>
        <note/>
      </trans-unit>'''
        )

        result, updated = self.run_inject(
            content,
            {"%lld %@": "%2$@：%1$lld"},
        )

        self.assertEqual(result, 0)
        self.assertIn("%2$@：%1$lld", updated)

    def test_rejects_wrong_positional_types(self):
        content = xliff(
            '''      <trans-unit id="%lld %@" xml:space="preserve">
        <source>%lld %@</source>
        <note/>
      </trans-unit>'''
        )

        result, updated = self.run_inject(
            content,
            {"%lld %@": "%1$@：%2$lld"},
        )

        self.assertEqual(result, 1)
        self.assertEqual(updated, content)

    def test_preserves_named_plural_token(self):
        content = xliff(
            '''      <trans-unit id="Count" xml:space="preserve">
        <source>%#@items@</source>
        <note/>
      </trans-unit>'''
        )

        result, updated = self.run_inject(content, {"Count": "%#@items@ 个项目"})

        self.assertEqual(result, 0)
        self.assertIn("%#@items@ 个项目", updated)

    def test_inserts_after_multiline_source(self):
        content = xliff(
            '''      <trans-unit id="Two lines" xml:space="preserve">
        <source>First line
Second line</source>
        <note/>
      </trans-unit>'''
        )

        result, updated = self.run_inject(content, {"Two lines": "第一行\n第二行"})

        self.assertEqual(result, 0)
        self.assertIn("<target state=\"translated\">第一行\n第二行</target>", updated)


if __name__ == "__main__":
    unittest.main()
