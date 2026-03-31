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
  // 8. StillHere — Social Media Presence Automation
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'stillhere',
    name: 'StillHere',
    description: 'Social media presence automation — keeps your brand alive while you focus on your business',
    audience: 'Founders, solopreneurs, and small business owners who struggle to stay consistent on social media',
    tone: 'empathetic, practical, motivating — speaks to the overwhelmed founder who knows they need to post but never has time',
    topics: [
      'Why consistency on social media beats perfection',
      'How to stay visible online when you are too busy to post',
      'Social media automation for founders who hate social media',
      'The cost of going quiet on social media',
      'Building an audience while running a business',
      'Content batching strategies for busy entrepreneurs',
      'Why your brand needs to show up even when you cannot',
    ],
    url: 'https://stillhere.app',
    schedule: '0 0 14 * * *', // 2:00 PM daily
    active: true,
    cta: 'Keep your brand alive at StillHere',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 9. PromptAngel — Prompt Engineering for Vibe Coders
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'promptangel',
    name: 'PromptAngel',
    description: 'Get your prompt right before you vibe code — prompt engineering tool for AI-assisted developers',
    audience: 'Developers, vibe coders, and non-technical founders using AI to build products',
    tone: 'sharp, witty, insider — speaks the language of the AI-native builder generation',
    topics: [
      'Why your AI output is only as good as your prompt',
      'Prompt engineering tips for vibe coders',
      'How to get better results from Claude, GPT, and Cursor',
      'Common prompting mistakes that waste hours',
      'Structured prompting frameworks for software development',
      'The difference between a bad prompt and a great one',
      'Building faster with AI when you know how to ask',
    ],
    url: 'https://promptangel.app',
    schedule: '0 0 15 * * *', // 3:00 PM daily
    active: true,
    cta: 'Get your prompt right at PromptAngel',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 10. CodeMama — Business Development Engine
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'codemama',
    name: 'CodeMama',
    description: 'Business development engine — AI-powered partner outreach and deal pipeline automation',
    audience: 'Biotech and life science companies seeking pharma, investor, and research partners',
    tone: 'professional, strategic, results-focused — the voice of a seasoned BD executive',
    topics: [
      'Business development strategy for biotech companies',
      'How to build a partner pipeline that converts',
      'Pharma and biotech partnership deal structures',
      'AI-powered outreach for life science BD teams',
      'Investor relations and fundraising for biotech',
      'Building strategic alliances in the life sciences',
      'The anatomy of a successful biotech partnership email',
    ],
    url: 'https://code-mama.vercel.app',
    schedule: '0 0 16 * * *', // 4:00 PM daily
    active: true,
    cta: 'Automate your BD pipeline at CodeMama',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 11. MFS Autopilot — Marketing Funnel SaaS
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'mfsautopilot',
    name: 'MFS Autopilot',
    description: 'Marketing Funnel SaaS with AI post generation and Stripe billing — KeepAlive for founders',
    audience: 'Founders and small business owners who want a full marketing funnel running on autopilot',
    tone: 'direct, results-oriented, no-fluff — speaks to founders who want outcomes not features',
    topics: [
      'Marketing funnels that run without you',
      'AI-generated content for your entire marketing stack',
      'How to build a marketing autopilot for your business',
      'Stop doing marketing manually — automate the funnel',
      'Lead generation on autopilot for solopreneurs',
      'The marketing stack every founder needs in 2025',
      'Why most marketing funnels fail and how to fix yours',
    ],
    url: 'https://autopilot.vercel.app',
    schedule: '0 0 17 * * *', // 5:00 PM daily
    active: true,
    cta: 'Put your marketing on autopilot',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 12. Marketing For SoloPreneurs
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'mfsolopreneurs',
    name: 'MarketingForSoloPreneurs',
    description: 'Marketing education and tools specifically built for solopreneurs and one-person businesses',
    audience: 'Solopreneurs, freelancers, and one-person businesses who do their own marketing',
    tone: 'peer-to-peer, practical, encouraging — one solopreneur talking to another',
    topics: [
      'Marketing on a budget as a solopreneur',
      'How to market your business when you are the only employee',
      'Content marketing strategies for one-person businesses',
      'Building an audience without a marketing team',
      'The solopreneur marketing stack that actually works',
      'Email marketing for solopreneurs — what works in 2025',
      'How to compete with bigger brands as a solo operator',
    ],
    url: 'https://marketingforsolopreneurs.com',
    schedule: '0 0 18 * * *', // 6:00 PM daily
    active: true,
    cta: 'Market smarter as a solopreneur',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // ADD NEW BRANDS BELOW THIS LINE
  // Copy the block above, change the fields, set active: true, and you are done.
  // ─────────────────────────────────────────────────────────────────────────
];
