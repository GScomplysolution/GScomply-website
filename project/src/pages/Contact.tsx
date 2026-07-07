import { useState, useRef } from 'react';
import { Mail, Phone, Clock, CheckCircle, ChevronDown, Loader2, Linkedin } from 'lucide-react';
import { supabase } from '../lib/supabase';
import SEO, { generateFAQStructuredData, generateLocalBusinessStructuredData } from '../components/SEO';

const industries = [
  'Automotive', 'Electronics & Electrical', 'Consumer Products & Household',
  'Chemicals & Materials', 'Aerospace', 'Medical Devices', 'Construction & Building Materials',
  'Packaging & Plastics', 'HVAC & Refrigeration', 'Other',
];

const faqs = [
  {
    q: 'What is the difference between REACH and RoHS compliance?',
    a: 'REACH (Regulation EC 1907/2006) is a broad chemicals regulation covering substances in mixtures and articles across all industries, requiring registration, evaluation, authorization, and restriction of chemicals. RoHS (Directive 2011/65/EU) is a specific directive restricting 10 named hazardous substances in electrical and electronic equipment (EEE) and requires CE marking. While both cover hazardous substance restrictions, REACH has a much broader scope — covering all product types, not just EEE — and includes additional obligations like SVHC declaration and SCIP database notification that RoHS does not.',
  },
  {
    q: 'How long does it take to complete a REACH SVHC declaration?',
    a: 'The timeline for REACH SVHC declarations depends on the complexity of your product portfolio and supply chain. For a single product with a clear bill of materials, a supplier SVHC declaration can be completed in 1–2 weeks. For a complex product portfolio requiring systematic supply chain data collection from multiple suppliers, a comprehensive SVHC screening program typically takes 4–12 weeks depending on supplier response rates. GS Comply Solutions offers both rapid-response declaration support and systematic portfolio screening programs to match your timeline requirements.',
  },
  {
    q: 'Do I need to submit to the SCIP database if I\'m not an EU company?',
    a: 'Yes — the SCIP notification obligation applies to any company placing articles on the EU market, regardless of where the company is headquartered. If you manufacture in Asia, North America, or elsewhere and export articles to EU customers or distributors, and those articles contain SVHCs above 0.1% w/w, you are required to submit SCIP notifications to ECHA. The obligation is triggered by placing articles on the EU market, not by the location of the manufacturer.',
  },
  {
    q: 'What substances are restricted under California Proposition 65?',
    a: 'California Proposition 65 currently lists over 800 chemicals known to cause cancer, birth defects, or other reproductive harm. Key substances of concern for manufacturers include: lead and lead compounds, cadmium compounds, mercury, benzene, formaldehyde, acrylamide (from certain manufacturing and food processes), phthalates (DEHP, DBP, BBP), bisphenol A (BPA), and many others. OEHHA adds new chemicals throughout the year — in 2024-2025, significant additions included titanium dioxide (airborne, respirable particles) and certain PFAS substances. Businesses must assess their products against the complete current list and provide warnings where consumer exposures exceed established thresholds.',
  },
  {
    q: 'Can GS Comply Solutions help with both IMDS and SCIP submissions?',
    a: 'Yes — we provide expert support for both IMDS (International Material Data System) and SCIP database submissions, along with CDX and CAMDS. Our platform team has hands-on experience with each system\'s data format requirements, submission processes, and validation rules. We can support you with one-off submissions, ongoing submission management, error resolution, and full platform program management. Many of our clients use our combined IMDS + SCIP services to address both automotive ELV/GADSL obligations and EU Waste Framework Directive SVHC notification requirements simultaneously.',
  },
  {
    q: 'How do I know which regulations apply to my products?',
    a: 'Determining regulatory applicability requires analysis of several factors: the type of product (chemical substance, mixture, or article), the materials and substances it contains, the markets where it will be sold, the industries it will be used in, and any specific applications or end uses. A comprehensive regulatory mapping exercise considers all of these factors. GS Comply Solutions offers regulatory gap analysis services that systematically assess your product portfolio against all potentially applicable regulations — providing a clear compliance roadmap prioritized by risk and deadline. Contact us for a free initial consultation to discuss your specific product types and markets.',
  },
];

