import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'faqItem',
  title: 'FAQ item',
  type: 'object',
  fields: [
    defineField({ name: 'question', title: 'Question', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'answer', title: 'Answer', type: 'text', rows: 4, validation: (r) => r.required() }),
    defineField({ name: 'defaultOpen', title: 'Open by default', type: 'boolean', initialValue: false, description: 'Only mark one item as open by default.' }),
  ],
  preview: { select: { title: 'question', open: 'defaultOpen' }, prepare: ({ title, open }) => ({ title, subtitle: open ? 'Open by default' : '' }) },
});
