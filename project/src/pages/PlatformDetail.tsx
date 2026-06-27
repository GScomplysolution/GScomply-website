import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowRight, ChevronRight, CheckCircle, Globe, Database, Car, Package } from 'lucide-react';
import CTABanner from '../components/CTABanner';
import platforms from '../data/platforms';

const iconMap: Record<string, React.ReactNode> = {
  Car: <Car size={32} />,
  Database: <Database size={32} />,
  Package: <Package size={32} />,
  Globe: <Globe size={32} />,
};

const coverImages: Record<string, string> = {
  imds: 'https://images.pexels.com/photos/3807386/pexels-photo-3807386.jpeg?auto=compress&cs=tinysrgb&w=1920',
  cdx: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1920',
  camds: 'https://images.pexels.com/photos/110854/pexels-photo-110854.jpeg?auto=compress&cs=tinysrgb&w=1920',
  scip: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=1920',
};

export default function PlatformDetail() {
  const { slug } = useParams<{ slug: string }>();
  const platform = platforms.find((p) => p.slug === slug);

  if (!platform) return <Navigate to="/services#platforms" replace />;

  const coverImage = coverImages[slug || ''] || 'https://images.pexels.com/photos/110854/pexels-photo-110854.jpeg?auto=compress&cs=tinysrgb&w=1920';

  return (
    <>
      {/* Hero with Cover Image */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={coverImage}
            alt={platform.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(26, 107, 60, 0.95) 0%, rgba(15, 74, 42, 0.9) 100%)' }} />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Breadcrumb */}
          <nav className="flex items-center justify-center gap-1.5 text-xs text-white/60 mb-6" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link to="/services#platforms" className="hover:text-white transition-colors">Platforms</Link>
            <ChevronRight size={12} />
            <span className="text-white">{platform.acronym}</span>
          </nav>

          <div className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center text-white bg-white/15">
            {iconMap[platform.icon]}
          </div>

          <span className="inline-block text-3xl sm:text-4xl font-extrabold text-gs-mint mb-4">{platform.acronym}</span>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6 leading-tight">
            {platform.name}
          </h1>
          <p className="text-base text-white/85 leading-relaxed max-w-2xl mx-auto mb-6">
            {platform.description}
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <span className="text-sm bg-white/15 text-white px-4 py-2 rounded-full border border-white/30">
              {platform.industry}
            </span>
            <span className="text-sm bg-white/15 text-white px-4 py-2 rounded-full border border-white/30">
              Managed by: {platform.managedBy}
            </span>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-gs max-w-none">
            <h2 className="text-2xl font-bold text-gs-charcoal mb-6">What is {platform.acronym}?</h2>
            <div className="text-gs-slate leading-relaxed whitespace-pre-line text-sm">
              {platform.whatItDoes}
            </div>
          </div>
        </div>
      </section>

      {/* Key Facts */}
      <section className="py-12 bg-gs-gray">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-gs-charcoal mb-8 text-center">Key Facts</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Industry', value: platform.industry },
              { label: 'Regulatory Basis', value: platform.regulatoryBasis },
              { label: 'Who Must Submit', value: platform.whoMustSubmit },
              { label: 'Data Type', value: platform.dataType },
            ].map(({ label, value }) => (
              <div key={label} className="bg-white rounded-xl p-5 border border-gs-border">
                <p className="text-xs font-semibold text-gs-green uppercase tracking-wider mb-2">{label}</p>
                <p className="text-sm text-gs-charcoal font-medium">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Help */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold tracking-widest text-gs-green uppercase mb-3 block">Our Services</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gs-charcoal">How GS Comply Helps with {platform.acronym}</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {platform.howWeHelp.map((item, idx) => (
              <div key={item.title} className="bg-gs-gray rounded-xl p-6 border-l-4 border-gs-green hover:shadow-gs-card transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gs-green rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gs-charcoal mb-2">{item.title}</h3>
                    <p className="text-sm text-gs-slate leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Managed By */}
      <section className="py-12 bg-gs-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-3 bg-white rounded-xl border border-gs-border">
            <Globe size={20} className="text-gs-green" />
            <span className="text-sm text-gs-charcoal">
              <span className="font-semibold">Platform Managed By:</span> {platform.managedBy}
            </span>
          </div>
        </div>
      </section>

      <CTABanner
        headline={`Need Help with ${platform.acronym}?`}
        subtext={`Our platform specialists are ready to support your ${platform.acronym} compliance needs — from account setup to complex submission challenges.`}
        buttonText={`Get ${platform.acronym} Support`}
        buttonLink="/contact"
      />
    </>
  );
}
