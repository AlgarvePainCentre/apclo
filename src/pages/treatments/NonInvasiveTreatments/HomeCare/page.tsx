import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TreatmentsMain } from '../../Treatments';
import './HomeCare.css';

const HomeCarePage: React.FC = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const pageTitle = 'Home care in ${location} | Medical and rehabilitation support at home';
    document.title = pageTitle;

    const description =
      'Explore home care in ${location} for medical, nursing, and rehab support at home. Personalised plans, safety checks, and easy consultation booking.';

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
            <h1 className="hero-title">Home care</h1>
            <p className="hero-subtitle">
              Professional support at home helps you continue treatment in a familiar setting.
            </p>
          </div>
          <div className="hero-right">
            <p className="hero-small-text">Relief starts with a clear plan.</p>
            <button
              type="button"
              className="hero-cta"
              aria-label="Book an appointment for home care"
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

export default HomeCarePage;
