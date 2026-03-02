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
  }, []);

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
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
            <div className="hero-accent-line mainpain-card-accent"></div>
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
            <div className="home-section-testimonial-media-inline">
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
                  src="/assets/videos/post-43.mp4"
                />
                <div className="home-section-testimonial-video-overlay">
                  <button
                    type="button"
                    className="home-section-testimonial-video-cta"
                    onClick={() =>
                      navigate('/resources/testimonials/overcoming-sciatica-pain')
                    }
                  >
                    Watch how APC treats complex pain
                  </button>
                </div>
              </div>
            </div>
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
                src="/assets/videos/post-43.mp4"
              />
              <div className="home-section-testimonial-video-overlay">
                <button
                  type="button"
                  className="home-section-testimonial-video-cta"
                  onClick={() =>
                    navigate('/resources/testimonials/overcoming-sciatica-pain')
                  }
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
                <p className="home-section-cards-pain-eyebrow">Personalised pain pathways</p>
                <h3 className="home-section-cards-pain-title">All pain areas we treat</h3>
                <p className="home-section-cards-pain-description">
                  From spine and joint pain to complex neurological conditions, our multidisciplinary team
                  understands the root cause of your pain and builds a plan around you.
                </p>
                <Link
                  to="/specialities"
                  className="home-section-cards-pain-link"
                >
                  Explore pain areas
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
                >
                  See treatment options
                  <span className="home-section-cards-pain-link-icon">→</span>
                </Link>
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
                <div className="mainpain-card-image mainpain-card-image-spine">
                  <video
                    className="mainpain-card-video"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    data-src="/assets/videos/test.mp4"
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
                    data-src="/assets/videos/test.mp4"
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
                    data-src="/assets/videos/test.mp4"
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
                  >
                    <span>Explore non‑invasive care</span>
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
                    <span>See minimally invasive options</span>
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
                    <span>Discover surgical solutions</span>
                  </Link>
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

            <div className="home-section-why-choose-layout">
              <div
                className="home-section-why-choose-grid"
                aria-label="Reasons patients choose Algarve Pain Centre"
              >
                {whyChooseItems.map((item) => (
                  <article key={item.title} className="why-choose-card">
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
              <div className="home-section-why-choose-grid" aria-label="Frequently asked questions">
                <article className="why-choose-card">
                  <h3 className="why-choose-card-title">
                    What types of pain conditions do you treat?
                  </h3>
                  <p className="why-choose-card-body">
                    We treat a wide range of conditions including spine pain, joint pain, nerve
                    pain, headaches, sports injuries and post‑stroke symptoms. If you are unsure
                    whether your condition fits, our team can review your situation and guide you to
                    the right specialist.
                  </p>
                </article>
                <article className="why-choose-card">
                  <h3 className="why-choose-card-title">
                    Do I need a referral to book an appointment?
                  </h3>
                  <p className="why-choose-card-body">
                    A formal referral is not always required. Many patients contact Algarve Pain
                    Centre directly, while others are referred by their family doctor or another
                    specialist. If you already have scans or reports, bringing them to your visit
                    helps us avoid repeating tests.
                  </p>
                </article>
                <article className="why-choose-card">
                  <h3 className="why-choose-card-title">
                    Do you see international patients visiting the Algarve?
                  </h3>
                  <p className="why-choose-card-body">
                    Yes. We regularly care for patients who live abroad or spend part of the year in
                    Portugal. Our clinic team can help you coordinate appointments and treatment
                    around your travel schedule, and we share information with your doctors at home
                    when needed.
                  </p>
                </article>
                <article className="why-choose-card">
                  <h3 className="why-choose-card-title">
                    What should I expect from my first consultation?
                  </h3>
                  <p className="why-choose-card-body">
                    Your first visit usually lasts long enough for a detailed discussion of your
                    symptoms, examination and review of previous investigations. By the end we aim to
                    give you a clear explanation of your condition, outline immediate steps and
                    propose a longer‑term plan tailored to your goals.
                  </p>
                </article>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
