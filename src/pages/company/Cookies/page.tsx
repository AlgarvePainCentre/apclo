import React, { useEffect } from 'react';
import { usePageMeta } from '../../treatments/components/detail/usePageMeta';
import LegalDocumentPage from '../LegalDocumentPage';
import '../../../styles/pages/company/legal-pages.css';

const navItems = [
  { id: 'cookies-summary', label: 'Summary' },
  { id: 'cookies-consent', label: 'Consent controls' },
  { id: 'cookies-storage', label: 'Storage and retention' },
  { id: 'cookies-support', label: 'Support' },
];

const CookiesPage: React.FC = () => {
  usePageMeta({
    title: 'Cookies | Algarve Pain Centre',
    description:
      'A concise cookies overview for Algarve Pain Centre, including consent controls, retention periods, and links to the full Cookie Policy.',
  });

  // This is a short consent/summary companion to the full Cookie Policy, so keep
  // it reachable for users but out of the index to avoid duplicate-content with
  // /company/cookie-policy. Restore robots on unmount.
  useEffect(() => {
    let meta = document.head.querySelector('meta[name="robots"]');
    const created = !meta;
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'robots');
      document.head.appendChild(meta);
    }
    const prev = meta.getAttribute('content');
    meta.setAttribute('content', 'noindex, follow');
    return () => {
      if (created) meta.remove();
      else if (prev != null) meta.setAttribute('content', prev);
      else meta.removeAttribute('content');
    };
  }, []);

  return (
    <LegalDocumentPage
      eyebrow="Cookies"
      title="Cookies"
      summary="This page provides a concise cookies overview and mirrors the main Cookie Policy for easier access from the footer and support links."
      lastUpdated="13 July 2026"
      effectiveDate="13 July 2026"
      navItems={navItems}
    >
      <section id="cookies-summary" className="legal-page__section" aria-labelledby="cookies-summary-title">
        <h2 id="cookies-summary-title">Summary</h2>
        <p>
          Algarve Pain Centre uses a limited set of cookies and similar browser storage technologies to keep the website functioning,
          remember consent preferences, improve loading performance, and control privacy-sensitive embedded media.
        </p>
      </section>

      <section id="cookies-consent" className="legal-page__section" aria-labelledby="cookies-consent-title">
        <h2 id="cookies-consent-title">Consent controls</h2>
        <p>
          You can accept all cookies, reject optional cookies, or choose custom settings. Strictly necessary cookies stay active because the
          website depends on them for core operation and compliance.
        </p>
      </section>

      <section id="cookies-storage" className="legal-page__section" aria-labelledby="cookies-storage-title">
        <h2 id="cookies-storage-title">Storage and retention</h2>
        <p>
          Consent preferences are stored for up to 6 months unless you change or clear them sooner. Optional third-party services may apply
          their own retention periods once you choose to activate them.
        </p>
      </section>

      <section id="cookies-support" className="legal-page__section legal-page__footer" aria-labelledby="cookies-support-title">
        <h2 id="cookies-support-title">Support</h2>
        <p>
          For the full explanation, please read the <a href="/company/cookie-policy">Cookie Policy</a>. You can also contact us through the{' '}
          <a href="/contact">contact page</a> if you need help understanding or changing your preferences.
        </p>
      </section>
    </LegalDocumentPage>
  );
};

export default CookiesPage;
