import { Link } from 'react-router-dom';
import { RefreshCw, BarChart, FileText, TrendingDown, Globe, Database, BookOpen, ClipboardList, CheckCircle, ArrowRight } from 'lucide-react';
import SEO, { generateBreadcrumbStructuredData } from '../components/SEO';
import CTABanner from '../components/CTABanner';
import lcaServices from '../data/lcaServices';

const iconMap: Record<string, React.ReactNode> = {
  RefreshCw: <RefreshCw size={24} className="text-gs-green" />,
  BarChart: <BarChart size={24} className="text-gs-green" />,
  FileText: <FileText size={24} className="text-gs-green" />,
  TrendingDown: <TrendingDown size={24} className="text-gs-green" />,
  Globe: <Globe size={24} className="text-gs-green" />,
  Database: <Database size={24} className="text-gs-green" />,
  BookOpen: <BookOpen size={24} className="text-gs-green" />,
  ClipboardList: <ClipboardList size={24} className="text-gs-green" />,
};

export default function LcaPcf() {
  const breadcrumbSchema = generateBreadcrumbStructuredData([
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'LCA & PCF', path: '/services/lca-pcf' },
  ]);

  return (
    <>
      <SEO
        title="Life Cycle Assessment (LCA) & Product Carbon Footprint (PCF) Services"
        description="ISO 14044-compliant LCA and GHG Protocol-aligned PCF calculations. Support for CSRD Scope 3 reporting, EPD programs, and OEM carbon footprint requirements."
        keywords="LCA, life cycle assessment, PCF, product carbon footprint, ISO 14044, ISO 14067, GHG Protocol, CSRD, EPD, carbon footprint, sustainability reporting"
        canonicalPath="/services/lca-pcf"
        type="service"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section className="py-20 md:py-28" style={{ background: 'linear-gradient(135deg, #1A6B3C 0%, #0F4A2A 100%)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-xs font-semibold tracking-widest text-gs-mint uppercase mb-4 bg-white/10 px-4 py-2 rounded-full">
            LCA & PCF Services
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 leading-tight">
            Life Cycle Assessment & Product Carbon Footprint Services
          </h1>
          <p className="text-lg text-white/85 max-w-3xl mx-auto leading-relaxed">
            Sustainability performance is no longer optional. From ISO 14044-compliant LCAs to PCF calculations aligned with the GHG Protocol, GS Comply Solutions provides the environmental data your business needs to meet customer requirements, regulatory obligations, and sustainability commitments.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {['ISO 14040/44', 'ISO 14067', 'GHG Protocol', 'CSRD / ESRS', 'EPD / ISO 14025', 'SBTi'].map((std) => (
              <span key={std} className="text-sm bg-white/15 text-white px-3 py-1.5 rounded-full border border-white/30">{std}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Why LCA/PCF matters */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gs-charcoal mb-5">
                Why Environmental Quantification Is Now a Business Requirement
              </h2>
              <p className="text-gs-slate leading-relaxed mb-5">
                The regulatory and commercial landscape for sustainability is changing rapidly. CSRD now mandates Scope 3 GHG reporting for large EU companies. Automotive and electronics OEMs are requiring Product Carbon Footprint data from their tier suppliers. Green procurement policies require Environmental Product Declarations. And investors, banks, and customers increasingly scrutinize environmental performance as part of due diligence.
              </p>
              <p className="text-gs-slate leading-relaxed mb-5">
                LCA and PCF are the scientific foundation for all of these requirements. Without credible, methodology-compliant environmental data, your business cannot satisfy OEM carbon questionnaires, CSRD supply chain data requests, EPD program requirements, or science-based target commitments.
              </p>
              <p className="text-gs-slate leading-relaxed">
                GS Comply Solutions bridges the gap between substance compliance — what's in your product — and sustainability performance — what impact your product has across its life cycle. Our integrated approach means the material data we collect for REACH and RoHS compliance feeds directly into LCA and PCF calculations, reducing data collection burden and improving data quality.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { label: 'CSRD Scope 3', value: 'Mandatory for large EU companies', highlight: true },
                { label: 'OEM PCF Mandates', value: 'Growing requirement across automotive & electronics' },
                { label: 'Green Procurement', value: 'EPDs required for EU public procurement' },
                { label: 'SBTi Pressure', value: 'Science-based targets cascading to supply chain' },
                { label: 'Carbon Border Tax', value: 'CBAM expanding to more product categories' },
                { label: 'Investor ESG', value: 'Environmental performance in due diligence' },
              ].map(({ label, value, highlight }) => (
                <div key={label} className={`rounded-xl p-4 border ${highlight ? 'border-gs-green bg-gs-light' : 'border-gs-border bg-gs-gray'}`}>
                  <p className="text-xs font-bold text-gs-green uppercase tracking-wider mb-1">{label}</p>
                  <p className="text-xs text-gs-charcoal leading-snug">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Service cards */}
      <section className="py-16 md:py-24 bg-gs-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gs-charcoal mb-4">
              Our LCA & PCF Services
            </h2>
            <p className="text-gs-slate max-w-2xl mx-auto">
              From full life cycle assessments to targeted PCF calculations and sustainability reporting support — we cover the full environmental quantification spectrum.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lcaServices.map((svc) => (
              <div key={svc.id} className="bg-white rounded-2xl p-6 border-t-4 border-gs-green shadow-gs-card hover:shadow-gs-hover hover:-translate-y-1 transition-all duration-200 flex flex-col">
                <div className="w-12 h-12 bg-gs-light rounded-xl flex items-center justify-center mb-4">
                  {iconMap[svc.icon]}
                </div>
                <h3 className="text-base font-bold text-gs-charcoal mb-3">{svc.title}</h3>
                <p className="text-sm text-gs-slate leading-relaxed mb-4 flex-1">{svc.shortDescription}</p>

                <div className="mb-4">
                  <p className="text-xs font-semibold text-gs-charcoal uppercase tracking-wider mb-2">Key Deliverables</p>
                  <ul className="space-y-1.5">
                    {svc.deliverables.slice(0, 3).map((d) => (
                      <li key={d} className="flex items-start gap-2">
                        <CheckCircle size={12} className="text-gs-green flex-shrink-0 mt-0.5" />
                        <span className="text-xs text-gs-slate">{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-xs font-semibold text-gs-charcoal uppercase tracking-wider mb-2">Standards</p>
                  <div className="flex flex-wrap gap-1">
                    {svc.standards.slice(0, 2).map((std) => (
                      <span key={std} className="text-xs bg-gs-light text-gs-green px-2 py-0.5 rounded-full border border-gs-border">
                        {std}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our methodology */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gs-charcoal mb-4">Our LCA & PCF Methodology</h2>
            <p className="text-gs-slate max-w-2xl mx-auto">
              Our assessments follow internationally recognized standards and are designed to be defensible, auditable, and actionable.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Scope Definition',
                desc: 'Define system boundaries, functional unit, and data quality requirements aligned with the applicable standard (ISO 14044, ISO 14067, or EPD PCR).',
              },
              {
                step: '02',
                title: 'Data Collection',
                desc: 'Collect primary activity data from your operations and supply chain, supplemented by secondary data from recognized LCA databases (ecoinvent, GaBi).',
              },
              {
                step: '03',
                title: 'Impact Assessment',
                desc: 'Model environmental impacts using recognized LCIA methods (ReCiPe, CML, IPCC GWP100) and calculate results across relevant impact categories.',
              },
              {
                step: '04',
                title: 'Results & Reporting',
                desc: 'Interpret results, identify hotspots, and produce a standards-compliant report with executive summary, supporting data, and improvement recommendations.',
              },
            ].map(({ step, title, desc }) => (
              <div key={step} className="text-center">
                <div className="w-14 h-14 rounded-full bg-gs-green text-white text-lg font-extrabold flex items-center justify-center mx-auto mb-4">
                  {step}
                </div>
                <h3 className="text-base font-bold text-gs-charcoal mb-2">{title}</h3>
                <p className="text-sm text-gs-slate leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration with compliance */}
      <section className="py-16" style={{ background: 'linear-gradient(135deg, #EAF7EF 0%, #D1EFE0 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gs-charcoal mb-4">
              Integrated Compliance + Sustainability
            </h2>
            <p className="text-gs-slate max-w-2xl mx-auto">
              Our unique position as both a substance compliance expert and LCA/PCF practitioner means we can deliver integrated programs that avoid data duplication and accelerate results.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                title: 'Shared Data Foundation',
                desc: 'Material composition data collected for REACH/RoHS compliance feeds directly into LCA inventory analysis — one data collection effort, two compliance outputs.',
              },
              {
                title: 'Supply Chain Synergy',
                desc: 'Supplier substance declarations collected for IMDS or CDX can be extended to include energy and carbon data, building a comprehensive sustainability data set from a single supplier engagement.',
              },
              {
                title: 'Regulatory Alignment',
                desc: 'We align LCA and PCF work with the specific regulatory drivers (CSRD, EPD programs, OEM requirements) that are most relevant to your business, so every assessment delivers maximum business value.',
              },
            ].map(({ title, desc }) => (
              <div key={title} className="bg-white rounded-xl p-5 shadow-sm border border-gs-border">
                <CheckCircle size={20} className="text-gs-green mb-3" />
                <h3 className="text-sm font-bold text-gs-charcoal mb-2">{title}</h3>
                <p className="text-xs text-gs-slate leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-gs-green text-gs-green text-sm font-semibold rounded-lg hover:bg-gs-green hover:text-white transition-all"
            >
              View All Substance Compliance Services
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <CTABanner
        headline="Ready to Quantify Your Environmental Impact?"
        subtext="Whether you need a single PCF calculation or a full LCA and EPD program, our environmental specialists are ready to help."
        buttonText="Request an LCA/PCF Consultation"
        buttonLink="/contact"
      />
    </>
  );
}
