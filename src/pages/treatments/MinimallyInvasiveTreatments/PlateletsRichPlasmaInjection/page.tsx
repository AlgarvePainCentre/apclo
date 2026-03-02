import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TreatmentsMain } from '../../Treatments';
import './PlateletsRichPlasmaInjection.css';

const PlateletsRichPlasmaInjectionPage: React.FC = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const pageTitle =
      'Platelets rich plasma injection in ${location} | Regenerative pain care';
    document.title = pageTitle;

    const description =
      'Discover platelets rich plasma injections in ${location} for joints, tendons, and ligaments. Regenerative treatment with specialist assessment and booking.';

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
            <h1 className="hero-title">Platelets rich plasma injection</h1>
            <p className="hero-subtitle">
              Concentrated platelets from your own blood support tissue healing and pain relief.
            </p>
          </div>
          <div className="hero-right">
            <p className="hero-small-text">Relief starts with a clear plan.</p>
            <button
              type="button"
              className="hero-cta"
              aria-label="Book an appointment for platelets rich plasma injection"
              onClick={() => navigate('/contact')}
            >
              Book an appointment
            </button>
          </div>
        </div>
      </section>
      <TreatmentsMain hideSurgical hideNonInvasive />
    </>
  );
};

export default PlateletsRichPlasmaInjectionPage;
