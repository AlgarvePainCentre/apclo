import React from 'react';
import { Link } from 'react-router-dom';
import '../../../../styles/pages/resources/testimonials/testimonials-shared.css';
import '../../../../styles/pages/resources/testimonials/recovering-from-sports-injuries.css';
import '../../../../styles/layout/article-layout.css';
import SocialShare from '../../../../components/SocialShare';

const RecoveringFromSportsInjuriesPage: React.FC = () => {
  const YT_ID = 'ANY7DTXlMRA';

  return (
    <main className="testimonial-page-main recovering-from-sports-injuries-page">
      <header className="article-hero" aria-label="Recovering from Sports Injuries">
        <div className="article-hero-media">
          <img src="/assets/images/illustrative/sports-medicine-min.webp" alt="" aria-hidden="true" />
          <div className="article-hero-content">
            <h2>Recovering from Sports Injuries</h2>
            <p>
              Return-to-sport recovery stories from patients who rebuilt strength, mobility and confidence
              with personalised rehabilitation.
            </p>
          </div>
        </div>
      </header>

      <section className="page-section testimonial-video" aria-labelledby="testimonial-heading">
        <div className="video-container-wrapper">
          <div className="testimonial-intro">
            <h2 id="testimonial-heading">Patient Stories: Getting Back in the Game</h2>
            <p>
              From acute strains and ligament injuries to persistent tendon pain, our team builds progressive
              recovery plans that restore movement quality, reduce re-injury risk and support a safe return to
              training.
            </p>
          </div>

          <div className="testimonial-video-frame" aria-label="Patient story video">
            <iframe
              className="testimonial-iframe"
              src={`https://www.youtube-nocookie.com/embed/${YT_ID}`}
              title="Patient story video"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        <SocialShare />
      </section>

      <section className="article-navigation-container" aria-label="Article navigation">
        <Link
          className="article-nav-item prev"
          aria-label="Previous testimonial: Control Over Spine Degeneration"
          to="/resources/testimonials/control-over-spine-degeneration"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/assets/images/treatment-img/SpinePain.webp')",
          }}
        >
          <div className="article-nav-content">
            <span className="article-nav-label">Previous Testimonial</span>
            <h2 className="article-nav-title">
              <span className="arrow">←</span> Control Over Spine Degeneration
            </h2>
          </div>
        </Link>
        <Link
          className="article-nav-item next"
          aria-label="Next testimonial: All Testimonials"
          to="/resources/testimonials/all-testimonials"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/assets/images/medical/DSC06176.webp')",
          }}
        >
          <div className="article-nav-content">
            <span className="article-nav-label">Next Testimonial</span>
            <h2 className="article-nav-title">
              All Testimonials <span className="arrow">→</span>
            </h2>
          </div>
        </Link>
      </section>
    </main>
  );
};

export default RecoveringFromSportsInjuriesPage;
