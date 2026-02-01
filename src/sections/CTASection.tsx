import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface CTASectionProps {
  className?: string;
}

const CTASection = ({ className = '' }: CTASectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subcopyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const subcopy = subcopyRef.current;
    const cta = ctaRef.current;

    if (!section || !headline || !subcopy || !cta) return;

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
            .fromTo(
              headline,
              { scale: 0.92, y: '30vh', opacity: 0 },
              { scale: 1, y: 0, opacity: 1, ease: 'power2.out' },
              0
            )
            .fromTo(subcopy, { y: '18vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'power2.out' }, 0.05)
            .fromTo(cta, { y: '18vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'power2.out' }, 0.1);

          // EXIT (70-100%)
          scrollTl.fromTo(
            [headline, subcopy, cta],
            { y: 0, opacity: 1 },
            { y: '-22vh', opacity: 0, ease: 'power2.in' },
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
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className={`relative w-full min-h-screen md:h-screen bg-charcoal overflow-visible md:overflow-hidden flex flex-col items-center justify-center ${className}`}
    >
      {/* Headline */}
      <h2
        ref={headlineRef}
        className="font-display font-bold text-hero text-cream text-center tracking-[-0.02em] uppercase px-[10vw]"
      >
        READY TO BUILD<br />
        <span className="text-gold">SOMETHING SHARP?</span>
      </h2>

      {/* Subcopy */}
      <p
        ref={subcopyRef}
        className="mt-8 text-lg text-cream/60 text-center max-w-md"
      >
        Tell us what you&apos;re making. We&apos;ll respond within two business days.
      </p>

      {/* CTA Button */}
      <button
        ref={ctaRef}
        onClick={scrollToContact}
        className="mt-10 px-8 py-4 bg-gold hover:bg-gold-dark rounded-full font-mono text-sm tracking-[0.12em] text-charcoal uppercase flex items-center gap-3 transition-colors group"
      >
        START A PROJECT
        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
      </button>
    </section>
  );
};

export default CTASection;
