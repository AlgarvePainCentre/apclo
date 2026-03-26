import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../home/Home.css';
import './Treatments.css';

export const treatmentNavOrder = [
  { title: 'Tubular microsurgery', to: '/treatments/surgical-treatments/tubular-microsurgery' },
  { title: 'Spinal fusion', to: '/treatments/surgical-treatments/spinal-fusion' },
  { title: 'Disc replacement', to: '/treatments/surgical-treatments/disc-replacement' },
  { title: 'Lumbar deformity surgery', to: '/treatments/surgical-treatments/lumbar-deformity-surgery' },
  { title: 'Vertebroplasty', to: '/treatments/minimally-invasive-treatments/vertebroplasty' },
  { title: 'Radiofrequency', to: '/treatments/minimally-invasive-treatments/radiofrequency' },
  { title: 'Interspinous spacers', to: '/treatments/minimally-invasive-treatments/interspinous-spacers' },
  { title: 'Peripheral nerve block', to: '/treatments/minimally-invasive-treatments/peripheral-nerve-block' },
  {
    title: 'Intra-articular corticosteroids injection',
    to: '/treatments/minimally-invasive-treatments/intra-articular-corticosteroids-injection',
  },
  { title: 'Calcification barbotage', to: '/treatments/minimally-invasive-treatments/calcification-barbotage' },
  { title: 'Cryoblation', to: '/treatments/minimally-invasive-treatments/cryoblation' },
  { title: 'Nucleoplasty', to: '/treatments/minimally-invasive-treatments/nucleoplasty' },
  {
    title: 'Platelets rich plasma injection',
    to: '/treatments/minimally-invasive-treatments/platelets-rich-plasma-injection',
  },
  { title: 'Hydrodistention', to: '/treatments/minimally-invasive-treatments/hydrodistention' },
  { title: 'Botulin toxin injection', to: '/treatments/minimally-invasive-treatments/botulin-toxin-injection' },
  {
    title: 'Pharmacological pain management',
    to: '/treatments/non-invasive-treatments/pharmacological-pain-management',
  },
  { title: 'Physiotherapy', to: '/treatments/non-invasive-treatments/physiotherapy' },
  { title: 'Osteopathy', to: '/treatments/non-invasive-treatments/osteopathy' },
  { title: 'Occupational therapy', to: '/treatments/non-invasive-treatments/occupation-therapy' },
  { title: 'Speech therapy', to: '/treatments/non-invasive-treatments/speech-therapy' },
  { title: 'Psychology', to: '/treatments/non-invasive-treatments/psychology' },
  { title: 'Nutrition', to: '/treatments/non-invasive-treatments/nutrition' },
  { title: 'Exercise', to: '/treatments/non-invasive-treatments/exercise' },
  { title: 'Podology', to: '/treatments/non-invasive-treatments/podology' },
  { title: 'Home care', to: '/treatments/non-invasive-treatments/home-care' },
];

