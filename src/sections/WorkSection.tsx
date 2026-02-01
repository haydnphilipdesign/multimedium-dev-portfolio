import { useRef, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { caseStudies } from '../data/caseStudies';

gsap.registerPlugin(ScrollTrigger);

interface WorkSectionProps {
  className?: string;
}

const WorkSection = ({ className = '' }: WorkSectionProps) => {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const works = caseStudies.slice(0, 6);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const cards = cardsRef.current.filter(Boolean);

    if (!section || !title || cards.length === 0) return;

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
              title,
              { x: '-20vw', opacity: 0 },
              { x: 0, opacity: 1, ease: 'power2.out' },
              0
            )
            .fromTo(
              cards,
              { y: '40vh', rotation: -2, scale: 0.92, opacity: 0 },
              {
                y: 0,
                rotation: 0,
                scale: 1,
                opacity: 1,
                ease: 'power3.out',
                stagger: 0.02,
              },
              0
            );

          // EXIT (70-100%)
          scrollTl
            .fromTo(
              title,
              { x: 0, opacity: 1 },
              { x: '-12vw', opacity: 0, ease: 'power2.in' },
              0.7
            )
            .fromTo(
              cards,
              { y: 0, rotation: 0, scale: 1, opacity: 1 },
              {
                y: '-35vh',
                rotation: 2,
                scale: 0.94,
                opacity: 0,
                ease: 'power2.in',
                stagger: 0.01,
              },
              0.7
            );
        }, section);

        return () => ctx.revert();
      }
    );

    return () => mm.revert();
  }, []);

  const handleCardClick = (id: string) => {
    navigate(`/case-study/${id}`);
  };

  return (
    <section
      ref={sectionRef}
      id="work"
      className={`relative w-full min-h-screen md:h-screen bg-charcoal overflow-visible md:overflow-hidden ${className}`}
    >
      {/* Mobile Layout */}
      <div className="md:hidden px-[5vw] pt-24 pb-16">
        <h2 className="font-display font-bold text-section text-cream tracking-[-0.02em] uppercase">
          SELECTED WORK
        </h2>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {works.map((work) => (
            <button
              key={work.id}
              type="button"
              onClick={() => handleCardClick(work.id)}
              className="rounded-card overflow-hidden card-shadow card-border group cursor-pointer relative text-left"
            >
              <img
                src={work.image}
                alt={work.title}
                className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="font-mono text-xs tracking-[0.12em] text-gold">{work.title}</span>
                <p className="text-sm text-cream/60 mt-1">{work.subtitle}</p>
              </div>
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight size={20} className="text-cream" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block">
        {/* Title */}
        <h2
          ref={titleRef}
          className="absolute left-[5vw] top-[10vh] font-display font-bold text-section text-cream tracking-[-0.02em] uppercase"
        >
          SELECTED<br />WORK
        </h2>

        {/* Gallery Grid */}
        <div className="absolute left-[28vw] top-[10vh] w-[67vw] h-[80vh]">
          <div className="grid grid-cols-12 grid-rows-2 gap-[2.2vh] h-full">
            {/* Row 1 */}
            <div
              ref={el => { cardsRef.current[0] = el; }}
              onClick={() => handleCardClick(works[0].id)}
              className="col-span-4 row-span-1 rounded-card overflow-hidden card-shadow card-border group cursor-pointer relative"
            >
              <img
                src={works[0].image}
                alt={works[0].title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="font-mono text-xs tracking-[0.12em] text-gold">{works[0].title}</span>
                <p className="text-sm text-cream/60 mt-1">{works[0].subtitle}</p>
              </div>
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight size={20} className="text-cream" />
              </div>
            </div>

          <div
            ref={el => { cardsRef.current[1] = el; }}
            onClick={() => handleCardClick(works[1].id)}
            className="col-span-5 row-span-1 rounded-card overflow-hidden card-shadow card-border group cursor-pointer relative"
          >
            <img
              src={works[1].image}
              alt={works[1].title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="font-mono text-xs tracking-[0.12em] text-gold">{works[1].title}</span>
              <p className="text-sm text-cream/60 mt-1">{works[1].subtitle}</p>
            </div>
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowUpRight size={20} className="text-cream" />
            </div>
          </div>

          <div
            ref={el => { cardsRef.current[2] = el; }}
            onClick={() => handleCardClick(works[2].id)}
            className="col-span-3 row-span-1 rounded-card overflow-hidden card-shadow card-border group cursor-pointer relative"
          >
            <img
              src={works[2].image}
              alt={works[2].title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="font-mono text-xs tracking-[0.12em] text-gold">{works[2].title}</span>
              <p className="text-sm text-cream/60 mt-1">{works[2].subtitle}</p>
            </div>
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowUpRight size={20} className="text-cream" />
            </div>
          </div>

          {/* Row 2 */}
          <div
            ref={el => { cardsRef.current[3] = el; }}
            onClick={() => handleCardClick(works[3].id)}
            className="col-span-5 row-span-1 rounded-card overflow-hidden card-shadow card-border group cursor-pointer relative"
          >
            <img
              src={works[3].image}
              alt={works[3].title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="font-mono text-xs tracking-[0.12em] text-gold">{works[3].title}</span>
              <p className="text-sm text-cream/60 mt-1">{works[3].subtitle}</p>
            </div>
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowUpRight size={20} className="text-cream" />
            </div>
          </div>

          <div
            ref={el => { cardsRef.current[4] = el; }}
            onClick={() => handleCardClick(works[4].id)}
            className="col-span-4 row-span-1 rounded-card overflow-hidden card-shadow card-border group cursor-pointer relative"
          >
            <img
              src={works[4].image}
              alt={works[4].title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="font-mono text-xs tracking-[0.12em] text-gold">{works[4].title}</span>
              <p className="text-sm text-cream/60 mt-1">{works[4].subtitle}</p>
            </div>
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowUpRight size={20} className="text-cream" />
            </div>
          </div>

          <div
            ref={el => { cardsRef.current[5] = el; }}
            onClick={() => handleCardClick(works[5].id)}
            className="col-span-3 row-span-1 rounded-card overflow-hidden card-shadow card-border group cursor-pointer relative"
          >
            <img
              src={works[5].image}
              alt={works[5].title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="font-mono text-xs tracking-[0.12em] text-gold">{works[5].title}</span>
              <p className="text-sm text-cream/60 mt-1">{works[5].subtitle}</p>
            </div>
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowUpRight size={20} className="text-cream" />
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
};

export default WorkSection;
