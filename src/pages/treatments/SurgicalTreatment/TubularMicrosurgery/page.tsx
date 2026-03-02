import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TreatmentsMain } from '../../Treatments';
import './TubularMicrosurgery.css';

const TubularMicrosurgeryPage: React.FC = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const pageTitle = 'Tubular microsurgery in ${location} | Minimally invasive spine care';
    document.title = pageTitle;

    const description =
      'Learn about minimally invasive tubular microsurgery in ${location}. Reduce nerve pain, protect mobility, and review your scans with our specialist team.';

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
            <h1 className="hero-title">Tubular microsurgery</h1>
            <p className="hero-subtitle">
              Minimally invasive spine surgery using tubular retractors to relieve nerve compression.
            </p>
          </div>
          <div className="hero-right">
            <p className="hero-small-text">Relief starts with a clear plan.</p>
            <button
              type="button"
              className="hero-cta"
              aria-label="Book an appointment for tubular microsurgery"
              onClick={() => navigate('/contact')}
            >
              Book an appointment
            </button>
          </div>
        </div>
      </section>
      <TreatmentsMain hideMinimallyInvasive hideNonInvasive />
    </>
  );
};

export default TubularMicrosurgeryPage;
