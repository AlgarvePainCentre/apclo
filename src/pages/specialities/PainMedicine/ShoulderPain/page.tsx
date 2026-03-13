import React from 'react';
import { useNavigate } from 'react-router-dom';
import ConditionDetailPage from '../../ConditionDetailPage';

const ShoulderPainPage: React.FC = () => {
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
            <h1 className="hero-title">Shoulder pain</h1>
            <p className="hero-subtitle">
              Shoulder pain can make simple tasks like dressing or reaching overhead feel difficult.
            </p>
          </div>
          <div className="hero-right">
            <p className="hero-small-text">Relief starts with a clear plan.</p>
            <button
              type="button"
              className="hero-cta"
              aria-label="Book an appointment for shoulder pain"
              onClick={() => navigate('/contact')}
            >
              Book an appointment
            </button>
          </div>
        </div>
      </section>
      <ConditionDetailPage title="Shoulder pain" areaLabel="shoulder pain" />
    </>
  );
};

export default ShoulderPainPage;
