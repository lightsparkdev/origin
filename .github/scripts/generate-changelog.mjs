#!/usr/bin/env node
/**
 * Generate a changelog entry and determine version bump using Claude.
 */

import { appendFileSync, writeFileSync } from "fs";

const apiKey = process.env.ANTHROPIC_API_KEY;
if (!apiKey) {
  console.error("Error: ANTHROPIC_API_KEY not set");
  process.exit(1);
}

const oldVersion = process.env.OLD_VERSION || "0.0.0";
const commits = process.env.COMMITS || "";
const diffstat = process.env.DIFFSTAT || "";
const today = new Date().toISOString().split("T")[0];

const prompt = `You are generating a release changelog for @lightsparkdev/origin, a React component library and design system.

Current version: ${oldVersion}
Diff stat: ${diffstat}

Commits since last release:
${commits}

Tasks:
1. Determine if this is a "minor" or "patch" release. Use minor if there are new components, new features, or new public API surface. Use patch for bug fixes, docs, internal refactors, CI changes, and dependency updates. Never use major.
2. Write a concise changelog entry that summarizes ONLY changes that impact consumers of the package (new components, API changes, bug fixes, style changes). Omit CI, docs, internal tooling, and repo maintenance.

Respond in EXACTLY this format with no other text:

VERSION_BUMP: patch
CHANGELOG:
## ${oldVersion} → X.Y.Z (${today})

- First user-facing change
- Second user-facing change

Replace X.Y.Z with the actual new version number. If there are no user-facing changes, write a single line: "- Internal maintenance release (no user-facing changes)".`;

const resp = await fetch("https://api.anthropic.com/v1/messages", {
  method: "POST",
  headers: {
    "content-type": "application/json",
    "x-api-key": apiKey,
    "anthropic-version": "2023-06-01",
  },
  body: JSON.stringify({
    model: "claude-sonnet-4-6",
    max_tokens: 1024,
    messages: [{ role: "user", content: prompt }],
  }),
});

if (!resp.ok) {
  const body = await resp.text();
  console.error(`API error ${resp.status}: ${body}`);
  process.exit(1);
}

const result = await resp.json();
const aiOutput = result.content[0].text;
console.error(aiOutput);

// Parse version bump
let versionBump = "patch";
for (const line of aiOutput.split("\n")) {
  if (line.startsWith("VERSION_BUMP:")) {
    const parsed = line.split(":")[1].trim();
    if (parsed === "minor" || parsed === "patch") {
      versionBump = parsed;
    }
    break;
  }
}

// Parse changelog (everything after CHANGELOG: line)
const lines = aiOutput.split("\n");
const changelogStart = lines.findIndex((l) => l.startsWith("CHANGELOG:"));
const changelog =
  changelogStart >= 0 ? lines.slice(changelogStart + 1).join("\n").trim() : "";

// Write outputs
appendFileSync(process.env.GITHUB_OUTPUT, `version_bump=${versionBump}\n`);
writeFileSync("/tmp/changelog_entry.md", changelog + "\n");

console.log(`--- AI determined: ${versionBump} ---`);
console.log(changelog);
