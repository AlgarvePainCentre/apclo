import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  specialitiesCategories,
  treatmentsCategories,
  resourceCategories,
} from '../data/navigation';

// Linear-style footer: flat link columns (no accordion). The long service
// lists show up to MAX_VISIBLE links and hide the rest behind a "Show N more"
// disclosure, so the footer stays compact up front but complete for anyone
// who wants the full list without leaving the page.
const MAX_VISIBLE = 8;

const flatten = (categories) => categories.flatMap((category) => category.items);

const specialityLinks = flatten(specialitiesCategories);
const treatmentLinks = flatten(treatmentsCategories);

const resourceLinks = [
  { label: 'All resources', path: '/resources' },
  ...flatten(resourceCategories),
];

const companyLinks = [
  { label: 'About', path: '/about' },
  { label: 'Careers', path: '/company/careers' },
  { label: 'Press', path: '/company/press' },
  { label: 'Terms of Service', path: '/company/terms-of-service' },
  { label: 'Privacy policy', path: '/company/privacy-policy' },
  { label: 'Cookie policy', path: '/company/cookie-policy' },
  { label: 'Cookies', path: '/company/cookies' },
  { label: 'Accessibility statement', path: '/company/accessibility-statement' },
];

const connectLinks = [
  { label: 'Contact us', path: '/contact' },
  { label: 'Instagram', href: 'https://www.instagram.com/algarvepaincentre/' },
  { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=100068862086045' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/algarve-pain-centre/' },
];

function FooterLink({ item }) {
  if (item.href) {
    return (
      <a
        className="footer-link"
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {item.label}
      </a>
    );
  }
  return (
    <Link className="footer-link" to={item.path}>
      {item.label}
    </Link>
  );
}

function FooterColumn({ title, items, moreNoun }) {
  const [expanded, setExpanded] = useState(false);
  const hasMore = items.length > MAX_VISIBLE;
  const visible = hasMore && !expanded ? items.slice(0, MAX_VISIBLE) : items;
  const remaining = items.length - MAX_VISIBLE;

  return (
    <nav className="footer-column footer-column--links" aria-label={title}>
      <h3 className="footer-column-title">{title}</h3>
      <ul className="footer-column-list">
        {visible.map((item) => (
          <li key={item.path || item.href} className="footer-column-item">
            <FooterLink item={item} />
          </li>
        ))}
        {hasMore && (
          <li className="footer-column-item">
            <button
              type="button"
              className="footer-more"
              aria-expanded={expanded}
              onClick={() => setExpanded((value) => !value)}
            >
              <span>
                {expanded ? 'Show less' : `Show ${remaining} more ${moreNoun}`}
              </span>
              <svg
                className="footer-more-chevron"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M6 9l6 6 6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default function Footer() {
  return (
    <footer className="site-footer" aria-labelledby="site-footer-heading">
      <div className="site-footer-inner">
        <div className="site-footer-top">
          <h2 id="site-footer-heading" className="sr-only">
            Site footer navigation
          </h2>

          <div className="footer-brand">
            <img
              className="footer-brand-logo"
              src="/assets/apc-branco.svg"
              alt="Algarve Pain Centre"
            />
            <address className="footer-brand-info">
              <p className="footer-brand-address">
                Av. do Mar, Vale do Lobo
                <br />
                8135-107 Almancil, Algarve
              </p>
              <p className="footer-brand-contact">
                <a href="tel:+351915915001" className="footer-link">
                  +351 915 915 001
                </a>
                <br />
                <a href="mailto:info@algarvepaincentre.com" className="footer-link">
                  info@algarvepaincentre.com
                </a>
              </p>
            </address>
          </div>

          <FooterColumn title="Specialities" items={specialityLinks} moreNoun="specialities" />
          <FooterColumn title="Treatments" items={treatmentLinks} moreNoun="treatments" />
          <FooterColumn title="Company" items={companyLinks} />
          <FooterColumn title="Resources" items={resourceLinks} />
          <FooterColumn title="Connect" items={connectLinks} />
        </div>

        <div className="site-footer-bottom">
          <p className="site-footer-meta">
            © {new Date().getFullYear()} Algarve Pain Centre. All rights reserved.
          </p>
          <div className="site-footer-credits">
            <a
              href="https://venenu.com/"
              className="footer-credits-link"
              aria-label="Visit Venenu Agency"
              target="_blank"
              rel="noopener noreferrer"
            >
              Design by Venenu Agency
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
