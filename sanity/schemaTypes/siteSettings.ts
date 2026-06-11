import { defineType, defineField } from 'sanity';

// Global content shared across pages: logos, footer, contact + form delivery.
export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    { name: 'brand', title: 'Brand' },
    { name: 'footer', title: 'Footer' },
    { name: 'form', title: 'Form & contact' },
  ],
  fields: [
    // Brand
    defineField({ name: 'logoWhite', title: 'Logo — white (dark header & footer)', type: 'image', group: 'brand', description: 'Transparent PNG/SVG used over the dark header and in the footer.' }),
    defineField({ name: 'logoColor', title: 'Logo — color (white/scrolled header)', type: 'image', group: 'brand', description: 'Transparent PNG/SVG used once the header turns white on scroll.' }),
    defineField({ name: 'navTag', title: 'Nav tag', type: 'string', initialValue: 'Franchise', group: 'brand' }),

    // Footer
    defineField({ name: 'footerBlurb', title: 'Footer blurb', type: 'text', rows: 3, group: 'footer' }),
    defineField({
      name: 'footerColumns', title: 'Footer link columns', type: 'array', group: 'footer',
      of: [{
        type: 'object',
        fields: [
          { name: 'heading', title: 'Heading', type: 'string' },
          { name: 'links', title: 'Links', type: 'array', of: [{ type: 'linkButton' }] },
        ],
        preview: { select: { title: 'heading' } },
      }],
    }),
    defineField({ name: 'disclaimer', title: 'Legal disclaimer', type: 'text', rows: 2, group: 'footer', initialValue: 'This is not a franchise offering. A franchise offering is made only by a Franchise Disclosure Document. Figures shown are illustrative.' }),
    defineField({ name: 'copyright', title: 'Copyright line', type: 'string', group: 'footer' }),

    // Form & contact
    defineField({ name: 'leadInbox', title: 'Lead email inbox', type: 'string', group: 'form', description: 'Where Request-Info submissions are emailed.', validation: (r) => r.email() }),
    defineField({ name: 'contactEmail', title: 'Public contact email', type: 'string', group: 'form', validation: (r) => r.email() }),
    defineField({ name: 'locationLine', title: 'Location / hours line', type: 'string', group: 'form', initialValue: 'Houston, TX · Mon–Fri' }),
  ],
  preview: { prepare: () => ({ title: 'Site Settings' }) },
});