export function TreatmentsMain({
  hideMinimallyInvasive = false,
  hideNonInvasive = false,
  hideSurgical = false,
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const carouselRef = useRef(null);
  const contactMapIframeRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const normalizePathname = (pathname) => {
    if (!pathname) return '/';
    if (pathname.length > 1 && pathname.endsWith('/')) return pathname.slice(0, -1);
    return pathname;
  };

  const currentTreatmentIndex = treatmentNavOrder.findIndex(
    (item) => item.to === normalizePathname(location.pathname),
  );
  const previousTreatment = currentTreatmentIndex > 0 ? treatmentNavOrder[currentTreatmentIndex - 1] : null;
  const nextTreatment =
    currentTreatmentIndex >= 0 && currentTreatmentIndex < treatmentNavOrder.length - 1
      ? treatmentNavOrder[currentTreatmentIndex + 1]
      : null;

  useEffect(() => {
    const iframe = contactMapIframeRef.current;
    if (!iframe) return undefined;
    if (!(iframe instanceof HTMLIFrameElement)) return undefined;

    const loadMap = () => {
      const dataSrc = iframe.getAttribute('data-src');
      if (dataSrc && !iframe.getAttribute('src')) {
        iframe.setAttribute('src', dataSrc);
      }
    };

    if (!('IntersectionObserver' in window)) {
      loadMap();
      return undefined;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          loadMap();
          io.disconnect();
        });
      },
      { threshold: 0.15 },
    );
    io.observe(iframe);
    return () => io.disconnect();
  }, []);

  // Mouse Drag Handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll-fast multiplier
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const testimonials = [
    {
      name: 'Jean‑François Cristau',
      location: 'France',
      initials: 'JC',
      avatarSrc: '/assets/images/team/Miguel-Baptista-min.jpg',
      quote:
        'Indeed we have been greatly satisfied with your team and professional support over the past months.',
      service: 'In Stroke Medicine',
    },
    {
      name: 'Gerald Kraftman',
      location: 'Poland',
      initials: 'GK',
      avatarSrc: '/assets/images/illustrative/pain-medicine-algarve-min.jpg',
      quote:
        'We are very impressed with the approach of you and your team, and the treatment received over the last two months.',
      service: 'In Pain Medicine',
    },
    {
      name: 'Carole Lee',
      location: 'The Netherlands',
      initials: 'CL',
      avatarSrc: '/assets/images/illustrative/Physiotherapy-min.jpg',
      quote:
        'After treatment and guided exercises I can now get on with my life with much less pain and more confidence.',
      service: 'In Rehabilitation',
    },
  ];

  const surgicalTreatments = [
    {
      title: "Tubular microsurgery",
      link: "/treatments/surgical-treatments/tubular-microsurgery",
      icon: "/assets/images/Icons-Specialities/Asset-S13.png",
      category: "Surgical",
      description: "Advanced microscopic technique for precise nerve decompression.",
      author: "Medical Team",
      date: "Oct 15, 2023",
      readTime: "5 min read"
    },
    {
      title: "Spinal fusion",
      link: "/treatments/surgical-treatments/spinal-fusion",
      icon: "/assets/images/Icons-Specialities/Asset-S14.png",
      category: "Surgical",
      description: "Stabilises the spine to reduce pain and improve alignment.",
      author: "Medical Team",
      date: "Sep 28, 2023",
      readTime: "7 min read"
    },
    {
      title: "Disc replacement",
      link: "/treatments/surgical-treatments/disc-replacement",
      icon: "/assets/images/Icons-Specialities/Asset-S15.png",
      category: "Surgical",
      description: "Preserves motion by replacing damaged discs with artificial ones.",
      author: "Medical Team",
      date: "Nov 05, 2023",
      readTime: "6 min read"
    }
  ];

  const minimallyInvasiveTreatments = [
    {
      title: "Vertebroplasty",
      link: "/treatments/minimally-invasive-treatments/vertebroplasty",
      icon: "/assets/images/Icons-Specialities/Asset-S12.png",
      category: "Minimally Invasive",
      description: "Reinforces fractured vertebrae using bone cement.",
      author: "Medical Team",
      date: "Aug 14, 2023",
      readTime: "4 min read"
    },
    {
      title: "Radiofrequency",
      link: "/treatments/minimally-invasive-treatments/radiofrequency",
      icon: "/assets/images/Icons-Specialities/Asset-S9.png",
      category: "Minimally Invasive",
      description: "Uses heat to disrupt pain signals from specific nerves.",
      author: "Medical Team",
      date: "Oct 02, 2023",
      readTime: "3 min read"
    },
    {
      title: "Interspinous spacers",
      link: "/treatments/minimally-invasive-treatments/interspinous-spacers",
      icon: "/assets/images/Icons-Specialities/Asset-S8.png",
      category: "Minimally Invasive",
      description: "Implants that relieve pressure on nerves in the spine.",
      author: "Medical Team",
      date: "Sep 10, 2023",
      readTime: "4 min read"
    }
  ];

  const nonInvasiveTreatments = [
    {
      title: "Pharmacological pain management",
      link: "/treatments/non-invasive-treatments/pharmacological-pain-management",
      icon: "/assets/images/Icons-Specialities/Asset-S4.png",
      category: "Non-Invasive",
      description: "Medication strategies tailored to your specific pain profile.",
      author: "Medical Team",
      date: "Nov 12, 2023",
      readTime: "3 min read"
    },
    {
      title: "Physiotherapy",
      link: "/treatments/non-invasive-treatments/physiotherapy",
      icon: "/assets/images/Icons-Specialities/Asset-S7.png",
      category: "Non-Invasive",
      description: "Physical exercises to restore movement and strength.",
      author: "Medical Team",
      date: "Oct 20, 2023",
      readTime: "5 min read"
    },
    {
      title: "Nutrition",
      link: "/treatments/non-invasive-treatments/nutrition",
      icon: "/assets/images/Icons-Specialities/Asset-S10.png",
      category: "Non-Invasive",
      description: "Dietary plans to support healing and reduce inflammation.",
      author: "Medical Team",
      date: "Sep 05, 2023",
      readTime: "4 min read"
    }
  ];

  const TreatmentCard = ({ item }) => (
    <article className="treatment-highlight-card">
      <div className="treatment-card-header">
        <div className="treatment-highlight-illustration">
          <img
            src={item.icon}
            alt=""
            aria-hidden="true"
            className="treatment-highlight-icon"
            loading="lazy"
          />
        </div>
        <span className="treatment-card-tag">{item.category}</span>
      </div>
      <div className="treatment-highlight-body">
        <div className="treatment-card-meta">
          <span className="treatment-card-author">{item.author}</span>
          <span className="treatment-card-divider">•</span>
          <span className="treatment-card-date">{item.date}</span>
          <span className="treatment-card-divider">•</span>
          <span className="treatment-card-read-time">{item.readTime}</span>
        </div>
        <h3 className="treatment-highlight-title">{item.title}</h3>

        <p className="treatment-card-excerpt">{item.description}</p>
        <Link
          to={item.link}
          className="treatment-card-button treatment-highlight-link"
          aria-label={`Learn more about ${item.title}`}
        >
          <span>Read article</span>
        </Link>
      </div>
    </article>
  );

  return (
    <main className="page-main treatments-page">
      {!hideSurgical && (
        <>
          <section className="page-section treatments-overview">

            <header className="home-section-treatment-header treatments-section-header">
              <div className="home-section-treatment-header-content">
                <p className="home-section-treatment-eyebrow home-stories-eyebrow">Clinically-led care plans</p>
                <h2 className="home-section-treatment-title home-stories-title">
                   Surgical Procedures
                </h2>
                <p className="home-section-treatment-subtitle">
                  Surgical procedures are complex interventions that require advanced techniques and
                  precision to address spine conditions.
                </p>
              </div>
            </header>

            <div className="treatments-overview-layout">
              <article className="treatments-overview-card">
                <h3 className="treatments-overview-card-title">Surgical procedures</h3>
                <div className="treatments-overview-card-accent" />
                <p className="treatments-overview-card-body">
                  Surgical procedures are comprehensive interventions designed to address complex spine
                  and pain conditions with precision.
                </p>
                <p className="treatments-overview-card-body">
                  They use advanced techniques to decompress nerves, stabilise the spine and correct
                  deformities when less invasive options are not enough.
                </p>
                <Link
                  to="/treatments/surgical-treatments/spinal-fusion"
                  className="treatment-card-button"
                  aria-label="Learn more about surgical spine procedures"
                >
                  <span>Learn more</span>
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

          <section className="home-section-discovery" aria-labelledby="treatments-discovery-overview-title">
            <div className="home-section-discovery-inner">
              <div className="home-discovery-layout">
                <header className="home-discovery-header">
                  <h2 id="treatments-discovery-overview-title" className="home-discovery-title">
                    Surgical Procedures
                  </h2>
                  <p className="home-discovery-subtitle">
                    Compare common surgical procedure options and learn which pathway may be appropriate.
                  </p>
                </header>

                <div
                  className="home-discovery-carousel"
                  role="region"
                  aria-roledescription="carousel"
                  aria-label="Surgical procedures carousel"
                >
                  <input
                    className="home-discovery-radio"
                    type="radio"
                    name="treatments-discovery-overview"
                    id="overview-discovery-1"
                    defaultChecked
                  />
                  <input className="home-discovery-radio" type="radio" name="treatments-discovery-overview" id="overview-discovery-2" />
                  <input className="home-discovery-radio" type="radio" name="treatments-discovery-overview" id="overview-discovery-3" />
                  <input className="home-discovery-radio" type="radio" name="treatments-discovery-overview" id="overview-discovery-4" />

                  <div
                    className="home-discovery-viewport"
                  >
                    <ul className="home-discovery-track" role="list">
                      <li className="home-discovery-slide" role="listitem">
                        <Link
                          to="/treatments/surgical-treatments/tubular-microsurgery"
                          className="home-discovery-card"
                          aria-label="Explore Tubular Microsurgery"
                        >
                          <span className="home-discovery-card-icon" aria-hidden="true">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M12 4.5c3 0 5.5 2.5 5.5 5.6 0 2.4-1.5 4.4-3.6 5.2-.7 1.7-2.2 3.2-4 4.2-1.8-1-3.3-2.5-4-4.2-2.1-.8-3.6-2.8-3.6-5.2C2.3 7 5 4.5 8 4.5"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinejoin="round"
                              />
                              <path d="M8.9 10.4h6.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                            </svg>
                          </span>
                          <h3 className="home-discovery-card-title">Tubular Microsurgery</h3>
                          <p className="home-discovery-card-body">
                            Advanced microscopic technique designed for precise decompression with a smaller access corridor.
                          </p>
                        </Link>
                      </li>

                      <li className="home-discovery-slide" role="listitem">
                        <Link
                          to="/treatments/surgical-treatments/spinal-fusion"
                          className="home-discovery-card"
                          aria-label="Explore Spinal Fusion"
                        >
                          <span className="home-discovery-card-icon" aria-hidden="true">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M10 4.5c.7-1 1.6-1.5 2-1.5s1.3.5 2 1.5v4.2c0 .8-.4 1.6-1 2.1l-1 .9-1-.9c-.6-.5-1-1.3-1-2.1V4.5Z"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M8.5 12.5h7M9 15.5h6M10 18.5h4"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                              />
                            </svg>
                          </span>
                          <h3 className="home-discovery-card-title">Spinal Fusion</h3>
                          <p className="home-discovery-card-body">
                            Stabilises the spine to reduce pain and improve alignment when motion is contributing to symptoms.
                          </p>
                        </Link>
                      </li>

                      <li className="home-discovery-slide" role="listitem">
                        <Link
                          to="/treatments/surgical-treatments/disc-replacement"
                          className="home-discovery-card"
                          aria-label="Explore Disc Replacement"
                        >
                          <span className="home-discovery-card-icon" aria-hidden="true">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M9 3.8h6M9 7.2h6M9 10.6h6M9 14h6M10.2 17.4h3.6"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                              />
                            </svg>
                          </span>
                          <h3 className="home-discovery-card-title">Disc Replacement</h3>
                          <p className="home-discovery-card-body">
                            Replaces a damaged disc with an artificial implant to preserve motion while relieving nerve irritation.
                          </p>
                        </Link>
                      </li>

                      <li className="home-discovery-slide" role="listitem">
                        <Link
                          to="/treatments/surgical-treatments/lumbar-deformity-surgery"
                          className="home-discovery-card"
                          aria-label="Explore Lumbar Deformity Surgery"
                        >
                          <span className="home-discovery-card-icon" aria-hidden="true">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M7.2 13.4c0-2.6 2.1-4.7 4.8-4.7h.2c2.6 0 4.8 2.1 4.8 4.7v5.1H7.2v-5.1Z"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinejoin="round"
                              />
                              <path d="M12 5.5v3.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                            </svg>
                          </span>
                          <h3 className="home-discovery-card-title">Lumbar Deformity Surgery</h3>
                          <p className="home-discovery-card-body">
                            Corrects spinal alignment and balance when deformity is driving pain, weakness or functional limits.
                          </p>
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div className="home-discovery-controls" aria-label="Carousel controls">
                    <div className="home-discovery-arrows" aria-hidden="true">
                      <div className="home-discovery-arrow-set home-discovery-arrow-set-1">
                        <label className="home-discovery-arrow" htmlFor="overview-discovery-4">‹</label>
                        <label className="home-discovery-arrow" htmlFor="overview-discovery-2">›</label>
                      </div>
                      <div className="home-discovery-arrow-set home-discovery-arrow-set-2">
                        <label className="home-discovery-arrow" htmlFor="overview-discovery-1">‹</label>
                        <label className="home-discovery-arrow" htmlFor="overview-discovery-3">›</label>
                      </div>
                      <div className="home-discovery-arrow-set home-discovery-arrow-set-3">
                        <label className="home-discovery-arrow" htmlFor="overview-discovery-2">‹</label>
                        <label className="home-discovery-arrow" htmlFor="overview-discovery-4">›</label>
                      </div>
                      <div className="home-discovery-arrow-set home-discovery-arrow-set-4">
                        <label className="home-discovery-arrow" htmlFor="overview-discovery-3">‹</label>
                        <label className="home-discovery-arrow" htmlFor="overview-discovery-1">›</label>
                      </div>
                    </div>

                    <div className="home-discovery-dots" aria-label="Choose a surgical procedure">
                      <label className="home-discovery-dot" htmlFor="overview-discovery-1" aria-label="Tubular Microsurgery" />
                      <label className="home-discovery-dot" htmlFor="overview-discovery-2" aria-label="Spinal Fusion" />
                      <label className="home-discovery-dot" htmlFor="overview-discovery-3" aria-label="Disc Replacement" />
                      <label className="home-discovery-dot" htmlFor="overview-discovery-4" aria-label="Lumbar Deformity Surgery" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="page-section treatments-highlighted">
            <header className="home-section-treatment-header treatments-section-header">
              <div className="home-section-treatment-header-content">
                <p className="home-section-treatment-eyebrow">Surgical procedures</p>
                <h2 className="home-section-treatment-title">Highlighted surgical procedures</h2>
              </div>
            </header>
            <div className="treatments-highlighted-grid">
              {surgicalTreatments.map((item, index) => (
                <TreatmentCard key={index} item={item} />
              ))}
            </div>
          </section>
        </>
      )}
      {!hideMinimallyInvasive && (
        <>
          <section className="page-section treatments-feature treatments-feature-mi">
            <header className="home-section-treatment-header treatments-section-header">
              <div className="home-section-treatment-header-content">
                <p className="home-section-treatment-eyebrow home-stories-eyebrow">Minimally invasive</p>
                <h2 className="home-section-treatment-title home-stories-title">Minimally invasive treatments</h2>
                <p className="home-section-treatment-subtitle">
                  Learn about options that use small, image‑guided procedures to ease pain while limiting
                  recovery time and scarring.
                </p>
              </div>
            </header>
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
                  className="treatment-card-button"
                  aria-label="Learn more about minimally invasive treatments"
                >
                  <span>Learn more</span>
                </Link>
              </div>
            </div>
          </section>

          <section className="home-section-discovery" aria-labelledby="treatments-discovery-title">
            <div className="home-section-discovery-inner">
              <div className="home-discovery-layout">
                <header className="home-discovery-header">
                  <h2 id="treatments-discovery-title" className="home-discovery-title">
                    Minimally Invasive Treatments
                  </h2>
                  <p className="home-discovery-subtitle">
                    Explore treatment options designed to relieve pain and restore function without open surgery.
                  </p>
                </header>

                <div
                  className="home-discovery-carousel"
                  role="region"
                  aria-roledescription="carousel"
                  aria-label="Non-invasive treatments carousel"
                >
                  <input
                    className="home-discovery-radio"
                    type="radio"
                    name="treatments-discovery"
                    id="home-discovery-1"
                    defaultChecked
                  />
                  <input className="home-discovery-radio" type="radio" name="treatments-discovery" id="home-discovery-2" />
                  <input className="home-discovery-radio" type="radio" name="treatments-discovery" id="home-discovery-3" />
                  <input className="home-discovery-radio" type="radio" name="treatments-discovery" id="home-discovery-4" />
                  <input className="home-discovery-radio" type="radio" name="treatments-discovery" id="home-discovery-5" />
                  <input className="home-discovery-radio" type="radio" name="treatments-discovery" id="home-discovery-6" />
                  <input className="home-discovery-radio" type="radio" name="treatments-discovery" id="home-discovery-7" />
                  <input className="home-discovery-radio" type="radio" name="treatments-discovery" id="home-discovery-8" />
                  <input className="home-discovery-radio" type="radio" name="treatments-discovery" id="home-discovery-9" />
                  <input className="home-discovery-radio" type="radio" name="treatments-discovery" id="home-discovery-10" />
                  <input className="home-discovery-radio" type="radio" name="treatments-discovery" id="home-discovery-11" />

                  <div className="home-discovery-viewport">
                    <ul className="home-discovery-track" role="list">
                      <li className="home-discovery-slide" role="listitem">
                        <Link
                          to="/treatments/minimally-invasive-treatments/vertebroplasty"
                          className="home-discovery-card"
                          aria-label="Explore Vertebroplasty"
                        >
                          <span className="home-discovery-card-icon" aria-hidden="true">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M12 4.5c3 0 5.5 2.5 5.5 5.6 0 2.4-1.5 4.4-3.6 5.2-.7 1.7-2.2 3.2-4 4.2-1.8-1-3.3-2.5-4-4.2-2.1-.8-3.6-2.8-3.6-5.2C2.3 7 5 4.5 8 4.5"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinejoin="round"
                              />
                              <path d="M8.9 10.4h6.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                            </svg>
                          </span>
                          <h3 className="home-discovery-card-title">Vertebroplasty</h3>
                          <p className="home-discovery-card-body">
                            Reinforces fractured vertebrae using medical-grade cement to improve stability and pain.
                          </p>
                        </Link>
                      </li>

                      <li className="home-discovery-slide" role="listitem">
                        <Link
                          to="/treatments/minimally-invasive-treatments/radiofrequency"
                          className="home-discovery-card"
                          aria-label="Explore Radiofrequency"
                        >
                          <span className="home-discovery-card-icon" aria-hidden="true">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M10 4.5c.7-1 1.6-1.5 2-1.5s1.3.5 2 1.5v4.2c0 .8-.4 1.6-1 2.1l-1 .9-1-.9c-.6-.5-1-1.3-1-2.1V4.5Z"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M8.5 12.5h7M9 15.5h6M10 18.5h4"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                              />
                            </svg>
                          </span>
                          <h3 className="home-discovery-card-title">Radiofrequency</h3>
                          <p className="home-discovery-card-body">
                            Uses heat to disrupt targeted nerve signals that contribute to persistent pain.
                          </p>
                        </Link>
                      </li>

                      <li className="home-discovery-slide" role="listitem">
                        <Link
                          to="/treatments/minimally-invasive-treatments/interspinous-spacers"
                          className="home-discovery-card"
                          aria-label="Explore Interspinous Spacers"
                        >
                          <span className="home-discovery-card-icon" aria-hidden="true">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M9 3.8h6M9 7.2h6M9 10.6h6M9 14h6M10.2 17.4h3.6"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                              />
                            </svg>
                          </span>
                          <h3 className="home-discovery-card-title">Interspinous Spacers</h3>
                          <p className="home-discovery-card-body">
                            Implants that increase space between vertebrae to ease pressure on spinal nerves.
                          </p>
                        </Link>
                      </li>

                      <li className="home-discovery-slide" role="listitem">
                        <Link
                          to="/treatments/minimally-invasive-treatments/peripheral-nerve-block"
                          className="home-discovery-card"
                          aria-label="Explore Peripheral Nerve Block"
                        >
                          <span className="home-discovery-card-icon" aria-hidden="true">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M7.2 13.4c0-2.6 2.1-4.7 4.8-4.7h.2c2.6 0 4.8 2.1 4.8 4.7v5.1H7.2v-5.1Z"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinejoin="round"
                              />
                              <path d="M12 5.5v3.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                            </svg>
                          </span>
                          <h3 className="home-discovery-card-title">Peripheral Nerve Block</h3>
                          <p className="home-discovery-card-body">
                            Local anaesthetic injection near a nerve to reduce pain and support rehabilitation.
                          </p>
                        </Link>
                      </li>

                      <li className="home-discovery-slide" role="listitem">
                        <Link
                          to="/treatments/minimally-invasive-treatments/intra-articular-corticosteroids-injection"
                          className="home-discovery-card"
                          aria-label="Explore Intra-articular Corticosteroids Injection"
                        >
                          <span className="home-discovery-card-icon" aria-hidden="true">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M8.3 12.2v-5.1c0-.7.5-1.2 1.2-1.2s1.2.5 1.2 1.2v4.2"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M10.7 11.3V6.6c0-.7.5-1.2 1.2-1.2s1.2.5 1.2 1.2v4.7"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M13.1 11.5V7.2c0-.7.5-1.2 1.2-1.2s1.2.5 1.2 1.2v6.6c0 2.7-1.6 4.8-4.6 4.8-2.7 0-4.1-1.5-4.6-3.3"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                              />
                            </svg>
                          </span>
                          <h3 className="home-discovery-card-title">Intra-articular Corticosteroids Injection</h3>
                          <p className="home-discovery-card-body">
                            Anti-inflammatory medication injected into a joint to reduce pain and swelling.
                          </p>
                        </Link>
                      </li>

                      <li className="home-discovery-slide" role="listitem">
                        <Link
                          to="/treatments/minimally-invasive-treatments/calcification-barbotage"
                          className="home-discovery-card"
                          aria-label="Explore Calcification Barbotage"
                        >
                          <span className="home-discovery-card-icon" aria-hidden="true">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M10 4.5c.6 2 .5 3.9-.3 5.7l-1.2 2.6c-.3.7.2 1.5 1 1.5h2.4"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                              />
                              <path
                                d="M14 4.5c-.6 2-.5 3.9.3 5.7l1.2 2.6c.3.7-.2 1.5-1 1.5h-2.4"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                              />
                              <path
                                d="M9.2 18.7c0-1.6 1.3-2.9 2.8-2.9s2.8 1.3 2.8 2.9"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                              />
                            </svg>
                          </span>
                          <h3 className="home-discovery-card-title">Calcification Barbotage</h3>
                          <p className="home-discovery-card-body">
                            Ultrasound-guided washout technique used to break down and remove calcific deposits.
                          </p>
                        </Link>
                      </li>

                      <li className="home-discovery-slide" role="listitem">
                        <Link
                          to="/treatments/minimally-invasive-treatments/cryoblation"
                          className="home-discovery-card"
                          aria-label="Explore Cryoblation"
                        >
                          <span className="home-discovery-card-icon" aria-hidden="true">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M9.2 4.5c1.8 2.5 1.8 6.2 0 8.7-1.3 1.8-1.2 4.4.2 6.3"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                              />
                              <path
                                d="M14.8 4.5c-1.8 2.5-1.8 6.2 0 8.7 1.3 1.8 1.2 4.4-.2 6.3"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                              />
                              <path d="M9.6 12.2h4.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                            </svg>
                          </span>
                          <h3 className="home-discovery-card-title">Cryoblation</h3>
                          <p className="home-discovery-card-body">
                            Uses controlled freezing to interrupt pain pathways from targeted nerves.
                          </p>
                        </Link>
                      </li>

                      <li className="home-discovery-slide" role="listitem">
                        <Link
                          to="/treatments/minimally-invasive-treatments/nucleoplasty"
                          className="home-discovery-card"
                          aria-label="Explore Nucleoplasty"
                        >
                          <span className="home-discovery-card-icon" aria-hidden="true">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M7.5 5.5c0 3.3-2 4.8-2 7.4 0 4.3 3.1 7.1 6.5 7.1"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                              />
                              <path
                                d="M16.5 5.5c0 3.3 2 4.8 2 7.4 0 4.3-3.1 7.1-6.5 7.1"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                              />
                              <path
                                d="M8.8 11.2h6.4M8.4 14.2h7.2"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                              />
                            </svg>
                          </span>
                          <h3 className="home-discovery-card-title">Nucleoplasty</h3>
                          <p className="home-discovery-card-body">
                            Minimally invasive disc decompression to reduce pressure on irritated nerves.
                          </p>
                        </Link>
                      </li>

                      <li className="home-discovery-slide" role="listitem">
                        <Link
                          to="/treatments/minimally-invasive-treatments/platelets-rich-plasma-injection"
                          className="home-discovery-card"
                          aria-label="Explore Platelets Rich Plasma Injection"
                        >
                          <span className="home-discovery-card-icon" aria-hidden="true">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M8.3 5.2c-1.2 1.6-1.8 3.5-1.8 5.5 0 5 3.5 9.1 5.5 9.1s5.5-4.1 5.5-9.1c0-2-.6-3.9-1.8-5.5"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M9.2 11.2h5.6M9.8 14.3h4.4"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                              />
                            </svg>
                          </span>
                          <h3 className="home-discovery-card-title">Platelets Rich Plasma Injection</h3>
                          <p className="home-discovery-card-body">
                            Concentrated platelets injected to support tissue healing in tendon and joint conditions.
                          </p>
                        </Link>
                      </li>

                      <li className="home-discovery-slide" role="listitem">
                        <Link
                          to="/treatments/minimally-invasive-treatments/hydrodistention"
                          className="home-discovery-card"
                          aria-label="Explore Hydrodistention"
                        >
                          <span className="home-discovery-card-icon" aria-hidden="true">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M8 5.5c0 4.2-2.5 4.6-2.5 8.1 0 3.2 2.3 5.4 6.5 5.4s6.5-2.2 6.5-5.4C18.5 10.1 16 9.7 16 5.5"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinejoin="round"
                              />
                              <path d="M9.3 12.2h5.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                            </svg>
                          </span>
                          <h3 className="home-discovery-card-title">Hydrodistention</h3>
                          <p className="home-discovery-card-body">
                            Bladder filling procedure used to help diagnose and relieve symptoms in select conditions.
                          </p>
                        </Link>
                      </li>

                      <li className="home-discovery-slide" role="listitem">
                        <Link
                          to="/treatments/minimally-invasive-treatments/botulin-toxin-injection"
                          className="home-discovery-card"
                          aria-label="Explore Botulin Toxin Injection"
                        >
                          <span className="home-discovery-card-icon" aria-hidden="true">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M12 20.2c4.2 0 7.6-3.4 7.6-7.6S16.2 5 12 5 4.4 8.4 4.4 12.6s3.4 7.6 7.6 7.6Z"
                                stroke="currentColor"
                                strokeWidth="1.6"
                              />
                              <path
                                d="M9.1 11.3h.01M14.9 11.3h.01"
                                stroke="currentColor"
                                strokeWidth="2.2"
                                strokeLinecap="round"
                              />
                              <path
                                d="M9.2 15.2c.8.7 1.8 1.1 2.8 1.1s2-.4 2.8-1.1"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                              />
                            </svg>
                          </span>
                          <h3 className="home-discovery-card-title">Botulin Toxin Injection</h3>
                          <p className="home-discovery-card-body">
                            Targeted injections used to reduce muscle spasm and pain in selected indications.
                          </p>
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div className="home-discovery-controls" aria-label="Carousel controls">
                    <div className="home-discovery-arrows" aria-hidden="true">
                      <div className="home-discovery-arrow-set home-discovery-arrow-set-1">
                        <label className="home-discovery-arrow" htmlFor="home-discovery-11">‹</label>
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
                        <label className="home-discovery-arrow" htmlFor="home-discovery-7">›</label>
                      </div>
                      <div className="home-discovery-arrow-set home-discovery-arrow-set-7">
                        <label className="home-discovery-arrow" htmlFor="home-discovery-6">‹</label>
                        <label className="home-discovery-arrow" htmlFor="home-discovery-8">›</label>
                      </div>
                      <div className="home-discovery-arrow-set home-discovery-arrow-set-8">
                        <label className="home-discovery-arrow" htmlFor="home-discovery-7">‹</label>
                        <label className="home-discovery-arrow" htmlFor="home-discovery-9">›</label>
                      </div>
                      <div className="home-discovery-arrow-set home-discovery-arrow-set-9">
                        <label className="home-discovery-arrow" htmlFor="home-discovery-8">‹</label>
                        <label className="home-discovery-arrow" htmlFor="home-discovery-10">›</label>
                      </div>
                      <div className="home-discovery-arrow-set home-discovery-arrow-set-10">
                        <label className="home-discovery-arrow" htmlFor="home-discovery-9">‹</label>
                        <label className="home-discovery-arrow" htmlFor="home-discovery-11">›</label>
                      </div>
                      <div className="home-discovery-arrow-set home-discovery-arrow-set-11">
                        <label className="home-discovery-arrow" htmlFor="home-discovery-10">‹</label>
                        <label className="home-discovery-arrow" htmlFor="home-discovery-1">›</label>
                      </div>
                    </div>

                    <div className="home-discovery-dots" aria-label="Choose a treatment">
                      <label className="home-discovery-dot" htmlFor="home-discovery-1" aria-label="Vertebroplasty" />
                      <label className="home-discovery-dot" htmlFor="home-discovery-2" aria-label="Radiofrequency" />
                      <label className="home-discovery-dot" htmlFor="home-discovery-3" aria-label="Interspinous Spacers" />
                      <label className="home-discovery-dot" htmlFor="home-discovery-4" aria-label="Peripheral Nerve Block" />
                      <label
                        className="home-discovery-dot"
                        htmlFor="home-discovery-5"
                        aria-label="Intra-articular Corticosteroids Injection"
                      />
                      <label className="home-discovery-dot" htmlFor="home-discovery-6" aria-label="Calcification Barbotage" />
                      <label className="home-discovery-dot" htmlFor="home-discovery-7" aria-label="Cryoblation" />
                      <label className="home-discovery-dot" htmlFor="home-discovery-8" aria-label="Nucleoplasty" />
                      <label className="home-discovery-dot" htmlFor="home-discovery-9" aria-label="Platelets Rich Plasma Injection" />
                      <label className="home-discovery-dot" htmlFor="home-discovery-10" aria-label="Hydrodistention" />
                      <label className="home-discovery-dot" htmlFor="home-discovery-11" aria-label="Botulin Toxin Injection" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="page-section treatments-highlighted treatments-highlighted-mi">
            <header className="home-section-treatment-header treatments-section-header">
              <div className="home-section-treatment-header-content">
                <p className="home-section-treatment-eyebrow">Minimally invasive</p>
                <h2 className="home-section-treatment-title">
                  Highlighted minimally invasive treatments
                </h2>
              </div>
            </header>
            <div className="treatments-highlighted-grid">
              {minimallyInvasiveTreatments.map((item, index) => (
                <TreatmentCard key={index} item={item} />
              ))}
            </div>
          </section>
        </>
      )}
      {!hideNonInvasive && (
        <>
          <section className="page-section treatments-feature treatments-feature-ni">
            <header className="home-section-treatment-header treatments-section-header">
              <div className="home-section-treatment-header-content">
                <p className="home-section-treatment-eyebrow home-stories-eyebrow">Non‑invasive</p>
                <h2 className="home-section-treatment-title home-stories-title">
                   Non‑invasive treatments</h2>
                <p className="home-section-treatment-subtitle">
                  Explore non‑invasive options that focus on assessment, movement and lifestyle before
                  considering procedures or surgery.
                </p>
              </div>
            </header>
            <div className="treatments-feature-inner">
              <div className="treatments-feature-copy">
                <h3 className="treatments-feature-title">Non‑invasive treatments</h3>
                <div className="treatments-feature-accent treatments-feature-accent-ni" />
                <p className="treatments-feature-body">
                  Non‑invasive options focus on assessment and treatment without breaking the skin or
                  entering the body—ideal for many conditions and for building a conservative plan.
                </p>
                <p className="treatments-feature-body">
                  These approaches help reduce risk and recovery time while providing meaningful relief
                  and functional improvement.
                </p>
                <Link
                  to="/treatments/non-invasive-treatments/physiotherapy"
                  className="treatment-card-button"
                  aria-label="See all non-invasive treatments"
                >
                  <span>All non‑invasive treatments</span>
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


            <section className="home-section-discovery" aria-labelledby="treatments-discovery-mi-title">
            <div className="home-section-discovery-inner">
              <div className="home-discovery-layout">
                <header className="home-discovery-header">
                  <h2 id="treatments-discovery-mi-title" className="home-discovery-title">
                    Non-invasive Procedures
                  </h2>
                  <p className="home-discovery-subtitle">
                    Browse supportive treatment options that can be combined with minimally invasive procedures.
                  </p>
                </header>

                <div
                  className="home-discovery-carousel"
                  role="region"
                  aria-roledescription="carousel"
                  aria-label="Minimally invasive treatment support carousel"
                >
                  <input
                    className="home-discovery-radio"
                    type="radio"
                    name="treatments-discovery-mi"
                    id="mi-discovery-1"
                    defaultChecked
                  />
                  <input className="home-discovery-radio" type="radio" name="treatments-discovery-mi" id="mi-discovery-2" />
                  <input className="home-discovery-radio" type="radio" name="treatments-discovery-mi" id="mi-discovery-3" />
                  <input className="home-discovery-radio" type="radio" name="treatments-discovery-mi" id="mi-discovery-4" />
                  <input className="home-discovery-radio" type="radio" name="treatments-discovery-mi" id="mi-discovery-5" />
                  <input className="home-discovery-radio" type="radio" name="treatments-discovery-mi" id="mi-discovery-6" />
                  <input className="home-discovery-radio" type="radio" name="treatments-discovery-mi" id="mi-discovery-7" />
                  <input className="home-discovery-radio" type="radio" name="treatments-discovery-mi" id="mi-discovery-8" />
                  <input className="home-discovery-radio" type="radio" name="treatments-discovery-mi" id="mi-discovery-9" />
                  <input className="home-discovery-radio" type="radio" name="treatments-discovery-mi" id="mi-discovery-10" />

                  <div
                    className="home-discovery-viewport"
                  >
                    <ul className="home-discovery-track" role="list">
                      <li className="home-discovery-slide" role="listitem">
                        <Link
                          to="/treatments/non-invasive-treatments/pharmacological-pain-management"
                          className="home-discovery-card"
                          aria-label="Explore Pharmacological Pain Management"
                        >
                          <span className="home-discovery-card-icon" aria-hidden="true">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M12 4.5c3 0 5.5 2.5 5.5 5.6 0 2.4-1.5 4.4-3.6 5.2-.7 1.7-2.2 3.2-4 4.2-1.8-1-3.3-2.5-4-4.2-2.1-.8-3.6-2.8-3.6-5.2C2.3 7 5 4.5 8 4.5"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinejoin="round"
                              />
                              <path d="M8.9 10.4h6.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                            </svg>
                          </span>
                          <h3 className="home-discovery-card-title">Pharmacological Pain Management</h3>
                          <p className="home-discovery-card-body">
                            Medication strategies tailored to your symptoms, health profile, and goals.
                          </p>
                        </Link>
                      </li>

                      <li className="home-discovery-slide" role="listitem">
                        <Link
                          to="/treatments/non-invasive-treatments/physiotherapy"
                          className="home-discovery-card"
                          aria-label="Explore Physiotherapy"
                        >
                          <span className="home-discovery-card-icon" aria-hidden="true">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M10 4.5c.7-1 1.6-1.5 2-1.5s1.3.5 2 1.5v4.2c0 .8-.4 1.6-1 2.1l-1 .9-1-.9c-.6-.5-1-1.3-1-2.1V4.5Z"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M8.5 12.5h7M9 15.5h6M10 18.5h4"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                              />
                            </svg>
                          </span>
                          <h3 className="home-discovery-card-title">Physiotherapy</h3>
                          <p className="home-discovery-card-body">
                            Targeted movement and strengthening programmes to improve function and confidence.
                          </p>
                        </Link>
                      </li>

                      <li className="home-discovery-slide" role="listitem">
                        <Link
                          to="/treatments/non-invasive-treatments/osteopathy"
                          className="home-discovery-card"
                          aria-label="Explore Osteopathy"
                        >
                          <span className="home-discovery-card-icon" aria-hidden="true">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M9 3.8h6M9 7.2h6M9 10.6h6M9 14h6M10.2 17.4h3.6"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                              />
                            </svg>
                          </span>
                          <h3 className="home-discovery-card-title">Osteopathy</h3>
                          <p className="home-discovery-card-body">
                            Hands-on care focused on restoring mobility and reducing pain in muscles and joints.
                          </p>
                        </Link>
                      </li>

                      <li className="home-discovery-slide" role="listitem">
                        <Link
                          to="/treatments/non-invasive-treatments/occupation-therapy"
                          className="home-discovery-card"
                          aria-label="Explore Occupation Therapy"
                        >
                          <span className="home-discovery-card-icon" aria-hidden="true">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M7.2 13.4c0-2.6 2.1-4.7 4.8-4.7h.2c2.6 0 4.8 2.1 4.8 4.7v5.1H7.2v-5.1Z"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinejoin="round"
                              />
                              <path d="M12 5.5v3.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                            </svg>
                          </span>
                          <h3 className="home-discovery-card-title">Occupation Therapy</h3>
                          <p className="home-discovery-card-body">
                            Practical strategies, adaptations, and training to support daily activities.
                          </p>
                        </Link>
                      </li>

                      <li className="home-discovery-slide" role="listitem">
                        <Link
                          to="/treatments/non-invasive-treatments/speech-therapy"
                          className="home-discovery-card"
                          aria-label="Explore Speech Therapy"
                        >
                          <span className="home-discovery-card-icon" aria-hidden="true">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M8.3 12.2v-5.1c0-.7.5-1.2 1.2-1.2s1.2.5 1.2 1.2v4.2"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M10.7 11.3V6.6c0-.7.5-1.2 1.2-1.2s1.2.5 1.2 1.2v4.7"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M13.1 11.5V7.2c0-.7.5-1.2 1.2-1.2s1.2.5 1.2 1.2v6.6c0 2.7-1.6 4.8-4.6 4.8-2.7 0-4.1-1.5-4.6-3.3"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                              />
                            </svg>
                          </span>
                          <h3 className="home-discovery-card-title">Speech Therapy</h3>
                          <p className="home-discovery-card-body">
                            Therapy focused on communication, swallowing, and related functional goals.
                          </p>
                        </Link>
                      </li>

                      <li className="home-discovery-slide" role="listitem">
                        <Link
                          to="/treatments/non-invasive-treatments/psychology"
                          className="home-discovery-card"
                          aria-label="Explore Psychology"
                        >
                          <span className="home-discovery-card-icon" aria-hidden="true">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M10 4.5c.6 2 .5 3.9-.3 5.7l-1.2 2.6c-.3.7.2 1.5 1 1.5h2.4"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                              />
                              <path
                                d="M14 4.5c-.6 2-.5 3.9.3 5.7l1.2 2.6c.3.7-.2 1.5-1 1.5h-2.4"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                              />
                              <path
                                d="M9.2 18.7c0-1.6 1.3-2.9 2.8-2.9s2.8 1.3 2.8 2.9"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                              />
                            </svg>
                          </span>
                          <h3 className="home-discovery-card-title">Psychology</h3>
                          <p className="home-discovery-card-body">
                            Tools to manage pain-related stress, sleep disruption, and coping strategies.
                          </p>
                        </Link>
                      </li>

                      <li className="home-discovery-slide" role="listitem">
                        <Link to="/treatments/non-invasive-treatments/nutrition" className="home-discovery-card" aria-label="Explore Nutrition">
                          <span className="home-discovery-card-icon" aria-hidden="true">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M9.2 4.5c1.8 2.5 1.8 6.2 0 8.7-1.3 1.8-1.2 4.4.2 6.3"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                              />
                              <path
                                d="M14.8 4.5c-1.8 2.5-1.8 6.2 0 8.7 1.3 1.8 1.2 4.4-.2 6.3"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                              />
                              <path d="M9.6 12.2h4.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                            </svg>
                          </span>
                          <h3 className="home-discovery-card-title">Nutrition</h3>
                          <p className="home-discovery-card-body">
                            Nutritional guidance to support recovery, energy, and long-term health.
                          </p>
                        </Link>
                      </li>

                      <li className="home-discovery-slide" role="listitem">
                        <Link
                          to="/treatments/non-invasive-treatments/exercise"
                          className="home-discovery-card"
                          aria-label="Explore Exercise"
                        >
                          <span className="home-discovery-card-icon" aria-hidden="true">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M7.5 5.5c0 3.3-2 4.8-2 7.4 0 4.3 3.1 7.1 6.5 7.1"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                              />
                              <path
                                d="M16.5 5.5c0 3.3 2 4.8 2 7.4 0 4.3-3.1 7.1-6.5 7.1"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                              />
                              <path
                                d="M8.8 11.2h6.4M8.4 14.2h7.2"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                              />
                            </svg>
                          </span>
                          <h3 className="home-discovery-card-title">Exercise</h3>
                          <p className="home-discovery-card-body">
                            Structured activity plans to improve mobility, resilience, and pain control.
                          </p>
                        </Link>
                      </li>

                      <li className="home-discovery-slide" role="listitem">
                        <Link
                          to="/treatments/non-invasive-treatments/podology"
                          className="home-discovery-card"
                          aria-label="Explore Podology"
                        >
                          <span className="home-discovery-card-icon" aria-hidden="true">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M8.3 5.2c-1.2 1.6-1.8 3.5-1.8 5.5 0 5 3.5 9.1 5.5 9.1s5.5-4.1 5.5-9.1c0-2-.6-3.9-1.8-5.5"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M9.2 11.2h5.6M9.8 14.3h4.4"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                              />
                            </svg>
                          </span>
                          <h3 className="home-discovery-card-title">Podology</h3>
                          <p className="home-discovery-card-body">
                            Foot and gait assessment to reduce overload and improve comfort during movement.
                          </p>
                        </Link>
                      </li>

                      <li className="home-discovery-slide" role="listitem">
                        <Link
                          to="/treatments/non-invasive-treatments/home-care"
                          className="home-discovery-card"
                          aria-label="Explore Home Care"
                        >
                          <span className="home-discovery-card-icon" aria-hidden="true">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M8 5.5c0 4.2-2.5 4.6-2.5 8.1 0 3.2 2.3 5.4 6.5 5.4s6.5-2.2 6.5-5.4C18.5 10.1 16 9.7 16 5.5"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinejoin="round"
                              />
                              <path d="M9.3 12.2h5.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                            </svg>
                          </span>
                          <h3 className="home-discovery-card-title">Home Care</h3>
                          <p className="home-discovery-card-body">
                            At-home support plans that help maintain progress between appointments.
                          </p>
                        </Link>
                      </li>

                    </ul>
                  </div>

                  <div className="home-discovery-controls" aria-label="Carousel controls">
                    <div className="home-discovery-arrows" aria-hidden="true">
                      <div className="home-discovery-arrow-set home-discovery-arrow-set-1">
                        <label className="home-discovery-arrow" htmlFor="mi-discovery-10">‹</label>
                        <label className="home-discovery-arrow" htmlFor="mi-discovery-2">›</label>
                      </div>
                      <div className="home-discovery-arrow-set home-discovery-arrow-set-2">
                        <label className="home-discovery-arrow" htmlFor="mi-discovery-1">‹</label>
                        <label className="home-discovery-arrow" htmlFor="mi-discovery-3">›</label>
                      </div>
                      <div className="home-discovery-arrow-set home-discovery-arrow-set-3">
                        <label className="home-discovery-arrow" htmlFor="mi-discovery-2">‹</label>
                        <label className="home-discovery-arrow" htmlFor="mi-discovery-4">›</label>
                      </div>
                      <div className="home-discovery-arrow-set home-discovery-arrow-set-4">
                        <label className="home-discovery-arrow" htmlFor="mi-discovery-3">‹</label>
                        <label className="home-discovery-arrow" htmlFor="mi-discovery-5">›</label>
                      </div>
                      <div className="home-discovery-arrow-set home-discovery-arrow-set-5">
                        <label className="home-discovery-arrow" htmlFor="mi-discovery-4">‹</label>
                        <label className="home-discovery-arrow" htmlFor="mi-discovery-6">›</label>
                      </div>
                      <div className="home-discovery-arrow-set home-discovery-arrow-set-6">
                        <label className="home-discovery-arrow" htmlFor="mi-discovery-5">‹</label>
                        <label className="home-discovery-arrow" htmlFor="mi-discovery-7">›</label>
                      </div>
                      <div className="home-discovery-arrow-set home-discovery-arrow-set-7">
                        <label className="home-discovery-arrow" htmlFor="mi-discovery-6">‹</label>
                        <label className="home-discovery-arrow" htmlFor="mi-discovery-8">›</label>
                      </div>
                      <div className="home-discovery-arrow-set home-discovery-arrow-set-8">
                        <label className="home-discovery-arrow" htmlFor="mi-discovery-7">‹</label>
                        <label className="home-discovery-arrow" htmlFor="mi-discovery-9">›</label>
                      </div>
                      <div className="home-discovery-arrow-set home-discovery-arrow-set-9">
                        <label className="home-discovery-arrow" htmlFor="mi-discovery-8">‹</label>
                        <label className="home-discovery-arrow" htmlFor="mi-discovery-10">›</label>
                      </div>
                      <div className="home-discovery-arrow-set home-discovery-arrow-set-10">
                        <label className="home-discovery-arrow" htmlFor="mi-discovery-9">‹</label>
                        <label className="home-discovery-arrow" htmlFor="mi-discovery-1">›</label>
                      </div>
                    </div>

                    <div className="home-discovery-dots" aria-label="Choose a treatment option">
                      <label className="home-discovery-dot" htmlFor="mi-discovery-1" aria-label="Pharmacological Pain Management" />
                      <label className="home-discovery-dot" htmlFor="mi-discovery-2" aria-label="Physiotherapy" />
                      <label className="home-discovery-dot" htmlFor="mi-discovery-3" aria-label="Osteopathy" />
                      <label className="home-discovery-dot" htmlFor="mi-discovery-4" aria-label="Occupation Therapy" />
                      <label className="home-discovery-dot" htmlFor="mi-discovery-5" aria-label="Speech Therapy" />
                      <label className="home-discovery-dot" htmlFor="mi-discovery-6" aria-label="Psychology" />
                      <label className="home-discovery-dot" htmlFor="mi-discovery-7" aria-label="Nutrition" />
                      <label className="home-discovery-dot" htmlFor="mi-discovery-8" aria-label="Exercise" />
                      <label className="home-discovery-dot" htmlFor="mi-discovery-9" aria-label="Podology" />
                      <label className="home-discovery-dot" htmlFor="mi-discovery-10" aria-label="Home Care" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>


          <section className="page-section treatments-highlighted treatments-highlighted-ni">
            <header className="home-section-treatment-header treatments-section-header">
              <div className="home-section-treatment-header-content">
                <p className="home-section-treatment-eyebrow">Non‑invasive</p>
                <h2 className="home-section-treatment-title">Highlighted non‑invasive treatments</h2>
              </div>
            </header>
            <div className="treatments-highlighted-grid">
              {nonInvasiveTreatments.map((item, index) => (
                <TreatmentCard key={index} item={item} />
              ))}
            </div>
          </section>
        </>
      )}
      <section 
        className="page-section treatments-testimonials"
        aria-label="Patient testimonials"
      >
        <header className="treatments-testimonials-header">
          <h2 className="treatments-testimonials-title">Your opinion makes a difference</h2>
        </header>
        
        <div className="treatments-testimonials-carousel-wrapper">
          <div 
            className={`treatments-testimonials-grid ${isDragging ? 'is-dragging' : ''}`}
            ref={carouselRef}
            role="list"
            aria-label="Patient testimonials"
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            {testimonials.map((testimonial, index) => (
              <article 
                className="testimonial-card" 
                key={`${testimonial.name}-${index}`}
                role="listitem"
              >
                <div className="treatments-testimonial-top">
                  <div className="treatments-testimonial-avatar" data-image="true">
                    <img
                      src={testimonial.avatarSrc}
                      alt={`${testimonial.name} avatar`}
                      width="34"
                      height="34"
                      sizes="34px"
                      loading="lazy"
                      decoding="async"
                      fetchPriority="low"
                      onError={(e) => {
                        const img = e.currentTarget;
                        const wrap = img.closest('.treatments-testimonial-avatar');
                        if (wrap) wrap.dataset.image = 'false';
                      }}
                    />
                    <span className="treatments-testimonial-avatar-initials" aria-hidden="true">
                      {testimonial.initials}
                    </span>
                  </div>
                  <div className="treatments-testimonial-identity">
                    <div className="treatments-testimonial-name">{testimonial.name}</div>
                    <div className="treatments-testimonial-location">{testimonial.location}</div>
                  </div>
                </div>

                <div className="treatments-testimonial-quote">
                  <span className="treatments-testimonial-quote-icon treatments-testimonial-quote-icon-start" aria-hidden="true">
                    “
                  </span>
                  <p className="treatments-testimonial-quote-text">{testimonial.quote}</p>
                  <span className="treatments-testimonial-quote-icon treatments-testimonial-quote-icon-end" aria-hidden="true">
                    ”
                  </span>
                </div>

                <div className="treatments-testimonial-service">{testimonial.service}</div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="home-section-location" aria-labelledby="treatments-location-title">
        <div className="home-section-location-inner">
          <header className="location-header">
            <h2 className="location-title" id="treatments-location-title">
              Our Location
            </h2>
            <div className="location-title-rule" aria-hidden="true" />
          </header>

          <div className="location-grid">
            <div className="location-details" aria-label="Address and opening hours">
              <address className="location-address">
                Av. do Mar
                <br />
                8135-107, Portugal
              </address>

              <a className="location-phone" href="tel:+351915915001" aria-label="Call +351 915 915 001">
                <span className="location-phone-text">+351 915 915 001</span>
              </a>

              <div className="location-hours" aria-label="Hours of operation">
                <div className="location-hours-title">Hours of Operation:</div>
                <div className="location-hours-list" role="list">
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => (
                    <div className="location-hours-row" role="listitem" key={day}>
                      <span className="location-hours-day">{day}</span>
                      <span className="location-hours-time">09:00 - 18:00</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                to="/contact"
                className="navbar-cta navbar-cta-desktop navbar-cta-dark location-book-cta"
                aria-label="Book now"
              >
                <span>Book Now</span>
                <span className="navbar-cta-icon" aria-hidden="true">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </span>
              </Link>
            </div>

            <div className="location-map" aria-label="Map">
              <iframe
                ref={contactMapIframeRef}
                className="location-map-iframe"
                title="Business location map"
                data-src="https://www.google.com/maps?q=Av.+do+Mar+8135-107+Portugal&z=16&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>
      {currentTreatmentIndex !== -1 && (previousTreatment || nextTreatment) && (
        <section className="article-navigation-container" aria-label="Treatment navigation">
          {previousTreatment && (
            <div className="article-nav-item prev" onClick={() => navigate(previousTreatment.to)}>
              <div className="article-nav-content">
                <span className="article-nav-label">Previous Treatment</span>
                <h2 className="article-nav-title">
                  <span className="arrow">←</span> {previousTreatment.title}
                </h2>
              </div>
            </div>
          )}
          {nextTreatment && (
            <div className="article-nav-item next" onClick={() => navigate(nextTreatment.to)}>
              <div className="article-nav-content">
                <span className="article-nav-label">Next Treatment</span>
                <h2 className="article-nav-title">
                  {nextTreatment.title} <span className="arrow">→</span>
                </h2>
              </div>
            </div>
          )}
        </section>
      )}
    </main>
  );
}

export default function Treatments() {
  return (
    <div className="psx-page" id="psx-treatments">
      <header className="psx-hero">
        <div className="psx-hero-backdrop" aria-hidden="true" />
        <div className="psx-hero-inner">
          <p className="psx-hero-eyebrow">Treatments</p>
          <h1 className="psx-hero-title">Treatments</h1>
          <p className="psx-hero-subtitle">
            We have the most outstanding treatments performed in the world’s leading pain centers,
            from peripheral nerve blocks to cryoablation and radiofrequency.
          </p>
          <div className="psx-hero-actions">
            <Link
              to="/contact"
              className="psx-btn-primary"
              aria-label="Book an appointment about treatments"
            >
              <span>Book an appointment</span>
            </Link>
            <a href="#treatments" className="psx-btn-outline" aria-label="Explore treatments">
              Explore treatments
            </a>
          </div>
        </div>
      </header>
      <div id="treatments">
        <TreatmentsMain />
      </div>
    </div>
  );
}
