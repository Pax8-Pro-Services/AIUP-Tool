# AI Use Policy Builder

A single-file web wizard that helps an MSP produce a customizable AI Use Policy for a client (or for their own shop), downloadable as Word or PDF. Built for Pax8 Academy.

The entire app is one self-contained `index.html` — all HTML, CSS, and JavaScript inline. No build step, no backend. Everything runs in the visitor's browser; nothing is uploaded or stored anywhere. The only external resource is the `html-docx-js` CDN script used for the `.docx` download — if it fails to load (e.g. offline), the app falls back to a `.doc` download.

## What it does

The user walks through six steps and the wizard assembles a ready-to-edit policy. Nothing is pre-filled or pre-ticked: every field, list, and checkbox starts blank, and example wording lives only in the blue instruction box at the top of each step, so the policy says exactly what the user decides it says.

- **Organization** — who the policy is for, a *Prepared by* line for the MSP, the policy owner, incident-reporting and escalation contacts, effective date, and review cadence (the first review date is calculated from the cadence; quarterly is recommended).
- **Approved tools** — a checklist of 27 current AI tools (assistants, creative tools, agent builders, platforms/APIs) plus free-form entries for anything else. Anything not listed is, by policy, not approved.
- **Prohibited actions** — an editable, absolute list of use cases, data, or materials that must never be used in or with any AI tool.
- **High-risk use cases (Human in the Lead)** — use cases that require the express review and approval of a named responsible party.
- **Review & download** — a live preview of the full policy, then Word or PDF.

Core sections are built into every policy: responsible-AI principles, output verification & intellectual property, and review/reporting/training/enforcement. Skipped fields become **[bracketed]** placeholders, and the user can remove or reword anything by editing the downloaded Word file.

Output: **Download Word (.docx)** or **Save as PDF** (via the browser's print dialog).

## British English version

A UK English (en-GB) version of the wizard lives at **`en-gb/index.html`** and is linked from the page header of each version (the standard subdirectory-per-locale URL structure, e.g. `example.com/en-gb/`). It is identical to the US version apart from localisations — spellings like *organisation*, *unauthorised*, *acknowledgement* — and never differs in meaning. The verbatim legal disclaimer is identical in both.

Don't edit `en-gb/index.html` by hand. It is generated from `index.html`:

```
node tools/localize-en-gb.mjs
```

Run this after any change to `index.html`. Each localisation rule asserts an expected match count, so the script fails loudly if an edit to `index.html` breaks a rule — update the rule list in `tools/localize-en-gb.mjs`, regenerate, and commit both files. If the site gets a permanent public URL, add bidirectional `hreflang` tags (`en-US`, `en-GB`, `x-default`) to both pages — they require absolute URLs, so they can't be pre-filled here.

## Deploy (GitHub Pages)

1. Add this file to the repo as **`index.html`** so it serves at the bare path.
2. Enable GitHub Pages for the branch/folder.

It is fully static, so no other configuration is needed. (Optional: add an empty `.nojekyll` file to skip Jekyll processing — not required, the file contains no Liquid tags.)

## Editing

Open `index.html` in any editor. To change the tool checklist, edit the `TOOL_GROUPS` array near the top of the `<script>` block. The prohibited-actions and high-risk lists have no seed data — they start empty by design. The policy text is generated in the `policyHtml()` function; the per-step guidance lives in each step's `.infobox` block.

## Important

This tool produces a **customizable template for informational purposes only**. It is **not** legal, regulatory, or compliance advice. Any generated policy should be reviewed by qualified legal, HR, and compliance advisors before adoption.
