import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ControlOverSpineDegeneration.css';
import '../../Learn/Article.css';
import SocialShare from '../../../../components/SocialShare';

const ControlOverSpineDegenerationPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const loadTimerRef = useRef<number | null>(null);
  const [showPoster, setShowPoster] = useState(true);
  const [posterLeaving, setPosterLeaving] = useState(false);

  // Reuse an existing testimonial video for now
  const YT_ID = 'uK77XrRzGYA';
  const poster = useMemo(
    () => `https://img.youtube.com/vi/${YT_ID}/maxresdefault.jpg`,
    []
  );
  const posterFallback = useMemo(
    () => `https://img.youtube.com/vi/${YT_ID}/hqdefault.jpg`,
    []
  );

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
    <main className="control-over-spine-degeneration-page">
      <header className="article-hero" aria-label="Control Over Spine Degeneration">
        <div className="article-hero-media">
          <img 
            src=""
            >
          </img>
          <div className="article-hero-content">
            <h2>Control Over Spine Degeneration</h2>
            <p>
              Practical steps and patient perspectives on protecting long-term spine health.
            </p>
          </div>
        </div>
      </header>
      <section className="page-section testimonial-video" aria-labelledby="control-spine-heading">

        <div className="video-container-wrapper">
          <div className="testimonial-intro">
            <h2>Patient Stories: Filomena & Roland's Journey </h2>
            <p>
              How a personalised, proximity-based care plan helped manage spine degeneration
              and protect long-term spine health.
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
                  title="Control Over Spine Degeneration - Patient Story"
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
          aria-label="Previous testimonial: Overcoming Sciatica Pain"
          onClick={() => navigate('/resources/testimonials/overcoming-sciatica-pain')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              navigate('/resources/testimonials/overcoming-sciatica-pain');
            }
          }}
          style={{
            backgroundImage:
              "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/assets/images/illustrative/services-home-min-1.jpg')",
          }}
        >
          <div className="article-nav-content">
            <span className="article-nav-label">Previous Testimonial</span>
            <h2 className="article-nav-title">
              <span className="arrow">←</span> Overcoming Sciatica Pain
            </h2>
          </div>
        </div>
        <div
          className="article-nav-item next"
          role="button"
          tabIndex={0}
          aria-label="Next testimonial: Recovering from Sports Injuries"
          onClick={() => navigate('/resources/testimonials/recovering-from-sports-injuries')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              navigate('/resources/testimonials/recovering-from-sports-injuries');
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
              Recovering from Sports Injuries <span className="arrow">→</span>
            </h2>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ControlOverSpineDegenerationPage;
