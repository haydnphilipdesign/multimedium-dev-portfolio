import { useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowUpRight, Check, Clock, ShieldCheck, Target } from 'lucide-react';
import Navigation from '../sections/Navigation';
import Footer from '../sections/Footer';
import { caseStudies } from '../data/caseStudies';

type IndustryKey = 'transaction-coordinators' | 'trades' | 'home-services';

const INDUSTRY_CONTENT: Record<
  IndustryKey,
  {
    title: string;
    eyebrow: string;
    headline: string;
    subheadline: string;
    image: string;
    outcomes: { title: string; description: string }[];
    fit: string[];
    faq: { q: string; a: string }[];
    featuredCaseStudyIds: string[];
  }
> = {
  'transaction-coordinators': {
    title: 'Transaction Coordinator Website Design',
    eyebrow: 'Real estate ops, streamlined',
    headline: 'A premium TC site that wins trust fast—and books qualified calls.',
    subheadline:
      'Authority-first messaging, crisp structure, and a conversion path designed to reduce low-fit inquiries while making your value obvious.',
    image: '/images/process_scene.jpg',
    outcomes: [
      {
        title: 'Book better-fit calls',
        description:
          'Clear “for / not for” framing, proof, and a frictionless inquiry flow—so you spend less time on tire-kickers.',
      },
      {
        title: 'Look premium on mobile',
        description:
          'Most clients click from their phone. Your site should feel sharp, fast, and confident everywhere.',
      },
      {
        title: 'Communicate your process',
        description:
          'A TC business sells clarity. We translate your workflow into a page structure that reads clean and converts.',
      },
    ],
    fit: [
      'You want to attract established agents/teams—not low-budget one-offs.',
      'Your current site exists, but doesn’t convert into consistent inquiries.',
      'You need a simple, confident service path (pricing, packages, next steps).',
      'You want one partner to handle strategy, design, and build.',
    ],
    faq: [
      {
        q: 'Do you help with copy and positioning?',
        a: 'Yes. Premium work starts with messaging. We refine the offer, the proof, and the page structure so the site sells without sounding salesy.',
      },
      {
        q: 'Can you integrate scheduling and lead capture?',
        a: 'Yes. We can add calendar booking, intake forms, and basic tracking so you know what’s producing qualified leads.',
      },
      {
        q: 'What’s a typical timeline?',
        a: 'Most builds ship in 4–6 weeks depending on scope, assets, and review cadence.',
      },
    ],
    featuredCaseStudyIds: ['tag', 'utilitysheet'],
  },
  trades: {
    title: 'Trades Website Design',
    eyebrow: 'Built for local demand',
    headline: 'A trades website built to turn urgency into booked jobs.',
    subheadline:
      'Clear services, clear service areas, and a call-to-action path that works on mobile—so you get more calls and fewer “just curious” messages.',
    image: '/images/services_scene.jpg',
    outcomes: [
      {
        title: 'Capture urgent intent',
        description:
          'Fast clarity, fast contact—because most trades leads are time-sensitive and mobile.',
      },
      {
        title: 'Earn trust instantly',
        description:
          'Real photos, proof, and a professional layout that reads like a premium local operator.',
      },
      {
        title: 'Reduce admin overhead',
        description:
          'Simple intake, clear expectations, and fewer back-and-forth emails before the first call.',
      },
    ],
    fit: [
      'You want more booked work—not more traffic vanity.',
      'You need a site that looks premium without feeling corporate.',
      'You want a simple funnel (call / form / booking) that works on mobile.',
      'You’re ready to invest in a site that supports growth.',
    ],
    faq: [
      {
        q: 'Do you help pick what goes on the page?',
        a: 'Yes. We’ll structure the site around the jobs you want, the objections you hear, and the actions you want people to take.',
      },
      {
        q: 'Can you add service area pages?',
        a: 'Yes. We can add location/service pages and keep it consistent with a reusable system.',
      },
      {
        q: 'Do you optimize for speed?',
        a: 'Yes. Performance is part of the build—especially on mobile.',
      },
    ],
    featuredCaseStudyIds: ['gentlemans-blade', 'nomad-gear'],
  },
  'home-services': {
    title: 'Home Services Website Design',
    eyebrow: 'Premium local service brands',
    headline: 'A home services site that feels premium—and makes calling easy.',
    subheadline:
      'A clean hierarchy, real proof, and a conversion path that works for busy homeowners who decide quickly.',
    image: '/images/about_scene.jpg',
    outcomes: [
      {
        title: 'Make the offer obvious',
        description:
          'Homeowners scan fast. We design for clarity: what you do, where you do it, and what happens next.',
      },
      {
        title: 'Show proof without clutter',
        description:
          'Before/after, reviews, and credibility signals—placed with intention, not noise.',
      },
      {
        title: 'Turn visits into calls',
        description:
          'CTA placement, copy structure, and friction reduction so it’s easy to reach you.',
      },
    ],
    fit: [
      'You want to charge premium rates—and your site should match.',
      'You’re competing against low-trust marketplace listings and templates.',
      'You need a mobile-first site built for calls and form submissions.',
      'You want a system that can expand (new services, locations, pages).',
    ],
    faq: [
      {
        q: 'Can you integrate reviews or a booking tool?',
        a: 'Yes. We can integrate reviews, scheduling, and lead capture depending on your workflow.',
      },
      {
        q: 'What investment range should I expect?',
        a: 'Most serious home services sites start at $10k+ depending on pages, copy, and integrations.',
      },
      {
        q: 'Do you handle hosting and launch?',
        a: 'Yes. I can help with deployment, DNS, and a clean handoff so you can run the business without tech stress.',
      },
    ],
    featuredCaseStudyIds: ['velvet-rose', 'pop-playground'],
  },
};

