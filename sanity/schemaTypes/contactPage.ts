import { defineType, defineField } from 'sanity';
import { pageHead } from './opportunityPage';

export default defineType({
  name: 'contactPage',
  title: 'Contact',
  type: 'document',
  groups: [
    { name: 'head', title: 'Header' },
    { name: 'form', title: 'Form' },
    { name: 'aside', title: 'Aside' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({ name: 'seo', type: 'seo', group: 'seo' }),
    pageHead('head'),

    // Form copy + editable options (field structure itself is fixed in code)
    defineField({
      name: 'form', title: 'Form', type: 'object', group: 'form',
      fields: [
        { name: 'heading', title: 'Heading', type: 'string', initialValue: 'Request franchise info' },
        { name: 'intro', title: 'Intro', type: 'text', rows: 2 },
        { name: 'capitalOptions', title: 'Liquid-capital options', type: 'array', of: [{ type: 'string' }], initialValue: ['Under $250K', '$250K – $500K', '$500K – $1M', '$1M+'] },
        { name: 'backgroundOptions', title: 'Background options', type: 'array', of: [{ type: 'string' }], initialValue: ['First-time franchise buyer', 'Experienced multi-unit operator', 'Healthcare professional (MD / NP)', 'Investor', 'Other'] },
        { name: 'consentText', title: 'Consent checkbox text', type: 'text', rows: 2 },
        { name: 'submitLabel', title: 'Submit button label', type: 'string', initialValue: 'Send me the discovery packet →' },
        { name: 'reassurance', title: 'Reassurance line', type: 'string', initialValue: 'No obligation · We typically reply within 2 business days' },
        { name: 'successHeading', title: 'Success heading', type: 'string', initialValue: 'Request received.' },
        { name: 'successBody', title: 'Success body', type: 'text', rows: 3 },
      ],
    }),

    // Aside
    defineField({
      name: 'aside', title: 'Aside', type: 'object', group: 'aside',
      fields: [
        { name: 'heading', title: 'Heading', type: 'string', initialValue: 'What happens next' },
        { name: 'intro', title: 'Intro', type: 'string' },
        { name: 'steps', title: 'Next steps', type: 'array', of: [{ type: 'nextStep' }] },
        { name: 'boxHeading', title: 'Contact box kicker', type: 'string', initialValue: 'Prefer to talk?' },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'Contact' }) },
});
