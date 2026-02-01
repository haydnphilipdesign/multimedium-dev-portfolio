import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ContactSectionProps {
  className?: string;
}

const ContactSection = ({ className = '' }: ContactSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    budget: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const form = formRef.current;

    if (!section || !image || !form) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: '(min-width: 768px)',
        reduceMotion: '(prefers-reduced-motion: reduce)',
      },
      (context) => {
        if (!context.conditions?.isDesktop || context.conditions?.reduceMotion) return;

        const ctx = gsap.context(() => {
          // Flowing section animation (not pinned)
          gsap.fromTo(
            image,
            { x: '-10vw', opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'top 40%',
                scrub: 1,
              },
            }
          );

          gsap.fromTo(
            form,
            { x: '10vw', opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'top 40%',
                scrub: 1,
              },
            }
          );
        }, section);

        return () => ctx.revert();
      }
    );

    return () => mm.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const subject = encodeURIComponent(`Project inquiry — ${formData.name || 'New lead'}`);
    const body = encodeURIComponent(
      [
        `Name: ${formData.name}`,
        `Email: ${formData.email}`,
        `Budget: ${formData.budget || '(not specified)'}`,
        '',
        formData.message,
      ].join('\n')
    );

    window.location.href = `mailto:haydn@multimedium.dev?subject=${subject}&body=${body}`;

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', budget: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className={`relative w-full min-h-screen bg-charcoal overflow-visible md:overflow-hidden py-20 ${className}`}
    >
      {/* Left Image */}
      <div
        ref={imageRef}
        className="relative mx-[5vw] mt-8 h-[44vh] rounded-card overflow-hidden card-shadow card-border sm:h-[52vh] md:absolute md:left-[5vw] md:top-[12vh] md:mx-0 md:mt-0 md:w-[46vw] md:h-[76vh]"
      >
        <img
          src="/images/contact_scene.jpg"
          alt="Contact"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Form */}
      <div
        ref={formRef}
        className="px-[5vw] pt-10 md:absolute md:left-[54vw] md:top-[14vh] md:w-[41vw] md:px-0 md:pt-0"
      >
        {/* Header */}
        <h2 className="font-display font-bold text-section text-cream tracking-[-0.02em] uppercase mb-6">
          CONTACT
        </h2>

        {/* Email */}
        <div className="mb-8">
          <a
            href="mailto:haydn@multimedium.dev"
            className="font-mono text-sm text-gold hover:text-cream transition-colors"
          >
            haydn@multimedium.dev
          </a>
        </div>

        {/* Form */}
        {isSubmitted ? (
          <div className="bg-charcoal-light rounded-xl card-border p-8 text-center">
            <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Send size={20} className="text-gold" />
            </div>
            <h3 className="font-display font-bold text-xl text-cream mb-2">
              Message Sent!
            </h3>
            <p className="text-cream/60">
              If your email client didn&apos;t open, email us directly at{' '}
              <a href="mailto:haydn@multimedium.dev" className="text-gold hover:text-cream transition-colors">
                haydn@multimedium.dev
              </a>.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-mono text-xs tracking-[0.12em] text-cream/50 uppercase mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-charcoal-light border border-cream/10 rounded-lg px-4 py-3 text-cream placeholder:text-cream/30 focus:border-gold/50 focus:outline-none transition-colors"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block font-mono text-xs tracking-[0.12em] text-cream/50 uppercase mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-charcoal-light border border-cream/10 rounded-lg px-4 py-3 text-cream placeholder:text-cream/30 focus:border-gold/50 focus:outline-none transition-colors"
                placeholder="you@company.com"
              />
            </div>

            <div>
              <label className="block font-mono text-xs tracking-[0.12em] text-cream/50 uppercase mb-2">
                Budget
              </label>
              <select
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full bg-charcoal-light border border-cream/10 rounded-lg px-4 py-3 text-cream focus:border-gold/50 focus:outline-none transition-colors appearance-none cursor-pointer"
              >
                <option value="" className="bg-charcoal-light">Select a range</option>
                <option value="3-5k" className="bg-charcoal-light">$3,500 – $5,000</option>
                <option value="5-10k" className="bg-charcoal-light">$5,000 – $10,000</option>
                <option value="10-20k" className="bg-charcoal-light">$10,000 – $20,000</option>
                <option value="20k+" className="bg-charcoal-light">$20,000+</option>
              </select>
            </div>

            <div>
              <label className="block font-mono text-xs tracking-[0.12em] text-cream/50 uppercase mb-2">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full bg-charcoal-light border border-cream/10 rounded-lg px-4 py-3 text-cream placeholder:text-cream/30 focus:border-gold/50 focus:outline-none transition-colors resize-none"
                placeholder="Tell us about your project..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-gold hover:bg-gold-dark rounded-lg font-mono text-sm tracking-[0.12em] text-charcoal uppercase flex items-center justify-center gap-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-charcoal/30 border-t-charcoal rounded-full animate-spin" />
                  SENDING...
                </span>
              ) : (
                <>
                  SEND MESSAGE
                  <Send size={16} />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default ContactSection;
