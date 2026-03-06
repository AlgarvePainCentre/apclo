import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import '../home/Home.css';
import './Specialities.css';

export default function Specialities() {
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
            <h1 className="hero-title">Specialities</h1>
            <p className="hero-subtitle">
              Explore our areas of expertise in pain medicine, rehabilitation and stroke care.
            </p>
          </div>
          <div className="hero-right">
            <p className="hero-small-text">A multidisciplinary team dedicated to your recovery.</p>
            <button
              type="button"
              className="hero-cta"
              aria-label="Book an appointment about specialities"
              onClick={() => navigate('/contact')}
            >
              Book an appointment
            </button>
          </div>
        </div>
      </section>
      <main className="page-main">
        <section className="page-section">
          <div className="specialities-grid-header">
            <h2 className="specialities-grid-title">Where do you feel pain?</h2>
            <p className="specialities-grid-subtitle">
              Choose the area that best matches your pain to explore how we can help.
            </p>
          </div>
          <div className="specialities-grid">
            <Link
              to="/specialities/pain-medicine/head-pain"
              className="speciality-card"
            >
              <img
                src="/assets/images/Icons-Specialities/Asset-S1.png"
                alt=""
                aria-hidden="true"
                className="speciality-card-icon"
              />
              <span className="speciality-card-label">Head Pain</span>
            </Link>
            <Link
              to="/specialities/pain-medicine/cervical-spine-pain"
              className="speciality-card"
            >
              <img
                src="/assets/images/Icons-Specialities/Asset-S2.png"
                alt=""
                aria-hidden="true"
                className="speciality-card-icon"
              />
              <span className="speciality-card-label">Cervical Spine Pain</span>
            </Link>
            <Link
              to="/specialities/pain-medicine/lumbar-spine-pain"
              className="speciality-card"
            >
              <img
                src="/assets/img/Icons-Specialities/Asset-S3.png"
                alt=""
                aria-hidden="true"
                className="speciality-card-icon"
              />
              <span className="speciality-card-label">Lumbar Spine Pain</span>
            </Link>
            <Link
              to="/specialities/pain-medicine/shoulder-pain"
              className="speciality-card"
            >
              <img
                src="/assets/images/Icons-Specialities/Asset-S4.png"
                alt=""
                aria-hidden="true"
                className="speciality-card-icon"
              />
              <span className="speciality-card-label">Shoulder Pain</span>
            </Link>
            <Link
              to="/specialities/pain-medicine/hand-and-elbow-pain"
              className="speciality-card"
            >
              <img
                src="/assets/images/Icons-Specialities/Asset-S5.png"
                alt=""
                aria-hidden="true"
                className="speciality-card-icon"
              />
              <span className="speciality-card-label">Hand and Elbow Pain</span>
            </Link>
            <Link
              to="/specialities/pain-medicine/hip-and-groin-pain"
              className="speciality-card"
            >
              <img
                src="/assets/images/Icons-Specialities/Asset-S6.png"
                alt=""
                aria-hidden="true"
                className="speciality-card-icon"
              />
              <span className="speciality-card-label">Hip and Groin Pain</span>
            </Link>
            <Link
              to="/specialities/pain-medicine/knee-pain"
              className="speciality-card"
            >
              <img
                src="/assets/images/Icons-Specialities/Asset-S7.png"
                alt=""
                aria-hidden="true"
                className="speciality-card-icon"
              />
              <span className="speciality-card-label">Knee Pain</span>
            </Link>
            <Link
              to="/specialities/pain-medicine/thoracic-wall-pain"
              className="speciality-card"
            >
              <img
                src="/assets/images/Icons-Specialities/Asset-S8.png"
                alt=""
                aria-hidden="true"
                className="speciality-card-icon"
              />
              <span className="speciality-card-label">Thoracic Wall Pain</span>
            </Link>
            <Link
              to="/specialities/pain-medicine/abdominal-wall-pain"
              className="speciality-card"
            >
              <img
                src="/assets/images/Icons-Specialities/Asset-S9.png"
                alt=""
                aria-hidden="true"
                className="speciality-card-icon"
              />
              <span className="speciality-card-label">Abdominal Wall Pain</span>
            </Link>
            <Link
              to="/specialities/pain-medicine/pelvic-and-gynaecological"
              className="speciality-card"
            >
              <img
                src="/assets/images/Icons-Specialities/Asset-S10.png"
                alt=""
                aria-hidden="true"
                className="speciality-card-icon"
              />
              <span className="speciality-card-label">Pelvic &amp; Gynaecological</span>
            </Link>
            <Link
              to="/specialities/pain-medicine/facial-pain"
              className="speciality-card"
            >
              <img
                src="/assets/images/Icons-Specialities/Asset-S11.png"
                alt=""
                aria-hidden="true"
                className="speciality-card-icon"
              />
              <span className="speciality-card-label">Facial Pain</span>
            </Link>
            <Link
              to="/specialities/pain-medicine/foot-and-ankle-pain"
              className="speciality-card"
            >
              <img
                src="/assets/images/Icons-Specialities/Asset-S12.png"
                alt=""
                aria-hidden="true"
                className="speciality-card-icon"
              />
              <span className="speciality-card-label">Foot and Ankle Pain</span>
            </Link>
          </div>
        </section>
        <section className="page-section specialities-teams">
          <div className="specialities-teams-inner">
            <div className="specialities-teams-left">
              <p className="specialities-teams-eyebrow">Your care team</p>
              <h2 className="specialities-teams-title">
                Experts working together to relieve your pain
              </h2>
            </div>
            <div className="specialities-teams-right">
              <p>
                Pain medicine at Algarve Pain Centre is delivered by a coordinated multidisciplinary
                team of physicians, physiotherapists, nurses and psychologists.
              </p>
              <p>
                Together they review your history, assess your symptoms and design a personalised
                plan that may include minimally invasive procedures, rehabilitation and lifestyle
                support.
              </p>
              <p>
                You always know who is looking after you and who to turn to at every stage of
                your recovery.
              </p>
            </div>
          </div>
        </section>
        <section className="page-section specialities-treatments">
          <div className="specialities-treatments-header">
            <h2 className="specialities-treatments-title">Our Treatment Approaches</h2>
            <p className="specialities-treatments-subtitle">
              We can help you at every level of your health journey.
            </p>
          </div>
          <div className="specialities-treatments-grid">
            <article className="specialities-treatments-card">
              <div className="specialities-treatments-illustration specialities-treatments-illustration-non-invasive">
                <img
                  src="/assets/images/Icons-Specialities/Asset-S4.png"
                  alt=""
                  aria-hidden="true"
                  className="specialities-treatments-icon"
                />
              </div>
              <div className="specialities-treatments-body">
                <h3 className="specialities-treatments-card-title">Non-invasive treatments</h3>
                <div className="specialities-treatments-card-accent" />
                <p className="specialities-treatments-card-description">
                  Quick and non-committing steps we can take together to improve your health.
                </p>
                <Link
                  to="/treatments/non-invasive-treatments/physiotherapy"
                  className="specialities-treatments-card-link"
                  aria-label="Learn more about non-invasive treatments"
                >
                  <span>Learn more</span>
                  <span className="specialities-treatments-card-link-icon">→</span>
                </Link>
              </div>
            </article>
            <article className="specialities-treatments-card">
              <div className="specialities-treatments-illustration specialities-treatments-illustration-minimally-invasive">
                <img
                  src="/assets/images/Icons-Specialities/Asset-S7.png"
                  alt=""
                  aria-hidden="true"
                  className="specialities-treatments-icon"
                />
              </div>
              <div className="specialities-treatments-body">
                <h3 className="specialities-treatments-card-title">Minimally invasive treatments</h3>
                <div className="specialities-treatments-card-accent" />
                <p className="specialities-treatments-card-description">
                  Procedures with reduced surgical risks that promote quicker recovery times.
                </p>
                <Link
                  to="/treatments/minimally-invasive-treatments/vertebroplasty"
                  className="specialities-treatments-card-link"
                  aria-label="Learn more about minimally invasive treatments"
                >
                  <span>Learn more</span>
                  <span className="specialities-treatments-card-link-icon">→</span>
                </Link>
              </div>
            </article>
            <article className="specialities-treatments-card">
              <div className="specialities-treatments-illustration specialities-treatments-illustration-surgical">
                <img
                  src="/assets/images/Icons-Specialities/Asset-S10.png"
                  alt=""
                  aria-hidden="true"
                  className="specialities-treatments-icon"
                />
              </div>
              <div className="specialities-treatments-body">
                <h3 className="specialities-treatments-card-title">Surgical treatments</h3>
                <div className="specialities-treatments-card-accent" />
                <p className="specialities-treatments-card-description">
                  Comprehensive procedures tailored to address complex health issues with precision.
                </p>
                <Link
                  to="/treatments/surgical-treatments/tubular-microsurgery"
                  className="specialities-treatments-card-link"
                  aria-label="Learn more about surgical treatments"
                >
                  <span>Learn more</span>
                  <span className="specialities-treatments-card-link-icon">→</span>
                </Link>
              </div>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
