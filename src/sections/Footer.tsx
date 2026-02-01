import { useRef, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FooterProps {
  className?: string;
}

const Footer = ({ className = '' }: FooterProps) => {
  const navigate = useNavigate();
  const footerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(footer,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: footer,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    }, footer);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className={`relative w-full bg-charcoal py-8 border-t border-cream/5 ${className}`}
    >
      <div className="w-full px-[5vw] flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left */}
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs tracking-[0.12em] text-cream/40">
            © 2026 MULTIMEDIUM
          </span>
        </div>

        {/* Center */}
        <div className="hidden md:block w-px h-4 bg-cream/10" />

        {/* Right */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => navigate('/privacy')}
            className="font-mono text-xs tracking-[0.12em] text-cream/40 hover:text-gold transition-colors uppercase"
          >
            Privacy
          </button>
          <button
            onClick={() => navigate('/terms')}
            className="font-mono text-xs tracking-[0.12em] text-cream/40 hover:text-gold transition-colors uppercase"
          >
            Terms
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;