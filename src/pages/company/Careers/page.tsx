import React from 'react';
import { Link } from 'react-router-dom';
import { usePageMeta } from '../../treatments/components/detail/usePageMeta';
import '../../../styles/pages/company/careers-page.css';

const DISCIPLINES = [
  { title: 'Pain medicine', body: 'Consultants and specialists in interventional and multidisciplinary pain management.' },
  { title: 'Sports medicine & rehabilitation', body: 'Physicians, physiotherapists and rehabilitation specialists focused on return to activity.' },
  { title: 'Allied health', body: 'Occupational therapy, speech therapy, psychology, nutrition and podology.' },
  { title: 'Nursing & clinic support', body: 'Nursing, front-of-house and coordination roles that keep patient care running smoothly.' },
];

const CareersPage: React.FC = () => {
  usePageMeta({
    title: 'Careers | Algarve Pain Centre',
    description:
      'Join the Algarve Pain Centre team — a multidisciplinary pain, sports and rehabilitation clinic in Vale do Lobo, Algarve. See the disciplines we work with and how to express interest in future roles.',
  });

  return (
    <div className="careers-page" id="careers">
      <header className="careers-hero" aria-label="Careers hero">
        <div className="careers-hero-inner">
          <p className="careers-eyebrow">Join our team</p>
          <h1 className="careers-title">Careers at Algarve Pain Centre</h1>
          <p className="careers-subtitle">
            We bring together pain medicine, sports medicine, rehabilitation and allied health under one roof in
            Vale do Lobo, Algarve — with a patient-first, multidisciplinary approach to care.
          </p>
        </div>
      </header>

      <main className="careers-main">
        <section className="careers-section" aria-labelledby="careers-work-title">
          <h2 id="careers-work-title" className="careers-h2">Working with us</h2>
          <p className="careers-lead">
            Our team is small, senior and collaborative. Clinicians work side by side across specialities to build a
            single plan around each patient, supported by modern facilities and a calm, considered environment.
          </p>
        </section>

        <section className="careers-section" aria-labelledby="careers-roles-title">
          <h2 id="careers-roles-title" className="careers-h2">Disciplines we work with</h2>
          <div className="careers-roles" role="list">
            {DISCIPLINES.map((d) => (
              <article className="careers-role" role="listitem" key={d.title}>
                <h3 className="careers-role-title">{d.title}</h3>
                <p className="careers-role-body">{d.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="careers-interest" aria-labelledby="careers-interest-title">
          <div className="careers-interest-inner">
            <h2 id="careers-interest-title" className="careers-h2">Open roles</h2>
            <p className="careers-lead">
              We don&apos;t have open positions advertised right now. We&apos;re always glad to hear from exceptional
              clinicians and staff, though — if you&apos;d like to be considered for future roles, tell us a little
              about yourself and we&apos;ll be in touch when something fits.
            </p>
            <div className="careers-actions">
              <Link to="/contact" className="careers-btn careers-btn--primary">Express your interest</Link>
              <span className="careers-email">
                or email <a href="mailto:info@algarvepaincentre.com">info@algarvepaincentre.com</a>
              </span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CareersPage;
