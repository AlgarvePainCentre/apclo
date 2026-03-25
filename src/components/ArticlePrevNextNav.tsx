import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export type ArticleNavItem = {
  to: string;
  title: string;
};

type ArticlePrevNextNavProps = {
  items: ArticleNavItem[];
  ariaLabel?: string;
  previousLabel?: string;
  nextLabel?: string;
};

/**
 * Renders the same DOM structure/classes used by the Treatments page next/prev navigation:
 * - section.article-navigation-container
 * - div.article-nav-item.prev/next > div.article-nav-content > span.article-nav-label + h2.article-nav-title
 *
 * Use this component when you want consistent cross-page navigation styling/behavior.
 */
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

  const go = (to: string) => {
    navigate(to);
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  const onKeyActivate = (to: string) => (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    e.preventDefault();
    go(to);
  };

  if (currentIndex === -1 || (!previous && !next)) return null;

  return (
    <section className="article-navigation-container" aria-label={ariaLabel}>
      {previous ? (
        <div
          className="article-nav-item prev"
          role="link"
          tabIndex={0}
          aria-label={`${previousLabel}: ${previous.title}`}
          onClick={() => go(previous.to)}
          onKeyDown={onKeyActivate(previous.to)}
        >
          <div className="article-nav-content">
            <span className="article-nav-label">{previousLabel}</span>
            <h2 className="article-nav-title">
              <span className="arrow">←</span> {previous.title}
            </h2>
          </div>
        </div>
      ) : null}

      {next ? (
        <div
          className="article-nav-item next"
          role="link"
          tabIndex={0}
          aria-label={`${nextLabel}: ${next.title}`}
          onClick={() => go(next.to)}
          onKeyDown={onKeyActivate(next.to)}
        >
          <div className="article-nav-content">
            <span className="article-nav-label">{nextLabel}</span>
            <h2 className="article-nav-title">
              {next.title} <span className="arrow">→</span>
            </h2>
          </div>
        </div>
      ) : null}
    </section>
  );
}

