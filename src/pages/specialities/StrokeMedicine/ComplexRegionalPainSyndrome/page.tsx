import React from 'react';
import { useNavigate } from 'react-router-dom';
import ConditionDetailPage from '../../ConditionDetailPage';
import './ComplexRegionalPainSyndrome.css';

const ComplexRegionalPainSyndromePage: React.FC = () => {
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
            <h1 className="hero-title">Complex Regional Pain Syndrome</h1>
            <p className="hero-subtitle">
              Early, coordinated treatment can reduce pain and protect function.
            </p>
          </div>
          <div className="hero-right">
            <p className="hero-small-text">Relief starts with a clear plan.</p>
            <button
              type="button"
              className="hero-cta"
              aria-label="Book an appointment for complex regional pain syndrome"
              onClick={() => navigate('/contact')}
            >
              Book an appointment
            </button>
          </div>
        </div>
      </section>
      <ConditionDetailPage
        title="Complex Regional Pain Syndrome"
        areaLabel="complex regional pain syndrome"
      />
    </>
  );
};

export default ComplexRegionalPainSyndromePage;
