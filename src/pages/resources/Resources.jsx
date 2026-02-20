import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import '../home/Home.css';
import './Resources.css';

export default function Resources() {
  const heroRef = useRef(null);
  const heroVideoRef = useRef(null);
  const navigate = useNavigate();

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
    <div className="page">
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
            <h1 className="hero-title">Resources</h1>
            <p className="hero-subtitle">
              Learn, read and explore practical advice and real patient stories.
            </p>
          </div>
          <div className="hero-right">
            <p className="hero-small-text">Guidance to support your care between visits.</p>
            <button
              type="button"
              className="hero-cta"
              aria-label="Browse resources or contact us"
              onClick={() => navigate('/contact')}
            >
              Book an appointment
            </button>
          </div>
        </div>
      </section>
      <main className="page-main">
        <section className="page-section" id="tips-for-self-care">
          <h2>Tips for Self-Care</h2>
          <p>Coming soon.</p>
        </section>
        <section className="page-section" id="blog">
          <h2>Blog</h2>
          <p>Coming soon.</p>
        </section>
        <section className="page-section" id="overcoming-sciatica-pain">
          <h2>Overcoming Sciatica Pain</h2>
          <p>Coming soon.</p>
        </section>
        <section className="page-section" id="control-over-spine-degeneration">
          <h2>Control Over Spine Degeneration</h2>
          <p>Coming soon.</p>
        </section>
        <section className="page-section" id="recovering-from-sports-injuries">
          <h2>Recovering from Sports Injuries</h2>
          <p>Coming soon.</p>
        </section>
        <section className="page-section" id="all-testimonials">
          <h2>All Testimonials</h2>
          <p>Coming soon.</p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
