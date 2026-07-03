import { Link } from 'react-router-dom';
import { trackEvent } from '../../../utils/analytics';

export default function CardsPainSection({ heroVariant, handleVideoEnter }) {
  return (
    <section className="home-section-cards-pain">
      <div className="home-section-cards-pain-inner">
        <div
          className="home-section-cards-pain-image"
          onMouseEnter={handleVideoEnter}
          onFocus={handleVideoEnter}
        >
          <video
            className="home-section-cards-pain-video"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/assets/images/medical/DSC06176.webp"
            aria-hidden="true"
          >
            <source data-src="/assets/videos/Pain-Medicine-min.av1.mp4" type='video/mp4; codecs="av01.0.05M.08"' />
            <source data-src="/assets/videos/Pain-Medicine-min.h264.mp4" type='video/mp4; codecs="avc1.42E01E"' />
          </video>
        </div>
        <div className="home-section-cards-pain-cards">
          <article className="home-section-cards-pain-card">
            <p className="home-section-cards-pain-eyebrow">Personalised pain pathways</p>
            <h3 className="home-section-cards-pain-title">All pain areas we treat</h3>
            <p className="home-section-cards-pain-description">
              From spine and joint pain to complex neurological conditions, our multidisciplinary team
              understands the root cause of your pain and builds a plan around you.
            </p>
            <Link
              to="/specialities"
              className="home-section-cards-pain-link"
              onClick={() => trackEvent('nav_click', { location: 'home-cards', to: 'specialities' })}
            >
              {heroVariant === 'B' ? 'Find your condition' : 'Explore pain areas'}
              <span className="home-section-cards-pain-link-icon">→</span>
            </Link>
          </article>
          <div className="home-section-cards-pain-divider" />
          <article className="home-section-cards-pain-card">
            <p className="home-section-cards-pain-eyebrow">Evidence-based treatments</p>
            <h3 className="home-section-cards-pain-title">Advanced pain treatments</h3>
            <p className="home-section-cards-pain-description">
              Access a full spectrum of options—from non-invasive therapies to image‑guided procedures
              and advanced spine interventions—delivered in one coordinated centre.
            </p>
            <Link
              to="/treatments"
              className="home-section-cards-pain-link home-section-cards-pain-link-secondary"
              onClick={() => trackEvent('nav_click', { location: 'home-cards', to: 'treatments' })}
            >
              See treatment options
              <span className="home-section-cards-pain-link-icon">→</span>
            </Link>
          </article>
          <div className="home-quick-appointment" role="group" aria-label="Quick appointment options">
            <a
              className="home-quick-appointment-link"
              href="tel:+351915915001"
              onClick={() => trackEvent('call_click', { location: 'home-quick-appointment' })}
            >
              Call now
            </a>
            <Link
              className="home-quick-appointment-link home-quick-appointment-secondary"
              to="/contact"
              onClick={() => trackEvent('cta_click', { location: 'home-quick-appointment' })}
            >
              Book appointment
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
