import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';
import CTABanner from '../components/CTABanner';
import platforms from '../data/platforms';

export default function Platforms() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 md:py-28" style={{ background: 'linear-gradient(135deg, #1A6B3C 0%, #0F4A2A 100%)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-xs font-semibold tracking-widest text-gs-mint uppercase mb-4 bg-white/10 px-4 py-2 rounded-full">
            Compliance Platforms
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 leading-tight">
            Compliance Platform Expertise
          </h1>
          <p className="text-lg text-white/85 max-w-3xl mx-auto leading-relaxed">
            We don't just know the regulations — we master the platforms that power compliance data management across global supply chains. From IMDS to SCIP, our team has hands-on expertise in every major compliance platform.
          </p>
        </div>
      </section>

      {/* Platform deep dives */}
      {platforms.map((platform, idx) => (
        <section
          key={platform.slug}
          id={platform.slug}
          className={`py-16 md:py-24 scroll-mt-16 ${idx % 2 === 0 ? 'bg-white' : 'bg-gs-gray'}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`grid lg:grid-cols-2 gap-12 items-start ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
              {/* Left */}
              <div className={idx % 2 !== 0 ? 'lg:order-2' : ''}>
                <div className="inline-flex items-center gap-2 mb-4">
                  <span className="text-4xl font-extrabold text-gs-green">{platform.acronym}</span>
                  <span className="text-xs bg-gs-light text-gs-green px-3 py-1 rounded-full font-semibold">{platform.industry}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gs-charcoal mb-3 leading-tight">
                  {platform.name}
                </h2>
                <p className="text-sm text-gs-slate mb-1">
                  <span className="font-semibold text-gs-charcoal">Managed by:</span> {platform.managedBy}
                </p>
                <p className="text-sm text-gs-slate mb-6">
                  <span className="font-semibold text-gs-charcoal">Regulatory basis:</span> {platform.regulatoryBasis}
                </p>
                <div className="prose prose-sm text-gs-slate leading-relaxed">
                  {platform.whatItDoes.split('\n\n').map((para, i) => (
                    <p key={i} className="mb-4">{para}</p>
                  ))}
                </div>
              </div>

              {/* Right */}
              <div className={idx % 2 !== 0 ? 'lg:order-1' : ''}>
                {/* Platform facts */}
                <div className="bg-gs-light rounded-2xl p-6 border-l-4 border-gs-green mb-6">
                  <h3 className="text-sm font-bold text-gs-charcoal mb-3 uppercase tracking-wider">Platform at a Glance</h3>
                  <dl className="space-y-2">
                    {[
                      { label: 'Industry', value: platform.industry },
                      { label: 'Who Must Submit', value: platform.whoMustSubmit },
                      { label: 'Data Type', value: platform.dataType },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex gap-3">
                        <dt className="text-xs font-semibold text-gs-charcoal w-32 flex-shrink-0 pt-0.5">{label}:</dt>
                        <dd className="text-xs text-gs-slate">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                {/* How we help */}
                <div>
                  <h3 className="text-base font-bold text-gs-charcoal mb-4">How GS Comply Solutions Helps</h3>
                  <div className="space-y-3">
                    {platform.howWeHelp.map((item) => (
                      <div key={item.title} className="bg-white rounded-xl p-4 border border-gs-border hover:border-gs-mint transition-colors">
                        <div className="flex items-start gap-3">
                          <CheckCircle size={16} className="text-gs-green flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-semibold text-gs-charcoal mb-1">{item.title}</p>
                            <p className="text-xs text-gs-slate leading-relaxed">{item.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Comparison table */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gs-charcoal mb-4">Platform Comparison</h2>
            <p className="text-gs-slate max-w-2xl mx-auto">
              Understanding which platform applies to your business is the first step to effective compliance data management.
            </p>
          </div>
          <div className="overflow-x-auto rounded-xl shadow-gs-card">
            <table className="w-full text-sm min-w-[700px]">
              <thead>
                <tr className="bg-gs-green text-white">
                  {['Platform', 'Industry', 'Regulatory Basis', 'Who Must Submit', 'GS Comply Support'].map((col, i) => (
                    <th key={col} className={`text-left px-5 py-4 font-semibold ${i === 0 ? 'rounded-tl-xl' : ''} ${i === 4 ? 'rounded-tr-xl' : ''}`}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {platforms.map(({ acronym, industry, regulatoryBasis, whoMustSubmit }, idx) => (
                  <tr key={acronym} className={idx % 2 === 0 ? 'bg-white' : 'bg-gs-light'}>
                    <td className="px-5 py-4 font-bold text-gs-green">{acronym}</td>
                    <td className="px-5 py-4 text-gs-charcoal">{industry}</td>
                    <td className="px-5 py-4 text-gs-slate text-xs">{regulatoryBasis}</td>
                    <td className="px-5 py-4 text-gs-slate text-xs">{whoMustSubmit}</td>
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-gs-green bg-gs-light px-2.5 py-1 rounded-full">
                        <CheckCircle size={11} />
                        Full Support
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <CTABanner
        headline="Need Platform Support? Let's Talk."
        subtext="Whether you need IMDS account setup, SCIP submissions, or CDX reporting, our platform experts are ready to help."
        buttonText="Get Platform Support"
        buttonLink="/contact"
      />
    </>
  );
}
