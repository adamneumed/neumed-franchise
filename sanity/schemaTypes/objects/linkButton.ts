import { defineType, defineField } from 'sanity';

// A button/link used in heroes, CTAs, nav, footer.
export default defineType({
  name: 'linkButton',
  title: 'Link / Button',
  type: 'object',
  fields: [
    defineField({ name: 'label', title: 'Label', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'href', title: 'URL / path', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'variant', title: 'Style', type: 'string',
      options: { list: ['primary', 'light', 'ghost'], layout: 'radio' },
      initialValue: 'primary',
    }),
    defineField({ name: 'external', title: 'Opens in new tab', type: 'boolean', initialValue: false }),
  ],
  preview: { select: { title: 'label', subtitle: 'href' } },
});
