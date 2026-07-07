import { useParams, Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, ChevronRight, AlertTriangle } from 'lucide-react';
import SEO, { generateServiceStructuredData, generateBreadcrumbStructuredData } from '../components/SEO';
import CTABanner from '../components/CTABanner';
import RegulationCard from '../components/RegulationCard';
import NotFound from './NotFound';
import services from '../data/services';


export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const service = services.find((s) => s.slug === slug);

  if (!service) return <NotFound />;

  const related = services.filter((s) => service.relatedSlugs.includes(s.slug)).slice(0, 3);
  const serviceSchema = generateServiceStructuredData(service);
  const breadcrumbSchema = generateBreadcrumbStructuredData([
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: service.acronym, path: `/services/${service.slug}` },
  ]);

  return (
    <>
      <SEO
        title={`${service.acronym} - ${service.name}`}
        description={service.description}
        keywords={`${service.acronym}, ${service.name}, compliance, ${service.region}, regulations`}
        canonicalPath={`/services/${service.slug}`}
        type="service"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {/* Hero */}
      <section className="py-20 md:py-28 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1A6B3C 0%, #0F4A2A 100%)' }}>
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%"><defs><pattern id="svcDots" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.5" fill="white" /></pattern></defs><rect width="100%" height="100%" fill="url(#svcDots)" /></svg>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Breadcrumb */}
          <nav className="flex items-center justify-center gap-1.5 text-xs text-white/60 mb-6" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link to="/services" className="hover:text-white transition-colors">Services</Link>
            <ChevronRight size={12} />
            <span className="text-white">{service.acronym}</span>
          </nav>
          <span className="inline-block text-2xl font-extrabold text-gs-mint bg-white/10 px-5 py-2 rounded-xl mb-5">
            {service.acronym}
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-6 leading-tight">
            {service.name} Compliance Services
          </h1>
          <p className="text-lg text-white/85 leading-relaxed max-w-3xl mx-auto">{service.heroSubtext}</p>

          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <span className="bg-white/15 text-white text-sm px-4 py-1.5 rounded-full border border-white/30">
              {service.region}
            </span>
            <span className="bg-white/15 text-white text-sm px-4 py-1.5 rounded-full border border-white/30">
              {service.governingBody}
            </span>
          </div>
        </div>
      </section>

      {/* What is it? */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-gs-charcoal mb-5">
                What is {service.acronym}?
              </h2>
              <p className="text-gs-slate leading-relaxed mb-5">
                {service.description}
              </p>
              <p className="text-gs-slate leading-relaxed">
                {service.heroSubtext}
              </p>
            </div>
            {/* Key facts */}
            <div className="bg-gs-light rounded-2xl p-6 border-l-4 border-gs-green">
              <h3 className="text-base font-bold text-gs-charcoal mb-4">Key Facts</h3>
              <ul className="space-y-3">
                {[
                  `Region: ${service.region}`,
                  `Governing Body: ${service.governingBody}`,
                  `Key Focus: ${service.keySubstances[0]}`,
                  `Also covers: ${service.keySubstances[1] || '—'}`,
                ].map((fact) => (
                  <li key={fact} className="flex items-start gap-2 text-sm text-gs-charcoal">
                    <div className="w-1.5 h-1.5 rounded-full bg-gs-green mt-1.5 flex-shrink-0" />
                    {fact}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Key Requirements */}
      <section className="py-16 bg-gs-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gs-charcoal mb-8">Key {service.acronym} Requirements</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {service.keyRequirements.map((req) => (
              <div key={req} className="flex items-start gap-3 p-4 bg-white rounded-xl border-l-4 border-gs-green shadow-sm">
                <CheckCircle size={18} className="text-gs-green flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gs-charcoal leading-relaxed">{req}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Help */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gs-charcoal mb-3">
                How GS Comply Solutions Helps
              </h2>
              <p className="text-gs-slate mb-8">
                Our {service.acronym} compliance services are designed to reduce your regulatory burden and keep your business market-ready.
              </p>
              <ul className="space-y-4">
                {service.howWeHelp.map((card) => (
                  <li key={card.title} className="flex items-start gap-4 p-4 rounded-xl bg-gs-light border border-gs-border hover:border-gs-mint transition-colors">
                    <div className="w-8 h-8 bg-gs-green rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle size={16} className="text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gs-charcoal">{card.title}</p>
                      <p className="text-sm text-gs-slate mt-0.5">{card.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gs-light rounded-2xl p-8 border border-gs-border">
              <h3 className="text-base font-bold text-gs-charcoal mb-5 uppercase tracking-wider text-xs text-gs-slate">Why Choose GS Comply</h3>
              <ul className="space-y-3">
                {[
                  'Deep regulatory expertise across all major global regulations',
                  'Hands-on platform proficiency (IMDS, CDX, CAMDS, SCIP)',
                  'Dedicated compliance specialists for each regulation',
                  'Fast turnaround — from gap analysis to full documentation',
                  'Scalable programs for SMEs to global enterprises',
                  'Proactive monitoring — we flag changes before they affect you',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <ArrowRight size={14} className="text-gs-green mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gs-charcoal">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why it matters */}
      <section className="py-16" style={{ background: 'linear-gradient(135deg, #EAF7EF 0%, #D1EFE0 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle size={20} className="text-gs-green" />
                <span className="text-xs font-semibold tracking-widest text-gs-green uppercase">Why It Matters</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gs-charcoal mb-5">
                The Business Case for {service.acronym} Compliance
              </h2>
              <p className="text-gs-slate leading-relaxed">{service.whyItMatters}</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { label: 'Market Access Risk', value: 'EU/US/Global', desc: 'Non-compliance can trigger market bans' },
                { label: 'Financial Exposure', value: 'High', desc: 'Penalties, recalls, and remediation costs' },
                { label: 'Supply Chain Impact', value: 'Significant', desc: 'Customer contract requirements' },
                { label: 'Regulatory Trend', value: 'Tightening', desc: 'New restrictions added regularly' },
              ].map(({ label, value, desc }) => (
                <div key={label} className="bg-white rounded-xl p-5 shadow-sm border border-gs-border text-center">
                  <p className="text-xs font-semibold text-gs-slate uppercase tracking-wider mb-1">{label}</p>
                  <p className="text-xl font-extrabold text-gs-green mb-1">{value}</p>
                  <p className="text-xs text-gs-slate">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related services */}
      {related.length > 0 && (
        <section className="py-16 bg-gs-gray">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gs-charcoal mb-8">You May Also Need</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {related.map((s) => (
                <RegulationCard
                  key={s.slug}
                  acronym={s.acronym}
                  name={s.name}
                  description={s.description}
                  slug={s.slug}
                  region={s.region}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <CTABanner
        headline={`Get ${service.acronym} Compliance Support Today`}
        subtext="Our experts are ready to help you achieve and maintain compliance. Schedule a free consultation and get a clear roadmap."
        buttonText={`Start Your ${service.acronym} Compliance Journey`}
        buttonLink="/contact"
      />
    </>
  );
}
