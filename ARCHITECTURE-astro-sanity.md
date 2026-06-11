# Architecture — Astro + Sanity

How to build the NeuMed Franchise site in **Astro** with **Sanity** as the CMS. This is a
recommended structure, not a mandate — adapt to your team's conventions.

---

## 1. Stack

- **Astro 4+** — static-first marketing site; islands only where interactivity is needed.
- **Sanity v3** — content (all copy, figures, FAQs, images) lives here so non-devs can edit.
- **@sanity/client** + **@astrojs/sanity** (or `sanity-astro`) for fetching, **@sanity/image-url** for images.
- **Plain CSS / CSS Modules** using the tokens in `brand.css`. (Tailwind is fine too —
  map the tokens to `theme.extend`; but the reference is hand-CSS and small, so vanilla works.)
- Fonts via **@fontsource/schibsted-grotesk** + **@fontsource/ibm-plex-mono** (self-hosted)
  or Google Fonts `@import`.

```bash
npm create astro@latest neumed-franchise
npx astro add sanity
npm i @sanity/image-url @fontsource/schibsted-grotesk @fontsource/ibm-plex-mono
```

---

## 2. Suggested project structure

```
src/
├── layouts/
│   └── BaseLayout.astro        # <head>, fonts, global.css, SiteHeader, <slot/>, SiteFooter
├── components/
│   ├── SiteHeader.astro        # nav markup + a client script for scroll-state class
│   ├── SiteFooter.astro
│   ├── Button.astro            # variant: 'primary' | 'light' | 'ghost'; href, label
│   ├── Eyebrow.astro
│   ├── SectionHead.astro       # eyebrow + h2 + intro
│   ├── ImageSlot.astro         # Sanity image w/ urlFor; falls back to placeholder
│   ├── Reveal.astro            # wrapper that adds data-reveal (or use a directive)
│   ├── Hero.astro              # dark full-bleed hero (Home)
│   ├── PageHead.astro          # compact dark header (inner pages)
│   ├── TrustStrip.astro
│   ├── ValuePropCard.astro
│   ├── RevenueLine.astro
│   ├── StatBand.astro
│   ├── SplitSection.astro
│   ├── AudienceCard.astro
│   ├── InfoCard.astro          # numbered / icon card (What's included, Support)
│   ├── ProcessStep.astro
│   ├── InvestmentTable.astro
│   ├── Faq.astro               # island: accordion (client:visible)
│   ├── CtaBand.astro
│   └── LeadForm.astro          # island: validation + submit (client:visible)
├── lib/
│   ├── sanity.ts               # client + urlFor helper
│   └── queries.ts              # GROQ queries per page
├── styles/
│   └── global.css              # :root tokens copied from brand.css + base/element styles
└── pages/
    ├── index.astro             # Home  → homePage singleton
    ├── opportunity.astro       # → opportunityPage singleton
    ├── process.astro           # → processPage singleton
    ├── faq.astro               # → faqPage singleton
    └── contact.astro           # → contactPage singleton + form endpoint
```

Studio can live in the same repo (`/studio`) or a separate one — your call.

---

## 3. Reference → Astro mapping

The reference's `assets/site.js` injects the nav/footer and wires behavior in one vanilla
file. Split it up:

| Reference behavior (`site.js`) | Astro home |
|---|---|
| `wordmark()` + nav injection | `SiteHeader.astro` (static markup) |
| `onScroll()` scroll-state class | tiny inline `<script>` in `SiteHeader.astro` (no framework needed) |
| footer injection | `SiteFooter.astro` |
| `data-reveal` IntersectionObserver | `Reveal.astro` + one global island script, **or** CSS scroll-driven animation |
| FAQ accordion | `Faq.astro` with `client:visible` |
| Lead form validation + submit | `LeadForm.astro` with `client:visible` + an Astro API route |

CSS: copy `assets/brand.css` `:root` + helper classes and `assets/site.css` into
`global.css` (or co-locate per component as CSS Modules). Tokens are framework-agnostic.

### Header scroll-state script (drop in `SiteHeader.astro`)
```astro
<script>
  const header = document.querySelector('.nav');
  const onScroll = () => header?.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
</script>
```
Keep the `body.dark-hero` class on pages that have a dark header (all 5 do here) so the
logo/button swap CSS from `DESIGN-SPEC.md → Navigation` applies.

---

## 4. Sanity content model

Ready-to-drop schema files are in **`sanity/schemaTypes/`** (Sanity v3, `defineType`/`defineField`).
Register them in your studio's `schemaTypes/index.ts` (provided).

**Singletons (one document each):** `siteSettings`, `homePage`, `opportunityPage`,
`processPage`, `faqPage`, `contactPage`. Configure these as singletons in your
`structure` (desk) so editors get one editable doc each, not a "create new" list.

**Reusable objects:** `ctaBlock`, `seo`, `linkButton`, `statItem`, `valueProp`,
`revenueLine`, `audienceCard`, `infoCard`, `processStep`, `faqItem`, `investmentRow`, `nextStep`.

**What's intentionally an editable field (do not hard-code):**
- All financial figures + their footnotes/disclaimers (investment table, stat bands).
- All body copy, eyebrows, headings, CTA labels + hrefs.
- FAQ questions/answers + which one is open by default.
- Trust-strip items, revenue lines, value props, audience cards, process steps.
- Form select options (capital ranges, background options) + the consent text + lead inbox.
- Logo images + every photo (Sanity image fields), SEO per page.

