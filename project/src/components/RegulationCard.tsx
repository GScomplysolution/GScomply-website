import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface RegulationCardProps {
  acronym: string;
  name: string;
  description: string;
  slug: string;
  region?: string;
}

const shortRegion = (region: string): string => {
  if (region.includes('European Union')) return 'EU';
  if (region.includes('United States (California)')) return 'California';
  if (region.includes('United States')) return 'US';
  if (region.toLowerCase().startsWith('global')) return 'Global';
  return region.split(' ')[0];
};

export default function RegulationCard({ acronym, name, description, slug, region }: RegulationCardProps) {
  return (
    <div className="group bg-white rounded-xl border-t-4 border-gs-green shadow-gs-card hover:shadow-gs-hover hover:-translate-y-1 transition-all duration-200 flex flex-col h-full">
      <div className="p-6 flex-1">
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-2xl font-extrabold text-gs-green leading-none">{acronym}</span>
          {region && (
            <span className="text-xs text-gs-slate bg-gs-light px-2 py-1 rounded-full flex-shrink-0 whitespace-nowrap">{shortRegion(region)}</span>
          )}
        </div>
        <h3 className="text-sm font-semibold text-gs-charcoal mb-3 leading-snug">{name}</h3>
        <p className="text-sm text-gs-slate leading-relaxed">{description}</p>
      </div>
      <div className="px-6 pb-5">
        <Link
          to={`/services/${slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-gs-green group-hover:text-gs-emerald transition-colors"
        >
          Learn More
          <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
