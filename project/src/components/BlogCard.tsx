import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

interface BlogCardProps {
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: number;
  slug: string;
  tags?: string[];
  image?: string;
}

export default function BlogCard({ title, excerpt, category, author, date, readTime, slug, tags, image }: BlogCardProps) {
  const formatted = new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const categoryImages: Record<string, string> = {
    'Regulations': 'https://images.pexels.com/photos/60024/pexels-photo-60024.jpeg?auto=compress&cs=tinysrgb&w=600',
    'Platform Guides': 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=600',
    'Industry News': 'https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg?auto=compress&cs=tinysrgb&w=600',
    'Best Practices': 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600',
  };

  const displayImage = image || categoryImages[category] || 'https://images.pexels.com/photos/110854/pexels-photo-110854.jpeg?auto=compress&cs=tinysrgb&w=600';

  return (
    <article className="group bg-white rounded-xl shadow-gs-card hover:shadow-gs-hover hover:-translate-y-1 transition-all duration-200 flex flex-col h-full overflow-hidden border border-gs-border">
      {/* Image */}
      <div className="relative h-44 flex-shrink-0 overflow-hidden">
        <img
          src={displayImage}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute top-4 left-4">
          <span className="inline-block px-3 py-1 bg-gs-green text-white text-xs font-semibold rounded-full">
            {category}
          </span>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-base font-bold text-gs-charcoal mb-3 leading-snug group-hover:text-gs-green transition-colors line-clamp-2">
          {title}
        </h3>
        <p className="text-sm text-gs-slate leading-relaxed mb-4 line-clamp-2 flex-1">{excerpt}</p>

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-xs bg-gs-light text-gs-green px-2 py-0.5 rounded-full">{tag}</span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-gs-border">
          <div className="flex items-center gap-3 text-xs text-gs-slate">
            <span className="flex items-center gap-1">
              <Calendar size={11} />
              {formatted}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={11} />
              {readTime} min read
            </span>
          </div>
          <Link
            to={`/insights/${slug}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-gs-green hover:text-gs-emerald transition-colors"
          >
            Read Article
            <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </article>
  );
}
