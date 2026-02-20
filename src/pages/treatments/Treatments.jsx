import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import '../home/Home.css';
import './Treatments.css';

export default function Treatments() {
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
            <h1 className="hero-title">Treatments</h1>
            <p className="hero-subtitle">
                We have the most outstanding treatments performed in the world’s leading pain centers, from peripheral nerve blocks, to cryoablation, radiofrequency, among others.
            </p>
          </div>
          <div className="hero-right">
            <p className="hero-small-text">We design your treatment plan step by step.</p>
            <button
              type="button"
              className="hero-cta"
              aria-label="Book an appointment about treatments"
              onClick={() => navigate('/contact')}
            >
              Book an appointment
            </button>
          </div>
        </div>
      </section>
      <main className="page-main">
        <section className="page-section treatments-overview">
          <div className="treatments-overview-header">
            <h2 className="treatments-overview-title">
              We can help you at every level of your health journey
            </h2>
            <p className="treatments-overview-subtitle">
              We practice a wide variety of non‑invasive, minimally invasive and surgical treatments
              in line with internationally leading clinics, so your plan is individually tailored.
            </p>
          </div>
          <div className="treatments-overview-layout">
            <article className="treatments-overview-card">
              <h3 className="treatments-overview-card-title">Surgical procedures</h3>
              <div className="treatments-overview-card-accent" />
              <p className="treatments-overview-card-body">
                Surgical procedures are comprehensive interventions designed to address complex
                spine and pain conditions with precision.
              </p>
              <p className="treatments-overview-card-body">
                They use advanced techniques to decompress nerves, stabilise the spine and correct
                deformities when less invasive options are not enough.
              </p>
              <Link
                to="/treatments/surgical-treatments/spinal-fusion"
                className="treatments-overview-card-link"
                aria-label="Learn more about surgical spine procedures"
              >
                <span>Learn more</span>
                <span className="treatments-overview-card-link-icon">→</span>
              </Link>
            </article>
            <div className="treatments-overview-media" aria-hidden="true">
              <div className="treatments-overview-media-inner">
                <video
                  className="treatments-overview-video"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  src="/assets/videos/Appointment-Video.mp4"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="page-section treatments-highlighted">
          <div className="treatments-highlighted-header">
            <h2 className="treatments-highlighted-title">Highlighted surgical procedures</h2>
          </div>
          <div className="treatments-highlighted-grid">
            <article className="treatment-highlight-card">
              <div className="treatment-highlight-illustration">
                <img
                  src="/assets/images/Icons-Specialities/Asset-S13.png"
                  alt=""
                  aria-hidden="true"
                  className="treatment-highlight-icon"
                />
              </div>
              <div className="treatment-highlight-body">
                <h3 className="treatment-highlight-title">Tubular microsurgery</h3>
                <Link
                  to="/treatments/surgical-treatments/tubular-microsurgery"
                  className="treatment-highlight-link"
                  aria-label="Learn more about tubular microsurgery"
                >
                  <span>Learn more</span>
                  <span className="treatment-highlight-link-icon">→</span>
                </Link>
              </div>
            </article>
            <article className="treatment-highlight-card">
              <div className="treatment-highlight-illustration">
                <img
                  src="/assets/images/Icons-Specialities/Asset-S14.png"
                  alt=""
                  aria-hidden="true"
                  className="treatment-highlight-icon"
                />
              </div>
              <div className="treatment-highlight-body">
                <h3 className="treatment-highlight-title">Spinal fusion</h3>
                <Link
                  to="/treatments/surgical-treatments/spinal-fusion"
                  className="treatment-highlight-link"
                  aria-label="Learn more about spinal fusion"
                >
                  <span>Learn more</span>
                  <span className="treatment-highlight-link-icon">→</span>
                </Link>
              </div>
            </article>
            <article className="treatment-highlight-card">
              <div className="treatment-highlight-illustration">
                <img
                  src="/assets/images/Icons-Specialities/Asset-S15.png"
                  alt=""
                  aria-hidden="true"
                  className="treatment-highlight-icon"
                />
              </div>
              <div className="treatment-highlight-body">
                <h3 className="treatment-highlight-title">Disc replacement</h3>
                <Link
                  to="/treatments/surgical-treatments/disc-replacement"
                  className="treatment-highlight-link"
                  aria-label="Learn more about disc replacement"
                >
                  <span>Learn more</span>
                  <span className="treatment-highlight-link-icon">→</span>
                </Link>
              </div>
            </article>
          </div>
        </section>
        <section className="page-section treatments-feature treatments-feature-mi">
          <div className="treatments-overview-header treatments-feature-mi-header">
            <h2 className="treatments-overview-title">Minimally invasive treatments</h2>
            <p className="treatments-overview-subtitle">
              Learn about options that use small, image‑guided procedures to ease pain while
              limiting recovery time and scarring.
            </p>
          </div>
          <div className="treatments-feature-inner">
            <div className="treatments-feature-media" aria-hidden="true">
              <video
                className="treatments-feature-video"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                src="/assets/videos/Appointment-Video.mp4"
              />
            </div>
            <div className="treatments-feature-copy">
              <h3 className="treatments-feature-title">Minimally Invasive Treatments</h3>
              <div className="treatments-feature-accent" />
              <p className="treatments-feature-body">
                Minimally invasive procedures reduce surgical risks and promote faster recovery by
                using small, precise approaches guided by imaging.
              </p>
              <p className="treatments-feature-body">
                When appropriate, these techniques minimise postoperative pain and downtime while
                maintaining high levels of efficacy and safety.
              </p>
              <Link
                to="/treatments/minimally-invasive-treatments/radiofrequency"
                className="treatments-feature-link"
                aria-label="Learn more about minimally invasive treatments"
              >
                <span>Learn more</span>
                <span className="treatments-feature-link-icon">→</span>
              </Link>
            </div>
          </div>
        </section>
        <section className="page-section treatments-highlighted treatments-highlighted-mi">
          <div className="treatments-highlighted-header">
            <h2 className="treatments-highlighted-title">Highlighted minimally invasive treatments</h2>
          </div>
          <div className="treatments-highlighted-grid">
            <article className="treatment-highlight-card">
              <div className="treatment-highlight-illustration">
                <img
                  src="/assets/images/Icons-Specialities/Asset-S12.png"
                  alt=""
                  aria-hidden="true"
                  className="treatment-highlight-icon"
                />
              </div>
              <div className="treatment-highlight-body">
                <h3 className="treatment-highlight-title">Vertebroplasty</h3>
                <Link
                  to="/treatments/minimally-invasive-treatments/vertebroplasty"
                  className="treatment-highlight-link"
                  aria-label="Learn more about vertebroplasty"
                >
                  <span>Learn more</span>
                  <span className="treatment-highlight-link-icon">→</span>
                </Link>
              </div>
            </article>
            <article className="treatment-highlight-card">
              <div className="treatment-highlight-illustration">
                <img
                  src="/assets/images/Icons-Specialities/Asset-S9.png"
                  alt=""
                  aria-hidden="true"
                  className="treatment-highlight-icon"
                />
              </div>
              <div className="treatment-highlight-body">
                <h3 className="treatment-highlight-title">Radiofrequency</h3>
                <Link
                  to="/treatments/minimally-invasive-treatments/radiofrequency"
                  className="treatment-highlight-link"
                  aria-label="Learn more about radiofrequency"
                >
                  <span>Learn more</span>
                  <span className="treatment-highlight-link-icon">→</span>
                </Link>
              </div>
            </article>
            <article className="treatment-highlight-card">
              <div className="treatment-highlight-illustration">
                <img
                  src="/assets/images/Icons-Specialities/Asset-S8.png"
                  alt=""
                  aria-hidden="true"
                  className="treatment-highlight-icon"
                />
              </div>
              <div className="treatment-highlight-body">
                <h3 className="treatment-highlight-title">Interspinous spacers</h3>
                <Link
                  to="/treatments/minimally-invasive-treatments/interspinous-spacers"
                  className="treatment-highlight-link"
                  aria-label="Learn more about interspinous spacers"
                >
                  <span>Learn more</span>
                  <span className="treatment-highlight-link-icon">→</span>
                </Link>
              </div>
            </article>
          </div>
        </section>
        <section className="page-section treatments-feature treatments-feature-ni">
          <div className="treatments-overview-header treatments-feature-ni-header">
            <h2 className="treatments-overview-title">Non‑invasive treatments</h2>
            <p className="treatments-overview-subtitle">
              Explore non‑invasive options that focus on assessment, movement and lifestyle before
              considering procedures or surgery.
            </p>
          </div>
          <div className="treatments-feature-inner">
            <div className="treatments-feature-copy">
              <h3 className="treatments-feature-title">Non‑invasive treatments</h3>
              <div className="treatments-feature-accent treatments-feature-accent-ni" />
              <p className="treatments-feature-body">
                Non‑invasive options focus on assessment and treatment without breaking the skin or
                entering the body—ideal for many conditions and for building a conservative plan.
              </p>
              <p className="treatments-feature-body">
                These approaches help reduce risk and recovery time while providing meaningful
                relief and functional improvement.
              </p>
              <Link
                to="/treatments/non-invasive-treatments/physiotherapy"
                className="treatments-feature-link"
                aria-label="See all non-invasive treatments"
              >
                <span>All non‑invasive treatments</span>
                <span className="treatments-feature-link-icon">→</span>
              </Link>
            </div>
            <div className="treatments-feature-media" aria-hidden="true">
              <video
                className="treatments-feature-video"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                src="/assets/videos/Appointment-Video.mp4"
              />
            </div>
          </div>
        </section>
        <section className="page-section treatments-highlighted treatments-highlighted-ni">
          <div className="treatments-highlighted-header">
            <h2 className="treatments-highlighted-title">Highlighted non‑invasive treatments</h2>
          </div>
          <div className="treatments-highlighted-grid">
            <article className="treatment-highlight-card">
              <div className="treatment-highlight-illustration">
                <img
                  src="/assets/images/Icons-Specialities/Asset-S4.png"
                  alt=""
                  aria-hidden="true"
                  className="treatment-highlight-icon"
                />
              </div>
              <div className="treatment-highlight-body">
                <h3 className="treatment-highlight-title">Pharmacological pain management</h3>
                <Link
                  to="/treatments/non-invasive-treatments/pharmacological-pain-management"
                  className="treatment-highlight-link"
                  aria-label="Learn more about pharmacological pain management"
                >
                  <span>Learn more</span>
                  <span className="treatment-highlight-link-icon">→</span>
                </Link>
              </div>
            </article>
            <article className="treatment-highlight-card">
              <div className="treatment-highlight-illustration">
                <img
                  src="/assets/images/Icons-Specialities/Asset-S7.png"
                  alt=""
                  aria-hidden="true"
                  className="treatment-highlight-icon"
                />
              </div>
              <div className="treatment-highlight-body">
                <h3 className="treatment-highlight-title">Physiotherapy</h3>
                <Link
                  to="/treatments/non-invasive-treatments/physiotherapy"
                  className="treatment-highlight-link"
                  aria-label="Learn more about physiotherapy"
                >
                  <span>Learn more</span>
                  <span className="treatment-highlight-link-icon">→</span>
                </Link>
              </div>
            </article>
            <article className="treatment-highlight-card">
              <div className="treatment-highlight-illustration">
                <img
                  src="/assets/images/Icons-Specialities/Asset-S10.png"
                  alt=""
                  aria-hidden="true"
                  className="treatment-highlight-icon"
                />
              </div>
              <div className="treatment-highlight-body">
                <h3 className="treatment-highlight-title">Nutrition</h3>
                <Link
                  to="/treatments/non-invasive-treatments/nutrition"
                  className="treatment-highlight-link"
                  aria-label="Learn more about nutrition"
                >
                  <span>Learn more</span>
                  <span className="treatment-highlight-link-icon">→</span>
                </Link>
              </div>
            </article>
          </div>
        </section>
        <section className="page-section treatments-pain-learn">
          <div className="treatments-pain-learn-header">
            <h2 className="treatments-pain-learn-title">Learn More About Your Pain</h2>
            <p className="treatments-pain-learn-subtitle">Meet your medical needs and improve your life.</p>
          </div>
          <div className="treatments-pain-grid">
            <article className="pain-learn-card">
              <div className="pain-learn-media">
                <img src="/assets/images/treatment-img/SpinePain.jpg" alt="" aria-hidden="true" />
              </div>
              <div className="pain-learn-body">
                <h3 className="pain-learn-title">Spine Pain</h3>
                <div className="pain-learn-accent" />
                <p className="pain-learn-description">
                  Ease persistent spine pain with a plan designed to protect your mobility.
                </p>
                <Link
                  to="/specialities/pain-medicine/lumbar-spine-pain"
                  className="pain-learn-link"
                  aria-label="Learn more about spine pain"
                >
                  <span>Learn more</span>
                  <span className="treatment-highlight-link-icon">→</span>
                </Link>
              </div>
            </article>
            <article className="pain-learn-card">
              <div className="pain-learn-media">
                <img src="/assets/images/treatment-img/KneePain.jpg" alt="" aria-hidden="true" />
              </div>
              <div className="pain-learn-body">
                <h3 className="pain-learn-title">Knee Pain</h3>
                <div className="pain-learn-accent" />
                <p className="pain-learn-description">
                  Support unstable or aching knees so you can walk, climb and move confidently.
                </p>
                <Link
                  to="/specialities/pain-medicine/knee-pain"
                  className="pain-learn-link"
                  aria-label="Learn more about knee pain"
                >
                  <span>Learn more</span>
                  <span className="treatment-highlight-link-icon">→</span>
                </Link>
              </div>
            </article>
            <article className="pain-learn-card">
              <div className="pain-learn-media">
                <img src="/assets/images/treatment-img/HipPain.jpg" alt="" aria-hidden="true" />
              </div>
              <div className="pain-learn-body">
                <h3 className="pain-learn-title">Hip Pain</h3>
                <div className="pain-learn-accent" />
                <p className="pain-learn-description">
                  Reduce hip stiffness and pain to sit, stand and stay active more comfortably.
                </p>
                <Link
                  to="/specialities/pain-medicine/hip-and-groin-pain"
                  className="pain-learn-link"
                  aria-label="Learn more about hip pain"
                >
                  <span>Learn more</span>
                  <span className="treatment-highlight-link-icon">→</span>
                </Link>
              </div>
            </article>
          </div>
        </section>
        <section className="page-section treatments-testimonials">
          <div className="treatments-testimonials-header">
            <h2 className="treatments-testimonials-title">Your opinion makes the difference</h2>
          </div>
          <div className="treatments-testimonials-grid">
            <article className="testimonial-card">
              <p className="testimonial-quote">
                “The staff are professional, kind and attentive. From the first consultation through
                follow‑up, I always felt listened to and supported.”
              </p>
              <div className="testimonial-person">
                <div className="testimonial-avatar">C</div>
                <div className="testimonial-meta">
                  <div className="testimonial-name">Celeste Cutting</div>
                  <div className="testimonial-location">United Kingdom</div>
                </div>
              </div>
            </article>
            <article className="testimonial-card">
              <p className="testimonial-quote">
                “Within a few weeks my pain was noticeably better. The team explained every option
                clearly so I could choose what felt right for me.”
              </p>
              <div className="testimonial-person">
                <div className="testimonial-avatar">G</div>
                <div className="testimonial-meta">
                  <div className="testimonial-name">Gerald Kraftman</div>
                  <div className="testimonial-location">Poland</div>
                </div>
              </div>
            </article>
            <article className="testimonial-card">
              <p className="testimonial-quote">
                “I am grateful for the calm, coordinated care I received. My mobility and confidence
                have improved more than I expected.”
              </p>
              <div className="testimonial-person">
                <div className="testimonial-avatar">J</div>
                <div className="testimonial-meta">
                  <div className="testimonial-name">Jean‑François Cristau</div>
                  <div className="testimonial-location">France</div>
                </div>
              </div>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
