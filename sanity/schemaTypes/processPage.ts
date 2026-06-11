import { defineType, defineField } from 'sanity';
import { pageHead } from './opportunityPage';

export default defineType({
  name: 'processPage',
  title: 'Process',
  type: 'document',
  groups: [
    { name: 'head', title: 'Header' },
    { name: 'steps', title: 'Steps' },
    { name: 'support', title: 'Support' },
    { name: 'cta', title: 'CTA' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({ name: 'seo', type: 'seo', group: 'seo' }),
    pageHead('head'),

    // Steps
    defineField({ name: 'steps', title: 'Process steps', type: 'array', of: [{ type: 'processStep' }], group: 'steps' }),
    defineField({ name: 'stepsFootnote', title: 'Timeline footnote', type: 'text', rows: 2, group: 'steps' }),

    // Support
    defineField({
      name: 'support', title: 'Support', type: 'object', group: 'support',
      fields: [
        { name: 'eyebrow', title: 'Eyebrow', type: 'string' },
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'intro', title: 'Intro', type: 'text', rows: 3 },
        { name: 'cards', title: 'Cards', type: 'array', of: [{ type: 'infoCard' }] },
      ],
    }),

    defineField({ name: 'cta', title: 'CTA band', type: 'ctaBlock', group: 'cta' }),
  ],
  preview: { prepare: () => ({ title: 'Process' }) },
});
