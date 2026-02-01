import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface TestimonialsSectionProps {
  className?: string;
}

const TestimonialsSection = ({ className = '' }: TestimonialsSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const testimonials = [
    {
      quote: "The most thoughtful designer we've worked with. Every decision was intentional and the results speak for themselves.",
      author: 'Avery L.',
      company: 'Nomad Gear',
    },
    {
      quote: "Turned a complex product into something feelable. Our users finally understand what we do.",
      author: 'Sam R.',
      company: 'UtilitySheet',
    },
    {
      quote: "Fast, precise, and always thinking in systems. The website became our best salesperson.",
      author: 'Mina K.',
      company: 'Velvet Rose',
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
          src="/images/testimonials_scene.jpg"
          alt="Client testimonials"
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
          TESTIMONIALS
        </h2>

        {/* Quote Cards */}
        <div className="flex flex-col gap-4 md:flex-1">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.author}
              ref={el => { cardsRef.current[index] = el; }}
              className="bg-charcoal-light rounded-xl card-border p-5 flex flex-col justify-between md:flex-1"
            >
              <div>
                <Quote size={20} className="text-gold/50 mb-3" />
                <p className="text-sm text-cream/80 leading-relaxed italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-cream/10">
                <span className="font-mono text-xs text-gold uppercase tracking-[0.12em]">
                  {testimonial.author}
                </span>
                <span className="text-cream/40 mx-2">·</span>
                <span className="text-sm text-cream/50">
                  {testimonial.company}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
