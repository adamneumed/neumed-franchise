import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'processStep',
  title: 'Process step',
  type: 'object',
  fields: [
    defineField({ name: 'number', title: 'Number', type: 'string', description: 'e.g. "01"' }),
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'body', title: 'Body', type: 'text', rows: 2, validation: (r) => r.required() }),
  ],
  preview: { select: { title: 'title', subtitle: 'number' } },
});
