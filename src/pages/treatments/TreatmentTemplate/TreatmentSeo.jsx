import { useEffect } from 'react';

/*
 * SEO head for the canonical treatment template. Upserts (replaces, not
 * appends) the static index.html head tags, mirroring SpecialitySeo.
 *
 * Props:
 *   data — treatment dataset (title, heroSubtitle, heroImage, kind)
 *   seo  — { canonicalPath?: string, index?: boolean } (index defaults false)
 */
const SITE = 'https://www.algarvepaincentre.com';
const CLINIC = {
  '@type': 'MedicalClinic',
  name: 'Algarve Pain Centre',
  url: SITE,
  telephone: '+351 915 915 001',
  email: 'info@algarvepaincentre.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Av. do Mar, Vale do Lobo',
    postalCode: '8135-107',
    addressLocality: 'Almancil',
    addressRegion: 'Algarve',
    addressCountry: 'PT',
  },
};

const clamp = (str, n = 158) => (str && str.length > n ? `${str.slice(0, n - 1).trimEnd()}…` : str);

function upsertMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export default function TreatmentSeo({ data: d, seo = {} }) {
  const { canonicalPath, index = false } = seo;

  useEffect(() => {
    const title = `${d.title} | Algarve Pain Centre`;
    const description = clamp(d.heroSubtitle || `${d.title} at Algarve Pain Centre.`);
    const canonicalUrl = canonicalPath ? `${SITE}${canonicalPath}` : `${SITE}/`;
    const image = d.heroImage ? `${SITE}${d.heroImage}` : undefined;

    document.title = title;
    upsertMeta('name', 'description', description);
    upsertMeta('name', 'robots', index ? 'index,follow' : 'noindex,follow');
    upsertLink('canonical', canonicalUrl);

    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', canonicalUrl);
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    if (image) {
      upsertMeta('property', 'og:image', image);
      upsertMeta('name', 'twitter:image', image);
    }

    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'MedicalWebPage',
      name: title,
      description,
      url: canonicalUrl,
      inLanguage: 'en',
      about: { '@type': 'MedicalProcedure', name: d.title, ...(d.kind ? { procedureType: d.kind } : {}) },
      medicalAudience: [{ '@type': 'MedicalAudience', audienceType: 'Patient' }],
      publisher: CLINIC,
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
          { '@type': 'ListItem', position: 2, name: 'Treatments', item: `${SITE}/treatments` },
          { '@type': 'ListItem', position: 3, name: d.title, item: canonicalUrl },
        ],
      },
    };
    let ld = document.getElementById('ld-treatment');
    if (!ld) {
      ld = document.createElement('script');
      ld.type = 'application/ld+json';
      ld.id = 'ld-treatment';
      document.head.appendChild(ld);
    }
    ld.textContent = JSON.stringify(jsonLd);

    return () => {
      upsertMeta('name', 'robots', 'index,follow');
      upsertLink('canonical', `${SITE}/`);
      document.getElementById('ld-treatment')?.remove();
    };
  }, [d, canonicalPath, index]);

  return null;
}
