import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '../sections/Navigation';
import HeroSection from '../sections/HeroSection';
import WorkSection from '../sections/WorkSection';
import CaseStudySection from '../sections/CaseStudySection';
import ServicesSection from '../sections/ServicesSection';
import ProcessSection from '../sections/ProcessSection';
import AboutSection from '../sections/AboutSection';
import TestimonialsSection from '../sections/TestimonialsSection';
import PricingSection from '../sections/PricingSection';
import FAQSection from '../sections/FAQSection';
import CTASection from '../sections/CTASection';
import ContactSection from '../sections/ContactSection';
import Footer from '../sections/Footer';

gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  const mainRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // Wait for all sections to mount and create their ScrollTriggers
    let snapTrigger: ScrollTrigger | null = null;
    const timer = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      snapTrigger = ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const inPinned = pinnedRanges.some(r => value >= r.start - 0.02 && value <= r.end + 0.02);
            if (!inPinned) return value;
            
            const target = pinnedRanges.reduce((closest, r) =>
              Math.abs(r.center - value) < Math.abs(closest - value) ? r.center : closest,
              pinnedRanges[0]?.center ?? 0
            );
            return target;
          },
          duration: { min: 0.35, max: 0.65 },
          delay: 0,
          ease: "power2.inOut"
        }
      });
    }, 500);

    return () => {
      clearTimeout(timer);
      snapTrigger?.kill();
    };
  }, []);

  return (
    <div ref={mainRef} className="relative bg-charcoal min-h-screen">
      {/* Grain Overlay */}
      <div className="grain-overlay" aria-hidden="true" />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main className="relative">
        {/* Section 1: Hero */}
        <HeroSection className="z-10" />
        
        {/* Section 2: Selected Work */}
        <WorkSection className="z-20" />
        
        {/* Section 3: Featured Case Study */}
        <CaseStudySection className="z-30" />
        
        {/* Section 4: Services */}
        <ServicesSection className="z-40" />
        
        {/* Section 5: Process */}
        <ProcessSection className="z-50" />
        
        {/* Section 6: About */}
        <AboutSection className="z-[60]" />
        
        {/* Section 7: Testimonials */}
        <TestimonialsSection className="z-[70]" />
        
        {/* Section 8: Pricing */}
        <PricingSection className="z-[80]" />
        
        {/* Section 9: FAQ */}
        <FAQSection className="z-[90]" />
        
        {/* Section 10: CTA */}
        <CTASection className="z-[100]" />
        
        {/* Section 11: Contact */}
        <ContactSection className="z-[110]" />
        
        {/* Section 12: Footer */}
        <Footer className="z-[120]" />
      </main>
    </div>
  );
};

export default HomePage;
