import React from 'react';

type NavItem = {
  id: string;
  label: string;
};

type LegalDocumentPageProps = {
  eyebrow?: string;
  title: string;
  summary: string;
  lastUpdated: string;
  effectiveDate?: string;
  navItems: NavItem[];
  children: React.ReactNode;
};

export default function LegalDocumentPage({
  eyebrow = 'Legal Information',
  title,
  summary,
  lastUpdated,
  effectiveDate,
  navItems,
  children,
}: LegalDocumentPageProps) {
  return (
    <main className="page-main legal-page">
      <article className="legal-page__article">
        <header className="legal-page__header">
          <p className="legal-page__eyebrow">{eyebrow}</p>
          <h1 className="legal-page__title">{title}</h1>
          <p className="legal-page__summary">{summary}</p>

          <dl className="legal-page__meta">
            <div className="legal-page__meta-item">
              <dt>Last updated:</dt>
              <dd>{lastUpdated}</dd>
            </div>
            {effectiveDate ? (
              <div className="legal-page__meta-item">
                <dt>Effective date:</dt>
                <dd>{effectiveDate}</dd>
              </div>
            ) : null}
          </dl>
        </header>

        <div className="legal-page__grid">
          <nav className="legal-page__nav" aria-label={`${title} page navigation`}>
            <h2 className="legal-page__nav-title">On this page</h2>
            <ol className="legal-page__nav-list">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a className="legal-page__nav-link" href={`#${item.id}`}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="legal-page__content">{children}</div>
        </div>
      </article>
    </main>
  );
}
