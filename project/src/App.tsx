import { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, Link, LinkProps } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import NotFound from './pages/NotFound';

// Lazy load all pages
const pageLoaders = {
  Home: () => import('./pages/Home'),
  Industries: () => import('./pages/Industries'),
  IndustryDetail: () => import('./pages/IndustryDetail'),
  Services: () => import('./pages/Services'),
  ServiceDetail: () => import('./pages/ServiceDetail'),
  PlatformDetail: () => import('./pages/PlatformDetail'),
  LcaPcf: () => import('./pages/LcaPcf'),
  Insights: () => import('./pages/Insights'),
  InsightPost: () => import('./pages/InsightPost'),
  About: () => import('./pages/About'),
  Contact: () => import('./pages/Contact'),
};

const Home = lazy(pageLoaders.Home);
const Industries = lazy(pageLoaders.Industries);
const IndustryDetail = lazy(pageLoaders.IndustryDetail);
const Services = lazy(pageLoaders.Services);
const ServiceDetail = lazy(pageLoaders.ServiceDetail);
const PlatformDetail = lazy(pageLoaders.PlatformDetail);
const LcaPcf = lazy(pageLoaders.LcaPcf);
const Insights = lazy(pageLoaders.Insights);
const InsightPost = lazy(pageLoaders.InsightPost);
const About = lazy(pageLoaders.About);
const Contact = lazy(pageLoaders.Contact);

// Track preloaded modules
const preloadedModules = new Set<string>();

export type PageName = keyof typeof pageLoaders;

// Prefetch a page without rendering it
export const prefetchPage = (pageName: PageName) => {
  if (!preloadedModules.has(pageName)) {
    preloadedModules.add(pageName);
    pageLoaders[pageName]().catch(() => preloadedModules.delete(pageName));
  }
};

// Minimal inline loading indicator
const PageLoader = () => (
  <div className="fixed inset-x-0 top-0 z-50 pointer-events-none">
    <div className="h-0.5 bg-gs-gray overflow-hidden">
      <div className="h-full bg-gs-green animate-pulse" style={{ width: '60%' }} />
    </div>
  </div>
);

// Prefetch Link - prefetches on hover or focus
export function PrefetchLink({
  to,
  hoverPrefetch = true,
  children,
  ...props
}: Omit<LinkProps, 'to' | 'prefetch'> & { to: string; hoverPrefetch?: boolean }) {
  const pageMap: Record<string, keyof typeof pageLoaders> = {
    '/': 'Home',
    '/industries': 'Industries',
    '/services': 'Services',
    '/insights': 'Insights',
    '/about': 'About',
    '/contact': 'Contact',
  };

  const handleHover = () => {
    if (hoverPrefetch && pageMap[to]) {
      prefetchPage(pageMap[to]);
    }
  };

  return (
    <Link to={to} {...props} onMouseEnter={handleHover} onFocus={handleHover}>
      {children}
    </Link>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();
  const [isNavigating, setIsNavigating] = useState(false);

  // Track navigation for smooth transitions
  useEffect(() => {
    setIsNavigating(true);
    const timer = setTimeout(() => setIsNavigating(false), 150);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Preload critical pages after initial render
  useEffect(() => {
    const timer = setTimeout(() => {
      prefetchPage('Services');
      prefetchPage('Industries');
      prefetchPage('Contact');
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <ScrollToTop />
      {isNavigating && <PageLoader />}
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 pt-24">
          <Suspense fallback={<PageFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/industries" element={<Industries />} />
              <Route path="/industries/:slug" element={<IndustryDetail />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/lca-pcf" element={<LcaPcf />} />
              <Route path="/services/:slug" element={<ServiceDetail />} />
              <Route path="/platforms" element={<Navigate to="/services#platforms" replace />} />
              <Route path="/platforms/:slug" element={<PlatformDetail />} />
              <Route path="/insights" element={<Insights />} />
              <Route path="/insights/:slug" element={<InsightPost />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </>
  );
}

// Minimal fallback for initial lazy load
function PageFallback() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="w-8 h-8 border-3 border-gs-green border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
