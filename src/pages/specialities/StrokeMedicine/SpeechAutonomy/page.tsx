import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SpeechAutonomy.css';

const SpeechAutonomyPage: React.FC = () => {
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
            <h1 className="hero-title">Speech autonomy</h1>
            <p className="hero-subtitle">
              Targeted therapy supports communication, understanding and confidence after stroke.
            </p>
          </div>
          <div className="hero-right">
            <p className="hero-small-text">Relief starts with a clear plan.</p>
            <button
              type="button"
              className="hero-cta"
              aria-label="Book an appointment about speech autonomy after stroke"
              onClick={() => navigate('/contact')}
            >
              Book an appointment
            </button>
          </div>
        </div>
      </section>
      <main className="page-main speech-autonomy-page">
        <section className="page-section">
          <h1 className="speciality-page-title">Speech Autonomy</h1>
          <p className="speciality-page-body">Content for Speech Autonomy will go here.</p>
        </section>
      </main>
    </>
  );
};

export default SpeechAutonomyPage;
