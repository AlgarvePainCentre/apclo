import React from 'react';
import { Link } from 'react-router-dom';
import '../../../../styles/pages/resources/testimonials/testimonials-shared.css';
import '../../../../styles/pages/resources/testimonials/control-over-spine-degeneration.css';
import '../../../../styles/layout/article-layout.css';
import SocialShare from '../../../../components/SocialShare';
import ManagedEmbed from '../../../../components/ManagedEmbed';

const ControlOverSpineDegenerationPage: React.FC = () => {
  const YT_ID = 'uK77XrRzGYA';

  return (
    <main className="testimonial-page-main control-over-spine-degeneration-page">
      <header className="article-hero" aria-label="Control Over Spine Degeneration">
        <div className="article-hero-media">
          <img 
            src="/assets/images/illustrative/rehabilitation-min.webp"
            alt=""
            aria-hidden="true"
          />
          <div className="article-hero-content">
            <h2>Control Over Spine Degeneration</h2>
            <p>
              Practical steps and patient perspectives on protecting long-term spine health.
            </p>
          </div>
        </div>
      </header>
      <section className="page-section testimonial-video" aria-labelledby="testimonial-heading">
        <div className="video-container-wrapper">
          <div className="testimonial-intro">
            <h2 id="testimonial-heading">Patient Stories: Taking Control</h2>
            <p>
              Listen to firsthand accounts from patients who have confronted spine degeneration head-on. Through
              a combination of expert medical guidance, targeted therapies, and their own resilience, they’ve
              regained their mobility and rewritten their daily routines.
            </p>
          </div>

          <div className="testimonial-video-frame" aria-label="Patient story video">
            <ManagedEmbed
              className="testimonial-iframe"
              src={`https://www.youtube-nocookie.com/embed/${YT_ID}`}
              title="Patient story video"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              openHref={`https://www.youtube.com/watch?v=${YT_ID}`}
            />
          </div>
        </div>
        <SocialShare />
      </section>
      
      <section className="article-navigation-container" aria-label="Article navigation">
        <Link
          className="article-nav-item prev"
          aria-label="Previous testimonial: Overcoming Sciatica Pain"
          to="/resources/testimonials/overcoming-sciatica-pain"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/assets/images/illustrative/services-home-min-1.webp')",
          }}
        >
          <div className="article-nav-content">
            <span className="article-nav-label">Previous Testimonial</span>
            <h2 className="article-nav-title">
              <span className="arrow">←</span> Overcoming Sciatica Pain
            </h2>
          </div>
        </Link>
        <Link
          className="article-nav-item next"
          aria-label="Next testimonial: Recovering from Sports Injuries"
          to="/resources/testimonials/recovering-from-sports-injuries"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/assets/images/medical/DSC06176.webp')",
          }}
        >
          <div className="article-nav-content">
            <span className="article-nav-label">Next Testimonial</span>
            <h2 className="article-nav-title">
              Recovering from Sports Injuries <span className="arrow">→</span>
            </h2>
          </div>
        </Link>
      </section>
    </main>
  );
};

export default ControlOverSpineDegenerationPage;
