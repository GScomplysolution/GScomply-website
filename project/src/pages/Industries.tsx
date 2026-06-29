import { Link } from 'react-router-dom';
import { ArrowRight, Car, Factory, Wind, Cpu, ShoppingBag, Plane, Building2, Box, CheckCircle } from 'lucide-react';
import CTABanner from '../components/CTABanner';
import industries from '../data/industries';

const iconMap: Record<string, React.ReactNode> = {
  Car: <Car size={28} />,
  Factory: <Factory size={28} />,
  Wind: <Wind size={28} />,
  Cpu: <Cpu size={28} />,
  ShoppingBag: <ShoppingBag size={28} />,
  Plane: <Plane size={28} />,
  Building2: <Building2 size={28} />,
  Box: <Box size={28} />,
};

export default function Industries() {
  const primary = industries.slice(0, 5);
  const additional = industries.slice(5);

  return (
    <>
      {/* Hero */}
      <section className="py-20 md:py-28" style={{ background: 'linear-gradient(135deg, #1A6B3C 0%, #0F4A2A 100%)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-xs font-semibold tracking-widest text-gs-mint uppercase mb-4 bg-white/10 px-4 py-2 rounded-full">
            Industries We Serve
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 leading-tight">
            Compliance Expertise Across Every Industry
          </h1>
          <p className="text-lg text-white/85 max-w-3xl mx-auto leading-relaxed">
            Product compliance requirements vary significantly by industry. GS Comply Solutions brings sector-specific regulatory knowledge and proven methodologies to help businesses in every industry meet their compliance obligations.
          </p>
        </div>
      </section>

      {/* Primary Industries */}
      <section className="py-16 md:py-24 bg-gs-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gs-charcoal mb-4">Core Industry Sectors</h2>
            <p className="text-gs-slate max-w-2xl mx-auto">
              Deeply specialized compliance programs for the industries we know best.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {primary.map((industry) => (
              <div key={industry.slug} className="group bg-white rounded-2xl overflow-hidden shadow-gs-card hover:shadow-gs-hover hover:-translate-y-1 transition-all duration-200 flex flex-col">
                {/* Card header */}
                <div className="p-6 border-b border-gs-border">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center text-white flex-shrink-0" style={{ background: 'linear-gradient(135deg, #1A6B3C 0%, #2E9E5B 100%)' }}>
                      {iconMap[industry.icon]}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gs-charcoal leading-tight">{industry.name}</h3>
                    </div>
                  </div>
                  <p className="text-sm text-gs-slate leading-relaxed">{industry.shortDescription}</p>
                </div>

                {/* Key regulations */}
                <div className="p-5 flex-1">
                  <p className="text-xs font-semibold text-gs-charcoal uppercase tracking-wider mb-3">Key Regulations</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {industry.keyRegulations.slice(0, 4).map((reg) => (
                      <span key={reg} className="text-xs bg-gs-light text-gs-green px-2.5 py-1 rounded-full border border-gs-border font-medium">
                        {reg.split(' ')[0]}
                      </span>
                    ))}
                    {industry.keyRegulations.length > 4 && (
                      <span className="text-xs bg-gs-gray text-gs-slate px-2.5 py-1 rounded-full border border-gs-border">
                        +{industry.keyRegulations.length - 4} more
                      </span>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    {industry.specificServices.slice(0, 2).map((svc) => (
                      <div key={svc.title} className="flex items-start gap-2">
                        <CheckCircle size={13} className="text-gs-green flex-shrink-0 mt-0.5" />
                        <span className="text-xs text-gs-charcoal">{svc.title}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="px-5 pb-5">
                  <Link
                    to={`/industries/${industry.slug}`}
                    className="inline-flex items-center gap-2 w-full justify-center px-4 py-2.5 bg-gs-green text-white text-sm font-medium rounded-lg hover:bg-gs-emerald transition-colors"
                  >
                    Explore {industry.name} Compliance
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Industries */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gs-charcoal mb-4">Additional Industries</h2>
            <p className="text-gs-slate max-w-2xl mx-auto">
              Our compliance expertise extends across these additional sectors, with specialized knowledge of sector-specific regulations and requirements.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {additional.map((industry) => (
              <Link
                key={industry.slug}
                to={`/industries/${industry.slug}`}
                className="group bg-gs-gray rounded-xl p-5 border border-gs-border hover:border-gs-green hover:bg-gs-light hover:shadow-gs-card transition-all duration-200 text-center flex flex-col items-center"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-gs-green bg-gs-light mb-3 group-hover:bg-gs-green group-hover:text-white transition-colors">
                  {iconMap[industry.icon]}
                </div>
                <h3 className="text-sm font-bold text-gs-charcoal mb-2 group-hover:text-gs-green transition-colors">
                  {industry.name}
                </h3>
                <p className="text-xs text-gs-slate leading-relaxed line-clamp-3 mb-3">{industry.shortDescription}</p>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-gs-green">
                  Learn More <ArrowRight size={12} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why industry specific matters */}
      <section className="py-16 bg-gs-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gs-charcoal mb-5">
                Why Industry-Specific Compliance Matters
              </h2>
              <p className="text-gs-slate leading-relaxed mb-5">
                Different industries face fundamentally different compliance landscapes. An automotive supplier managing IMDS submissions and GADSL declarations faces completely different challenges than a consumer goods manufacturer managing GPSR and toy safety obligations.
              </p>
              <p className="text-gs-slate leading-relaxed mb-5">
                Generic compliance advice misses the industry-specific nuances that determine whether a compliance program actually works in practice. The substance thresholds that apply, the platforms you must use, and the submission formats vary dramatically by sector.
              </p>
              <p className="text-gs-slate leading-relaxed">
                GS Comply Solutions builds compliance programs from the ground up with your specific industry, products, supply chain, and markets in mind — not retrofitted from a one-size-fits-all template.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { industry: 'Automotive', note: 'Uses IMDS, GADSL, ELV, CAMDS — unique to this sector' },
                { industry: 'Electronics', note: 'RoHS CE marking, WEEE registration, Battery Regulation' },
                { industry: 'Non-Automotive', note: 'CDX platform, IHM for marine, different declaration formats' },
                { industry: 'HVAC', note: 'F-Gas phase-down schedules, refrigerant-specific GWP tracking' },
                { industry: 'Consumer Products', note: 'Prop 65 litigation risk, GPSR, Toy Safety, PPWR' },
              ].map(({ industry, note }) => (
                <div key={industry} className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gs-border shadow-sm">
                  <div className="w-2 h-2 rounded-full bg-gs-green mt-2 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-gs-charcoal">{industry}</p>
                    <p className="text-xs text-gs-slate mt-0.5">{note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTABanner
        headline="Which Industry Are You In? Let's Build Your Compliance Program."
        subtext="Tell us about your products and markets — we'll design a compliance program that fits your specific industry obligations."
        buttonText="Get an Industry-Specific Assessment"
        buttonLink="/contact"
      />
    </>
  );
}