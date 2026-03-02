import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TreatmentsMain } from '../../Treatments';
import './OccupationTherapy.css';

const OccupationTherapyPage: React.FC = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const pageTitle = 'Occupation therapy in ${location} | Daily activity and independence support';
    document.title = pageTitle;

    const description =
      'Explore occupation therapy in ${location} to improve daily activities, adapt your environment, and plan your recovery. Book a supportive consultation today.';

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
            <h1 className="hero-title">Occupation therapy</h1>
            <p className="hero-subtitle">
              Practical strategies help you manage daily activities more comfortably and independently.
            </p>
          </div>
          <div className="hero-right">
            <p className="hero-small-text">Relief starts with a clear plan.</p>
            <button
              type="button"
              className="hero-cta"
              aria-label="Book an appointment for occupation therapy"
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

export default OccupationTherapyPage;
