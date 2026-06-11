# Cursor — build rules & kickoff prompt

Paste the **kickoff prompt** below into Cursor's chat to start, and keep the **rules**
section as `.cursorrules` (or `.cursor/rules/neumed.md`) in the repo root.

---

## Kickoff prompt (paste into Cursor)

> You are building the **NeuMed Franchise** marketing site. The full design + content
> handoff is in `design_handoff_neumed_franchise/`. Read these first, in order:
> `README.md`, `ARCHITECTURE-astro-sanity.md`, `DESIGN-SPEC.md`, then the schemas in
> `sanity/schemaTypes/`. Open the prototypes in `design-reference/*.html` in a browser to
> see the intended result.
>
> Build it with **Astro** (frontend) + **Sanity v3** (CMS). The HTML files are **design
> references, not code to ship** — recreate them as Astro components backed by Sanity
> content, using the exact design tokens from `design-reference/assets/brand.css`.
>
> Work in this order:
> 1. Scaffold the Astro app + Sanity studio; copy the `:root` tokens + helper/layout CSS
>    from `brand.css` and `site.css` into `src/styles/global.css`.
> 2. Drop the provided `sanity/schemaTypes/` into the studio, wire singletons in the desk
>    structure, and seed each singleton with the copy/figures from the reference HTML.
> 3. Build `BaseLayout`, `SiteHeader` (with the scroll-state logo/button swap),
>    `SiteFooter`, and the shared components listed in the architecture guide.
> 4. Build the 5 pages, fetching from Sanity via GROQ (queries in `lib/queries.ts`).
> 5. Wire the lead form to an Astro API route that **emails submissions** to the inbox in
>    `siteSettings.leadInbox` (see architecture "Lead form").
> 6. Verify against the "Definition of done" checklist in the architecture guide.
>
> Ask me for: real FDD figures, clinic photos, the lead inbox + email provider keys.

---

## Project rules (.cursorrules)

```
# NeuMed Franchise — build rules

## Source of truth
- Visual/interaction design: design_handoff_neumed_franchise/design-reference/*.html + DESIGN-SPEC.md
- Content model: design_handoff_neumed_franchise/sanity/schemaTypes/
- The HTML prototypes are references, NOT production code. Recreate them in Astro.

## Stack
- Astro 4+, Sanity v3, @sanity/image-url. Vanilla CSS using the tokens in brand.css
  (or Tailwind mapped to those tokens). Self-host fonts (Schibsted Grotesk, IBM Plex Mono).
- Islands only where needed: FAQ accordion, lead form, nav scroll-state script.

## Design tokens — never hard-code raw values; use the CSS variables
- Primary blue #244258 (--nm-ink); green accent #9CD736 (--nm-green).
- Green buttons/markers ALWAYS use navy text (--nm-ink), never white (contrast).
- Radii 8/14/22/999; shadows + type scale per DESIGN-SPEC.md.

## Content
- ALL copy, figures, FAQs, images, form options come from Sanity. Do not hard-code any
  financial figure or body copy in components.
- Keep every FDD disclaimer/footnote. Figures are illustrative placeholders until the
  client provides real Item 7 / Item 19 numbers.

## Non-negotiables
- Header: transparent over dark hero (white logo, white Request-Info button) → solid white
  on scroll >40px (color logo, green button). Keep body.dark-hero on all pages.
- FAQ: single-open accordion, one item open by default, keyboard accessible.
- Lead form: required-field + email validation, sending/success/error states, emails the
  inbox via a server route (never expose secret keys client-side).
- Reveal-on-scroll must respect prefers-reduced-motion and degrade to visible without JS.
- A11y: one <h1>/page, labels on all inputs, 44px+ hit targets, visible focus rings.
- Responsive: 920px and 600px breakpoints per DESIGN-SPEC.md §6.

## Don'ts
- Don't invent new colors, fonts, or copy. Don't add sections not in the design.
- Don't ship the HTML/JS from design-reference/ directly.
- Don't use white text on the green accent.
```
