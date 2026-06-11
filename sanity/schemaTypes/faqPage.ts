import { defineType, defineField } from 'sanity';
import { pageHead } from './opportunityPage';

export default defineType({
  name: 'faqPage',
  title: 'FAQ',
  type: 'document',
  groups: [
    { name: 'head', title: 'Header' },
    { name: 'faqs', title: 'FAQs' },
    { name: 'cta', title: 'CTA' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({ name: 'seo', type: 'seo', group: 'seo' }),
    pageHead('head'),
    defineField({ name: 'items', title: 'FAQ items', type: 'array', of: [{ type: 'faqItem' }], group: 'faqs' }),
    defineField({ name: 'cta', title: 'CTA band', type: 'ctaBlock', group: 'cta' }),
  ],
  preview: { prepare: () => ({ title: 'FAQ' }) },
});
