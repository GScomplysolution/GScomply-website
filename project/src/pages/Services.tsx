import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, CheckCircle, Shield, Leaf, Globe, Mail, Target, Users,
  Car, Factory, Wind, Cpu, ShoppingBag, Plane, Heart, Building2, Box, Shirt,
} from 'lucide-react';
import SEO, { generateBreadcrumbStructuredData } from '../components/SEO';
import CTABanner from '../components/CTABanner';
import services from '../data/services';
import platforms from '../data/platforms';
import industries from '../data/industries';

const industryIconMap: Record<string, React.ReactNode> = {
  Car: <Car size={16} />,
  Factory: <Factory size={16} />,
  Wind: <Wind size={16} />,
  Cpu: <Cpu size={16} />,
  ShoppingBag: <ShoppingBag size={16} />,
  Plane: <Plane size={16} />,
  Heart: <Heart size={16} />,
  Building2: <Building2 size={16} />,
  Box: <Box size={16} />,
  Shirt: <Shirt size={16} />,
};

const shortRegion = (region: string): string => {
  if (region.includes('European Union')) return 'EU';
  if (region.includes('United States (California)')) return 'California';
  if (region.includes('United States')) return 'US';
  if (region.toLowerCase().startsWith('global')) return 'Global';
  return region.split(' ')[0];
};

const sustainabilityServices = [
  {
    id: 'lca',
    acronym: 'LCA',
    title: 'Life Cycle Assessment',
    description: 'Cradle-to-grave environmental impact quantification for products, aligned with ISO 14040/44.',
    link: '/services/lca-pcf',
  },
  {
    id: 'pcf',
    acronym: 'PCF',
    title: 'Product Carbon Footprint',
    description: 'GHG Protocol-aligned PCF calculations covering Scope 1, 2, and 3 emissions across the value chain.',
    link: '/services/lca-pcf',
  },
  {
    id: 'cbam',
    acronym: 'CBAM',
    title: 'CBAM Reporting',
    description: 'Carbon Border Adjustment Mechanism compliance reporting for goods imported into the EU.',
    link: '/services/lca-pcf',
  },
  {
    id: 'epd',
    acronym: 'EPD',
    title: 'Environmental Product Declaration',
    description: 'ISO 14025-compliant EPDs supporting green building, public procurement, and B2B sustainability.',
    link: '/services/lca-pcf',
  },
  {
    id: 'csrd',
    acronym: 'CSRD',
    title: 'CSRD / Sustainability Reporting',
    description: 'ESRS-aligned sustainability disclosure, GRI Standards reporting, and CDP questionnaire support.',
    link: '/services/lca-pcf',
  },
  {
    id: 'scope3',
    acronym: 'S3',
    title: 'Scope 3 Emissions Reporting',
    description: 'Value chain GHG quantification across purchased goods, logistics, use phase, and downstream.',
    link: '/services/lca-pcf',
  },
  {
    id: 'esg',
    acronym: 'ESG',
    title: 'ESG Reporting',
    description: 'Integrated environmental, social, and governance reporting aligned with major ESG frameworks.',
    link: '/services/lca-pcf',
  },
  {
    id: 'carbon',
    acronym: 'CRS',
    title: 'Carbon Reduction Strategy',
    description: 'Science-based decarbonization roadmaps identifying emission hotspots and reduction measures.',
    link: '/services/lca-pcf',
  },
];

