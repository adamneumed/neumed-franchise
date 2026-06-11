import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'valueProp',
  title: 'Value prop',
  type: 'object',
  fields: [
    defineField({ name: 'icon', title: 'Icon glyph', type: 'string', description: 'A single glyph/emoji or an icon name your component maps. Reference uses ◆ ↻ ♥.' }),
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'body', title: 'Body', type: 'text', rows: 3, validation: (r) => r.required() }),
  ],
  preview: { select: { title: 'title' } },
});
