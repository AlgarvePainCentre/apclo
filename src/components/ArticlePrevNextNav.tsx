import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export type ArticleNavItem = {
  to: string;
  title: string;
  heroImage?: string;
};

type ArticlePrevNextNavProps = {
  items: ArticleNavItem[];
  ariaLabel?: string;
  previousLabel?: string;
  nextLabel?: string;
};

export default function ArticlePrevNextNav({
  items,
  ariaLabel = 'Page navigation',
  previousLabel = 'Previous Page',
  nextLabel = 'Next Page',
}: ArticlePrevNextNavProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const currentPath = React.useMemo(() => {
    const raw = location.pathname || '/';
    return raw.length > 1 && raw.endsWith('/') ? raw.slice(0, -1) : raw;
  }, [location.pathname]);

  const currentIndex = React.useMemo(() => items.findIndex((i) => i.to === currentPath), [items, currentPath]);
  const previous = currentIndex > 0 ? items[currentIndex - 1] : null;
  const next = currentIndex >= 0 && currentIndex < items.length - 1 ? items[currentIndex + 1] : null;

  if (currentIndex === -1 || (!previous && !next)) return null;

  const transitionMs = 260;
  const currentHero = items[currentIndex]?.heroImage;

  const [activeHero, setActiveHero] = React.useState<string | null>(currentHero || null);
  const [incomingHero, setIncomingHero] = React.useState<string | null>(null);
  const [phase, setPhase] = React.useState<'idle' | 'fading'>('idle');
  const preloadStatusRef = React.useRef(new Map<string, 'loaded' | 'error'>());
  const transitionTimerRef = React.useRef<number | null>(null);
  const navigationTimerRef = React.useRef<number | null>(null);

  const preloadImage = React.useCallback(async (src: string) => {
    const cached = preloadStatusRef.current.get(src);
    if (cached === 'loaded') return true;
    if (cached === 'error') return false;

    const img = new Image();
    return await new Promise<boolean>((resolve) => {
      const finish = (status: 'loaded' | 'error') => {
        preloadStatusRef.current.set(src, status);
        resolve(status === 'loaded');
      };

      img.onload = () => finish('loaded');
      img.onerror = () => finish('error');
      img.src = src;
    });
  }, []);

  const clearTimers = React.useCallback(() => {
    if (transitionTimerRef.current) {
      window.clearTimeout(transitionTimerRef.current);
      transitionTimerRef.current = null;
    }
    if (navigationTimerRef.current) {
      window.clearTimeout(navigationTimerRef.current);
      navigationTimerRef.current = null;
    }
  }, []);

  React.useEffect(() => {
    setActiveHero(currentHero || null);
    setIncomingHero(null);
    setPhase('idle');
    clearTimers();
  }, [clearTimers, currentHero, currentPath]);

  React.useEffect(() => {
    const heroes = [previous?.heroImage, next?.heroImage].filter(Boolean) as string[];
    if (!heroes.length) return;
    heroes.forEach((src) => {
      preloadImage(src).catch(() => {});
    });
  }, [next?.heroImage, preloadImage, previous?.heroImage]);

  React.useEffect(() => clearTimers, [clearTimers]);

  const requestBackground = React.useCallback(
    async (src: string | undefined | null) => {
      if (!src) return;
      const ok = await preloadImage(src);
      if (!ok) return;
      if (src === activeHero) return;

      clearTimers();
      setIncomingHero(src);
      setPhase('fading');
      transitionTimerRef.current = window.setTimeout(() => {
        setActiveHero(src);
        setIncomingHero(null);
        setPhase('idle');
        transitionTimerRef.current = null;
      }, transitionMs);
    },
    [activeHero, clearTimers, preloadImage]
  );

  const handleNavigate = React.useCallback(
    async (to: string, heroImage?: string) => {
      if (phase !== 'idle') return;
      clearTimers();
      if (heroImage) {
        await requestBackground(heroImage);
        navigationTimerRef.current = window.setTimeout(() => {
          navigate(to);
          navigationTimerRef.current = null;
        }, transitionMs);
      } else {
        navigate(to);
      }
    },
    [clearTimers, navigate, phase, requestBackground]
  );

  return (
    <section
      className="article-navigation-container"
      aria-label={ariaLabel}
      data-nav-phase={phase}
      data-nav-has-hero={Boolean(activeHero)}
    >
      <span
        className="article-nav-hero-layer article-nav-hero-layer-base"
        aria-hidden="true"
        style={activeHero ? { backgroundImage: `url("${activeHero}")` } : undefined}
      />
      <span
        className="article-nav-hero-layer article-nav-hero-layer-incoming"
        aria-hidden="true"
        style={incomingHero ? { backgroundImage: `url("${incomingHero}")` } : undefined}
      />
      <span className="article-nav-hero-overlay" aria-hidden="true" />
      {previous ? (
        <Link
          className="article-nav-item prev"
          to={previous.to}
          aria-label={`${previousLabel}: ${previous.title}`}
          style={previous.heroImage ? { '--nav-bg-image': `url("${previous.heroImage}")` } as React.CSSProperties : undefined}
          onMouseEnter={() => requestBackground(previous.heroImage)}
          onFocus={() => requestBackground(previous.heroImage)}
          onClick={(e) => {
            e.preventDefault();
            handleNavigate(previous.to, previous.heroImage);
          }}
        >
          <div className="article-nav-content">
            <span className="article-nav-label">{previousLabel}</span>
            <h2 className="article-nav-title">
              <span className="arrow">←</span> {previous.title}
            </h2>
          </div>
        </Link>
      ) : null}

      {next ? (
        <Link
          className="article-nav-item next"
          to={next.to}
          aria-label={`${nextLabel}: ${next.title}`}
          style={next.heroImage ? { '--nav-bg-image': `url("${next.heroImage}")` } as React.CSSProperties : undefined}
          onMouseEnter={() => requestBackground(next.heroImage)}
          onFocus={() => requestBackground(next.heroImage)}
          onClick={(e) => {
            e.preventDefault();
            handleNavigate(next.to, next.heroImage);
          }}
        >
          <div className="article-nav-content">
            <span className="article-nav-label">{nextLabel}</span>
            <h2 className="article-nav-title">
              {next.title} <span className="arrow">→</span>
            </h2>
          </div>
        </Link>
      ) : null}
    </section>
  );
}
