import React from 'react';

export type TreatmentFaqItem = {
  id: string;
  question: string;
  answer: string;
};

type TreatmentFaqProps = {
  title: string;
  titleId: string;
  items: TreatmentFaqItem[];
  initialActiveId?: string | null;
  className?: string;
};

export const TreatmentFaq: React.FC<TreatmentFaqProps> = ({
  title,
  titleId,
  items,
  initialActiveId,
  className,
}) => {
  const [activeId, setActiveId] = React.useState<string | null>(
    initialActiveId ?? (items[0]?.id ?? null),
  );
  const baseId = titleId.replace(/-title$/, '') || 'treatment-faq';

  return (
    <div className={['cryo-faq-inner', className].filter(Boolean).join(' ')} aria-labelledby={titleId}>
      <header className="cryo-faq-header">
        <h2 id={titleId} className="cryo-faq-title">
          {title}
        </h2>
      </header>

      <div className="cryo-faq-card" role="list" aria-label={title}>
        {items.map((item) => {
          const isActive = item.id === activeId;
          const triggerId = `${baseId}-${item.id}`;
          const panelId = `${baseId}-panel-${item.id}`;

          return (
            <div key={item.id} className="cryo-faq-item" role="listitem">
              <button
                id={triggerId}
                type="button"
                className="cryo-faq-trigger"
                aria-expanded={isActive}
                aria-controls={panelId}
                onClick={() => setActiveId(isActive ? null : item.id)}
              >
                <span className="cryo-faq-question">{item.question}</span>
                <span className="cryo-faq-icon" aria-hidden="true">
                  {isActive ? '−' : '+'}
                </span>
              </button>
              <div
                id={panelId}
                className="cryo-faq-panel"
                data-open={isActive ? 'true' : 'false'}
                role="region"
                aria-labelledby={triggerId}
                aria-hidden={!isActive}
              >
                <p className="cryo-faq-answer">{item.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
