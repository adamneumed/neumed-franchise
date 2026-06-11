// Register all schema types here, then import into sanity.config.ts:
//   import { schemaTypes } from './schemaTypes'
//   schema: { types: schemaTypes }

// Objects
import linkButton from './objects/linkButton';
import seo from './objects/seo';
import ctaBlock from './objects/ctaBlock';
import statItem from './objects/statItem';
import valueProp from './objects/valueProp';
import revenueLine from './objects/revenueLine';
import audienceCard from './objects/audienceCard';
import infoCard from './objects/infoCard';
import processStep from './objects/processStep';
import faqItem from './objects/faqItem';
import investmentRow from './objects/investmentRow';
import nextStep from './objects/nextStep';

// Documents (singletons)
import siteSettings from './siteSettings';
import homePage from './homePage';
import opportunityPage from './opportunityPage';
import processPage from './processPage';
import faqPage from './faqPage';
import contactPage from './contactPage';

export const schemaTypes = [
  // objects
  linkButton, seo, ctaBlock, statItem, valueProp, revenueLine,
  audienceCard, infoCard, processStep, faqItem, investmentRow, nextStep,
  // documents
  siteSettings, homePage, opportunityPage, processPage, faqPage, contactPage,
];
