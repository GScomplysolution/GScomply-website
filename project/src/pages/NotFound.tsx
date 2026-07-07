import { Link } from 'react-router-dom';
import { Home, Compass, FileText, Mail } from 'lucide-react';
import SEO from '../components/SEO';

const helpfulLinks = [
  { to: '/', label: 'Home', icon: Home, description: 'Back to the homepage' },
  { to: '/services', label: 'Services', icon: FileText, description: 'Browse our compliance services' },
  { to: '/industries', label: 'Industries', icon: Compass, description: 'See industries we serve' },
  { to: '/contact', label: 'Contact', icon: Mail, description: 'Get in touch with our team' },
];

export default function NotFound() {
  return (
    <>
      <SEO
        title="Page Not Found"
        description="The page you're looking for doesn't exist or may have been moved. Explore GS Comply Solutions' compliance services, industries, and insights."
        noIndex
      />
      <section className="py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-bold text-gs-green uppercase tracking-wider mb-3">Error 404</p>
          <h1 className="text-4xl md:text-5xl font-bold text-gs-charcoal mb-4">
            We couldn't find that page
          </h1>
          <p className="text-gs-slate text-lg mb-12 max-w-xl mx-auto">
            The page you're looking for may have been moved, renamed, or no longer exists.
            Here are a few places that might help instead.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 text-left">
            {helpfulLinks.map(({ to, label, description, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className="flex items-start gap-4 p-5 rounded-xl border border-gs-border hover:border-gs-green hover:bg-gs-light transition-colors group"
              >
                <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-gs-light group-hover:bg-white flex items-center justify-center text-gs-green">
                  <Icon size={20} />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-gs-charcoal">{label}</span>
                  <span className="block text-xs text-gs-slate mt-0.5">{description}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
