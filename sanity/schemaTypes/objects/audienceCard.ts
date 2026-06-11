import { defineType, defineField } from 'sanity';

// "Who we're looking for" card.
export default defineType({
  name: 'audienceCard',
  title: 'Audience card',
  type: 'object',
  fields: [
    defineField({ name: 'tag', title: 'Tag', type: 'string', description: 'Mono kicker, e.g. "01 · Entrepreneurs"' }),
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'body', title: 'Body', type: 'text', rows: 3, validation: (r) => r.required() }),
  ],
  preview: { select: { title: 'title', subtitle: 'tag' } },
});
