import type { CSSProperties } from 'react';

type SkeletonBoxProps = {
  className?: string;
  style?: CSSProperties;
};

function SkeletonBox({ className = '', style }: SkeletonBoxProps) {
  return <span className={`app-skeleton ${className}`.trim()} style={style} aria-hidden="true" />;
}

type GridSkeletonProps = {
  count?: number;
  className?: string;
};

export function ArticleFeedSkeleton({ count = 6, className = '' }: GridSkeletonProps) {
  return (
    <div className={`app-skeleton-grid app-skeleton-grid-articles ${className}`.trim()} role="status" aria-live="polite">
      <span className="sr-only">Loading articles</span>
      {Array.from({ length: count }, (_, index) => (
        <article key={index} className="app-skeleton-card app-skeleton-articleCard">
          <SkeletonBox className="app-skeleton-image app-skeleton-articleImage" />
          <div className="app-skeleton-cardBody">
            <SkeletonBox className="app-skeleton-line app-skeleton-line-short" />
            <SkeletonBox className="app-skeleton-line app-skeleton-line-title" />
            <SkeletonBox className="app-skeleton-line" />
            <SkeletonBox className="app-skeleton-line app-skeleton-line-medium" />
            <div className="app-skeleton-inline">
              <SkeletonBox className="app-skeleton-avatar" />
              <div className="app-skeleton-stack">
                <SkeletonBox className="app-skeleton-line app-skeleton-line-short" />
                <SkeletonBox className="app-skeleton-line app-skeleton-line-xs" />
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export function ImageGridSkeleton({ count = 6, className = '' }: GridSkeletonProps) {
  return (
    <div className={`app-skeleton-grid app-skeleton-grid-images ${className}`.trim()} role="status" aria-live="polite">
      <span className="sr-only">Loading visual content</span>
      {Array.from({ length: count }, (_, index) => (
        <article key={index} className="app-skeleton-card app-skeleton-imageCard">
          <SkeletonBox className="app-skeleton-image app-skeleton-imageCardMedia" />
          <div className="app-skeleton-cardBody">
            <SkeletonBox className="app-skeleton-line app-skeleton-line-title" />
            <SkeletonBox className="app-skeleton-line" />
            <SkeletonBox className="app-skeleton-line app-skeleton-line-medium" />
          </div>
        </article>
      ))}
    </div>
  );
}

export function ProfileGridSkeleton({ count = 4, className = '' }: GridSkeletonProps) {
  return (
    <div className={`app-skeleton-grid app-skeleton-grid-profiles ${className}`.trim()} role="status" aria-live="polite">
      <span className="sr-only">Loading profiles</span>
      {Array.from({ length: count }, (_, index) => (
        <article key={index} className="app-skeleton-card app-skeleton-profileCard">
          <SkeletonBox className="app-skeleton-profileImage" />
          <div className="app-skeleton-cardBody">
            <SkeletonBox className="app-skeleton-line app-skeleton-line-title" />
            <SkeletonBox className="app-skeleton-line app-skeleton-line-medium" />
          </div>
        </article>
      ))}
    </div>
  );
}

export function RouteShellSkeleton() {
  return (
    <div className="app-route-skeleton" role="status" aria-live="polite">
      <span className="sr-only">Loading page</span>
      <div className="app-route-skeleton-shell">
        <SkeletonBox className="app-skeleton-header" />
        <SkeletonBox className="app-skeleton-hero" />
        <ArticleFeedSkeleton count={3} className="app-route-skeleton-section" />
        <ImageGridSkeleton count={3} className="app-route-skeleton-section" />
      </div>
    </div>
  );
}
