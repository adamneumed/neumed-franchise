import { defineType, defineField } from 'sanity';

// Reusable section-head object: eyebrow + heading + intro.
const sectionHead = (name: string, title: string) =>
  defineField({
    name, title, type: 'object',
    options: { collapsible: true },
    fields: [
      { name: 'eyebrow', title: 'Eyebrow', type: 'string' },
      { name: 'heading', title: 'Heading', type: 'string' },
      { name: 'intro', title: 'Intro', type: 'text', rows: 3 },
    ],
  });

export default defineType({
  name: 'homePage',
  title: 'Home',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'why', title: 'Why NeuMed' },
    { name: 'model', title: 'The Model' },
    { name: 'stats', title: 'Stats' },
    { name: 'whyNow', title: 'Why now' },
    { name: 'who', title: "Who it's for" },
    { name: 'cta', title: 'CTA' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({ name: 'seo', type: 'seo', group: 'seo' }),

    // Hero
    defineField({
      name: 'hero', title: 'Hero', type: 'object', group: 'hero',
      fields: [
        { name: 'eyebrow', title: 'Eyebrow', type: 'string' },
        { name: 'heading', title: 'Heading', type: 'string', validation: (r) => r.required() },
        { name: 'lead', title: 'Lead', type: 'text', rows: 3 },
        { name: 'buttons', title: 'Buttons', type: 'array', of: [{ type: 'linkButton' }], validation: (r) => r.max(2) },
        { name: 'image', title: 'Background photo', type: 'image', options: { hotspot: true } },
      ],
    }),

    // Trust strip
    defineField({ name: 'trustStrip', title: 'Trust strip items', type: 'array', of: [{ type: 'string' }], group: 'hero', validation: (r) => r.max(4) }),

    // Why NeuMed
    sectionHead('why', 'Why NeuMed — head'),
    defineField({ name: 'valueProps', title: 'Value props', type: 'array', of: [{ type: 'valueProp' }], group: 'why', validation: (r) => r.max(3) }),

    // The Model
    sectionHead('model', 'The Model — head'),
    defineField({ name: 'revenueLines', title: 'Revenue lines', type: 'array', of: [{ type: 'revenueLine' }], group: 'model' }),

    // Stats
    defineField({ name: 'stats', title: 'Stats', type: 'array', of: [{ type: 'statItem' }], group: 'stats', validation: (r) => r.max(4) }),
    defineField({ name: 'statsFootnote', title: 'Stats footnote (FDD disclaimer)', type: 'text', rows: 2, group: 'stats' }),

    // Why now (split)
    defineField({
      name: 'whyNow', title: 'Why now', type: 'object', group: 'whyNow',
      fields: [
        { name: 'eyebrow', title: 'Eyebrow', type: 'string' },
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'lead', title: 'Lead', type: 'text', rows: 3 },
        { name: 'body', title: 'Body', type: 'text', rows: 3 },
        { name: 'cta', title: 'CTA', type: 'linkButton' },
        { name: 'image', title: 'Photo', type: 'image', options: { hotspot: true } },
      ],
    }),

    // Who it's for
    sectionHead('who', "Who it's for — head"),
    defineField({ name: 'whoCards', title: 'Audience cards', type: 'array', of: [{ type: 'audienceCard' }], group: 'who', validation: (r) => r.max(3) }),

    // CTA
    defineField({ name: 'cta', title: 'CTA band', type: 'ctaBlock', group: 'cta' }),
  ],
  preview: { prepare: () => ({ title: 'Home' }) },
});
