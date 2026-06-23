# AI Use Policy Builder

A single-file web wizard that helps a small business or an MSP (writing for a client) produce a customizable AI Use Policy, downloadable as Word or PDF. Built for Pax8 Academy.

The entire app is one self-contained `index.html` — all HTML, CSS, and JavaScript inline. No build step, no dependencies, no backend. Everything runs in the visitor's browser; nothing is uploaded or stored anywhere.

## What it does

The user answers a short set of questions (most finish in under ten minutes), and the wizard assembles a ready-to-edit policy:

- **Organization & cadence** — who the policy is for, the policy owner, effective date, and review cadence (defaults to quarterly; the first review date is calculated automatically).
- **Mode** — "my own organization" or "a client I provide IT services to (MSP)." The MSP path adds a clean *Prepared by* line, MSP-specific training language, and a fuller tool-approval process.
- **Approved tools** — a checklist of ~25 current AI tools plus free-form entries for anything else (e.g. AI built into an RMM/PSA/CRM). Anything not listed is, by policy, not approved.
- **What must never go into AI** — an editable, absolute "never share" list (credentials, regulated personal data, payment info, etc.).
- **Human-in-the-loop** — decision types that always require a person (customer-facing output, money, people, security, legal).
- **Build-on-API toggle** — if the org builds automations/agents on LLM APIs, adds security-by-design, data-sanitization, and decision-authority sections.

Core sections — responsible-AI principles, training & acknowledgment, an authorization log, and an incident log — are built into every policy. To remove or reword anything, the user edits the downloaded Word file.

Output: **Download Word (.doc)** or **Save as PDF** (via the browser's print dialog).

## Deploy (GitHub Pages)

1. Add this file to the repo as **`index.html`** so it serves at the bare path.
2. Enable GitHub Pages for the branch/folder.

It is fully static and self-contained, so no other configuration is needed. (Optional: add an empty `.nojekyll` file to skip Jekyll processing — not required, the file contains no Liquid tags.)

## Editing

Open `index.html` in any editor. To change the tool list, the "never share" defaults, or the human-in-the-loop defaults, edit the seed arrays near the top of the `<script>` block (`TOOL_GROUPS`, `NEVER_SEED`, `HUMAN_SEED`). The policy text is generated in the `policyHtml()` function below them.

## Important

This tool produces a **customizable template for informational purposes only**. It is **not** legal, regulatory, or compliance advice. Any generated policy should be reviewed by qualified legal, HR, and compliance advisors before adoption.
