import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/layout/site-sections.css';
import '../../styles/pages/resources-page.css';
import { testimonialStories } from '../../features/content/contentApi';

const FEATURED_STORY = testimonialStories[0];
const MORE_STORIES = testimonialStories.slice(1);

const RESOURCE_UNLOCK_KEY = 'spine_guide_unlocked';
const EMAIL_ATTEMPTS_KEY = 'email_attempts';

export default function Resources() {
  const navigate = useNavigate();
  const [downloadStatus, setDownloadStatus] = useState('idle'); // idle, downloading, success, error
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isFeaturedGuideVisible, setIsFeaturedGuideVisible] = useState(true);

  // Email Gating State
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false);
  const [honeypot, setHoneypot] = useState(''); // Anti-spam honeypot
  const statusResetTimerRef = useRef(null);

  useEffect(() => {
    try {
      const isUnlocked = window.localStorage.getItem(RESOURCE_UNLOCK_KEY);
      if (isUnlocked === 'true') {
        setIsEmailVerified(true);
      }
    } catch {
      // Ignore storage failures and keep the guide locked.
    }
  }, []);

  useEffect(() => {
    return () => {
      if (statusResetTimerRef.current) {
        window.clearTimeout(statusResetTimerRef.current);
      }
    };
  }, []);

  const scheduleStatusReset = useCallback(() => {
    if (statusResetTimerRef.current) {
      window.clearTimeout(statusResetTimerRef.current);
    }

    statusResetTimerRef.current = window.setTimeout(() => {
      setDownloadStatus('idle');
      setDownloadProgress(0);
    }, 3000);
  }, []);

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
      const attempts = JSON.parse(window.localStorage.getItem(EMAIL_ATTEMPTS_KEY) || '[]');
      const now = Date.now();
      const recentAttempts = attempts.filter((time) => now - time < 60000); // Last 1 minute

      if (recentAttempts.length >= 5) {
        return false;
      }

      recentAttempts.push(now);
      window.localStorage.setItem(EMAIL_ATTEMPTS_KEY, JSON.stringify(recentAttempts));
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
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Success
      setIsEmailVerified(true);
      window.localStorage.setItem(RESOURCE_UNLOCK_KEY, 'true');
    } catch (err) {
      setEmailError('Something went wrong. Please try again.');
    } finally {
      setIsSubmittingEmail(false);
    }
  };

  const handleDownload = useCallback(async () => {
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
      scheduleStatusReset();
      
    } catch (error) {
      setDownloadStatus('error');
      scheduleStatusReset();
    }
  }, [scheduleStatusReset]);

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
  }, []);

  return (
    <div className="resources-page">
      <header className="psx-hero resources-hero" aria-label="Resources hero section">
        <div className="psx-hero-backdrop video-bg" aria-hidden="true">
          <video
            className="psx-hero-video"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster="/assets/images/Hero/Psychology.webp"
          >
            <source src="/assets/videos/Sports-Medicine-Video-min-1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="psx-hero-inner">
          <p className="psx-hero-eyebrow">Resources</p>
          <h1 className="psx-hero-title">Resources</h1>
          <p className="psx-hero-subtitle">
            Learn, read and explore practical advice and real patient stories. Guidance to support your care between visits.
          </p>
          <div className="psx-hero-actions">
            <button
              type="button"
              className="psx-btn-primary"
              aria-label="Book an appointment"
              onClick={() => navigate('/contact')}
            >
              <span>Book an appointment</span>
            </button>
          </div>
        </div>
      </header>

      <main className="page-main">

        <section className="page-section" id="learn">
          <div className="section-header section-header--learn">
            <p className="section-eyebrow">Learn</p>
            <h2>Understanding Cervical Pain</h2>
            <p>Practical, expert-written guides to help you understand and manage neck and cervical pain.</p>
          </div>
          <div className="resource-nav-container learn-bento">
            <Link
              className="article-nav-item article-nav-item--feature"
              to="/resources/learn/cervical-pain"
              aria-label="Read article about Cervical Pain"
              style={{ backgroundImage: `url('/assets/images/resources/Cervical-1.webp')` }}
            >
              <div className="article-nav-content">
                <span className="article-nav-label">May 15, 2024 • 5 min read</span>
                <h3 className="article-nav-title">
                  Cervical Pain
                  <span className="arrow">→</span>
                </h3>
              </div>
            </Link>

            <Link
              className="article-nav-item"
              to="/resources/learn/conquering-cervical-pain"
              aria-label="Read article about Conquering Cervical Pain"
              style={{ backgroundImage: `url('/assets/images/resources/Cervical-Card-2.webp')` }}
            >
              <div className="article-nav-content">
                <span className="article-nav-label">May 10, 2024 • 7 min read</span>
                <h3 className="article-nav-title">
                  Conquering Cervical Pain
                  <span className="arrow">→</span>
                </h3>
              </div>
            </Link>

            <Link
              className="article-nav-item"
              to="/resources/learn/acute-and-chronic-pain"
              aria-label="Read article about Understanding Acute and Chronic Pain"
              style={{ backgroundImage: `url('/assets/images/resources/Cervical-Card-3.webp')` }}
            >
              <div className="article-nav-content">
                <span className="article-nav-label">May 5, 2024 • 6 min read</span>
                <h3 className="article-nav-title">
                  Understanding Acute and Chronic Pain
                  <span className="arrow">→</span>
                </h3>
              </div>
            </Link>
          </div>
        </section>

        <section className="page-section" id="patient-stories">
          <div className="section-header">
            <p className="section-eyebrow">Patient stories</p>
            <h2>Real stories of recovery</h2>
            <p>Read how our patients reclaimed their lives — in their own words.</p>
          </div>

          <div className="sciatica-block">
            <div className="sciatica-copy">
              <p className="sciatica-eyebrow">Featured story</p>
              <h2 className="sciatica-title">Overcoming Sciatica Pain</h2>
              <p className="sciatica-body">
                Sciatica can be debilitating — but it doesn't have to be permanent. See how our patients
                have reclaimed their lives through targeted therapy and personalised care plans.
              </p>
              <button className="sciatica-cta" onClick={() => navigate(FEATURED_STORY.to)}>
                {FEATURED_STORY.cta} →
              </button>
            </div>
            <figure className="sciatica-quote">
              <span className="sciatica-quote-mark" aria-hidden="true">&rdquo;</span>
              <blockquote>{FEATURED_STORY.quote}</blockquote>
              <figcaption className="sciatica-quote-author">
                <span className="sciatica-quote-avatar" aria-hidden="true">
                  <img src={FEATURED_STORY.img} alt="" loading="lazy" />
                </span>
                <span className="sciatica-quote-meta">
                  <span className="sciatica-quote-name">{FEATURED_STORY.name}</span>
                  <span className="sciatica-quote-loc">Sciatica recovery</span>
                </span>
              </figcaption>
            </figure>
          </div>

          <div className="stories-grid">
            {MORE_STORIES.map((story) => (
              <Link key={story.to} to={story.to} className="story-card" aria-label={`Read ${story.name}'s story`}>
                <span className="story-card-avatar" aria-hidden="true">
                  <img src={story.img} alt="" loading="lazy" />
                </span>
                <p className="story-card-quote">&ldquo;{story.quote}&rdquo;</p>
                <div className="story-card-foot">
                  <span className="story-card-meta">
                    <span className="story-card-name">{story.name}</span>
                    <span className="story-card-read">{story.readMins} min read</span>
                  </span>
                  <span className="story-card-cta" aria-hidden="true">→</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Resource Popup - Example of viewport centering */}
        {isFeaturedGuideVisible && (
          <section className="page-section viewport-centered-section" id="featured-resource-popup">
          <div className="section-header">
            <p className="section-eyebrow">Free guide</p>
            <h2>5 Daily Habits for a Healthy Spine</h2>
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
                      type="button"
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
                    <button
                      type="button"
                      className="outline-btn"
                      style={{ marginLeft: '16px', border: 'none' }}
                      onClick={() => setIsFeaturedGuideVisible(false)}
                    >
                      Close
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="highlight-visual">
              <img 
                src="/assets/images/resources/ebook.webp" 
                alt="Healthy Spine Ebook Cover" 
                style={{ maxWidth: '100%', height: 'auto', borderRadius: '12px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
              />
            </div>
          </div>
          </section>
        )}
      </main>
    </div>
  );
}
