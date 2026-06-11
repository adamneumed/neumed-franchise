import { defineType, defineField } from 'sanity';

// "What happens next" item in the Contact aside.
export default defineType({
  name: 'nextStep',
  title: 'Next step',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'body', title: 'Body', type: 'text', rows: 2, validation: (r) => r.required() }),
  ],
  preview: { select: { title: 'title' } },
});
