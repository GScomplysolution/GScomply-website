import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Calendar, Clock, ArrowLeft, Linkedin, Twitter, Link2 } from 'lucide-react';
import BlogCard from '../components/BlogCard';
import SEO, { generateArticleStructuredData, generateBreadcrumbStructuredData } from '../components/SEO';
import NotFound from './NotFound';
import blogPosts from '../data/blogPosts';

function renderContent(content: string) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={i} id={line.slice(3).replace(/\s+/g, '-').toLowerCase()} className="text-2xl font-bold text-gs-charcoal mt-10 mb-4">
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith('### ')) {
      elements.push(
        <h3 key={i} className="text-lg font-bold text-gs-charcoal mt-6 mb-3">
          {line.slice(4)}
        </h3>
      );
    } else if (line.startsWith('**') && line.endsWith('**') && line.length > 4) {
      elements.push(
        <p key={i} className="font-semibold text-gs-charcoal mb-3">
          {line.slice(2, -2)}
        </p>
      );
    } else if (line.startsWith('- ')) {
      // Collect consecutive list items
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith('- ')) {
        items.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`} className="border-l-4 border-gs-green bg-gs-light rounded-r-lg pl-5 pr-4 py-3 mb-4 space-y-1">
          {items.map((item, j) => (
            <li key={j} className="text-sm text-gs-charcoal">
              <span dangerouslySetInnerHTML={{
                __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
              }} />
            </li>
          ))}
        </ul>
      );
      continue;
    } else if (line.trim() === '') {
      // skip empty lines
    } else {
      // Regular paragraph — handle inline bold
      const html = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      elements.push(
        <p key={i} className="text-base text-gs-charcoal leading-relaxed mb-4"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      );
    }
    i++;
  }

  return elements;
}

function getH2Headings(content: string) {
  return content
    .split('\n')
    .filter((line) => line.startsWith('## '))
    .map((line) => ({
      text: line.slice(3),
      id: line.slice(3).replace(/\s+/g, '-').toLowerCase(),
    }));
}

export default function InsightPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) return <NotFound />;

  const related = blogPosts.filter((p) => p.slug !== slug && (p.category === post.category || p.relatedRegulation === post.relatedRegulation)).slice(0, 3);
  const headings = getH2Headings(post.content);
  const formatted = new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const articleSchema = generateArticleStructuredData(post);
  const breadcrumbSchema = generateBreadcrumbStructuredData([
    { name: 'Home', path: '/' },
    { name: 'Insights', path: '/insights' },
    { name: post.title, path: `/insights/${post.slug}` },
  ]);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href).catch(() => {});
  };

  return (
    <>
      <SEO
        title={post.title}
        description={post.excerpt}
        keywords={post.tags.join(', ')}
        canonicalPath={`/insights/${post.slug}`}
        type="article"
        image={post.image}
        publishedTime={post.date}
        author={post.author}
        section={post.category}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section className="py-16 md:py-20" style={{ background: 'linear-gradient(135deg, #1A6B3C 0%, #0F4A2A 100%)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-xs text-white/60 mb-6" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link to="/insights" className="hover:text-white transition-colors">Insights</Link>
            <ChevronRight size={12} />
            <span className="text-white truncate max-w-[200px]">{post.title}</span>
          </nav>
          <span className="inline-block px-3 py-1 bg-gs-mint text-white text-xs font-semibold rounded-full mb-5">
            {post.category}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-6 leading-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-white/70">
            <span className="flex items-center gap-1.5">
              <div className="w-7 h-7 rounded-full bg-gs-mint/30 flex items-center justify-center text-xs font-bold text-white">
                GS
              </div>
              {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {formatted}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              {post.readTime} min read
            </span>
          </div>
        </div>
      </section>

      {/* Article content */}
      <section className="py-12 bg-gs-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Article */}
            <article className="lg:col-span-3">
              <Link
                to="/insights"
                className="inline-flex items-center gap-1.5 text-sm text-gs-green hover:text-gs-emerald transition-colors mb-6"
              >
                <ArrowLeft size={16} />
                Back to Knowledge Hub
              </Link>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-gs-light text-gs-green px-3 py-1 rounded-full border border-gs-border">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-gs-card">
                {renderContent(post.content)}
              </div>

              {/* Social share */}
              <div className="flex items-center gap-3 mt-6">
                <span className="text-sm text-gs-slate font-medium">Share:</span>
                <button
                  onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`)}
                  className="flex items-center gap-1.5 px-3 py-2 bg-[#0A66C2] text-white text-xs rounded-lg hover:opacity-90 transition-opacity"
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin size={14} />
                  LinkedIn
                </button>
                <button
                  onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`)}
                  className="flex items-center gap-1.5 px-3 py-2 bg-black text-white text-xs rounded-lg hover:opacity-90 transition-opacity"
                  aria-label="Share on X"
                >
                  <Twitter size={14} />
                  Share
                </button>
                <button
                  onClick={copyLink}
                  className="flex items-center gap-1.5 px-3 py-2 bg-gs-gray border border-gs-border text-gs-charcoal text-xs rounded-lg hover:border-gs-green hover:text-gs-green transition-colors"
                  aria-label="Copy link"
                >
                  <Link2 size={14} />
                  Copy Link
                </button>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-5">
              {/* Table of contents */}
              {headings.length > 0 && (
                <div className="bg-white rounded-xl p-5 border border-gs-border sticky top-20">
                  <h3 className="text-xs font-bold text-gs-charcoal uppercase tracking-wider mb-3">Table of Contents</h3>
                  <ul className="space-y-2">
                    {headings.map(({ text, id }) => (
                      <li key={id}>
                        <a
                          href={`#${id}`}
                          className="text-xs text-gs-slate hover:text-gs-green transition-colors leading-snug block"
                        >
                          {text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Related service */}
              <div className="bg-gs-light rounded-xl p-5 border border-gs-border">
                <h3 className="text-xs font-bold text-gs-charcoal uppercase tracking-wider mb-3">Related Service</h3>
                <p className="text-xs text-gs-slate mb-3">{post.relatedRegulation} compliance support</p>
                <Link
                  to={`/services/${post.relatedSlug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-gs-green hover:text-gs-emerald transition-colors"
                >
                  View {post.relatedRegulation} Services →
                </Link>
              </div>

              {/* Expert CTA */}
              <div className="bg-gs-green rounded-xl p-5 text-white">
                <h3 className="text-sm font-bold mb-2">Need compliance help?</h3>
                <p className="text-xs text-white/80 mb-4">Our experts can help you navigate {post.relatedRegulation} requirements specific to your products.</p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1.5 w-full justify-center px-4 py-2 bg-white text-gs-green text-xs font-semibold rounded-lg hover:bg-gs-light transition-colors"
                >
                  Contact Our Experts
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gs-charcoal mb-8">Related Articles</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => (
                <BlogCard
                  key={p.slug}
                  title={p.title}
                  excerpt={p.excerpt}
                  category={p.category}
                  author={p.author}
                  date={p.date}
                  readTime={p.readTime}
                  slug={p.slug}
                  tags={p.tags}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
