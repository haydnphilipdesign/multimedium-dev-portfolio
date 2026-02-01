import { useRef, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { caseStudies } from '../data/caseStudies';

gsap.registerPlugin(ScrollTrigger);

interface CaseStudySectionProps {
  className?: string;
}

const CaseStudySection = ({ className = '' }: CaseStudySectionProps) => {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const featured = caseStudies.find((study) => study.featured) ?? caseStudies[0];
  const featuredResults = featured?.results?.slice(0, 2) ?? [];

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const text = textRef.current;

    if (!section || !image || !text) return;

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
              image,
              { x: '-60vw', scale: 1.06, opacity: 0 },
              { x: 0, scale: 1, opacity: 1, ease: 'power2.out' },
              0
            )
            .fromTo(
              text,
              { x: '40vw', opacity: 0 },
              { x: 0, opacity: 1, ease: 'power2.out' },
              0
            );

          // EXIT (70-100%)
          scrollTl
            .fromTo(
              image,
              { x: 0, scale: 1, opacity: 1 },
              { x: '-18vw', scale: 0.98, opacity: 0, ease: 'power2.in' },
              0.7
            )
            .fromTo(
              text,
              { y: 0, opacity: 1 },
              { y: '-18vh', opacity: 0, ease: 'power2.in' },
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
      {/* Left Image Panel */}
      <div
        ref={imageRef}
        className="relative mx-[5vw] mt-24 aspect-[4/3] rounded-card overflow-hidden card-shadow card-border md:absolute md:left-[5vw] md:top-[12vh] md:mx-0 md:mt-0 md:w-[46vw] md:h-[76vh]"
      >
        <img
          src={featured.heroImage}
          alt={`${featured.title} case study`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Text Panel */}
      <div
        ref={textRef}
        className="px-[5vw] pb-16 pt-10 md:absolute md:left-[54vw] md:top-[16vh] md:w-[41vw] md:px-0 md:pt-0 md:pb-0"
      >
        {/* Label */}
        <span className="font-mono text-xs tracking-[0.12em] text-gold uppercase">
          Featured Case Study
        </span>

        {/* Title */}
        <h2 className="mt-4 font-display font-bold text-section text-cream tracking-[-0.02em] uppercase">
          {featured.title}
        </h2>

        {/* Description */}
        <p className="mt-6 text-base text-cream/70 leading-relaxed max-w-md">
          {featured.solution}
        </p>

        {/* Results */}
        {featuredResults.length > 0 && (
          <div className="mt-8 grid grid-cols-2 gap-6">
            {featuredResults.map((result) => (
              <div key={result.metric}>
                <span className="font-display font-bold text-2xl text-gold">{result.metric}</span>
                <p className="text-sm text-cream/50 mt-1">{result.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <button 
          onClick={() => navigate(`/case-study/${featured.id}`)}
          className="mt-10 group flex items-center gap-3 font-mono text-sm tracking-[0.12em] text-gold hover:text-cream transition-colors"
        >
          <span className="relative">
            READ THE CASE STUDY
            <span className="absolute bottom-0 left-0 w-full h-px bg-gold group-hover:bg-cream transition-colors" />
          </span>
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};

export default CaseStudySection;
