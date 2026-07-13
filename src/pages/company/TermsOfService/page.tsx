import React from 'react';
import { usePageMeta } from '../../treatments/components/detail/usePageMeta';
import LegalDocumentPage from '../LegalDocumentPage';
import '../../../styles/pages/company/legal-pages.css';

const navItems = [
  { id: 'acceptance-of-terms', label: 'Acceptance of terms' },
  { id: 'medical-information', label: 'Medical information disclaimer' },
  { id: 'acceptable-use', label: 'Acceptable use of the website' },
  { id: 'appointments-and-communications', label: 'Appointments and communications' },
  { id: 'intellectual-property', label: 'Intellectual property' },
  { id: 'liability', label: 'Liability and external links' },
  { id: 'changes-to-terms', label: 'Changes to these terms' },
  { id: 'terms-contact', label: 'Contact information' },
];

const TermsOfServicePage: React.FC = () => {
  usePageMeta({
    title: 'Terms of Service | Algarve Pain Centre',
    description:
      'Read the Algarve Pain Centre Terms of Service covering website use, medical-information limitations, communications, liability, and intellectual property.',
  });

  return (
    <LegalDocumentPage
      eyebrow="Terms of Service"
      title="Terms of Service"
      summary="These Terms of Service govern access to and use of the Algarve Pain Centre website. They explain the conditions under which website content, communications, and digital services are provided."
      lastUpdated="13 July 2026"
      effectiveDate="13 July 2026"
      navItems={navItems}
    >
      <section id="acceptance-of-terms" className="legal-page__section" aria-labelledby="acceptance-of-terms-title">
        <h2 id="acceptance-of-terms-title">Acceptance of terms</h2>
        <p>
          By accessing or using this website, you agree to these Terms of Service and to our related legal notices, including the Privacy
          Policy, Cookie Policy, and Accessibility Statement. If you do not agree, please do not use the website.
        </p>
      </section>

      <section id="medical-information" className="legal-page__section" aria-labelledby="medical-information-title">
        <h2 id="medical-information-title">Medical information disclaimer</h2>
        <p>
          Website content is provided for general informational purposes only. It does not constitute medical advice, diagnosis, treatment,
          or a substitute for direct consultation with a qualified healthcare professional.
        </p>
        <p className="legal-page__note">
          If you have urgent symptoms or believe you are experiencing a medical emergency, seek immediate medical assistance through the
          appropriate emergency service.
        </p>
      </section>

      <section id="acceptable-use" className="legal-page__section" aria-labelledby="acceptable-use-title">
        <h2 id="acceptable-use-title">Acceptable use of the website</h2>
        <p>You agree not to use the website in any way that could:</p>
        <ul>
          <li>damage, disable, overburden, or impair the website or its supporting infrastructure;</li>
          <li>attempt to gain unauthorised access to restricted systems, content, or accounts;</li>
          <li>introduce malicious code, automated scraping, spam, or abusive traffic;</li>
          <li>misrepresent identity, submit false appointment information, or interfere with other users.</li>
        </ul>
      </section>

      <section
        id="appointments-and-communications"
        className="legal-page__section"
        aria-labelledby="appointments-and-communications-title"
      >
        <h2 id="appointments-and-communications-title">Appointments and communications</h2>
        <p>
          Website forms and contact methods are intended to support enquiries, appointment requests, and general communications. Submission
          of a form does not by itself create a clinical relationship, guarantee an appointment slot, or confirm treatment suitability.
        </p>
        <p>
          Algarve Pain Centre may reply using the contact information you provide in order to handle your request. You are responsible for
          ensuring that the information you submit is accurate and up to date.
        </p>
      </section>

      <section id="intellectual-property" className="legal-page__section" aria-labelledby="intellectual-property-title">
        <h2 id="intellectual-property-title">Intellectual property</h2>
        <p>
          Unless otherwise stated, the website design, written content, graphics, branding, videos, photographs, and other materials are
          owned by Algarve Pain Centre or used under appropriate permission. These materials may not be copied, republished, or reused for
          commercial purposes without prior written authorisation.
        </p>
      </section>

      <section id="liability" className="legal-page__section" aria-labelledby="liability-title">
        <h2 id="liability-title">Liability and external links</h2>
        <p>
          We aim to keep the website accurate, accessible, and available, but we do not guarantee uninterrupted operation or that all
          content is free from error at all times. To the extent permitted by law, Algarve Pain Centre excludes liability for indirect or
          consequential loss arising from use of the website.
        </p>
        <p>
          The website may include links or embeds from third-party services. We are not responsible for the content, availability, or
          privacy practices of third-party websites beyond our direct control.
        </p>
      </section>

      <section id="changes-to-terms" className="legal-page__section" aria-labelledby="changes-to-terms-title">
        <h2 id="changes-to-terms-title">Changes to these terms</h2>
        <p>
          We may update these Terms of Service from time to time to reflect legal, clinical, operational, or technical changes. The latest
          version published on this website will apply from the effective date shown on the page.
        </p>
      </section>

      <section id="terms-contact" className="legal-page__section legal-page__footer" aria-labelledby="terms-contact-title">
        <h2 id="terms-contact-title">Contact information</h2>
        <p>
          If you have questions about these Terms of Service, please contact Algarve Pain Centre through the <a href="/contact">contact
          page</a>.
        </p>
      </section>
    </LegalDocumentPage>
  );
};

export default TermsOfServicePage;
