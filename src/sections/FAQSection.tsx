import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface FAQSectionProps {
  className?: string;
}

const FAQSection = ({ className = '' }: FAQSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What's your typical timeline?",
      answer: "Most sites ship in 4–8 weeks depending on scope. Landing pages are faster (2 weeks), while complex multi-page sites with custom animations take longer. We'll give you a precise timeline after our discovery call.",
    },
    {
      question: "Do you work with startups?",
      answer: "Yes—if the project has clear goals and a realistic budget. We love working with early-stage companies that understand the value of great design. If you're pre-revenue, we may recommend starting with a landing page.",
    },
    {
      question: "Will my site be editable?",
      answer: "Yes. We build with clean component systems you can update. For larger sites, we integrate with headless CMS options like Sanity or Contentful so your team can manage content without touching code.",
    },
    {
      question: "How do we get started?",
      answer: "Book a call. We'll define scope, timeline, and next steps. If we're a good fit, we'll send a proposal within 48 hours. Once signed, we kick off with a discovery session to align on goals and priorities.",
    },
  ];

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const header = headerRef.current;
    const items = itemsRef.current.filter(Boolean);

    if (!section || !image || !header || items.length === 0) return;

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
              items,
              { x: '35vw', opacity: 0 },
              { x: 0, opacity: 1, ease: 'power3.out', stagger: 0.015 },
              0
            );

          // EXIT (70-100%)
          scrollTl
            .fromTo(image, { x: 0, opacity: 1 }, { x: '-18vw', opacity: 0, ease: 'power2.in' }, 0.7)
            .fromTo(header, { y: 0, opacity: 1 }, { y: '-6vh', opacity: 0, ease: 'power2.in' }, 0.7)
            .fromTo(
              items,
              { y: 0, opacity: 1 },
              { y: '-18vh', opacity: 0, ease: 'power2.in', stagger: 0.01 },
              0.7
            );
        }, section);

        return () => ctx.revert();
      }
    );

    return () => mm.revert();
  }, []);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
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
          src="/images/faq_scene.jpg"
          alt="FAQ"
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
          FAQ
        </h2>

        {/* FAQ Items */}
        <div className="flex flex-col gap-3 md:flex-1">
          {faqs.map((faq, index) => (
            <div
              key={index}
              ref={el => { itemsRef.current[index] = el; }}
              className="bg-charcoal-light rounded-xl card-border overflow-hidden"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-cream/5 transition-colors"
                aria-expanded={openIndex === index}
                aria-controls={`faq-panel-${index}`}
              >
                <span className="font-mono text-sm text-cream uppercase tracking-wide">
                  {faq.question}
                </span>
                <ChevronRight
                  size={18}
                  className={`text-gold flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-90' : ''
                  }`}
                />
              </button>
              <div
                id={`faq-panel-${index}`}
                className={`grid transition-[grid-template-rows] duration-300 ${
                  openIndex === index ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-4 pb-4 text-sm text-cream/60 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
