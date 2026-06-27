import { Link } from 'react-router-dom';
import { Globe, Shield, BarChart, ChevronDown, ArrowRight, Target, Users, Leaf, Car, Factory, Wind, Cpu, ShoppingBag, Plane, Building2, Box } from 'lucide-react';
import RegulationCard from '../components/RegulationCard';
import BlogCard from '../components/BlogCard';
import PlatformCard from '../components/PlatformCard';
import CTABanner from '../components/CTABanner';
import services from '../data/services';
import blogPosts from '../data/blogPosts';
import platforms from '../data/platforms';
import industries from '../data/industries';

const regulationBadges = ['REACH', 'RoHS', 'PFAS', 'Prop 65', 'GADSL', 'ELV', 'TSCA', 'WEEE', 'CLP', 'POPs'];

const industryIconMap: Record<string, React.ReactNode> = {
  Car: <Car size={22} />,
  Factory: <Factory size={22} />,
  Wind: <Wind size={22} />,
  Cpu: <Cpu size={22} />,
  ShoppingBag: <ShoppingBag size={22} />,
  Plane: <Plane size={22} />,
  Building2: <Building2 size={22} />,
  Box: <Box size={22} />,
};

export default function Home() {
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: 'linear-gradient(135deg, #1A6B3C 0%, #0F4A2A 100%)' }}>
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="heroDots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.5" fill="white" /></pattern></defs>
            <rect width="100%" height="100%" fill="url(#heroDots)" />
          </svg>
        </div>
        {/* Hero background image */}
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.pexels.com/photos/110854/pexels-photo-110854.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Manufacturing facility"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block text-xs font-semibold tracking-widest text-gs-mint uppercase mb-6 bg-white/10 px-4 py-2 rounded-full">
                Global Compliance Experts
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
                Global Compliance,{' '}
                <span className="text-gs-mint">Simplified.</span>
              </h1>
              <p className="text-lg text-white/85 leading-relaxed mb-8 max-w-xl">
                GS Comply Solutions helps manufacturers, suppliers, and enterprises navigate the world's most complex product and material compliance regulations — from REACH and RoHS to PFAS and beyond.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-gs-green font-semibold rounded-lg hover:bg-gs-light transition-all duration-200 hover:shadow-lg">
                  Request a Free Consultation <ArrowRight size={18} />
                </Link>
                <Link to="/industries" className="inline-flex items-center gap-2 px-6 py-3.5 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-200">
                  Explore Our Industries
                </Link>
              </div>
            </div>
            <div className="hidden lg:flex justify-center items-center">
              <div className="relative w-80 h-80">
                <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-pulse" />
                <div className="absolute inset-8 rounded-full border-2 border-gs-mint/30" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/15 backdrop-blur rounded-2xl p-8 text-center">
                    <Shield size={56} className="text-gs-mint mx-auto mb-3" />
                    <p className="text-white font-bold text-lg">10+ Regulations</p>
                    <p className="text-white/70 text-sm">Covered Globally</p>
                  </div>
                </div>
                {['REACH', 'RoHS', 'PFAS', 'IMDS'].map((badge, i) => {
                  const angle = (i * 90) * (Math.PI / 180);
                  const r = 140;
                  const x = 50 + r * Math.cos(angle) * 0.5;
                  const y = 50 + r * Math.sin(angle) * 0.5;
                  return (
                    <div key={badge} className="absolute transform -translate-x-1/2 -translate-y-1/2" style={{ left: `${x}%`, top: `${y}%` }}>
                      <span className="bg-gs-green border border-gs-mint text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow-lg">{badge}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-1">
            <span className="text-white/50 text-xs tracking-wider">Scroll</span>
            <ChevronDown className="text-white/50 animate-bounce" size={20} />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-black/20 py-3">
          <div className="flex items-center gap-3 px-4 overflow-x-auto scrollbar-hide">
            <span className="text-white/60 text-xs font-medium whitespace-nowrap flex-shrink-0">Regulations we cover:</span>
            {regulationBadges.map((badge) => (
              <span key={badge} className="flex-shrink-0 border border-white/30 text-white/80 text-xs px-3 py-1 rounded-full">{badge}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── INDUSTRIES (FIRST) ─── */}
      <section className="py-16 md:py-24 bg-gs-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold tracking-widest text-gs-green uppercase mb-3 block">Industries We Serve</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gs-charcoal mb-4">
              Sector-Specific Compliance Expertise
            </h2>
            <p className="text-gs-slate max-w-2xl mx-auto">
              Each industry faces a unique compliance landscape. We deliver specialized knowledge and proven programs tailored to your sector's specific regulatory obligations.
            </p>
          </div>

          {/* Primary 5 industries — detailed cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
            {industries.slice(0, 5).map((industry) => (
              <Link
                key={industry.slug}
                to={`/industries/${industry.slug}`}
                className="group bg-white rounded-2xl p-6 border border-gs-border shadow-gs-card hover:shadow-gs-hover hover:-translate-y-1 transition-all duration-200 flex flex-col"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white flex-shrink-0" style={{ background: 'linear-gradient(135deg, #1A6B3C, #2E9E5B)' }}>
                    {industryIconMap[industry.icon]}
                  </div>
                  <h3 className="text-base font-bold text-gs-charcoal group-hover:text-gs-green transition-colors leading-tight">
                    {industry.name}
                  </h3>
                </div>
                <p className="text-sm text-gs-slate leading-relaxed mb-4 flex-1">{industry.shortDescription}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {industry.keyRegulations.slice(0, 3).map((reg) => (
                    <span key={reg} className="text-xs bg-gs-light text-gs-green px-2 py-0.5 rounded-full border border-gs-border">
                      {reg.split(' ')[0]}
                    </span>
                  ))}
                </div>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-gs-green group-hover:text-gs-emerald transition-colors">
                  View {industry.name} Services <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
            ))}
          </div>

          {/* Additional industries — compact row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
            {industries.slice(5).map((industry) => (
              <Link
                key={industry.slug}
                to={`/industries/${industry.slug}`}
                className="group bg-white rounded-xl p-4 border border-gs-border hover:border-gs-green hover:shadow-gs-card transition-all text-center flex flex-col items-center"
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-gs-green bg-gs-light mb-2 group-hover:bg-gs-green group-hover:text-white transition-colors">
                  {industryIconMap[industry.icon]}
                </div>
                <p className="text-xs font-semibold text-gs-charcoal group-hover:text-gs-green transition-colors leading-tight">{industry.name}</p>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/industries"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gs-green text-white font-semibold rounded-lg hover:bg-gs-emerald transition-colors"
            >
              View All Industries
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── VALUE PROP ─── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold tracking-widest text-gs-green uppercase">Why GS Comply Solutions</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gs-charcoal">
              Your Compliance Partner Across Every Regulation, Every Market
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Globe size={28} className="text-gs-green" />,
                title: 'Global Regulatory Coverage',
                body: 'We support compliance across 10+ major global regulations and frameworks, keeping your products market-ready in the EU, US, China, and beyond. Our team stays current with every regulatory update so you don\'t have to.',
              },
              {
                icon: <Shield size={28} className="text-gs-green" />,
                title: 'Risk Mitigation Expertise',
                body: 'Avoid costly penalties, product recalls, and market bans with proactive compliance strategies tailored to your supply chain. We identify gaps before regulators do — protecting your business and your brand.',
              },
              {
                icon: <BarChart size={28} className="text-gs-green" />,
                title: 'Data-Driven Reporting',
                body: 'Leverage structured compliance data through IMDS, CDX, CAMDS, and SCIP platforms for accurate, audit-ready documentation that satisfies customers and regulators alike.',
              },
            ].map(({ icon, title, body }) => (
              <div key={title} className="text-center p-8 rounded-2xl bg-gs-gray hover:bg-gs-light transition-colors duration-200">
                <div className="w-16 h-16 bg-gs-light rounded-2xl flex items-center justify-center mx-auto mb-5">{icon}</div>
                <h3 className="text-lg font-bold text-gs-charcoal mb-3">{title}</h3>
                <p className="text-sm text-gs-slate leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICES (Substance Compliance + LCA/PCF) ─── */}
      <section className="py-16 md:py-24 bg-gs-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold tracking-widest text-gs-green uppercase mb-3 block">Our Services</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gs-charcoal mb-4">
              Two Core Service Areas
            </h2>
            <p className="text-gs-slate max-w-2xl mx-auto">
              We deliver both substance compliance management and environmental sustainability quantification — covering everything your business needs to meet today's regulatory and market requirements.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Product & Material Compliance */}
            <div className="bg-white rounded-2xl p-8 border-t-4 border-gs-green shadow-gs-card">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 bg-gs-light rounded-xl flex items-center justify-center">
                  <Shield size={24} className="text-gs-green" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gs-charcoal">Product & Material Compliance</h3>
                  <p className="text-xs text-gs-slate">Substance screening, declarations, submissions</p>
                </div>
              </div>
              <p className="text-sm text-gs-slate leading-relaxed mb-5">
                Comprehensive substance compliance services covering REACH, RoHS, PFAS, GADSL, ELV, TSCA, Prop 65, CLP, POPs, and WEEE. From initial substance screening through platform submissions and ongoing regulatory monitoring.
              </p>
              <div className="flex flex-wrap gap-2 mb-5">
                {['REACH', 'RoHS', 'PFAS', 'GADSL', 'ELV', 'TSCA', 'Prop 65', 'WEEE', 'CLP', 'POPs'].map((reg) => (
                  <span key={reg} className="text-xs bg-gs-light text-gs-green px-2.5 py-1 rounded-full border border-gs-border font-medium">{reg}</span>
                ))}
              </div>
              <Link to="/services" className="inline-flex items-center gap-2 px-5 py-2.5 bg-gs-green text-white text-sm font-semibold rounded-lg hover:bg-gs-emerald transition-colors">
                Explore Compliance Services <ArrowRight size={16} />
              </Link>
            </div>

            {/* LCA & PCF */}
            <div className="bg-white rounded-2xl p-8 border-t-4 border-gs-mint shadow-gs-card">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 bg-gs-light rounded-xl flex items-center justify-center">
                  <Leaf size={24} className="text-gs-green" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gs-charcoal">LCA & PCF Services</h3>
                  <p className="text-xs text-gs-slate">Life Cycle Assessment, Carbon Footprint, EPD</p>
                </div>
              </div>
              <p className="text-sm text-gs-slate leading-relaxed mb-5">
                Full Life Cycle Assessments, Product Carbon Footprint calculations, Environmental Product Declarations, and CSRD/Scope 3 reporting support — helping businesses quantify and reduce their environmental impact.
              </p>
              <div className="flex flex-wrap gap-2 mb-5">
                {['Full LCA', 'Product PCF', 'EPD Preparation', 'Scope 3 Reporting', 'CSRD / ESRS', 'Carbon Strategy'].map((svc) => (
                  <span key={svc} className="text-xs bg-gs-light text-gs-green px-2.5 py-1 rounded-full border border-gs-border font-medium">{svc}</span>
                ))}
              </div>
              <Link to="/services/lca-pcf" className="inline-flex items-center gap-2 px-5 py-2.5 bg-gs-green text-white text-sm font-semibold rounded-lg hover:bg-gs-emerald transition-colors">
                Explore LCA & PCF Services <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Regulation grid */}
          <h3 className="text-xl font-bold text-gs-charcoal mb-6 text-center">Regulations We Cover</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {services.map((s) => (
              <RegulationCard key={s.slug} acronym={s.acronym} name={s.name} description={s.description} slug={s.slug} region={s.region} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── PLATFORMS ─── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gs-charcoal mb-4">Platforms We Master</h2>
            <p className="text-gs-slate max-w-2xl mx-auto">
              We don't just know the regulations — we master the platforms that power compliance data management across global supply chains.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {platforms.map((p) => (
              <PlatformCard key={p.slug} name={p.name} acronym={p.acronym} description={p.description} industry={p.industry} slug={p.slug} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHO WE SERVE ─── */}
      <section className="py-16 md:py-24 bg-gs-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gs-charcoal mb-4">Built for Every Business, Every Industry</h2>
            <p className="text-gs-slate max-w-2xl mx-auto">Whether you're a global OEM, a mid-size manufacturer, or a growing supplier, our compliance solutions scale with your needs.</p>
          </div>
          <div className="space-y-6">
            {[
              { icon: <Target size={24} className="text-gs-green" />, title: 'Large Enterprises & OEMs', body: 'Managing compliance across dozens of product lines, multiple markets, and thousands of suppliers requires a systematic approach. We provide enterprise-grade compliance management, from IMDS data governance to multi-regulation substance screening programs. Our team integrates seamlessly with your existing ERP and PLM systems to deliver compliance data where you need it.' },
              { icon: <Users size={24} className="text-gs-green" />, title: 'Mid-Size Manufacturers', body: 'You need compliance without the overhead of a full in-house team. GS Comply Solutions acts as your dedicated compliance department — handling declarations, submissions, and regulatory monitoring at a fraction of the cost of hiring specialist staff. We scale our support up or down to match your project pipeline and seasonal demands.' },
              { icon: <Leaf size={24} className="text-gs-green" />, title: 'Suppliers & SMEs', body: 'Your customers are asking for compliance documentation and you need expert help fast. We guide small and mid-size suppliers through every requirement, from REACH SVHC declarations to RoHS conformance statements and IMDS MDS submissions. Our experience with customer portals and data formats means we speak your customer\'s compliance language.' },
            ].map(({ icon, title, body }) => (
              <div key={title} className="flex gap-6 p-6 rounded-xl bg-white hover:bg-gs-light transition-colors border border-gs-border">
                <div className="w-12 h-12 bg-gs-light rounded-xl flex items-center justify-center flex-shrink-0">{icon}</div>
                <div>
                  <h3 className="text-lg font-bold text-gs-charcoal mb-2">{title}</h3>
                  <p className="text-sm text-gs-slate leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── LATEST INSIGHTS ─── */}
      <section className="py-16 md:py-24 bg-gs-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gs-charcoal mb-4">Latest Compliance Insights</h2>
            <p className="text-gs-slate max-w-2xl mx-auto">Stay ahead of regulatory changes with expert analysis, updates, and guides from our team.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.slice(0, 3).map((post) => (
              <BlogCard key={post.slug} title={post.title} excerpt={post.excerpt} category={post.category} author={post.author} date={post.date} readTime={post.readTime} slug={post.slug} tags={post.tags} image={post.image} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/insights" className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gs-green text-gs-green font-semibold rounded-lg hover:bg-gs-green hover:text-white transition-all duration-200">
              View All Insights <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <CTABanner
        headline="Ready to Simplify Your Compliance Journey?"
        subtext="Talk to our experts today and get a customized compliance roadmap for your business."
        buttonText="Schedule a Free Consultation"
        buttonLink="/contact"
      />

      {/* ─── CONTACT TEASER ─── */}
      <section className="py-12 bg-gs-gray">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-gs-slate mb-6 text-sm font-medium">Or reach us directly</p>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="mailto:info.gscomply@gmail.com" className="flex items-center gap-2 text-gs-charcoal hover:text-gs-green transition-colors">
              <span className="text-gs-green">✉</span><span className="text-sm">info.gscomply@gmail.com</span>
            </a>
            <a href="tel:+917010372791" className="flex items-center gap-2 text-gs-charcoal hover:text-gs-green transition-colors">
              <span className="text-gs-green">📞</span><span className="text-sm">+91 70103 72791</span>
            </a>
          </div>
          <p className="text-xs text-gs-slate mt-6">We typically respond within 1 business day.</p>
        </div>
      </section>
    </>
  );
}
