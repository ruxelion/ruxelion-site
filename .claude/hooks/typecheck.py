#!/usr/bin/env python3
"""
PostToolUse hook — runs `npm run check` (astro check) after an edit to a
TS/TSX/Astro/MDX file.

Project-wide (not single-file): astro check has no single-file mode, and
there is no formatter wired in this repo yet (see AGENTS.md). Never blocks
the turn — reports diagnostics only, since the repo has no prior enforcement
to match against.
"""
import json
import os
import subprocess
import sys

data = json.load(sys.stdin)
file_path = (data.get("tool_input") or {}).get("file_path", "")

if not file_path.endswith((".ts", ".tsx", ".astro", ".mdx")):
    sys.exit(0)

# Walk up from the edited file to the repo root (nearest package.json).
search_dir = os.path.dirname(os.path.abspath(os.path.normpath(file_path)))
root = None
while True:
    if os.path.exists(os.path.join(search_dir, "package.json")):
        root = search_dir
        break
    parent = os.path.dirname(search_dir)
    if parent == search_dir:  # reached filesystem root
        break
    search_dir = parent

if root is None:
    sys.exit(0)

r = subprocess.run(
    ["npm", "run", "check"],
    cwd=root,
    capture_output=True,
    text=True,
    shell=True,
)
sys.stdout.write(r.stdout)
sys.stderr.write(r.stderr)
