# Handoff — NeuMed Franchise Marketing Site

A developer handoff package for building the **NeuMed Franchise** marketing site in
**Astro** (frontend) with **Sanity** (CMS). Built for implementation in Cursor.

---

## What this is

A 5-page lead-generation site that sells NeuMed urgent-care + wellness franchises:

| Page | Route | Job |
|------|-------|-----|
| Home | `/` | Pitch the model, build trust, drive to the lead form |
| Opportunity | `/opportunity` | Investment, unit economics, what's included, who we want |
| Process | `/process` | 8-step path from inquiry → grand opening + ongoing support |
| FAQ | `/faq` | Accordion of the questions buyers ask |
| Contact | `/contact` | **Request Franchise Info** lead form (emails submissions) |

The single conversion goal across every page is **"Request Franchise Info"** → the
lead form on `/contact`, which emails each submission to the franchise inbox.

---

## ⚠️ Read this first — the bundled files are *design references*

The HTML/CSS/JS in **`design-reference/`** are **prototypes** that show the intended
look, layout, copy, and behavior. They are **not** the code to ship.

Your task is to **recreate these designs in Astro**, backed by **Sanity** for content,
using Astro's component model and the design tokens documented here. Treat the HTML as
the source of truth for *visual + interaction design*, and the schemas in `sanity/` as
the source of truth for *content modeling*.

The reference site is static and hand-rolls its nav/footer/interactions in vanilla JS
(`design-reference/assets/site.js`); in the Astro build those become components +
small island scripts (see the architecture guide).

---

## Fidelity: High

These are **pixel-level hi-fi** mockups — final brand colors, typography, spacing,
and interactions. Recreate the UI faithfully. Exact values are in **`DESIGN-SPEC.md`**
and the design tokens live in **`design-reference/assets/brand.css`** as CSS custom
properties you can copy verbatim into the Astro project's global stylesheet.

---

## Package contents

```
design_handoff_neumed_franchise/
├── README.md                      ← you are here
├── DESIGN-SPEC.md                 ← screen-by-screen spec, tokens, components, interactions
├── ARCHITECTURE-astro-sanity.md   ← project structure, component/page mapping, form wiring
├── CURSOR.md                      ← rules/prompt to paste into Cursor before building
├── sanity/
│   └── schemaTypes/               ← ready-to-drop Sanity v3 schema files (TypeScript)
│       ├── index.ts
│       ├── siteSettings.ts
│       ├── homePage.ts
│       ├── opportunityPage.ts
│       ├── processPage.ts
│       ├── faqPage.ts
│       ├── contactPage.ts
│       └── objects/
│           ├── ctaBlock.ts
│           ├── seo.ts
│           ├── linkButton.ts
│           ├── statItem.ts
│           ├── valueProp.ts
│           ├── revenueLine.ts
│           ├── audienceCard.ts
│           ├── infoCard.ts
│           ├── processStep.ts
│           ├── faqItem.ts
│           ├── investmentRow.ts
│           └── nextStep.ts
└── design-reference/
    ├── Home.html  Opportunity.html  Process.html  FAQ.html  Contact.html
    └── assets/
        ├── brand.css   ← design tokens (colors, type, radii, shadows) + button/logo styles
        ├── site.css    ← all layout/component styles
        ├── site.js     ← nav injection, scroll state, reveal, FAQ accordion, form logic
        ├── logo-white.png   ← logo for the dark header + footer (transparent PNG)
        └── logo-color.png   ← logo for the white/scrolled header (transparent PNG)
```

### Suggested reading order
1. **This README** — the shape of the project.
2. **`ARCHITECTURE-astro-sanity.md`** — how to structure the Astro app + Sanity studio.
3. **`DESIGN-SPEC.md`** — the precise visual spec, screen by screen.
4. **`sanity/schemaTypes/`** — drop into your Studio, then build GROQ queries from them.
5. Open the **`design-reference/*.html`** files in a browser to feel the real thing.

---

## Brand quick reference

- **Primary blue** `#244258` — headlines, dark headers/footers, body text, dark panels.
- **Green accent** `#9CD736` — buttons, markers, eyebrows-on-dark, the logo "U". Always
  pair with **navy text**, never white (navy-on-green ≈ 6:1 contrast; white-on-green ≈ 1.7:1).
- **Type** — Display & body: **Schibsted Grotesk**. Data/labels/eyebrows: **IBM Plex Mono**.
- **Logo swap** — white logo over the dark header; color logo once the header turns white
  on scroll; white logo in the footer. (Files in `design-reference/assets/`.)

---

## Non-negotiables / gotchas

- **Logo + header color swap on scroll.** Header is transparent over the dark hero
  (white logo, white "Request Info" button), and turns solid white past ~40px scroll
  (color logo, green button). See `DESIGN-SPEC.md → Navigation`.
- **All financial figures are illustrative placeholders** ($685K–$1.2M, TAM, margins,
  timelines) and every figure carries an FDD disclaimer. Keep these as **editable Sanity
  fields** and keep the disclaimers — do not hard-code numbers.
- **The lead form must email submissions.** The reference uses Web3Forms; in Astro,
  prefer a server endpoint (Astro API route / serverless function). See the architecture
  guide's "Lead form" section.
- **Accessibility:** maintain the navy-on-green button contrast, 44px+ hit targets,
  reduced-motion handling for the reveal animations, and labels on every form field.

---

## Questions for the client before/while building
- Real FDD Item 7 (investment) and Item 19 (financial performance) figures to replace placeholders.
- Final clinic/brand photography for the image slots (hero, infusion suite, exterior, team).
- Where leads should be emailed (and whether they also want them in a CRM/Sheet/Slack).
- Confirm domain, analytics, and whether legal wants the disclaimer copy adjusted.