export default function Services() {
  const [activeIndustry, setActiveIndustry] = useState<string | null>(null);

  const breadcrumbSchema = generateBreadcrumbStructuredData([
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
  ]);

  const filteredServices = activeIndustry
    ? (() => {
        const ind = industries.find((i) => i.slug === activeIndustry);
        if (!ind) return services;
        return services.filter((s) => ind.keyRegulationSlugs.includes(s.slug));
      })()
    : services;

  return (
    <>
      <SEO
        title="Compliance Services"
        description="Complete product and material compliance services: REACH, RoHS, PFAS, GADSL, ELV, TSCA, Prop 65 and more. IMDS & SCIP platform submissions. LCA & PCF sustainability services."
        keywords="compliance services, REACH compliance, RoHS compliance, PFAS screening, IMDS submissions, SCIP database, product compliance consulting, substance regulations"
        canonicalPath="/services"
        type="website"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section className="py-20 md:py-28" style={{ background: 'linear-gradient(135deg, #1A6B3C 0%, #0F4A2A 100%)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-xs font-semibold tracking-widest text-gs-mint uppercase mb-4 bg-white/10 px-4 py-2 rounded-full">
            Our Services
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 leading-tight">
            End-to-End Compliance &amp; Sustainability Services
          </h1>
          <p className="text-lg text-white/85 max-w-3xl mx-auto leading-relaxed">
            From chemical substance screening to full regulatory submissions and sustainability reporting, GS Comply Solutions provides comprehensive support across the world's most critical regulations.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {['#compliance', '#sustainability', '#platforms'].map((hash, i) => (
              <a
                key={hash}
                href={hash}
                className="px-5 py-2 rounded-full bg-white/10 border border-white/30 text-white text-sm font-medium hover:bg-white/20 transition-colors"
              >
                {['Compliance', 'Sustainability', 'Platforms'][i]}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 1: PRODUCT & MATERIAL COMPLIANCE
      ══════════════════════════════════════════ */}
      <section id="compliance" className="scroll-mt-16 pt-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-10 h-10 bg-gs-green rounded-lg flex items-center justify-center flex-shrink-0">
              <Shield size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gs-charcoal">Product &amp; Material Compliance Services</h2>
              <p className="text-sm text-gs-slate mt-1">Substance screening, declarations, and platform submissions across all major global regulations.</p>
            </div>
          </div>
          <div className="h-1 bg-gs-green rounded-full mt-4 mb-0 w-24" />
        </div>
      </section>

      {/* Industry filter */}
      <section className="py-8 bg-white border-b border-gs-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold text-gs-slate uppercase tracking-wider mb-3">
            Filter by industry to see relevant regulations
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveIndustry(null)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                activeIndustry === null
                  ? 'bg-gs-green text-white shadow-sm'
                  : 'bg-white text-gs-slate border border-gs-border hover:border-gs-green hover:text-gs-green'
              }`}
            >
              All
            </button>
            {industries.map((ind) => (
              <button
                key={ind.slug}
                onClick={() => setActiveIndustry(activeIndustry === ind.slug ? null : ind.slug)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  activeIndustry === ind.slug
                    ? 'bg-gs-green text-white shadow-sm'
                    : 'bg-white text-gs-slate border border-gs-border hover:border-gs-green hover:text-gs-green'
                }`}
              >
                <span>{industryIconMap[ind.icon]}</span>
                {ind.name}
              </button>
            ))}
            {activeIndustry && (
              <button
                onClick={() => setActiveIndustry(null)}
                className="px-3 py-1.5 text-xs text-gs-slate hover:text-gs-green transition-colors"
              >
                Clear ×
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Compliance regulation cards */}
      <section className="py-14 bg-gs-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeIndustry && (
            <div className="mb-8 p-4 bg-white rounded-xl border border-gs-border flex items-center justify-between gap-4">
              {(() => {
                const ind = industries.find((i) => i.slug === activeIndustry);
                return ind ? (
                  <>
                    <div>
                      <p className="text-sm font-semibold text-gs-charcoal">{ind.name} Compliance</p>
                      <p className="text-xs text-gs-slate mt-0.5">{ind.shortDescription}</p>
                    </div>
                    <Link to={`/industries/${ind.slug}`} className="flex-shrink-0 inline-flex items-center gap-1 text-xs font-semibold text-gs-green hover:text-gs-emerald transition-colors whitespace-nowrap">
                      Full Industry Page <ArrowRight size={12} />
                    </Link>
                  </>
                ) : null;
              })()}
            </div>
          )}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredServices.map((s) => (
              <div
                key={s.slug}
                className="bg-white rounded-xl border border-gs-border shadow-gs-card hover:shadow-gs-hover hover:-translate-y-1 transition-all duration-200 flex flex-col overflow-hidden"
              >
                <div className="p-5 flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-extrabold text-gs-green">{s.acronym}</span>
                    <span className="inline-flex items-center gap-1 text-xs text-gs-slate bg-gs-light px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0">
                      <Globe size={10} />
                      {shortRegion(s.region)}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-gs-charcoal mb-2 leading-snug">{s.name}</h3>
                  <p className="text-xs text-gs-slate leading-relaxed">{s.description}</p>
                </div>
                <div className="px-5 pb-4">
                  <Link
                    to={`/services/${s.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-gs-green hover:text-gs-emerald transition-colors"
                  >
                    Learn More <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 2: SUSTAINABILITY SERVICES
      ══════════════════════════════════════ */}
      <section id="sustainability" className="scroll-mt-16 pt-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-10 h-10 bg-gs-green rounded-lg flex items-center justify-center flex-shrink-0">
              <Leaf size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gs-charcoal">Sustainability Services</h2>
              <p className="text-sm text-gs-slate mt-1">LCA, PCF, CBAM, CSRD, ESG and carbon reporting — quantify and reduce your environmental impact.</p>
            </div>
          </div>
          <div className="h-1 bg-gs-green rounded-full mt-4 mb-0 w-24" />
        </div>
      </section>

      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {sustainabilityServices.map((s) => (
              <Link
                key={s.id}
                to={s.link}
                className="group bg-white rounded-xl border border-gs-border shadow-gs-card hover:shadow-gs-hover hover:-translate-y-1 transition-all duration-200 flex flex-col overflow-hidden"
              >
                <div className="p-5 flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-extrabold text-gs-green">{s.acronym}</span>
                    <span className="inline-flex items-center gap-1 text-xs text-gs-slate bg-gs-light px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0">
                      <Globe size={10} />
                      Global
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-gs-charcoal mb-2 leading-snug">{s.title}</h3>
                  <p className="text-xs text-gs-slate leading-relaxed">{s.description}</p>
                </div>
                <div className="px-5 pb-4">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-gs-green group-hover:text-gs-emerald transition-colors">
                    Learn More <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 p-6 bg-gs-light rounded-2xl border border-gs-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-gs-charcoal mb-1">Full LCA &amp; Sustainability Service Suite</p>
              <p className="text-xs text-gs-slate">Explore our complete methodology, standards, and deliverables for each sustainability service.</p>
            </div>
            <Link
              to="/services/lca-pcf"
              className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-gs-green text-white text-sm font-medium rounded-lg hover:bg-gs-emerald transition-colors"
            >
              View All LCA &amp; PCF Services <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 3: COMPLIANCE PLATFORMS
      ══════════════════════════════════════ */}
      <section id="platforms" className="scroll-mt-16 pt-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-10 h-10 bg-gs-green rounded-lg flex items-center justify-center flex-shrink-0">
              <Globe size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gs-charcoal">Compliance Platform Expertise</h2>
              <p className="text-sm text-gs-slate mt-1">We master the platforms that power compliance data management across global supply chains.</p>
            </div>
          </div>
          <div className="h-1 bg-gs-green rounded-full mt-4 mb-0 w-24" />
        </div>
      </section>

      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {platforms.map((platform) => (
              <div key={platform.slug} className="bg-gs-gray rounded-2xl border border-gs-border overflow-hidden hover:shadow-gs-card transition-all duration-200">
                <div className="p-6 border-b border-gs-border bg-white">
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-2xl font-extrabold text-gs-green">{platform.acronym}</span>
                    <span className="text-xs bg-gs-light text-gs-green px-2.5 py-1 rounded-full font-semibold flex-shrink-0">{platform.industry}</span>
                  </div>
                  <h3 className="text-sm font-bold text-gs-charcoal mb-1">{platform.name}</h3>
                  <p className="text-xs text-gs-slate">{platform.description}</p>
                </div>
                <div className="p-5">
                  <p className="text-xs font-semibold text-gs-slate uppercase tracking-wider mb-3">How GS Comply Helps</p>
                  <ul className="space-y-2">
                    {platform.howWeHelp.map((item) => (
                      <li key={item.title} className="flex items-start gap-2">
                        <CheckCircle size={13} className="text-gs-green flex-shrink-0 mt-0.5" />
                        <span className="text-xs text-gs-charcoal font-medium">{item.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Platform comparison table */}
          <div className="overflow-x-auto rounded-xl shadow-gs-card">
            <table className="w-full text-sm min-w-[600px]">
              <thead>
                <tr className="bg-gs-green text-white">
                  {['Platform', 'Industry', 'Regulatory Basis', 'Who Must Submit', 'GS Comply Support'].map((col, i) => (
                    <th key={col} className={`text-left px-5 py-3.5 font-semibold text-sm ${i === 0 ? 'rounded-tl-xl' : ''} ${i === 4 ? 'rounded-tr-xl' : ''}`}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {platforms.map(({ acronym, industry, regulatoryBasis, whoMustSubmit }, idx) => (
                  <tr key={acronym} className={idx % 2 === 0 ? 'bg-white' : 'bg-gs-light'}>
                    <td className="px-5 py-3.5 font-bold text-gs-green">{acronym}</td>
                    <td className="px-5 py-3.5 text-gs-charcoal text-sm">{industry}</td>
                    <td className="px-5 py-3.5 text-gs-slate text-xs">{regulatoryBasis}</td>
                    <td className="px-5 py-3.5 text-gs-slate text-xs">{whoMustSubmit}</td>
                    <td className="px-5 py-3.5">
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

      {/* ══════════════════════════════════════
          SECTION 4: TRAINING PROGRAMS
      ══════════════════════════════════════ */}
      <section id="training" className="scroll-mt-16 pt-16 bg-gs-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-10 h-10 bg-gs-green rounded-lg flex items-center justify-center flex-shrink-0">
              <Shield size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gs-charcoal">Training Programs</h2>
              <p className="text-sm text-gs-slate mt-1">Expert-led training for all regulations and compliance platforms — classroom, individual, and online formats available.</p>
            </div>
          </div>
          <div className="h-1 bg-gs-green rounded-full mt-4 mb-0 w-24" />
        </div>
      </section>

      <section className="py-14 bg-gs-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-6 mb-10">
            {/* Classroom Training */}
            <div className="bg-white rounded-2xl p-6 border-t-4 border-gs-green shadow-gs-card hover:shadow-gs-hover transition-all">
              <div className="w-12 h-12 bg-gs-light rounded-xl flex items-center justify-center mb-4">
                <Users size={24} className="text-gs-green" />
              </div>
              <h3 className="text-lg font-bold text-gs-charcoal mb-3">Classroom Training</h3>
              <p className="text-sm text-gs-slate leading-relaxed mb-4">
                In-person group sessions at your premises or our training facilities. Interactive workshops with hands-on exercises, real-world case studies, and Q&amp;A sessions.
              </p>
              <ul className="space-y-2 mb-5">
                <li className="flex items-center gap-2 text-xs text-gs-charcoal">
                  <CheckCircle size={14} className="text-gs-green flex-shrink-0" />
                  IMDS Material Data Sheet creation
                </li>
                <li className="flex items-center gap-2 text-xs text-gs-charcoal">
                  <CheckCircle size={14} className="text-gs-green flex-shrink-0" />
                  REACH SVHC screening methodology
                </li>
                <li className="flex items-center gap-2 text-xs text-gs-charcoal">
                  <CheckCircle size={14} className="text-gs-green flex-shrink-0" />
                  RoHS technical documentation
                </li>
                <li className="flex items-center gap-2 text-xs text-gs-charcoal">
                  <CheckCircle size={14} className="text-gs-green flex-shrink-0" />
                  SCIP notification procedures
                </li>
              </ul>
            </div>

            {/* Individual Training */}
            <div className="bg-white rounded-2xl p-6 border-t-4 border-gs-mint shadow-gs-card hover:shadow-gs-hover transition-all">
              <div className="w-12 h-12 bg-gs-light rounded-xl flex items-center justify-center mb-4">
                <Target size={24} className="text-gs-green" />
              </div>
              <h3 className="text-lg font-bold text-gs-charcoal mb-3">Individual Training</h3>
              <p className="text-sm text-gs-slate leading-relaxed mb-4">
                One-on-one sessions tailored to your specific role, products, and compliance responsibilities. Flexible scheduling and personalized curriculum.
              </p>
              <ul className="space-y-2 mb-5">
                <li className="flex items-center gap-2 text-xs text-gs-charcoal">
                  <CheckCircle size={14} className="text-gs-green flex-shrink-0" />
                  Customized compliance training
                </li>
                <li className="flex items-center gap-2 text-xs text-gs-charcoal">
                  <CheckCircle size={14} className="text-gs-green flex-shrink-0" />
                  Platform-specific deep dives
                </li>
                <li className="flex items-center gap-2 text-xs text-gs-charcoal">
                  <CheckCircle size={14} className="text-gs-green flex-shrink-0" />
                  Hands-on system practice
                </li>
                <li className="flex items-center gap-2 text-xs text-gs-charcoal">
                  <CheckCircle size={14} className="text-gs-green flex-shrink-0" />
                  Product-specific compliance
                </li>
              </ul>
            </div>

            {/* Online Training */}
            <div className="bg-white rounded-2xl p-6 border-t-4 border-gs-emerald shadow-gs-card hover:shadow-gs-hover transition-all">
              <div className="w-12 h-12 bg-gs-light rounded-xl flex items-center justify-center mb-4">
                <Globe size={24} className="text-gs-green" />
              </div>
              <h3 className="text-lg font-bold text-gs-charcoal mb-3">Online Training</h3>
              <p className="text-sm text-gs-slate leading-relaxed mb-4">
                Live virtual sessions and recorded courses accessible from anywhere. Learn at your own pace with comprehensive course materials and certification.
              </p>
              <ul className="space-y-2 mb-5">
                <li className="flex items-center gap-2 text-xs text-gs-charcoal">
                  <CheckCircle size={14} className="text-gs-green flex-shrink-0" />
                  Live webinars and Q&amp;A
                </li>
                <li className="flex items-center gap-2 text-xs text-gs-charcoal">
                  <CheckCircle size={14} className="text-gs-green flex-shrink-0" />
                  Self-paced video courses
                </li>
                <li className="flex items-center gap-2 text-xs text-gs-charcoal">
                  <CheckCircle size={14} className="text-gs-green flex-shrink-0" />
                  downloadable resources
                </li>
                <li className="flex items-center gap-2 text-xs text-gs-charcoal">
                  <CheckCircle size={14} className="text-gs-green flex-shrink-0" />
                  Certificate of completion
                </li>
              </ul>
            </div>
          </div>

          {/* Training Topics */}
          <div className="bg-white rounded-2xl p-8 border border-gs-border">
            <h3 className="text-lg font-bold text-gs-charcoal mb-6 text-center">Training Topics Covered</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gs-light rounded-xl p-4">
                <p className="text-xs font-bold text-gs-green uppercase tracking-wider mb-3">Regulations</p>
                <ul className="space-y-1.5">
                  {['REACH & SVHC', 'RoHS & WEEE', 'ELV Directive', 'TSCA & Prop 65', 'PFAS Restrictions', 'POPs Regulation'].map((topic) => (
                    <li key={topic} className="text-xs text-gs-charcoal flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-gs-green" />
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gs-light rounded-xl p-4">
                <p className="text-xs font-bold text-gs-green uppercase tracking-wider mb-3">Platforms</p>
                <ul className="space-y-1.5">
                  {['IMDS Training', 'CDX Platform', 'CAMDS Submissions', 'SCIP Database', 'IUCLID Navigation', 'Platform Integration'].map((topic) => (
                    <li key={topic} className="text-xs text-gs-charcoal flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-gs-green" />
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gs-light rounded-xl p-4">
                <p className="text-xs font-bold text-gs-green uppercase tracking-wider mb-3">Sustainability</p>
                <ul className="space-y-1.5">
                  {['LCA Methodology', 'PCF Calculations', 'CSRD Reporting', 'Scope 3 Emissions', 'EPD Development', 'Carbon Strategy'].map((topic) => (
                    <li key={topic} className="text-xs text-gs-charcoal flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-gs-green" />
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gs-light rounded-xl p-4">
                <p className="text-xs font-bold text-gs-green uppercase tracking-wider mb-3">Specialized</p>
                <ul className="space-y-1.5">
                  {['Supplier Auditing', 'Data Quality', 'Compliance Systems', 'Risk Assessment', 'Documentation', 'Due Diligence'].map((topic) => (
                    <li key={topic} className="text-xs text-gs-charcoal flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-gs-green" />
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CTA for Training */}
            <div className="mt-8 p-6 bg-gs-green rounded-xl text-center">
              <h4 className="text-lg font-bold text-white mb-2">Request a Training Quote</h4>
              <p className="text-sm text-white/85 mb-4">Contact us for customized training programs tailored to your team's needs and schedule.</p>
              <a
                href="mailto:info.gscomply@gmail.com?subject=Training Program Inquiry"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gs-green font-semibold rounded-lg hover:bg-gs-light transition-colors"
              >
                <Mail size={16} />
                Email Us for Training Quote
              </a>
            </div>
          </div>
        </div>
      </section>

      <CTABanner
        headline="Not Sure Where to Start? We'll Help You Map Your Compliance Needs."
        subtext="Schedule a free consultation with our experts and get a clear compliance roadmap tailored to your products, industry, and markets."
        buttonText="Get a Free Compliance Assessment"
        buttonLink="/contact"
      />
    </>
  );
}
