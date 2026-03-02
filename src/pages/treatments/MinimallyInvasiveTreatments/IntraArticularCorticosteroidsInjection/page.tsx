import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TreatmentsMain } from '../../Treatments';
import './IntraArticularCorticosteroidsInjection.css';

const IntraArticularCorticosteroidsInjectionPage: React.FC = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const pageTitle =
      'Intra‑articular corticosteroids injection in ${location} | Joint pain relief';
    document.title = pageTitle;

    const description =
      'Learn about intra‑articular corticosteroid injections in ${location} for knee, hip, or shoulder pain. Image‑guided, safe dosing, and easy consultation booking.';

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
            <h1 className="hero-title">Intra-articular corticosteroids injection</h1>
            <p className="hero-subtitle">
              Image-guided steroid injections reduce inflammation inside painful joints.
            </p>
          </div>
          <div className="hero-right">
            <p className="hero-small-text">Relief starts with a clear plan.</p>
            <button
              type="button"
              className="hero-cta"
              aria-label="Book an appointment for intra-articular corticosteroids injection"
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

export default IntraArticularCorticosteroidsInjectionPage;
