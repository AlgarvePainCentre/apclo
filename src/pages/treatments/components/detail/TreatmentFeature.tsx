import React from 'react';
import { Link } from 'react-router-dom';

type Cta = {
  label: string;
  to: string;
  ariaLabel?: string;
};

type TreatmentFeatureProps = {
  title: string;
  titleId: string;
  imageSrc: string;
  imageAlt: string;
  paragraphs: string[];
  primaryCta: Cta;
  secondaryCta?: Cta;
  className?: string;
};

export const TreatmentFeature: React.FC<TreatmentFeatureProps> = ({
  title,
  titleId,
  imageSrc,
  imageAlt,
  paragraphs,
  primaryCta,
  secondaryCta,
  className,
}) => {
  return (
    <section className={['page-section treatments-feature', className].filter(Boolean).join(' ')} aria-labelledby={titleId}>
      <div className="treatments-feature-inner">
        <div className="treatments-feature-media">
          <img
            className="treatments-feature-video"
            src={imageSrc}
            alt={imageAlt}
            decoding="async"
            loading="lazy"
          />
        </div>

        <div className="treatments-feature-copy">
          <h2 id={titleId} className="treatments-feature-title">
            {title}
          </h2>
          <div className="treatments-feature-accent" aria-hidden="true" />

          {paragraphs.map((p) => (
            <p key={p} className="treatments-feature-body">
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};
