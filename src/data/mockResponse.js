// Mock shape mirrors the real POST /api/research response exactly.
// Swap USE_MOCK to false in src/api/research.js once the backend is live.
export const mockResponse = {
  question: 'Did the WHO officially declare COVID-19 a pandemic on March 11, 2020?',
  summary:
    'The World Health Organization declared COVID-19 a global pandemic on March 11, 2020, after the virus spread to over 114 countries with more than 118,000 confirmed cases. Director-General Tedros Adhanom Ghebreyesus cited the alarming levels of spread and severity, along with inaction from some governments, as the basis for the declaration. This followed six weeks after WHO first classified the outbreak as a Public Health Emergency of International Concern (PHEIC) on January 30, 2020.',
  confidence: 92,
  verdict: 'Highly Reliable',
  timeline: [
    { id: 1, label: 'Researching', detail: 'Dispatching Research Agent across 24 indexed sources' },
    { id: 2, label: 'Collecting Sources', detail: 'Aggregating primary + secondary references' },
    { id: 3, label: 'Fact Checking', detail: 'Cross-verifying claims against trusted corpora' },
    { id: 4, label: 'Generating Report', detail: 'Synthesizing final verification report' },
  ],
  claims: [
    {
      id: 'c1',
      text: 'WHO declared COVID-19 a pandemic on March 11, 2020.',
      status: 'Verified',
      confidence: 98,
      evidence: [
        {
          id: 'e1',
          source: 'World Health Organization',
          type: 'Government',
          date: '2020-03-11',
          url: 'https://www.who.int/director-general/speeches/detail/who-director-general-s-opening-remarks-at-the-media-briefing-on-covid-19---11-march-2020',
          trustScore: 99,
          snippet: 'Official transcript of the Director-General\u2019s remarks formally using the word "pandemic".',
        },
        {
          id: 'e2',
          source: 'Reuters',
          type: 'News',
          date: '2020-03-11',
          url: 'https://www.reuters.com/article/us-health-coronavirus-who',
          trustScore: 91,
          snippet: 'Wire report corroborating the timing and wording of the declaration.',
        },
      ],
    },
    {
      id: 'c2',
      text: 'Over 118,000 cases were confirmed across 114 countries at the time of declaration.',
      status: 'Verified',
      confidence: 94,
      evidence: [
        {
          id: 'e3',
          source: 'WHO Situation Report 51',
          type: 'Research Paper',
          date: '2020-03-11',
          url: 'https://www.who.int/emergencies/diseases/novel-coronavirus-2019/situation-reports',
          trustScore: 97,
          snippet: 'Situation report tabulating confirmed case counts by country as of March 11.',
        },
      ],
    },
    {
      id: 'c3',
      text: 'The PHEIC declaration on Jan 30, 2020 automatically classified the outbreak as a pandemic.',
      status: 'Contradicted',
      confidence: 38,
      evidence: [
        {
          id: 'e4',
          source: 'Wikipedia',
          type: 'Wikipedia',
          date: '2024-11-02',
          url: 'https://en.wikipedia.org/wiki/COVID-19_pandemic',
          trustScore: 68,
          snippet: 'Clarifies PHEIC and "pandemic" are distinct classifications under WHO protocol.',
        },
        {
          id: 'e5',
          source: 'Random Health Blog',
          type: 'Blog',
          date: '2021-06-14',
          url: 'https://example-health-blog.com/who-timeline',
          trustScore: 22,
          snippet: 'Blog incorrectly conflates PHEIC status with a pandemic declaration.',
        },
      ],
    },
    {
      id: 'c4',
      text: 'WHO Director-General Tedros personally visited Wuhan before the declaration.',
      status: 'Unverified',
      confidence: 41,
      evidence: [
        {
          id: 'e6',
          source: 'Unverified Forum Post',
          type: 'Blog',
          date: '2020-04-02',
          url: 'https://example-forum.com/thread/8821',
          trustScore: 18,
          snippet: 'Claim appears in a single unverified forum thread with no primary sourcing.',
        },
      ],
    },
  ],
  sources: [
    { type: 'Government', trust: 96, count: 8 },
    { type: 'Research Paper', trust: 93, count: 6 },
    { type: 'News', trust: 84, count: 11 },
    { type: 'Wikipedia', trust: 71, count: 4 },
    { type: 'Blog', trust: 34, count: 3 },
  ],
  contradictions: [
    {
      id: 'x1',
      claimA: 'The PHEIC declaration on Jan 30, 2020 automatically classified the outbreak as a pandemic.',
      claimB: 'WHO explicitly distinguished PHEIC status from a pandemic declaration until March 11, 2020.',
      severity: 'High',
      explanation:
        'These two claims cannot both be true. WHO\u2019s own communications confirm PHEIC and pandemic are separate classification tiers, six weeks apart.',
    },
    {
      id: 'x2',
      claimA: 'Confirmed case count stood at 118,000 on March 11.',
      claimB: 'A secondary blog reports 150,000 confirmed cases on the same date.',
      severity: 'Medium',
      explanation: 'The blog source is uncorroborated by any primary WHO or government record for that date.',
    },
  ],
  hallucinations: [
    {
      id: 'h1',
      claim: 'WHO Director-General Tedros personally visited Wuhan before the declaration.',
      detected: true,
      riskScore: 76,
      reason: 'No primary or secondary source corroborates this claim; likely model-generated fabrication.',
    },
    {
      id: 'h2',
      claim: 'WHO declared COVID-19 a pandemic on March 11, 2020.',
      detected: false,
      riskScore: 4,
      reason: 'Fully corroborated across multiple independent, high-trust sources.',
    },
  ],
  charts: {
    confidenceDistribution: [
      { name: 'Verified', value: 2 },
      { name: 'Contradicted', value: 1 },
      { name: 'Unverified', value: 1 },
    ],
    sourceTrust: [
      { name: 'Government', trust: 96 },
      { name: 'Research', trust: 93 },
      { name: 'News', trust: 84 },
      { name: 'Wikipedia', trust: 71 },
      { name: 'Blogs', trust: 34 },
    ],
    confidenceOverTime: [
      { stage: 'Research', confidence: 60 },
      { stage: 'Sourcing', confidence: 74 },
      { stage: 'Fact-Check', confidence: 88 },
      { stage: 'Report', confidence: 92 },
    ],
  },
}
