import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { getAllTreatmentNavItems } from './treatmentNavData';

type TreatmentBreadcrumbProps = {
  currentLabel: string;
};

export const TreatmentBreadcrumb: React.FC<TreatmentBreadcrumbProps> = ({ currentLabel }) => {
  const location = useLocation();
  const navItems = React.useMemo(() => getAllTreatmentNavItems(location.pathname), [location.pathname]);
  const listRef = React.useRef<HTMLUListElement | null>(null);
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  const updateScrollState = React.useCallback(() => {
    const list = listRef.current;
    if (!list) {
      setCanScrollPrev(false);
      setCanScrollNext(false);
      return;
    }

    const maxScrollLeft = Math.max(0, list.scrollWidth - list.clientWidth);
    const currentScrollLeft = list.scrollLeft;
    const edgeThreshold = 2;

    setCanScrollPrev(currentScrollLeft > edgeThreshold);
    setCanScrollNext(currentScrollLeft < maxScrollLeft - edgeThreshold);
  }, []);

  React.useEffect(() => {
    updateScrollState();

    const list = listRef.current;
    if (!list) return;

    const handleScroll = () => updateScrollState();

    list.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(handleScroll);
      resizeObserver.observe(list);
    }

    return () => {
      list.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      resizeObserver?.disconnect();
    };
  }, [navItems, updateScrollState]);

  const scrollCarousel = (direction: 'prev' | 'next') => {
    const list = listRef.current;
    if (!list) return;

    const distance = Math.max(list.clientWidth * 0.72, 240);
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    list.scrollBy({
      left: direction === 'next' ? distance : -distance,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <>
      <nav className="treatment-breadcrumb-root article-breadcrumb treatment-breadcrumb" aria-label="Breadcrumb">
        <ol className="article-breadcrumb-list">
          <li>
            <Link to="/" className="article-breadcrumb-link">
              Home
            </Link>
          </li>
          <li aria-hidden="true">›</li>
          <li>
            <Link to="/treatments" className="article-breadcrumb-link">
              Treatments
            </Link>
          </li>
          <li aria-hidden="true">›</li>
          <li aria-current="page">{currentLabel}</li>
        </ol>
      </nav>

      {navItems ? (
        <nav className="treatment-related-nav" aria-label="All treatments navigation">
          <div className="treatment-related-nav-shell">
            <button
              type="button"
              className="treatment-related-nav-control treatment-related-nav-control--prev"
              aria-label="Scroll treatments to the left"
              onClick={() => scrollCarousel('prev')}
              disabled={!canScrollPrev}
            >
              <span aria-hidden="true">‹</span>
            </button>

            <ul ref={listRef} className="treatment-related-nav-list">
              {navItems.map((item) => (
              <li key={item.path} className="treatment-related-nav-item">
                <NavLink
                  end
                  to={item.path}
                  className={({ isActive }) =>
                    isActive ? 'treatment-related-nav-link is-active' : 'treatment-related-nav-link'
                  }
                >
                  <span className="treatment-related-nav-icon-shell" aria-hidden="true">
                    <img
                      src={item.iconSrc}
                      alt=""
                      className="treatment-related-nav-icon"
                      loading="lazy"
                      decoding="async"
                    />
                  </span>
                  <span className="treatment-related-nav-label">{item.label}</span>
                </NavLink>
              </li>
              ))}
            </ul>

            <button
              type="button"
              className="treatment-related-nav-control treatment-related-nav-control--next"
              aria-label="Scroll treatments to the right"
              onClick={() => scrollCarousel('next')}
              disabled={!canScrollNext}
            >
              <span aria-hidden="true">›</span>
            </button>
          </div>
        </nav>
      ) : null}
    </>
  );
};
