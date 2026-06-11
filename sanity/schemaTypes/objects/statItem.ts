import { defineType, defineField } from 'sanity';

// One figure in a stat band (mono number + caption). Keep figures editable + footnoted.
export default defineType({
  name: 'statItem',
  title: 'Stat',
  type: 'object',
  fields: [
    defineField({ name: 'value', title: 'Value', type: 'string', description: 'e.g. "$685K–$1.2M", "4", "18–24 mo"', validation: (r) => r.required() }),
    defineField({ name: 'label', title: 'Label', type: 'string', validation: (r) => r.required() }),
  ],
  preview: { select: { title: 'value', subtitle: 'label' } },
});
