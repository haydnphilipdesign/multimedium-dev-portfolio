import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Palette, Layers, Camera, MousePointer } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ServicesSectionProps {
  className?: string;
}

const ServicesSection = ({ className = '' }: ServicesSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const services = [
    {
      icon: Palette,
      title: 'WEB DESIGN',
      description: 'Responsive, performant sites with strong typography and clear hierarchy.',
    },
    {
      icon: Layers,
      title: 'BRAND SYSTEMS',
      description: 'Identity, color, type, and components that scale with your product.',
    },
    {
      icon: Camera,
      title: 'ART DIRECTION',
      description: 'Photography direction, mood, and visual consistency across campaigns.',
    },
    {
      icon: MousePointer,
      title: 'PROTOTYPING',
      description: 'Interactive prototypes to test flows before engineering begins.',
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
      id="services"
      className={`relative w-full min-h-screen md:h-screen bg-charcoal overflow-visible md:overflow-hidden ${className}`}
    >
      {/* Left Image */}
      <div
        ref={imageRef}
        className="relative mx-[5vw] mt-24 h-[44vh] rounded-card overflow-hidden card-shadow card-border sm:h-[52vh] md:absolute md:left-[5vw] md:top-[12vh] md:mx-0 md:mt-0 md:w-[46vw] md:h-[76vh]"
      >
        <img
          src="/images/services_scene.jpg"
          alt="Design services"
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
          SERVICES
        </h2>

        {/* Service Cards */}
        <div className="flex flex-col gap-4 md:flex-1">
          {services.map((service, index) => (
            <div
              key={service.title}
              ref={el => { cardsRef.current[index] = el; }}
              className="bg-charcoal-light rounded-xl card-border p-5 flex items-start gap-4 group hover:border-gold/30 transition-colors md:flex-1"
            >
              <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                <service.icon size={20} className="text-gold" />
              </div>
              <div>
                <h3 className="font-mono text-sm tracking-[0.12em] text-cream uppercase">
                  {service.title}
                </h3>
                <p className="text-sm text-cream/60 mt-1 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
