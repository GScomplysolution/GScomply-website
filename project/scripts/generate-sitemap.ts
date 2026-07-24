import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = 'https://gscomply.com';
const DIST_DIR = path.resolve(__dirname, '../dist');

interface SitemapEntry {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: number;
}

const staticPages: SitemapEntry[] = [
  { loc: '/', changefreq: 'weekly', priority: 1.0 },
  { loc: '/industries', changefreq: 'weekly', priority: 0.9 },
  { loc: '/services', changefreq: 'weekly', priority: 0.9 },
  { loc: '/services/lca-pcf', changefreq: 'monthly', priority: 0.8 },
  { loc: '/insights', changefreq: 'daily', priority: 0.8 },
  { loc: '/about', changefreq: 'monthly', priority: 0.7 },
  { loc: '/contact', changefreq: 'monthly', priority: 0.7 },
];

function generateSitemap(): string {
  const today = new Date().toISOString().split('T')[0];

  const urls: string[] = [];

  staticPages.forEach(page => {
    urls.push(generateUrlEntry(SITE_URL + page.loc, today, page.changefreq, page.priority));
  });

  // Add service pages
  const services = getServices();
  services.forEach(service => {
    urls.push(generateUrlEntry(`${SITE_URL}/services/${service}`, today, 'monthly', 0.7));
  });

  // Add platform pages
  const platforms = getPlatforms();
  platforms.forEach(platform => {
    urls.push(generateUrlEntry(`${SITE_URL}/platforms/${platform}`, today, 'monthly', 0.7));
  });

  // Add industry pages
  const industries = getIndustries();
  industries.forEach(industry => {
    urls.push(generateUrlEntry(`${SITE_URL}/industries/${industry}`, today, 'monthly', 0.7));
  });

  // Add blog posts
  const posts = getBlogPosts();
  posts.forEach(post => {
    urls.push(generateUrlEntry(`${SITE_URL}/insights/${post}`, today, 'weekly', 0.6));
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;
}

function generateUrlEntry(loc: string, lastmod: string, changefreq: string, priority: number): string {
  return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority.toFixed(1)}</priority>
  </url>`;
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function getServices(): string[] {
  const servicesPath = path.resolve(__dirname, '../src/data/services.ts');
  try {
    const content = fs.readFileSync(servicesPath, 'utf-8');
    const matches = content.matchAll(/slug:\s*['"`]([^'"`]+)['"`]/g);
    const slugs: string[] = [];
    for (const match of matches) {
      if (match[1] && !slugs.includes(match[1])) {
        slugs.push(match[1]);
      }
    }
    return slugs;
  } catch {
    return [];
  }
}

function getPlatforms(): string[] {
  const platformsPath = path.resolve(__dirname, '../src/data/platforms.ts');
  try {
    const content = fs.readFileSync(platformsPath, 'utf-8');
    const matches = content.matchAll(/slug:\s*['"`]([^'"`]+)['"`]/g);
    const slugs: string[] = [];
    for (const match of matches) {
      if (match[1] && !slugs.includes(match[1])) {
        slugs.push(match[1]);
      }
    }
    return slugs;
  } catch {
    return [];
  }
}

function getIndustries(): string[] {
  const industriesPath = path.resolve(__dirname, '../src/data/industries.ts');
  try {
    const content = fs.readFileSync(industriesPath, 'utf-8');
    const matches = content.matchAll(/slug:\s*['"`]([^'"`]+)['"`]/g);
    const slugs: string[] = [];
    for (const match of matches) {
      if (match[1] && !slugs.includes(match[1])) {
        slugs.push(match[1]);
      }
    }
    return slugs;
  } catch {
    return [];
  }
}

function getBlogPosts(): string[] {
  const blogPath = path.resolve(__dirname, '../src/data/blogPosts.ts');
  try {
    const content = fs.readFileSync(blogPath, 'utf-8');
    const matches = content.matchAll(/slug:\s*['"`]([^'"`]+)['"`]/g);
    const slugs: string[] = [];
    for (const match of matches) {
      if (match[1] && !slugs.includes(match[1])) {
        slugs.push(match[1]);
      }
    }
    return slugs;
  } catch {
    return [];
  }
}

function main() {
  const sitemap = generateSitemap();
  const outputPath = path.join(DIST_DIR, 'sitemap.xml');

  // Ensure dist directory exists
  if (!fs.existsSync(DIST_DIR)) {
    fs.mkdirSync(DIST_DIR, { recursive: true });
  }

  fs.writeFileSync(outputPath, sitemap, 'utf-8');
  console.log('Generated sitemap.xml');
}

main();
