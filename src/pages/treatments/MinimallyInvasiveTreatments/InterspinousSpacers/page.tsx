import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TreatmentsMain } from '../../Treatments';
import './InterspinousSpacers.css';

const InterspinousSpacersPage: React.FC = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const pageTitle = 'Interspinous spacers in ${location} | Relief for lumbar stenosis';
    document.title = pageTitle;

    const description =
      'Learn how interspinous spacers in ${location} can ease lumbar spinal stenosis, reduce leg pain, and support walking. Book a specialist consultation.';

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
            <h1 className="hero-title">Interspinous spacers</h1>
            <p className="hero-subtitle">
              Small implants help keep space between vertebrae to ease nerve compression.
            </p>
          </div>
          <div className="hero-right">
            <p className="hero-small-text">Relief starts with a clear plan.</p>
            <button
              type="button"
              className="hero-cta"
              aria-label="Book an appointment for interspinous spacers"
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

export default InterspinousSpacersPage;
