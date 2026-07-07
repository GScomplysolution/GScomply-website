/**
 * scripts/prerender-meta.ts
 *
 * Why this exists
 * ----------------
 * This site is a client-rendered (CSR) Vite/React SPA. That means the single
 * dist/index.html shipped by `vite build` always has the SAME <title>,
 * <meta description>, canonical link, and Open Graph/Twitter tags — the
 * per-page versions are only applied client-side (see src/components/SEO.tsx)
 * after React mounts and runs its effects.
 *
 * Googlebot generally renders JS and will eventually see the per-page tags,
 * but:
 *   - Many other crawlers and ALL link-preview bots (Slack, LinkedIn,
 *     WhatsApp, X/Twitter, Facebook, iMessage, etc.) do NOT execute
 *     JavaScript. They only ever see the static HTML — which today is
 *     identical (generic homepage) for every single URL on the site.
 *   - Relying entirely on JS execution for indexing signals is slower and
 *     less reliable than serving the real tags immediately.
 *
 * This script fixes that without a framework rewrite (no Next.js/Remix
 * migration, no headless-browser SSR — both out of scope / heavy). It runs
 * after `vite build` and:
 *   1. Reads the already-built dist/index.html (which has the correct,
 *      hashed <script>/<link> tags for the compiled app).
 *   2. For every known route (static pages + every service/industry/
 *      platform/blog slug, pulled live from the same src/data/*.ts files
 *      used by the app and by generate-sitemap.ts — so it never goes stale),
 *      clones that template and swaps in the route's real title, meta
 *      description, canonical URL, Open Graph tags, Twitter Card tags, and
 *      JSON-LD structured data.
 *   3. Writes each snapshot to dist/<route>/index.html.
 *
 * Because Netlify (see public/_redirects) matches an exact static file
 * before it falls back to the SPA catch-all rewrite, a request to
 * /services/reach is served directly from dist/services/reach/index.html —
 * real content, correct meta, immediately. The bundled JS in that same file
 * then boots React Router as normal and the page is fully interactive.
 *
 * Adding a new page: as long as it's driven by src/data/*.ts (services,
 * industries, platforms, blogPosts) it is picked up automatically. For a
 * new fully-static route, add one entry to STATIC_ROUTES below.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import services from '../src/data/services';
import industries from '../src/data/industries';
import platforms from '../src/data/platforms';
import blogPosts from '../src/data/blogPosts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = 'https://gscomply.com';
const SITE_NAME = 'GS Comply Solutions';
const DEFAULT_IMAGE = '/images/GScomply_Logo.jpeg';
const DIST_DIR = path.resolve(__dirname, '../dist');

interface RouteMeta {
  routePath: string; // e.g. '/services/reach'
  title: string;
  description: string;
  type: 'website' | 'article' | 'service';
  image?: string;
  structuredData: Record<string, unknown>[];
}

function abs(imagePath: string | undefined): string {
  if (!imagePath) return `${SITE_URL}${DEFAULT_IMAGE}`;
  return imagePath.startsWith('http') ? imagePath : `${SITE_URL}${imagePath}`;
}

function fullTitle(title: string): string {
  return title === SITE_NAME ? title : `${title} | ${SITE_NAME}`;
}

function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}${DEFAULT_IMAGE}`,
    description:
      'Global product and material compliance services — helping manufacturers navigate REACH, RoHS, PFAS, IMDS, SCIP and beyond.',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-70103-72791',
      contactType: 'customer service',
      email: 'info.gscomply@gmail.com',
      availableLanguage: ['English'],
    },
    sameAs: ['https://linkedin.com/company/gscomply', 'https://twitter.com/GSComply'],
    address: { '@type': 'PostalAddress', addressCountry: 'IN' },
  };
}

function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/insights?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  };
}

function breadcrumbSchema(crumbs: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: `${SITE_URL}${c.path}`,
    })),
  };
}

function serviceSchema(service: { name: string; description: string; slug: string; region: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    areaServed: service.region || 'Global',
    url: `${SITE_URL}/services/${service.slug}`,
  };
}

function articleSchema(post: { title: string; excerpt: string; author: string; date: string; image?: string; slug: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    author: { '@type': 'Organization', name: post.author },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}${DEFAULT_IMAGE}` },
    },
    datePublished: post.date,
    dateModified: post.date,
    image: abs(post.image),
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/insights/${post.slug}` },
  };
}

const STATIC_ROUTES: RouteMeta[] = [
  {
    routePath: '/',
    title: 'Global Product & Material Compliance Services',
    description:
      "GS Comply Solutions helps manufacturers navigate complex product compliance regulations worldwide — REACH, RoHS, PFAS, IMDS, SCIP and beyond. Expert compliance consulting for automotive, electronics, and industrial sectors.",
    type: 'website',
    structuredData: [organizationSchema(), websiteSchema()],
  },
  {
    routePath: '/industries',
    title: 'Industries We Serve',
    description:
      "Industry-specific compliance services for automotive, electronics, aerospace, medical devices, construction and more. Expert regulatory support tailored to your sector's requirements.",
    type: 'website',
    structuredData: [breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Industries', path: '/industries' }])],
  },
  {
    routePath: '/services',
    title: 'Compliance Services',
    description:
      'Complete product and material compliance services: REACH, RoHS, PFAS, GADSL, ELV, TSCA, Prop 65 and more. IMDS & SCIP platform submissions. LCA & PCF sustainability services.',
    type: 'website',
    structuredData: [breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }])],
  },
  {
    routePath: '/services/lca-pcf',
    title: 'Life Cycle Assessment (LCA) & Product Carbon Footprint (PCF) Services',
    description:
      'ISO 14044-compliant LCA and GHG Protocol-aligned PCF calculations. Support for CSRD Scope 3 reporting, EPD programs, and OEM carbon footprint requirements.',
    type: 'service',
    structuredData: [
      breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' },
        { name: 'LCA & PCF', path: '/services/lca-pcf' },
      ]),
    ],
  },
  {
    routePath: '/insights',
    title: 'Compliance Insights & Regulatory Updates',
    description:
      'Expert analysis on REACH, RoHS, PFAS, IMDS, SCIP and other regulatory developments. Stay ahead of global product compliance changes with our compliance insights.',
    type: 'website',
    structuredData: [breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Insights', path: '/insights' }])],
  },
  {
    routePath: '/about',
    title: 'About Us',
    description:
      'GS Comply Solutions is a team of regulatory experts helping businesses navigate product compliance worldwide. Learn about our mission, values, and commitment to compliance excellence.',
    type: 'website',
    structuredData: [],
  },
  {
    routePath: '/contact',
    title: 'Contact Us for Free Compliance Consultation',
    description:
      'Get expert help with REACH, RoHS, PFAS, IMDS, SCIP and other product compliance regulations. Request a free consultation from GS Comply Solutions — we respond within 1 business day.',
    type: 'website',
    structuredData: [],
  },
];

function buildDynamicRoutes(): RouteMeta[] {
  const routes: RouteMeta[] = [];

  for (const s of services) {
    routes.push({
      routePath: `/services/${s.slug}`,
      title: `${s.acronym} - ${s.name}`,
      description: s.description,
      type: 'service',
      structuredData: [
        serviceSchema(s),
        breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
          { name: s.acronym, path: `/services/${s.slug}` },
        ]),
      ],
    });
  }

  for (const i of industries) {
    routes.push({
      routePath: `/industries/${i.slug}`,
      title: `${i.name} Compliance Services`,
      description: i.shortDescription,
      type: 'service',
      structuredData: [
        breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Industries', path: '/industries' },
          { name: i.name, path: `/industries/${i.slug}` },
        ]),
      ],
    });
  }

  for (const p of platforms) {
    routes.push({
      routePath: `/platforms/${p.slug}`,
      title: `${p.acronym} - ${p.name}`,
      description: p.description,
      type: 'service',
      structuredData: [
        breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
          { name: p.acronym, path: `/platforms/${p.slug}` },
        ]),
      ],
    });
  }

  for (const post of blogPosts) {
    routes.push({
      routePath: `/insights/${post.slug}`,
      title: post.title,
      description: post.excerpt,
      type: 'article',
      image: post.image,
      structuredData: [
        articleSchema(post),
        breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Insights', path: '/insights' },
          { name: post.title, path: `/insights/${post.slug}` },
        ]),
      ],
    });
  }

  return routes;
}

function setOrAdd(html: string, selectorRegex: RegExp, replacement: string): string {
  if (selectorRegex.test(html)) {
    return html.replace(selectorRegex, replacement);
  }
  return html.replace('</head>', `  ${replacement}\n  </head>`);
}

function renderRoute(template: string, route: RouteMeta): string {
  const canonical = `${SITE_URL}${route.routePath}`;
  const title = fullTitle(route.title);
  const imageUrl = abs(route.image);
  let html = template;

  html = setOrAdd(html, /<title>.*?<\/title>/s, `<title>${escapeHtml(title)}</title>`);
  html = setOrAdd(html, /<meta name="description" content=".*?"\s*\/?>/s, `<meta name="description" content="${escapeHtml(route.description)}" />`);
  html = setOrAdd(html, /<link rel="canonical"[^>]*>/s, `<link rel="canonical" href="${canonical}" />`);
  html = setOrAdd(html, /<meta property="og:title" content=".*?"\s*\/?>/s, `<meta property="og:title" content="${escapeHtml(title)}" />`);
  html = setOrAdd(html, /<meta property="og:description" content=".*?"\s*\/?>/s, `<meta property="og:description" content="${escapeHtml(route.description)}" />`);
  html = setOrAdd(html, /<meta property="og:url" content=".*?"\s*\/?>/s, `<meta property="og:url" content="${canonical}" />`);
  html = setOrAdd(html, /<meta property="og:type" content=".*?"\s*\/?>/s, `<meta property="og:type" content="${route.type}" />`);
  html = setOrAdd(html, /<meta property="og:image" content=".*?"\s*\/?>/s, `<meta property="og:image" content="${imageUrl}" />`);
  html = setOrAdd(html, /<meta name="twitter:title" content=".*?"\s*\/?>/s, `<meta name="twitter:title" content="${escapeHtml(title)}" />`);
  html = setOrAdd(html, /<meta name="twitter:description" content=".*?"\s*\/?>/s, `<meta name="twitter:description" content="${escapeHtml(route.description)}" />`);

  const jsonLdBlocks = route.structuredData
    .map((schema) => `<script type="application/ld+json">${JSON.stringify(schema)}</script>`)
    .join('\n  ');
  if (jsonLdBlocks) {
    html = html.replace('</head>', `  ${jsonLdBlocks}\n  </head>`);
  }

  return html;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function main() {
  const templatePath = path.join(DIST_DIR, 'index.html');
  if (!fs.existsSync(templatePath)) {
    console.error('prerender-meta: dist/index.html not found — run `vite build` first.');
    process.exit(1);
  }
  const template = fs.readFileSync(templatePath, 'utf-8');

  const allRoutes = [...STATIC_ROUTES, ...buildDynamicRoutes()];
  let written = 0;

  for (const route of allRoutes) {
    const html = renderRoute(template, route);

    if (route.routePath === '/') {
      // Homepage: overwrite the root index.html itself.
      fs.writeFileSync(templatePath, html, 'utf-8');
    } else {
      const outDir = path.join(DIST_DIR, route.routePath.replace(/^\//, ''));
      fs.mkdirSync(outDir, { recursive: true });
      fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf-8');
    }
    written += 1;
  }

  console.log(`prerender-meta: wrote ${written} static route snapshots (title/meta/canonical/OG/Twitter/JSON-LD).`);
}

main();
