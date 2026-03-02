import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TreatmentsMain } from '../../Treatments';
import './PharmacologicalPainManagement.css';

const PharmacologicalPainManagementPage: React.FC = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const pageTitle =
      'Pharmacological pain management in ${location} | Tailored medication plans';
    document.title = pageTitle;

    const description =
      'Learn about pharmacological pain management in ${location}. Individualised medication plans, side‑effect monitoring, and easy access to specialist consultation.';

    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = description;
  }, []);

  return (
    <>
      <section className="hero">
        <div className="hero-video" aria-hidden="true">
          <video
            className="hero-video-el"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            src="/assets/videos/banner-consulta-2.mp4"
          />
        </div>
        <div className="hero-content">
          <div className="hero-left">
            <h1 className="hero-title">Pharmacological pain management</h1>
            <p className="hero-subtitle">
              Tailored medication plans help balance pain relief with safety and side effects.
            </p>
          </div>
          <div className="hero-right">
            <p className="hero-small-text">Relief starts with a clear plan.</p>
            <button
              type="button"
              className="hero-cta"
              aria-label="Book an appointment for pharmacological pain management"
              onClick={() => navigate('/contact')}
            >
              Book an appointment
            </button>
          </div>
        </div>
      </section>
      <TreatmentsMain hideSurgical hideMinimallyInvasive />
    </>
  );
};

export default PharmacologicalPainManagementPage;
