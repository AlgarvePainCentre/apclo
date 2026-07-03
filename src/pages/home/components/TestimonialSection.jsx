import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { trackEvent } from '../../../utils/analytics'; // Need to extract trackEvent

export default function TestimonialSection({ handleVideoEnter }) {
  const navigate = useNavigate();
  const testimonialSectionRef = useRef(null);
  const testimonialVideoInlineRef = useRef(null);
  const testimonialVideoSideRef = useRef(null);
  const testimonialCopyRef = useRef(null);

  return (
    <section className="home-section-testimonial" ref={testimonialSectionRef}>
      <div className="home-section-testimonial-inner">
        <div className="home-section-testimonial-copy" ref={testimonialCopyRef}>
          <p className="home-section-testimonial-eyebrow">Real stories, real relief</p>
          <h2 className="home-section-testimonial-title">
            “Algarve Pain Centre gave me back the freedom to move without fear.”
          </h2>
          <div className="home-section-testimonial-media-inline">
            <div
              className="home-section-testimonial-video"
              ref={testimonialVideoInlineRef}
              onMouseEnter={handleVideoEnter}
              onFocus={handleVideoEnter}
            >
              <video
                className="home-section-testimonial-video-el"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="/assets/images/illustrative/services-home-min-1.webp"
              >
                <source data-src="/assets/videos/post-43.av1.mp4" type='video/mp4; codecs="av01.0.05M.08"' />
                <source data-src="/assets/videos/post-43.h264.mp4" type='video/mp4; codecs="avc1.42E01E"' />
              </video>
              <div className="home-section-testimonial-video-overlay">
                <button
                  type="button"
                  className="home-section-testimonial-video-cta"
                  onClick={() => {
                    trackEvent('cta_click', { location: 'testimonial-video' });
                    navigate('/resources/testimonials/overcoming-sciatica-pain');
                  }}
                >
                  Watch how Algarve Pain Centre treats complex pain
                </button>
              </div>
            </div>
          </div>
          <p className="home-section-testimonial-body">
            After years of living around chronic spine pain, Ana arrived at Algarve Pain Centre exhausted,
            anxious, and worried about losing her independence.
          </p>
          <p className="home-section-testimonial-body">
            Working closely with our spine specialists, pain medicine doctors, and rehab team,
            she followed a tailored plan that combined minimally invasive treatments with guided
            recovery. Today, she is back to walking, working, and enjoying time with her family.
          </p>
          <p className="home-section-testimonial-author">
            Ana, 54 — spine pain patient at Algarve Pain Centre
          </p>
          <div className="home-section-testimonial-services">
            <div className="home-section-testimonial-pill">Comprehensive pain assessment</div>
            <div className="home-section-testimonial-pill">Minimally invasive procedures</div>
            <div className="home-section-testimonial-pill">Ongoing rehabilitation support</div>
          </div>
        </div>
        <div className="home-section-testimonial-media">
          <div
            className="home-section-testimonial-video"
            ref={testimonialVideoSideRef}
            onMouseEnter={handleVideoEnter}
            onFocus={handleVideoEnter}
          >
            <video
              className="home-section-testimonial-video-el"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/assets/images/illustrative/services-home-min-1.webp"
            >
              <source data-src="/assets/videos/post-43.av1.mp4" type='video/mp4; codecs="av01.0.05M.08"' />
              <source data-src="/assets/videos/post-43.h264.mp4" type='video/mp4; codecs="avc1.42E01E"' />
            </video>
            <div className="home-section-testimonial-video-overlay">
              <button
                type="button"
                className="home-section-testimonial-video-cta"
                onClick={() => {
                  trackEvent('cta_click', { location: 'testimonial-video' });
                  navigate('/resources/testimonials/overcoming-sciatica-pain');
                }}
              >
                Watch how Algarve Pain Centre treats complex pain
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
