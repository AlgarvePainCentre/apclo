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
                <svg fill="currentColor" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
                  <title>Instagram</title>
                  <path d="M 9.9980469 3 C 6.1390469 3 3 6.1419531 3 10.001953 L 3 20.001953 C 3 23.860953 6.1419531 27 10.001953 27 L 20.001953 27 C 23.860953 27 27 23.858047 27 19.998047 L 27 9.9980469 C 27 6.1390469 23.858047 3 19.998047 3 L 9.9980469 3 z M 22 7 C 22.552 7 23 7.448 23 8 C 23 8.552 22.552 9 22 9 C 21.448 9 21 8.552 21 8 C 21 7.448 21.448 7 22 7 z M 15 9 C 18.309 9 21 11.691 21 15 C 21 18.309 18.309 21 15 21 C 11.691 21 9 18.309 9 15 C 9 11.691 11.691 9 15 9 z M 15 11 A 4 4 0 0 0 11 15 A 4 4 0 0 0 15 19 A 4 4 0 0 0 19 15 A 4 4 0 0 0 15 11 z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=100068862086045"
                className="footer-social-link"
                aria-label="Visit Algarve Pain Centre on Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg fill="currentColor" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                  <title>Facebook</title>
                  <path d="M30.996 16.091c-0.001-8.281-6.714-14.994-14.996-14.994s-14.996 6.714-14.996 14.996c0 7.455 5.44 13.639 12.566 14.8l0.086 0.012v-10.478h-3.808v-4.336h3.808v-3.302c-0.019-0.167-0.029-0.361-0.029-0.557 0-2.923 2.37-5.293 5.293-5.293 0.141 0 0.281 0.006 0.42 0.016l-0.018-0.001c1.199 0.017 2.359 0.123 3.491 0.312l-0.134-0.019v3.69h-1.892c-0.086-0.012-0.185-0.019-0.285-0.019-1.197 0-2.168 0.97-2.168 2.168 0 0.068 0.003 0.135 0.009 0.202l-0.001-0.009v2.812h4.159l-0.665 4.336h-3.494v10.478c7.213-1.174 12.653-7.359 12.654-14.814v-0z"></path>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/algarve-pain-centre/"
                className="footer-social-link"
                aria-label="Visit Algarve Pain Centre on LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg fill="currentColor" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
                  <title>LinkedIn</title>
                  <path d="M478.234 600.75V1920H.036V600.75h478.198Zm720.853-2.438v77.737c69.807-45.056 150.308-71.249 272.38-71.249 397.577 0 448.521 308.666 448.521 577.562v737.602h-480.6v-700.836c0-117.867-42.173-140.215-120.15-140.215-74.134 0-120.151 23.55-120.151 140.215v700.836h-480.6V598.312h480.6ZM239.099 0c131.925 0 239.099 107.294 239.099 239.099s-107.174 239.099-239.1 239.099C107.295 478.198 0 370.904 0 239.098 0 107.295 107.294 0 239.099 0Z" fillRule="evenodd" />
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
