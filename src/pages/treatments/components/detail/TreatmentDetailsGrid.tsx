import React from 'react';

export type TreatmentDetailsCard = {
  id: string;
  title: string;
  body?: string;
  list?: {
    type: 'ul' | 'ol';
    ariaLabel: string;
    items: string[];
  };
};

type TreatmentDetailsGridProps = {
  title: string;
  titleId: string;
  cards: TreatmentDetailsCard[];
  className?: string;
  intro?: string;
};

export const TreatmentDetailsGrid: React.FC<TreatmentDetailsGridProps> = ({
  title,
  titleId,
  cards,
  className,
  intro,
}) => {
  const reactId = React.useId();

  return (
    <section className={['page-section', className].filter(Boolean).join(' ')} aria-labelledby={titleId}>
      <header className="minimally-invasive-treatment-details-header">
        <h2 id={titleId} className="minimally-invasive-treatment-details-title">
          {title}
        </h2>
        {intro ? <p className="minimally-invasive-treatment-details-intro">{intro}</p> : null}
      </header>

      <div className="minimally-invasive-treatment-details-grid" role="list" aria-label={title}>
        {cards.map((card) => {
          const headingId = `${reactId}-${card.id}-title`;
          const ListTag = card.list?.type ?? 'ul';
          const listClassName =
            card.list?.type === 'ol' ? 'minimally-invasive-treatment-steps' : 'minimally-invasive-treatment-list';

          return (
            <article key={card.id} className="minimally-invasive-treatment-card" role="listitem" aria-labelledby={headingId}>
              <h3 id={headingId} className="minimally-invasive-treatment-card-title">
                {card.title}
              </h3>
              {card.body ? <p className="minimally-invasive-treatment-card-body">{card.body}</p> : null}
              {card.list ? (
                <ListTag className={listClassName} aria-label={card.list.ariaLabel}>
                  {card.list.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ListTag>
              ) : null}
            </article>
          );
        })}
      </div>
    </section>
  );
};
