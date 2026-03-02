import { Link } from 'react-router-dom';
import { specialitiesCategories, treatmentsCategories, resourceCategories } from '../data/navigation';

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
              href="https://www.instagram.com/algarvepaincentre/"
              className="footer-social-link"
              aria-label="Visit APC on Instagram"
            >
              <svg
                fill="currentColor"
                viewBox="0 0 32 32"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>instagram</title>
                <path d="M25.805 7.996c0 0 0 0.001 0 0.001 0 0.994-0.806 1.799-1.799 1.799s-1.799-0.806-1.799-1.799c0-0.994 0.806-1.799 1.799-1.799v0c0.993 0.001 1.798 0.805 1.799 1.798v0zM16 20.999c-2.761 0-4.999-2.238-4.999-4.999s2.238-4.999 4.999-4.999c2.761 0 4.999 2.238 4.999 4.999v0c0 0 0 0.001 0 0.001 0 2.76-2.237 4.997-4.997 4.997-0 0-0.001 0-0.001 0h0zM16 8.3c0 0 0 0-0 0-4.253 0-7.7 3.448-7.7 7.7s3.448 7.7 7.7 7.7c4.253 0 7.7-3.448 7.7-7.7v0c0-0 0-0 0-0.001 0-4.252-3.447-7.7-7.7-7.7-0 0-0 0-0.001 0h0zM16 3.704c4.003 0 4.48 0.020 6.061 0.089 1.003 0.012 1.957 0.202 2.84 0.538l-0.057-0.019c1.314 0.512 2.334 1.532 2.835 2.812l0.012 0.034c0.316 0.826 0.504 1.781 0.516 2.778l0 0.005c0.071 1.582 0.087 2.057 0.087 6.061s-0.019 4.48-0.092 6.061c-0.019 1.004-0.21 1.958-0.545 2.841l0.019-0.058c-0.258 0.676-0.64 1.252-1.123 1.726l-0.001 0.001c-0.473 0.484-1.049 0.866-1.692 1.109l-0.032 0.011c-0.829 0.316-1.787 0.504-2.788 0.516l-0.005 0c-1.592 0.071-2.061 0.087-6.072 0.087-4.013 0-4.481-0.019-6.072-0.092-1.008-0.019-1.966-0.21-2.853-0.545l0.059 0.019c-0.676-0.254-1.252-0.637-1.722-1.122l-0.001-0.001c-0.489-0.47-0.873-1.047-1.114-1.693l-0.010-0.031c-0.315-0.828-0.506-1.785-0.525-2.785l-0-0.008c-0.056-1.575-0.076-2.061-0.076-6.053 0-3.994 0.020-4.481 0.076-6.075 0.019-1.007 0.209-1.964 0.544-2.85l-0.019 0.059c0.247-0.679 0.632-1.257 1.123-1.724l0.002-0.002c0.468-0.492 1.045-0.875 1.692-1.112l0.031-0.010c0.823-0.318 1.774-0.509 2.768-0.526l0.007-0c1.593-0.056 2.062-0.075 6.072-0.075zM16 1.004c-4.074 0-4.582 0.019-6.182 0.090-1.315 0.028-2.562 0.282-3.716 0.723l0.076-0.025c-1.040 0.397-1.926 0.986-2.656 1.728l-0.001 0.001c-0.745 0.73-1.333 1.617-1.713 2.607l-0.017 0.050c-0.416 1.078-0.67 2.326-0.697 3.628l0-0.012c0.075-1.6 0.090-2.108 0.090-6.182s-0.019-4.582-0.090-6.182c-0.029-1.315-0.282-2.562-0.723-3.716l0.026 0.076c-0.398-1.040-0.986-1.926-1.729-2.656l-0.001-0.001c-0.73-0.745-1.617-1.333-2.607-1.713l-0.050-0.017c-1.078-0.416-2.326-0.67-3.628-0.697l-0.012-0c-1.6-0.075-2.108-0.090-6.182-0.090z"></path>
              </svg>
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=100068862086045"
              className="footer-social-link"
              aria-label="Visit APC on Facebook"
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
              aria-label="Visit APC on LinkedIn"
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
              <svg  id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 -25 100 1" 
                    fill="currentColor">
                    
                    <path 
                    d="M66.16,25h3.47v-9.59c0-2,2.64-2.69,3.63-.56l4.68,10.16h3.66V0h-3.47v9.38c0,2-2.61,2.69-3.63.56L69.69,0h-3.53v25ZM92.23,24.97c4.78,0,7.77-2.84,7.77-7.91V0h-3.53v13.38c0,2.84-1.66,4.41-4.23,4.41s-4.27-1.56-4.27-4.41V0h-3.5v17.06c0,5.06,2.99,7.91,7.77,7.91ZM51.64,25h12.42v-6.91h-7.26c-1.24,0-1.88-.84-1.88-1.84s.64-1.81,1.88-1.81h5.25v-4.03h-5.25c-1.24,0-1.88-.84-1.88-1.84s.64-1.81,1.88-1.81h6.49V0h-11.65v25ZM33.33,25h3.47v-9.59c0-2,2.64-2.69,3.63-.56l4.68,10.16h3.66V0h-3.47v9.38c0,2-2.61,2.69-3.63.56L36.87,0h-3.53v25ZM18.82,25h12.42v-6.91h-7.26c-1.24,0-1.88-.84-1.88-1.84s.64-1.81,1.88-1.81h5.25v-4.03h-5.25c-1.24,0-1.88-.84-1.88-1.84s.64-1.81,1.88-1.81h6.49V0h-11.65v25ZM5.89,25h5.06L16.81,0h-3.72l-2.48,11.28c-.29,1.28-1.21,2-2.2,2s-1.91-.72-2.2-2L3.72,0H0l5.89,25Z">                      
                    </path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
