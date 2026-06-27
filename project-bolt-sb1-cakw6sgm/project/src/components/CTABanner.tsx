import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface CTABannerProps {
  headline: string;
  subtext: string;
  buttonText: string;
  buttonLink: string;
}

export default function CTABanner({ headline, subtext, buttonText, buttonLink }: CTABannerProps) {
  return (
    <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1A6B3C 0%, #0F4A2A 100%)' }}>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="ctaDots" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ctaDots)" />
        </svg>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
          {headline}
        </h2>
        <p className="text-white/85 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
          {subtext}
        </p>
        <Link
          to={buttonLink}
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-gs-green font-semibold rounded-lg hover:bg-gs-light transition-all duration-200 hover:shadow-lg"
        >
          {buttonText}
          <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}
