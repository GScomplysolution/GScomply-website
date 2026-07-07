import { useState } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle, Loader2 } from 'lucide-react';
import BlogCard from '../components/BlogCard';
import SEO, { generateBreadcrumbStructuredData } from '../components/SEO';
import blogPosts from '../data/blogPosts';
import { supabase } from '../lib/supabase';

const categories = ['All', 'Regulations', 'Platform Guides', 'Industry News', 'Best Practices'];

function InsightsNewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      // Save to database
      const { error: dbError } = await supabase
        .from('newsletter_subscribers')
        .upsert({ email }, { onConflict: 'email' });
      if (dbError) throw dbError;

      // Send emails via Resend edge function
      await supabase.functions.invoke('email-sender', {
        body: {
          type: 'newsletter',
          data: { email, source: 'Insights Page' },
        },
      });

      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="flex items-center gap-2 text-sm text-gs-green">
        <CheckCircle size={16} />
        <span>Subscribed! Check your inbox.</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        placeholder="Your email address"
        className="w-full px-3 py-2.5 text-sm border border-gs-border rounded-lg focus:outline-none focus:ring-2 focus:ring-gs-green/30"
        aria-label="Email for newsletter"
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full py-2.5 bg-gs-green text-white text-sm font-medium rounded-lg hover:bg-gs-emerald transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
      >
        {status === 'loading' ? <Loader2 size={16} className="animate-spin" /> : 'Subscribe'}
      </button>
    </form>
  );
}

export default function Insights() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? blogPosts
    : blogPosts.filter((p) => p.category === activeCategory);

  const breadcrumbSchema = generateBreadcrumbStructuredData([
    { name: 'Home', path: '/' },
    { name: 'Insights', path: '/insights' },
  ]);

  return (
    <>
      <SEO
        title="Compliance Insights & Regulatory Updates"
        description="Expert analysis on REACH, RoHS, PFAS, IMDS, SCIP and other regulatory developments. Stay ahead of global product compliance changes with our compliance insights."
        keywords="compliance blog, regulatory news, REACH updates, RoHS guidance, PFAS regulations, IMDS tips, compliance best practices"
        canonicalPath="/insights"
        type="website"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {/* Hero */}
      <section className="py-20 md:py-28" style={{ background: 'linear-gradient(135deg, #1A6B3C 0%, #0F4A2A 100%)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-xs font-semibold tracking-widest text-gs-mint uppercase mb-4 bg-white/10 px-4 py-2 rounded-full">
            Knowledge Hub
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 leading-tight">
            Compliance Insights & Regulatory Updates
          </h1>
          <p className="text-lg text-white/85 max-w-3xl mx-auto leading-relaxed">
            Expert analysis, regulatory news, and practical guides to keep your business ahead of compliance requirements worldwide.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="py-12 bg-gs-gray min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter pills */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-gs-green text-white shadow-sm'
                    : 'bg-white text-gs-slate border border-gs-border hover:border-gs-green hover:text-gs-green'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Articles grid */}
            <div className="lg:col-span-3">
              {filtered.length === 0 ? (
                <div className="text-center py-16 text-gs-slate">
                  No articles found in this category yet.
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filtered.map((post) => (
                    <BlogCard
                      key={post.slug}
                      title={post.title}
                      excerpt={post.excerpt}
                      category={post.category}
                      author={post.author}
                      date={post.date}
                      readTime={post.readTime}
                      slug={post.slug}
                      tags={post.tags}
                      image={post.image}
                    />
                  ))}
                </div>
              )}

              {/* Pagination */}
              <div className="flex items-center justify-center gap-2 mt-10">
                <button className="p-2 rounded-lg border border-gs-border text-gs-slate hover:border-gs-green hover:text-gs-green transition-colors" aria-label="Previous page">
                  <ChevronLeft size={18} />
                </button>
                {[1].map((n) => (
                  <button
                    key={n}
                    className="w-9 h-9 rounded-lg text-sm font-medium bg-gs-green text-white"
                  >
                    {n}
                  </button>
                ))}
                <button className="p-2 rounded-lg border border-gs-border text-gs-slate hover:border-gs-green hover:text-gs-green transition-colors" aria-label="Next page">
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-6">
              {/* Popular posts */}
              <div className="bg-white rounded-xl p-5 border border-gs-border">
                <h3 className="text-sm font-bold text-gs-charcoal mb-4 uppercase tracking-wider">Popular Posts</h3>
                <ul className="space-y-3">
                  {blogPosts.slice(0, 3).map((post) => (
                    <li key={post.slug}>
                      <a
                        href={`/insights/${post.slug}`}
                        className="text-xs text-gs-charcoal hover:text-gs-green transition-colors leading-snug block"
                      >
                        {post.title}
                      </a>
                      <span className="text-xs text-gs-slate">{post.category}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Newsletter */}
              <div className="bg-gs-light rounded-xl p-5 border border-gs-border">
                <h3 className="text-sm font-bold text-gs-charcoal mb-2">Get Regulatory Updates in Your Inbox</h3>
                <p className="text-xs text-gs-slate mb-4">Expert compliance news, regulation alerts, and practical guides — delivered to you.</p>
                <InsightsNewsletterForm />
                <p className="text-xs text-gs-slate mt-2">No spam. Unsubscribe anytime.</p>
              </div>

              {/* Categories */}
              <div className="bg-white rounded-xl p-5 border border-gs-border">
                <h3 className="text-sm font-bold text-gs-charcoal mb-4 uppercase tracking-wider">Categories</h3>
                <ul className="space-y-2">
                  {categories.slice(1).map((cat) => {
                    const count = blogPosts.filter((p) => p.category === cat).length;
                    return (
                      <li key={cat}>
                        <button
                          onClick={() => setActiveCategory(cat)}
                          className="flex items-center justify-between w-full text-xs text-gs-charcoal hover:text-gs-green transition-colors"
                        >
                          <span>{cat}</span>
                          <span className="bg-gs-light text-gs-green px-2 py-0.5 rounded-full">{count}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
