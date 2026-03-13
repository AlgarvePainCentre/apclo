import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import '../home/Home.css';
import './Treatments.css';

export function TreatmentsMain({
  hideMinimallyInvasive = false,
  hideNonInvasive = false,
  hideSurgical = false,
}) {
  const carouselRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Scroll listener to update active slide state
  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      const handleScroll = () => {
        // Debounce or check if dragging to avoid jitter if needed, 
        // but updating active slide during drag is fine for indicators
        const scrollPosition = carousel.scrollLeft;
        let newActiveSlide = 0;
        let minDiff = Infinity;

        Array.from(carousel.children).forEach((child, index) => {
          const diff = Math.abs(child.offsetLeft - scrollPosition);
          if (diff < minDiff) {
            minDiff = diff;
            newActiveSlide = index;
          }
        });
        
        if (newActiveSlide !== activeSlide) {
          setActiveSlide(newActiveSlide);
        }
      };
      
      carousel.addEventListener('scroll', handleScroll, { passive: true });
      return () => {
        carousel.removeEventListener('scroll', handleScroll);
      };
    }
  }, [activeSlide]);

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

  const scrollToSlide = (index) => {
    const carousel = carouselRef.current;
    if (carousel) {
      const card = carousel.children[index];
      if (card) {
        card.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  };



  const testimonials = [
    {
      quote: "“The staff are professional, kind and attentive. From the first consultation through follow‑up, I always felt listened to and supported.”",
      initial: "C",
      name: "Celeste Cutting",
      location: "United Kingdom"
    },
    {
      quote: "“Within a few weeks my pain was noticeably better. The team explained every option clearly so I could choose what felt right for me.”",
      initial: "G",
      name: "Gerald Kraftman",
      location: "Poland"
    },
    {
      quote: "“I am grateful for the calm, coordinated care I received. My mobility and confidence have improved more than I expected.”",
      initial: "J",
      name: "Jean‑François Cristau",
      location: "France"
    },
    {
      quote: "“The staff are professional, kind and attentive. From the first consultation through follow‑up, I always felt listened to and supported.”",
      initial: "C",
      name: "Celeste Cutting",
      location: "United Kingdom"
    },
    {
      quote: "“Within a few weeks my pain was noticeably better. The team explained every option clearly so I could choose what felt right for me.”",
      initial: "G",
      name: "Gerald Kraftman",
      location: "Poland"
    },
    {
      quote: "“I am grateful for the calm, coordinated care I received. My mobility and confidence have improved more than I expected.”",
      initial: "J",
      name: "Jean‑François Cristau",
      location: "France"
    }
  ];

  const handlePrev = () => {
    const newIndex = activeSlide === 0 ? testimonials.length - 1 : activeSlide - 1;
    scrollToSlide(newIndex);
  };

  const handleNext = () => {
    const newIndex = activeSlide === testimonials.length - 1 ? 0 : activeSlide + 1;
    scrollToSlide(newIndex);
  };

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
                <p className="home-section-treatment-eyebrow">Clinically-led care plans</p>
                <h2 className="home-section-treatment-title">
                  We can help you at every level of your health journey
                </h2>
                <p className="home-section-treatment-subtitle">
                  We practice a wide variety of non‑invasive, minimally invasive and surgical treatments
                  in line with internationally leading clinics, so your plan is individually tailored.
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
                <p className="home-section-treatment-eyebrow">Minimally invasive</p>
                <h2 className="home-section-treatment-title">Minimally invasive treatments</h2>
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
                <p className="home-section-treatment-eyebrow">Non‑invasive</p>
                <h2 className="home-section-treatment-title">Non‑invasive treatments</h2>
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
      <section className="page-section home-section-mainpain-cards treatments-pain-learn">
        <div className="home-section-mainpain-inner">
          <header className="home-section-treatment-header home-section-mainpain-header treatments-section-header">
            <div className="home-section-treatment-header-content">
              <p className="home-section-treatment-eyebrow">Main pain areas</p>
              <h2 className="home-section-treatment-title">Learn More About Your Pain</h2>
              <p className="home-section-treatment-subtitle">Meet your medical needs and improve your life.</p>
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
                  Ease persistent spine pain with a plan designed to protect your mobility.
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
                  Support unstable or aching knees so you can walk, climb and move confidently.
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
                  Reduce hip stiffness and pain to sit, stand and stay active more comfortably.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>
      <section 
        className="page-section treatments-testimonials"
        aria-roledescription="carousel"
        aria-label="Patient Testimonials"
      >
        <header className="home-section-treatment-header treatments-section-header">
          <div className="home-section-treatment-header-content">
            <p className="home-section-treatment-eyebrow">Testimonials</p>
            <h2 className="home-section-treatment-title">Your opinion makes the difference</h2>
          </div>
        </header>
        
        <div className="treatments-testimonials-carousel-wrapper">
          <div 
            className={`treatments-testimonials-grid ${isDragging ? 'is-dragging' : ''}`}
            ref={carouselRef}
            role="group" 
            aria-live="polite"
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            {testimonials.map((testimonial, index) => (
              <article 
                className="testimonial-card" 
                key={index}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${testimonials.length}`}
              >
                <p className="testimonial-quote">{testimonial.quote}</p>
                <div className="testimonial-person">
                  <div className="testimonial-avatar" aria-hidden="true">{testimonial.initial}</div>
                  <div className="testimonial-meta">
                    <div className="testimonial-name">{testimonial.name}</div>
                    <div className="testimonial-location">{testimonial.location}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="carousel-controls">
            <button 
              className="carousel-nav-btn prev" 
              onClick={handlePrev} 
              aria-label="Previous testimonial"
            >
              ←
            </button>
            
            <div className="carousel-dots">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`carousel-dot ${activeSlide === index ? 'active' : ''}`}
                  onClick={() => scrollToSlide(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                  aria-current={activeSlide === index}
                />
              ))}
            </div>

            <button 
              className="carousel-nav-btn next" 
              onClick={handleNext} 
              aria-label="Next testimonial"
            >
              →
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

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
      <TreatmentsMain />
      <Footer />
    </div>
  );
}
