import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TreatmentsMain } from '../../Treatments';
import './Cryoblation.css';

const CryoblationPage: React.FC = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const pageTitle = 'Cryoblation in ${location} | Targeted cold therapy for nerve pain';
    document.title = pageTitle;

    const description =
      'Learn about cryoblation in ${location} for chronic nerve pain. Image‑guided cold treatment, fast recovery focus, and simple consultation booking.';

    let meta = document.querySelector('meta[name=\"description\"]') as HTMLMetaElement | null;
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
            <h1 className="hero-title">Cryoblation</h1>
            <p className="hero-subtitle">
              Precise cold therapy is used to interrupt pain signals from targeted nerves.
            </p>
          </div>
          <div className="hero-right">
            <p className="hero-small-text">Relief starts with a clear plan.</p>
            <button
              type="button"
              className="hero-cta"
              aria-label="Book an appointment for cryoblation"
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

export default CryoblationPage;
