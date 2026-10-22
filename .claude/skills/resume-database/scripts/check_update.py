#!/usr/bin/env python3
"""
检查 skill 是否有新版本。

由 generate_resume.py、tracker.py 在运行结束时调用。设计原则：
- 查不到就不提示：断网、超时、被限流、版本号解析失败，一律静默
- 不拖慢脚本：请求超时 2 秒，结果缓存，成功缓存 24 小时、失败缓存 6 小时
- 不污染标准输出：提示写到 stderr
- 可关闭：设置环境变量 RESUME_DATABASE_NO_UPDATE_CHECK=1
"""

from __future__ import annotations

import json
import os
import re
import sys
import time
import urllib.request
from pathlib import Path
from typing import Optional, Tuple

REPO = "Liunian06/resume-database"
LATEST_API = f"https://api.github.com/repos/{REPO}/releases/latest"
UPDATE_COMMAND = "npx skills update resume-database -g"

TIMEOUT_SECONDS = 2
CACHE_OK_SECONDS = 24 * 3600
CACHE_FAIL_SECONDS = 6 * 3600
CACHE_FILE = Path.home() / ".cache" / "resume-database" / "update_check.json"


def parse_version(text: str) -> Optional[Tuple[int, ...]]:
    """'v1.0.3' / '1.0.3' -> (1, 0, 3)；不是纯数字点分版本号则返回 None。"""
    m = re.fullmatch(r"v?(\d+(?:\.\d+)*)", text.strip())
    return tuple(int(x) for x in m.group(1).split(".")) if m else None


def read_local_version() -> Optional[str]:
    """读取本 skill 的 SKILL.md 中 frontmatter 的 version。"""
    skill_md = Path(__file__).resolve().parent.parent / "SKILL.md"
    try:
        for line in skill_md.read_text(encoding="utf-8").splitlines()[:20]:
            m = re.match(r"version:\s*(\S+)", line)
            if m:
                return m.group(1)
    except OSError:
        pass
    return None


def _load_cache() -> dict:
    try:
        return json.loads(CACHE_FILE.read_text(encoding="utf-8"))
    except (OSError, ValueError):
        return {}


def _save_cache(latest: Optional[str]) -> None:
    try:
        CACHE_FILE.parent.mkdir(parents=True, exist_ok=True)
        CACHE_FILE.write_text(
            json.dumps({"checked_at": time.time(), "latest": latest}), encoding="utf-8"
        )
    except OSError:
        pass


def fetch_latest_version() -> Optional[str]:
    """取最新 release 的 tag；缓存有效时不联网。查不到返回 None。"""
    cache = _load_cache()
    checked_at = cache.get("checked_at")
    if isinstance(checked_at, (int, float)):
        ttl = CACHE_OK_SECONDS if cache.get("latest") else CACHE_FAIL_SECONDS
        if 0 <= time.time() - checked_at < ttl:
            latest = cache.get("latest")
            return latest if isinstance(latest, str) else None

    latest = None
    try:
        req = urllib.request.Request(
            LATEST_API,
            headers={"Accept": "application/vnd.github+json", "User-Agent": "resume-database-update-check"},
        )
        with urllib.request.urlopen(req, timeout=TIMEOUT_SECONDS) as resp:
            tag = json.loads(resp.read().decode("utf-8")).get("tag_name")
            if isinstance(tag, str):
                latest = tag
    except Exception:
        latest = None
    _save_cache(latest)
    return latest


def check_update(local_version: Optional[str] = None, latest_version: Optional[str] = None) -> Optional[str]:
    """有新版本时返回提示文本，否则返回 None。两个参数仅用于测试。"""
    if os.environ.get("RESUME_DATABASE_NO_UPDATE_CHECK"):
        return None
    local = local_version or read_local_version()
    latest = latest_version or (fetch_latest_version() if local else None)
    if not local or not latest:
        return None
    local_t, latest_t = parse_version(local), parse_version(latest)
    if not local_t or not latest_t or latest_t <= local_t:
        return None
    return (
        f"[更新提示] resume-database 有新版本 v{'.'.join(map(str, latest_t))}（当前 v{'.'.join(map(str, local_t))}）。\n"
        f"更新命令：{UPDATE_COMMAND}\n"
        f"更新内容：https://github.com/{REPO}/releases/tag/v{'.'.join(map(str, latest_t))}\n"
        f"更新只替换 skill 本身，工作目录里的 data/ 不受影响。请把以上信息告诉用户，由用户决定是否更新。"
    )


def notify_if_update() -> None:
    """脚本末尾调用。任何异常都吞掉，绝不影响主流程。"""
    try:
        message = check_update()
        if message:
            print(f"\n{message}", file=sys.stderr)
    except Exception:
        pass


if __name__ == "__main__":
    notify_if_update()
