import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Home.css';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { serializeJsonForHtmlScript } from '../../utils/security';



export default function Home() {
  const heroRef = useRef(null);
  const heroVideoRef = useRef(null);
  const heroContentMotionRef = useRef(null);
  const testimonialSectionRef = useRef(null);
  const testimonialVideoInlineRef = useRef(null);
  const testimonialVideoSideRef = useRef(null);
  const testimonialCopyRef = useRef(null);
  const [enableStoryVideo, setEnableStoryVideo] = useState(false);
  const [heroVariant, setHeroVariant] = useState('A');
  const navigate = useNavigate();
  const whyChooseItems = [
    {
      title: 'Specialised multidisciplinary team',
      body: 'Pain medicine, spine surgery, sports medicine, stroke care and rehabilitation working together, so your treatment plan is built from multiple expert perspectives, not just one.',
    },
    {
      title: 'Personalised treatment pathways',
      body: 'We start with the least invasive options and only escalate when it is clinically necessary, combining medication, targeted procedures and rehabilitation tailored to your goals and lifestyle.',
    },
    {
      title: 'Advanced, evidence-based techniques',
      body: 'Access to modern procedures such as radiofrequency, vertebroplasty, spinal interventions and ultrasound-guided injections, always aligned with international best-practice guidelines.',
    },
    {
      title: 'Continuity and clear communication',
      body: 'Your care team follows you over time, explains each step in clear language and coordinates with your other doctors, so you never feel alone in your treatment journey.',
    },
  ];
  // Lightweight analytics helper
  const trackEvent = (event, params = {}) => {
    try {
      const payload = { event, ...params, ts: Date.now() };
      if (window.dataLayer && Array.isArray(window.dataLayer)) {
        window.dataLayer.push(payload);
      } else {
        if (import.meta.env.DEV) {
          // eslint-disable-next-line no-console
          console.debug('[analytics]', payload);
        }
      }
    } catch {}
  };

  // Assign persistent A/B testing variant
  useEffect(() => {
    const url = new URL(window.location.href);
    const forced = url.searchParams.get('variant');
    const key = 'homeHeroCtaVariant';
    let v = forced || window.localStorage.getItem(key);
    if (v !== 'A' && v !== 'B') {
      v = Math.random() < 0.5 ? 'A' : 'B';
    }
    setHeroVariant(v);
    try {
      window.localStorage.setItem(key, v);
    } catch {}
  }, []);

  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    setVh();
    window.addEventListener('resize', setVh);
    window.addEventListener('orientationchange', setVh);
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', setVh);
    }
    return () => {
      window.removeEventListener('resize', setVh);
      window.removeEventListener('orientationchange', setVh);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', setVh);
      }
    };
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (!reduce && !isMobile) {
      setEnableStoryVideo(true);
    }
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      const vids = [
        heroVideoRef.current,
        testimonialVideoInlineRef.current,
        testimonialVideoSideRef.current,
        ...Array.from(document.querySelectorAll('.home-section-cards-pain-video')),
        ...Array.from(document.querySelectorAll('.mainpain-card-video')),
        ...Array.from(document.querySelectorAll('.treatment-card-video')),
        ...Array.from(document.querySelectorAll('.home-section-testimonial-video-el')),
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
      testimonialVideoInlineRef.current,
      testimonialVideoSideRef.current,
      ...Array.from(document.querySelectorAll('.home-section-cards-pain-video')),
      ...Array.from(document.querySelectorAll('.mainpain-card-video')),
      ...Array.from(document.querySelectorAll('.treatment-card-video')),
      ...Array.from(document.querySelectorAll('.home-section-testimonial-video-el')),
    ].filter(Boolean);
    const onIntersect = (entries) => {
      entries.forEach((entry) => {
        const el = entry.target;
        if (!(el instanceof HTMLVideoElement)) return;
        if (entry.isIntersecting) {
          const dataSrc = el.getAttribute('data-src');
          if (dataSrc && !el.getAttribute('src')) {
            el.setAttribute('src', dataSrc);
          }
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
    const titleText =
      'Algarve Pain Centre | Multidisciplinary pain clinic in Vale do Lobo, Algarve';
    const descriptionText =
      'Algarve Pain Centre is a specialised pain clinic in Vale do Lobo, Algarve, Portugal. Our multidisciplinary team treats spine, joint and nerve pain with personalised plans that combine non-invasive therapies, minimally invasive procedures and advanced spine surgery.';

    document.title = titleText;

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = descriptionText;
    trackEvent('page_view', { page: 'home' });
  }, []);

  useEffect(() => {
    const heroEl = heroRef.current;
    const videoLayer = heroVideoRef.current;
    const contentLayer = heroContentMotionRef.current;
    if (!heroEl || !videoLayer || !contentLayer) return undefined;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const hasRAF = typeof window.requestAnimationFrame === 'function';
    const supports3d = typeof window.CSS !== 'undefined' && CSS.supports && CSS.supports('transform', 'translate3d(0,0,0)');
    if (prefersReducedMotion) return undefined;
    let latestY = window.scrollY || 0;
    let animating = false;
    let rafId = 0;
    let io;
    const ratios = isMobile ? { content: -24 } : { content: -42 };
    videoLayer.style.transform = '';
    const applyTransform = (el, y) => {
      if (supports3d) {
        el.style.transform = `translate3d(0, ${y}px, 0)`;
      } else {
        el.style.transform = `translateY(${y}px)`;
      }
    };
    const tick = () => {
      const vh = window.innerHeight || 1;
      const rect = heroEl.getBoundingClientRect();
      const progress = Math.min(Math.max(rect.top / vh, -1), 1);
      applyTransform(contentLayer, progress * ratios.content);
      animating = false;
    };
    const onScroll = () => {
      latestY = window.scrollY || 0;
      if (animating) return;
      animating = true;
      if (hasRAF) {
        rafId = window.requestAnimationFrame(tick);
      } else {
        setTimeout(tick, 16);
      }
    };
    const onResize = () => {
      onScroll();
    };
    const observe = () => {
      if (!('IntersectionObserver' in window)) {
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onResize, { passive: true });
        onScroll();
        return;
      }
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              window.addEventListener('scroll', onScroll, { passive: true });
              window.addEventListener('resize', onResize, { passive: true });
              onScroll();
            } else {
              window.removeEventListener('scroll', onScroll);
              window.removeEventListener('resize', onResize);
            }
          });
        },
        { threshold: 0, rootMargin: '200px 0px 200px 0px' }
      );
      io.observe(heroEl);
    };
    observe();
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (rafId) cancelAnimationFrame(rafId);
      if (io) io.disconnect();
      videoLayer.style.transform = '';
      contentLayer.style.transform = '';
    };
  }, []);

  return (
    <div className="home-page">
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonForHtmlScript({
            '@context': 'https://schema.org',
            '@type': 'MedicalClinic',
            name: 'Algarve Pain Centre',
            url: 'https://www.algarvepaincentre.com/',
            description:
              'Multidisciplinary pain clinic in Vale do Lobo, Algarve, Portugal, specialising in spine pain, joint pain, sports injuries and stroke rehabilitation.',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Av. do Mar',
              addressLocality: 'Vale do Lobo',
              addressRegion: 'Algarve',
              addressCountry: 'PT',
            },
            telephone: '+351915915001',
            medicalSpecialty: ['PainManagement', 'Orthopedic', 'Neurologic', 'PhysicalTherapy'],
          }),
        }}
      />
      <section className="hero hero--home" ref={heroRef}>
        <div className="hero-video" aria-hidden="true" ref={heroVideoRef}>
          <video
            className="hero-video-el"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/assets/images/medical/DSC06176.jpg"
            src="/assets/videos/Banner-Services.mp4"
          />
        </div>
        <div className="hero-content hero-content-home" ref={heroContentMotionRef}>
          <div className="hero-left hero-home-left">
            <h1 className="hero-title">Your Pain Centre</h1>
            <div className="hero-actions">
              <button
                type="button"
                className="hero-find"
                aria-label="Find care"
                onClick={() => {
                  trackEvent('cta_click', { location: 'hero-find' });
                  navigate('/treatments');
                }}
              >
                <span className="hero-find-label">Find care</span>
                <span className="hero-find-arrow" aria-hidden="true">↗</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <main className="home-main">

        <section className="home-section-testimonial" ref={testimonialSectionRef}>
        <div className="home-section-testimonial-inner">
          <div
            className="home-section-testimonial-copy"
            ref={testimonialCopyRef}
          >
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
                  poster="/assets/images/illustrative/services-home-min-1.jpg"
                  data-src="/assets/videos/post-43.mp4"
                />
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
                poster="/assets/images/illustrative/services-home-min-1.jpg"
                data-src="/assets/videos/post-43.mp4"
              />
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
                poster="/assets/images/medical/DSC06176.jpg"
                data-src="/assets/videos/Pain-Medicine-min.mp4"
                aria-hidden="true"
              />
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

        <section className="home-section-stories" aria-labelledby="stories-title">
          <div className="home-section-stories-inner">
            <header className="home-stories-header">
              <h2 id="stories-title" className="home-stories-title">Stories from our patients</h2>
              <p className="home-stories-subtitle">Real experiences of people who regained control over their lives.</p>
            </header>
            <div className="home-stories-grid" role="list">
              <Link
                to="/resources/testimonials/overcoming-sciatica-pain"
                className="story-card"
                role="listitem"
                aria-label="Read Ana's story: Overcoming Sciatica Pain"
                onClick={() => trackEvent('nav_click', { location: 'stories', to: 'overcoming-sciatica-pain' })}
              >
                <div className="story-card-visual" aria-hidden="true">
                  {enableStoryVideo && (
                    <iframe
                      className="story-card-video-bg"
                      src="https://www.youtube.com/embed/uK77XrRzGYA?autoplay=1&mute=1&controls=0&rel=0&showinfo=0&loop=1&playlist=uK77XrRzGYA&modestbranding=1&playsinline=1"
                      title="Patient story background"
                      tabIndex={-1}
                      allow="autoplay; encrypted-media"
                    />
                  )}
                </div>
                <div className="story-card-content">
                  <blockquote className="story-card-quote">
                    From not being able to lift even small weight and having pain from sitting down to being 80% fully recovered, they both experience a life free of pain
                  </blockquote>
                  <footer className="story-card-meta">
                    <span className="story-card-author">Filomena and Roland</span>
                  </footer>
                </div>
              </Link>

              <Link
                to="/resources/testimonials/overcoming-sciatica-pain"
                className="story-card"
                role="listitem"
                aria-label="Read Ghislaine Renault's story: Overcoming Sciatica Pain"
                onClick={() => trackEvent('nav_click', { location: 'stories', to: 'overcoming-sciatica-pain' })}
              >
                <div className="story-card-visual" aria-hidden="true">
                  {enableStoryVideo && (
                    <iframe
                      className="story-card-video-bg"
                      src="https://www.youtube.com/embed/bkbLgNoKhkY?autoplay=1&mute=1&controls=0&rel=0&showinfo=0&loop=1&playlist=bkbLgNoKhkY&modestbranding=1&playsinline=1"
                      title="Patient story background"
                      tabIndex={-1}
                      allow="autoplay; encrypted-media"
                    />
                  )}
                </div>
                <div className="story-card-content">
                  <blockquote className="story-card-quote">
                    Ghislaine Renault shares her experience of her medical journey, how her life led to having Sciatica and excruciating pain.
                  </blockquote>
                  <footer className="story-card-meta">
                    <span className="story-card-author">Ghislaine Renault </span>
                  </footer>
                </div>
              </Link>

              <Link
                to="/resources"
                className="story-card"
                role="listitem"
                aria-label="Explore more patient stories"
                onClick={() => trackEvent('nav_click', { location: 'stories', to: 'more-stories' })}
              >
                <div className="story-card-visual" aria-hidden="true">
                  {enableStoryVideo && (
                    <iframe
                      className="story-card-video-bg"
                      src="https://www.youtube.com/embed/ANY7DTXlMRA?autoplay=1&mute=1&controls=0&rel=0&showinfo=0&loop=1&playlist=ANY7DTXlMRA&modestbranding=1&playsinline=1"
                      title="Patient story background"
                      tabIndex={-1}
                      allow="autoplay; encrypted-media"
                    />
                  )}
                </div>
                <div className="story-card-content">
                  <blockquote className="story-card-quote">
                    “But, although you may feel like brand new the day after the procedure,
                     You will only be totally healed a few months after.
                    The body takes time to adjust.”
                  </blockquote>
                  <footer className="story-card-meta">
                    <span className="story-card-author">Sid Richardson</span>
                  </footer>
                </div>
              </Link>
            </div>
          </div>
        </section>

        <section className="home-section-discovery" aria-labelledby="discovery-title">
          <div className="home-section-discovery-inner">
            <div className="home-discovery-layout">
              <header className="home-discovery-header">
                <h2 id="discovery-title" className="home-discovery-title">
                  Clinic services
                </h2>
                <p className="home-discovery-subtitle">
                  A multidisciplinary team and evidence‑based pathways—so you can move with confidence again.
                </p>
              </header>

              <div className="home-discovery-carousel" role="region" aria-roledescription="carousel" aria-label="Clinic services carousel">
                <input
                  className="home-discovery-radio"
                  type="radio"
                  name="home-discovery"
                  id="home-discovery-1"
                  defaultChecked
                />
                <input className="home-discovery-radio" type="radio" name="home-discovery" id="home-discovery-2" />
                <input className="home-discovery-radio" type="radio" name="home-discovery" id="home-discovery-3" />
                <input className="home-discovery-radio" type="radio" name="home-discovery" id="home-discovery-4" />
                <input className="home-discovery-radio" type="radio" name="home-discovery" id="home-discovery-5" />
                <input className="home-discovery-radio" type="radio" name="home-discovery" id="home-discovery-6" />

                <div className="home-discovery-viewport">
                  <ul className="home-discovery-track" role="list">
                    <li className="home-discovery-slide" role="listitem">
                      <Link
                        to="/specialities/pain-medicine/lumbar-spine-pain"
                        className="home-discovery-card"
                        aria-label="Explore pain medicine services"
                        onClick={() => trackEvent('nav_click', { location: 'home-discovery', to: 'pain-medicine' })}
                      >
                        <span className="home-discovery-card-icon" aria-hidden="true">
                          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M10.5 2.75h3v2.6l1.85 1.07 2.25-1.3 1.5 2.6-2.25 1.3v2.15l2.25 1.3-1.5 2.6-2.25-1.3-1.85 1.07v2.6h-3v-2.6l-1.85-1.07-2.25 1.3-1.5-2.6 2.25-1.3V8.72L4.9 7.42l1.5-2.6 2.25 1.3L10.5 5.35v-2.6Z"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M9.2 12.05c0-1.55 1.25-2.8 2.8-2.8s2.8 1.25 2.8 2.8-1.25 2.8-2.8 2.8-2.8-1.25-2.8-2.8Z"
                              stroke="currentColor"
                              strokeWidth="1.6"
                            />
                          </svg>
                        </span>
                        <h3 className="home-discovery-card-title">Pain medicine</h3>
                        <p className="home-discovery-card-body">
                          Personalised plans combining assessment, rehabilitation and targeted procedures.
                        </p>
                      </Link>
                    </li>

                    <li className="home-discovery-slide" role="listitem">
                      <Link
                        to="/treatments/non-invasive-treatments/physiotherapy"
                        className="home-discovery-card"
                        aria-label="Explore physiotherapy and rehabilitation services"
                        onClick={() => trackEvent('nav_click', { location: 'home-discovery', to: 'physiotherapy' })}
                      >
                        <span className="home-discovery-card-icon" aria-hidden="true">
                          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M7.5 12.5c1.6-2.6 3.3-3.9 5.1-3.9 2.7 0 4.4 2.9 6.9 2.9"
                              stroke="currentColor"
                              strokeWidth="1.7"
                              strokeLinecap="round"
                            />
                            <path
                              d="M6.5 16.5c1.9 0 2.7-1.8 4.6-1.8s2.6 1.8 4.5 1.8 2.6-1.8 4.4-1.8"
                              stroke="currentColor"
                              strokeWidth="1.7"
                              strokeLinecap="round"
                            />
                          </svg>
                        </span>
                        <h3 className="home-discovery-card-title">Physiotherapy</h3>
                        <p className="home-discovery-card-body">
                          Guided exercise programmes to rebuild strength, mobility and resilience.
                        </p>
                      </Link>
                    </li>

                    <li className="home-discovery-slide" role="listitem">
                      <Link
                        to="/treatments/minimally-invasive-treatments/radiofrequency"
                        className="home-discovery-card"
                        aria-label="Explore minimally invasive pain procedures"
                        onClick={() => trackEvent('nav_click', { location: 'home-discovery', to: 'minimally-invasive' })}
                      >
                        <span className="home-discovery-card-icon" aria-hidden="true">
                          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M12 3v7"
                              stroke="currentColor"
                              strokeWidth="1.7"
                              strokeLinecap="round"
                            />
                            <path
                              d="M9.4 10.2h5.2l-1.4 10.8h-2.4L9.4 10.2Z"
                              stroke="currentColor"
                              strokeWidth="1.7"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                        <h3 className="home-discovery-card-title">Image‑guided procedures</h3>
                        <p className="home-discovery-card-body">
                          Targeted interventions such as radiofrequency and ultrasound‑guided injections.
                        </p>
                      </Link>
                    </li>

                    <li className="home-discovery-slide" role="listitem">
                      <Link
                        to="/treatments/surgical-treatments/tubular-microsurgery"
                        className="home-discovery-card"
                        aria-label="Explore spine surgery services"
                        onClick={() => trackEvent('nav_click', { location: 'home-discovery', to: 'spine-surgery' })}
                      >
                        <span className="home-discovery-card-icon" aria-hidden="true">
                          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M7 6.5h10M7 10.5h10M7 14.5h10M7 18.5h10"
                              stroke="currentColor"
                              strokeWidth="1.7"
                              strokeLinecap="round"
                            />
                            <path
                              d="M9 4.8v14.4M15 4.8v14.4"
                              stroke="currentColor"
                              strokeWidth="1.2"
                              strokeLinecap="round"
                              opacity="0.8"
                            />
                          </svg>
                        </span>
                        <h3 className="home-discovery-card-title">Spine surgery</h3>
                        <p className="home-discovery-card-body">
                          Precise surgical options when conservative care is not enough.
                        </p>
                      </Link>
                    </li>

                    <li className="home-discovery-slide" role="listitem">
                      <Link
                        to="/specialities/sports-medicine/injuries"
                        className="home-discovery-card"
                        aria-label="Explore sports medicine services"
                        onClick={() => trackEvent('nav_click', { location: 'home-discovery', to: 'sports-medicine' })}
                      >
                        <span className="home-discovery-card-icon" aria-hidden="true">
                          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M8.2 13.1c1.2-2.7 2.9-4.1 5-4.1 2.9 0 4.3 2.5 6.3 2.5"
                              stroke="currentColor"
                              strokeWidth="1.7"
                              strokeLinecap="round"
                            />
                            <path
                              d="M5.6 18c1.7 0 2.6-1.7 4.3-1.7s2.4 1.7 4.2 1.7 2.4-1.7 4.1-1.7"
                              stroke="currentColor"
                              strokeWidth="1.7"
                              strokeLinecap="round"
                            />
                          </svg>
                        </span>
                        <h3 className="home-discovery-card-title">Sports medicine</h3>
                        <p className="home-discovery-card-body">
                          Injury care, performance support and return‑to‑activity plans.
                        </p>
                      </Link>
                    </li>

                    <li className="home-discovery-slide" role="listitem">
                      <Link
                        to="/specialities/stroke-medicine/rehabilitation"
                        className="home-discovery-card"
                        aria-label="Explore stroke rehabilitation services"
                        onClick={() => trackEvent('nav_click', { location: 'home-discovery', to: 'stroke-rehab' })}
                      >
                        <span className="home-discovery-card-icon" aria-hidden="true">
                          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M7.5 18.5V7.7c0-1 .8-1.8 1.8-1.8h5.4c1 0 1.8.8 1.8 1.8v10.8"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M6 18.5h12"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                            />
                          </svg>
                        </span>
                        <h3 className="home-discovery-card-title">Rehabilitation</h3>
                        <p className="home-discovery-card-body">
                          Structured stroke rehabilitation and long‑term recovery support.
                        </p>
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="home-discovery-controls" aria-label="Carousel controls">
                  <div className="home-discovery-arrows" aria-hidden="true">
                    <div className="home-discovery-arrow-set home-discovery-arrow-set-1">
                      <label className="home-discovery-arrow" htmlFor="home-discovery-6">‹</label>
                      <label className="home-discovery-arrow" htmlFor="home-discovery-2">›</label>
                    </div>
                    <div className="home-discovery-arrow-set home-discovery-arrow-set-2">
                      <label className="home-discovery-arrow" htmlFor="home-discovery-1">‹</label>
                      <label className="home-discovery-arrow" htmlFor="home-discovery-3">›</label>
                    </div>
                    <div className="home-discovery-arrow-set home-discovery-arrow-set-3">
                      <label className="home-discovery-arrow" htmlFor="home-discovery-2">‹</label>
                      <label className="home-discovery-arrow" htmlFor="home-discovery-4">›</label>
                    </div>
                    <div className="home-discovery-arrow-set home-discovery-arrow-set-4">
                      <label className="home-discovery-arrow" htmlFor="home-discovery-3">‹</label>
                      <label className="home-discovery-arrow" htmlFor="home-discovery-5">›</label>
                    </div>
                    <div className="home-discovery-arrow-set home-discovery-arrow-set-5">
                      <label className="home-discovery-arrow" htmlFor="home-discovery-4">‹</label>
                      <label className="home-discovery-arrow" htmlFor="home-discovery-6">›</label>
                    </div>
                    <div className="home-discovery-arrow-set home-discovery-arrow-set-6">
                      <label className="home-discovery-arrow" htmlFor="home-discovery-5">‹</label>
                      <label className="home-discovery-arrow" htmlFor="home-discovery-1">›</label>
                    </div>
                  </div>

                  <div className="home-discovery-dots" aria-label="Choose a service">
                    <label className="home-discovery-dot" htmlFor="home-discovery-1" aria-label="Pain medicine" />
                    <label className="home-discovery-dot" htmlFor="home-discovery-2" aria-label="Physiotherapy" />
                    <label className="home-discovery-dot" htmlFor="home-discovery-3" aria-label="Image-guided procedures" />
                    <label className="home-discovery-dot" htmlFor="home-discovery-4" aria-label="Spine surgery" />
                    <label className="home-discovery-dot" htmlFor="home-discovery-5" aria-label="Sports medicine" />
                    <label className="home-discovery-dot" htmlFor="home-discovery-6" aria-label="Rehabilitation" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="home-section-treatment-cards">
          <div className="home-section-treatment-inner">
            <div className="home-section-treatment-grid">
              <article className="treatment-card">
                <div className="treatment-card-illustration treatment-card-illustration-non-invasive">
                  <video
                    className="treatment-card-video"
                    aria-hidden="true"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    data-src="/assets/videos/test.mp4"
                  />
                </div>
                <div className="treatment-card-body">
                  <h3 className="treatment-card-title">Non‑invasive pain treatments</h3>
                  <div className="treatment-card-accent" />
                  <p className="treatment-card-description">
                    Manage back, neck and joint pain without surgery through physiotherapy, guided exercise and
                    personalised rehabilitation programmes that rebuild strength and flexibility.
                  </p>
                  <div className="treatment-card-tags" aria-label="Key non-invasive modalities">
                    <span className="treatment-chip">Physiotherapy</span>
                    <span className="treatment-chip">Rehabilitation</span>
                    <span className="treatment-chip">Lifestyle coaching</span>
                  </div>
                  <Link
                    to="/treatments/non-invasive-treatments/physiotherapy"
                    className="treatment-card-button"
                    aria-label="Explore non-invasive pain treatment options"
                  >
                    <span>Explore</span>
                  </Link>
                </div>
              </article>
              <article className="treatment-card">
                <div className="treatment-card-illustration treatment-card-illustration-minimally-invasive">
                  <video
                    className="treatment-card-video"
                    aria-hidden="true"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    data-src="/assets/videos/test.mp4"
                  />
                </div>
                <div className="treatment-card-body">
                  <h3 className="treatment-card-title">Minimally invasive procedures</h3>
                  <div className="treatment-card-accent" />
                  <p className="treatment-card-description">
                    Targeted interventions with smaller incisions and faster recovery—such as ultrasound‑guided injections,
                    radiofrequency and vertebroplasty—performed by experienced specialists.
                  </p>
                  <div className="treatment-card-tags" aria-label="Key minimally invasive techniques">
                    <span className="treatment-chip">Ultrasound‑guided</span>
                    <span className="treatment-chip">Radiofrequency</span>
                    <span className="treatment-chip">Vertebroplasty</span>
                  </div>
                  <Link
                    to="/treatments/minimally-invasive-treatments/vertebroplasty"
                    className="treatment-card-button"
                    aria-label="See minimally invasive procedure options"
                  >
                    <span>Explore</span>
                  </Link>
                </div>
              </article>
              <article className="treatment-card">
                <div className="treatment-card-illustration treatment-card-illustration-surgical">
                  <video
                    className="treatment-card-video"
                    aria-hidden="true"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    data-src="/assets/videos/test.mp4"
                  />
                </div>
                <div className="treatment-card-body">
                  <h3 className="treatment-card-title">Surgical spine treatments</h3>
                  <div className="treatment-card-accent" />
                  <p className="treatment-card-description">
                    When surgery is the right choice, our spine surgeons perform precise procedures—including tubular
                    microsurgery and decompression—focused on lasting relief and functional recovery.
                  </p>
                  <div className="treatment-card-tags" aria-label="Key surgical approaches">
                    <span className="treatment-chip">Tubular microsurgery</span>
                    <span className="treatment-chip">Decompression</span>
                    <span className="treatment-chip">Spine surgery</span>
                  </div>
                  <Link
                    to="/treatments/surgical-treatments/tubular-microsurgery"
                    className="treatment-card-button"
                    aria-label="Discover surgical spine treatment options"
                  >
                    <span>Explore</span>
                  </Link>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="home-section-mainpain-cards">
          <div className="home-section-mainpain-inner">
            <header className="home-section-treatment-header home-section-mainpain-header">
              <div className="home-section-treatment-header-content">
                <p className="home-section-treatment-eyebrow">Main pain areas</p>
                <h2 className="home-section-treatment-title">Our Main Pain Areas</h2>
                <p className="home-section-treatment-subtitle">
                  Meet your medical needs and improve your life.
                </p>
              </div>
            </header>
            <div className="home-section-mainpain-grid">
              <article className="mainpain-card">
                <div className="mainpain-card-image mainpain-card-image-spine" aria-hidden="true" />
                <div className="mainpain-card-body">
                  <p className="mainpain-card-meta">
                    <span>Main pain area</span>
                    <span className="mainpain-card-meta-sep" aria-hidden="true">•</span>
                    <span>Read</span>
                  </p>
                  <Link
                    to="/specialities/pain-medicine/lumbar-spine-pain"
                    className="mainpain-card-cta"
                    aria-label="Read about Spine Pain"
                  >
                    <h3 className="mainpain-card-title">Spine Pain</h3>
                    <span className="mainpain-card-cta-icon" aria-hidden="true">→</span>
                  </Link>
                  <p className="mainpain-card-description sr-only">
                    Relieve your chronic spine pain, reclaim your freedom.
                  </p>
                </div>
              </article>
              <article className="mainpain-card">
                <div className="mainpain-card-image mainpain-card-image-knee" aria-hidden="true" />
                <div className="mainpain-card-body">
                  <p className="mainpain-card-meta">
                    <span>Main pain area</span>
                    <span className="mainpain-card-meta-sep" aria-hidden="true">•</span>
                    <span>Read</span>
                  </p>
                  <Link
                    to="/specialities/pain-medicine/knee-pain"
                    className="mainpain-card-cta"
                    aria-label="Read about Knee Pain"
                  >
                    <h3 className="mainpain-card-title">Knee Pain</h3>
                    <span className="mainpain-card-cta-icon" aria-hidden="true">→</span>
                  </Link>
                  <p className="mainpain-card-description sr-only">
                    Regain your confidence, step back into life with ease.
                  </p>
                </div>
              </article>
              <article className="mainpain-card">
                <div className="mainpain-card-image mainpain-card-image-hip" aria-hidden="true" />
                <div className="mainpain-card-body">
                  <p className="mainpain-card-meta">
                    <span>Main pain area</span>
                    <span className="mainpain-card-meta-sep" aria-hidden="true">•</span>
                    <span>Read</span>
                  </p>
                  <Link
                    to="/specialities/pain-medicine/hip-and-groin-pain"
                    className="mainpain-card-cta"
                    aria-label="Read about Hip Pain"
                  >
                    <h3 className="mainpain-card-title">Hip Pain</h3>
                    <span className="mainpain-card-cta-icon" aria-hidden="true">→</span>
                  </Link>
                  <p className="mainpain-card-description sr-only">
                    Restore your mobility, rediscover joy with those you love.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="home-section-why-choose-us">
          <div className="home-section-why-choose-inner">
            <header className="home-section-why-choose-header">
              <p className="home-section-why-choose-eyebrow">Why choose Algarve Pain Centre</p>
              <h2 className="home-section-why-choose-title">
                The right team by your side at every step
              </h2>
              <p className="home-section-why-choose-subtitle">
                From first assessment to long-term follow-up, you are supported by a coordinated,
                multidisciplinary team focused on relieving your pain and restoring your quality of life.
              </p>
            </header>

            <div className="home-section-why-choose-layout home-section-why-choose-layout--with-visual">
              <div
                className="home-section-why-choose-grid"
                aria-label="Reasons patients choose Algarve Pain Centre"
                role="list"
              >
                {whyChooseItems.map((item) => (
                  <article key={item.title} className="why-choose-card" role="listitem">
                    <h3 className="why-choose-card-title">{item.title}</h3>
                    <p className="why-choose-card-body">{item.body}</p>
                  </article>
                ))}
              </div>
              <div className="home-section-why-choose-visual" aria-hidden="true">
                <div className="home-section-why-choose-visual-overlay">
                  <p className="home-section-why-choose-visual-eyebrow">Care without shortcuts</p>
                  <p className="home-section-why-choose-visual-copy">
                    Every patient story is different. We take the time to understand yours, build a plan around your
                    daily life and help you move with confidence again.
                  </p>
                </div>
              </div>
            </div>
            <div className="home-trust-badges" role="list" aria-label="Clinic credentials">
              <span role="listitem" className="home-trust-badge">Licensed physicians</span>
              <span role="listitem" className="home-trust-badge">Evidence‑based care</span>
              <span role="listitem" className="home-trust-badge">GDPR compliant</span>
            </div>
          </div>
        </section>

        <section className="home-section-team">
          <div className="home-section-team-inner">
            <header className="home-section-team-header">
              <p className="home-section-team-eyebrow">Meet our clinicians</p>
              <h2 className="home-section-team-title">Your care team</h2>
              <p className="home-section-team-subtitle">
                Experienced specialists working together to relieve your pain.
              </p>
            </header>
            <div className="home-team-grid">
              <article className="home-team-card">
                <div className="home-team-image">
                  <img src="/assets/images/team/miguel-costa-min.jpg" alt="Dr. Miguel Costa" loading="lazy" />
                </div>
                <div className="home-team-body">
                  <h3 className="home-team-name">Dr. Miguel Costa</h3>
                  <p className="home-team-role">Physical Rehabilitation · Sports Medicine</p>
                </div>
              </article>
              <article className="home-team-card">
                <div className="home-team-image">
                  <img src="/assets/images/team/Miguel-Baptista-min.jpg" alt="Dr. Miguel Baptista" loading="lazy" />
                </div>
                <div className="home-team-body">
                  <h3 className="home-team-name">Dr. Miguel Baptista</h3>
                  <p className="home-team-role">Neuroradiology</p>
                </div>
              </article>
              <article className="home-team-card">
                <div className="home-team-image">
                  <img src="/assets/images/illustrative/Physiotherapy-min.jpg" alt="Physiotherapy Team" loading="lazy" />
                </div>
                <div className="home-team-body">
                  <h3 className="home-team-name">Rehabilitation Team</h3>
                  <p className="home-team-role">Physiotherapy · Occupational Therapy</p>
                </div>
              </article>
            </div>
            <div className="home-team-cta">
              <Link to="/about" className="home-team-link" onClick={() => trackEvent('nav_click', { to: 'about', location: 'home-team' })}>
                Meet the full team <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>

        <section className="home-section-faq">
          <div className="home-section-why-choose-inner">
            <header className="home-section-why-choose-header">
              <p className="home-section-why-choose-eyebrow">
                Frequently asked questions about Algarve Pain Centre
              </p>
              <h2 className="home-section-why-choose-title">
                Answers to common questions about our pain clinic in the Algarve
              </h2>
              <p className="home-section-why-choose-subtitle">
                Choosing a pain clinic is an important decision. These answers cover what we treat,
                how appointments work and what to expect when you visit us in Vale do Lobo.
              </p>
            </header>
            <div className="home-section-why-choose-layout">
              <div className="home-section-why-choose-grid" role="list" aria-label="Frequently asked questions">
                <details
                  className="faq-item"
                  role="listitem"
                  onToggle={(e) => e.target.open && trackEvent('faq_open', { question: 'conditions-treated' })}
                >
                  <summary className="faq-summary">
                    <h3 className="why-choose-card-title">What types of pain conditions do you treat?</h3>
                  </summary>
                  <div className="faq-content">
                    <p className="why-choose-card-body">
                      We treat a wide range of conditions including spine pain, joint pain, nerve
                      pain, headaches, sports injuries and post‑stroke symptoms. If you are unsure
                      whether your condition fits, our team can review your situation and guide you to
                      the right specialist.
                    </p>
                  </div>
                </details>
                <details
                  className="faq-item"
                  role="listitem"
                  onToggle={(e) => e.target.open && trackEvent('faq_open', { question: 'need-referral' })}
                >
                  <summary className="faq-summary">
                    <h3 className="why-choose-card-title">Do I need a referral to book an appointment?</h3>
                  </summary>
                  <div className="faq-content">
                    <p className="why-choose-card-body">
                      A formal referral is not always required. Many patients contact Algarve Pain
                      Centre directly, while others are referred by their family doctor or another
                      specialist. If you already have scans or reports, bringing them to your visit
                      helps us avoid repeating tests.
                    </p>
                  </div>
                </details>
                <details
                  className="faq-item"
                  role="listitem"
                  onToggle={(e) => e.target.open && trackEvent('faq_open', { question: 'international-patients' })}
                >
                  <summary className="faq-summary">
                    <h3 className="why-choose-card-title">Do you see international patients visiting the Algarve?</h3>
                  </summary>
                  <div className="faq-content">
                    <p className="why-choose-card-body">
                      Yes. We regularly care for patients who live abroad or spend part of the year in
                      Portugal. Our clinic team can help you coordinate appointments and treatment
                      around your travel schedule, and we share information with your doctors at home
                      when needed.
                    </p>
                  </div>
                </details>
                <details
                  className="faq-item"
                  role="listitem"
                  onToggle={(e) => e.target.open && trackEvent('faq_open', { question: 'first-consultation' })}
                >
                  <summary className="faq-summary">
                    <h3 className="why-choose-card-title">What should I expect from my first consultation?</h3>
                  </summary>
                  <div className="faq-content">
                    <p className="why-choose-card-body">
                      Your first visit usually lasts long enough for a detailed discussion of your
                      symptoms, examination and review of previous investigations. By the end we aim to
                      give you a clear explanation of your condition, outline immediate steps and
                      propose a longer‑term plan tailored to your goals.
                    </p>
                  </div>
                </details>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
