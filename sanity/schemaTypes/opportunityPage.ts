import { defineType, defineField } from 'sanity';

// Reusable compact dark page header.
export const pageHead = (group = 'head') =>
  defineField({
    name: 'pageHead', title: 'Page header', type: 'object', group,
    fields: [
      { name: 'eyebrow', title: 'Eyebrow', type: 'string' },
      { name: 'heading', title: 'Heading', type: 'string', validation: (r) => r.required() },
      { name: 'lead', title: 'Lead', type: 'text', rows: 3 },
      { name: 'image', title: 'Background photo', type: 'image', options: { hotspot: true } },
    ],
  });

export default defineType({
  name: 'opportunityPage',
  title: 'Opportunity',
  type: 'document',
  groups: [
    { name: 'head', title: 'Header' },
    { name: 'investment', title: 'Investment' },
    { name: 'math', title: 'Unit economics' },
    { name: 'included', title: "What's included" },
    { name: 'who', title: 'Who' },
    { name: 'cta', title: 'CTA' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({ name: 'seo', type: 'seo', group: 'seo' }),
    pageHead('head'),

    // Investment
    defineField({
      name: 'investment', title: 'The Investment', type: 'object', group: 'investment',
      fields: [
        { name: 'eyebrow', title: 'Eyebrow', type: 'string' },
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'body', title: 'Body paragraphs', type: 'array', of: [{ type: 'text', rows: 2 }] },
        { name: 'cta', title: 'CTA', type: 'linkButton' },
        { name: 'rows', title: 'Investment table rows', type: 'array', of: [{ type: 'investmentRow' }] },
        { name: 'footnote', title: 'Footnote (FDD Item 7)', type: 'text', rows: 2 },
      ],
    }),

    // Unit economics
    defineField({
      name: 'math', title: 'The Math', type: 'object', group: 'math',
      fields: [
        { name: 'eyebrow', title: 'Eyebrow', type: 'string' },
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'intro', title: 'Intro', type: 'text', rows: 3 },
        { name: 'stats', title: 'Stats', type: 'array', of: [{ type: 'statItem' }], validation: (r) => r.max(4) },
        { name: 'footnote', title: 'Footnote (FDD Item 19)', type: 'text', rows: 2 },
      ],
    }),

    // What's included
    defineField({
      name: 'included', title: "What's included", type: 'object', group: 'included',
      fields: [
        { name: 'eyebrow', title: 'Eyebrow', type: 'string' },
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'cards', title: 'Cards', type: 'array', of: [{ type: 'infoCard' }] },
      ],
    }),

    // Who
    defineField({
      name: 'who', title: 'Who', type: 'object', group: 'who',
      fields: [
        { name: 'eyebrow', title: 'Eyebrow', type: 'string' },
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'intro', title: 'Intro', type: 'text', rows: 3 },
        { name: 'cards', title: 'Audience cards', type: 'array', of: [{ type: 'audienceCard' }], validation: (r) => r.max(3) },
        { name: 'buttons', title: 'Buttons', type: 'array', of: [{ type: 'linkButton' }], validation: (r) => r.max(2) },
      ],
    }),

    defineField({ name: 'cta', title: 'CTA band', type: 'ctaBlock', group: 'cta' }),
  ],
  preview: { prepare: () => ({ title: 'Opportunity' }) },
});
