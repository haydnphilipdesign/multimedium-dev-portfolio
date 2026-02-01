import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  className?: string;
}

const HeroSection = ({ className = '' }: HeroSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const scrollLabelRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const headline = headlineRef.current;
    const subheadline = subheadlineRef.current;
    const cta = ctaRef.current;
    const scrollLabel = scrollLabelRef.current;

    if (!section || !image || !headline || !subheadline || !cta || !scrollLabel) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: '(min-width: 768px)',
        reduceMotion: '(prefers-reduced-motion: reduce)',
      },
      (context) => {
        if (!context.conditions?.isDesktop || context.conditions?.reduceMotion) return;

        const ctx = gsap.context(() => {
          // Initial states
          gsap.set(image, { opacity: 0, x: '-12vw', scale: 0.96 });
          gsap.set(headline.children, { opacity: 0, y: 40 });
          gsap.set(subheadline, { opacity: 0, y: 30 });
          gsap.set(cta, { opacity: 0, y: 20 });
          gsap.set(scrollLabel, { opacity: 0 });

          // Auto-play entrance animation
          const entranceTl = gsap.timeline({ delay: 0.3 });

          entranceTl
            .to(image, {
              opacity: 1,
              x: 0,
              scale: 1,
              duration: 1,
              ease: 'power3.out',
            })
            .to(
              headline.children,
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.08,
                ease: 'power3.out',
              },
              '-=0.6'
            )
            .to(
              subheadline,
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: 'power3.out',
              },
              '-=0.4'
            )
            .to(
              cta,
              {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: 'power3.out',
              },
              '-=0.3'
            )
            .to(
              scrollLabel,
              {
                opacity: 1,
                duration: 0.5,
                ease: 'power2.out',
              },
              '-=0.2'
            );

          // Scroll-driven exit animation
          const scrollTl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: '+=130%',
              pin: true,
              scrub: 0.6,
              onLeaveBack: () => {
                // Reset to visible when scrolling back to top
                gsap.set(image, { opacity: 1, x: 0, scale: 1, rotation: 0 });
                gsap.set(headline.children, { opacity: 1, x: 0 });
                gsap.set(subheadline, { opacity: 1, y: 0 });
                gsap.set(cta, { opacity: 1, y: 0 });
              },
            },
          });

          // EXIT phase (70-100%)
          scrollTl
            .fromTo(
              image,
              { x: 0, scale: 1, rotation: 0, opacity: 1 },
              { x: '-55vw', scale: 0.92, rotation: -2, opacity: 0, ease: 'power2.in' },
              0.7
            )
            .fromTo(
              headline.children,
              { x: 0, opacity: 1 },
              { x: '35vw', opacity: 0, ease: 'power2.in', stagger: 0.02 },
              0.7
            )
            .fromTo(
              subheadline,
              { y: 0, opacity: 1 },
              { y: '10vh', opacity: 0, ease: 'power2.in' },
              0.75
            )
            .fromTo(
              cta,
              { y: 0, opacity: 1 },
              { y: '10vh', opacity: 0, ease: 'power2.in' },
              0.8
            )
            .fromTo(
              scrollLabel,
              { opacity: 1 },
              { opacity: 0, ease: 'power2.in' },
              0.7
            );
        }, section);

        return () => ctx.revert();
      }
    );

    return () => mm.revert();
  }, []);

  const scrollToWork = () => {
    const workSection = document.querySelector('#work');
    if (workSection) {
      workSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className={`relative w-full min-h-screen md:h-screen bg-charcoal overflow-hidden ${className}`}
    >
      {/* Left Image Card */}
      <div
        ref={imageRef}
        className="relative mx-[5vw] mt-24 h-[52vh] rounded-card overflow-hidden card-shadow card-border sm:h-[60vh] md:absolute md:left-[5vw] md:top-[14vh] md:mx-0 md:mt-0 md:w-[44vw] md:h-[72vh]"
      >
        <img
          src="/images/hero_portrait.jpg"
          alt="Creative professional"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Typography Block */}
      <div className="px-[5vw] pb-16 pt-10 md:absolute md:left-[54vw] md:top-[18vh] md:w-[41vw] md:px-0 md:pt-0 md:pb-0">
        {/* Headline */}
        <div ref={headlineRef} className="space-y-0">
          <h1 className="font-display font-bold text-hero text-cream leading-[1.05] tracking-[-0.02em] uppercase">
            WEBSITES
          </h1>
          <h1 className="font-display font-bold text-hero text-cream leading-[1.05] tracking-[-0.02em] uppercase">
            THAT FEEL
          </h1>
          <h1 className="font-display font-bold text-hero text-gold leading-[1.05] tracking-[-0.02em] uppercase">
            LIKE PLACES
          </h1>
        </div>

        {/* Subheadline */}
        <p
          ref={subheadlineRef}
          className="mt-[3vh] text-base md:text-lg text-cream/70 max-w-md leading-relaxed"
        >
          Multimedium is a small studio designing bold, scroll-driven sites for brands with something to say.
        </p>

        {/* CTA */}
        <button
          ref={ctaRef}
          onClick={scrollToWork}
          className="mt-[4vh] group flex items-center gap-3 font-mono text-sm tracking-[0.12em] text-gold hover:text-cream transition-colors"
        >
          <span className="relative">
            EXPLORE WORK
            <span className="absolute bottom-0 left-0 w-full h-px bg-gold group-hover:bg-cream transition-colors" />
          </span>
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Scroll Label */}
      <span
        ref={scrollLabelRef}
        className="hidden md:block absolute bottom-[3vh] left-1/2 -translate-x-1/2 font-mono text-xs tracking-[0.2em] text-cream/40"
      >
        SCROLL
      </span>
    </section>
  );
};

export default HeroSection;
