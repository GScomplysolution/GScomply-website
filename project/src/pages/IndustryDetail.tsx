import { useParams, Link, Navigate } from 'react-router-dom';
import { CheckCircle, ArrowRight, ChevronRight, Car, Factory, Wind, Cpu, ShoppingBag, Plane, Building2, Box } from 'lucide-react';
import CTABanner from '../components/CTABanner';
import industries from '../data/industries';
import services from '../data/services';

const iconMap: Record<string, React.ReactNode> = {
  Car: <Car size={32} />,
  Factory: <Factory size={32} />,
  Wind: <Wind size={32} />,
  Cpu: <Cpu size={32} />,
  ShoppingBag: <ShoppingBag size={32} />,
  Plane: <Plane size={32} />,
  Building2: <Building2 size={32} />,
  Box: <Box size={32} />,
};

export default function IndustryDetail() {
  const { slug } = useParams<{ slug: string }>();
  const industry = industries.find((i) => i.slug === slug);

  if (!industry) return <Navigate to="/industries" replace />;

  const relatedServices = services.filter((s) => industry.keyRegulationSlugs.includes(s.slug));

  return (
    <>
      {/* Hero */}
      <section className="py-20 md:py-28 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1A6B3C 0%, #0F4A2A 100%)' }}>
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%"><defs><pattern id="indDots" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.5" fill="white" /></pattern></defs><rect width="100%" height="100%" fill="url(#indDots)" /></svg>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Breadcrumb */}
          <nav className="flex items-center justify-center gap-1.5 text-xs text-white/60 mb-6" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link to="/industries" className="hover:text-white transition-colors">Industries</Link>
            <ChevronRight size={12} />
            <span className="text-white">{industry.name}</span>
          </nav>

          <div className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center text-white bg-white/15">
            {iconMap[industry.icon]}
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 leading-tight">
            {industry.name} Compliance Services
          </h1>
          <p className="text-lg text-white/85 leading-relaxed max-w-3xl mx-auto">
            {industry.fullDescription}
          </p>

          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {industry.keyRegulations.map((reg) => {
              const isMandatory = reg.includes('Mandatory');
              const displayReg = reg.replace(' (Mandatory)', '');
              return (
                <span
                  key={reg}
                  className={`text-sm px-3 py-1.5 rounded-full border font-medium flex items-center gap-1.5 ${
                    isMandatory
                      ? 'bg-gs-mint/20 text-white border-gs-mint'
                      : 'bg-white/10 text-white/85 border-white/25'
                  }`}
                >
                  {isMandatory && <span className="w-1.5 h-1.5 rounded-full bg-gs-mint flex-shrink-0" />}
                  {displayReg}
                  {isMandatory && <span className="text-gs-mint text-xs font-bold">●</span>}
                </span>
              );
            })}
          </div>
          <p className="text-white/60 text-xs mt-3">● Mandatory for all products in this industry</p>
        </div>
      </section>

      {/* Specific Services */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold tracking-widest text-gs-green uppercase mb-3 block">Our Services</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gs-charcoal mb-4">
              {industry.name}-Specific Compliance Services
            </h2>
            <p className="text-gs-slate max-w-2xl mx-auto">
              Tailored compliance solutions designed specifically for the regulatory challenges your industry faces.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industry.specificServices.map((svc) => (
              <div key={svc.title} className="bg-white rounded-xl p-6 border-t-4 border-gs-green shadow-gs-card hover:shadow-gs-hover transition-shadow">
                <div className="w-10 h-10 bg-gs-light rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle size={20} className="text-gs-green" />
                </div>
                <h3 className="text-base font-bold text-gs-charcoal mb-3">{svc.title}</h3>
                <p className="text-sm text-gs-slate leading-relaxed">{svc.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platforms */}
      {industry.platforms.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-gs-charcoal mb-3">
                Compliance Platforms for {industry.name}
              </h2>
              <p className="text-gs-slate max-w-xl mx-auto text-sm">
                We manage your data submissions on the platforms most relevant to your industry.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {industry.platforms.map((platform) => (
                <Link
                  key={platform}
                  to="/services#platforms"
                  className="flex items-center gap-3 px-6 py-4 bg-gs-light rounded-xl border border-gs-border hover:border-gs-green hover:shadow-gs-card transition-all"
                >
                  <div className="w-8 h-8 bg-gs-green rounded-lg flex items-center justify-center text-white font-bold text-sm">
                    {platform.charAt(0)}
                  </div>
                  <span className="text-sm font-semibold text-gs-charcoal">{platform}</span>
                  <ArrowRight size={14} className="text-gs-green" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Challenges */}
      <section className="py-16 bg-gs-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl font-bold text-gs-charcoal mb-6">
                Key Compliance Challenges in {industry.name}
              </h2>
              <div className="space-y-3">
                {industry.challenges.map((challenge) => (
                  <div key={challenge} className="flex items-start gap-3 p-4 bg-white rounded-xl border-l-4 border-gs-green shadow-sm">
                    <ArrowRight size={16} className="text-gs-green flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gs-charcoal">{challenge}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gs-green rounded-2xl p-8 text-white">
              <h3 className="text-xl font-bold mb-4">How We Solve These Challenges</h3>
              <p className="text-white/85 text-sm leading-relaxed mb-5">
                GS Comply Solutions brings proven methodologies, platform expertise, and deep regulatory knowledge to address the specific challenges faced by {industry.name.toLowerCase()} companies. Our team has worked with businesses at every level of the {industry.name.toLowerCase()} supply chain.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-gs-green text-sm font-semibold rounded-lg hover:bg-gs-light transition-colors"
              >
                Talk to Our {industry.name} Expert
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related regulations */}
      {relatedServices.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gs-charcoal mb-8">Key Regulations for {industry.name}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {relatedServices.map((s) => (
                <div key={s.slug} className="bg-gs-gray rounded-xl p-5 border border-gs-border hover:border-gs-green hover:bg-gs-light transition-colors group">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-2xl font-extrabold text-gs-green">{s.acronym}</span>
                    <span className="text-xs text-gs-slate bg-white px-2.5 py-1 rounded-full border border-gs-border">{s.region.split(' ')[0]}</span>
                  </div>
                  <p className="text-xs font-semibold text-gs-charcoal mb-2 leading-snug">{s.name}</p>
                  <p className="text-xs text-gs-slate leading-relaxed mb-4">{s.description}</p>
                  <Link
                    to={`/services/${s.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-gs-green group-hover:text-gs-emerald transition-colors"
                  >
                    View Compliance Services
                    <ArrowRight size={12} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABanner
        headline={`Ready to Strengthen Your ${industry.name} Compliance Program?`}
        subtext="Our industry specialists are ready to assess your specific compliance obligations and build a program that works for your business."
        buttonText={`Get a ${industry.name} Compliance Assessment`}
        buttonLink="/contact"
      />
    </>
  );
}
