import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './AllTestimonials.css';
import { serializeJsonForHtmlScript } from '../../../../utils/security';

declare global {
  interface Window {
    YT?: {
      Player: new (
        elementId: string,
        options: {
          height?: string;
          width?: string;
          videoId: string;
          playerVars?: Record<string, unknown>;
          events?: {
            onReady?: (event: {
              target: {
                getDuration: () => number;
                getVideoData: () => { title?: string; author?: string };
                destroy?: () => void;
              };
            }) => void;
            onError?: () => void;
          };
        }
      ) => { destroy: () => void };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

const AllTestimonialsPage: React.FC = () => {
  const pageRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);
  const storiesSectionRef = useRef<HTMLElement | null>(null);
  const ytApiPromiseRef = useRef<Promise<void> | null>(null);
  const probedIdsRef = useRef<Set<string>>(new Set());

  const testimonials = useMemo(
    () => [
      {
        name: 'Ghislaine Renault',
        initials: 'GR',
        rating: 4.9,
        quote: 'I regained the freedom to move without fear — caring and effective treatment.',
        to: '/resources/testimonials/overcoming-sciatica-pain',
        cta: 'Read full case study',
        date: 'May 12, 2024',
        readMins: 5,
        img: '/assets/images/illustrative/services-home-min-1.jpg',
      },
      {
        name: 'Sid Richardson',
        initials: 'SR',
        rating: 4.8,
        quote: 'Professional, empathetic and thorough. The plan worked and I feel like myself again.',
        to: '/resources/testimonials/control-over-spine-degeneration',
        cta: 'Read full case study',
        date: 'May 10, 2024',
        readMins: 7,
        img: '/assets/images/treatment-img/SpinePain.jpg',
      },
      {
        name: 'Filomena & Roland',
        initials: 'F·R',
        rating: 5.0,
        quote: 'Teamwork and guidance made all the difference. We felt heard at every step.',
        to: '/resources/testimonials/recovering-from-sports-injuries',
        cta: 'Read full case study',
        date: 'May 5, 2024',
        readMins: 6,
        img: '/assets/images/medical/DSC06176.jpg',
      },
    ],
    []
  );

  useEffect(() => {
    const container = pageRef.current;
    if (!container) return;

    const items = Array.from(container.querySelectorAll<HTMLElement>('[data-animate]'));

    if (typeof IntersectionObserver === 'undefined') {
      items.forEach((el) => el.setAttribute('data-inview', 'true'));
      return;
    }

    const fallbackTimer = window.setTimeout(() => {
      items.forEach((el) => el.setAttribute('data-inview', 'true'));
    }, 700);

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-inview', 'true');
          }
        });
      },
      { threshold: 0.2 }
    );
    items.forEach((el) => io.observe(el));
    return () => {
      window.clearTimeout(fallbackTimer);
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    const container = pageRef.current;
    if (!container) return;
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotion.matches) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY || 0;
      const clamped = Math.max(0, Math.min(90, y * 0.18));
      container.style.setProperty('--hero-parallax', `${clamped}px`);
    };

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  // AggregateRating JSON-LD for SEO
  const aggregateRatingJson = useMemo(() => {
    const avg =
      testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length;
    return JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'MedicalClinic',
      name: 'Algarve Pain Centre',
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: avg.toFixed(1),
        reviewCount: testimonials.length,
      },
    });
  }, [testimonials]);

  const youtubeChannelUrl = useMemo(
    () =>
      'https://www.youtube.com/channel/UCTRGPzW0ARGZbZVdQmgD2Kg?utm_source=algarvepaincentre&utm_medium=referral&utm_campaign=all_testimonials&utm_content=watch_more',
    []
  );

  type YouTubeCard = {
    id: string;
    href: string;
    thumbnailUrl: string;
    title: string;
    channelName: string;
    durationSec: number | null;
  };

  const youTubeUrls = useMemo(
    () => [
      'https://www.youtube.com/watch?v=bkbLgNoKhkY',
      'https://www.youtube.com/watch?v=uK77XrRzGYA',
      'https://www.youtube.com/watch?v=ANY7DTXlMRA',
      'https://www.youtube.com/watch?v=If0qu-Ej8dA',
      'https://www.youtube.com/watch?v=_pRrvN7bUZM',
      'https://www.youtube.com/watch?v=PzaOM_ERL0Q',
      'https://www.youtube.com/watch?v=guuJPhwKCfw',
    ],
    []
  );

  const parseYouTubeId = (url: string) => {
    try {
      const u = new URL(url);
      if (u.hostname.endsWith('youtube.com')) {
        const v = u.searchParams.get('v');
        if (v) return v;
      }
      if (u.hostname === 'youtu.be') {
        const id = u.pathname.replace('/', '').trim();
        if (id) return id;
      }
    } catch {
      return null;
    }
    return null;
  };

  const appendUtm = (url: string, utmContent: string) => {
    try {
      const u = new URL(url);
      u.searchParams.set('utm_source', 'algarvepaincentre');
      u.searchParams.set('utm_medium', 'referral');
      u.searchParams.set('utm_campaign', 'all_testimonials');
      u.searchParams.set('utm_content', utmContent);
      return u.toString();
    } catch {
      return url;
    }
  };

  const formatDuration = (secondsTotal: number | null) => {
    if (!secondsTotal || secondsTotal <= 0) return '';
    const total = Math.round(secondsTotal);
    const hours = Math.floor(total / 3600);
    const minutes = Math.floor((total % 3600) / 60);
    const seconds = total % 60;
    const mm = hours > 0 ? String(minutes).padStart(2, '0') : String(minutes);
    const ss = String(seconds).padStart(2, '0');
    return hours > 0 ? `${hours}:${mm}:${ss}` : `${mm}:${ss}`;
  };

  const initialCards = useMemo<YouTubeCard[]>(() => {
    const ids = youTubeUrls
      .map((u) => ({ url: u, id: parseYouTubeId(u) }))
      .filter((x): x is { url: string; id: string } => Boolean(x.id));

    return ids.map(({ url, id }) => ({
      id,
      href: appendUtm(url, 'video_preview'),
      thumbnailUrl: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
      title: 'Loading…',
      channelName: 'YouTube',
      durationSec: null,
    }));
  }, [youTubeUrls]);

  const [youtubeCards, setYoutubeCards] = useState<YouTubeCard[]>(initialCards);

  useEffect(() => {
    setYoutubeCards(initialCards);
    probedIdsRef.current = new Set();
  }, [initialCards]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!youtubeCards.length) return;

    const loadIframeApi = () => {
      if (ytApiPromiseRef.current) return ytApiPromiseRef.current;
      ytApiPromiseRef.current = new Promise<void>((resolve) => {
        if (window.YT?.Player) {
          resolve();
          return;
        }
        const existing = document.querySelector<HTMLScriptElement>('script[data-yt-iframe-api="true"]');
        if (existing) {
          const prev = window.onYouTubeIframeAPIReady;
          window.onYouTubeIframeAPIReady = () => {
            prev?.();
            resolve();
          };
          return;
        }

        const script = document.createElement('script');
        script.src = 'https://www.youtube.com/iframe_api';
        script.async = true;
        script.dataset.ytIframeApi = 'true';

        const prev = window.onYouTubeIframeAPIReady;
        window.onYouTubeIframeAPIReady = () => {
          prev?.();
          resolve();
        };
        document.head.appendChild(script);
      });
      return ytApiPromiseRef.current;
    };

    const getProbeId = (id: string) => `yt-probe-${id}`;

    let cancelled = false;
    const players: { destroy: () => void }[] = [];

    const updateCard = (id: string, patch: Partial<YouTubeCard>) => {
      setYoutubeCards((prev) => prev.map((c) => (c.id === id ? { ...c, ...patch } : c)));
    };

    const pollDuration = (getDuration: () => number) => {
      const tries = 10;
      const delayMs = 180;
      return new Promise<number>((resolve) => {
        let attempt = 0;
        const tick = () => {
          attempt += 1;
          const d = getDuration();
          if (d && d > 0) {
            resolve(d);
            return;
          }
          if (attempt >= tries) {
            resolve(0);
            return;
          }
          window.setTimeout(tick, delayMs);
        };
        tick();
      });
    };

    const run = async () => {
      await loadIframeApi();
      if (cancelled) return;
      if (!window.YT?.Player) return;

      const pending = youtubeCards.filter((c) => !probedIdsRef.current.has(c.id));
      pending.forEach((c) => probedIdsRef.current.add(c.id));

      pending.forEach((c) => {
        const probeId = getProbeId(c.id);
        const mount = document.getElementById(probeId);
        if (!mount) return;
        const player = new window.YT!.Player(probeId, {
          height: '0',
          width: '0',
          videoId: c.id,
          playerVars: { autoplay: 0, controls: 0, rel: 0, playsinline: 1 },
          events: {
            onReady: async (event) => {
              try {
                const vd = event.target.getVideoData?.() ?? {};
                const duration = await pollDuration(event.target.getDuration);
                updateCard(c.id, {
                  title: vd.title || c.title,
                  channelName: vd.author || c.channelName,
                  durationSec: duration > 0 ? duration : null,
                });
              } finally {
                event.target?.destroy?.();
              }
            },
            onError: () => {
              updateCard(c.id, { title: c.title === 'Loading…' ? 'Video unavailable' : c.title });
            },
          },
        });
        players.push(player);
      });
    };

    void run();
    return () => {
      cancelled = true;
      players.forEach((p) => {
        try {
          p.destroy();
        } catch {
          return;
        }
      });
    };
  }, [youtubeCards]);

  return (
    <main
      ref={pageRef}
      className="all-testimonials-page"
      aria-labelledby="all-testimonials-title"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonForHtmlScript(aggregateRatingJson) }}
      />
      <header className="all-testimonials-hero" aria-label="All testimonials hero" data-animate="hero">
        <div className="all-testimonials-hero-bg" aria-hidden="true">
          <div className="hero-bg-image" />
          <div className="hero-bg-glow" />
        </div>
        <div className="all-testimonials-hero-inner">
          <p className="hero-eyebrow">Stories from our patients</p>
          <h1 id="all-testimonials-title" className="hero-title">
            Real recoveries, told in our patients’ words.
          </h1>
          <p className="hero-subtitle">
            Explore case studies across spine pain, sciatica and sports injury rehabilitation—designed around
            personalised care and steady progress.
          </p>
        </div>
      </header>

      <section className="all-testimonials-youtube" aria-labelledby="youtube-title" data-animate="section">
        <div className="youtube-inner">
          <div className="youtube-copy">
            <h2 id="youtube-title">Watch more stories on our YouTube channel</h2>
            <p className="youtube-subtitle">
              Prefer video? Explore patient journeys, clinical insights and rehabilitation guidance—built to
              help you understand your options and feel confident in your next step.
            </p>
            <div className="youtube-metrics" role="list" aria-label="YouTube community indicators">
              <div className="youtube-metric" role="listitem">
                <span className="youtube-metric-label">Subscribers</span>
                <span className="youtube-metric-value" aria-label="Subscriber count available on YouTube">
                  See latest on YouTube
                </span>
              </div>
              <div className="youtube-metric" role="listitem">
                <span className="youtube-metric-label">Views</span>
                <span className="youtube-metric-value" aria-label="View count available on YouTube">
                  See latest on YouTube
                </span>
              </div>
              <div className="youtube-metric" role="listitem">
                <span className="youtube-metric-label">Engagement</span>
                <span className="youtube-metric-value" aria-label="Engagement metrics available on YouTube">
                  Likes & comments
                </span>
              </div>
            </div>
            <a className="youtube-cta" href={youtubeChannelUrl} target="_blank" rel="noopener noreferrer">
              Watch More on YouTube
            </a>
          </div>

          <div className="youtube-grid" role="list" aria-label="Video previews">
            {youtubeCards.map((v) => (
              <a
                key={v.id}
                className="youtube-preview"
                role="listitem"
                href={v.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Watch video on YouTube: ${v.title}`}
              >
                <div className="youtube-preview-media" aria-hidden="true">
                  <img
                    src={v.thumbnailUrl}
                    alt={v.title ? `Thumbnail for ${v.title}` : 'YouTube video thumbnail'}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="youtube-preview-play" aria-hidden="true" />
                </div>
                <div className="youtube-preview-title">{v.title}</div>
                <div className="youtube-preview-meta">
                  <span className="youtube-preview-channel">{v.channelName}</span>
                  {v.durationSec ? (
                    <>
                      <span aria-hidden="true"> • </span>
                      <span className="youtube-preview-duration">{formatDuration(v.durationSec)}</span>
                    </>
                  ) : null}
                </div>
              </a>
            ))}
          </div>
          <div className="yt-probes" aria-hidden="true">
            {youtubeCards.map((v) => (
              <div key={v.id} id={`yt-probe-${v.id}`} />
            ))}
          </div>
        </div>
      </section>

      <section className="page-section">
        <header className="all-testimonials-header" ref={storiesSectionRef}>
          <p className="eyebrow">Real stories, real outcomes</p>
          <h2>Featured case studies</h2>
          <p className="intro">
            Read authentic patient experiences and learn how our team supports recovery through
            personalised, proximity-based care.
          </p>
        </header>
        <div className="testimonial-grid" ref={cardsRef} role="list" aria-label="Patient testimonials">
          {testimonials.map((t, i) => (
            <Link
              key={t.name}
              className="testimonial-card"
              to={t.to}
              data-animate="card"
              role="listitem"
              itemScope
              itemType="https://schema.org/Review"
              aria-label={`${t.name}: ${t.cta}`}
              itemProp="url"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="card-visual">
                <img
                  src={t.img}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                  className="card-img"
                />
                <div className="card-overlay" aria-hidden="true" />
              </div>
              <div className="card-content">
                <p className="card-meta">
                  <span className="meta-date">{t.date}</span>
                  <span aria-hidden="true"> • </span>
                  <span className="meta-read">{t.readMins} min read</span>
                </p>
                <h3 className="card-title">
                  <span>{t.name}</span>
                  <span className="card-arrow" aria-hidden="true">→</span>
                </h3>
                <p className="card-cta" aria-hidden="true">
                  {t.cta}
                </p>
              </div>
              <p className="sr-only" itemProp="reviewBody">“{t.quote}”</p>
              <div className="rating sr-only" aria-label={`Rated ${t.rating} out of 5`}>
                <span className="sr-only">{t.rating} out of 5</span>
              </div>
              <meta itemProp="itemReviewed" itemScope itemType="https://schema.org/MedicalClinic" />
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
};

export default AllTestimonialsPage;
