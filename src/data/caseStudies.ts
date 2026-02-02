export interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  image: string;
  heroImage: string;
  client: string;
  year: string;
  featured?: boolean;
  externalUrl?: string;
  role?: string;
  tools?: string[];
  services: string[];
  challenge: string;
  solution: string;
  results: {
    metric: string;
    description: string;
  }[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
  gallery: string[];
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'nomad-gear',
    title: 'NOMAD GEAR',
    subtitle: 'Motion-rich website design for a premium camping gear rental experience',
    category: 'Web Design',
    image: '/images/work_01.jpg',
    heroImage: '/images/featured_case.jpg',
    client: 'Nomad Gear',
    year: '2026',
    featured: true,
    externalUrl: 'https://nomad-gear.vercel.app',
    role: 'Motion Design, UI/UX Design, Front-End Development',
    tools: ['React + TypeScript', 'GSAP ScrollTrigger', 'Tailwind CSS', 'Vite'],
    services: ['Web Design', 'E-Commerce', 'Brand Strategy'],
    challenge: "Nomad Gear needed a website that captured the feeling of outdoor adventure—not just a catalog of products, but an immersive experience that makes visitors want to get outside. Traditional static layouts wouldn’t convey the energy of camping culture.",
    solution: 'Designed and built a motion-rich website with cinematic parallax, organic animations, and WebGL-inspired depth cues. Each section tells a visual story—floating category cards, horizontal product showcases, and an orbiting social-proof system—so the site feels alive and adventurous.',
    results: [
      { metric: 'Ultra-Dynamic', description: 'Animation intensity · Rich GSAP-driven motion throughout' },
      { metric: '60fps', description: 'Performance · Tuned for smooth scroll on modern devices' },
      { metric: '8+ patterns', description: 'Motion system · Distinct choreography per section' },
    ],
    gallery: ['/images/work_01.jpg', '/images/featured_case.jpg'],
  },
  {
    id: 'velvet-rose',
    title: 'VELVET ROSE',
    subtitle: 'Elegant, motion-rich website design for a premium florist experience',
    category: 'Web Design',
    image: '/images/work_02.jpg',
    heroImage: '/images/work_02.jpg',
    client: 'Velvet Rose',
    year: '2026',
    externalUrl: 'https://velvet-rose-floral.vercel.app',
    role: 'Motion Design, UI/UX Design, Front-End Development',
    tools: ['React + TypeScript', 'GSAP ScrollTrigger', 'Tailwind CSS', 'Vite'],
    services: ['Web Design', 'Brand Systems', 'Art Direction'],
    challenge: 'Velvet Rose needed a website that conveyed the timeless romance and artistry of their floral arrangements. Generic flower shop templates felt cold and transactional—they wanted visitors to feel the craft before placing an order.',
    solution: "Designed a “Botanical Elegance” experience with organic, fluid motion that mimics natural growth and bloom. Horizontal category browsing, magnetic imagery, and gentle transitions create an immersive, premium feel without overwhelming the product.",
    results: [
      { metric: 'Botanical', description: 'Motion style · Organic, fluid movements' },
      { metric: 'Horizontal Pin', description: 'Scroll system · Pinned category browsing section' },
      { metric: '6+ systems', description: 'Animation system · Multiple distinct motion patterns' },
    ],
    gallery: ['/images/work_02.jpg'],
  },
  {
    id: 'gentlemans-blade',
    title: "GENTLEMAN'S BLADE",
    subtitle: 'Heritage-inspired website design for a classic American barbershop',
    category: 'Web Design',
    image: '/images/work_03.jpg',
    heroImage: '/images/work_03.jpg',
    client: "Gentleman's Blade Barbershop",
    year: '2026',
    externalUrl: 'https://gentlemans-blade.vercel.app',
    role: 'Motion Design, UI/UX Design, Front-End Development',
    tools: ['React + TypeScript', 'Three.js/WebGL', 'GSAP ScrollTrigger', 'Tailwind CSS'],
    services: ['Web Design', 'Brand Systems', 'Prototyping'],
    challenge: "Gentleman's Blade wanted a website that honored classic barbershop heritage while feeling modern and confident. Standard service-listing sites felt generic—they needed something cinematic that made visitors feel the craft and tradition.",
    solution: "Created a “Cinematic Americana” experience with 3D image clusters, liquid WebGL hover distortions, and horizontal galleries. Services are presented with editorial motion, and the overall system reinforces heritage-meets-modern positioning.",
    results: [
      { metric: 'Cinematic', description: 'Motion style · Americana-inspired editorial choreography' },
      { metric: 'WebGL + CSS', description: '3D depth · Liquid hover distortions and card clusters' },
      { metric: '7 sections', description: 'Structure · Distinct interactions per section' },
    ],
    gallery: ['/images/work_03.jpg'],
  },
  {
    id: 'pop-playground',
    title: 'POP PLAYGROUND',
    subtitle: "Physics-based Memphis design for a children's creative playground",
    category: 'Web Design',
    image: '/images/work_04.jpg',
    heroImage: '/images/work_04.jpg',
    client: 'Pop Playground',
    year: '2026',
    externalUrl: 'https://pop-playground-memphis.vercel.app',
    role: 'Motion Design, UI/UX Design, Front-End Development',
    tools: ['React + TypeScript', 'GSAP ScrollTrigger', 'WebGL Shaders', 'Tailwind CSS'],
    services: ['Web Design', 'Motion Design', 'Prototyping'],
    challenge: "Pop Playground needed a website that captured the boundless energy and colorful chaos of children’s creativity. Standard templates felt too grown-up—they wanted something that makes kids and parents excited immediately.",
    solution: "Created a “Kinetic Memphis Playground” experience with physics-based interactions, liquid color-mesh backgrounds, and scattered gallery compositions. Every section uses playful motion patterns that mirror the messy joy of making art.",
    results: [
      { metric: 'Kinetic', description: 'Motion style · Physics-driven Memphis chaos' },
      { metric: '7+ hues', description: 'Color system · Full Memphis palette with variants' },
      { metric: '10+ types', description: 'Interaction system · Hover, scroll, and cursor effects' },
    ],
    gallery: ['/images/work_04.jpg'],
  },
  {
    id: 'tag',
    title: 'TAG',
    subtitle: 'Authority-first landing page built to qualify established transaction coordinators and drive discovery call bookings',
    category: 'Landing Page',
    image: '/images/work_05.jpg',
    heroImage: '/images/work_05.jpg',
    client: 'Transaction Authority Group (TAG)',
    year: '2026',
    externalUrl: 'https://www.transactionauthority.com',
    role: 'Landing Page Strategy, Copy, Design, Development',
    tools: ['Fast, mobile-first build', 'Booking calendar integration', 'Lead qualification flow', 'Vercel hosting'],
    services: ['Web Design', 'Lead Generation', 'Copywriting'],
    challenge: 'TAG needed a focused landing page that converts the right visitors into scheduled discovery calls. The goal wasn’t content depth—it was clarity, credibility, and fit-filtering for lead quality.',
    solution: 'Built a single-page booking funnel designed to establish authority fast, create self-identification through a problem → solution narrative, and drive one primary action: book the call. The structure stays lightweight and keeps CTAs persistent.',
    results: [
      { metric: '1 page', description: 'Layout · Single-scroll booking funnel' },
      { metric: 'Fit-filtered', description: 'Lead quality · Clear “for / not for” messaging' },
      { metric: 'Lightweight', description: 'Build · Mobile-first and performance-focused' },
    ],
    gallery: ['/images/work_05.jpg'],
  },
  {
    id: 'utilitysheet',
    title: 'UTILITYSHEET',
    subtitle: 'Founder-built SaaS that eliminates utility info back-and-forth in real estate transactions',
    category: 'SaaS',
    image: '/images/work_06.jpg',
    heroImage: '/images/work_06.jpg',
    client: 'Internal Product',
    year: '2025',
    externalUrl: 'https://utilitysheet.com',
    role: 'Product Strategy, UX/UI Design, Full-Stack Development',
    tools: ['Guided form experience', 'Clean PDF output', 'Smart provider suggestions', 'Vercel hosting'],
    services: ['Product Design', 'UX/UI Design', 'Full-Stack Development'],
    challenge: "Real estate transactions involve constant back-and-forth to get accurate utility provider info from sellers. Agents and transaction coordinators spend hours chasing vague answers, which delays closings and frustrates everyone involved.",
    solution: "I built UtilitySheet to replace those email threads with a single guided link. Sellers complete a quick form, and the app generates a clean, shareable utility info sheet that can be sent to buyers, agents, title, and transaction coordinators.",
    results: [
      { metric: '< 3 min', description: 'Experience · Designed for fast completion on mobile' },
      { metric: 'Less back-and-forth', description: 'Workflow · Replaces follow-up emails with one guided request' },
      { metric: 'Cleaner data', description: 'Accuracy · Suggestions reduce typos and guesswork' },
    ],
    gallery: ['/images/work_06.jpg'],
  },
];

export const getCaseStudyById = (id: string): CaseStudy | undefined => {
  return caseStudies.find(study => study.id === id);
};

export const getAllCaseStudies = (): CaseStudy[] => {
  return caseStudies;
};
