import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalPath?: string;
  noIndex?: boolean;
  type?: 'website' | 'article' | 'service' | 'product';
  image?: string;
  imageAlt?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
}

const SITE_NAME = 'GS Comply Solutions';
const SITE_URL = 'https://gscomply.com';
const DEFAULT_IMAGE = '/images/GScomply_Logo.jpeg';
const MAX_META_DESCRIPTION = 160;

/**
 * Google typically truncates meta descriptions around 155-160 characters.
 * Several of our descriptions (especially data-driven ones reused as on-page
 * body copy — service/platform descriptions, blog excerpts) run longer than
 * that by design, since they're also displayed as hero text or card copy.
 * Rather than shortening that shared source text (which would make the
 * on-page copy feel clipped), we truncate ONLY the meta-tag value here, at
 * the last word boundary before the limit, so the tag itself always
 * satisfies the 160-character guideline regardless of the source string.
 */
export function truncateDescription(text: string, max = MAX_META_DESCRIPTION): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(' ');
  const safeCut = (lastSpace > 40 ? cut.slice(0, lastSpace) : cut).replace(/[\s.,;:—–-]+$/, '');
  return `${safeCut}…`;
}

function setMeta(property: string, content: string, attr: 'name' | 'property' = 'name') {
  let el = document.querySelector(`meta[${attr}="${property}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, property);
    document.head.appendChild(el);
  }
  el.content = content;
}

function setLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

export default function SEO({
  title,
  description,
  keywords,
  canonicalPath,
  noIndex = false,
  type = 'website',
  image = DEFAULT_IMAGE,
  imageAlt = 'GS Comply Solutions - Global Product Compliance Services',
  publishedTime,
  modifiedTime,
  author,
  section,
}: SEOProps) {
  const location = useLocation();
  const canonical = canonicalPath ? `${SITE_URL}${canonicalPath}` : `${SITE_URL}${location.pathname}`;
  const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`;
  const imageUrl = image.startsWith('http') ? image : `${SITE_URL}${image}`;
  const metaDescription = truncateDescription(description);

  useEffect(() => {
    document.title = fullTitle;

    setMeta('description', metaDescription);
    if (keywords) setMeta('keywords', keywords);
    setMeta('robots', noIndex ? 'noindex, nofollow' : 'index, follow');
    setMeta('author', SITE_NAME);

    setLink('canonical', canonical);

    setMeta('og:title', fullTitle, 'property');
    setMeta('og:description', metaDescription, 'property');
    setMeta('og:type', type, 'property');
    setMeta('og:url', canonical, 'property');
    setMeta('og:image', imageUrl, 'property');
    setMeta('og:image:alt', imageAlt, 'property');
    setMeta('og:site_name', SITE_NAME, 'property');
    setMeta('og:locale', 'en_US', 'property');

    if (type === 'article') {
      if (publishedTime) setMeta('article:published_time', publishedTime, 'property');
      if (modifiedTime) setMeta('article:modified_time', modifiedTime, 'property');
      if (author) setMeta('article:author', author, 'property');
      if (section) setMeta('article:section', section, 'property');
    }

    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', metaDescription);
    setMeta('twitter:image', imageUrl);
    setMeta('twitter:image:alt', imageAlt);
    setMeta('twitter:site', '@GSComply');

    window.scrollTo(0, 0);
  }, [fullTitle, metaDescription, keywords, canonical, noIndex, type, imageUrl, imageAlt, publishedTime, modifiedTime, author, section]);

  return null;
}

export function generateArticleStructuredData(post: {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  image?: string;
  slug: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    author: {
      '@type': 'Organization',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/GScomply_Logo.jpeg`,
      },
    },
    datePublished: post.date,
    dateModified: post.date,
    image: post.image || `${SITE_URL}${DEFAULT_IMAGE}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/insights/${post.slug}`,
    },
  };
}

export function generateServiceStructuredData(service: {
  name: string;
  acronym: string;
  description: string;
  slug: string;
  region?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    areaServed: service.region || 'Global',
    url: `${SITE_URL}/services/${service.slug}`,
  };
}

export function generateBreadcrumbStructuredData(breadcrumbs: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${SITE_URL}${crumb.path}`,
    })),
  };
}

export function generateOrganizationStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/images/GScomply_Logo.jpeg`,
    description: 'Global product and material compliance services — helping manufacturers navigate REACH, RoHS, PFAS, IMDS, SCIP and beyond.',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-70103-72791',
      contactType: 'customer service',
      email: 'info.gscomply@gmail.com',
      availableLanguage: ['English'],
    },
    sameAs: [
      'https://linkedin.com/company/gscomply',
      'https://twitter.com/GSComply',
    ],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
    },
  };
}

export function generateWebSiteStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/insights?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function generateFAQStructuredData(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };
}

export function generateLocalBusinessStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: SITE_NAME,
    url: SITE_URL,        
    logo: `${SITE_URL}/images/GScomply_Logo.jpeg`,
    description: 'Product and material compliance consulting services for manufacturers worldwide.',
    telephone: '+91-70103-72791',
    email: 'info.gscomply@gmail.com',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
    },
    openingHours: 'Mo-Fr 09:00-18:00',
    priceRange: '$$',
  };
}
