import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TreatmentsMain } from '../../Treatments';
import './SpinalFusion.css';

const SpinalFusionPage: React.FC = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const pageTitle = 'Spinal fusion in Portugal | Expert spine fusion surgeon care';
    document.title = pageTitle;

    const description =
      'Considering spinal fusion in Portugal? Meet an experienced spine fusion surgeon, explore options, and arrange a consultation or imaging review today.';

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
            <h1 className="hero-title">Spinal fusion</h1>
            <p className="hero-subtitle">
              Surgical fusion stabilises the spine when joints or discs are severely damaged.
            </p>
          </div>
          <div className="hero-right">
            <p className="hero-small-text">Relief starts with a clear plan.</p>
            <button
              type="button"
              className="hero-cta"
              aria-label="Book an appointment for spinal fusion"
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

export default SpinalFusionPage;
