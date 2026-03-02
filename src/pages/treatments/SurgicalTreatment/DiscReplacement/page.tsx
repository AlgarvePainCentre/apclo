import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TreatmentsMain } from '../../Treatments';
import './DiscReplacement.css';

const DiscReplacementPage: React.FC = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const pageTitle = 'Disc replacement in Algarve | Motion‑preserving spine surgery';
    document.title = pageTitle;

    const description =
      'Learn how cervical or lumbar disc replacement in Algarve can relieve pain, preserve motion, and start with a specialist consultation.';

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
            <h1 className="hero-title">Disc replacement</h1>
            <p className="hero-subtitle">
              Artificial disc replacement maintains motion while relieving pain from a damaged disc.
            </p>
          </div>
          <div className="hero-right">
            <p className="hero-small-text">Relief starts with a clear plan.</p>
            <button
              type="button"
              className="hero-cta"
              aria-label="Book an appointment for disc replacement"
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

export default DiscReplacementPage;
