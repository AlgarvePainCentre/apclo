import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecoveringFromSportsInjuries.css';
import '../../Learn/Article.css';
import SocialShare from '../../../../components/SocialShare';

const RecoveringFromSportsInjuriesPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const loadTimerRef = useRef<number | null>(null);
  const [showPoster, setShowPoster] = useState(true);
  const [posterLeaving, setPosterLeaving] = useState(false);

  const YT_ID = 'ANY7DTXlMRA';
  const poster = useMemo(() => `https://img.youtube.com/vi/${YT_ID}/maxresdefault.jpg`, []);
  const posterFallback = useMemo(() => `https://img.youtube.com/vi/${YT_ID}/hqdefault.jpg`, []);

  useEffect(() => {
    return () => {
      if (loadTimerRef.current) {
        window.clearTimeout(loadTimerRef.current);
      }
    };
  }, []);

  const iframeSrc = useMemo(() => {
    const origin = typeof window !== 'undefined' ? encodeURIComponent(window.location.origin) : '';
    return `https://www.youtube.com/embed/${YT_ID}?autoplay=1&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&origin=${origin}`;
  }, []);

  const handlePlay = () => {
    setError(null);
    setLoading(true);
    setPosterLeaving(true);
    window.setTimeout(() => setShowPoster(false), 220);
    loadTimerRef.current = window.setTimeout(() => {
      setLoading(false);
      setError('Video failed to load. Please try again.');
    }, 8000);
  };

  const handleIframeLoad = () => {
    if (loadTimerRef.current) {
      window.clearTimeout(loadTimerRef.current);
    }
    setLoading(false);
  };

  return (
    <main className="recovering-from-sports-injuries-page">
      <header className="article-hero" aria-label="Recovering from Sports Injuries">
        <div className="article-hero-media">
          <img src="/assets/images/illustrative/sports-medicine-min.jpeg" alt="" aria-hidden="true" />
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

          <div className="video-responsive video-interactive" aria-label="Patient story video">
            {showPoster ? (
              <button
                type="button"
                className={`video-poster${posterLeaving ? ' leaving' : ''}`}
                aria-label="Play patient story video"
                onClick={handlePlay}
              >
                <img
                  src={poster}
                  alt="Video thumbnail"
                  onError={(e) => {
                    const img = e.currentTarget as HTMLImageElement;
                    if (img.src !== posterFallback) img.src = posterFallback;
                  }}
                />
                <span className="video-play-button" aria-hidden="true">
                  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" aria-hidden="true">
                    <circle cx="32" cy="32" r="32" fill="#FF4D6D" />
                    <path d="M26 21v22l18-11L26 21z" fill="white" />
                  </svg>
                </span>
              </button>
            ) : (
              <>
                <iframe
                  className="video-iframe"
                  src={iframeSrc}
                  title="Recovering from Sports Injuries - Patient Story"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  onLoad={handleIframeLoad}
                />
                {loading && (
                  <div className="video-loader" role="status" aria-live="polite">
                    <span className="sr-only">Loading video…</span>
                  </div>
                )}
                {error && (
                  <div className="video-error" role="alert">
                    <p>{error}</p>
                    <button
                      type="button"
                      className="retry-btn"
                      onClick={() => {
                        setShowPoster(true);
                        setPosterLeaving(false);
                        setError(null);
                      }}
                    >
                      Try again
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        <SocialShare />
      </section>

      <section className="article-navigation-container" aria-label="Article navigation">
        <div
          className="article-nav-item prev"
          role="button"
          tabIndex={0}
          aria-label="Previous testimonial: Control Over Spine Degeneration"
          onClick={() => navigate('/resources/testimonials/control-over-spine-degeneration')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              navigate('/resources/testimonials/control-over-spine-degeneration');
            }
          }}
          style={{
            backgroundImage:
              "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/assets/images/treatment-img/SpinePain.jpg')",
          }}
        >
          <div className="article-nav-content">
            <span className="article-nav-label">Previous Testimonial</span>
            <h2 className="article-nav-title">
              <span className="arrow">←</span> Control Over Spine Degeneration
            </h2>
          </div>
        </div>
        <div
          className="article-nav-item next"
          role="button"
          tabIndex={0}
          aria-label="Next testimonial: All Testimonials"
          onClick={() => navigate('/resources/testimonials/all-testimonials')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              navigate('/resources/testimonials/all-testimonials');
            }
          }}
          style={{
            backgroundImage:
              "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/assets/images/medical/DSC06176.jpg')",
          }}
        >
          <div className="article-nav-content">
            <span className="article-nav-label">Next Testimonial</span>
            <h2 className="article-nav-title">
              All Testimonials <span className="arrow">→</span>
            </h2>
          </div>
        </div>
      </section>
    </main>
  );
};

export default RecoveringFromSportsInjuriesPage;
