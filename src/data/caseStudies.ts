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
    subtitle: 'Product experience',
    category: 'E-Commerce',
    image: '/images/work_01.jpg',
    heroImage: '/images/featured_case.jpg',
    client: 'Nomad Gear Co.',
    year: '2026',
    featured: true,
    externalUrl: 'https://nomad-gear.vercel.app',
    role: 'Motion Design, UI/UX Design, Front-End Development',
    tools: ['React + TypeScript', 'GSAP ScrollTrigger', 'Tailwind CSS', 'Vite'],
    services: ['Web Design', 'E-Commerce', 'Brand Strategy'],
    challenge: 'Nomad Gear needed a digital experience that matched the quality of their premium camping equipment. Their existing site felt dated and failed to convert browsers into buyers. The challenge was to create a product-forward experience that would inspire confidence and drive purchases.',
    solution: 'We designed a calm, immersive shopping experience built around large product imagery and clear specifications. The checkout flow was simplified to reduce friction, and we implemented subtle scroll animations that guide users toward purchase decisions without feeling pushy.',
    results: [
      { metric: '+47%', description: 'Increase in conversion rate' },
      { metric: '-32%', description: 'Reduction in bounce rate' },
      { metric: '+23%', description: 'Average order value increase' },
    ],
    testimonial: {
      quote: "The most thoughtful designer we've worked with. Every decision was intentional and the results speak for themselves.",
      author: 'Avery L.',
      role: 'Founder, Nomad Gear',
    },
    gallery: ['/images/work_01.jpg', '/images/featured_case.jpg'],
  },
  {
    id: 'velvet-rose',
    title: 'VELVET ROSE',
    subtitle: 'Editorial e-commerce',
    category: 'E-Commerce',
    image: '/images/work_02.jpg',
    heroImage: '/images/work_02.jpg',
    client: 'Velvet Rose Florals',
    year: '2026',
    externalUrl: 'https://velvet-rose-floral.vercel.app',
    role: 'Motion Design, UI/UX Design, Front-End Development',
    tools: ['React + TypeScript', 'GSAP ScrollTrigger', 'Tailwind CSS', 'Vite'],
    services: ['Web Design', 'Brand Systems', 'Art Direction'],
    challenge: 'Velvet Rose wanted to elevate their online presence beyond a typical flower shop. They needed a site that communicated the artistry of their arrangements while making it easy for customers to order for weddings, events, and daily delivery.',
    solution: 'We created an editorial-style e-commerce experience with dramatic imagery and elegant typography. The site features a custom bouquet builder and a streamlined booking flow for wedding consultations. The visual language reflects the sophistication of their floral designs.',
    results: [
      { metric: '+65%', description: 'Wedding consultation bookings' },
      { metric: '+41%', description: 'Online order volume' },
      { metric: '4.9★', description: 'Average customer rating' },
    ],
    testimonial: {
      quote: "Fast, precise, and always thinking in systems. The website became our best salesperson.",
      author: 'Mina K.',
      role: 'Creative Director, Velvet Rose',
    },
    gallery: ['/images/work_02.jpg'],
  },
  {
    id: 'gentlemans-blade',
    title: "GENTLEMAN'S BLADE",
    subtitle: 'Heritage brand',
    category: 'Brand & Web',
    image: '/images/work_03.jpg',
    heroImage: '/images/work_03.jpg',
    client: "Gentleman's Blade Barbershop",
    year: '2026',
    externalUrl: 'https://gentlemans-blade.vercel.app',
    role: 'Motion Design, UI/UX Design, Front-End Development',
    tools: ['React + TypeScript', 'GSAP ScrollTrigger', 'Tailwind CSS', 'Vite'],
    services: ['Web Design', 'Brand Systems', 'Prototyping'],
    challenge: 'This classic barbershop needed a digital presence that honored their heritage while attracting a younger demographic. They wanted to streamline appointment booking without losing the old-school charm that defines their brand.',
    solution: 'We developed a visual identity and website that blends vintage aesthetics with modern functionality. The booking system integrates with their existing calendar, and the photography direction emphasizes the craftsmanship of their barbers. Warm tones and classic typography evoke the barbershop experience.',
    results: [
      { metric: '+78%', description: 'Online bookings' },
      { metric: '-45%', description: 'No-show rate reduction' },
      { metric: '+34%', description: 'New client acquisitions' },
    ],
    gallery: ['/images/work_03.jpg'],
  },
  {
    id: 'pop-playground',
    title: 'POP PLAYGROUND',
    subtitle: 'Playful landing',
    category: 'Landing Page',
    image: '/images/work_04.jpg',
    heroImage: '/images/work_04.jpg',
    client: 'Pop Playground',
    year: '2026',
    externalUrl: 'https://pop-playground-memphis.vercel.app',
    role: 'Motion Design, UI/UX Design, Front-End Development',
    tools: ['React + TypeScript', 'GSAP ScrollTrigger', 'Tailwind CSS', 'Vite'],
    services: ['Web Design', 'Motion Design', 'Prototyping'],
    challenge: 'Pop Playground needed a website as playful and engaging as their indoor play spaces. The site had to appeal to both parents (who book) and children (who convince their parents), while clearly communicating pricing, hours, and party packages.',
    solution: 'We created a vibrant, interactive landing experience with playful animations and bold colors. The design uses geometric shapes inspired by their playground architecture. Information architecture prioritizes what parents need most: pricing, safety info, and easy booking.',
    results: [
      { metric: '+92%', description: 'Party booking inquiries' },
      { metric: '+56%', description: 'Time on site increase' },
      { metric: '3.2x', description: 'Return on ad spend' },
    ],
    gallery: ['/images/work_04.jpg'],
  },
  {
    id: 'tag',
    title: 'TAG',
    subtitle: 'Real estate conversion',
    category: 'Landing Page',
    image: '/images/work_05.jpg',
    heroImage: '/images/work_05.jpg',
    client: 'Transaction Authority Group',
    year: '2026',
    externalUrl: 'https://www.transactionauthority.com',
    role: 'Landing Page Strategy, Copy, Design, Development',
    tools: ['React + TypeScript', 'Tailwind CSS', 'Vite'],
    services: ['Web Design', 'Lead Generation', 'Copywriting'],
    challenge: 'TAG needed a landing page that would attract established transaction coordinators in the real estate industry. The page had to filter for qualified leads while clearly communicating their value proposition and driving discovery call bookings.',
    solution: 'We built an authority-first landing page with social proof, clear benefit statements, and a streamlined booking flow. The design establishes credibility immediately while making it easy for qualified coordinators to schedule calls. Mobile optimization was critical for this on-the-go audience.',
    results: [
      { metric: '+156%', description: 'Discovery call bookings' },
      { metric: '67%', description: 'Call-to-client conversion' },
      { metric: '+$184K', description: 'Revenue from new clients' },
    ],
    testimonial: {
      quote: "Turned a complex product into something feelable. Our users finally understand what we do.",
      author: 'Sam R.',
      role: 'Director, TAG',
    },
    gallery: ['/images/work_05.jpg'],
  },
  {
    id: 'utilitysheet',
    title: 'UTILITYSHEET',
    subtitle: 'SaaS onboarding',
    category: 'SaaS',
    image: '/images/work_06.jpg',
    heroImage: '/images/work_06.jpg',
    client: 'UtilitySheet',
    year: '2025',
    externalUrl: 'https://utilitysheet.com',
    role: 'Product Strategy, UX/UI Design, Full-Stack Development',
    tools: ['Product strategy', 'UX/UI design', 'Full-stack build', 'Vercel'],
    services: ['Web Design', 'Brand Systems', 'Prototyping'],
    challenge: 'UtilitySheet had a powerful product but struggled to communicate its value to real estate professionals. Their onboarding flow was confusing, leading to high drop-off rates before users experienced the product\'s benefits.',
    solution: 'We redesigned their marketing site and onboarding experience with clear value propositions and a guided setup flow. The new design uses real-world scenarios to show how UtilitySheet eliminates utility information back-and-forth in real estate transactions.',
    results: [
      { metric: '+89%', description: 'Trial-to-paid conversion' },
      { metric: '-52%', description: 'Onboarding drop-off' },
      { metric: '+127%', description: 'User activation rate' },
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
