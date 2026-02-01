import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navigation from '../sections/Navigation';
import Footer from '../sections/Footer';

const NotFoundPage = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Page Not Found — Multimedium';
  }, []);

  return (
    <div className="relative bg-charcoal min-h-screen">
      <div className="grain-overlay" aria-hidden="true" />
      <Navigation />

      <main className="pt-32 pb-20">
        <div className="w-full px-[5vw] max-w-4xl">
          <h1 className="font-display font-bold text-section text-cream tracking-[-0.02em] uppercase">
            Page not found
          </h1>
          <p className="mt-4 text-cream/60 max-w-2xl leading-relaxed">
            This URL doesn’t exist anymore (or never did). If you came from an older link, the page may have moved in the rebuild.
          </p>

          <div className="mt-6 rounded-xl bg-charcoal-light card-border p-5">
            <p className="font-mono text-xs tracking-[0.12em] text-cream/50 uppercase">
              Requested URL
            </p>
            <p className="mt-2 font-mono text-sm text-cream/70 break-all">
              {location.pathname}
              {location.search}
              {location.hash}
            </p>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <Link
              to="/"
              className="px-8 py-4 bg-gold hover:bg-gold-dark rounded-lg font-mono text-sm tracking-[0.12em] text-charcoal uppercase transition-colors text-center"
            >
              Go Home
            </Link>
            <Link
              to="/#contact"
              className="px-8 py-4 bg-gold/10 hover:bg-gold/20 rounded-lg font-mono text-sm tracking-[0.12em] text-gold uppercase transition-colors text-center"
            >
              Contact
            </Link>
          </div>

          <div className="mt-12 grid gap-3">
            <p className="font-mono text-xs tracking-[0.12em] text-cream/50 uppercase">
              Common destinations
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/#work" className="text-gold hover:text-cream transition-colors font-mono text-sm">
                Work
              </Link>
              <Link to="/#services" className="text-gold hover:text-cream transition-colors font-mono text-sm">
                Services
              </Link>
              <Link to="/industries/transaction-coordinators" className="text-gold hover:text-cream transition-colors font-mono text-sm">
                Transaction Coordinators
              </Link>
              <Link to="/industries/trades" className="text-gold hover:text-cream transition-colors font-mono text-sm">
                Trades
              </Link>
              <Link to="/industries/home-services" className="text-gold hover:text-cream transition-colors font-mono text-sm">
                Home Services
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFoundPage;
