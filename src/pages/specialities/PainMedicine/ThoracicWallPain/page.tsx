import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ThoracicWallPain.css';

const ThoracicWallPainPage: React.FC = () => {
  const navigate = useNavigate();

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
            <h1 className="hero-title">Thoracic wall pain</h1>
            <p className="hero-subtitle">
              Pain in the chest wall can be worrying and is often linked to posture, joints or nerves.
            </p>
          </div>
          <div className="hero-right">
            <p className="hero-small-text">Relief starts with a clear plan.</p>
            <button
              type="button"
              className="hero-cta"
              aria-label="Book an appointment for thoracic wall pain"
              onClick={() => navigate('/contact')}
            >
              Book an appointment
            </button>
          </div>
        </div>
      </section>
      <main className="page-main thoracic-wall-pain-page">
        <section className="page-section">
          <h1 className="speciality-page-title">Thoracic Wall Pain</h1>
          <p className="speciality-page-body">Content for Thoracic Wall Pain will go here.</p>
        </section>
      </main>
    </>
  );
};

export default ThoracicWallPainPage;
