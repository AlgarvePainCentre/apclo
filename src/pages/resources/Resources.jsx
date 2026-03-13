import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import '../home/Home.css';
import './Resources.css';

export default function Resources() {
  const heroRef = useRef(null);
  const heroVideoRef = useRef(null);
  const tipsCarouselRef = useRef(null);
  const navigate = useNavigate();
  const [downloadStatus, setDownloadStatus] = useState('idle'); // idle, downloading, success, error
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [tipsActiveSlide, setTipsActiveSlide] = useState(0);
  const [tipsIsDragging, setTipsIsDragging] = useState(false);
  const [tipsStartX, setTipsStartX] = useState(0);
  const [tipsScrollLeft, setTipsScrollLeft] = useState(0);
  const [isTipsCarouselMobile, setIsTipsCarouselMobile] = useState(false);

  // Email Gating State
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false);
  const [honeypot, setHoneypot] = useState(''); // Anti-spam honeypot

  useEffect(() => {
    // Check if user has already unlocked the resource
    const isUnlocked = localStorage.getItem('spine_guide_unlocked');
    if (isUnlocked === 'true') {
      setIsEmailVerified(true);
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const sync = () => setIsTipsCarouselMobile(mediaQuery.matches);

    sync();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', sync);
      return () => mediaQuery.removeEventListener('change', sync);
    }

    mediaQuery.addListener(sync);
    return () => mediaQuery.removeListener(sync);
  }, []);

  useEffect(() => {
    if (!isTipsCarouselMobile) {
      setTipsActiveSlide(0);
      setTipsIsDragging(false);
      return;
    }

    const carousel = tipsCarouselRef.current;
    if (!carousel) return;

    const handleScroll = () => {
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

      setTipsActiveSlide(newActiveSlide);
    };

    carousel.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      carousel.removeEventListener('scroll', handleScroll);
    };
  }, [isTipsCarouselMobile]);

  const scrollToTip = (index) => {
    if (!isTipsCarouselMobile) return;
    const carousel = tipsCarouselRef.current;
    if (!carousel) return;
    const card = carousel.children[index];
    if (!card) return;
    card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
  };

  const getTipsCount = () => tipsCarouselRef.current?.children?.length ?? 0;

  const handleTipsPrev = () => {
    if (!isTipsCarouselMobile) return;
    const count = getTipsCount();
    if (!count) return;
    scrollToTip(Math.max(0, tipsActiveSlide - 1));
  };

  const handleTipsNext = () => {
    if (!isTipsCarouselMobile) return;
    const count = getTipsCount();
    if (!count) return;
    scrollToTip(Math.min(count - 1, tipsActiveSlide + 1));
  };

  const handleTipsMouseDown = (e) => {
    if (!isTipsCarouselMobile) return;
    const carousel = tipsCarouselRef.current;
    if (!carousel) return;
    setTipsIsDragging(true);
    setTipsStartX(e.pageX - carousel.offsetLeft);
    setTipsScrollLeft(carousel.scrollLeft);
  };

  const handleTipsMouseLeave = () => setTipsIsDragging(false);
  const handleTipsMouseUp = () => setTipsIsDragging(false);

  const handleTipsMouseMove = (e) => {
    if (!isTipsCarouselMobile) return;
    const carousel = tipsCarouselRef.current;
    if (!carousel || !tipsIsDragging) return;
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - tipsStartX) * 1.8;
    carousel.scrollLeft = tipsScrollLeft - walk;
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.trim());
  };

  const handleEmailChange = (e) => {
    const next = e.target.value.slice(0, 254);
    setEmail(next);
    if (emailError) setEmailError('');
  };

  const checkRateLimit = () => {
    try {
      const attempts = JSON.parse(localStorage.getItem('email_attempts') || '[]');
      const now = Date.now();
      const recentAttempts = attempts.filter((time) => now - time < 60000); // Last 1 minute

      if (recentAttempts.length >= 5) {
        return false;
      }

      recentAttempts.push(now);
      localStorage.setItem('email_attempts', JSON.stringify(recentAttempts));
      return true;
    } catch {
      return true;
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    
    // Honeypot check
    if (honeypot) {
      return;
    }

    const trimmedEmail = email.trim();
    if (!validateEmail(trimmedEmail)) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    if (!checkRateLimit()) {
      setEmailError('Too many attempts. Please try again later.');
      return;
    }
    
    setIsSubmittingEmail(true);
    setEmailError('');

    // Simulate backend API call
    try {
      // Mock network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success
      setIsEmailVerified(true);
      localStorage.setItem('spine_guide_unlocked', 'true');
    } catch (err) {
      setEmailError('Something went wrong. Please try again.');
    } finally {
      setIsSubmittingEmail(false);
    }
  };

  const handleDownload = async () => {
    try {
      setDownloadStatus('downloading');
      setDownloadProgress(0);
      
      const response = await fetch('/assets/Daily-Habits-Spine-ebook.pdf');
      if (!response.ok) throw new Error('Download failed');
      
      const contentLength = response.headers.get('content-length');
      const total = contentLength ? parseInt(contentLength, 10) : 0;
      
      if (!response.body) throw new Error('ReadableStream not supported');
      
      const reader = response.body.getReader();
      let receivedLength = 0;
      const chunks = [];
      
      while(true) {
        const {done, value} = await reader.read();
        if (done) break;
        
        chunks.push(value);
        receivedLength += value.length;
        
        if (total > 0) {
          setDownloadProgress(Math.round((receivedLength / total) * 100));
        }
      }
      
      const blob = new Blob(chunks, { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'Daily-Habits-Spine-ebook.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      setDownloadStatus('success');
      setTimeout(() => setDownloadStatus('idle'), 3000);
      
    } catch (error) {
      console.error('Download error:', error);
      setDownloadStatus('error');
      setTimeout(() => setDownloadStatus('idle'), 3000);
    }
  };

  useEffect(() => {
    // SEO
    document.title = 'Resources | Algarve Pain Centre';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.content = 'Explore practical advice, expert insights, and real patient stories about pain management and recovery at Algarve Pain Centre.';
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Explore practical advice, expert insights, and real patient stories about pain management and recovery at Algarve Pain Centre.';
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

        <section className="page-section tips-carousel-section" id="tips-for-self-care">
          <div className="tips-carousel-header">
            <div className="tips-carousel-copy">
              <span className="tips-carousel-eyebrow">Self-Care</span>
              <h2>Tips for Self-Care</h2>
              <p>Simple daily habits to reduce flare-ups, build resilience, and support your recovery.</p>
            </div>
          </div>

          {isTipsCarouselMobile ? (
            <>
              <div className="tips-carousel-stage">
                <div
                  className={`tips-grid tips-carousel ${tipsIsDragging ? 'is-dragging' : ''}`}
                  ref={tipsCarouselRef}
                  role="region"
                  aria-label="Self-care tips"
                  onMouseDown={handleTipsMouseDown}
                  onMouseLeave={handleTipsMouseLeave}
                  onMouseUp={handleTipsMouseUp}
                  onMouseMove={handleTipsMouseMove}
                >
                  <div
                    className="tip-card"
                    role="button"
                    tabIndex={0}
                    aria-label="Daily Stretching tip"
                    style={{
                      backgroundImage: `url('/assets/images/resources/Cervical-Card-3.jpg')`,
                    }}
                  >
                    <div className="article-nav-content">
                      <span className="article-nav-label">Self-care</span>
                      <h3 className="article-nav-title">
                        Daily Stretching
                        <span className="arrow">→</span>
                      </h3>
                    </div>
                  </div>
                  <div
                    className="tip-card"
                    role="button"
                    tabIndex={0}
                    aria-label="Hydration tip"
                    style={{
                      backgroundImage: `url('/assets/images/resources/Cervical-Card-3.jpg')`,
                    }}
                  >
                    <div className="article-nav-content">
                      <span className="article-nav-label">Self-care</span>
                      <h3 className="article-nav-title">
                        Hydration
                        <span className="arrow">→</span>
                      </h3>
                    </div>
                  </div>
                  <div
                    className="tip-card"
                    role="button"
                    tabIndex={0}
                    aria-label="Active Walking tip"
                    style={{
                      backgroundImage: `url('/assets/images/resources/Cervical-Card-3.jpg')`,
                    }}
                  >
                    <div className="article-nav-content">
                      <span className="article-nav-label">Self-care</span>
                      <h3 className="article-nav-title">
                        Active Walking
                        <span className="arrow">→</span>
                      </h3>
                    </div>
                  </div>
                  <div
                    className="tip-card"
                    role="button"
                    tabIndex={0}
                    aria-label="Quality Sleep tip"
                    style={{
                      backgroundImage: `url('/assets/images/resources/Cervical-Card-3.jpg')`,
                    }}
                  >
                    <div className="article-nav-content">
                      <span className="article-nav-label">Self-care</span>
                      <h3 className="article-nav-title">
                        Quality Sleep
                        <span className="arrow">→</span>
                      </h3>
                    </div>
                  </div>
                </div>
              </div>

              <div className="tips-carousel-controls tips-carousel-controls--mobile" aria-label="Self-care tips navigation">
                <button
                  type="button"
                  className="tips-carousel-btn"
                  onClick={handleTipsPrev}
                  aria-label="Previous tip"
                  disabled={tipsActiveSlide === 0}
                >
                  ←
                </button>
                <button
                  type="button"
                  className="tips-carousel-btn"
                  onClick={handleTipsNext}
                  aria-label="Next tip"
                  disabled={tipsActiveSlide >= getTipsCount() - 1}
                >
                  →
                </button>
              </div>
            </>
          ) : (
            <div className="tips-grid tips-grid--static" role="list" aria-label="Self-care tips">
              <div
                className="tip-card"
                role="listitem"
                style={{
                  backgroundImage: `url('/assets/images/resources/Cervical-Card-3.jpg')`,
                }}
              >
                <div className="article-nav-content">
                  <span className="article-nav-label">Self-care</span>
                  <h3 className="article-nav-title">
                    Daily Stretching
                    <span className="arrow">→</span>
                  </h3>
                </div>
              </div>
              <div
                className="tip-card"
                role="listitem"
                style={{
                  backgroundImage: `url('/assets/images/resources/Cervical-Card-3.jpg')`,
                }}
              >
                <div className="article-nav-content">
                  <span className="article-nav-label">Self-care</span>
                  <h3 className="article-nav-title">
                    Hydration
                    <span className="arrow">→</span>
                  </h3>
                </div>
              </div>
              <div
                className="tip-card"
                role="listitem"
                style={{
                  backgroundImage: `url('/assets/images/resources/Cervical-Card-3.jpg')`,
                }}
              >
                <div className="article-nav-content">
                  <span className="article-nav-label">Self-care</span>
                  <h3 className="article-nav-title">
                    Active Walking
                    <span className="arrow">→</span>
                  </h3>
                </div>
              </div>
              <div
                className="tip-card"
                role="listitem"
                style={{
                  backgroundImage: `url('/assets/images/resources/Cervical-Card-3.jpg')`,
                }}
              >
                <div className="article-nav-content">
                  <span className="article-nav-label">Self-care</span>
                  <h3 className="article-nav-title">
                    Quality Sleep
                    <span className="arrow">→</span>
                  </h3>
                </div>
              </div>
            </div>
          )}
        </section>

        <section className="page-section" id="learn">
          <div className="section-header section-header--learn">
            <h2>Learn - Cervical Pain</h2>
            <p>
              Evidence-led guidance, simple next steps, and practical insights to help you move better. 

            </p>
          </div>
          <div className="resource-nav-container">
            <div 
              className="article-nav-item" 
              id="card-article-re"
              onClick={() => navigate('/resources/learn/cervical-pain')}
              role="button"
              tabIndex={0}
              aria-label="Read article about Cervical Pain"
              onKeyDown={(e) => e.key === 'Enter' && navigate('/resources/learn/cervical-pain')}
              style={{ backgroundImage: `url('/assets/images/resources/Cervical-1.jpg')`, transform: 'translate3d(0, -20px, 0)',  backgroundSize: 'cover' }}
            >
              <div className="article-nav-content">
                <span className="article-nav-label">May 15, 2024 • 5 min read</span>
                <h3 className="article-nav-title">
                  Cervical Pain
                  <span className="arrow">→</span>
                </h3>
              </div>
            </div>

            <div 
              className="article-nav-item" 
              id="card-article-re"
              onClick={() => navigate('/resources/learn/conquering-cervical-pain')}
              role="button"
              tabIndex={0}
              aria-label="Read article about Conquering Cervical Pain"
              onKeyDown={(e) => e.key === 'Enter' && navigate('/resources/learn/conquering-cervical-pain')}
              style={{ backgroundImage: `url('/assets/images/resources/Cervical-Card-2.jpg')`, transform: 'translate3d(0, -20px, 0)',  backgroundSize: 'cover' }}
            >
              <div className="article-nav-content">
                <span className="article-nav-label">May 10, 2024 • 7 min read</span>
                <h3 className="article-nav-title">
                  Conquering Cervical Pain
                  <span className="arrow">→</span>
                </h3>
              </div>
            </div>

            <div 
              className="article-nav-item" 
              id="card-article-re"
              onClick={() => navigate('/resources/learn/acute-and-chronic-pain')}
              role="button"
              tabIndex={0}
              aria-label="Read article about Understanding Acute and Chronic Pain"
              onKeyDown={(e) => e.key === 'Enter' && navigate('/resources/learn/acute-and-chronic-pain')}
              style={{ backgroundImage: `url('/assets/images/resources/Cervical-Card-3.jpg')`, backgroundSize: 'cover', transform: 'translate3d(0, -20px, 0)'}}
            >
              <div className="article-nav-content">
                <span className="article-nav-label">May 5, 2024 • 6 min read</span>
                <h3 className="article-nav-title">
                  Understanding Acute and Chronic Pain
                  <span className="arrow">→</span>
                </h3>
              </div>
            </div>
          </div>
        </section>

        <section className="page-section highlight-section" id="overcoming-sciatica-pain">
          <div className="highlight-content">
            <div className="highlight-text">
              <h2>Overcoming Sciatica Pain</h2>
              <p className="highlight-subtitle">Real Stories of Recovery</p>
              <p>
                Sciatica can be debilitating, but it doesn't have to be permanent. 
                Read how our patients have reclaimed their lives through targeted therapy and personalized care plans.
              </p>
              <button className="primary-btn" onClick={() => navigate('/resources/testimonials/overcoming-sciatica-pain')}>
                Read Success Stories
              </button>
            </div>
            <div className="highlight-visual">
              <div className="testimonial-quote-card">
                <p>"I thought I'd never run again. After 3 months of treatment, I'm back on the track pain-free."</p>
                <cite>- Sarah Jenkins</cite>
              </div>
            </div>
          </div>
        </section>

        <section className="page-section" id="control-over-spine-degeneration">
          <div className="section-header">
            <h2>Control Over Spine Degeneration</h2>
            <p>Proactive strategies to maintain spine health and mobility.</p>
          </div>
          <div className="info-grid">
            <div className="info-item">
              <h3>Early Detection</h3>
              <p>Regular check-ups can identify degenerative changes early, allowing for more effective intervention.</p>
            </div>
            <div className="info-item">
              <h3>Targeted Exercise</h3>
              <p>Strengthening core muscles provides essential support to the spine, reducing load on vertebrae.</p>
            </div>
            <div className="info-item">
              <h3>Ergonomic Lifestyle</h3>
              <p>Adjusting your workspace and daily habits can significantly slow the progression of degeneration.</p>
            </div>
          </div>
          <div className="center-action">
            <button className="secondary-btn" onClick={() => navigate('/contact')}>Schedule an Assessment</button>
          </div>
        </section>

        <section className="page-section highlight-section-alt" id="recovering-from-sports-injuries">
          <div className="highlight-content reverse">
            <div className="highlight-text">
              <h2>Recovering from Sports Injuries</h2>
              <p className="highlight-subtitle">Get Back in the Game</p>
              <p>
                Whether you're a professional athlete or a weekend warrior, our sports medicine specialists 
                design recovery programs that not only heal injuries but prevent future ones.
              </p>
              <ul className="feature-list">
                <li>Customized Rehabilitation Plans</li>
                <li>Advanced Manual Therapy</li>
                <li>Performance Optimization</li>
              </ul>
            </div>
            <div className="highlight-visual">
               <div className="stat-card">
                 <span className="stat-number">95%</span>
                 <span className="stat-label">Return to Sport Rate</span>
               </div>
            </div>
          </div>
        </section>

        <section className="page-section" id="all-testimonials">
          <div className="section-header">
            <h2>What Our Patients Say</h2>
            <p>Trusted by hundreds of patients for effective pain relief and rehabilitation.</p>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="stars">★★★★★</div>
              <p>"The team was incredible. They diagnosed my issue quickly and the treatment plan was easy to follow."</p>
              <div className="author">
                <span className="author-name">Michael T.</span>
                <span className="author-detail">Lower Back Pain</span>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="stars">★★★★★</div>
              <p>"I can finally sleep through the night without shoulder pain. Highly recommend their osteopathy services."</p>
              <div className="author">
                <span className="author-name">Emma R.</span>
                <span className="author-detail">Shoulder Injury</span>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="stars">★★★★★</div>
              <p>"Professional, knowledgeable, and truly caring. They helped me avoid surgery."</p>
              <div className="author">
                <span className="author-name">David L.</span>
                <span className="author-detail">Knee Pain</span>
              </div>
            </div>
          </div>
          <div className="center-action">
            <button
              className="outline-btn"
              onClick={() => navigate('/resources/testimonials/all-testimonials')}
            >
              View All Testimonials
            </button>
          </div>
        </section>

        {/* Featured Resource Popup - Example of viewport centering */}
        <section className="page-section viewport-centered-section" id="featured-resource-popup">
          <div className="section-header">
            <h2>Free Guide: 5 Daily Habits for a Healthy Spine</h2>
            <p>Download our exclusive guide and start your journey to a pain-free life today.</p>
          </div>
          <div className="highlight-content">
            <div className="highlight-text">
              <p>
                Discover the simple, effective changes you can make to your daily routine to improve posture, 
                reduce back pain, and increase mobility. This comprehensive guide is curated by our expert team.
              </p>
              <ul className="feature-list">
                <li>Ergonomic Desk Setup Tips</li>
                <li>Morning Stretching Routine</li>
                <li>Hydration & Nutrition Advice</li>
              </ul>
              <div className="center-action" style={{ marginTop: '24px' }}>
                {!isEmailVerified ? (
                  <form onSubmit={handleEmailSubmit} className="email-gate-form">
                    <input
                      type="text"
                      name="hp_field"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      style={{ display: 'none' }}
                      tabIndex="-1"
                      autoComplete="off"
                    />
                    <div className="email-input-group">
                      <input
                        type="email"
                        placeholder="Enter your email to unlock"
                        value={email}
                        onChange={handleEmailChange}
                        className={`email-input ${emailError ? 'error' : ''}`}
                        disabled={isSubmittingEmail}
                        required
                      />
                      <button 
                        type="submit" 
                        className={`primary-btn ${isSubmittingEmail ? 'loading' : ''}`}
                        disabled={isSubmittingEmail}
                      >
                        {isSubmittingEmail ? 'Verifying...' : 'Unlock Download'}
                      </button>
                    </div>
                    {emailError && <p className="error-message">{emailError}</p>}
                    <p className="privacy-note">We respect your privacy. No spam.</p>
                  </form>
                ) : (
                  <div className="download-actions">
                    <button 
                      className={`primary-btn ${downloadStatus === 'downloading' ? 'loading' : ''}`} 
                      onClick={handleDownload}
                      disabled={downloadStatus === 'downloading'}
                      style={{ minWidth: '160px' }}
                    >
                      {downloadStatus === 'downloading' 
                        ? `Downloading...${downloadProgress > 0 ? ` ${downloadProgress}%` : ''}` 
                        : downloadStatus === 'success' 
                          ? 'Downloaded!' 
                          : downloadStatus === 'error'
                            ? 'Try Again'
                            : 'Download Now'}
                    </button>
                    <button className="outline-btn" style={{ marginLeft: '16px', border: 'none' }} onClick={() => document.getElementById('featured-resource-popup').style.display = 'none'}>Close</button>
                  </div>
                )}
              </div>
            </div>
            <div className="highlight-visual">
              <img 
                src="/assets/images/resources/ebook.png" 
                alt="Healthy Spine Ebook Cover" 
                style={{ maxWidth: '100%', height: 'auto', borderRadius: '12px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
