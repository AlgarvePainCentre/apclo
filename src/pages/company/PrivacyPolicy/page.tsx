import React from 'react';
import { usePageMeta } from '../../treatments/components/detail/usePageMeta';
import LegalDocumentPage from '../LegalDocumentPage';
import '../../../styles/pages/company/legal-pages.css';

const navItems = [
  { id: 'who-we-are', label: 'Who we are' },
  { id: 'information-we-collect', label: 'Information we collect' },
  { id: 'how-we-use-information', label: 'How we use information' },
  { id: 'legal-bases', label: 'Legal bases for processing' },
  { id: 'sharing-and-transfers', label: 'Sharing and international transfers' },
  { id: 'retention-and-security', label: 'Retention and security' },
  { id: 'your-rights', label: 'Your rights' },
  { id: 'privacy-contact', label: 'Contact and complaints' },
];

const PrivacyPolicyPage: React.FC = () => {
  usePageMeta({
    title: 'Privacy Policy | Algarve Pain Centre',
    description:
      'Review the Algarve Pain Centre Privacy Policy, including personal data categories, GDPR legal bases, retention, security, and data subject rights.',
  });

  return (
    <LegalDocumentPage
      eyebrow="Privacy Policy"
      title="Privacy Policy"
      summary="This Privacy Policy explains how Algarve Pain Centre may collect, use, retain, disclose, and protect personal data when you use this website or contact the clinic. It is designed as a practical GDPR-aligned transparency notice."
      lastUpdated="13 July 2026"
      effectiveDate="13 July 2026"
      navItems={navItems}
    >
      <section id="who-we-are" className="legal-page__section" aria-labelledby="who-we-are-title">
        <h2 id="who-we-are-title">Who we are</h2>
        <p>
          Algarve Pain Centre is a multidisciplinary healthcare provider based in the Algarve, Portugal. For the purposes of applicable data
          protection law, Algarve Pain Centre is the controller of personal data processed through this website unless a different role is
          stated for a specific service.
        </p>
      </section>

      <section id="information-we-collect" className="legal-page__section" aria-labelledby="information-we-collect-title">
        <h2 id="information-we-collect-title">Information we collect</h2>
        <p>Depending on how you interact with the website, we may collect:</p>
        <ul>
          <li>contact details you submit, such as name, email address, phone number, or message content;</li>
          <li>appointment or enquiry details you voluntarily provide through forms or direct communication;</li>
          <li>technical information such as IP address, browser type, device characteristics, and referring page;</li>
          <li>consent preferences relating to cookies and privacy-sensitive embedded services.</li>
        </ul>
        <p>
          We ask that you do not submit unnecessary special-category health data through general website forms unless specifically requested
          by a clinician or secure patient process.
        </p>
      </section>

      <section id="how-we-use-information" className="legal-page__section" aria-labelledby="how-we-use-information-title">
        <h2 id="how-we-use-information-title">How we use information</h2>
        <p>We may use personal data to:</p>
        <ul>
          <li>respond to enquiries and appointment requests;</li>
          <li>manage communications about services, availability, or follow-up actions you requested;</li>
          <li>maintain website functionality, security, and accessibility;</li>
          <li>document and honour cookie-consent choices;</li>
          <li>comply with legal, regulatory, or professional obligations.</li>
        </ul>
      </section>

      <section id="legal-bases" className="legal-page__section" aria-labelledby="legal-bases-title">
        <h2 id="legal-bases-title">Legal bases for processing</h2>
        <p>Under GDPR, our legal bases may include one or more of the following:</p>
        <ul>
          <li>your consent, for example where optional cookies or third-party embeds require it;</li>
          <li>taking steps at your request before entering into a service relationship;</li>
          <li>our legitimate interests in operating, securing, and improving the website, provided those interests do not override your rights;</li>
          <li>compliance with legal obligations applicable to healthcare, accounting, or regulatory record-keeping.</li>
        </ul>
      </section>

      <section id="sharing-and-transfers" className="legal-page__section" aria-labelledby="sharing-and-transfers-title">
        <h2 id="sharing-and-transfers-title">Sharing and international transfers</h2>
        <p>
          We may share limited personal data with service providers that help us operate the website or respond to communications, such as
          hosting, infrastructure, and embedded-content providers. We require those providers to process data only as necessary for the
          relevant service.
        </p>
        <p>
          If personal data is transferred outside the European Economic Area, we expect appropriate safeguards to be used, such as adequacy
          decisions or contractual protections, where legally required.
        </p>
      </section>

      <section id="retention-and-security" className="legal-page__section" aria-labelledby="retention-and-security-title">
        <h2 id="retention-and-security-title">Retention and security</h2>
        <p>
          We retain personal data only for as long as reasonably necessary for the purpose it was collected, including legal, clinical,
          administrative, and security obligations. Retention periods may differ depending on the type of enquiry or service involved.
        </p>
        <p>
          We apply proportionate technical and organisational measures to protect personal data, including access controls, secure transport
          measures, and privacy controls for optional embedded services. No website can guarantee absolute security, but we work to reduce
          risk appropriately.
        </p>
      </section>

      <section id="your-rights" className="legal-page__section" aria-labelledby="your-rights-title">
        <h2 id="your-rights-title">Your rights</h2>
        <p>Subject to legal conditions and exceptions, you may have the right to:</p>
        <ul>
          <li>request access to personal data we hold about you;</li>
          <li>request correction of inaccurate or incomplete data;</li>
          <li>request erasure where continued processing is not required;</li>
          <li>object to certain processing or request restriction of processing;</li>
          <li>withdraw consent where processing depends on consent;</li>
          <li>request data portability where applicable.</li>
        </ul>
      </section>

      <section id="privacy-contact" className="legal-page__section legal-page__footer" aria-labelledby="privacy-contact-title">
        <h2 id="privacy-contact-title">Contact and complaints</h2>
        <p>
          For privacy-related questions or rights requests, please use our <a href="/contact">contact page</a> and clearly identify your
          request. You also have the right to lodge a complaint with the relevant supervisory authority in your jurisdiction, including the
          Portuguese data protection authority where applicable.
        </p>
      </section>
    </LegalDocumentPage>
  );
};

export default PrivacyPolicyPage;
