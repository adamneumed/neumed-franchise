import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({ name: 'title', title: 'Meta title', type: 'string', validation: (r) => r.max(60) }),
    defineField({ name: 'description', title: 'Meta description', type: 'text', rows: 2, validation: (r) => r.max(160) }),
    defineField({ name: 'ogImage', title: 'Social share image', type: 'image' }),
  ],
});
