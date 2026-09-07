import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { trackEvent } from '../../../utils/analytics';
import { useCookieConsent } from '../../../utils/consentManager';

const STORIES = [
  {
    id: 'story-1',
    to: '/resources/testimonials/overcoming-sciatica-pain',
    videoUrl: 'https://www.youtube.com/embed/uK77XrRzGYA?autoplay=1&mute=1&controls=0&rel=0&showinfo=0&loop=1&playlist=uK77XrRzGYA&modestbranding=1&playsinline=1',
    metric: '80%',
    metricSub: 'Fully recovered from Sciatica',
    quote: '"From not being able to lift even small weight and having pain from sitting down to being 80% fully recovered, they both experience a life free of pain."',
    author: 'Filomena and Roland',
    title: 'Patients',
  },
  {
    id: 'story-2',
    to: '/resources/testimonials/overcoming-sciatica-pain',
    videoUrl: 'https://www.youtube.com/embed/bkbLgNoKhkY?autoplay=1&mute=1&controls=0&rel=0&showinfo=0&loop=1&playlist=bkbLgNoKhkY&modestbranding=1&playsinline=1',
    metric: '100%',
    metricSub: 'Personalised care approach',
    quote: '"Ghislaine Renault shares her experience of her medical journey, how her life led to having Sciatica and excruciating pain."',
    author: 'Ghislaine Renault',
    title: 'Patient',
  },
  {
    id: 'story-3',
    to: '/resources',
    videoUrl: 'https://www.youtube.com/embed/ANY7DTXlMRA?autoplay=1&mute=1&controls=0&rel=0&showinfo=0&loop=1&playlist=ANY7DTXlMRA&modestbranding=1&playsinline=1',
    metric: '98%',
    metricSub: 'Long-term recovery success',
    quote: '"Although you may feel like brand new the day after the procedure, you will only be totally healed a few months after. The body takes time to adjust."',
    author: 'Sid Richardson',
    title: 'Patient',
  }
];

export default function StoriesSection({ enableStoryVideo }) {
  const gridRef = useRef(null);
  const { consent } = useCookieConsent();
  // These looping background videos autoplay with no pause control, so honour
  // the user's reduced-motion preference (WCAG 2.2.2) by not rendering them.
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canRenderStoryVideo = enableStoryVideo && Boolean(consent.media) && !prefersReducedMotion;

  const scrollPrev = () => {
    if (gridRef.current) {
      gridRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollNext = () => {
    if (gridRef.current) {
      gridRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  return (
    <section className="home-section-stories" aria-labelledby="stories-title">
      <div className="home-section-stories-inner">
        <header className="home-stories-header">
          <div>
            <h2 id="stories-title" className="home-stories-title">Stories from our patients</h2>
            <p className="home-stories-subtitle">Real experiences of people who regained control over their lives.</p>
          </div>
        </header>
        <div className="home-stories-grid" role="list" ref={gridRef}>
          {STORIES.map((story) => (
            <Link
              key={story.id}
              to={story.to}
              className="story-card"
              role="listitem"
              aria-label={`Read ${story.author}'s story`}
              onClick={() => trackEvent('nav_click', { location: 'stories', to: story.to })}
            >
              <div className="story-card-visual" aria-hidden="true">
                {canRenderStoryVideo && (
                  <iframe
                    className="story-card-video-bg"
                    src={story.videoUrl}
                    title="Patient story background"
                    tabIndex={-1}
                    allow="autoplay; encrypted-media"
                  />
                )}
              </div>
              <div className="story-card-overlay"></div>
              <div className="story-card-top">
                <img src="/assets/apc-branco.svg" alt="APC Logo" className="story-card-logo" />
              </div>
              <div className="story-card-content">
                <div className="story-card-metric">
                  <strong>{story.metric}</strong>
                  <span>{story.metricSub}</span>
                </div>
                <blockquote className="story-card-quote">
                  {story.quote}
                </blockquote>
                <footer className="story-card-meta">
                  <div className="story-card-author-info">
                    <span className="story-card-author">{story.author}</span>
                    <span className="story-card-author-title">{story.title}</span>
                  </div>
                  <div className="story-card-action">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="12" fill="white" fillOpacity="0.2"/>
                      <path d="M9 15L15 9M15 9H10.5M15 9V13.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </footer>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
