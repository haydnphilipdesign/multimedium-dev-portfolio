import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AboutSectionProps {
  className?: string;
}

const AboutSection = ({ className = '' }: AboutSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<(HTMLDivElement | null)[]>([]);

  const stats = [
    { value: 'SOLO-LED', label: 'FOUNDER' },
    { value: 'ONE LOOP', label: 'STRATEGY→BUILD' },
    { value: 'FAST + A11Y', label: 'DEFAULT' },
  ];

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const header = headerRef.current;
    const intro = introRef.current;
    const stats = statsRef.current.filter(Boolean);

    if (!section || !image || !header || !intro || stats.length === 0) return;

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
            .fromTo(intro, { x: '35vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'power2.out' }, 0.05)
            .fromTo(
              stats,
              { y: '18vh', opacity: 0 },
              { y: 0, opacity: 1, ease: 'power3.out', stagger: 0.02 },
              0.1
            );

          // EXIT (70-100%)
          scrollTl
            .fromTo(image, { x: 0, opacity: 1 }, { x: '-18vw', opacity: 0, ease: 'power2.in' }, 0.7)
            .fromTo([header, intro], { y: 0, opacity: 1 }, { y: '-18vh', opacity: 0, ease: 'power2.in' }, 0.7)
            .fromTo(
              stats,
              { y: 0, opacity: 1 },
              { y: '-18vh', opacity: 0, ease: 'power2.in', stagger: 0.01 },
              0.72
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
      id="about"
      className={`relative w-full min-h-screen md:h-screen bg-charcoal overflow-visible md:overflow-hidden ${className}`}
    >
      {/* Left Image */}
      <div
        ref={imageRef}
        className="relative mx-[5vw] mt-24 h-[44vh] rounded-card overflow-hidden card-shadow card-border sm:h-[52vh] md:absolute md:left-[5vw] md:top-[12vh] md:mx-0 md:mt-0 md:w-[46vw] md:h-[76vh]"
      >
        <img
          src="/images/haydn.png"
          alt="Haydn, founder of Multimedium"
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
          ABOUT
        </h2>

        {/* Intro Card */}
        <div
          ref={introRef}
          className="bg-charcoal-light rounded-xl card-border p-6 mb-4"
        >
          <p className="text-base text-cream/80 leading-relaxed">
            Multimedium is led by Haydn—a solo web design and development studio.
            When a project needs it, I bring in senior collaborators for specialized work.
          </p>
          <p className="text-base text-cream/60 leading-relaxed mt-4">
            Every project starts with business goals and a clear plan. The output isn&apos;t
            just beautiful—it&apos;s built to be understandable, fast, and credible.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              ref={el => { statsRef.current[index] = el; }}
              className="bg-charcoal-light rounded-xl card-border p-4 text-center"
            >
              <span className="font-display font-bold text-2xl text-gold">
                {stat.value}
              </span>
              <p className="font-mono text-xs tracking-[0.12em] text-cream/50 mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
