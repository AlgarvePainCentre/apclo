import { useState } from 'react';
import { Link } from 'react-router-dom';
import { specialitiesCategories, treatmentsCategories, resourceCategories } from '../data/navigation';

// Service columns keep their category grouping (Pain Medicine, Surgical
// Treatments, ...) and collapse into an accordion on mobile to cut the amount
// of information shown up front; on desktop they stay expanded as columns.
const footerNav = [
  { title: 'Specialities', slug: 'specialities', categories: specialitiesCategories },
  { title: 'Treatments', slug: 'treatments', categories: treatmentsCategories },
  { title: 'Resources', slug: 'resources', categories: resourceCategories },
];

function isDesktop() {
  return typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches;
}

function FooterServiceColumn({ title, slug, categories }) {
  // Open by default on desktop; collapsed on mobile (accordion).
  const [open, setOpen] = useState(isDesktop);
  const panelId = `footer-panel-${slug}`;

  return (
    <section
      className={`footer-column footer-column--service${open ? ' is-open' : ''}`}
      aria-label={title}
    >
      <h3 className="footer-column-title footer-card-title-1">
        <button
          type="button"
          className="footer-column-toggle"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((value) => !value)}
        >
          <span>{title}</span>
          <svg className="footer-column-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </h3>
      <div className="footer-column-content" id={panelId}>
        {categories.map((category) => (
          <div className="footer-subgroup" key={category.title}>
            <h4 className="footer-subgroup-title">{category.title}</h4>
            <ul className="footer-column-list">
              {category.items.map((item) => (
                <li key={item.path} className="footer-column-item">
                  <Link to={item.path} className="footer-link">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
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
          <section
            className="footer-column footer-column-health"
            aria-label="Health center information"
          >
            <img
              src="/assets/apc-branco.svg"
              alt="Algarve Pain Centre"
              aria-label="Algarve Pain Centre logo"
            />
            <address className="footer-health-info" style={{ fontStyle: 'normal' }}>
              <p className="footer-health-address">
                Av. do Mar, Vale do Lobo
                <br />
                8135-107 Almancil, Algarve
              </p>
              <p className="footer-health-contact">
                <a href="tel:+351915915001" className="footer-link">
                  +351 915 915 001
                </a>
                <br />
                <a href="mailto:info@algarvepaincentre.com" className="footer-link">
                  info@algarvepaincentre.com
                </a>
              </p>
            </address>
            <div className="footer-health-secondary">
              <div className="footer-subcolumn">
                <h3 className="footer-column-title footer-card-title-1">Company</h3>
                <div className="footer-card-title"></div>
                <ul className="footer-column-list">
                  <li className="footer-column-item">
                    <Link to="/about" className="footer-link">
                      About
                    </Link>
                  </li>
                  <li className="footer-column-item">
                    <Link
                      to="/company/careers"
                      className="footer-link"
                    >
                      Careers
                    </Link>
                  </li>
                  <li className="footer-column-item">
                    <Link
                      to="/company/press"
                      className="footer-link"
                    >
                      Press
                    </Link>
                  </li>
                  <li className="footer-column-item">
                    <Link
                      to="/company/terms-of-service"
                      className="footer-link"
                    >
                      Terms of Service
                    </Link>
                  </li>
                  <li className="footer-column-item">
                    <Link
                      to="/company/privacy-policy"
                      className="footer-link"
                    >
                      Privacy policy
                    </Link>
                  </li>
                  <li className="footer-column-item">
                    <Link
                      to="/company/cookie-policy"
                      className="footer-link"
                    >
                      Cookie policy
                    </Link>
                  </li>
                  <li className="footer-column-item">
                    <Link
                      to="/company/cookies"
                      className="footer-link"
                    >
                      Cookies
                    </Link>
                  </li>
                  <li className="footer-column-item">
                    <Link
                      to="/company/accessibility-statement"
                      className="footer-link"
                    >
                      Accessibility statement
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </section>
          {footerNav.map((column) => (
            <FooterServiceColumn
              key={column.slug}
              title={column.title}
              slug={column.slug}
              categories={column.categories}
            />
          ))}
        </div>
        <div className="site-footer-bottom">
          <div className="site-footer-social" aria-label="Social media">
            <a
              href="https://www.instagram.com/algarvepaincentre/"
              className="footer-social-link"
              aria-label="Visit Algarve Pain Centre on Instagram"
            >
              <svg
                fill="currentColor"
                viewBox="0 0 30 30"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>instagram</title>
                <path d="M 9.9980469 3 C 6.1390469 3 3 6.1419531 3 10.001953 L 3 20.001953 C 3 23.860953 6.1419531 27 10.001953 27 L 20.001953 27 C 23.860953 27 27 23.858047 27 19.998047 L 27 9.9980469 C 27 6.1390469 23.858047 3 19.998047 3 L 9.9980469 3 z M 22 7 C 22.552 7 23 7.448 23 8 C 23 8.552 22.552 9 22 9 C 21.448 9 21 8.552 21 8 C 21 7.448 21.448 7 22 7 z M 15 9 C 18.309 9 21 11.691 21 15 C 21 18.309 18.309 21 15 21 C 11.691 21 9 18.309 9 15 C 9 11.691 11.691 9 15 9 z M 15 11 A 4 4 0 0 0 11 15 A 4 4 0 0 0 15 19 A 4 4 0 0 0 19 15 A 4 4 0 0 0 15 11 z" />
              </svg>
            </a>




















            <a
              href="https://www.facebook.com/profile.php?id=100068862086045"
              className="footer-social-link"
              aria-label="Visit Algarve Pain Centre on Facebook"
            >
              <svg
                fill="currentColor"
                viewBox="0 0 32 32"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>facebook</title>
                <path d="M30.996 16.091c-0.001-8.281-6.714-14.994-14.996-14.994s-14.996 6.714-14.996 14.996c0 7.455 5.44 13.639 12.566 14.8l0.086 0.012v-10.478h-3.808v-4.336h3.808v-3.302c-0.019-0.167-0.029-0.361-0.029-0.557 0-2.923 2.37-5.293 5.293-5.293 0.141 0 0.281 0.006 0.42 0.016l-0.018-0.001c1.199 0.017 2.359 0.123 3.491 0.312l-0.134-0.019v3.69h-1.892c-0.086-0.012-0.185-0.019-0.285-0.019-1.197 0-2.168 0.97-2.168 2.168 0 0.068 0.003 0.135 0.009 0.202l-0.001-0.009v2.812h4.159l-0.665 4.336h-3.494v10.478c7.213-1.174 12.653-7.359 12.654-14.814v-0z"></path>
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/company/algarve-pain-centre/"
              className="footer-social-link"
              aria-label="Visit Algarve Pain Centre on LinkedIn"
            >
              <svg
                fill="currentColor"
                viewBox="0 0 1920 1920"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M478.234 600.75V1920H.036V600.75h478.198Zm720.853-2.438v77.737c69.807-45.056 150.308-71.249 272.38-71.249 397.577 0 448.521 308.666 448.521 577.562v737.602h-480.6v-700.836c0-117.867-42.173-140.215-120.15-140.215-74.134 0-120.151 23.55-120.151 140.215v700.836h-480.6V598.312h480.6ZM239.099 0c131.925 0 239.099 107.294 239.099 239.099s-107.174 239.099-239.1 239.099C107.295 478.198 0 370.904 0 239.098 0 107.295 107.294 0 239.099 0Z"
                  fillRule="evenodd"
                />
              </svg>
            </a>
          </div>

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
              Design by<br />
              Venenu Agency
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
