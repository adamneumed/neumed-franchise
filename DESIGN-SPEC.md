# Design Spec — NeuMed Franchise Site (Hi-Fi)

Exact visual specification. Pair this with the live reference files in
`design-reference/`. All tokens below are mirrored in `design-reference/assets/brand.css`
— copy that `:root` block straight into your Astro global stylesheet.

---

## 1. Design tokens

### Color
| Token | Hex | Usage |
|-------|-----|-------|
| `--nm-ink` | `#244258` | **Primary blue.** Headlines, body text, dark headers/footers, dark panels, button text on green |
| `--nm-ink-2` | `#33556C` | Secondary blue (trust strip bg, chip text) |
| `--nm-slate` | `#5E7686` | Muted body copy, captions, labels |
| `--nm-green` | `#9CD736` | **Green accent.** Primary buttons, step/marker fills, logo "U" |
| `--nm-green-hover` | `#8BC72B` | Primary button hover |
| `--nm-green-deep` | `#5E8A16` | Legible green for eyebrows / links / icons **on light backgrounds** |
| `--nm-green-soft` | `#ECF7D6` | Light green tint (card icon chips, success badge, focus ring base) |
| `--nm-line` | `#E1E8ED` | Hairlines, borders, input borders |
| `--nm-bg` | `#F6F9FA` | Page background (cool off-white) |
| `--nm-paper` | `#FFFFFF` | Cards, panels, inputs-on-focus |
| `--nm-sand` | `#EDF2F4` | Cool neutral block backgrounds, alternating sections |

> **Contrast rule:** green buttons/markers always use **navy (`--nm-ink`) text/glyphs**,
> never white. Navy-on-green ≈ 6:1 (passes AA); white-on-green ≈ 1.7:1 (fails).

### Typography
- **Display & body:** `Schibsted Grotesk` (Google Fonts), weights 400/500/600/700/800/900.
- **Mono (data, eyebrows, labels, stat numbers, footnotes):** `IBM Plex Mono`, weights 400/500/600.
- Headings: weight **800**, `letter-spacing: -.025em`, `line-height: 1.05`.
- Body lead: 19–21px, `line-height: 1.6`, color `--nm-slate`.
- **Eyebrow** (`.nm-eyebrow`): mono, 12px, `letter-spacing: .22em`, uppercase, weight 500,
  color `--nm-green-deep` on light / `--nm-green` on dark.
- Use `text-wrap: pretty` on headings and lead paragraphs.

Fluid heading sizes (from the reference):
| Context | `font-size` |
|---|---|
| Home hero H1 | `clamp(44px, 6.4vw, 78px)` |
| Inner page H1 (`.pagehead`) | `clamp(38px, 5.2vw, 62px)` |
| Section H2 | `clamp(34px, 4.4vw, 52px)` |
| CTA band H2 | `clamp(34px, 4.6vw, 54px)` |
| Card H3 | 21px · Revenue-line H3 24px · Step H3 22px · FAQ question 20px |

### Radii
`--nm-r-sm: 8px` (inputs) · `--nm-r: 14px` (image slots, small cards) ·
`--nm-r-lg: 22px` (cards, panels, tables) · `--nm-r-pill: 999px` (buttons, chips).

### Shadows
- `--nm-shadow`: `0 1px 2px rgba(36,66,88,.05), 0 18px 40px -18px rgba(36,66,88,.20)` (raised cards/forms)
- `--nm-shadow-soft`: `0 1px 2px rgba(36,66,88,.05), 0 10px 30px -16px rgba(36,66,88,.15)` (resting cards)

### Layout
- Content container: `max-width: 1200px; margin: 0 auto; padding: 0 40px` (`0 24px` ≤920px).
- Section vertical rhythm: `padding: 104px 0` (`.section`), `72px 0` (`.section-sm` and ≤920px).
- Section background alternation: `--nm-bg` → `--nm-paper` → `--nm-sand` for rhythm.

### Buttons (`.nm-btn`, pill)
`font: 600 15px` · `padding: 14px 26px` · `border-radius: 999px` · `gap: 9px` ·
`transition: background/transform/color .18s ease`.
- **Primary:** bg `--nm-green`, text `--nm-ink`; hover bg `--nm-green-hover`.
- **Light:** bg `#fff`, text `--nm-ink`; hover bg `--nm-green-soft`. (used on dark heroes)
- **Ghost:** transparent, `inset 0 0 0 1.5px --nm-line`, text `--nm-ink`; hover border+text green.

