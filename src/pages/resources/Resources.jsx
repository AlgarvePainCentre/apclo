import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import '../home/Home.css';
import './Resources.css';

export default function Resources() {
  const heroRef = useRef(null);
  const heroVideoRef = useRef(null);
  const navigate = useNavigate();
  const [downloadStatus, setDownloadStatus] = useState('idle'); // idle, downloading, success, error
  const [downloadProgress, setDownloadProgress] = useState(0);

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

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (emailError) setEmailError('');
  };

  const checkRateLimit = () => {
    const attempts = JSON.parse(localStorage.getItem('email_attempts') || '[]');
    const now = Date.now();
    const recentAttempts = attempts.filter(time => now - time < 60000); // Last 1 minute
    
    if (recentAttempts.length >= 5) {
      return false;
    }
    
    recentAttempts.push(now);
    localStorage.setItem('email_attempts', JSON.stringify(recentAttempts));
    return true;
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    
    // Honeypot check
    if (honeypot) {
      console.log('Bot detected');
      return;
    }

    if (!validateEmail(email)) {
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

        <section className="page-section" id="tips-for-self-care">
          <div className="section-header">
            <h2>Tips for Self-Care</h2>
            <p>Empower your recovery with daily habits that make a difference.</p>
          </div>
          <div className="tips-grid">
            <div className="tip-card">
              <div className="tip-icon">🧘</div>
              <h3>Daily Stretching</h3>
              <p>Gentle morning stretches can improve flexibility and reduce stiffness throughout the day.</p>
            </div>
            <div className="tip-card">
              <div className="tip-icon">💧</div>
              <h3>Hydration</h3>
              <p>Staying hydrated supports joint lubrication and overall tissue health.</p>
            </div>
            <div className="tip-card">
              <div className="tip-icon">🚶</div>
              <h3>Active Walking</h3>
              <p>Short, frequent walks help maintain circulation and muscle tone without overexertion.</p>
            </div>
            <div className="tip-card">
              <div className="tip-icon">💤</div>
              <h3>Quality Sleep</h3>
              <p>Rest is when your body heals. Prioritize a consistent sleep schedule for optimal recovery.</p>
            </div>
          </div>
        </section>

        <section className="page-section" id="learn">
          <div className="section-header">
            <h2>Learn</h2>
            <p>Expert advice, research updates, and health news.</p>
          </div>
          <div className="learn-grid">
            <article className="learn-card">
              <div className="learn-card-image-wrapper">
                <img 
                  src="/assets/images/specialities/head/head-1.jpg" 
                  alt="Person touching their neck in pain" 
                  className="learn-card-image"
                  loading="lazy"
                />
              </div>
              <div className="learn-card-content">
                <div className="learn-card-meta">
                  <span className="learn-date">May 15, 2024</span>
                  <span className="learn-read-time">5 min read</span>
                </div>
                <h3>Cervical Pain</h3>
                <p>Learn about the causes, symptoms, and comprehensive treatment options for cervical spine pain to restore mobility and comfort.</p>
                <button className="learn-read-more" onClick={() => navigate('/resources/learn/cervical-pain')} aria-label="Read more about Cervical Pain">
                  Read More
                </button>
              </div>
            </article>
            <article className="learn-card">
              <div className="learn-card-image-wrapper">
                <img 
                  src="/assets/images/treatment-img/SpinePain.jpg" 
                  alt="Detailed view of spine structure" 
                  className="learn-card-image"
                  loading="lazy"
                />
              </div>
              <div className="learn-card-content">
                <div className="learn-card-meta">
                  <span className="learn-date">May 10, 2024</span>
                  <span className="learn-read-time">7 min read</span>
                </div>
                <h3>Conquering Cervical Pain</h3>
                <p>Discover effective strategies and advanced therapies for managing and overcoming persistent cervical pain in your daily life.</p>
                <button className="learn-read-more" onClick={() => navigate('/resources/learn/conquering-cervical-pain')} aria-label="Read more about Conquering Cervical Pain">
                  Read More
                </button>
              </div>
            </article>
            <article className="learn-card">
              <div className="learn-card-image-wrapper">
                <img 
                  src="/assets/images/treatment-img/KneePain.jpg" 
                  alt="Person holding their knee in pain" 
                  className="learn-card-image"
                  loading="lazy"
                />
              </div>
              <div className="learn-card-content">
                <div className="learn-card-meta">
                  <span className="learn-date">May 5, 2024</span>
                  <span className="learn-read-time">6 min read</span>
                </div>
                <h3>Understanding Acute and Chronic Pain</h3>
                <p>Explore the key differences between acute and chronic pain and how personalized treatment plans can address your specific needs.</p>
                <button className="learn-read-more" onClick={() => navigate('/resources/learn/acute-and-chronic-pain')} aria-label="Read more about Understanding Acute and Chronic Pain">
                  Read More
                </button>
              </div>
            </article>
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
            <button className="outline-btn" onClick={() => navigate('/resources')}>View All Testimonials</button>
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
