import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface PlatformCardProps {
  name: string;
  acronym: string;
  description: string;
  industry: string;
  slug: string;
}

const shortIndustry = (industry: string): string => {
  if (industry.toLowerCase().startsWith('automotive (china')) return 'China Automotive';
  if (industry.toLowerCase().startsWith('non-automotive')) return 'Non-Automotive';
  if (industry.toLowerCase().startsWith('automotive')) return 'Automotive';
  if (industry.toLowerCase().startsWith('all')) return 'All Industries';
  return industry.split(' ').slice(0, 2).join(' ');
};

export default function PlatformCard({ name, acronym, description, industry, slug }: PlatformCardProps) {
  return (
    <div className="group bg-white rounded-xl p-6 border border-gs-border shadow-gs-card hover:shadow-gs-hover hover:-translate-y-1 transition-all duration-200 flex flex-col">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 bg-gs-light rounded-xl flex items-center justify-center flex-shrink-0">
          <span className="text-lg font-extrabold text-gs-green">{acronym.charAt(0)}</span>
        </div>
        <div className="min-w-0">
          <h3 className="text-base font-bold text-gs-charcoal">{acronym}</h3>
          <span className="inline-block text-xs bg-gs-light text-gs-green px-2 py-0.5 rounded-full whitespace-nowrap">
            {shortIndustry(industry)}
          </span>
        </div>
      </div>
      <p className="text-xs text-gs-slate mb-2 font-medium leading-snug">{name}</p>
      <p className="text-sm text-gs-slate leading-relaxed mb-4 flex-1 line-clamp-3">{description}</p>
      <Link
        to={`/platforms/${slug}`}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-gs-green group-hover:text-gs-emerald transition-colors"
      >
        Learn More
        <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
      </Link>
    </div>
  );
}
