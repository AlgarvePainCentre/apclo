import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/components/TreatmentCategoryCarousel.css';

function prefersReducedMotion() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }

  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getScrollAmount(track) {
  const firstItem = track.querySelector('.treatment-category-carousel__item');

  if (!(firstItem instanceof HTMLElement)) {
    return Math.max(track.clientWidth * 0.85, 320);
  }

  const styles = window.getComputedStyle(track);
  const gap = Number.parseFloat(styles.columnGap || styles.gap || '0') || 0;
  return firstItem.offsetWidth + gap;
}

export function TreatmentCategoryCarousel({ items, ariaLabel }) {
  const trackRef = useRef(null);
  const trackId = useId().replace(/:/g, '');
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateControls = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const maxScrollLeft = Math.max(track.scrollWidth - track.clientWidth - 1, 0);
    setCanScrollPrev(track.scrollLeft > 1);
    setCanScrollNext(track.scrollLeft < maxScrollLeft);
  }, []);

  const scrollTrack = useCallback((direction) => {
    const track = trackRef.current;
    if (!track) return;

    track.scrollBy({
      left: getScrollAmount(track) * direction,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    });
  }, []);

  const jumpToEdge = useCallback((edge) => {
    const track = trackRef.current;
    if (!track) return;

    track.scrollTo({
      left: edge === 'start' ? 0 : track.scrollWidth,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    });
  }, []);

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === 'ArrowRight' || event.key === 'PageDown') {
        event.preventDefault();
        scrollTrack(1);
      }

      if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
        event.preventDefault();
        scrollTrack(-1);
      }

      if (event.key === 'Home') {
        event.preventDefault();
        jumpToEdge('start');
      }

      if (event.key === 'End') {
        event.preventDefault();
        jumpToEdge('end');
      }
    },
    [jumpToEdge, scrollTrack]
  );

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    updateControls();

    track.addEventListener('scroll', updateControls, { passive: true });
    window.addEventListener('resize', updateControls);

    return () => {
      track.removeEventListener('scroll', updateControls);
      window.removeEventListener('resize', updateControls);
    };
  }, [items.length, updateControls]);

  return (
    <div className="treatment-category-carousel" role="region" aria-label={ariaLabel}>
      <div className="treatment-category-carousel__controls" aria-hidden={items.length <= 1}>
        <button
          type="button"
          className="treatment-category-carousel__button"
          onClick={() => scrollTrack(-1)}
          disabled={!canScrollPrev}
          aria-controls={trackId}
          aria-label={`Scroll ${ariaLabel} to the left`}
        >
          <span aria-hidden="true">‹</span>
        </button>
        <button
          type="button"
          className="treatment-category-carousel__button"
          onClick={() => scrollTrack(1)}
          disabled={!canScrollNext}
          aria-controls={trackId}
          aria-label={`Scroll ${ariaLabel} to the right`}
        >
          <span aria-hidden="true">›</span>
        </button>
      </div>

      <ul
        id={trackId}
        ref={trackRef}
        className="treatment-category-carousel__track"
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        {items.map((item) => (
          <li key={item.id} className="treatment-category-carousel__item">
            <article className="treatment-item-card">
              <div className="treatment-item-media" aria-hidden="true">
                <img src={item.iconSrc} alt="" className="treatment-item-icon" loading="lazy" decoding="async" />
              </div>
              <div className="treatment-item-content">
                <h3 className="treatment-item-title">{item.title}</h3>
                <div className="treatment-item-divider" aria-hidden="true" />
                <p className="treatment-item-desc">{item.description}</p>
                <Link to={item.link} className="treatment-item-link" aria-label={`Learn more about ${item.title}`}>
                  <span>Learn more</span>
                  <span className="treatment-item-arrow" aria-hidden="true">
                    ›
                  </span>
                </Link>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
