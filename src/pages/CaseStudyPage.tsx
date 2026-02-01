import { useRef, useLayoutEffect, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, ArrowUpRight, Calendar, Tag, User } from 'lucide-react';
import { getCaseStudyById } from '../data/caseStudies';
import Navigation from '../sections/Navigation';
import Footer from '../sections/Footer';

gsap.registerPlugin(ScrollTrigger);

const CaseStudyPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const caseStudy = id ? getCaseStudyById(id) : undefined;
  
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useLayoutEffect(() => {
    if (!caseStudy) return;
    
    const hero = heroRef.current;
    const content = contentRef.current;
    const results = resultsRef.current;

    if (!hero || !content || !results) return;

    const ctx = gsap.context(() => {
      // Hero animation
      gsap.fromTo(hero.querySelector('h1'),
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
      );
      
      gsap.fromTo(hero.querySelector('img'),
        { scale: 1.1, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: 'power3.out' }
      );

      // Content sections
      gsap.fromTo(content.children,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: content,
            start: 'top 80%',
          }
        }
      );

      // Results
      gsap.fromTo(results.children,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: results,
            start: 'top 85%',
          }
        }
      );
    });

    return () => ctx.revert();
  }, [caseStudy]);

  if (!caseStudy) {
    return (
      <div className="min-h-screen bg-charcoal flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display font-bold text-4xl text-cream mb-4">Case Study Not Found</h1>
          <button
            onClick={() => navigate('/')}
            className="font-mono text-sm text-gold hover:text-cream transition-colors"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-charcoal min-h-screen">
      <div className="grain-overlay" aria-hidden="true" />
      <Navigation />
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[80vh] pt-24 pb-16">
        {/* Back Button */}
        <div className="w-full px-[5vw] mb-8">
          <button
            onClick={() => navigate('/#work')}
            className="group flex items-center gap-2 font-mono text-sm text-cream/60 hover:text-gold transition-colors"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Work
          </button>
        </div>

        {/* Hero Image */}
        <div className="w-full px-[5vw] mb-12">
          <div className="relative w-full h-[50vh] rounded-card overflow-hidden card-shadow card-border">
            <img
              src={caseStudy.heroImage}
              alt={caseStudy.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
          </div>
        </div>

        {/* Title & Meta */}
        <div className="w-full px-[5vw]">
          <div className="flex flex-wrap gap-4 mb-6">
            <span className="px-3 py-1 bg-gold/10 rounded-full font-mono text-xs text-gold uppercase tracking-wide">
              {caseStudy.category}
            </span>
            <span className="flex items-center gap-2 font-mono text-xs text-cream/50">
              <Calendar size={14} />
              {caseStudy.year}
            </span>
          </div>
          
          <h1 className="font-display font-bold text-hero text-cream tracking-[-0.02em] uppercase mb-4">
            {caseStudy.title}
          </h1>
          <p className="text-xl text-cream/60 max-w-2xl">
            {caseStudy.subtitle}
          </p>

          {caseStudy.externalUrl && (
            <div className="mt-8">
              <a
                href={caseStudy.externalUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 font-mono text-sm tracking-[0.12em] text-gold hover:text-cream transition-colors uppercase"
              >
                Visit Live Site
                <ArrowUpRight size={16} />
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Content Section */}
      <section ref={contentRef} className="w-full px-[5vw] py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-16">
            {/* Challenge */}
            <div>
              <h2 className="font-display font-bold text-2xl text-cream uppercase mb-4">
                The Challenge
              </h2>
              <p className="text-base text-cream/70 leading-relaxed">
                {caseStudy.challenge}
              </p>
            </div>

            {/* Solution */}
            <div>
              <h2 className="font-display font-bold text-2xl text-cream uppercase mb-4">
                The Solution
              </h2>
              <p className="text-base text-cream/70 leading-relaxed">
                {caseStudy.solution}
              </p>
            </div>

            {/* Gallery */}
            {caseStudy.gallery.length > 1 && (
              <div>
                <h2 className="font-display font-bold text-2xl text-cream uppercase mb-6">
                  Project Gallery
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {caseStudy.gallery.map((image, index) => (
                    <div
                      key={index}
                      className="aspect-[4/3] rounded-xl overflow-hidden card-border"
                    >
                      <img
                        src={image}
                        alt={`${caseStudy.title} gallery ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Testimonial */}
            {caseStudy.testimonial && (
              <div className="bg-charcoal-light rounded-xl card-border p-8">
                <p className="text-lg text-cream/80 italic leading-relaxed mb-6">
                  &ldquo;{caseStudy.testimonial.quote}&rdquo;
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                    <User size={18} className="text-gold" />
                  </div>
                  <div>
                    <p className="font-mono text-sm text-gold">{caseStudy.testimonial.author}</p>
                    <p className="text-sm text-cream/50">{caseStudy.testimonial.role}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Client Info */}
            <div className="bg-charcoal-light rounded-xl card-border p-6">
              <h3 className="font-mono text-xs tracking-[0.12em] text-cream/50 uppercase mb-4">
                Client
              </h3>
              <p className="text-cream font-medium">{caseStudy.client}</p>
            </div>

            {/* Role */}
            {caseStudy.role && (
              <div className="bg-charcoal-light rounded-xl card-border p-6">
                <h3 className="font-mono text-xs tracking-[0.12em] text-cream/50 uppercase mb-4">
                  Role
                </h3>
                <p className="text-cream/80">{caseStudy.role}</p>
              </div>
            )}

            {/* Tools */}
            {caseStudy.tools && caseStudy.tools.length > 0 && (
              <div className="bg-charcoal-light rounded-xl card-border p-6">
                <h3 className="font-mono text-xs tracking-[0.12em] text-cream/50 uppercase mb-4">
                  Tools
                </h3>
                <div className="flex flex-wrap gap-2">
                  {caseStudy.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-3 py-1.5 bg-charcoal rounded-lg font-mono text-xs text-cream/70"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Website */}
            {caseStudy.externalUrl && (
              <div className="bg-charcoal-light rounded-xl card-border p-6">
                <h3 className="font-mono text-xs tracking-[0.12em] text-cream/50 uppercase mb-4">
                  Website
                </h3>
                <a
                  href={caseStudy.externalUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 font-mono text-sm text-gold hover:text-cream transition-colors"
                >
                  Visit live site
                  <ArrowUpRight size={16} />
                </a>
              </div>
            )}

            {/* Services */}
            <div className="bg-charcoal-light rounded-xl card-border p-6">
              <h3 className="font-mono text-xs tracking-[0.12em] text-cream/50 uppercase mb-4">
                Services
              </h3>
              <div className="flex flex-wrap gap-2">
                {caseStudy.services.map((service) => (
                  <span
                    key={service}
                    className="flex items-center gap-1 px-3 py-1.5 bg-charcoal rounded-lg font-mono text-xs text-cream/70"
                  >
                    <Tag size={12} />
                    {service}
                  </span>
                ))}
              </div>
            </div>

            {/* Results */}
            <div ref={resultsRef} className="bg-charcoal-light rounded-xl card-border p-6">
              <h3 className="font-mono text-xs tracking-[0.12em] text-cream/50 uppercase mb-4">
                Results
              </h3>
              <div className="space-y-4">
                {caseStudy.results.map((result, index) => (
                  <div key={index} className="border-b border-cream/10 last:border-0 pb-4 last:pb-0">
                    <span className="font-display font-bold text-2xl text-gold">
                      {result.metric}
                    </span>
                    <p className="text-sm text-cream/60 mt-1">
                      {result.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={() => navigate('/#contact')}
              className="w-full py-4 bg-gold hover:bg-gold-dark rounded-lg font-mono text-sm tracking-[0.12em] text-charcoal uppercase flex items-center justify-center gap-2 transition-colors group"
            >
              Start Your Project
              <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Next Project */}
      <section className="w-full px-[5vw] py-16 border-t border-cream/5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <span className="font-mono text-xs tracking-[0.12em] text-cream/50 uppercase">
              Ready to work together?
            </span>
            <h2 className="font-display font-bold text-3xl text-cream mt-2">
              Let&apos;s build something sharp.
            </h2>
          </div>
          <button
            onClick={() => navigate('/#contact')}
            className="px-8 py-4 bg-gold hover:bg-gold-dark rounded-lg font-mono text-sm tracking-[0.12em] text-charcoal uppercase transition-colors"
          >
            Get in Touch
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CaseStudyPage;
