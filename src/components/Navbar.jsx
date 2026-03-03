import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Search from './Search';
import {
  specialitiesCategories,
  treatmentsCategories,
  resourceCategories,
} from '../data/navigation';

const mainLinks = [{ to: '/about', label: 'About' }];

export { specialitiesCategories, treatmentsCategories, resourceCategories };

export default function Navbar() {
  const location = useLocation();
  const [specialitiesOpen, setSpecialitiesOpen] = useState(false);
  const [treatmentsOpen, setTreatmentsOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileSection, setMobileSection] = useState(null);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const specialitiesRef = useRef(null);
  const treatmentsRef = useRef(null);
  const resourcesRef = useRef(null);
  const navRef = useRef(null);
  const headerRef = useRef(null);

  const isSpecialitiesActive = location.pathname.startsWith('/specialities');
  const isTreatmentsActive = location.pathname.startsWith('/treatments');
  const isResourcesActive = location.pathname.startsWith('/resources');

  function closeAllDropdowns() {
    setSpecialitiesOpen(false);
    setTreatmentsOpen(false);
    setResourcesOpen(false);
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (!specialitiesOpen && !treatmentsOpen && !resourcesOpen) return;

      const target = event.target;

      if (
        specialitiesRef.current &&
        specialitiesRef.current.contains(target)
      ) {
        return;
      }

      if (treatmentsRef.current && treatmentsRef.current.contains(target)) {
        return;
      }

      if (resourcesRef.current && resourcesRef.current.contains(target)) {
        return;
      }

      setSpecialitiesOpen(false);
      setTreatmentsOpen(false);
      setResourcesOpen(false);
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [specialitiesOpen, treatmentsOpen, resourcesOpen]);

  // Removed dropdown search bar and filtering
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    function setOffset() {
      const h = headerRef.current ? headerRef.current.offsetHeight : 88;
      document.documentElement.style.setProperty('--navbar-offset', h + 'px');
    }
    setOffset();
    window.addEventListener('resize', setOffset);
    return () => window.removeEventListener('resize', setOffset);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    function onKey(e) {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        closeAllDropdowns();
      }
    }
    document.addEventListener('keydown', onKey);
    const focusables = navRef.current
      ? Array.from(
          navRef.current.querySelectorAll(
            'a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])'
          )
        )
      : [];
    if (focusables.length) {
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      setTimeout(() => first.focus(), 0);
      function onTrap(e) {
        if (e.key !== 'Tab') return;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
      document.addEventListener('keydown', onTrap);
      return () => {
        document.body.style.overflow = prevOverflow;
        document.removeEventListener('keydown', onKey);
        document.removeEventListener('keydown', onTrap);
      };
    }
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKey);
    };
  }, [mobileOpen]);

  function getMenuLinks(ref) {
    if (!ref.current) return [];
    return Array.from(ref.current.querySelectorAll('.navbar-dropdown-link'));
  }

  function handleMenuKeyDown(e, ref, closeMenu) {
    const links = getMenuLinks(ref);
    if (!links.length) return;
    const currentIndex = links.indexOf(document.activeElement);
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = currentIndex < 0 ? 0 : Math.min(currentIndex + 1, links.length - 1);
      links[next].focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = currentIndex <= 0 ? 0 : currentIndex - 1;
      links[prev].focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      links[0].focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      links[links.length - 1].focus();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      closeMenu();
    }
  }

  return (
    <>
    <header ref={headerRef} className={scrolled ? 'navbar navbar-scrolled' : 'navbar'}>
      <div className="navbar-inner">

        <Link to="/" className="navbar-brand">
            <img
              className="navbar-logo"
              src="/assets/apc-branco.svg"
              decoding="async"
              alt="Algarve Pain Centre logo"
            />
          </Link>

        <div className="navbar-left">
          <button
            type="button"
            className={
              mobileOpen
                ? 'navbar-mobile-toggle navbar-mobile-toggle-open'
                : 'navbar-mobile-toggle'
            }
            aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={mobileOpen}
            aria-controls="primary-navigation"
            onClick={() => {
              if (mobileOpen) {
                closeAllDropdowns();
                setMobileSection(null);
              }
              setMobileOpen((open) => !open);
            }}
          >
            <span className="navbar-mobile-bar" />
            <span className="navbar-mobile-bar" />
          </button>
          <nav
            id="primary-navigation"
            role="navigation"
            aria-label="Primary navigation"
            className={
              mobileOpen ? 'navbar-nav navbar-nav-open' : 'navbar-nav'
            }
            ref={navRef}
          >
          <div className="navbar-links-desktop">
          <div className="navbar-dropdown-wrapper" ref={specialitiesRef}>
            <button
              type="button"
              onClick={() => {
                setTreatmentsOpen(false);
                setResourcesOpen(false);
                setSpecialitiesOpen((open) => !open);
              }}
              id="specialities-trigger"
              aria-haspopup="menu"
              aria-expanded={specialitiesOpen}
              aria-controls="menu-specialities"
              className={
                (isSpecialitiesActive
                  ? 'navbar-link navbar-link-button navbar-link-active'
                  : 'navbar-link navbar-link-button') +
                (specialitiesOpen ? ' navbar-link-open' : '')
              }
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setTreatmentsOpen(false);
                  setSpecialitiesOpen(true);
                  const links = getMenuLinks(specialitiesRef);
                  if (links.length) setTimeout(() => links[0].focus(), 0);
                } else if (e.key === 'ArrowDown') {
                  e.preventDefault();
                  setTreatmentsOpen(false);
                  setSpecialitiesOpen(true);
                  const links = getMenuLinks(specialitiesRef);
                  if (links.length) setTimeout(() => links[0].focus(), 0);
                } else if (e.key === 'Escape') {
                  setSpecialitiesOpen(false);
                }
              }}
            >
              Specialities
            </button>
            <div
              className={
                specialitiesOpen
                  ? 'navbar-dropdown navbar-dropdown-open'
                  : 'navbar-dropdown'
              }
              id="menu-specialities"
              role="menu"
              aria-labelledby="specialities-trigger"
              onKeyDown={(e) => handleMenuKeyDown(e, specialitiesRef, () => setSpecialitiesOpen(false))}
            >
              <div className="navbar-dropdown-inner">
                {specialitiesCategories.map((category) => (
                  <div
                    key={category.title}
                    className="navbar-dropdown-column"
                  >
                    <h3 className="navbar-dropdown-title">
                      {category.title}
                    </h3>
                    <ul className="navbar-dropdown-list">
                      {category.items.map((item) => (
                        <li key={item.label} className="navbar-dropdown-item">
                          <Link
                            to={item.path}
                            className="navbar-dropdown-link"
                            role="menuitem"
                            onClick={() => {
                              setSpecialitiesOpen(false);
                              setMobileOpen(false);
                            }}
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            <div className="navbar-dropdown-cta-row">
              <Link
                to="/specialities"
                className="navbar-cta-card"
                onClick={() => {
                  setSpecialitiesOpen(false);
                  setMobileOpen(false);
                }}
              >
                All Specialities
                <span aria-hidden="true">→</span>
              </Link>
              <Link
                to="/contact"
                className="navbar-cta-card navbar-cta-card-secondary"
                onClick={() => {
                  setSpecialitiesOpen(false);
                  setMobileOpen(false);
                }}
              >
                Book an appointment
                <span aria-hidden="true">→</span>
              </Link>
            </div>
            </div>
          </div>
          <div className="navbar-dropdown-wrapper" ref={treatmentsRef}>
            <button
              type="button"
              onClick={() => {
                setSpecialitiesOpen(false);
                setResourcesOpen(false);
                setTreatmentsOpen((open) => !open);
              }}
              id="treatments-trigger"
              aria-haspopup="menu"
              aria-expanded={treatmentsOpen}
              aria-controls="menu-treatments"
              className={
                (isTreatmentsActive
                  ? 'navbar-link navbar-link-button navbar-link-active'
                  : 'navbar-link navbar-link-button') +
                (treatmentsOpen ? ' navbar-link-open' : '')
              }
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSpecialitiesOpen(false);
                  setResourcesOpen(false);
                  setTreatmentsOpen(true);
                  const links = getMenuLinks(treatmentsRef);
                  if (links.length) setTimeout(() => links[0].focus(), 0);
                } else if (e.key === 'ArrowDown') {
                  e.preventDefault();
                  setTreatmentsOpen(true);
                  const links = getMenuLinks(treatmentsRef);
                  if (links.length) setTimeout(() => links[0].focus(), 0);
                } else if (e.key === 'Escape') {
                  setTreatmentsOpen(false);
                }
              }}
            >
              Treatments
            </button>
            <div
              className={
                treatmentsOpen
                  ? 'navbar-dropdown navbar-dropdown-open'
                  : 'navbar-dropdown'
              }
              id="menu-treatments"
              role="menu"
              aria-labelledby="treatments-trigger"
              onKeyDown={(e) => handleMenuKeyDown(e, treatmentsRef, () => setTreatmentsOpen(false))}
            >
              <div className="navbar-dropdown-inner">
                {treatmentsCategories.map((category) => (
                  <div
                    key={category.title}
                    className="navbar-dropdown-column"
                  >
                    <h3 className="navbar-dropdown-title">
                      {category.title}
                    </h3>
                    <ul className="navbar-dropdown-list">
                      {category.items.map((item) => (
                        <li key={item.path} className="navbar-dropdown-item">
                          <Link
                            to={item.path}
                            className="navbar-dropdown-link"
                            role="menuitem"
                            onClick={() => {
                              setTreatmentsOpen(false);
                              setMobileOpen(false);
                            }}
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="navbar-dropdown-cta-row">
                <Link
                  to="/treatments"
                  className="navbar-cta-card"
                  onClick={() => {
                    setTreatmentsOpen(false);
                    setMobileOpen(false);
                  }}
                >
                  Explore Treatments
                  <span aria-hidden="true">→</span>
                </Link>
                <Link
                  to="/contact"
                  className="navbar-cta-card navbar-cta-card-secondary"
                  onClick={() => {
                    setTreatmentsOpen(false);
                    setMobileOpen(false);
                  }}
                >
                  Book a consultation
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="navbar-dropdown-wrapper" ref={resourcesRef}>
            <button
              type="button"
              onClick={() => {
                setSpecialitiesOpen(false);
                setTreatmentsOpen(false);
                setResourcesOpen((open) => !open);
              }}
              id="resources-trigger"
              aria-haspopup="menu"
              aria-expanded={resourcesOpen}
              aria-controls="menu-resources"
              className={
                (isResourcesActive
                  ? 'navbar-link navbar-link-button navbar-link-active'
                  : 'navbar-link navbar-link-button') +
                (resourcesOpen ? ' navbar-link-open' : '')
              }
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSpecialitiesOpen(false);
                  setTreatmentsOpen(false);
                  setResourcesOpen(true);
                  const links = getMenuLinks(resourcesRef);
                  if (links.length) setTimeout(() => links[0].focus(), 0);
                } else if (e.key === 'ArrowDown') {
                  e.preventDefault();
                  setResourcesOpen(true);
                  const links = getMenuLinks(resourcesRef);
                  if (links.length) setTimeout(() => links[0].focus(), 0);
                } else if (e.key === 'Escape') {
                  setResourcesOpen(false);
                }
              }}
            >
              Resources
            </button>
            <div
              className={
                resourcesOpen
                  ? 'navbar-dropdown navbar-dropdown-open'
                  : 'navbar-dropdown'
              }
              id="menu-resources"
              role="menu"
              aria-labelledby="resources-trigger"
              onKeyDown={(e) => handleMenuKeyDown(e, resourcesRef, () => setResourcesOpen(false))}
            >
              <div className="navbar-dropdown-inner">
                {resourceCategories.map((category) => (
                  <div
                    key={category.title}
                    className="navbar-dropdown-column"
                  >
                    <h3 className="navbar-dropdown-title">
                      {category.title}
                    </h3>
                    <ul className="navbar-dropdown-list">
                      {category.items.map((item) => (
                        <li key={item.path} className="navbar-dropdown-item">
                          <Link
                            to={item.path}
                            className="navbar-dropdown-link"
                            role="menuitem"
                            onClick={() => {
                              setResourcesOpen(false);
                              setMobileOpen(false);
                            }}
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="navbar-dropdown-cta-row">
                <Link
                  to="/resources"
                  className="navbar-cta-card"
                  onClick={() => {
                    setResourcesOpen(false);
                    setMobileOpen(false);
                  }}
                >
                  View all resources
                  <span aria-hidden="true">→</span>
                </Link>
                <Link
                  to="/resources/learn/blog"
                  className="navbar-cta-card navbar-cta-card-secondary"
                  onClick={() => {
                    setResourcesOpen(false);
                    setMobileOpen(false);
                  }}
                >
                  Visit the blog
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
          {mainLinks.map((link) => (
            <div key={link.to} className="navbar-dropdown-wrapper">
              <Link
                to={link.to}
                className={
                  location.pathname === link.to
                    ? 'navbar-link navbar-link-active'
                    : 'navbar-link'
                }
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            </div>
          ))}
          </div>
          <div className="navbar-menu-mobile">
              <div className="navbar-menu-mobile-top">
                <Link
                  to="/"
                  className="navbar-brand"
                  onClick={() => {
                    setMobileOpen(false);
                    setMobileSection(null);
                  }}
                >
                  <img
                    className="navbar-logo"
                    src="/assets/apc-branco.svg"
                    decoding="async"
                    alt="Algarve Pain Centre logo"
                  />
                </Link>
                <button
                  type="button"
                  className="navbar-menu-mobile-detail-button"
                  aria-label="Close navigation"
                  onClick={() => {
                    setMobileOpen(false);
                    setMobileSection(null);
                  }}
                >
                  ×
                </button>
              </div>
              <div className="navbar-menu-mobile-main">
                <Link
                  to="/"
                  className="navbar-menu-mobile-link-simple"
                  onClick={() => {
                    setMobileOpen(false);
                    setMobileSection(null);
                  }}
                >
                  Home
                </Link>
                <button
                  type="button"
                  className="navbar-menu-mobile-section-toggle"
                  onClick={() => setMobileSection('specialities')}
                >
                  <span>Specialities</span>
                  <span aria-hidden="true">→</span>
                </button>
                <button
                  type="button"
                  className="navbar-menu-mobile-section-toggle"
                  onClick={() => setMobileSection('treatments')}
                >
                  <span>Treatments</span>
                  <span aria-hidden="true">→</span>
                </button>
                <button
                  type="button"
                  className="navbar-menu-mobile-section-toggle"
                  onClick={() => setMobileSection('resources')}
                >
                  <span>Resources</span>
                  <span aria-hidden="true">→</span>
                </button>
                {mainLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="navbar-menu-mobile-link-simple"
                    onClick={() => {
                      setMobileOpen(false);
                      setMobileSection(null);
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  to="/contact"
                  className="navbar-menu-mobile-link-simple"
                  onClick={() => {
                    setMobileOpen(false);
                    setMobileSection(null);
                  }}
                >
                  Contact Us
                </Link>
              </div>

              <div className={`navbar-mobile-submenu ${mobileSection === 'specialities' ? 'navbar-mobile-submenu-open' : ''}`}>
                <div className="navbar-menu-mobile-detail-header">
                  <button
                    type="button"
                    className="navbar-menu-mobile-detail-button"
                    aria-label="Back to main menu"
                    onClick={() => setMobileSection(null)}
                  >
                    ←
                  </button>
                  <div className="navbar-menu-mobile-detail-title">
                    Specialities
                  </div>
                  <button
                    type="button"
                    className="navbar-menu-mobile-detail-button"
                    aria-label="Close navigation"
                    onClick={() => {
                      setMobileOpen(false);
                      setMobileSection(null);
                    }}
                  >
                    ×
                  </button>
                </div>
                <div className="navbar-menu-mobile-section">
                  {specialitiesCategories.map((category) => (
                    <div
                      key={category.title}
                      className="navbar-menu-mobile-group"
                    >
                      <div className="navbar-menu-mobile-group-title">
                        {category.title}
                      </div>
                      {category.items.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className="navbar-menu-mobile-link"
                          onClick={() => {
                            setMobileOpen(false);
                            setMobileSection(null);
                          }}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  ))}
                  <Link
                    to="/specialities"
                    className="navbar-menu-mobile-link-all"
                    onClick={() => {
                      setMobileOpen(false);
                      setMobileSection(null);
                    }}
                  >
                    All Specialities
                  </Link>
                </div>
              </div>

              <div className={`navbar-mobile-submenu ${mobileSection === 'treatments' ? 'navbar-mobile-submenu-open' : ''}`}>
                <div className="navbar-menu-mobile-detail-header">
                  <button
                    type="button"
                    className="navbar-menu-mobile-detail-button"
                    aria-label="Back to main menu"
                    onClick={() => setMobileSection(null)}
                  >
                    ←
                  </button>
                  <div className="navbar-menu-mobile-detail-title">
                    Treatments
                  </div>
                  <button
                    type="button"
                    className="navbar-menu-mobile-detail-button"
                    aria-label="Close navigation"
                    onClick={() => {
                      setMobileOpen(false);
                      setMobileSection(null);
                    }}
                  >
                    ×
                  </button>
                </div>
                <div className="navbar-menu-mobile-section">
                  {treatmentsCategories.map((category) => (
                    <div
                      key={category.title}
                      className="navbar-menu-mobile-group"
                    >
                      <div className="navbar-menu-mobile-group-title">
                        {category.title}
                      </div>
                      {category.items.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className="navbar-menu-mobile-link"
                          onClick={() => {
                            setMobileOpen(false);
                            setMobileSection(null);
                          }}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  ))}
                  <Link
                    to="/treatments"
                    className="navbar-menu-mobile-link-all"
                    onClick={() => {
                      setMobileOpen(false);
                      setMobileSection(null);
                    }}
                  >
                    Explore Treatments
                  </Link>
                </div>
              </div>

              <div className={`navbar-mobile-submenu ${mobileSection === 'resources' ? 'navbar-mobile-submenu-open' : ''}`}>
                <div className="navbar-menu-mobile-detail-header">
                  <button
                    type="button"
                    className="navbar-menu-mobile-detail-button"
                    aria-label="Back to main menu"
                    onClick={() => setMobileSection(null)}
                  >
                    ←
                  </button>
                  <div className="navbar-menu-mobile-detail-title">
                    Resources
                  </div>
                  <button
                    type="button"
                    className="navbar-menu-mobile-detail-button"
                    aria-label="Close navigation"
                    onClick={() => {
                      setMobileOpen(false);
                      setMobileSection(null);
                    }}
                  >
                    ×
                  </button>
                </div>
                <div className="navbar-menu-mobile-section">
                  {resourceCategories.map((category) => (
                    <div
                      key={category.title}
                      className="navbar-menu-mobile-group"
                    >
                      <div className="navbar-menu-mobile-group-title">
                        {category.title}
                      </div>
                      {category.items.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className="navbar-menu-mobile-link"
                          onClick={() => {
                            setMobileOpen(false);
                            setMobileSection(null);
                          }}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  ))}
                  <Link
                    to="/resources"
                    className="navbar-menu-mobile-link-all"
                    onClick={() => {
                      setMobileOpen(false);
                      setMobileSection(null);
                    }}
                  >
                    View all resources
                  </Link>
                </div>
              </div>
          </div>
          </nav>
          <div
            className={
              mobileOpen
                ? 'navbar-backdrop navbar-backdrop-open'
                : 'navbar-backdrop'
            }
            aria-hidden="true"
            onClick={() => {
              setMobileOpen(false);
              closeAllDropdowns();
              setMobileSection(null);
            }}
          />
        </div>
        <div className="navbar-right">
          <Search />
          <Link to="/contact" className="navbar-cta navbar-cta-desktop">
            Contact Us
          </Link>
        </div>
      </div>
    </header>
    <div className={`navbar-search-mobile ${mobileSearchOpen ? 'search-open' : ''}`}>
      <Search 
        onNavigate={() => setMobileOpen(false)} 
        onToggle={setMobileSearchOpen}
      />
    </div>
    </>
  );
}
