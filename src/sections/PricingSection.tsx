import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface PricingSectionProps {
  className?: string;
}

const PricingSection = ({ className = '' }: PricingSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const packages = [
    {
      name: 'LANDING PAGE',
      price: 'From $3,500',
      description: 'One strong page, fast delivery.',
      features: [
        'Single-page design',
        'Mobile responsive',
        'Basic SEO setup',
        '2 revision rounds',
        '2-week delivery',
      ],
      cta: 'Get started',
    },
    {
      name: 'FULL SITE',
      price: 'From $10,000',
      description: 'Multi-page site with CMS and motion.',
      features: [
        'Up to 6 pages',
        'CMS integration',
        'Scroll animations',
        'Performance optimized',
        '4 revision rounds',
        '6-week delivery',
      ],
      cta: 'Start project',
      highlighted: true,
    },
    {
      name: 'RETAINER',
      price: 'From $2,500/mo',
      description: 'Ongoing design + frontend support.',
      features: [
        'Monthly design hours',
        'Priority support',
        'Continuous improvements',
        'A/B testing',
        'Analytics review',
        'Quarterly strategy',
      ],
      cta: 'Learn more',
    },
  ];

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const header = headerRef.current;
    const cards = cardsRef.current.filter(Boolean);

    if (!section || !image || !header || cards.length === 0) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: '(min-width: 768px)',
        reduceMotion: '(prefers-reduced-motion: reduce)',
      },
      (context) => {
        if (!context.conditions?.isDesktop || context.conditions?.reduceMotion) return;

        const ctx = gsap.context(() => {
          const scrollTl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: '+=130%',
              pin: true,
              scrub: 0.6,
            },
          });

          // ENTRANCE (0-30%)
          scrollTl
            .fromTo(image, { x: '-60vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'power2.out' }, 0)
            .fromTo(header, { y: '-10vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'power2.out' }, 0)
            .fromTo(
              cards,
              { x: '35vw', opacity: 0 },
              { x: 0, opacity: 1, ease: 'power3.out', stagger: 0.02 },
              0
            );

          // EXIT (70-100%)
          scrollTl
            .fromTo(image, { x: 0, opacity: 1 }, { x: '-18vw', opacity: 0, ease: 'power2.in' }, 0.7)
            .fromTo(header, { y: 0, opacity: 1 }, { y: '-6vh', opacity: 0, ease: 'power2.in' }, 0.7)
            .fromTo(
              cards,
              { y: 0, opacity: 1 },
              { y: '-20vh', opacity: 0, ease: 'power2.in', stagger: 0.01 },
              0.7
            );
        }, section);

        return () => ctx.revert();
      }
    );

    return () => mm.revert();
  }, []);

  const scrollToContact = () => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      className={`relative w-full min-h-screen md:h-screen bg-charcoal overflow-visible md:overflow-hidden ${className}`}
    >
      {/* Left Image */}
      <div
        ref={imageRef}
        className="relative mx-[5vw] mt-24 h-[44vh] rounded-card overflow-hidden card-shadow card-border sm:h-[52vh] md:absolute md:left-[5vw] md:top-[12vh] md:mx-0 md:mt-0 md:w-[46vw] md:h-[76vh]"
      >
        <img
          src="/images/pricing_scene.jpg"
          alt="Pricing"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Stack */}
      <div className="px-[5vw] pb-16 pt-10 md:absolute md:left-[54vw] md:top-[14vh] md:w-[41vw] md:h-[72vh] md:px-0 md:pt-0 md:pb-0 flex flex-col">
        {/* Header */}
        <h2
          ref={headerRef}
          className="font-display font-bold text-section text-cream tracking-[-0.02em] uppercase mb-6"
        >
          PRICING
        </h2>

        {/* Pricing Cards */}
        <div className="flex flex-col gap-3 md:flex-1">
          {packages.map((pkg, index) => (
            <div
              key={pkg.name}
              ref={el => { cardsRef.current[index] = el; }}
              className={`bg-charcoal-light rounded-xl card-border p-4 flex flex-col justify-between md:flex-1 ${
                pkg.highlighted ? 'border-gold/40' : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs tracking-[0.12em] text-gold uppercase">
                    {pkg.name}
                  </span>
                  {pkg.highlighted && (
                    <span className="px-2 py-0.5 bg-gold/10 rounded text-xs text-gold">
                      Popular
                    </span>
                  )}
                </div>
                <span className="font-display font-bold text-xl text-cream">
                  {pkg.price}
                </span>
                <p className="text-sm text-cream/60 mt-1">
                  {pkg.description}
                </p>
              </div>
              
              <button
                type="button"
                onClick={scrollToContact}
                className="mt-3 w-full py-2.5 bg-gold/10 hover:bg-gold/20 rounded-lg font-mono text-xs tracking-[0.12em] text-gold uppercase flex items-center justify-center gap-2 transition-colors group"
              >
                {pkg.cta}
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
