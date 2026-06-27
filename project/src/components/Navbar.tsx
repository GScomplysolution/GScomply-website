import { useState, useEffect, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, ChevronDown, ArrowRight, ArrowUpRight } from 'lucide-react';
import industries from '../data/industries';

type DropdownKey = 'services' | 'industries' | null;
type ServiceCategory = 'compliance' | 'sustainability' | 'platforms' | 'training';

const serviceCategories: { key: ServiceCategory; label: string; sub: string }[] = [
  { key: 'compliance', label: 'Product & Material Compliance', sub: 'REACH, RoHS, PFAS, GADSL, ELV and more' },
  { key: 'sustainability', label: 'Sustainability Services', sub: 'LCA, PCF, CBAM, CSRD, ESG reporting' },
  { key: 'platforms', label: 'Platform Based Requirements', sub: 'IMDS, CDX, CAMDS, SCIP database' },
  { key: 'training', label: 'Training Programs', sub: 'Classroom, individual & online training' },
];

const categoryItems: Record<ServiceCategory, { label: string; href: string }[][]> = {
  compliance: [
    [
      { label: 'REACH', href: '/services/reach' },
      { label: 'RoHS', href: '/services/rohs' },
      { label: 'PFAS', href: '/services/pfas' },
      { label: 'Prop 65', href: '/services/prop65' },
      { label: 'GADSL', href: '/services/gadsl' },
    ],
    [
      { label: 'ELV', href: '/services/elv' },
      { label: 'TSCA', href: '/services/tsca' },
      { label: 'POPs', href: '/services/pops' },
      { label: 'WEEE', href: '/services/weee' },
      { label: 'CLP', href: '/services/clp' },
    ],
    [
      { label: 'CMRT', href: '/services/cmrt' },
      { label: 'EMRT', href: '/services/emrt' },
      { label: 'PPWR', href: '/services/ppwr' },
      { label: 'VOC', href: '/services/voc' },
      { label: 'BPR', href: '/services/bpr' },
    ],
  ],
  sustainability: [
    [
      { label: 'Life Cycle Assessment (LCA)', href: '/services/lca-pcf' },
      { label: 'Product Carbon Footprint (PCF)', href: '/services/lca-pcf' },
      { label: 'CBAM Reporting', href: '/services/lca-pcf' },
      { label: 'Environmental Product Declaration (EPD)', href: '/services/lca-pcf' },
    ],
    [
      { label: 'CSRD / ESRS Reporting', href: '/services/lca-pcf' },
      { label: 'Scope 3 Emissions Reporting', href: '/services/lca-pcf' },
      { label: 'ESG Reporting', href: '/services/lca-pcf' },
      { label: 'Carbon Reduction Strategy', href: '/services/lca-pcf' },
    ],
  ],
  platforms: [
    [
      { label: 'IMDS — International Material Data System', href: '/platforms/imds' },
      { label: 'CDX — Compliance Data Exchange', href: '/platforms/cdx' },
    ],
    [
      { label: 'CAMDS — China Automotive Material Data System', href: '/platforms/camds' },
      { label: 'SCIP — Substances of Concern in Products', href: '/platforms/scip' },
    ],
  ],
  training: [
    [
      { label: 'Classroom Training', href: '/services#training' },
      { label: 'Individual Training', href: '/services#training' },
      { label: 'Online Training', href: '/services#training' },
    ],
    [
      { label: 'Regulation Training (REACH, RoHS, PFAS…)', href: '/services#training' },
      { label: 'Platform Training (IMDS, CDX, CAMDS)', href: '/services#training' },
      { label: 'Sustainability Training (LCA, PCF, CSRD)', href: '/services#training' },
    ],
  ],
};

const categoryViewAllHref: Record<ServiceCategory, string> = {
  compliance: '/services#compliance',
  sustainability: '/services#sustainability',
  platforms: '/services#platforms',
  training: '/services#training',
};

