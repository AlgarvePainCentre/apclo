import React from 'react';

type TreatmentHeroProps = {
  title: string;
  subtitle: string;
  ariaLabel: string;
  heroClassName?: string;
  heroImage: string;
};

export const TreatmentHero: React.FC<TreatmentHeroProps> = ({
  title,
  subtitle,
  ariaLabel,
  heroClassName,
  heroImage,
}) => {
  return (
    <header
      className={["treatment-hero-root", "treatment-hero-root", 'psx-hero treatment-hero', heroClassName].filter(Boolean).join(' ')}
      aria-label={ariaLabel}
      style={{ ['--treatment-hero-image' as any]: `url('${heroImage}')` }}
    >
      <div className="psx-hero-backdrop" aria-hidden="true" />
      <div className="psx-hero-inner">
        <p className="psx-hero-eyebrow">Treatment</p>
        <h1 className="psx-hero-title">{title}</h1>
        <p className="psx-hero-subtitle">{subtitle}</p>
      </div>
    </header>
  );
};
