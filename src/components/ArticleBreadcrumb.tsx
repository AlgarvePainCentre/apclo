import React from 'react';
import { Link } from 'react-router-dom';

export type ArticleBreadcrumbItem = {
  label: string;
  to?: string;
  isCurrent?: boolean;
};

type ArticleBreadcrumbProps = {
  items: ArticleBreadcrumbItem[];
};

export default function ArticleBreadcrumb({ items }: ArticleBreadcrumbProps) {
  const normalized = items
    .filter(Boolean)
    .map((item, idx) => ({
      ...item,
      isCurrent: Boolean(item.isCurrent) || idx === items.length - 1,
    }));

  return (
    <nav className="article-breadcrumb" aria-label="Breadcrumb">
      <ol className="article-breadcrumb-list">
        {normalized.flatMap((item, idx) => {
          const nodes: React.ReactNode[] = [];
          if (idx > 0) nodes.push(<li key={`sep-${idx}`} aria-hidden="true">›</li>);
          nodes.push(
            item.isCurrent || !item.to ? (
              <li key={`item-${idx}`} aria-current="page">
                {item.label}
              </li>
            ) : (
              <li key={`item-${idx}`}>
                <Link to={item.to} className="article-breadcrumb-link">
                  {item.label}
                </Link>
              </li>
            ),
          );
          return nodes;
        })}
      </ol>
    </nav>
  );
}

