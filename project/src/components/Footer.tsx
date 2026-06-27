import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Linkedin, Twitter, ArrowRight, CheckCircle, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .upsert({ email }, { onConflict: 'email' });
      if (error) throw error;
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="flex items-center gap-2 text-xs text-gs-mint">
        <CheckCircle size={14} />
        Subscribed! Thank you.
      </div>
    );
  }

  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        placeholder="Your email"
        className="flex-1 px-3 py-2 text-xs bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gs-mint"
        aria-label="Email for newsletter"
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="px-3 py-2 bg-gs-green text-white text-xs rounded-lg hover:bg-gs-emerald transition-colors disabled:opacity-70 flex items-center gap-1"
      >
        {status === 'loading' ? <Loader2 size={12} className="animate-spin" /> : 'Subscribe'}
      </button>
    </form>
  );
}

export default function Footer() {
  return (
    <footer className="bg-gs-charcoal text-white" aria-label="Site footer">
      <div className="h-1 bg-gs-green" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <img
                src="/images/GScomply_Logo.jpeg"
                alt="GS Comply Solutions"
                className="h-20 w-auto object-contain bg-white rounded-lg px-3 py-2"
                style={{ maxWidth: '240px' }}
              />
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Navigating Global Compliance. Protecting Your Future.
            </p>
            <div className="flex gap-3">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-2 rounded-lg bg-white/10 hover:bg-gs-green transition-colors duration-200"
              >
                <Linkedin size={16} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter / X"
                className="p-2 rounded-lg bg-white/10 hover:bg-gs-green transition-colors duration-200"
              >
                <Twitter size={16} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { to: '/', label: 'Home' },
                { to: '/industries', label: 'Industries' },
                { to: '/services', label: 'Services' },
                { to: '/services/lca-pcf', label: 'LCA & PCF' },
                { to: '/services#platforms', label: 'Platforms' },
                { to: '/insights', label: 'Insights' },
                { to: '/about', label: 'About Us' },
                { to: '/contact', label: 'Contact' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-sm text-gray-400 hover:text-gs-mint transition-colors flex items-center gap-1.5">
                    <ArrowRight size={12} />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our services */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Our Services</h3>
            <ul className="space-y-2">
              {[
                { to: '/services#compliance', label: 'Product & Material Compliance' },
                { to: '/services#sustainability', label: 'Sustainability Services' },
                { to: '/services#platforms', label: 'Platform Services' },
                { to: '/services#training', label: 'Training Programs' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-sm text-gray-400 hover:text-gs-mint transition-colors flex items-center gap-1.5">
                    <ArrowRight size={12} />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Contact Us</h3>
            <ul className="space-y-3 mb-6">
              <li>
                <a href="mailto:info.gscomply@gmail.com" className="flex items-center gap-2 text-sm text-gray-400 hover:text-gs-mint transition-colors">
                  <Mail size={14} className="flex-shrink-0 text-gs-mint" />
                  info.gscomply@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+917010372791" className="flex items-center gap-2 text-sm text-gray-400 hover:text-gs-mint transition-colors">
                  <Phone size={14} className="flex-shrink-0 text-gs-mint" />
                  +91 70103 72791
                </a>
              </li>
              <li className="text-sm text-gray-400">
                Mon–Fri, 9:00 AM – 6:00 PM IST
              </li>
            </ul>

            {/* Newsletter */}
            <div>
              <p className="text-xs font-semibold text-white uppercase tracking-wider mb-2">Regulatory Updates</p>
              <p className="text-xs text-gray-400 mb-3">Get compliance news in your inbox.</p>
              <NewsletterForm />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} GS Comply Solutions. All Rights Reserved.
          </p>
          <div className="flex items-center gap-4">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
              <Link key={item} to="/contact" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
