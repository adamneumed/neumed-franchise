import { defineType, defineField } from 'sanity';

// A row in the Opportunity investment table.
export default defineType({
  name: 'investmentRow',
  title: 'Investment row',
  type: 'object',
  fields: [
    defineField({ name: 'component', title: 'Component', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'amount', title: 'Illustrative range', type: 'string', description: 'e.g. "$225,000 – $585,000"', validation: (r) => r.required() }),
    defineField({ name: 'isTotal', title: 'Highlight as total row', type: 'boolean', initialValue: false }),
  ],
  preview: { select: { title: 'component', subtitle: 'amount' } },
});