const IndustryLandingPage = ({ industry }: { industry: IndustryKey }) => {
  const navigate = useNavigate();

  const content = INDUSTRY_CONTENT[industry];
  const featuredCaseStudies = useMemo(() => {
    const byId = new Map(caseStudies.map((c) => [c.id, c]));
    return content.featuredCaseStudyIds
      .map((id) => byId.get(id))
      .filter((study): study is NonNullable<typeof study> => Boolean(study));
  }, [content.featuredCaseStudyIds]);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${content.title} — Multimedium`;
  }, [content.title]);

  return (
    <div className="relative bg-charcoal min-h-screen">
      <div className="grain-overlay" aria-hidden="true" />
      <Navigation />

      <main className="pt-28 md:pt-32 pb-20">
        <section className="w-full px-[5vw]">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div>
              <p className="font-mono text-xs tracking-[0.12em] text-gold uppercase">{content.eyebrow}</p>
              <h1 className="mt-4 font-display font-bold text-section md:text-hero text-cream tracking-[-0.02em] uppercase leading-[1.05]">
                {content.headline}
              </h1>
              <p className="mt-6 text-base md:text-lg text-cream/70 max-w-xl leading-relaxed">
                {content.subheadline}
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => navigate('/#contact')}
                  className="px-8 py-4 bg-gold hover:bg-gold-dark rounded-lg font-mono text-sm tracking-[0.12em] text-charcoal uppercase transition-colors"
                >
                  Start a project
                </button>
                <Link
                  to="/#work"
                  className="px-8 py-4 bg-gold/10 hover:bg-gold/20 rounded-lg font-mono text-sm tracking-[0.12em] text-gold uppercase transition-colors text-center"
                >
                  See work
                </Link>
              </div>

              <div className="mt-10 grid gap-3">
                <div className="flex items-start gap-3 rounded-xl bg-charcoal-light card-border p-5">
                  <Target size={18} className="text-gold mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-mono text-xs tracking-[0.12em] text-cream/50 uppercase">Outcome-first</p>
                    <p className="mt-2 text-sm text-cream/70 leading-relaxed">
                      Designed to turn visits into inquiries—without sounding like a sales funnel.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-xl bg-charcoal-light card-border p-5">
                  <Clock size={18} className="text-gold mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-mono text-xs tracking-[0.12em] text-cream/50 uppercase">Fast, predictable</p>
                    <p className="mt-2 text-sm text-cream/70 leading-relaxed">
                      A clear process and clear timelines—so the project doesn’t drag.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-xl bg-charcoal-light card-border p-5">
                  <ShieldCheck size={18} className="text-gold mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-mono text-xs tracking-[0.12em] text-cream/50 uppercase">Performance + accessibility</p>
                    <p className="mt-2 text-sm text-cream/70 leading-relaxed">
                      Premium sites should feel fast and clean—especially on mobile.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-card overflow-hidden card-shadow card-border h-[44vh] sm:h-[52vh] lg:h-[72vh]">
              <img src={content.image} alt="" className="w-full h-full object-cover" />
            </div>
          </div>
        </section>

        <section className="w-full px-[5vw] mt-16">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-cream uppercase tracking-[-0.02em]">
            Outcomes
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {content.outcomes.map((item) => (
              <div key={item.title} className="bg-charcoal-light rounded-xl card-border p-6">
                <h3 className="font-mono text-sm tracking-[0.12em] text-gold uppercase">{item.title}</h3>
                <p className="mt-3 text-sm text-cream/70 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="w-full px-[5vw] mt-16">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-cream uppercase tracking-[-0.02em]">
            Fit
          </h2>
          <div className="mt-8 bg-charcoal-light rounded-xl card-border p-6">
            <ul className="grid gap-3 md:grid-cols-2">
              {content.fit.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-cream/70">
                  <Check size={16} className="text-gold mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {featuredCaseStudies.length > 0 && (
          <section className="w-full px-[5vw] mt-16">
            <div className="flex items-end justify-between gap-6 flex-wrap">
              <div>
                <h2 className="font-display font-bold text-3xl md:text-4xl text-cream uppercase tracking-[-0.02em]">
                  Related work
                </h2>
                <p className="mt-3 text-cream/60 max-w-2xl">
                  A few recent builds that show the level of craft and clarity you can expect.
                </p>
              </div>
              <Link
                to="/#work"
                className="font-mono text-sm tracking-[0.12em] text-gold hover:text-cream transition-colors uppercase inline-flex items-center gap-2"
              >
                Browse work
                <ArrowUpRight size={16} />
              </Link>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {featuredCaseStudies.map((study) => (
                <Link
                  key={study.id}
                  to={`/case-study/${study.id}`}
                  className="group bg-charcoal-light rounded-xl card-border overflow-hidden hover:border-gold/30 transition-colors"
                >
                  <div className="aspect-[16/9] overflow-hidden">
                    <img src={study.image} alt={study.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="p-6">
                    <p className="font-mono text-xs tracking-[0.12em] text-gold uppercase">{study.category}</p>
                    <h3 className="mt-3 font-display font-bold text-xl text-cream uppercase">{study.title}</h3>
                    <p className="mt-2 text-sm text-cream/60">{study.subtitle}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="w-full px-[5vw] mt-16">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-cream uppercase tracking-[-0.02em]">
            FAQ
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {content.faq.map((item) => (
              <div key={item.q} className="bg-charcoal-light rounded-xl card-border p-6">
                <p className="font-mono text-sm tracking-[0.12em] text-cream uppercase">{item.q}</p>
                <p className="mt-3 text-sm text-cream/60 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="w-full px-[5vw] mt-16">
          <div className="bg-charcoal-light rounded-xl card-border p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="font-mono text-xs tracking-[0.12em] text-cream/50 uppercase">
                Ready to move?
              </p>
              <h2 className="mt-2 font-display font-bold text-3xl text-cream">
                Get a clear plan + next steps in one reply.
              </h2>
              <p className="mt-3 text-cream/60 max-w-2xl">
                Tell us what you do, who you want to attract, and what’s not working today. We’ll respond within two business days.
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate('/#contact')}
              className="px-8 py-4 bg-gold hover:bg-gold-dark rounded-lg font-mono text-sm tracking-[0.12em] text-charcoal uppercase transition-colors"
            >
              Start a project
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default IndustryLandingPage;