### Singleton desk setup (example)
```ts
// structure.ts
export const structure = (S) =>
  S.list().title('Content').items([
    S.listItem().title('Site Settings').child(S.document().schemaType('siteSettings').documentId('siteSettings')),
    S.listItem().title('Home').child(S.document().schemaType('homePage').documentId('homePage')),
    S.listItem().title('Opportunity').child(S.document().schemaType('opportunityPage').documentId('opportunityPage')),
    S.listItem().title('Process').child(S.document().schemaType('processPage').documentId('processPage')),
    S.listItem().title('FAQ').child(S.document().schemaType('faqPage').documentId('faqPage')),
    S.listItem().title('Contact').child(S.document().schemaType('contactPage').documentId('contactPage')),
  ]);
```

---

## 5. Fetching (lib/sanity.ts + queries.ts)

```ts
// src/lib/sanity.ts
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const sanity = createClient({
  projectId: import.meta.env.SANITY_PROJECT_ID,
  dataset: import.meta.env.SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  useCdn: true, // marketing site — CDN is fine
});

const builder = imageUrlBuilder(sanity);
export const urlFor = (src) => builder.image(src);
```

```ts
// src/lib/queries.ts
export const HOME_QUERY = /* groq */ `*[_type == "homePage"][0]{
  seo, hero, trustStrip,
  why{ eyebrow, heading, intro, valueProps[]{ icon, title, body } },
  model{ eyebrow, heading, intro, revenueLines[]{ number, title, description, chip } },
  stats[]{ value, label }, statsFootnote,
  whyNow{ eyebrow, heading, lead, body, cta, image },
  who{ eyebrow, heading, cards[]{ tag, title, body } },
  cta
}`;
// …one query per page, shaped to the schemas in sanity/schemaTypes/
```

```astro
---
// src/pages/index.astro
import BaseLayout from '../layouts/BaseLayout.astro';
import { sanity } from '../lib/sanity';
import { HOME_QUERY } from '../lib/queries';
const data = await sanity.fetch(HOME_QUERY);
---
<BaseLayout seo={data.seo} darkHero>
  <Hero {...data.hero} />
  <TrustStrip items={data.trustStrip} />
  <!-- …sections… -->
</BaseLayout>
```

### Images
```astro
---
import { urlFor } from '../lib/sanity';
const { image, alt } = Astro.props;
---
{image
  ? <img src={urlFor(image).width(1600).quality(80).url()} alt={alt} />
  : <div class="slot dark"><span class="slot-tag">{alt}</span></div>}
```
Use Astro's `<Image />` or `urlFor()` with width/quality; keep the striped `.slot`
fallback so unfilled slots still look intentional.

---

## 6. Lead form — emailing submissions

The reference posts to **Web3Forms** client-side (`assets/site.js` → `WEB3FORMS_KEY`).
That works, but in Astro prefer a **server endpoint** so the key isn't shipped to the browser
and you can add spam protection / multi-destination delivery.

**Option A — Astro API route + Resend (recommended):**
```ts
// src/pages/api/lead.ts   (output: 'server' or 'hybrid' + an adapter)
import type { APIRoute } from 'astro';
import { Resend } from 'resend';
const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  const data = await request.json();
  // TODO: validate (zod), honeypot/captcha check, rate-limit
  await resend.emails.send({
    from: 'NeuMed Site <noreply@neumed.com>',
    to: import.meta.env.LEAD_INBOX,        // franchise@neumed.com
    subject: `Franchise inquiry — ${data.name}`,
    text: Object.entries(data).map(([k, v]) => `${k}: ${v}`).join('\n'),
  });
  return new Response(JSON.stringify({ ok: true }), { status: 200 });
};
```
`LeadForm.astro` keeps the reference's validation + UI states, but `fetch('/api/lead')`
instead of Web3Forms. Keep a graceful error state.

**Option B — keep Web3Forms** (zero backend): port the existing client logic from
`assets/site.js` into the `LeadForm` island and set the key via env.
**Option C — Formspree / your CRM webhook.** Confirm destination(s) with the client —
they asked for submissions to be **emailed**, and may also want CRM/Sheet/Slack copies.

Validation rules to preserve: all `required` fields non-empty; email regex
`/^[^@\s]+@[^@\s]+\.[^@\s]+$/`; scroll to first invalid field; sending → success swap with
personalized first-name greeting.

---

## 7. Env vars
```
SANITY_PROJECT_ID=...
SANITY_DATASET=production
# form delivery (pick per option above)
RESEND_API_KEY=...
LEAD_INBOX=franchise@neumed.com
# or
WEB3FORMS_KEY=...
```

## 8. Build / deploy notes
- Marketing site → **static** output works for everything except the form endpoint; use
  Astro `hybrid` mode (static pages + the one server API route) on Vercel/Netlify/Cloudflare.
- Set up Sanity **webhook → deploy hook** so content edits trigger a rebuild (or use SSR/ISR).
- Performance: self-host fonts, lazy-load below-fold images, preload the hero image.
- A11y: preserve focus rings, navy-on-green contrast, reduced-motion, form labels, and
  semantic headings (one `<h1>` per page).

## 9. Definition of done
- [ ] All 5 pages render from Sanity singletons; no copy or figures hard-coded.
- [ ] Header logo + button swap correctly between dark-hero and scrolled states.
- [ ] FAQ accordion (single-open, one default-open) works + keyboard accessible.
- [ ] Lead form validates, emails the inbox, shows sending/success/error states.
- [ ] Reveal animations respect reduced-motion and degrade to visible.
- [ ] Responsive at 920px and 600px per the spec.
- [ ] Figures carry their FDD disclaimers; placeholders clearly editable in Studio.
- [ ] Lighthouse: a11y + best-practices ≥ 95.
