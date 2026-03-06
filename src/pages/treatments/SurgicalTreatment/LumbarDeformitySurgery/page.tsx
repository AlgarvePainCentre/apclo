import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TreatmentsMain } from '../../Treatments';
import './LumbarDeformitySurgery.css';

const LumbarDeformitySurgeryPage: React.FC = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const pageTitle = 'Lumbar deformity surgery in Algarve | Complex spine realignment';
    document.title = pageTitle;

    const description =
      'Explore lumbar deformity surgery in Algarve for scoliosis or flat‑back. Learn options, recovery, and book a detailed spine assessment today.';

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
            <h1 className="hero-title">Lumbar deformity surgery</h1>
            <p className="hero-subtitle">
              Corrective lumbar surgery realigns the spine to reduce pain and improve posture.
            </p>
          </div>
          <div className="hero-right">
            <p className="hero-small-text">Relief starts with a clear plan.</p>
            <button
              type="button"
              className="hero-cta"
              aria-label="Book an appointment for lumbar deformity surgery"
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

export default LumbarDeformitySurgeryPage;
