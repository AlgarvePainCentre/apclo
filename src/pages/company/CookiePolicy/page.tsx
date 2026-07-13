import React from 'react';
import { usePageMeta } from '../../treatments/components/detail/usePageMeta';
import LegalDocumentPage from '../LegalDocumentPage';
import '../../../styles/pages/company/legal-pages.css';

const navItems = [
  { id: 'what-are-cookies', label: 'What cookies are' },
  { id: 'how-we-use-cookies', label: 'How we use cookies' },
  { id: 'cookie-categories', label: 'Cookie categories' },
  { id: 'managing-cookies', label: 'Managing your choices' },
  { id: 'third-party-cookies', label: 'Third-party cookies and embeds' },
  { id: 'contact-cookie-policy', label: 'Contact details' },
];

const CookiePolicyPage: React.FC = () => {
  usePageMeta({
    title: 'Cookie Policy | Algarve Pain Centre',
    description:
      'Read the Algarve Pain Centre Cookie Policy, including how cookies are used, how to manage consent preferences, and how embedded services are controlled.',
  });

  return (
    <LegalDocumentPage
      eyebrow="Cookie Policy"
      title="Cookie Policy"
      summary="This Cookie Policy explains how Algarve Pain Centre uses cookies, similar technologies, and consent controls when you visit our website. It is intended to support transparency under GDPR and related ePrivacy requirements."
      lastUpdated="13 July 2026"
      effectiveDate="13 July 2026"
      navItems={navItems}
    >
      <section id="what-are-cookies" className="legal-page__section" aria-labelledby="what-are-cookies-title">
        <h2 id="what-are-cookies-title">What cookies are</h2>
        <p>
          Cookies are small text files stored on your device when you visit a website. They can help the website operate securely, remember
          your preferences, understand how features are used, and support third-party services such as embedded media or maps.
        </p>
        <p>
          We also use similar browser technologies, including local storage and service-worker caching, to improve reliability and
          performance. Where these technologies are not strictly necessary for the operation of the website, we treat them as optional and
          manage them through consent controls.
        </p>
      </section>

      <section id="how-we-use-cookies" className="legal-page__section" aria-labelledby="how-we-use-cookies-title">
        <h2 id="how-we-use-cookies-title">How we use cookies</h2>
        <p>We currently use cookies and similar storage technologies for the following purposes:</p>
        <ul>
          <li>to remember your cookie-consent choices and avoid repeatedly prompting you;</li>
          <li>to enable essential website functions, navigation, and security-related behaviour;</li>
          <li>to control privacy-sensitive embeds such as video and map content until you provide consent;</li>
          <li>to improve loading performance through client-side caching of static assets.</li>
        </ul>
      </section>

      <section id="cookie-categories" className="legal-page__section" aria-labelledby="cookie-categories-title">
        <h2 id="cookie-categories-title">Cookie categories</h2>
        <div className="legal-page__table-wrap">
          <table className="legal-page__table">
            <thead>
              <tr>
                <th scope="col">Category</th>
                <th scope="col">Purpose</th>
                <th scope="col">Required for the site</th>
                <th scope="col">Typical retention</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Strictly necessary</td>
                <td>Supports core navigation, consent storage, accessibility, and security-related behaviour.</td>
                <td>Yes</td>
                <td>Up to 6 months for consent state, or for the current session where applicable.</td>
              </tr>
              <tr>
                <td>Preferences</td>
                <td>Would store optional user interface choices if enabled in the future.</td>
                <td>No</td>
                <td>Up to 6 months.</td>
              </tr>
              <tr>
                <td>Analytics</td>
                <td>Would be used only if we later enable measurement tools requiring consent.</td>
                <td>No</td>
                <td>Up to 13 months, depending on the service used.</td>
              </tr>
              <tr>
                <td>Media / third-party embeds</td>
                <td>Allows privacy-sensitive content such as embedded videos or interactive maps to load.</td>
                <td>No</td>
                <td>Up to 6 months for your consent preference; third-party retention may vary.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="managing-cookies" className="legal-page__section" aria-labelledby="managing-cookies-title">
        <h2 id="managing-cookies-title">Managing your choices</h2>
        <p>
          When you first visit the website, you are given a clear option to accept all cookies, reject non-essential cookies, or customise
          preferences. Strictly necessary cookies remain active because they are required for the website to function properly.
        </p>
        <p>
          You can change your preferences at any time by reopening the cookie settings interface or by clearing site storage in your browser.
          You may also configure your browser to block or delete cookies. Doing so may affect some functionality, especially external media
          and embedded maps.
        </p>
        <p className="legal-page__note">
          This website stores your cookie preference in a consent record so we can respect your choices across pages and future visits.
        </p>
      </section>

      <section id="third-party-cookies" className="legal-page__section" aria-labelledby="third-party-cookies-title">
        <h2 id="third-party-cookies-title">Third-party cookies and embeds</h2>
        <p>
          Some pages may offer third-party content such as videos or map embeds. These services may process technical data such as your IP
          address, browser details, and interaction history, and they may set their own cookies once activated.
        </p>
        <p>
          To reduce privacy impact, we block non-essential embedded media until you explicitly permit the relevant cookie category. You
          should also review the privacy notices of the third-party providers you interact with.
        </p>
      </section>

      <section id="contact-cookie-policy" className="legal-page__section legal-page__footer" aria-labelledby="contact-cookie-policy-title">
        <h2 id="contact-cookie-policy-title">Contact details</h2>
        <p>
          If you have questions about this Cookie Policy or how consent is managed on the website, please contact Algarve Pain Centre
          through the <a href="/contact">contact page</a>. For broader information about personal-data processing, please also review our{' '}
          <a href="/company/privacy-policy">Privacy Policy</a>.
        </p>
      </section>
    </LegalDocumentPage>
  );
};

export default CookiePolicyPage;
