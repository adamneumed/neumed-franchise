import { defineType, defineField } from 'sanity';

// Numbered/icon card used in "What's included" and "Support" grids.
export default defineType({
  name: 'infoCard',
  title: 'Info card',
  type: 'object',
  fields: [
    defineField({ name: 'kicker', title: 'Number or icon', type: 'string', description: 'e.g. "01" or a glyph like ◎' }),
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'body', title: 'Body', type: 'text', rows: 3, validation: (r) => r.required() }),
  ],
  preview: { select: { title: 'title', subtitle: 'kicker' } },
});