---

## 2. Global chrome

### Navigation (fixed, height 76px)
Left: **logo** + a mono "Franchise" tag (`border-left` divider, 10px, `.16em` tracking, uppercase).
Right: text links `Home · Opportunity · Process · FAQ` (15px, weight 500) + a pill
**"Request Info"** primary button.

**Scroll-state behavior (critical):**
| State | Trigger | Header bg | Logo | Links | Request Info btn |
|-------|---------|-----------|------|-------|------------------|
| **Over dark hero** | `scrollY ≤ 40` on a page with a dark header | transparent, bottom hairline `rgba(255,255,255,.12)` | **white** logo (`logo-white.png`) | `rgba(255,255,255,.85)`, hover #fff | **solid white** bg, navy text |
| **Scrolled / solid** | `scrollY > 40` (and all the time on light pages) | `rgba(255,255,255,.9)` + `backdrop-filter: blur(12px)`, hairline `--nm-line` | **color** logo (`logo-color.png`) | `--nm-ink-2`, hover green | **green** bg, navy text |

Active link uses `--nm-green-deep`. Transitions: `background/box-shadow/border .3s ease`.
Logo height 34px in nav, 38px in footer. Add the `scrolled` class to the header element
on scroll; in Astro implement as a tiny client script (see architecture guide).

**Mobile (≤920px):** links collapse into a burger; a dropdown panel slides down
(`transform: translateY(-130%)` → `0`, `.3s`) containing all 5 links + a full-width
"Request Franchise Info" button. Hit targets ≥44px.

### Footer (dark, `--nm-ink`)
4 columns: (1) **white logo** + blurb; (2) **Franchise** links; (3) **Company** links
(external to neumed.com, `target="_blank"`); (4) **Get in touch** (email, discovery call,
location). Bottom bar: copyright (mono) + legal disclaimer
("This is not a franchise offering…"). Column headers: mono, 11px, `.14em`, uppercase,
`rgba(255,255,255,.45)`. Links `rgba(255,255,255,.72)`, hover `--nm-green`.

### Image slots
Every photo is a labeled placeholder (`.slot`): striped diagonal fill + a mono caption
naming the intended shot (e.g. "Full-bleed photo — infusion suite / clinic interior").
Replace with Sanity image fields. Dark variant (`.slot.dark`) sits behind hero washes.

### Dark hero / page-head wash
Dark sections layer a gradient over the photo:
`linear-gradient(105deg, rgba(36,66,88,.95), rgba(36,66,88,.78) 45%, rgba(36,66,88,.55))`
(hero) / `linear-gradient(120deg, rgba(36,66,88,.96), rgba(36,66,88,.6))` (page-head & CTA).

---

## 3. Screens

> Exact copy lives in the corresponding `design-reference/*.html`. Below is the section
> inventory + layout per page. Map each bulleted section to a Sanity field group
> (see `sanity/schemaTypes/`) and an Astro component (see architecture guide).

### 3.1 Home (`Home.html`)
1. **Hero** (dark, full-bleed) — eyebrow, H1 "Healthcare, reimagined — and ready to scale.",
   lead, two CTAs (primary "Request Franchise Info →" + light "Book a Discovery Call"),
   background photo slot.
2. **Trust strip** (`--nm-ink-2` band) — 4 mono items with green dots
   (Established 2020 · 5 Houston clinics · Open 8am–8pm · 365 days · In-network…).
3. **Why NeuMed** — head block + 3 value-prop cards (icon chip, H3, body).
4. **The Model** (`--nm-paper`) — head block + 4 **revenue-line** rows
   (`grid 64px 1fr auto`: mono number / title+desc / pill chip), top+bottom hairlines.
5. **Stat band** — 4 stats in a bordered rounded panel (mono numbers) + footnote.
6. **Why now** (`--nm-sand`) — 2-col split: text (eyebrow/H2/lead/body/ghost CTA) + image slot.
7. **Who it's for** (`--nm-paper`) — centered head + 3 audience cards (`.who`: mono tag, H3, body).
8. **CTA band** (dark, full-bleed wash) — H2, body, primary + light CTAs.

