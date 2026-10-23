"""构建官网时，把 SKILL.md 的版本号和 CHANGELOG.md 的最近几条记录注入到站点副本的 content.js。

用法：python inject_site.py <站点目录>
"""
import json
import re
import sys
from pathlib import Path

MAX_ENTRIES = 5

site = Path(sys.argv[1])
root = Path(__file__).resolve().parents[2]

skill = (root / ".claude/skills/resume-database/SKILL.md").read_text(encoding="utf-8")
version = re.search(r"^version:\s*(\S+)", skill, re.M).group(1)

entries = []
current = None
for line in (root / "CHANGELOG.md").read_text(encoding="utf-8").splitlines():
    m = re.match(r"^## \[([^\]]+)\] - (\S+)", line)
    if m:
        if len(entries) >= MAX_ENTRIES:
            break
        current = {"version": m.group(1), "date": m.group(2), "items": []}
        entries.append(current)
    elif current is not None and line.startswith("- "):
        current["items"].append(line[2:].replace("`", "").strip())

patch = (
    "\n;(function(){var C=window.SITE_CONTENT;"
    f"C.version={json.dumps(version)};"
    "C.screens.forEach(function(s){if(s.id==='changelog')s.changelog="
    f"{json.dumps(entries, ensure_ascii=False)};}});}})();\n"
)
with open(site / "content.js", "a", encoding="utf-8") as f:
    f.write(patch)
print(f"已注入 v{version}，更新记录 {len(entries)} 条")
