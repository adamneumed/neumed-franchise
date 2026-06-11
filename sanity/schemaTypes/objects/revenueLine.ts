import { defineType, defineField } from 'sanity';

// A revenue line in the Home "The Model" section.
export default defineType({
  name: 'revenueLine',
  title: 'Revenue line',
  type: 'object',
  fields: [
    defineField({ name: 'number', title: 'Number', type: 'string', description: 'e.g. "01"' }),
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 2, validation: (r) => r.required() }),
    defineField({ name: 'chip', title: 'Chip label', type: 'string', description: 'e.g. "Insurance + cash", "High margin · cash", "Recurring"' }),
  ],
  preview: { select: { title: 'title', subtitle: 'chip' } },
});
