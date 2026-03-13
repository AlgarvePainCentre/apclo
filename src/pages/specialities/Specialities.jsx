import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import '../home/Home.css';

export default function Specialities() {
  const heroRef = useRef(null);
  const heroVideoRef = useRef(null);
  const heroContentMotionRef = useRef(null);
  const navigate = useNavigate();
  const [specialityImagesLoaded, setSpecialityImagesLoaded] = useState({
    pain: false,
    sports: false,
    stroke: false,
  });
  const painAreas = [
    { title: 'Head Pain', to: '/specialities/pain-medicine/head-pain', imageClass: 'mainpain-card-image-spine' },
    { title: 'Cervical Spine Pain', to: '/specialities/pain-medicine/cervical-spine-pain', imageClass: 'mainpain-card-image-spine' },
    { title: 'Lumbar Spine Pain', to: '/specialities/pain-medicine/lumbar-spine-pain', imageClass: 'mainpain-card-image-spine' },
    { title: 'Shoulder Pain', to: '/specialities/pain-medicine/shoulder-pain', imageClass: 'mainpain-card-image-hip' },
    { title: 'Hand and Elbow Pain', to: '/specialities/pain-medicine/hand-and-elbow-pain', imageClass: 'mainpain-card-image-hip' },
    { title: 'Hip and Groin Pain', to: '/specialities/pain-medicine/hip-and-groin-pain', imageClass: 'mainpain-card-image-hip' },
    { title: 'Knee Pain', to: '/specialities/pain-medicine/knee-pain', imageClass: 'mainpain-card-image-knee' },
    { title: 'Thoracic Wall Pain', to: '/specialities/pain-medicine/thoracic-wall-pain', imageClass: 'mainpain-card-image-spine' },
    { title: 'Abdominal Wall Pain', to: '/specialities/pain-medicine/abdominal-wall-pain', imageClass: 'mainpain-card-image-hip' },
    { title: 'Pelvic & Gynaecological', to: '/specialities/pain-medicine/pelvic-and-gynaecological', imageClass: 'mainpain-card-image-hip' },
    { title: 'Facial Pain', to: '/specialities/pain-medicine/facial-pain', imageClass: 'mainpain-card-image-spine' },
    { title: 'Foot and Ankle Pain', to: '/specialities/pain-medicine/foot-and-ankle-pain', imageClass: 'mainpain-card-image-knee' },
  ];
  const trackEvent = (event, params = {}) => {
    try {
      const payload = { event, ...params, ts: Date.now() };
      if (window.dataLayer && Array.isArray(window.dataLayer)) {
        window.dataLayer.push(payload);
      }
    } catch {}
  };
  const fallbackSpecialityImageSrc = '/assets/images/illustrative/services-home-min-1.jpg';
  const handleSpecialityImageLoad = (key) => {
    setSpecialityImagesLoaded((prev) => {
      if (prev[key]) return prev;
      return { ...prev, [key]: true };
    });
  };
  const handleSpecialityImageError = (key) => (e) => {
    const img = e.currentTarget;
    if (img.dataset.fallbackApplied === 'true') {
      handleSpecialityImageLoad(key);
      return;
    }
    img.dataset.fallbackApplied = 'true';
    img.src = fallbackSpecialityImageSrc;
  };

  useEffect(() => {
    // SEO
    document.title = 'Specialities | Algarve Pain Centre';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.content = 'Explore our specialized pain management services, including sports injuries, chronic pain, and musculoskeletal issues. Learn from experienced practitioners and get the support you need to manage your pain effectively.';
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Explore our specialized pain management services, including sports injuries, chronic pain, and musculoskeletal issues. Learn from experienced practitioners and get the support you need to manage your pain effectively.';
      document.head.appendChild(meta);
    }

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
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      const vids = [
        heroVideoRef.current,
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
      ...Array.from(document.querySelectorAll('.treatment-card-video')),
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

  useEffect(() => {
    const heroEl = heroRef.current;
    const videoLayer = heroVideoRef.current;
    const contentLayer = heroContentMotionRef.current;
    if (!heroEl || !videoLayer || !contentLayer) return undefined;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const hasRAF = typeof window.requestAnimationFrame === 'function';
    const supports3d =
      typeof window.CSS !== 'undefined' &&
      CSS.supports &&
      CSS.supports('transform', 'translate3d(0,0,0)');
    if (prefersReducedMotion) return undefined;
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
          const first = entries[0];
          if (first && first.isIntersecting) {
            window.addEventListener('scroll', onScroll, { passive: true });
            window.addEventListener('resize', onResize, { passive: true });
            onScroll();
          } else {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onResize);
            if (supports3d) {
              contentLayer.style.transform = 'translate3d(0, 0, 0)';
            } else {
              contentLayer.style.transform = 'translateY(0)';
            }
          }
        },
        { threshold: 0 }
      );
      io.observe(heroEl);
    };
    observe();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
      if (io) {
        io.disconnect();
      }
      contentLayer.style.transform = '';
      videoLayer.style.transform = '';
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
            poster="/assets/images/medical/DSC06176.jpg"
            src="/assets/videos/Banner-Services.mp4"
          />
        </div>
        <div className="hero-content hero-content-centered" ref={heroContentMotionRef}>
          <div className="hero-center">
            <h1 className="hero-title">Specialities</h1>
            <p className="hero-subtitle">
              Explore our areas of expertise in pain medicine, rehabilitation and stroke care.
            </p>
            <button
              type="button"
              className="hero-find"
              aria-label="Book an appointment"
              onClick={() => {
                trackEvent('cta_click', { location: 'specialities-hero' });
                navigate('/contact');
              }}
            >
              <span className="hero-find-label">Book an appointment</span>
              <span className="hero-find-arrow" aria-hidden="true">↗</span>
            </button>
          </div>
        </div>
      </section>
      <main className="home-main">
        <section className="home-section-why-choose-us specialities-overview" aria-labelledby="specialities-overview-title">
          <div className="home-section-why-choose-inner">
            <header className="home-section-why-choose-header">
              <p className="home-section-why-choose-eyebrow">Clinical specialities</p>
              <h2 className="home-section-why-choose-title" id="specialities-overview-title">
                Specialities
              </h2>
              <p className="home-section-why-choose-subtitle">
                Our physicians and rehabilitation teams work across three core disciplines, coordinating diagnosis,
                treatment and long-term recovery plans.
              </p>
            </header>

            <div className="home-section-why-choose-layout">
              <div className="home-section-why-choose-grid" role="list" aria-label="Medical specialities">
                <article className="why-choose-card" role="listitem">
                  <div
                    className={`specialities-overview-media ${specialityImagesLoaded.pain ? 'is-loaded' : ''}`}
                    aria-hidden="true"
                  >
                    <img
                      src="/assets/images/illustrative/pain-medicine-algarve-min.jpg"
                      alt="Pain medicine consultation setting"
                      loading="lazy"
                      decoding="async"
                      fetchPriority="low"
                      onLoad={() => handleSpecialityImageLoad('pain')}
                      onError={handleSpecialityImageError('pain')}
                    />
                  </div>
                  <h3 className="why-choose-card-title">Pain Medicine</h3>
                  <p className="why-choose-card-body">
                    Specialist assessment and management of acute and chronic pain conditions affecting the spine,
                    joints and nerves, with an emphasis on restoring function and quality of life.
                  </p>
                  <p className="why-choose-card-body">
                    Services include comprehensive clinical evaluation, medication optimisation, multidisciplinary
                    rehabilitation planning, and image-guided interventions such as ultrasound-guided injections,
                    radiofrequency and vertebroplasty when clinically indicated.
                  </p>
                  <p className="why-choose-card-body">
                    Expertise spans headache and facial pain syndromes, cervicogenic pain, neuropathic pain,
                    post-surgical pain, and complex musculoskeletal pain requiring coordinated care.
                  </p>
                  <div className="home-team-cta">
                    <Link
                      to="/specialities/pain-medicine/lumbar-spine-pain"
                      className="home-team-link"
                      aria-label="Explore pain medicine"
                      onClick={() => trackEvent('nav_click', { location: 'specialities-overview', to: 'pain-medicine' })}
                    >
                      Explore pain medicine <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </article>

                <article className="why-choose-card" role="listitem">
                  <div
                    className={`specialities-overview-media ${specialityImagesLoaded.sports ? 'is-loaded' : ''}`}
                    aria-hidden="true"
                  >
                    <img
                      src="/assets/images/illustrative/sports-medicine-min.jpeg"
                      alt="Sports medicine assessment and rehabilitation"
                      loading="lazy"
                      decoding="async"
                      fetchPriority="low"
                      onLoad={() => handleSpecialityImageLoad('sports')}
                      onError={handleSpecialityImageError('sports')}
                    />
                  </div>
                  <h3 className="why-choose-card-title">Sports Medicine</h3>
                  <p className="why-choose-card-body">
                    Diagnosis and treatment of sports injuries and activity-related musculoskeletal conditions, from
                    acute strains and tendon injuries to overuse syndromes and persistent joint pain.
                  </p>
                  <p className="why-choose-card-body">
                    Services include return-to-sport assessments, functional rehabilitation programmes, targeted
                    physiotherapy, injury prevention strategies, and performance optimisation guided by clinical
                    examination and imaging where required.
                  </p>
                  <p className="why-choose-card-body">
                    Our team supports athletes and active individuals with evidence-based protocols designed to reduce
                    re-injury risk and improve biomechanics, strength, mobility and resilience.
                  </p>
                  <div className="home-team-cta">
                    <Link
                      to="/specialities/sports-medicine/injuries"
                      className="home-team-link"
                      aria-label="Explore sports medicine"
                      onClick={() => trackEvent('nav_click', { location: 'specialities-overview', to: 'sports-medicine' })}
                    >
                      Explore sports medicine <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </article>

                <article className="why-choose-card" role="listitem">
                  <div
                    className={`specialities-overview-media ${specialityImagesLoaded.stroke ? 'is-loaded' : ''}`}
                    aria-hidden="true"
                  >
                    <img
                      src="/assets/images/illustrative/stroke-rehabilitation-min.jpg"
                      alt="Stroke rehabilitation session supporting mobility and recovery"
                      loading="lazy"
                      decoding="async"
                      fetchPriority="low"
                      onLoad={() => handleSpecialityImageLoad('stroke')}
                      onError={handleSpecialityImageError('stroke')}
                    />
                  </div>
                  <h3 className="why-choose-card-title">Stroke Medicine</h3>
                  <p className="why-choose-card-body">
                    Integrated stroke rehabilitation and secondary prevention support, focused on improving mobility,
                    communication, independence and long-term neurological recovery.
                  </p>
                  <p className="why-choose-card-body">
                    Services include structured neurorehabilitation planning, physiotherapy and occupational therapy,
                    speech and language therapy pathways, and coordinated follow-up to address spasticity, gait changes,
                    pain, fatigue and functional limitations after stroke.
                  </p>
                  <p className="why-choose-card-body">
                    Our multidisciplinary approach helps patients and families navigate recovery with clear goals,
                    measurable progress and continuity of care across each stage of rehabilitation.
                  </p>
                  <div className="home-team-cta">
                    <Link
                      to="/specialities/stroke-medicine/rehabilitation"
                      className="home-team-link"
                      aria-label="Explore stroke medicine"
                      onClick={() => trackEvent('nav_click', { location: 'specialities-overview', to: 'stroke-medicine' })}
                    >
                      Explore stroke medicine <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="home-section-mainpain-cards">
          <div className="home-section-mainpain-inner">
            <header className="home-section-treatment-header home-section-mainpain-header">
              <div className="home-section-treatment-header-content">
                <p className="home-section-treatment-eyebrow">Explore specialities</p>
                <h2 className="home-section-treatment-title">Where do you feel pain?</h2>
                <p className="home-section-treatment-subtitle">
                  Choose the area that best matches your pain to explore how we can help.
                </p>
              </div>
            </header>
            <div className="home-section-mainpain-grid">
              {painAreas.map((area) => (
                <article key={area.to} className="mainpain-card">
                  <div className={`mainpain-card-image ${area.imageClass}`} aria-hidden="true" />
                  <div className="mainpain-card-body">
                    <p className="mainpain-card-meta">
                      <span>Pain area</span>
                      <span className="mainpain-card-meta-sep" aria-hidden="true">•</span>
                      <span>Explore</span>
                    </p>
                    <Link
                      to={area.to}
                      className="mainpain-card-cta"
                      aria-label={`Read about ${area.title}`}
                      onClick={() => trackEvent('nav_click', { location: 'specialities-pain-grid', to: area.to })}
                    >
                      <h3 className="mainpain-card-title">{area.title}</h3>
                      <span className="mainpain-card-cta-icon" aria-hidden="true">→</span>
                    </Link>
                    <p className="mainpain-card-description sr-only">
                      Learn about assessment and treatment options for {area.title.toLowerCase()}.
                    </p>
                  </div>
                </article>
              ))}
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
              <Link
                to="/about"
                className="home-team-link"
                onClick={() => trackEvent('nav_click', { to: 'about', location: 'specialities-team' })}
              >
                Meet the full team <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>
        <section className="home-section-treatment-cards">
          <div className="home-section-treatment-inner">
            <header className="home-section-treatment-header">
              <div className="home-section-treatment-header-content">
                <p className="home-section-treatment-eyebrow">Clinically-led care plans</p>
                <h2 className="home-section-treatment-title">Our Treatment Approaches</h2>
                <p className="home-section-treatment-subtitle">
                  Evidence-based pathways from conservative care to advanced procedures—designed to relieve pain,
                  restore function and help you return to the activities you love.
                </p>
              </div>
            </header>
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
                    onClick={() => trackEvent('nav_click', { location: 'specialities-treatment', to: 'non-invasive' })}
                  >
                    <span>Explore non‑invasive</span>
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
                    onClick={() => trackEvent('nav_click', { location: 'specialities-treatment', to: 'minimally-invasive' })}
                  >
                    <span>Explore minimally invasive</span>
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
                    onClick={() => trackEvent('nav_click', { location: 'specialities-treatment', to: 'surgical' })}
                  >
                    <span>Explore surgical solutions</span>
                  </Link>
                </div>
              </article>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
