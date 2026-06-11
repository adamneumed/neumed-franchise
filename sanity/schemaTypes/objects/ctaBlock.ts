import { defineType, defineField } from 'sanity';

// Dark, full-bleed call-to-action band used at the foot of every page.
export default defineType({
  name: 'ctaBlock',
  title: 'CTA band',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'body', title: 'Body', type: 'text', rows: 2 }),
    defineField({ name: 'buttons', title: 'Buttons', type: 'array', of: [{ type: 'linkButton' }], validation: (r) => r.max(2) }),
    defineField({ name: 'backgroundImage', title: 'Background photo', type: 'image', options: { hotspot: true } }),
  ],
  preview: { select: { title: 'heading' }, prepare: ({ title }) => ({ title: `CTA — ${title}` }) },
});