export default function Contact() {
  const faqSchema = generateFAQStructuredData(faqs);
  const localBusinessSchema = generateLocalBusinessStructuredData();
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [industryOther, setIndustryOther] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    setLoading(true);

    const formData = new FormData(formRef.current);
    const displayIndustry = selectedIndustry === 'Other' ? industryOther : selectedIndustry;

    const submission = {
      full_name: formData.get('full_name') as string,
      company: formData.get('company') as string,
      email: formData.get('email') as string,
      phone: (formData.get('phone') as string) || null,
      industry: displayIndustry || null,
      industry_other: selectedIndustry === 'Other' ? industryOther || null : null,
      message: (formData.get('message') as string) || null,
    };

    try {
      // Save to database
      const { error: dbError } = await supabase.from('contact_submissions').insert(submission);
      if (dbError) throw dbError;

      // Send emails via Resend edge function
      await supabase.functions.invoke('email-sender', {
        body: {
          type: 'contact',
          data: submission,
        },
      });

      setStatus('success');
      formRef.current.reset();
      setSelectedIndustry('');
      setIndustryOther('');
    } catch (err) {
      console.error('Submission error:', err);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Contact Us for Free Compliance Consultation"
        description="Get expert help with REACH, RoHS, PFAS, IMDS, SCIP and other product compliance regulations. Request a free consultation from GS Comply Solutions — we respond within 1 business day."
        keywords="compliance consultation, REACH compliance help, RoHS consulting, product compliance services, regulatory compliance support, SCIP database assistance"
        canonicalPath="/contact"
        type="website"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />

      {/* Hero */}
      <section className="py-20 md:py-28" style={{ background: 'linear-gradient(135deg, #1A6B3C 0%, #0F4A2A 100%)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-xs font-semibold tracking-widest text-gs-mint uppercase mb-4 bg-white/10 px-4 py-2 rounded-full">
            Get In Touch
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 leading-tight">
            Let's Talk Compliance
          </h1>
          <p className="text-lg text-white/85 max-w-3xl mx-auto leading-relaxed">
            Whether you need a quick question answered or a full compliance audit, we're here to help. Fill out the form and we'll get back to you within 1 business day.
          </p>
        </div>
      </section>

      {/* Form + Info */}
      <section className="py-16 bg-gs-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Form */}
            <div className="lg:col-span-2">
              {status === 'success' ? (
                <div className="bg-white rounded-2xl p-10 shadow-gs-card text-center">
                  <div className="w-16 h-16 bg-gs-light rounded-full flex items-center justify-center mx-auto mb-5">
                    <CheckCircle size={32} className="text-gs-green" />
                  </div>
                  <h3 className="text-xl font-bold text-gs-charcoal mb-3">Thank You!</h3>
                  <p className="text-gs-slate">
                    We've received your request and will be in touch within 1 business day. In the meantime, explore our{' '}
                    <a href="/insights" className="text-gs-green hover:underline">compliance insights</a> for expert regulatory guidance.
                  </p>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-gs-card space-y-5">
                  <h2 className="text-xl font-bold text-gs-charcoal mb-2">Request a Free Consultation</h2>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="full_name" className="block text-sm font-medium text-gs-charcoal mb-1.5">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="full_name"
                        name="full_name"
                        type="text"
                        required
                        placeholder="Jane Smith"
                        className="w-full px-4 py-2.5 border border-gs-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gs-green/30 focus:border-gs-green"
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gs-charcoal mb-1.5">
                        Company Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        required
                        placeholder="Acme Corporation"
                        className="w-full px-4 py-2.5 border border-gs-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gs-green/30 focus:border-gs-green"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gs-charcoal mb-1.5">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="jane@company.com"
                        className="w-full px-4 py-2.5 border border-gs-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gs-green/30 focus:border-gs-green"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gs-charcoal mb-1.5">
                        Phone Number <span className="text-xs text-gs-slate">(Optional)</span>
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+1 555 000 0000"
                        className="w-full px-4 py-2.5 border border-gs-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gs-green/30 focus:border-gs-green"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="industry" className="block text-sm font-medium text-gs-charcoal mb-1.5">
                        Industry <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <select
                          id="industry"
                          name="industry"
                          required
                          value={selectedIndustry}
                          onChange={(e) => setSelectedIndustry(e.target.value)}
                          className="w-full px-4 py-2.5 border border-gs-border rounded-lg text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-gs-green/30 focus:border-gs-green bg-white"
                        >
                          <option value="">Select industry...</option>
                          {industries.map((i) => <option key={i} value={i}>{i}</option>)}
                        </select>
                        <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gs-slate pointer-events-none" />
                      </div>
                    </div>
                    {selectedIndustry === 'Other' && (
                      <div>
                        <label htmlFor="industry_other" className="block text-sm font-medium text-gs-charcoal mb-1.5">
                          Please specify your industry <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="industry_other"
                          name="industry_other"
                          type="text"
                          required
                          value={industryOther}
                          onChange={(e) => setIndustryOther(e.target.value)}
                          placeholder="Enter your industry"
                          className="w-full px-4 py-2.5 border border-gs-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gs-green/30 focus:border-gs-green"
                        />
                      </div>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gs-charcoal mb-1.5">
                      Describe your compliance needs
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      placeholder="Tell us about your products, the regulations you need help with, and any specific challenges you're facing..."
                      className="w-full px-4 py-2.5 border border-gs-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gs-green/30 focus:border-gs-green resize-none"
                    />
                  </div>

                  {status === 'error' && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                      Something went wrong. Please try again or email us at{' '}
                      <a href="mailto:info.gscomply@gmail.com" className="font-semibold underline">info.gscomply@gmail.com</a>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-gs-green text-white font-semibold rounded-lg hover:bg-gs-emerald transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      'Request My Free Consultation'
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Contact info */}
            <aside className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-gs-card">
                <h3 className="text-base font-bold text-gs-charcoal mb-5">Contact Information</h3>
                <ul className="space-y-4">
                  <li>
                    <a href="mailto:info.gscomply@gmail.com" className="flex items-start gap-3 group">
                      <div className="w-9 h-9 bg-gs-light rounded-lg flex items-center justify-center flex-shrink-0">
                        <Mail size={16} className="text-gs-green" />
                      </div>
                      <div>
                        <p className="text-xs text-gs-slate">Email</p>
                        <p className="text-sm font-medium text-gs-charcoal group-hover:text-gs-green transition-colors">info.gscomply@gmail.com</p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="tel:+917010372791" className="flex items-start gap-3 group">
                      <div className="w-9 h-9 bg-gs-light rounded-lg flex items-center justify-center flex-shrink-0">
                        <Phone size={16} className="text-gs-green" />
                      </div>
                      <div>
                        <p className="text-xs text-gs-slate">Phone</p>
                        <p className="text-sm font-medium text-gs-charcoal group-hover:text-gs-green transition-colors">+91 70103 72791</p>
                      </div>
                    </a>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-9 h-9 bg-gs-light rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock size={16} className="text-gs-green" />
                    </div>
                    <div>
                      <p className="text-xs text-gs-slate">Office Hours</p>
                      <p className="text-sm font-medium text-gs-charcoal">Monday–Friday</p>
                      <p className="text-xs text-gs-slate">9:00 AM – 6:00 PM IST</p>
                    </div>
                  </li>
                  <li>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 group">
                      <div className="w-9 h-9 bg-gs-light rounded-lg flex items-center justify-center flex-shrink-0">
                        <Linkedin size={16} className="text-gs-green" />
                      </div>
                      <div>
                        <p className="text-xs text-gs-slate">LinkedIn</p>
                        <p className="text-sm font-medium text-gs-charcoal group-hover:text-gs-green transition-colors">GS Comply Solutions</p>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>

              <div className="bg-gs-light rounded-2xl p-6 border border-gs-border">
                <h3 className="text-sm font-bold text-gs-charcoal mb-4">Why GS Comply Solutions?</h3>
                <ul className="space-y-3">
                  {[
                    '10+ global regulations covered end-to-end',
                    'Experienced team of compliance specialists',
                    'Fast turnaround on declarations and submissions',
                    'Scalable support for businesses of all sizes',
                    'Transparent pricing, no hidden fees',
                  ].map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <CheckCircle size={14} className="text-gs-green flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-gs-charcoal">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gs-charcoal mb-4">Frequently Asked Questions</h2>
            <p className="text-gs-slate">Common questions about our compliance services and the regulations we cover.</p>
          </div>
          <div className="space-y-3">
            {faqs.map(({ q, a }, i) => (
              <div key={i} className="bg-gs-gray rounded-xl overflow-hidden border border-gs-border">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gs-light transition-colors"
                  aria-expanded={openFaq === i}
                >
                  <span className="text-sm font-semibold text-gs-charcoal pr-4">{q}</span>
                  <ChevronDown
                    size={18}
                    className={`text-gs-green flex-shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5">
                    <p className="text-sm text-gs-slate leading-relaxed">{a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
