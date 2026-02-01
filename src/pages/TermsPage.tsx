import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navigation from '../sections/Navigation';
import Footer from '../sections/Footer';

const TermsPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative bg-charcoal min-h-screen">
      <div className="grain-overlay" aria-hidden="true" />
      <Navigation />

      <main className="pt-32 pb-20">
        {/* Header */}
        <div className="w-full px-[5vw] mb-12">
          <button
            onClick={() => navigate('/')}
            className="group flex items-center gap-2 font-mono text-sm text-cream/60 hover:text-gold transition-colors mb-8"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>

          <h1 className="font-display font-bold text-section text-cream tracking-[-0.02em] uppercase">
            Terms of Service
          </h1>
          <p className="text-cream/50 mt-4">Last updated: February 2026</p>
        </div>

        {/* Content */}
        <div className="w-full px-[5vw] max-w-4xl">
          <div className="space-y-12">
            <section>
              <h2 className="font-display font-bold text-xl text-cream uppercase mb-4">
                Agreement to Terms
              </h2>
              <p className="text-cream/70 leading-relaxed">
                By accessing or using the Multimedium website and services, you agree to be bound by these 
                Terms of Service. If you do not agree to these terms, please do not use our website or services.
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-xl text-cream uppercase mb-4">
                Services
              </h2>
              <p className="text-cream/70 leading-relaxed">
                Multimedium provides web design, brand strategy, and digital design services. All services 
                are subject to a separate agreement or statement of work that outlines the specific scope, 
                timeline, and pricing for each project.
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-xl text-cream uppercase mb-4">
                Intellectual Property
              </h2>
              <div className="space-y-4 text-cream/70 leading-relaxed">
                <p>
                  <strong className="text-cream">Our Content:</strong> All content on this website, including 
                  text, images, graphics, logos, and code, is the property of Multimedium and is protected by 
                  copyright and other intellectual property laws. You may not reproduce, distribute, or create 
                  derivative works without our express written permission.
                </p>
                <p>
                  <strong className="text-cream">Client Work:</strong> Upon full payment, clients receive 
                  ownership rights to the final deliverables as specified in their project agreement. We retain 
                  the right to display completed work in our portfolio and for promotional purposes unless 
                  otherwise agreed in writing.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-display font-bold text-xl text-cream uppercase mb-4">
                Payment Terms
              </h2>
              <ul className="space-y-2 text-cream/70">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-gold rounded-full mt-2 flex-shrink-0" />
                  <span>A deposit is required before work begins on any project.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-gold rounded-full mt-2 flex-shrink-0" />
                  <span>Payment schedules are outlined in each project agreement.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-gold rounded-full mt-2 flex-shrink-0" />
                  <span>Final payment is due upon project completion before final files are delivered.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-gold rounded-full mt-2 flex-shrink-0" />
                  <span>Late payments may incur additional fees and project delays.</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-display font-bold text-xl text-cream uppercase mb-4">
                Project Timeline
              </h2>
              <p className="text-cream/70 leading-relaxed">
                Project timelines are estimates based on the scope of work defined in the agreement. Delays 
                caused by client feedback, content delays, or scope changes may extend the timeline. We are 
                not responsible for delays caused by circumstances beyond our control.
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-xl text-cream uppercase mb-4">
                Revisions and Changes
              </h2>
              <p className="text-cream/70 leading-relaxed">
                Each project includes a specified number of revision rounds as outlined in the agreement. 
                Additional revisions beyond this scope may incur extra charges. Significant changes to the 
                project scope after work has begun may require a revised quote and timeline.
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-xl text-cream uppercase mb-4">
                Cancellation Policy
              </h2>
              <p className="text-cream/70 leading-relaxed">
                Either party may terminate a project with written notice. In the event of cancellation by 
                the client, work completed up to that point will be billed, and the deposit may be forfeited 
                depending on the stage of the project. Upon cancellation, all rights to unfinished work revert 
                to Multimedium.
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-xl text-cream uppercase mb-4">
                Limitation of Liability
              </h2>
              <p className="text-cream/70 leading-relaxed">
                Multimedium shall not be liable for any indirect, incidental, special, consequential, or 
                punitive damages arising from your use of our services or website. Our total liability shall 
                not exceed the amount paid for the specific project giving rise to the claim.
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-xl text-cream uppercase mb-4">
                Warranty Disclaimer
              </h2>
              <p className="text-cream/70 leading-relaxed">
                Our services are provided &ldquo;as is&rdquo; without warranties of any kind, either express or implied. 
                We do not guarantee that our services will be error-free or uninterrupted, or that any defects 
                will be corrected.
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-xl text-cream uppercase mb-4">
                Governing Law
              </h2>
              <p className="text-cream/70 leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of the State of 
                Pennsylvania, without regard to its conflict of law provisions. Any disputes arising under 
                these Terms shall be subject to the exclusive jurisdiction of the courts located in Pennsylvania.
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-xl text-cream uppercase mb-4">
                Changes to Terms
              </h2>
              <p className="text-cream/70 leading-relaxed">
                We reserve the right to modify these Terms at any time. Changes will be effective immediately 
                upon posting to this page. Your continued use of our website or services after any changes 
                constitutes acceptance of the updated Terms.
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-xl text-cream uppercase mb-4">
                Contact Us
              </h2>
              <p className="text-cream/70 leading-relaxed">
                If you have any questions about these Terms of Service, please contact us at{' '}
                <a href="mailto:haydn@multimedium.dev" className="text-gold hover:text-cream transition-colors">
                  haydn@multimedium.dev
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsPage;