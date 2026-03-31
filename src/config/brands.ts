/**
 * AEDE Multi-Brand Configuration
 * ================================
 * This is the single source of truth for all brands.
 * To add a new brand, simply append a new entry to the BRANDS array below.
 * No other code changes are required.
 *
 * Schedule format: cron expression (second minute hour day month weekday)
 * Example: '0 0 9 * * *' = every day at 9:00 AM
 */

export interface BrandConfig {
  /** Unique identifier for the brand (no spaces) */
  id: string;

  /** Display name of the brand */
  name: string;

  /** One-line description used internally for logging */
  description: string;

  /** Target audience — used to shape content tone and relevance */
  audience: string;

  /** Tone and style of content (e.g. bold, authoritative, conversational) */
  tone: string;

  /** Key topics and themes this brand should post about */
  topics: string[];

  /** Website or app URL for reference in content */
  url: string;

  /** Cron schedule for daily pipeline trigger (6-field format) */
  schedule: string;

  /** Whether this brand is active. Set to false to pause without deleting. */
  active: boolean;

  /** Optional: call-to-action text to append to posts */
  cta?: string;
}

export const BRANDS: BrandConfig[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // 1. FrankGrant — NIH Grant Writing
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'frankgrant',
    name: 'FrankGrant',
    description: 'AI + expert NIH grant writing service with peer review simulation',
    audience: 'NIH grant applicants — researchers, academics, biotech founders, SBIR/STTR applicants',
    tone: 'authoritative, precise, reassuring — like a trusted senior grant consultant',
    topics: [
      'NIH grant writing tips and strategy',
      'SBIR and STTR funding insights',
      'Study Section reviewer psychology',
      'Specific Aims page best practices',
      'NIH paylines and funding odds',
      'Common grant rejection reasons and how to fix them',
      'Peer review simulation and pre-submission preparation',
      'Grant commercialization narrative tips',
    ],
    url: 'https://frankgrant.pages.dev',
    schedule: '0 0 7 * * *', // 7:00 AM daily
    active: true,
    cta: 'Get your grant written at frankgrant.pages.dev',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 2. NIHPaylines — NIH Paylines Tracker
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'nihpaylines',
    name: 'NIHPaylines',
    description: 'NIH paylines tracker and funding intelligence tool for grant applicants',
    audience: 'Researchers, grant writers, and academic administrators tracking NIH funding cutoffs',
    tone: 'data-driven, clear, informative — like a trusted research funding advisor',
    topics: [
      'Current NIH paylines by institute',
      'How paylines affect grant funding odds',
      'NIH funding trends and budget news',
      'Percentile scores vs impact scores explained',
      'Which NIH institutes are most competitive',
      'How to interpret your summary statement',
      'Resubmission strategy based on payline data',
    ],
    url: 'https://nihpaylines.com',
    schedule: '0 0 8 * * *', // 8:00 AM daily
    active: true,
    cta: 'Track NIH paylines at nihpaylines.com',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 3. RentLease — Property Management for Independent Landlords
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'rentlease',
    name: 'RentLease',
    description: 'Leases, tenant screening, and eviction guidance for independent landlords',
    audience: 'Independent landlords managing 1–25 units who self-manage their properties',
    tone: 'practical, no-nonsense, helpful — like advice from a savvy landlord friend',
    topics: [
      'Landlord tips for screening tenants properly',
      'Lease agreement mistakes to avoid',
      'Eviction process guidance by state',
      'How to handle difficult tenants',
      'Rental property management best practices',
      'Tenant red flags during the application process',
      'Protecting yourself legally as a landlord',
      'Room rental and co-living market trends',
    ],
    url: 'https://leasingapp.pages.dev',
    schedule: '0 0 9 * * *', // 9:00 AM daily
    active: true,
    cta: 'Manage your rentals at RentLease — start free',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 4. RealEstateWithoutBullshit — Straight-talk Real Estate
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'rewbs',
    name: 'RealEstateWithoutBullshit',
    description: 'Straight-talking real estate insights without the industry fluff',
    audience: 'Property buyers, sellers, investors, and landlords who are tired of vague advice',
    tone: 'bold, direct, contrarian — cuts through industry noise with refreshing honesty',
    topics: [
      'Real estate myths debunked',
      'What agents never tell buyers and sellers',
      'Honest property investment analysis',
      'Market trends without the spin',
      'How to negotiate real estate deals',
      'Rental yield reality checks',
      'First-time buyer truths nobody talks about',
      'Property management without the BS',
    ],
    url: 'https://realestatewithoutbullshit.com',
    schedule: '0 0 10 * * *', // 10:00 AM daily
    active: true,
    cta: 'Get the truth at RealEstateWithoutBullshit.com',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 5. BUSOS — Bold Content Framework
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'busos',
    name: 'BUSOS',
    description: 'Content creation framework: Bold, Unique, Surprising, Outstanding, Shareable',
    audience: 'Content creators, marketers, entrepreneurs, and founders who want to create standout content',
    tone: 'energetic, provocative, inspiring — challenges conventional thinking about content',
    topics: [
      'How to create content that actually gets shared',
      'The BUSOS framework in action',
      'Why most content fails and how to fix it',
      'Bold content strategy for personal brands',
      'Standing out in a crowded social media feed',
      'Content creation principles for entrepreneurs',
      'Turning expertise into compelling social posts',
      'Why safe content gets ignored',
    ],
    url: 'https://busos.com',
    schedule: '0 0 11 * * *', // 11:00 AM daily
    active: true,
    cta: 'Learn the BUSOS framework',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 6. COARE — Biotechnology / Holdings
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'coare',
    name: 'COARE',
    description: 'Biotechnology company and holdings group — COARE Holdings',
    audience: 'Biotech investors, life science professionals, research partners, and industry stakeholders',
    tone: 'visionary, scientific, forward-thinking — the voice of a serious biotech innovator',
    topics: [
      'Biotechnology innovation and breakthroughs',
      'Life sciences industry trends',
      'Biotech startup funding and commercialisation',
      'The future of precision medicine',
      'Science-to-market pipeline insights',
      'Global biotech partnerships and collaboration',
      'SBIR/STTR funding for biotech companies',
      'Building ventures at the intersection of science and technology',
    ],
    url: 'https://coare.com',
    schedule: '0 0 12 * * *', // 12:00 PM daily
    active: true,
    cta: 'Explore COARE Holdings',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 7. ChiefMarketingOfficer.app — AI CMO Platform
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'cmo',
    name: 'ChiefMarketingOfficer.app',
    description: 'AI-powered Chief Marketing Officer platform for founders and growing businesses',
    audience: 'Founders, startups, and SMEs who need CMO-level marketing strategy without hiring one full-time',
    tone: 'strategic, confident, executive — like advice from a seasoned CMO who gets straight to the point',
    topics: [
      'Marketing strategy for startups and founders',
      'How to think like a CMO without being one',
      'Brand positioning and messaging frameworks',
      'Growth marketing tactics that actually work',
      'Content marketing ROI and measurement',
      'Building a marketing engine from scratch',
      'AI tools for marketing strategy and execution',
      'When to hire a CMO vs use fractional or AI alternatives',
    ],
    url: 'https://chiefmarketingofficer.app',
    schedule: '0 0 13 * * *', // 1:00 PM daily
    active: true,
    cta: 'Get CMO-level strategy at ChiefMarketingOfficer.app',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // ADD NEW BRANDS BELOW THIS LINE
  // Copy the block above, change the fields, set active: true, and you are done.
  // ─────────────────────────────────────────────────────────────────────────
];