### 3.2 Opportunity (`Opportunity.html`)
1. **Page-head** (dark, compact) — eyebrow/H1/lead + photo slot.
2. **The Investment** — 2-col split: copy + CTA, and an **investment table**
   (`.itable`: component / illustrative range, with a highlighted `tr.total`) + footnote.
3. **The Math / unit economics** (`--nm-paper`) — head + 4-stat band + FDD footnote.
4. **What's included** — head + 6 info cards (mono number, H3, body).
5. **Who we're looking for** (`--nm-sand`) — head + 3 audience cards + 2 CTAs.
6. **CTA band.**

### 3.3 Process (`Process.html`)
1. **Page-head.**
2. **Steps** — 8 `.step` rows (`grid 92px 1fr`): a 52px green circle with mono number +
   H3/body, hairline separators; footnote on timeline.
3. **Support** (`--nm-paper`) — head + 6 info cards (glyph icon chip, H3, body).
4. **CTA band.**

### 3.4 FAQ (`FAQ.html`)
1. **Page-head.**
2. **FAQ accordion** (`.faq`, max-width 860px, centered) — 10 items. Each: a full-width
   `button.faq-q` (display H3, 20px) with a circular `+` toggle that rotates 45° and fills
   green when open; answer panel animates `max-height` (`.32s ease`). **One item open by
   default**; opening one closes siblings (single-open accordion).
3. **CTA band.**

### 3.5 Contact (`Contact.html`)
1. **Page-head** (shorter).
2. **Form section** — 2-col (`1.1fr .9fr`):
   - **Form card** (`.form-card`, raised): fields — Name\*, Email\*, Phone\*,
     Target market\*, Liquid capital\* (select), Background (select), Message (textarea),
     consent checkbox, full-width primary submit, mono reassurance line. On success the
     form swaps to a success state (green ✓ badge, personalized "{First}, thanks…").
   - **Aside** (`.contact-aside`): "What happens next" 3-step list (green number circles) +
     a dark contact box (email link, location/hours).

Field styling: label is mono 10.5px uppercase with a green `*`; inputs
`1.5px solid --nm-line` on `--nm-bg`, `radius 8px`; focus → green border + green focus ring
`0 0 0 3px rgba(156,215,54,.30)` + white bg; invalid → red border + red bg + shown `.err`.

---

## 4. Interactions & motion
- **Reveal on scroll:** elements tagged `data-reveal` start `opacity:0; translateY(18px)`
  and transition to visible (`.6s ease`) when ~12% in view, with a small stagger
  (`70ms × index%4`). **Must respect `prefers-reduced-motion`** (show immediately) and must
  degrade to visible if JS/animation never runs. In Astro, prefer the
  `IntersectionObserver`-based approach or a CSS `@scroll-timeline`/`animation-timeline`
  with a no-JS visible fallback.
- **Nav:** scroll-state class toggle at 40px (see Navigation table).
- **FAQ:** single-open accordion, `max-height` transition, one open by default.
- **Buttons:** `.18s` background/color transitions.
- **Form:** inline validation on submit (required + email regex), error scroll-to-first,
  sending state, success swap, mailto/endpoint delivery (see architecture guide).

## 5. Assets
- `design-reference/assets/logo-white.png` — 1335×318 transparent PNG (dark header + footer).
- `design-reference/assets/logo-color.png` — 668×160 transparent PNG (white/scrolled header).
- Fonts via Google Fonts (`Schibsted Grotesk`, `IBM Plex Mono`) — see `@import` in `brand.css`,
  or self-host with `@fontsource` packages in Astro for performance.
- All photography is currently placeholder slots — client to provide; wire to Sanity images.

## 6. Responsive breakpoints
- **≤920px:** container padding 24px; sections 72px; 3-col grids → 2-col; splits/form → 1-col;
  stat band → 2×2; footer → 2-col; nav → burger.
- **≤600px:** grids/stat band/footer → 1-col; revenue line stacks; steps tighten to `60px 1fr`;
  hero/CTA buttons go full-width.
