import React from 'react';
import { usePageMeta } from '../../treatments/components/detail/usePageMeta';
import LegalDocumentPage from '../LegalDocumentPage';
import '../../../styles/pages/company/legal-pages.css';

const navItems = [
  { id: 'commitment', label: 'Accessibility commitment' },
  { id: 'conformance', label: 'Conformance target' },
  { id: 'measures', label: 'Measures currently in place' },
  { id: 'known-limitations', label: 'Known limitations' },
  { id: 'feedback', label: 'Feedback and assistance' },
  { id: 'compatibility', label: 'Technical compatibility' },
];

const AccessibilityStatementPage: React.FC = () => {
  usePageMeta({
    title: 'Accessibility Statement | Algarve Pain Centre',
    description:
      'Read the Algarve Pain Centre Accessibility Statement, including accessibility commitments, WCAG conformance targets, compatibility notes, and feedback channels.',
  });

  return (
    <LegalDocumentPage
      eyebrow="Accessibility Statement"
      title="Accessibility Statement"
      summary="Algarve Pain Centre is committed to making this website accessible to as many people as possible, including people using assistive technology, keyboard navigation, reduced-motion settings, and different screen sizes."
      lastUpdated="13 July 2026"
      effectiveDate="13 July 2026"
      navItems={navItems}
    >
      <section id="commitment" className="legal-page__section" aria-labelledby="commitment-title">
        <h2 id="commitment-title">Accessibility commitment</h2>
        <p>
          We aim to provide a website experience that is perceivable, operable, understandable, and robust. Accessibility is treated as an
          ongoing process and is considered during design, development, content updates, and quality assurance work.
        </p>
      </section>

      <section id="conformance" className="legal-page__section" aria-labelledby="conformance-title">
        <h2 id="conformance-title">Conformance target</h2>
        <p>
          Our target is to align the website with the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA and to continue improving
          toward WCAG 2.2 practices where practical within the current platform.
        </p>
      </section>

      <section id="measures" className="legal-page__section" aria-labelledby="measures-title">
        <h2 id="measures-title">Measures currently in place</h2>
        <ul>
          <li>responsive layouts designed to work across desktop, tablet, and mobile viewport sizes;</li>
          <li>semantic headings, landmarks, and accessible link/button labelling where available in the interface;</li>
          <li>keyboard-focus styling and support for major interactive controls;</li>
          <li>lazy loading for non-essential media to reduce performance-related barriers;</li>
          <li>privacy-aware media controls that avoid loading some third-party embeds before consent.</li>
        </ul>
      </section>

      <section id="known-limitations" className="legal-page__section" aria-labelledby="known-limitations-title">
        <h2 id="known-limitations-title">Known limitations</h2>
        <p>
          Despite our efforts, some content or third-party integrations may not yet fully meet every accessibility expectation. Examples may
          include older media embeds, third-party services, or pages that are still being progressively modernised.
        </p>
        <p>
          We prioritise remediation work based on user impact, clinical importance, and recurring barriers reported by visitors.
        </p>
      </section>

      <section id="feedback" className="legal-page__section" aria-labelledby="feedback-title">
        <h2 id="feedback-title">Feedback and assistance</h2>
        <p>
          If you experience an accessibility barrier, need content in an alternative format, or have a suggestion for improvement, please
          contact us through the <a href="/contact">contact page</a>. When possible, include the page URL, the issue you encountered, the
          assistive technology or browser used, and your preferred way for us to respond.
        </p>
      </section>

      <section id="compatibility" className="legal-page__section legal-page__footer" aria-labelledby="compatibility-title">
        <h2 id="compatibility-title">Technical compatibility</h2>
        <p>
          The website is intended to work with current versions of major browsers and common assistive technologies. Because some external
          services are outside our direct control, compatibility may vary depending on the provider and device environment.
        </p>
      </section>
    </LegalDocumentPage>
  );
};

export default AccessibilityStatementPage;