const categoryViewAllLabel: Record<ServiceCategory, string> = {
  compliance: 'All Compliance Services',
  sustainability: 'All Sustainability Services',
  platforms: 'All Platforms',
  training: 'All Training Programs',
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<DropdownKey>(null);
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('compliance');
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleEnter = (key: DropdownKey) => {
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null; }
    setActiveDropdown(key);
  };

  const handleLeave = () => {
    closeTimer.current = setTimeout(() => setActiveDropdown(null), 120);
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors duration-200 ${isActive ? 'text-gs-green' : 'text-gs-charcoal hover:text-gs-green'}`;

  const closeAll = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveDropdown(null);
    setIsOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white ${isScrolled ? 'shadow-md' : ''} border-b border-gs-border`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center flex-shrink-0" onClick={closeAll}>
            <img src="/images/GScomply_Logo.jpeg" alt="GS Comply Solutions Logo" className="h-20 w-auto object-contain" style={{ maxWidth: '260px' }} />
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-7">
            <NavLink to="/" className={navLinkClass} end>Home</NavLink>

            {/* Industries */}
            <div onMouseEnter={() => handleEnter('industries')} onMouseLeave={handleLeave}>
              <Link
                to="/industries"
                className={`flex items-center gap-1 text-sm font-medium transition-colors duration-200 ${activeDropdown === 'industries' ? 'text-gs-green' : 'text-gs-charcoal hover:text-gs-green'}`}
              >
                Industries
                <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === 'industries' ? 'rotate-180' : ''}`} />
              </Link>
            </div>

            {/* Services */}
            <div onMouseEnter={() => handleEnter('services')} onMouseLeave={handleLeave}>
              <Link
                to="/services"
                className={`flex items-center gap-1 text-sm font-medium transition-colors duration-200 ${activeDropdown === 'services' ? 'text-gs-green' : 'text-gs-charcoal hover:text-gs-green'}`}
              >
                Services
                <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === 'services' ? 'rotate-180' : ''}`} />
              </Link>
            </div>

            <NavLink to="/insights" className={navLinkClass}>Insights</NavLink>
            <NavLink to="/about" className={navLinkClass}>About</NavLink>
            <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
          </div>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <Link
              to="/contact"
              className="hidden lg:inline-flex items-center px-4 py-2 bg-gs-green text-white text-sm font-medium rounded-lg hover:bg-gs-emerald transition-colors duration-200"
            >
              Get a Free Consultation
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg text-gs-charcoal hover:bg-gs-gray transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* ── INDUSTRIES DROPDOWN ── */}
      {activeDropdown === 'industries' && (
        <div
          className="hidden lg:block absolute left-0 right-0 bg-white border-t border-gs-border shadow-xl z-40"
          onMouseEnter={() => handleEnter('industries')}
          onMouseLeave={handleLeave}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs font-bold text-gs-slate uppercase tracking-wider">Industries We Serve</p>
              <Link to="/industries" onClick={closeAll} className="text-xs font-semibold text-gs-green hover:text-gs-emerald flex items-center gap-1">
                All Industries <ArrowRight size={11} />
              </Link>
            </div>
            <div className="grid grid-cols-5 gap-1">
              {industries.map((ind) => (
                <Link
                  key={ind.slug}
                  to={`/industries/${ind.slug}`}
                  onClick={closeAll}
                  className="px-3 py-2 rounded-lg text-xs text-gs-charcoal font-medium hover:bg-gs-light hover:text-gs-green transition-colors"
                >
                  {ind.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── SERVICES MEGA MENU (Certivo-style 3-panel) ── */}
      {activeDropdown === 'services' && (
        <div
          className="hidden lg:block absolute left-0 right-0 bg-white border-t border-gs-border shadow-xl z-40"
          onMouseEnter={() => handleEnter('services')}
          onMouseLeave={handleLeave}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex min-h-[320px]">

              {/* Left panel — category list */}
              <div className="w-64 flex-shrink-0 border-r border-gs-border py-6 pr-6">
                <p className="text-xs font-bold text-gs-slate uppercase tracking-wider mb-4">Services by Category</p>
                <ul className="space-y-1">
                  {serviceCategories.map((cat) => (
                    <li key={cat.key}>
                      <button
                        onMouseEnter={() => setActiveCategory(cat.key)}
                        onClick={() => { window.location.href = categoryViewAllHref[cat.key]; closeAll(); }}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-150 flex items-center justify-between group ${
                          activeCategory === cat.key
                            ? 'bg-gs-light border border-gs-border'
                            : 'hover:bg-gs-gray border border-transparent'
                        }`}
                      >
                        <div>
                          <p className={`text-sm font-semibold leading-tight ${activeCategory === cat.key ? 'text-gs-green' : 'text-gs-charcoal group-hover:text-gs-green'}`}>
                            {cat.label}
                          </p>
                          <p className="text-xs text-gs-slate mt-0.5 leading-tight">{cat.sub}</p>
                        </div>
                        <ArrowRight
                          size={14}
                          className={`flex-shrink-0 ml-2 transition-transform ${activeCategory === cat.key ? 'text-gs-green translate-x-0.5' : 'text-gs-slate'}`}
                        />
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 pt-4 border-t border-gs-border">
                  <Link
                    to="/services"
                    onClick={closeAll}
                    className="flex items-center gap-1.5 text-xs font-semibold text-gs-green hover:text-gs-emerald transition-colors"
                  >
                    View All Services <ArrowRight size={11} />
                  </Link>
                </div>
              </div>

              {/* Middle panel — items for selected category */}
              <div className="flex-1 py-6 px-8">
                <div className="flex items-center justify-between mb-5">
                  <p className="text-sm font-bold text-gs-charcoal">
                    {serviceCategories.find(c => c.key === activeCategory)?.label}
                  </p>
                  <Link
                    to={categoryViewAllHref[activeCategory]}
                    onClick={closeAll}
                    className="text-xs font-semibold text-gs-green hover:text-gs-emerald flex items-center gap-1 transition-colors"
                  >
                    {categoryViewAllLabel[activeCategory]} <ArrowUpRight size={11} />
                  </Link>
                </div>
                <div className={`grid gap-x-8 gap-y-0 ${activeCategory === 'compliance' ? 'grid-cols-3' : activeCategory === 'platforms' ? 'grid-cols-2' : 'grid-cols-2'}`}>
                  {categoryItems[activeCategory].map((col, colIdx) => (
                    <ul key={colIdx} className="space-y-0">
                      {col.map((item) => (
                        <li key={item.label}>
                          <Link
                            to={item.href}
                            onClick={closeAll}
                            className="flex items-center gap-2 py-2.5 group transition-colors"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-gs-green flex-shrink-0 opacity-60 group-hover:opacity-100 transition-opacity" />
                            <span className="text-sm text-gs-charcoal group-hover:text-gs-green transition-colors font-medium">{item.label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ── MOBILE MENU ── */}
      {isOpen && (
        <div className="lg:hidden border-t border-gs-border bg-white pb-4">
          <div className="py-3 space-y-0.5">
            <NavLink to="/" end onClick={closeAll} className={({ isActive }) => `block px-4 py-3 text-sm font-medium rounded-lg ${isActive ? 'bg-gs-light text-gs-green' : 'text-gs-charcoal hover:bg-gs-gray'}`}>
              Home
            </NavLink>

            {/* Mobile Industries */}
            <div>
              <button
                onClick={() => setMobileExpanded(mobileExpanded === 'industries' ? null : 'industries')}
                className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gs-charcoal hover:bg-gs-gray rounded-lg"
              >
                Industries
                <ChevronDown size={16} className={`transition-transform ${mobileExpanded === 'industries' ? 'rotate-180' : ''}`} />
              </button>
              {mobileExpanded === 'industries' && (
                <div className="ml-4 mt-1 space-y-0.5 border-l-2 border-gs-light pl-3">
                  <Link to="/industries" onClick={closeAll} className="block py-2 text-xs text-gs-green font-semibold">All Industries →</Link>
                  {industries.map((ind) => (
                    <Link key={ind.slug} to={`/industries/${ind.slug}`} onClick={closeAll} className="block py-2 text-xs text-gs-charcoal hover:text-gs-green">
                      {ind.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Services */}
            <div>
              <button
                onClick={() => setMobileExpanded(mobileExpanded === 'services' ? null : 'services')}
                className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gs-charcoal hover:bg-gs-gray rounded-lg"
              >
                Services
                <ChevronDown size={16} className={`transition-transform ${mobileExpanded === 'services' ? 'rotate-180' : ''}`} />
              </button>
              {mobileExpanded === 'services' && (
                <div className="ml-4 mt-1 border-l-2 border-gs-light pl-3 space-y-0.5">
                  <Link to="/services" onClick={closeAll} className="block py-2 text-xs text-gs-green font-semibold">All Services →</Link>
                  <p className="pt-2 pb-1 text-xs font-bold text-gs-slate uppercase tracking-wide">Compliance</p>
                  {[...categoryItems.compliance[0], ...categoryItems.compliance[1]].map((item) => (
                    <Link key={item.label} to={item.href} onClick={closeAll} className="block py-1.5 text-xs text-gs-charcoal hover:text-gs-green">{item.label}</Link>
                  ))}
                  <p className="pt-2 pb-1 text-xs font-bold text-gs-slate uppercase tracking-wide">Sustainability</p>
                  {[...categoryItems.sustainability[0], ...categoryItems.sustainability[1]].map((item) => (
                    <Link key={item.label} to={item.href} onClick={closeAll} className="block py-1.5 text-xs text-gs-charcoal hover:text-gs-green">{item.label}</Link>
                  ))}
                  <p className="pt-2 pb-1 text-xs font-bold text-gs-slate uppercase tracking-wide">Platforms</p>
                  {[...categoryItems.platforms[0], ...categoryItems.platforms[1]].map((item) => (
                    <Link key={item.label} to={item.href} onClick={closeAll} className="block py-1.5 text-xs text-gs-charcoal hover:text-gs-green">{item.label}</Link>
                  ))}
                  <p className="pt-2 pb-1 text-xs font-bold text-gs-slate uppercase tracking-wide">Training</p>
                  {[...categoryItems.training[0], ...categoryItems.training[1]].map((item) => (
                    <Link key={item.label} to={item.href} onClick={closeAll} className="block py-1.5 text-xs text-gs-charcoal hover:text-gs-green">{item.label}</Link>
                  ))}
                </div>
              )}
            </div>

            {[
              { to: '/insights', label: 'Insights' },
              { to: '/about', label: 'About' },
              { to: '/contact', label: 'Contact' },
            ].map(({ to, label }) => (
              <NavLink key={to} to={to} onClick={closeAll} className={({ isActive }) => `block px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive ? 'bg-gs-light text-gs-green' : 'text-gs-charcoal hover:bg-gs-gray'}`}>
                {label}
              </NavLink>
            ))}

            <div className="px-4 pt-2">
              <Link to="/contact" onClick={closeAll} className="block w-full text-center px-4 py-2.5 bg-gs-green text-white text-sm font-medium rounded-lg hover:bg-gs-emerald transition-colors">
                Get a Free Consultation
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
