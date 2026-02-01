import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, Map, PenTool, Rocket } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ProcessSectionProps {
  className?: string;
}

const ProcessSection = ({ className = '' }: ProcessSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const steps = [
    {
      number: '01',
      icon: Search,
      title: 'DISCOVER',
      description: 'Goals, users, constraints, and the real priorities.',
    },
    {
      number: '02',
      icon: Map,
      title: 'STRUCTURE',
      description: 'Sitemap, flows, and a content plan that holds.',
    },
    {
      number: '03',
      icon: PenTool,
      title: 'DESIGN',
      description: 'UI, type, motion, and responsive behavior.',
    },
    {
      number: '04',
      icon: Rocket,
      title: 'BUILD',
      description: 'Clean handoff, QA, and launch support.',
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
              { y: '-22vh', opacity: 0, ease: 'power2.in', stagger: 0.01 },
              0.7
            );
        }, section);

        return () => ctx.revert();
      }
    );

    return () => mm.revert();
  }, []);

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
          src="/images/process_scene.jpg"
          alt="Design process"
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
          PROCESS
        </h2>

        {/* Process Cards */}
        <div className="flex flex-col gap-4 md:flex-1">
          {steps.map((step, index) => (
            <div
              key={step.title}
              ref={el => { cardsRef.current[index] = el; }}
              className="bg-charcoal-light rounded-xl card-border p-5 flex items-start gap-4 group hover:border-gold/30 transition-colors md:flex-1"
            >
              <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                <span className="font-mono text-xs text-gold">{step.number}</span>
              </div>
              <div className="flex-1">
                <h3 className="font-mono text-sm tracking-[0.12em] text-cream uppercase">
                  {step.title}
                </h3>
                <p className="text-sm text-cream/60 mt-1 leading-relaxed">
                  {step.description}
                </p>
              </div>
              <step.icon size={18} className="text-cream/30 flex-shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
