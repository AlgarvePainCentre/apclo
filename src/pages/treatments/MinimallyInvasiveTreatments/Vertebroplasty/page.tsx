import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TreatmentsMain } from '../../Treatments';
import './Vertebroplasty.css';

const VertebroplastyPage: React.FC = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const pageTitle = 'Vertebroplasty in ${location} | Cement injection for spine fractures';
    document.title = pageTitle;

    const description =
      'Learn about vertebroplasty in ${location} for painful spinal fractures. Image‑guided cement injection, rapid pain relief, and fast consultation booking.';

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
            <h1 className="hero-title">Vertebroplasty</h1>
            <p className="hero-subtitle">
              Cement injection stabilises painful vertebral fractures and supports your spine.
            </p>
          </div>
          <div className="hero-right">
            <p className="hero-small-text">Relief starts with a clear plan.</p>
            <button
              type="button"
              className="hero-cta"
              aria-label="Book an appointment for vertebroplasty"
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

export default VertebroplastyPage;
