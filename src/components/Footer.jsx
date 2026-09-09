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
  { label: 'Contacts', path: '/contact' },
  { label: 'Press', path: '/company/press' },
  { label: 'Terms of Service', path: '/company/terms-of-service' },
  { label: 'Privacy policy', path: '/company/privacy-policy' },
  { label: 'Cookie policy', path: '/company/cookie-policy' },
  { label: 'Cookies', path: '/company/cookies' },
  { label: 'Accessibility statement', path: '/company/accessibility-statement' },
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
  // Only the long service lists (which pass moreNoun) collapse; fixed columns
  // like Company or Resources always show every link.
  const hasMore = Boolean(moreNoun) && items.length > MAX_VISIBLE;
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
            <div className="footer-brand-social" aria-label="Social media">
              <a
                href="https://www.instagram.com/algarvepaincentre/"
                className="footer-social-link"
                aria-label="Visit Algarve Pain Centre on Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 256 256" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <title>Instagram</title>
                  <path d="M176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24ZM128,176a48,48,0,1,1,48-48A48.05,48.05,0,0,1,128,176Zm60-96a12,12,0,1,1,12-12A12,12,0,0,1,188,80Zm-28,48a32,32,0,1,1-32-32A32,32,0,0,1,160,128Z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=100068862086045"
                className="footer-social-link"
                aria-label="Visit Algarve Pain Centre on Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 256 256" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <title>Facebook</title>
                  <path d="M232,128a104.16,104.16,0,0,1-91.55,103.26,4,4,0,0,1-4.45-4V152h24a8,8,0,0,0,8-8.53,8.17,8.17,0,0,0-8.25-7.47H136V112a16,16,0,0,1,16-16h16a8,8,0,0,0,8-8.53A8.17,8.17,0,0,0,167.73,80H152a32,32,0,0,0-32,32v24H96a8,8,0,0,0-8,8.53A8.17,8.17,0,0,0,96.27,152H120v75.28a4,4,0,0,1-4.44,4A104.15,104.15,0,0,1,24.07,124.09c2-54,45.74-97.9,99.78-100A104.12,104.12,0,0,1,232,128Z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/algarve-pain-centre/"
                className="footer-social-link"
                aria-label="Visit Algarve Pain Centre on LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 256 256" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <title>LinkedIn</title>
                  <path d="M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24ZM96,176a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0ZM88,96a12,12,0,1,1,12-12A12,12,0,0,1,88,96Zm96,80a8,8,0,0,1-16,0V140a20,20,0,0,0-40,0v36a8,8,0,0,1-16,0V112a8,8,0,0,1,15.79-1.78A36,36,0,0,1,184,140Z" />
                </svg>
              </a>
            </div>
          </div>

          <FooterColumn title="Company" items={companyLinks} />
          <FooterColumn title="Specialities" items={specialityLinks} moreNoun="specialities" />
          <FooterColumn title="Treatments" items={treatmentLinks} moreNoun="treatments" />
          <FooterColumn title="Resources" items={resourceLinks} />
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
