import { Target, Users, Leaf, Eye, CheckCircle } from 'lucide-react';
import SEO from '../components/SEO';
import CTABanner from '../components/CTABanner';
import services from '../data/services';

export default function About() {
  return (
    <>
      <SEO
        title="About Us"
        description="GS Comply Solutions is a team of regulatory experts helping businesses navigate product compliance worldwide. Learn about our mission, values, and commitment to compliance excellence."
        keywords="compliance consulting team, regulatory experts, product compliance company, REACH RoHS consultants, sustainability advisors"
        canonicalPath="/about"
        type="website"
      />
      {/* Hero */}
      <section className="py-20 md:py-28" style={{ background: 'linear-gradient(135deg, #1A6B3C 0%, #0F4A2A 100%)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-xs font-semibold tracking-widest text-gs-mint uppercase mb-4 bg-white/10 px-4 py-2 rounded-full">
            About Us
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 leading-tight">
            We Are GS Comply Solutions
          </h1>
          <p className="text-lg text-white/85 max-w-3xl mx-auto leading-relaxed">
            A dedicated team of compliance experts helping businesses navigate global regulations with confidence, clarity, and a commitment to sustainable commerce.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-semibold tracking-widest text-gs-green uppercase mb-3 block">Our Story</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-gs-charcoal mb-5">
                Born from a Passion for Compliance Excellence
              </h2>
              <p className="text-gs-slate leading-relaxed mb-5">
                Founded with a mission to demystify product compliance, GS Comply Solutions brings together regulatory experts, data specialists, and industry veterans to deliver compliance solutions that protect your business and accelerate your market access. We understand that compliance is not just a legal obligation it's a strategic advantage.
              </p>
              <p className="text-gs-slate leading-relaxed mb-5">
                Our team has supported companies across automotive, electronics, consumer goods, chemicals, and industrial manufacturing in meeting their obligations under the world's most demanding regulatory frameworks REACH, RoHS, PFAS, TSCA, ELV, and more.
              </p>
              <p className="text-gs-slate leading-relaxed">
                We believe that every company, regardless of size, deserves access to expert compliance guidance. That's why we serve everyone from global OEMs managing thousands of supplier relationships to small suppliers receiving their first SVHC declaration request. Our approach is always practical, clear, and tailored to your specific situation.
              </p>
            </div>
            <div className="relative h-80 rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #1A6B3C 0%, #0F4A2A 100%)' }}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white px-8">
                  <p className="text-5xl font-extrabold mb-2">10+</p>
                  <p className="text-lg font-semibold text-gs-mint mb-4">Global Regulations Covered</p>
                  <p className="text-sm text-white/70">Supporting businesses across automotive, electronics, consumer goods, chemicals, and industrial manufacturing.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gs-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-8 border-l-4 border-gs-green shadow-gs-card">
              <div className="w-12 h-12 bg-gs-light rounded-xl flex items-center justify-center mb-4">
                <Target size={24} className="text-gs-green" />
              </div>
              <h3 className="text-xl font-bold text-gs-charcoal mb-4">Our Mission</h3>
              <p className="text-gs-slate leading-relaxed">
                To empower businesses worldwide with the compliance knowledge, tools, and support they need to operate responsibly and competitively in global markets. We simplify complexity, reduce risk, and help our clients turn regulatory obligations into strategic advantages.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 border-l-4 border-gs-mint shadow-gs-card">
              <div className="w-12 h-12 bg-gs-light rounded-xl flex items-center justify-center mb-4">
                <Eye size={24} className="text-gs-green" />
              </div>
              <h3 className="text-xl font-bold text-gs-charcoal mb-4">Our Vision</h3>
              <p className="text-gs-slate leading-relaxed">
                A world where regulatory compliance is not a barrier but a competitive advantage that drives sustainable business growth. We envision global supply chains where substance data flows transparently, hazardous materials are systematically eliminated, and product compliance supports rather than hinders innovation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gs-charcoal mb-4">Our Core Values</h2>
            <p className="text-gs-slate max-w-2xl mx-auto">
              These principles guide everything we do from how we engage with clients to how we stay current with the ever evolving regulatory landscape.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Target size={24} className="text-gs-green" />,
                title: 'Precision',
                body: 'Accuracy in every declaration, submission, and regulatory interpretation. We leave no room for error in compliance documentation because the consequences of errors are real and costly.',
              },
              {
                icon: <Users size={24} className="text-gs-green" />,
                title: 'Partnership',
                body: 'We work as a seamless extension of your team, integrating with your processes, responding to your needs, and building longterm relationships based on trust and shared success.',
              },
              {
                icon: <Leaf size={24} className="text-gs-green" />,
                title: 'Sustainability',
                body: 'Compliance that supports a healthier planet. We believe responsible business and environmental stewardship go hand in hand and that eliminating hazardous substances creates better products for everyone.',
              },
              {
                icon: <Eye size={24} className="text-gs-green" />,
                title: 'Transparency',
                body: 'Clear, honest guidance at every step. No jargon, no surprises just straightforward compliance expertise communicated in language your team can understand and act on.',
              },
            ].map(({ icon, title, body }) => (
              <div key={title} className="bg-gs-gray rounded-xl p-6 hover:bg-gs-light transition-colors">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-4 shadow-sm">
                  {icon}
                </div>
                <h3 className="text-base font-bold text-gs-charcoal mb-3">{title}</h3>
                <p className="text-sm text-gs-slate leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section className="py-16 bg-gs-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gs-charcoal mb-4">Deep Expertise Across Global Regulations</h2>
            <p className="text-gs-slate max-w-2xl mx-auto">
              Our team has hands-on experience with the most demanding regulatory frameworks in the world.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {services.map((s) => (
              <div key={s.slug} className="flex items-start gap-4 p-4 bg-white rounded-xl border-l-4 border-gs-green shadow-sm">
                <span className="text-xl font-extrabold text-gs-green w-16 flex-shrink-0">{s.acronym}</span>
                <div>
                  <p className="text-sm font-semibold text-gs-charcoal mb-1">{s.name}</p>
                  <p className="text-xs text-gs-slate leading-relaxed">{s.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team - Hidden for now, will be added in future */}
      {/*
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gs-charcoal mb-4">Our Expert Team</h2>
            <p className="text-gs-slate max-w-2xl mx-auto">
              Our compliance specialists bring decades of combined experience across regulatory affairs, supply chain management, and sustainability reporting.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map(({ name, title, initials }) => (
              <div key={name} className="bg-gs-gray rounded-xl p-6 text-center hover:shadow-gs-card transition-shadow">
                <div
                  className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-xl font-bold text-white"
                  style={{ background: 'linear-gradient(135deg, #1A6B3C 0%, #2E9E5B 100%)' }}
                >
                  {initials}
                </div>
                <h3 className="text-sm font-bold text-gs-charcoal mb-1">{name}</h3>
                <p className="text-xs text-gs-slate mb-3">{title}</p>
                <button className="p-2 rounded-lg bg-white border border-gs-border hover:border-gs-green transition-colors mx-auto block" aria-label="LinkedIn">
                  <Linkedin size={14} className="text-gs-slate" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
      */}

      {/* Why work with us */}
      <section className="py-16 bg-gs-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gs-charcoal mb-8 text-center">
            Why Work With GS Comply Solutions?
          </h2>
          <div className="space-y-4">
            {[
              'Deep expertise across 10+ major global regulations, maintained with active regulatory monitoring',
              'Experienced team of dedicated compliance specialists with proven track records',
              'Fast turnaround on substance declarations, IMDS submissions, and SCIP notifications',
              'Scalable support model from one-off declaration support to full compliance program management',
              'Transparent pricing and engagement models with no hidden fees or scope creep',
              'Technology enabled delivery combining regulatory expertise with compliance management systems',
            ].map((point) => (
              <div key={point} className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm border border-gs-border">
                <CheckCircle size={18} className="text-gs-green flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gs-charcoal">{point}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        headline="Work With Our Experts — Get Started Today"
        subtext="Ready to build a proactive compliance program? Our team is here to help you navigate every regulation, every platform, every market."
        buttonText="Contact Our Team"
        buttonLink="/contact"
      />
    </>
  );
}
