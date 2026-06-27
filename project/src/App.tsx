import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

const Home = lazy(() => import('./pages/Home'));
const Industries = lazy(() => import('./pages/Industries'));
const IndustryDetail = lazy(() => import('./pages/IndustryDetail'));
const Services = lazy(() => import('./pages/Services'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));
const PlatformDetail = lazy(() => import('./pages/PlatformDetail'));
const LcaPcf = lazy(() => import('./pages/LcaPcf'));
const Insights = lazy(() => import('./pages/Insights'));
const InsightPost = lazy(() => import('./pages/InsightPost'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gs-gray">
    <div className="text-center">
      <div className="w-12 h-12 border-4 border-gs-green border-t-transparent rounded-full animate-spin mx-auto mb-4" />
      <p className="text-gs-slate text-sm">Loading...</p>
    </div>
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 pt-24">
          <Suspense fallback={<LoadingSpinner />}>
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
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
