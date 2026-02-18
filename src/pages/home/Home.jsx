import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import './Home.css';

export default function Home() {
  const heroRef = useRef(null);
  const heroVideoRef = useRef(null);
  const testimonialSectionRef = useRef(null);
  const testimonialVideoRef = useRef(null);
  const testimonialCopyRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      const vids = [
        heroVideoRef.current,
        testimonialVideoRef.current,
        ...Array.from(document.querySelectorAll('.mainpain-card-video')),
        ...Array.from(document.querySelectorAll('.treatment-card-video')),
      ].filter(Boolean);
      vids.forEach((v) => {
        try {
          v.pause();
        } catch {}
      });
      return undefined;
    }
    const videos = [
      heroVideoRef.current,
      testimonialVideoRef.current,
      ...Array.from(document.querySelectorAll('.mainpain-card-video')),
      ...Array.from(document.querySelectorAll('.treatment-card-video')),
    ].filter(Boolean);
    const onIntersect = (entries) => {
      entries.forEach((entry) => {
        const el = entry.target;
        if (!(el instanceof HTMLVideoElement)) return;
        if (entry.isIntersecting) {
          el.play().catch(() => {});
        } else {
          try {
            el.pause();
          } catch {}
        }
      });
    };
    const io = new IntersectionObserver(onIntersect, { threshold: 0.25 });
    videos.forEach((v) => io.observe(v));
    return () => io.disconnect();
  }, []);
  const handleVideoEnter = (e) => {
    const video = e.currentTarget.querySelector('video');
    if (video) {
      try {
        video.currentTime = 0;
        video.play().catch(() => {});
      } catch {}
    }
  };

  useEffect(() => {
    const heroEl = heroRef.current;
    const heroVideoEl = heroVideoRef.current;
    if (!heroEl || !heroVideoEl) {
      return undefined;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (prefersReducedMotion || isMobile) {
      return undefined;
    }

    let ticking = false;

    const updateParallax = () => {
      const viewportHeight = window.innerHeight || 1;

      const heroRect = heroEl.getBoundingClientRect();
      const heroProgress = Math.min(Math.max(heroRect.top / viewportHeight, -1), 1);
      const heroOffset = heroProgress * -110;
      heroVideoEl.style.transform = `translate3d(0, ${heroOffset}px, 0)`;

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateParallax();

    return () => {
      window.removeEventListener('scroll', onScroll);
      heroVideoEl.style.transform = '';
    };
  }, []);

  return (
    <div className="home-page">
      <Navbar />
      <section className="hero" ref={heroRef}>
        <div className="hero-video" aria-hidden="true" ref={heroVideoRef}>
          <video
            className="hero-video-el"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            src="/assets/videos/Appointment-Video.mp4"
          />
        </div>
        <div className="hero-content">
          <div className="hero-left">
            <h1 className="hero-title">Your Pain Centre</h1>
            <p className="hero-subtitle">
              Our specialized team will find the best approach to improve your
              quality of life.
            </p>
          </div>
          <div className="hero-right">
            <p className="hero-small-text">We care about your pain.</p>
            <button
              type="button"
              className="hero-cta"
              aria-label="Book an appointment"
              onClick={() => navigate('/contact')}
            >
              Book an appointment
            </button>
          </div>
        </div>
      </section>

      <section className="home-section-testimonial" ref={testimonialSectionRef}>
        <div className="home-section-testimonial-inner">
          <div
            className="home-section-testimonial-copy"
            ref={testimonialCopyRef}
          >
            <p className="home-section-testimonial-eyebrow">Real stories, real relief</p>
            <h2 className="home-section-testimonial-title">
              “APC gave me back the freedom to move without fear.”
            </h2>
            <p className="home-section-testimonial-body">
              After years of living around chronic spine pain, Ana arrived at APC exhausted,
              anxious, and worried about losing her independence.
            </p>
            <p className="home-section-testimonial-body">
              Working closely with our spine specialists, pain medicine doctors, and rehab team,
              she followed a tailored plan that combined minimally invasive treatments with guided
              recovery. Today, she is back to walking, working, and enjoying time with her family.
            </p>
            <p className="home-section-testimonial-author">
              Ana, 54 — spine pain patient at APC
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
              ref={testimonialVideoRef}
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
                src="/assets/videos/test.mp4"
              />
              <div className="home-section-testimonial-video-overlay">
                <button
                  type="button"
                  className="home-section-testimonial-video-cta"
                >
                  Watch how APC treats complex pain
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="home-main">
        <section className="home-section-cards-pain">
          <div className="home-section-cards-pain-inner">
            <div className="home-section-cards-pain-image" />
            <div className="home-section-cards-pain-cards">
              <article className="home-section-cards-pain-card">
                <h3 className="home-section-cards-pain-title">All Pain Areas</h3>
                <p className="home-section-cards-pain-description">
                  We intervene in the pathology that causes acute pain or chronic pain,
                  thereby restoring your quality of life.
                </p>
                <Link
                  to="/specialities"
                  className="home-section-cards-pain-link"
                >
                  Learn More
                </Link>
              </article>
              <div className="home-section-cards-pain-divider" />
              <article className="home-section-cards-pain-card">
                <h3 className="home-section-cards-pain-title">Our Pain Treatments</h3>
                <p className="home-section-cards-pain-description">
                  We have the most outstanding treatments performed in the world's
                  leading pain center. From peripheral nerve blocks, to cryoablation,
                  radiofrequency, among others.
                </p>
                <Link
                  to="/treatments"
                  className="home-section-cards-pain-link"
                >
                  Learn More
                </Link>
              </article>
            </div>
          </div>
        </section>
        <section className="home-section-mainpain-cards">
          <div className="home-section-mainpain-inner">
            <header className="home-section-mainpain-header">
              <h2 className="home-section-mainpain-title">Our Main Pain Areas</h2>
              <p className="home-section-mainpain-subtitle">
                Meet your medical needs and improve your life.
              </p>
            </header>
            <div className="home-section-mainpain-grid">
              <article className="mainpain-card">
                <div className="mainpain-card-image mainpain-card-image-spine">
                  <video
                    className="mainpain-card-video"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    src="/assets/videos/test.mp4"
                  />
                </div>
                <div className="mainpain-card-body">
                  <h3 className="mainpain-card-title">Spine Pain</h3>
                  <div className="mainpain-card-accent" />
                  <p className="mainpain-card-description">
                    Relieve your chronic spine pain, reclaim your freedom.
                  </p>
                  <Link
                    to="/specialities/pain-medicine/lumbar-spine-pain"
                    className="mainpain-card-cta"
                  >
                    <span>Learn more</span>
                    <span className="mainpain-card-cta-icon">→</span>
                  </Link>
                </div>
              </article>
              <article className="mainpain-card">
                <div className="mainpain-card-image mainpain-card-image-knee">
                  <video
                    className="mainpain-card-video"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    src="/assets/videos/test.mp4"
                  />
                </div>
                <div className="mainpain-card-body">
                  <h3 className="mainpain-card-title">Knee Pain</h3>
                  <div className="mainpain-card-accent" />
                  <p className="mainpain-card-description">
                    Regain your confidence, step back into life with ease.
                  </p>
                  <Link
                    to="/specialities/pain-medicine/knee-pain"
                    className="mainpain-card-cta"
                  >
                    <span>Learn more</span>
                    <span className="mainpain-card-cta-icon">→</span>
                  </Link>
                </div>
              </article>
              <article className="mainpain-card">
                <div className="mainpain-card-image mainpain-card-image-hip">
                  <video
                    className="mainpain-card-video"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    src="/assets/videos/test.mp4"
                  />
                </div>
                <div className="mainpain-card-body">
                  <h3 className="mainpain-card-title">Hip Pain</h3>
                  <div className="mainpain-card-accent" />
                  <p className="mainpain-card-description">
                    Restore your mobility, rediscover joy with those you love.
                  </p>
                  <Link
                    to="/specialities/pain-medicine/hip-and-groin-pain"
                    className="mainpain-card-cta"
                  >
                    <span>Learn more</span>
                    <span className="mainpain-card-cta-icon">→</span>
                  </Link>
                </div>
              </article>
            </div>
          </div>
        </section>
        <section className="home-section-treatment-cards">
          <div className="home-section-treatment-inner">
            <header className="home-section-treatment-header">
              <h2 className="home-section-treatment-title">Our Treatment Approaches</h2>
              <p className="home-section-treatment-subtitle">
                We can help you at every level of your health journey.
              </p>
            </header>
            <div className="home-section-treatment-grid">
              <article className="treatment-card">
                <div className="treatment-card-illustration treatment-card-illustration-non-invasive">
                  <video
                    className="treatment-card-video"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    src="/assets/videos/test.mp4"
                  />
                </div>
                <div className="treatment-card-body">
                  <h3 className="treatment-card-title">Non-Invasive Treatments</h3>
                  <div className="treatment-card-accent" />
                  <p className="treatment-card-description">
                    Quick and non-committing steps we can take together to improve
                    your health.
                  </p>
                  <Link
                    to="/treatments/non-invasive-treatments/physiotherapy"
                    className="treatment-card-cta"
                  >
                    <span>Learn more</span>
                    <span className="treatment-card-cta-icon">→</span>
                  </Link>
                </div>
              </article>
              <article className="treatment-card">
                <div className="treatment-card-illustration treatment-card-illustration-minimally-invasive">
                  <video
                    className="treatment-card-video"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    src="/assets/videos/test.mp4"
                  />
                </div>
                <div className="treatment-card-body">
                  <h3 className="treatment-card-title">Minimally Invasive Treatments</h3>
                  <div className="treatment-card-accent" />
                  <p className="treatment-card-description">
                    Procedures with reduced surgical risks that promote quicker
                    recovery times.
                  </p>
                  <Link
                    to="/treatments/minimally-invasive-treatments/vertebroplasty"
                    className="treatment-card-cta"
                  >
                    <span>Learn more</span>
                    <span className="treatment-card-cta-icon">→</span>
                  </Link>
                </div>
              </article>
              <article className="treatment-card">
                <div className="treatment-card-illustration treatment-card-illustration-surgical">
                  <video
                    className="treatment-card-video"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    src="/assets/videos/test.mp4"
                  />
                </div>
                <div className="treatment-card-body">
                  <h3 className="treatment-card-title">Surgical Treatments</h3>
                  <div className="treatment-card-accent" />
                  <p className="treatment-card-description">
                    Comprehensive procedures tailored to address complex health
                    issues with precision.
                  </p>
                  <Link
                    to="/treatments/surgical-treatments/tubular-microsurgery"
                    className="treatment-card-cta"
                  >
                    <span>Learn more</span>
                    <span className="treatment-card-cta-icon">→</span>
                  </Link>
                </div>
              </article>
            </div>
          </div>
        </section>
        <section className="home-section-why-choose-us">
          <h2>Why Choose Us</h2>
          <p>Summarize your main strengths or differentiators.</p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
