import { Link } from 'react-router-dom';
import { specialitiesCategories, treatmentsCategories, resourceCategories } from './Navbar';

const footerColumns = [
  {
    title: 'Specialities',
    items: specialitiesCategories.flatMap((category) =>
      category.items.map((item) => ({
        label: item.label,
        to: item.path,
      }))
    ),
  },
  {
    title: 'Treatments',
    items: treatmentsCategories.flatMap((category) =>
      category.items.map((item) => ({
        label: item.label,
        to: item.path,
      }))
    ),
  },
  {
    title: 'Resource',
    items: resourceCategories.flatMap((category) =>
      category.items.map((item) => ({
        label: item.label,
        to: item.path,
      }))
    ),
  },
];

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
            <h3 className="footer-health-address">
              Av. do Mar
              <br />
              Vale do Lobo, Algarve
              <br />
              8135-107 Almancil
            </h3>
            <a
              href="tel:+351915915001"
              className="footer-link footer-health-contact"
            >
              +351 915 915 001
            </a>
            <a
              href="mailto:info@algarvepaincentre.com"
              className="footer-link footer-health-contact"
            >
              info@algarvepaincentre.com
            </a>
            <div className="footer-health-secondary">
              <div className="footer-subcolumn">
                <h3 className="footer-column-title">Company</h3>
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
                      to="/company/accessibility-statement"
                      className="footer-link"
                    >
                      Accessibility statement
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="footer-subcolumn">
                <h3 className="footer-column-title">Get help</h3>
                <ul className="footer-column-list">
                  <li className="footer-column-item">
                    <Link to="/support" className="footer-link" aria-label="Support">
                      Support
                    </Link>
                  </li>
                  <li className="footer-column-item">
                    <Link to="/pricing" className="footer-link" aria-label="Pricing">
                      Pricing
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </section>
          {footerColumns.map((column) => (
            <section
              key={column.title}
              className="footer-column"
              aria-label={column.title}
            >
              <h3 className="footer-column-title">{column.title}</h3>
              <ul className="footer-column-list">
                {column.items.map((item) => (
                  <li key={item.to} className="footer-column-item">
                    {item.to.startsWith('/') ? (
                      <Link
                        to={item.to}
                        className="footer-link"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <a
                        href={item.to}
                        className="footer-link"
                        aria-label={item.label}
                      >
                        {item.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
        <div className="site-footer-bottom">
          <div className="site-footer-social" aria-label="Social media">
            <a
              href="#"
              className="footer-social-link"
              aria-label="Visit APC on Instagram"
            >
              <span aria-hidden="true">IG</span>
            </a>
            <a
              href="#"
              className="footer-social-link"
              aria-label="Visit APC on Facebook"
            >
              <span aria-hidden="true">F</span>
            </a>
            <a
              href="#"
              className="footer-social-link"
              aria-label="Visit APC on LinkedIn"
            >
              <span aria-hidden="true">in</span>
            </a>
          </div>
          <p className="site-footer-meta">
            © {new Date().getFullYear()} Algarve Pain Centre. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
