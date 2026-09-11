import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/layout/site-sections.css';
import { trackEvent } from '../../utils/analytics';
import { centres } from '../../data/centres';
import { serializeJsonForHtmlScript } from '../../utils/security';
import { ArticleFeedSkeleton, ImageGridSkeleton } from '../../components/LoadingSkeletons';
import { useHeroParallax } from '../../app/useHeroParallax';

const TestimonialSection = lazy(() => import('./components/TestimonialSection'));
const StoriesSection = lazy(() => import('./components/StoriesSection'));



export default function Home() {
  const heroRef = useRef(null);
  const heroVideoRef = useRef(null);
  const heroContentMotionRef = useRef(null);
  const videoLoadTimersRef = useRef(new Map());
  const [enableStoryVideo, setEnableStoryVideo] = useState(false);
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

  useEffect(() => {
    let ticking = false;
    const setVh = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const vh = window.innerHeight * 0.01;
          document.documentElement.style.setProperty('--vh', `${vh}px`);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    // Stabilize dynamic layout calculation
    if (document.readyState === 'complete') {
      setVh();
    } else {
      window.addEventListener('load', setVh);
    }
    
    window.addEventListener('resize', setVh, { passive: true });
    window.addEventListener('orientationchange', setVh, { passive: true });
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', setVh, { passive: true });
    }
    return () => {
      window.removeEventListener('load', setVh);
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
    const hasLoadedSource = (el) => Boolean(el.getAttribute('src') || el.querySelector('source[src]'));
    const clearVideoTimer = (el) => {
      const timer = videoLoadTimersRef.current.get(el);
      if (!timer) return;
      window.clearTimeout(timer);
      videoLoadTimersRef.current.delete(el);
    };

    const startVideoPlayback = (el) => {
      const sourceEls = Array.from(el.querySelectorAll('source[data-src]'));
      if (sourceEls.length) {
        sourceEls.forEach((sourceEl) => {
          const dataSrc = sourceEl.getAttribute('data-src');
          if (dataSrc && !sourceEl.getAttribute('src')) {
            sourceEl.setAttribute('src', dataSrc);
          }
        });
        el.load();
      } else {
        const dataSrc = el.getAttribute('data-src');
        if (dataSrc && !el.getAttribute('src')) {
          el.setAttribute('src', dataSrc);
        }
      }
      el.play().catch(() => {});
    };

    if (prefersReducedMotion) {
      const vids = Array.from(
        document.querySelectorAll(
          'video.hero-video-el, video.home-section-testimonial-video-el, video.home-section-cards-pain-video, video.mainpain-card-video, video.treatment-card-video, video.home-team-video'
        )
      );
      vids.forEach((v) => {
        clearVideoTimer(v);
        try {
          v.pause();
        } catch {}
      });
      return undefined;
    }
    const videos = Array.from(
      document.querySelectorAll(
        'video.hero-video-el, video.home-section-testimonial-video-el, video.home-section-cards-pain-video, video.mainpain-card-video, video.treatment-card-video, video.home-team-video'
      )
    );
    const onIntersect = (entries) => {
      entries.forEach((entry) => {
        const el = entry.target;
        if (!(el instanceof HTMLVideoElement)) return;
        if (entry.isIntersecting) {
          const deferMs = Number(el.dataset.deferMs || 0);
          if (deferMs > 0 && !hasLoadedSource(el)) {
            if (videoLoadTimersRef.current.has(el)) return;
            const timer = window.setTimeout(() => {
              videoLoadTimersRef.current.delete(el);
              startVideoPlayback(el);
            }, deferMs);
            videoLoadTimersRef.current.set(el, timer);
            return;
          }
          startVideoPlayback(el);
        } else {
          clearVideoTimer(el);
          try {
            el.pause();
          } catch {}
        }
      });
    };
    const io = new IntersectionObserver(onIntersect, { threshold: 0.25 });
    videos.forEach((v) => io.observe(v));
    return () => {
      io.disconnect();
      videoLoadTimersRef.current.forEach((timer) => window.clearTimeout(timer));
      videoLoadTimersRef.current.clear();
    };
  }, []);

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

  useHeroParallax({
    rootRef: heroRef,
    contentRef: heroContentMotionRef,
    mediaRef: heroVideoRef,
    mediaY: -28,
  });

  return (
    <div className="home-page">
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
            data-defer-ms="1400"
          >
            <source data-src="/assets/videos/Appointment-Video.av1.mp4" type='video/mp4; codecs="av01.0.05M.08"' />
            <source data-src="/assets/videos/Appointment-Video.h264.mp4" type='video/mp4; codecs="avc1.42E01E"' />
          </video>
        </div>
        <div className="hero-content hero-content-home hero-content-centered" ref={heroContentMotionRef}>
          <div className="home-hero-layout" style={{ justifyContent: 'center' }}>
            <div className="home-hero-main" style={{ justifyContent: 'center', width: '100%' }}>
              <div className="hero-left hero-home-left home-hero-copy-block" style={{ alignItems: 'center', textAlign: 'center', margin: '0 auto' }}>
                <p className="home-hero-kicker" style={{ color: '#e0f2fe' }}>Comprehensive Care & Wellness</p>
                <h1 className="home-hero-title">Your Pain Center</h1>
                <p className="home-hero-subtitle" style={{ maxWidth: '680px', fontSize: '1.25rem' }}>
                  Our multidisciplinary team delivers holistic, personalized care to relieve spine discomfort and restore your quality of life. From advanced treatments to continuous support, we are by your side.
                </p>
                <div className="home-hero-actions" style={{ justifyContent: 'center', display: 'flex', width: '100%', marginTop: '16px' }}>
                  <Link className="home-hero-primary-cta" to="/contact">
                    <span>Book an Appointment</span>
                  </Link>
                  <Link className="hero-secondary-cta" to="/treatments">
                    <span>Explore Treatments</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="home-main">
        <Suspense fallback={<ImageGridSkeleton count={3} className="page-section" />}>
          <TestimonialSection />
        </Suspense>
        <Suspense fallback={<ArticleFeedSkeleton count={3} className="page-section" />}>
          <StoriesSection enableStoryVideo={enableStoryVideo} />
        </Suspense>

        <section className="home-section-treatment-cards">
          <header className="home-section-team-header">
              <p className="home-section-team-eyebrow">Meet our treatment options</p>
              <h2 className="home-section-team-title home-stories-title">Our Treatments</h2>
              <p className="home-section-team-subtitle">
                Exploit the latest technologies to provide you with the best possible care.
              </p>
            </header>
          <div className="home-section-treatment-inner">
            <div className="home-section-treatment-grid">
              <article className="treatment-card">
                <div className="treatment-card-illustration treatment-card-illustration-non-invasive">
                  <img
                    className="treatment-card-video"
                    src="/assets/images/Homepage/NonInvasive.webp"
                    alt="Physiotherapy session representing non-invasive pain treatments."
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
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
                    className="treatment-card-link"
                    aria-label="Explore non-invasive pain treatment options"
                  >
                    <span>Learn more</span>
                    <span className="treatment-card-link-icon" aria-hidden="true">›</span>
                  </Link>
                </div>
              </article>
              <article className="treatment-card">
                <div className="treatment-card-illustration treatment-card-illustration-minimally-invasive">
                  <img
                    className="treatment-card-video"
                    src="/assets/images/Homepage/MinimallyInvasive.webp"
                    alt="Clinical pain procedure setting representing minimally invasive treatments."
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
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
                    className="treatment-card-link"
                    aria-label="See minimally invasive procedure options"
                  >
                    <span>Learn more</span>
                    <span className="treatment-card-link-icon" aria-hidden="true">›</span>
                  </Link>
                </div>
              </article>
              <article className="treatment-card">
                <div className="treatment-card-illustration treatment-card-illustration-surgical">
                  <img
                    className="treatment-card-video"
                    src="/assets/images/Homepage/Surgical.webp"
                    alt="Spine-related imagery representing surgical spine treatments."
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
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
                    className="treatment-card-link"
                    aria-label="Discover surgical spine treatment options"
                  >
                    <span>Learn more</span>
                    <span className="treatment-card-link-icon" aria-hidden="true">›</span>
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
                <h2 className="home-section-treatment-title home-stories-title">Our Main Pain Areas</h2>
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
              <h2 className="home-section-team-title home-stories-title">Our care team</h2>
              <p className="home-section-team-subtitle">
                Experienced specialists working together to relieve your pain.
              </p>
            </header>
            <div className="home-team-grid">
              <article className="home-team-card">
                <div className="home-team-image">
                  <img src="/assets/images/team/dr-miguel-costa-algarve-pain-centre.webp" alt="Dr. Miguel Costa" loading="lazy" />
                </div>
                <div className="home-team-body">
                  <h3 className="home-team-name">Dr. Miguel Costa</h3>
                  <p className="home-team-role">Physical Rehabilitation · Sports Medicine</p>
                </div>
              </article>
              <article className="home-team-card">
                <div className="home-team-image">
                  <img src="/assets/images/team/dr-miguel-batista-algarve-pain-centre.webp" alt="Dr. Miguel Baptista" loading="lazy" />
                </div>
                <div className="home-team-body">
                  <h3 className="home-team-name">Dr. Miguel Baptista</h3>
                  <p className="home-team-role">Neuroradiology</p>
                </div>
              </article>
              <article className="home-team-card">
                <div className="home-team-image">
                  <img src="/assets/images/team/dr-ricardo-frada-algarve-pain-centre.webp" alt="Dr. Ricardo Frada" loading="lazy" />
                </div>
                <div className="home-team-body">
                  <h3 className="home-team-name">Dr. Ricardo Frada</h3>
                  <p className="home-team-role">Orthopedic Surgery</p>
                </div>
              </article>
              <Link
                to="/about#our-team"
                className="home-team-card home-team-card-link"
                aria-label="Meet our team at Algarve Pain Centre"
                onClick={() => trackEvent('nav_click', { to: 'about#our-team', location: 'home-team-card' })}
              >
                <div className="home-team-image">
                  <video
                    className="home-team-video"
                    data-src="/assets/videos/Cir.h264.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="none"
                    aria-label="Rehabilitation team video"
                  />
                </div>
                <div className="home-team-body">
                  <h3 className="home-team-name">Meet Our Team</h3>
                  <p className="home-team-role">Algarve Pain Centre team members</p>
                </div>
              </Link>
            </div>
            <div className="home-centers" role="region" aria-labelledby="home-centers-title">
              <header className="home-centers-header">
                <p className="home-centers-eyebrow">Our network</p>
                <h3 id="home-centers-title" className="home-centers-title">Our Centers</h3>
                <p className="home-centers-subtitle">
                  Explore our specialist centres in the Algarve and contact our team for appointments and referrals.
                </p>
              </header>

              <ul className="home-centers-grid" role="list" aria-label="Medical centres">
                {centres.map((centre) => (
                  <li className="home-centers-item" role="listitem" key={centre.slug}>
                    <Link
                      to={centre.path || '/contact'}
                      className={`home-centers-card${centre.logo ? ' home-centers-card--logo' : ''}`}
                      aria-label={centre.path ? `Visit ${centre.name}` : `Contact ${centre.name}`}
                      onClick={() => trackEvent('nav_click', { to: centre.path ? 'centre-page' : 'contact', location: 'home-centers', center: centre.slug })}
                    >
                      <img
                        className="home-centers-card-bg"
                        src={centre.image}
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                      <span className="home-centers-card-overlay" aria-hidden="true" />
                      <div className="home-centers-card-content">
                        {centre.logo && (
                          <span className="home-centers-card-logo" aria-hidden="true">
                            <img src={centre.logo} alt="" loading="lazy" decoding="async" />
                          </span>
                        )}
                        <h4 className="home-centers-card-title">{centre.name}</h4>
                        <p className="home-centers-card-body">{centre.body}</p>
                        <span className="home-centers-card-cta" aria-hidden="true">
                          {centre.path ? 'Visit centre →' : 'Contact centre →'}
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="home-section-faq">
          <div className="home-section-why-choose-inner">
            <header className="home-section-why-choose-header">
              <p className="home-section-why-choose-eyebrow">
                Frequently asked questions
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
    </div>
  );
}
