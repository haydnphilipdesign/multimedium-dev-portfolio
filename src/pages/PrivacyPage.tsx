import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navigation from '../sections/Navigation';
import Footer from '../sections/Footer';

const PrivacyPage = () => {
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
            Privacy Policy
          </h1>
          <p className="text-cream/50 mt-4">Last updated: February 2026</p>
        </div>

        {/* Content */}
        <div className="w-full px-[5vw] max-w-4xl">
          <div className="space-y-12">
            <section>
              <h2 className="font-display font-bold text-xl text-cream uppercase mb-4">
                Introduction
              </h2>
              <p className="text-cream/70 leading-relaxed">
                Multimedium (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) respects your privacy and is committed to protecting your personal data. 
                This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website 
                or use our services.
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-xl text-cream uppercase mb-4">
                Information We Collect
              </h2>
              <p className="text-cream/70 leading-relaxed mb-4">
                We may collect the following types of information:
              </p>
              <ul className="space-y-2 text-cream/70">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-gold rounded-full mt-2 flex-shrink-0" />
                  <span><strong className="text-cream">Contact Information:</strong> Name, email address, and any information you provide through our contact form.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-gold rounded-full mt-2 flex-shrink-0" />
                  <span><strong className="text-cream">Usage Data:</strong> Information about how you interact with our website, including pages visited and time spent.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-gold rounded-full mt-2 flex-shrink-0" />
                  <span><strong className="text-cream">Technical Data:</strong> IP address, browser type, device information, and operating system.</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-display font-bold text-xl text-cream uppercase mb-4">
                How We Use Your Information
              </h2>
              <p className="text-cream/70 leading-relaxed mb-4">
                We use your information for the following purposes:
              </p>
              <ul className="space-y-2 text-cream/70">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-gold rounded-full mt-2 flex-shrink-0" />
                  <span>To respond to your inquiries and provide our services</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-gold rounded-full mt-2 flex-shrink-0" />
                  <span>To improve our website and user experience</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-gold rounded-full mt-2 flex-shrink-0" />
                  <span>To send you relevant updates about our services (with your consent)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-gold rounded-full mt-2 flex-shrink-0" />
                  <span>To comply with legal obligations</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-display font-bold text-xl text-cream uppercase mb-4">
                Cookies and Tracking
              </h2>
              <p className="text-cream/70 leading-relaxed">
                Our website uses cookies and similar tracking technologies to enhance your browsing experience. 
                You can control cookies through your browser settings. We use essential cookies for website 
                functionality and analytics cookies to understand how visitors interact with our site.
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-xl text-cream uppercase mb-4">
                Data Security
              </h2>
              <p className="text-cream/70 leading-relaxed">
                We implement appropriate technical and organizational measures to protect your personal data 
                against unauthorized access, alteration, disclosure, or destruction. However, no method of 
                transmission over the internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-xl text-cream uppercase mb-4">
                Third-Party Services
              </h2>
              <p className="text-cream/70 leading-relaxed">
                We may use third-party services (such as analytics providers) that collect, monitor, and 
                analyze data to help us improve our website. These third parties have their own privacy 
                policies governing how they use such information.
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-xl text-cream uppercase mb-4">
                Your Rights
              </h2>
              <p className="text-cream/70 leading-relaxed mb-4">
                Depending on your location, you may have the following rights regarding your personal data:
              </p>
              <ul className="space-y-2 text-cream/70">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-gold rounded-full mt-2 flex-shrink-0" />
                  <span>Right to access your personal data</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-gold rounded-full mt-2 flex-shrink-0" />
                  <span>Right to correct inaccurate data</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-gold rounded-full mt-2 flex-shrink-0" />
                  <span>Right to request deletion of your data</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-gold rounded-full mt-2 flex-shrink-0" />
                  <span>Right to object to data processing</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-display font-bold text-xl text-cream uppercase mb-4">
                Contact Us
              </h2>
              <p className="text-cream/70 leading-relaxed">
                If you have any questions about this Privacy Policy or our data practices, please contact us at{' '}
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

export default PrivacyPage;