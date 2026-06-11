export interface Seo {
  title: string;
  description: string;
}

export interface LinkButton {
  label: string;
  href: string;
  variant?: 'primary' | 'light' | 'ghost';
}

export interface CtaBlock {
  heading: string;
  body: string;
  imageTag: string;
  primary: LinkButton;
  secondary?: LinkButton;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface ValueProp {
  icon: string;
  title: string;
  body: string;
}

export interface RevenueLine {
  number: string;
  title: string;
  description: string;
  chip: string;
}

export interface AudienceCard {
  tag: string;
  title: string;
  body: string;
}

export interface InfoCard {
  number?: string;
  icon?: string;
  title: string;
  body: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  body: string;
}

export interface InvestmentRow {
  component: string;
  amount: string;
  isTotal?: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
  openByDefault?: boolean;
}

export interface NextStep {
  number: string;
  title: string;
  body: string;
}

export interface SiteSettings {
  footerBlurb: string;
  copyright: string;
  disclaimer: string;
  leadEmail: string;
  location: string;
}

export interface HomePage {
  seo: Seo;
  hero: {
    eyebrow: string;
    heading: string;
    lead: string;
    imageTag: string;
    imageSrc?: string;
    imageAlt?: string;
    primary: LinkButton;
    secondary: LinkButton;
  };
  trustStrip: string[];
  why: {
    eyebrow: string;
    heading: string;
    intro: string;
    valueProps: ValueProp[];
  };
  model: {
    eyebrow: string;
    heading: string;
    intro: string;
    revenueLines: RevenueLine[];
  };
  stats: StatItem[];
  statsFootnote: string;
  whyNow: {
    eyebrow: string;
    heading: string;
    lead: string;
    body: string;
    cta: LinkButton;
    imageTag: string;
    imageSrc?: string;
    imageAlt?: string;
  };
  who: {
    eyebrow: string;
    heading: string;
    cards: AudienceCard[];
  };
  video: {
    eyebrow: string;
    heading: string;
    lead: string;
    body: string;
    youtubeId: string;
  };
  cta: CtaBlock;
}

export interface OpportunityPage {
  seo: Seo;
  pageHead: {
    eyebrow: string;
    heading: string;
    lead: string;
    imageTag: string;
    imageSrc?: string;
    imageAlt?: string;
  };
  investment: {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
    cta: LinkButton;
    rows: InvestmentRow[];
    footnote: string;
  };
  math: {
    eyebrow: string;
    heading: string;
    intro: string;
    stats: StatItem[];
    footnote: string;
  };
  included: {
    eyebrow: string;
    heading: string;
    cards: InfoCard[];
  };
  who: {
    eyebrow: string;
    heading: string;
    intro: string;
    cards: AudienceCard[];
    ctas: LinkButton[];
  };
  cta: CtaBlock;
}

export interface ProcessPage {
  seo: Seo;
  pageHead: {
    eyebrow: string;
    heading: string;
    lead: string;
    imageTag: string;
    imageSrc?: string;
    imageAlt?: string;
  };
  steps: ProcessStep[];
  stepsFootnote: string;
  support: {
    eyebrow: string;
    heading: string;
    intro: string;
    cards: InfoCard[];
  };
  cta: CtaBlock;
}

export interface FaqPage {
  seo: Seo;
  pageHead: {
    eyebrow: string;
    heading: string;
    lead: string;
    imageTag: string;
    imageSrc?: string;
    imageAlt?: string;
  };
  items: FaqItem[];
  cta: CtaBlock;
}

export interface ContactPage {
  seo: Seo;
  pageHead: {
    eyebrow: string;
    heading: string;
    lead: string;
    imageTag: string;
  };
  form: {
    submitLabel: string;
    footnote: string;
    consentText: string;
    capitalOptions: string[];
    backgroundOptions: string[];
    successTitle: string;
    successBody: string;
  };
  aside: {
    heading: string;
    intro: string;
    steps: NextStep[];
    contactHeading: string;
    email: string;
    location: string;
  };
}

export const siteSettings: SiteSettings = {
  footerBlurb:
    'A scalable urgent care + wellness franchise model — built for recurring revenue, durable margins, and real community impact.',
  copyright: '© 2026 NeuMed Modern Urgent Care + IV Therapy',
  disclaimer:
    'This is not a franchise offering. A franchise offering is made only by a Franchise Disclosure Document. Figures shown are illustrative.',
  leadEmail: 'franchise@neumed.com',
  location: 'Houston, TX',
};

export const homePage: HomePage = {
  seo: {
    title: 'NeuMed Franchise — Own the Future of Modern Healthcare',
    description:
      'A scalable urgent care + wellness franchise model designed for recurring revenue, strong margins, and community impact.',
  },
  hero: {
    eyebrow: 'NeuMed Franchise Opportunity',
    heading: 'Healthcare, reimagined — and ready to scale.',
    lead: "Bring Houston's highest-rated urgent care + wellness experience to your market with a turnkey, recurring-revenue model that patients actually love.",
    imageTag: 'Full-bleed photo — NeuMed clinic waiting room',
    imageSrc: '/assets/home-hero-clinic-exterior.png',
    imageAlt: 'NeuMed clinic waiting room with modern teal and green interior',
    primary: { label: 'Request Franchise Info →', href: '/contact', variant: 'primary' },
    secondary: { label: 'Book a Discovery Call', href: '/contact', variant: 'light' },
  },
  trustStrip: [
    'Established 2020',
    '5 Houston clinics',
    'Open 8am–8pm · 365 days',
    'In-network with major insurers',
  ],
  why: {
    eyebrow: 'Why NeuMed',
    heading: 'A modern model with more ways to win.',
    intro:
      'Traditional urgent care is a single-revenue, insurance-dependent business. NeuMed layers high-margin wellness on top — so a single location earns from four directions at once.',
    valueProps: [
      {
        icon: '◆',
        title: 'Multiple revenue lines',
        body: 'Urgent care, IV therapy, medical weight loss, and hormone wellness — all under one roof, sharing the same staff, space, and patient base.',
      },
      {
        icon: '↻',
        title: 'Recurring by design',
        body: 'Memberships, weight-loss programs, and wellness regimens turn one-time visits into predictable, compounding monthly revenue.',
      },
      {
        icon: '♥',
        title: 'A brand people love',
        body: 'Spa-inspired clinics, private infusion suites, and a modern marketing playbook that earns reviews and referrals on its own.',
      },
    ],
  },
  model: {
    eyebrow: 'The Model',
    heading: 'Four revenue lines. One clinic.',
    intro:
      'Insurance-billed care smooths cash flow while high-margin cash-pay wellness drives profitability. Each line strengthens the others.',
    revenueLines: [
      {
        number: '01',
        title: 'Walk-in Urgent Care',
        description:
          'The anchor. Insurance + self-pay visits with on-site labs and X-ray, averaging 20–30 minute visits versus 2+ hours at an ER.',
        chip: 'Insurance + cash',
      },
      {
        number: '02',
        title: 'IV Therapy & Vitamin Shots',
        description:
          'Medical-grade infusions in private suites. High-margin, repeat-driven, and the cornerstone of the NeuMed brand experience.',
        chip: 'High margin · cash',
      },
      {
        number: '03',
        title: 'Medical Weight Loss',
        description:
          'Physician-supervised Semaglutide & Tirzepatide programs — a fast-growing category with strong monthly recurring revenue.',
        chip: 'Recurring',
      },
      {
        number: '04',
        title: "Hormone & Men's Health",
        description:
          'Bio-identical hormone therapy, TRT, and longevity services that build long-term, loyal patient relationships.',
        chip: 'Recurring',
      },
    ],
  },
  stats: [
    { value: '$646K–$1.3M', label: 'Estimated initial investment*' },
    { value: '4', label: 'Core revenue lines per clinic' },
    { value: '18–24 mo', label: 'Target ramp to maturity*' },
    { value: '$65B+', label: 'U.S. urgent care + wellness TAM*' },
  ],
  statsFootnote:
    '*Illustrative figures for discussion only — actual ranges are disclosed in Items 7 & 19 of the Franchise Disclosure Document.',
  whyNow: {
    eyebrow: 'Why now',
    heading: "The wellness boom meets everyday care.",
    lead:
      'Consumers are spending on prevention, performance, and longevity like never before — and they want it delivered with the convenience of urgent care. NeuMed sits exactly at that intersection.',
    body:
      "The insurance-plus-cash-pay mix means you're not betting on a single trend — you're capturing both the steady demand for acute care and the fast-growing appetite for wellness.",
    cta: { label: 'Explore the opportunity →', href: '/opportunity', variant: 'ghost' },
    imageTag: 'Photo — patient in private infusion suite',
    imageSrc: '/assets/home-infusion-suite.png',
    imageAlt: 'Private IV infusion therapy suite at NeuMed',
  },
  who: {
    eyebrow: "Who we're looking for",
    heading: 'Built for serious operators.',
    cards: [
      {
        tag: '01 · Entrepreneurs',
        title: 'First-time franchise buyers',
        body: 'You want a proven system, not a science project. Our turnkey playbook lets driven first-time owners launch with confidence.',
      },
      {
        tag: '02 · Operators',
        title: 'Multi-unit operators',
        body: 'Experienced franchise groups looking to add a resilient, multi-revenue healthcare brand to a portfolio and scale across territories.',
      },
      {
        tag: '03 · Clinicians',
        title: 'Healthcare professionals',
        body: "Physicians and nurse practitioners ready to own the clinic they've always wanted to work in — with business support handled.",
      },
    ],
  },
  video: {
    eyebrow: 'From the founders',
    heading: 'Meet the people behind NeuMed.',
    lead:
      'Meet the founders of NeuMed and hear the story behind the brand, the model, and the vision for franchising.',
    body:
      "In this video, our founders walk through what NeuMed is, what makes the clinic model distinctive, and what they look for in franchise partners. Whether you're an investor, an operator, or a healthcare entrepreneur exploring your next move, this is an introduction to who we are and how the opportunity works.",
    youtubeId: 'LHLavZmC4pw',
  },
  cta: {
    heading: "Let's talk about your market.",
    body: 'Request the franchise discovery packet — unit economics, available territories, and the full picture. No obligation.',
    imageTag: 'Background photo — clinic exterior at dusk',
    primary: { label: 'Request Franchise Info →', href: '/contact', variant: 'primary' },
    secondary: { label: 'See how it works', href: '/process', variant: 'light' },
  },
};

export const opportunityPage: OpportunityPage = {
  seo: {
    title: 'The Opportunity — NeuMed Franchise',
    description: "The NeuMed franchise investment, revenue model, and the operators we're looking for.",
  },
  pageHead: {
    eyebrow: 'The Opportunity',
    heading: 'A resilient business, engineered for returns.',
    lead: "Four revenue lines, an insurance-plus-cash-pay mix, and a wellness category that's still accelerating. Here's how the numbers come together.",
    imageTag: 'Photo — clinic reception / waiting lounge',
    imageSrc: '/assets/opportunity-hero.png',
    imageAlt: 'NeuMed reception — staff greeting a patient',
  },
  investment: {
    eyebrow: 'The Investment',
    heading: 'What it takes to open.',
    paragraphs: [
      'Your total investment depends on market, real estate, and buildout. The illustrative range below covers a single NeuMed clinic from signing through grand opening.',
      'We help you model the full picture during discovery — including financing options and SBA eligibility.',
    ],
    cta: { label: 'Request the full breakdown →', href: '/contact', variant: 'primary' },
    rows: [
      { component: 'Initial franchise fee', amount: '$50,000' },
      { component: 'Buildout & leasehold improvements', amount: '$225,000 – $585,000' },
      { component: 'Medical equipment & technology', amount: '$131,500 – $208,000' },
      { component: 'Licensing, launch & marketing', amount: '$21,000 – $37,000' },
      { component: 'Working capital (first 3 mo.)', amount: '$218,500 – $432,000' },
      { component: 'Estimated initial investment', amount: '$646K – $1.3M', isTotal: true },
    ],
    footnote: '*Illustrative only. Actual figures are disclosed in Item 7 of the FDD and vary by market.',
  },
  math: {
    eyebrow: 'The Math',
    heading: 'Why the multi-revenue model matters.',
    intro:
      "A single clinic isn't betting on one service. High-margin wellness lifts blended margins while insurance-billed urgent care keeps the lights on year-round.",
    stats: [
      { value: '~55%', label: 'Target wellness gross margin*' },
      { value: '$1.4M–$2.6M', label: 'Illustrative mature-clinic revenue*' },
      { value: '40%+', label: 'Cash-pay share of revenue*' },
      { value: '18–24 mo', label: 'Target ramp to maturity*' },
    ],
    footnote:
      '*Illustrative figures for discussion only. NeuMed makes no representation of financial performance outside of Item 19 of its Franchise Disclosure Document.',
  },
  included: {
    eyebrow: "What's included",
    heading: 'A turnkey system, not a logo.',
    cards: [
      { number: '01', title: 'Buildout support', body: 'Site selection criteria, clinic design templates, equipment specs, and vendor relationships to open faster and on budget.' },
      { number: '02', title: 'Training & onboarding', body: 'Clinical protocols, operations training, and an opening playbook so your team runs the NeuMed way from day one.' },
      { number: '03', title: 'Marketing engine', body: 'Brand assets, local launch campaigns, the NeuMed app, memberships, and the reputation system that drives reviews.' },
      { number: '04', title: 'Wellness menu', body: 'The full IV, weight-loss, and hormone catalog — formulas, pricing, and supplier access — ready to plug in.' },
      { number: '05', title: 'Technology stack', body: 'EMR, scheduling, paperless registration, and billing systems pre-integrated for a modern patient experience.' },
      { number: '06', title: 'Ongoing operations', body: 'A dedicated franchise support team, performance benchmarking, and a network of owners sharing what works.' },
    ],
  },
  who: {
    eyebrow: "Who we're looking for",
    heading: 'The right fit for the brand.',
    intro:
      "You don't need a medical background — but you do need drive, capital, and a commitment to patient experience. We provide the clinical infrastructure.",
    cards: [
      { tag: 'Entrepreneurs', title: 'First-time owners', body: 'Ambitious operators who want a proven, multi-revenue system with real support behind it.' },
      { tag: 'Operators', title: 'Multi-unit groups', body: 'Established franchisees ready to scale a recession-resistant healthcare brand across territories.' },
      { tag: 'Clinicians', title: 'Healthcare professionals', body: 'MDs and NPs ready to own — with the business and marketing side handled for them.' },
    ],
    ctas: [
      { label: 'See the process →', href: '/process', variant: 'ghost' },
      { label: 'Request franchise info', href: '/contact', variant: 'primary' },
    ],
  },
  cta: {
    heading: 'See if your market is available.',
    body: "Territories are awarded selectively. Start the conversation and we'll send the discovery packet.",
    imageTag: 'Background photo — team / providers',
    primary: { label: 'Request Franchise Info →', href: '/contact', variant: 'primary' },
  },
};

export const processPage: ProcessPage = {
  seo: {
    title: 'How It Works — NeuMed Franchise',
    description: 'The path from first inquiry to grand opening as a NeuMed franchise owner.',
  },
  pageHead: {
    eyebrow: 'How It Works',
    heading: 'From first call to grand opening.',
    lead: "A clear, mutual process. We get to know each other, you get the full picture, and we move forward only when it's right for both sides.",
    imageTag: 'Photo — discovery day / handshake',
    imageSrc: '/assets/process-hero.png',
    imageAlt: 'NeuMed provider reviewing imaging with a patient',
  },
  steps: [
    { number: '01', title: 'Request information', body: "Tell us about yourself and your target market. We'll send the franchise discovery packet and set up an intro call." },
    { number: '02', title: 'Discovery call', body: 'A relaxed conversation about the model, your goals, capital, and timeline — and a chance for all your questions.' },
    { number: '03', title: 'Review the FDD', body: 'We share the Franchise Disclosure Document. Take the time you need to review the details with your advisors.' },
    { number: '04', title: 'Discovery Day', body: 'Visit a NeuMed clinic in Houston. Meet the team, see operations firsthand, and experience the brand in person.' },
    { number: '05', title: 'Mutual decision & signing', body: "If we're a fit on both sides, we award the territory and sign the franchise agreement." },
    { number: '06', title: 'Site selection & buildout', body: "We help you secure real estate and build out the clinic to NeuMed's spa-inspired design standard." },
    { number: '07', title: 'Training & hiring', body: 'Your team trains on clinical protocols, the wellness menu, and operations. We help you staff and prepare to launch.' },
    { number: '08', title: 'Grand opening', body: 'Launch with a local marketing campaign and ongoing support to ramp toward maturity.' },
  ],
  stepsFootnote:
    'Typical timeline from signing to opening: 9–14 months, depending on real estate and permitting. Illustrative only.',
  support: {
    eyebrow: "We've got your back",
    heading: "Support that doesn't stop at opening.",
    intro: 'Becoming an owner is just the start. The NeuMed team stays in the trenches with you long after launch.',
    cards: [
      { icon: '◎', title: 'Dedicated franchise team', body: 'A real point of contact for operations, clinical questions, and growth — not a ticket queue.' },
      { icon: '▤', title: 'Playbooks & benchmarks', body: 'Documented systems for everything, plus performance data across the network so you always know where you stand.' },
      { icon: '◇', title: 'Marketing & brand', body: 'National brand momentum, campaign templates, the NeuMed app, and membership programs that drive repeat visits.' },
      { icon: '⚕', title: 'Clinical infrastructure', body: 'Protocols, medical direction guidance, and supplier access so care quality stays consistent everywhere.' },
      { icon: '◷', title: 'Continuing education', body: 'Ongoing training as the wellness menu evolves — new services, new revenue, kept current.' },
      { icon: '⌂', title: 'Owner community', body: 'A network of NeuMed owners sharing what works, from hiring to local marketing wins.' },
    ],
  },
  cta: {
    heading: 'Ready to take the first step?',
    body: 'It starts with a simple request. No pressure, no obligation — just a conversation.',
    imageTag: 'Background photo — clinic interior',
    primary: { label: 'Request Franchise Info →', href: '/contact', variant: 'primary' },
    secondary: { label: 'Read the FAQ', href: '/faq', variant: 'light' },
  },
};

export const faqPage: FaqPage = {
  seo: {
    title: 'Franchise FAQ — NeuMed',
    description: 'Answers to the most common questions about owning a NeuMed franchise.',
  },
  pageHead: {
    eyebrow: 'FAQ',
    heading: 'Questions, answered.',
    lead: "The things prospective owners ask us most. Don't see yours? Reach out — we're happy to talk specifics.",
    imageTag: 'Photo — provider with patient',
    imageSrc: '/assets/faq-hero.png',
    imageAlt: 'NeuMed doctor examining a young patient',
  },
  items: [
    {
      question: 'Do I need to be a doctor to own a NeuMed franchise?',
      answer:
        "No. Many of our ideal owners are business operators, not clinicians. NeuMed provides the clinical infrastructure, protocols, and medical direction guidance — you focus on running a great business. That said, physicians and nurse practitioners who want to own their own clinic are an excellent fit too. (Some states have specific medical ownership rules we'll walk you through.)",
      openByDefault: true,
    },
    {
      question: 'How much does it cost to open a NeuMed clinic?',
      answer:
        'The estimated initial investment for a single clinic ranges from roughly $646K to $1.3M, including the franchise fee, buildout, equipment, launch marketing, and working capital. Your actual investment depends on market and real estate. Full details are disclosed in Item 7 of the Franchise Disclosure Document. These figures are illustrative.',
    },
    {
      question: 'What makes NeuMed different from other urgent care franchises?',
      answer:
        "Most urgent care is single-revenue and fully dependent on insurance reimbursement. NeuMed layers four revenue lines — urgent care, IV therapy, medical weight loss, and hormone wellness — combining steady insurance-billed visits with high-margin, recurring cash-pay wellness. The spa-inspired brand experience also drives reviews and referrals that traditional clinics don't see.",
    },
    {
      question: 'How long does it take to open?',
      answer:
        'Typically 9–14 months from signing the franchise agreement to grand opening, driven mostly by real estate and permitting timelines in your market. We support you through site selection, buildout, training, and launch. This timeline is illustrative.',
    },
    {
      question: 'What kind of support do I get?',
      answer:
        'Comprehensive and ongoing: site selection and buildout support, clinical protocols, operations and staff training, the full wellness menu and supplier access, an integrated technology stack, brand and local marketing campaigns, plus a dedicated franchise support team and an owner community. Support continues well past your opening day.',
    },
    {
      question: 'Is financing available?',
      answer:
        "Many NeuMed candidates use conventional or SBA financing, and we can point you toward lenders familiar with healthcare franchises. We'll help you model the full investment and capital requirements during the discovery process. NeuMed does not provide direct financing.",
    },
    {
      question: 'Can I own more than one location?',
      answer:
        'Yes. We welcome multi-unit operators and offer area development opportunities for qualified candidates who want to build several NeuMed clinics across a territory. Multi-unit terms are discussed during discovery.',
    },
    {
      question: 'What territories are available?',
      answer:
        "We award territories selectively to protect every owner's market. Availability changes as the network grows, so the best first step is to request information and tell us your target city — we'll let you know what's open.",
    },
    {
      question: 'How much can I expect to earn?',
      answer:
        "Financial performance is addressed only in Item 19 of our Franchise Disclosure Document, and we can't make earnings claims outside of it. Any figures shown on this site are illustrative and for discussion only. During discovery, we'll walk you through the model in detail.",
    },
    {
      question: "What's the first step?",
      answer:
        "Fill out the Request Franchise Info form. We'll send the discovery packet and reach out to schedule an intro call — usually within two business days. No obligation.",
    },
  ],
  cta: {
    heading: 'Still have questions?',
    body: "Let's get them answered. Request info and we'll be in touch with the full discovery packet.",
    imageTag: 'Background photo — clinic exterior',
    primary: { label: 'Request Franchise Info →', href: '/contact', variant: 'primary' },
  },
};

export const contactPage: ContactPage = {
  seo: {
    title: 'Request Franchise Info — NeuMed',
    description:
      'Request the NeuMed franchise discovery packet — unit economics, available territories, and next steps.',
  },
  pageHead: {
    eyebrow: 'Request Franchise Info',
    heading: "Let's start the conversation.",
    lead: "Tell us a little about you and your market. We'll send the discovery packet and follow up within two business days.",
    imageTag: 'Photo — clinic interior, warm light',
  },
  form: {
    submitLabel: 'Send me the discovery packet →',
    footnote: 'No obligation · We typically reply within 2 business days',
    consentText:
      "I'd like to receive the franchise discovery packet and understand NeuMed may contact me about this opportunity.",
    capitalOptions: ['Under $250K', '$250K – $500K', '$500K – $1M', '$1M+'],
    backgroundOptions: [
      'First-time franchise buyer',
      'Experienced multi-unit operator',
      'Healthcare professional (MD / NP)',
      'Investor',
      'Other',
    ],
    successTitle: 'Request received.',
    successBody:
      "thanks for your interest in NeuMed. We've logged your request and a member of our franchise team will reach out within two business days with the discovery packet.",
  },
  aside: {
    heading: 'What happens next',
    intro: 'A simple, no-pressure path from here.',
    steps: [
      { number: '1', title: 'We send the packet', body: 'Unit economics, the model, and available territories — straight to your inbox.' },
      { number: '2', title: 'Intro call', body: "A relaxed conversation to answer your questions and see if there's a fit." },
      { number: '3', title: 'Discovery & FDD', body: 'Review the details, visit a clinic, and decide together.' },
    ],
    contactHeading: 'Prefer to talk?',
    email: 'franchise@neumed.com',
    location: 'Houston, TX · Mon–Fri',
  },
};
