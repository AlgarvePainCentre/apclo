import React from 'react';
import { Link } from 'react-router-dom';
import '../../../../styles/pages/resources/testimonials/testimonials-shared.css';
import '../../../../styles/pages/resources/testimonials/overcoming-sciatica-pain.css';
import '../../../../styles/layout/article-layout.css';
import SocialShare from '../../../../components/SocialShare';

const OvercomingSciaticaPainPage: React.FC = () => {
  const YT_ID = 'bkbLgNoKhkY';

  return (
    <main className="testimonial-page-main overcoming-sciatica-pain-page">
      <header className="article-hero" aria-label="Overcoming Sciatica Pain">
        <div className="article-hero-media">
          <img src="/assets/images/learn/9-radiating-pain.webp" alt="" aria-hidden="true" />
          <div className="article-hero-content">
            <h2>Overcoming Sciatica Pain</h2>
            <p>
              Ghislaine Renault shares her personal experience of living with and healing
              from sciatica and chronic back pain.
            </p>
          </div>
        </div>
      </header>

      <section className="page-section testimonial-video" aria-labelledby="testimonial-heading">
        <div className="video-container-wrapper">
          <div className="testimonial-intro">
            <h2 id="testimonial-heading">Patient Stories: Ghislaine's Journey</h2>
            <p>
              Ghislaine Renault shares her personal experience of living with and healing from sciatica and chronic back pain. 
              Discover how the Algarve Pain Centre's proximity-based medical approach and personalized care helped her find relief and reclaim her well-being.
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
          className="article-nav-item next"
          aria-label="Next testimonial: Control Over Spine Degeneration"
          to="/resources/testimonials/control-over-spine-degeneration"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/assets/images/illustrative/services-home-min-1.webp')",
          }}
        >
          <div className="article-nav-content">
            <span className="article-nav-label">Next Testimonial</span>
            <h2 className="article-nav-title">
              Control Over Spine Degeneration <span className="arrow">→</span>
            </h2>
          </div>
        </Link>
      </section>
    </main>
  );
};

export default OvercomingSciaticaPainPage;
