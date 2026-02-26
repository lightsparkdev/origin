#!/usr/bin/env python3
"""Generate a changelog entry and determine version bump using Claude."""

import json
import os
import sys
import urllib.request
from datetime import date


def main():
    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        print("Error: ANTHROPIC_API_KEY not set", file=sys.stderr)
        sys.exit(1)

    old_version = os.environ.get("OLD_VERSION", "0.0.0")
    commits = os.environ.get("COMMITS", "")
    diffstat = os.environ.get("DIFFSTAT", "")
    today = date.today().isoformat()

    prompt = f"""You are generating a release changelog for @lightsparkdev/origin, a React component library and design system.

Current version: {old_version}
Diff stat: {diffstat}

Commits since last release:
{commits}

Tasks:
1. Determine if this is a "minor" or "patch" release. Use minor if there are new components, new features, or new public API surface. Use patch for bug fixes, docs, internal refactors, CI changes, and dependency updates. Never use major.
2. Write a concise changelog entry that summarizes ONLY changes that impact consumers of the package (new components, API changes, bug fixes, style changes). Omit CI, docs, internal tooling, and repo maintenance.

Respond in EXACTLY this format with no other text:

VERSION_BUMP: patch
CHANGELOG:
## {old_version} → X.Y.Z ({today})

- First user-facing change
- Second user-facing change

Replace X.Y.Z with the actual new version number. If there are no user-facing changes, write a single line: "- Internal maintenance release (no user-facing changes)"."""

    payload = json.dumps({
        "model": "claude-sonnet-4-6",
        "max_tokens": 1024,
        "messages": [{"role": "user", "content": prompt}],
    }).encode()

    req = urllib.request.Request(
        "https://api.anthropic.com/v1/messages",
        data=payload,
        headers={
            "content-type": "application/json",
            "x-api-key": api_key,
            "anthropic-version": "2023-06-01",
        },
    )

    try:
        with urllib.request.urlopen(req) as resp:
            result = json.loads(resp.read())
    except urllib.error.HTTPError as e:
        body = e.read().decode()
        print(f"API error {e.code}: {body}", file=sys.stderr)
        sys.exit(1)

    ai_output = result["content"][0]["text"]
    print(ai_output, file=sys.stderr)

    # Parse version bump
    version_bump = "patch"
    for line in ai_output.splitlines():
        if line.startswith("VERSION_BUMP:"):
            parsed = line.split(":", 1)[1].strip()
            if parsed in ("minor", "patch"):
                version_bump = parsed
            break

    # Parse changelog (everything after CHANGELOG: line)
    changelog_lines = []
    in_changelog = False
    for line in ai_output.splitlines():
        if in_changelog:
            changelog_lines.append(line)
        elif line.startswith("CHANGELOG:"):
            in_changelog = True

    changelog = "\n".join(changelog_lines).strip()

    # Write outputs
    with open(os.environ["GITHUB_OUTPUT"], "a") as f:
        f.write(f"version_bump={version_bump}\n")

    with open("/tmp/changelog_entry.md", "w") as f:
        f.write(changelog + "\n")

    print(f"--- AI determined: {version_bump} ---")
    print(changelog)


if __name__ == "__main__":
    main()
