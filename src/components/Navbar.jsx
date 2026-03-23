import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  specialitiesCategories,
  treatmentsCategories,
  resourceCategories,
} from '../data/navigation';

const mainLinks = [
  { to: '/blog', label: 'Blog', ariaLabel: 'Blog' },
  { to: '/about', label: 'About', ariaLabel: 'About' },
];

export { specialitiesCategories, treatmentsCategories, resourceCategories };

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [shouldFocusDropdown, setShouldFocusDropdown] = useState(false);
  const [mobileExpandedSection, setMobileExpandedSection] = useState(null);
  const [supportsHover, setSupportsHover] = useState(() => {
    if (typeof window === 'undefined') return true;
    if (!window.matchMedia) return true;
    return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  });
  const mobileOpenRef = useRef(false);
  const mobileDialogRef = useRef(null);
  const mobileToggleRef = useRef(null);
  const headerRef = useRef(null);

  const isSpecialitiesActive = location.pathname.startsWith('/specialities');
  const isTreatmentsActive = location.pathname.startsWith('/treatments');
  const isResourcesActive = location.pathname.startsWith('/resources');

  const dropdownKeys = ['specialities', 'treatments', 'resources'];
  const hoverOpenDelayMs = 90;
  const hoverCloseDelayMs = 160;
  const hoverOpenTimerRef = useRef(null);
  const hoverCloseTimerRef = useRef(null);

  const getTriggerId = (key) => `trigger-${key}`;
  const getMenuId = (key) => `menu-${key}`;

  const focusMobileToggle = () => {
    const el = mobileToggleRef.current;
    if (el && typeof el.focus === 'function') el.focus();
  };

  const closeMobileNav = ({ restoreFocus = true } = {}) => {
    const shouldRestoreFocus = restoreFocus && mobileOpenRef.current;
    setMobileOpen(false);
    setMobileExpandedSection(null);
    if (shouldRestoreFocus) setTimeout(() => focusMobileToggle(), 0);
  };

  const focusTrigger = (key) => {
    const el = document.getElementById(getTriggerId(key));
    if (el && typeof el.focus === 'function') el.focus();
  };

  const focusMenuItem = (key, nextIndex) => {
    const menu = document.getElementById(getMenuId(key));
    if (!menu) return;
    const items = Array.from(menu.querySelectorAll('[role="menuitem"]'));
    if (!items.length) return;
    const idx = ((nextIndex % items.length) + items.length) % items.length;
    const el = items[idx];
    if (el && typeof el.focus === 'function') el.focus();
  };

  const getActiveMenuIndex = (key) => {
    const menu = document.getElementById(getMenuId(key));
    if (!menu) return -1;
    const items = Array.from(menu.querySelectorAll('[role="menuitem"]'));
    if (!items.length) return -1;
    return items.indexOf(document.activeElement);
  };

  const isFocusWithinMenu = (key) => {
    const menu = document.getElementById(getMenuId(key));
    if (!menu) return false;
    return menu.contains(document.activeElement);
  };

  const closeDropdown = (restoreFocusKey = null) => {
    setOpenDropdown(null);
    if (restoreFocusKey) {
      setTimeout(() => focusTrigger(restoreFocusKey), 0);
    }
  };

  const clearHoverTimers = () => {
    if (hoverOpenTimerRef.current) {
      clearTimeout(hoverOpenTimerRef.current);
      hoverOpenTimerRef.current = null;
    }
    if (hoverCloseTimerRef.current) {
      clearTimeout(hoverCloseTimerRef.current);
      hoverCloseTimerRef.current = null;
    }
  };

  const scheduleHoverOpen = (key) => {
    if (!supportsHover) return;
    if (hoverCloseTimerRef.current) {
      clearTimeout(hoverCloseTimerRef.current);
      hoverCloseTimerRef.current = null;
    }
    if (hoverOpenTimerRef.current) clearTimeout(hoverOpenTimerRef.current);
    hoverOpenTimerRef.current = setTimeout(() => {
      setShouldFocusDropdown(false);
      setOpenDropdown(key);
    }, hoverOpenDelayMs);
  };

  const scheduleHoverClose = () => {
    if (!supportsHover) return;
    if (hoverOpenTimerRef.current) {
      clearTimeout(hoverOpenTimerRef.current);
      hoverOpenTimerRef.current = null;
    }
    if (hoverCloseTimerRef.current) clearTimeout(hoverCloseTimerRef.current);
    hoverCloseTimerRef.current = setTimeout(() => {
      closeDropdown();
    }, hoverCloseDelayMs);
  };

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
    if (typeof window === 'undefined') return;
    if (!window.matchMedia) return;
    const media = window.matchMedia('(hover: hover) and (pointer: fine)');
    const onChange = (e) => setSupportsHover(e.matches);
    setSupportsHover(media.matches);
    if (typeof media.addEventListener === 'function') {
      media.addEventListener('change', onChange);
      return () => media.removeEventListener('change', onChange);
    }
    media.onchange = onChange;
    return () => {
      media.onchange = null;
    };
  }, []);

  useEffect(() => {
    setOpenDropdown(null);
    clearHoverTimers();
  }, [location.pathname]);

  useEffect(() => {
    if (!openDropdown) return;

    function onOutsidePointerDown(e) {
      const root = headerRef.current;
      if (!root) return;
      if (root.contains(e.target)) return;
      closeDropdown();
    }

    function onFocusIn(e) {
      const root = headerRef.current;
      if (!root) return;
      if (root.contains(e.target)) return;
      closeDropdown();
    }

    document.addEventListener('mousedown', onOutsidePointerDown);
    document.addEventListener('touchstart', onOutsidePointerDown, { passive: true });
    document.addEventListener('focusin', onFocusIn);

    setTimeout(() => {
      if (!shouldFocusDropdown) return;
      focusMenuItem(openDropdown, 0);
      setShouldFocusDropdown(false);
    }, 0);

    return () => {
      document.removeEventListener('mousedown', onOutsidePointerDown);
      document.removeEventListener('touchstart', onOutsidePointerDown);
      document.removeEventListener('focusin', onFocusIn);
    };
  }, [openDropdown, shouldFocusDropdown]);

  useEffect(() => {
    return () => clearHoverTimers();
  }, []);

  const onTriggerKeyDown = (key) => (e) => {
    const idx = dropdownKeys.indexOf(key);
    if (e.key === 'ArrowRight' && idx >= 0) {
      e.preventDefault();
      focusTrigger(dropdownKeys[(idx + 1) % dropdownKeys.length]);
      return;
    }
    if (e.key === 'ArrowLeft' && idx >= 0) {
      e.preventDefault();
      focusTrigger(dropdownKeys[(idx - 1 + dropdownKeys.length) % dropdownKeys.length]);
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setShouldFocusDropdown(true);
      setOpenDropdown(key);
      setTimeout(() => focusMenuItem(key, 0), 0);
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setShouldFocusDropdown(true);
      setOpenDropdown(key);
      setTimeout(() => focusMenuItem(key, -1), 0);
      return;
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      closeDropdown(key);
    }
  };

  const onMenuKeyDown = (key) => (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      closeDropdown(key);
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const current = getActiveMenuIndex(key);
      focusMenuItem(key, current < 0 ? 0 : current + 1);
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const current = getActiveMenuIndex(key);
      focusMenuItem(key, current < 0 ? -1 : current - 1);
      return;
    }
    if (e.key === 'Home') {
      e.preventDefault();
      focusMenuItem(key, 0);
      return;
    }
    if (e.key === 'End') {
      e.preventDefault();
      focusMenuItem(key, -1);
    }
  };

  useEffect(() => {
    if (!mobileOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    function onKey(e) {
      if (e.key === 'Escape') {
        closeMobileNav();
      }
    }
    document.addEventListener('keydown', onKey);
    const container = mobileDialogRef.current;

    const getFocusable = () =>
      container
        ? Array.from(
            container.querySelectorAll(
              'a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])'
            )
          )
        : [];

    setTimeout(() => {
      const closeButton = container?.querySelector('button[aria-label="Close menu"]');
      if (closeButton && typeof closeButton.focus === 'function') {
        closeButton.focus();
        return;
      }
      const focusables = getFocusable();
      if (focusables.length && typeof focusables[0].focus === 'function') focusables[0].focus();
    }, 0);

    function onTrap(e) {
      if (e.key !== 'Tab') return;
      const focusables = getFocusable();
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
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
  }, [mobileOpen]);

  useEffect(() => {
    mobileOpenRef.current = mobileOpen;
  }, [mobileOpen]);

  return (
    <>
    <header
      ref={headerRef}
      className={[
        'navbar',
        scrolled ? 'navbar-scrolled' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
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
            ref={mobileToggleRef}
            className={mobileOpen ? 'mobile-nav-toggle mobile-nav-toggle-open' : 'mobile-nav-toggle'}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            onClick={() => {
              if (mobileOpen) closeMobileNav();
              else {
                setOpenDropdown(null);
                setMobileOpen(true);
              }
            }}
          >
            <span className="mobile-nav-toggle-bar" />
            <span className="mobile-nav-toggle-bar" />
            <span className="mobile-nav-toggle-bar" />
          </button>
          <nav
            id="primary-navigation"
            role="navigation"
            aria-label="Primary navigation"
            className="navbar-nav"
          >
          <div className="navbar-links-desktop">
          <div
            className="navbar-dropdown-wrapper"
            onMouseEnter={() => {
              scheduleHoverOpen('specialities');
            }}
            onMouseLeave={() => {
              if (isFocusWithinMenu('specialities')) return;
              scheduleHoverClose();
            }}
          >
            <button
              type="button"
              id={getTriggerId('specialities')}
              className={
                isSpecialitiesActive
                  ? openDropdown === 'specialities'
                    ? 'navbar-link navbar-link-button navbar-link-active navbar-link-open'
                    : 'navbar-link navbar-link-button navbar-link-active'
                  : openDropdown === 'specialities'
                    ? 'navbar-link navbar-link-button navbar-link-open'
                    : 'navbar-link navbar-link-button'
              }
              aria-label="Specialities"
              aria-haspopup="menu"
              aria-expanded={openDropdown === 'specialities'}
              aria-controls="menu-specialities"
              onClick={() => {
                setMobileOpen(false);
                if (supportsHover) {
                  navigate('/specialities');
                } else {
                  setShouldFocusDropdown(false);
                  setOpenDropdown((current) =>
                    current === 'specialities' ? null : 'specialities'
                  );
                }
              }}
              onKeyDown={onTriggerKeyDown('specialities')}
            >
              Specialities
            </button>
            <div
              id="menu-specialities"
              role="menu"
              aria-label="Specialities"
              aria-labelledby={getTriggerId('specialities')}
              aria-orientation="vertical"
              className={
                openDropdown === 'specialities'
                  ? 'navbar-dropdown navbar-dropdown-open'
                  : 'navbar-dropdown'
              }
              onKeyDown={onMenuKeyDown('specialities')}
              onMouseEnter={() => {
                if (!supportsHover) return;
                if (hoverCloseTimerRef.current) {
                  clearTimeout(hoverCloseTimerRef.current);
                  hoverCloseTimerRef.current = null;
                }
              }}
              onMouseLeave={() => {
                if (!supportsHover) return;
                scheduleHoverClose();
              }}
            >
              <div className="navbar-dropdown-inner">
                {specialitiesCategories.map((category) => (
                  <div key={category.title} className="navbar-dropdown-column">
                    <div className="navbar-dropdown-title">{category.title}</div>
                    <ul className="navbar-dropdown-list">
                      {category.items.map((item) => (
                        <li key={item.path} className="navbar-dropdown-item">
                          <Link
                            to={item.path}
                            role="menuitem"
                            title={item.label}
                            className={
                              location.pathname === item.path
                                ? 'navbar-dropdown-link is-active'
                                : 'navbar-dropdown-link'
                            }
                            onClick={() => setOpenDropdown(null)}
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="navbar-dropdown-footer">
                <Link
                  to="/specialities"
                  role="menuitem"
                  className="navbar-dropdown-footer-link"
                  onClick={() => setOpenDropdown(null)}
                >
                  All Specialities
                </Link>
              </div>
            </div>
          </div>
          <div
            className="navbar-dropdown-wrapper"
            onMouseEnter={() => {
              scheduleHoverOpen('treatments');
            }}
            onMouseLeave={() => {
              if (isFocusWithinMenu('treatments')) return;
              scheduleHoverClose();
            }}
          >
            <button
              type="button"
              id={getTriggerId('treatments')}
              className={
                isTreatmentsActive
                  ? openDropdown === 'treatments'
                    ? 'navbar-link navbar-link-button navbar-link-active navbar-link-open'
                    : 'navbar-link navbar-link-button navbar-link-active'
                  : openDropdown === 'treatments'
                    ? 'navbar-link navbar-link-button navbar-link-open'
                    : 'navbar-link navbar-link-button'
              }
              aria-label="Treatments"
              aria-haspopup="menu"
              aria-expanded={openDropdown === 'treatments'}
              aria-controls="menu-treatments"
              onClick={() => {
                setMobileOpen(false);
                if (supportsHover) {
                  navigate('/treatments');
                } else {
                  setShouldFocusDropdown(false);
                  setOpenDropdown((current) =>
                    current === 'treatments' ? null : 'treatments'
                  );
                }
              }}
              onKeyDown={onTriggerKeyDown('treatments')}
            >
              Treatments
            </button>
            <div
              id="menu-treatments"
              role="menu"
              aria-label="Treatments"
              aria-labelledby={getTriggerId('treatments')}
              aria-orientation="vertical"
              className={
                openDropdown === 'treatments'
                  ? 'navbar-dropdown navbar-dropdown-open'
                  : 'navbar-dropdown'
              }
              onKeyDown={onMenuKeyDown('treatments')}
              onMouseEnter={() => {
                if (!supportsHover) return;
                if (hoverCloseTimerRef.current) {
                  clearTimeout(hoverCloseTimerRef.current);
                  hoverCloseTimerRef.current = null;
                }
              }}
              onMouseLeave={() => {
                if (!supportsHover) return;
                scheduleHoverClose();
              }}
            >
              <div className="navbar-dropdown-inner">
                {treatmentsCategories.map((category) => (
                  <div key={category.title} className="navbar-dropdown-column">
                    <div className="navbar-dropdown-title">{category.title}</div>
                    <ul className="navbar-dropdown-list">
                      {category.items.map((item) => (
                        <li key={item.path} className="navbar-dropdown-item">
                          <Link
                            to={item.path}
                            role="menuitem"
                            title={item.label}
                            className={
                              location.pathname === item.path
                                ? 'navbar-dropdown-link is-active'
                                : 'navbar-dropdown-link'
                            }
                            onClick={() => setOpenDropdown(null)}
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="navbar-dropdown-footer">
                <Link
                  to="/treatments"
                  role="menuitem"
                  className="navbar-dropdown-footer-link"
                  onClick={() => setOpenDropdown(null)}
                >
                  Explore Treatments
                </Link>
              </div>
            </div>
          </div>
          <div
            className="navbar-dropdown-wrapper"
            onMouseEnter={() => {
              scheduleHoverOpen('resources');
            }}
            onMouseLeave={() => {
              if (isFocusWithinMenu('resources')) return;
              scheduleHoverClose();
            }}
          >
            <button
              type="button"
              id={getTriggerId('resources')}
              className={
                isResourcesActive
                  ? openDropdown === 'resources'
                    ? 'navbar-link navbar-link-button navbar-link-active navbar-link-open'
                    : 'navbar-link navbar-link-button navbar-link-active'
                  : openDropdown === 'resources'
                    ? 'navbar-link navbar-link-button navbar-link-open'
                    : 'navbar-link navbar-link-button'
              }
              aria-label="Resources"
              aria-haspopup="menu"
              aria-expanded={openDropdown === 'resources'}
              aria-controls="menu-resources"
              onClick={() => {
                setMobileOpen(false);
                if (supportsHover) {
                  navigate('/resources');
                } else {
                  setShouldFocusDropdown(false);
                  setOpenDropdown((current) =>
                    current === 'resources' ? null : 'resources'
                  );
                }
              }}
              onKeyDown={onTriggerKeyDown('resources')}
            >
              Resources
            </button>
            <div
              id="menu-resources"
              role="menu"
              aria-label="Resources"
              aria-labelledby={getTriggerId('resources')}
              aria-orientation="vertical"
              className={
                openDropdown === 'resources'
                  ? 'navbar-dropdown navbar-dropdown-open'
                  : 'navbar-dropdown'
              }
              onKeyDown={onMenuKeyDown('resources')}
              onMouseEnter={() => {
                if (!supportsHover) return;
                if (hoverCloseTimerRef.current) {
                  clearTimeout(hoverCloseTimerRef.current);
                  hoverCloseTimerRef.current = null;
                }
              }}
              onMouseLeave={() => {
                if (!supportsHover) return;
                scheduleHoverClose();
              }}
            >
              <div className="navbar-dropdown-inner">
                {resourceCategories.map((category) => (
                  <div key={category.title} className="navbar-dropdown-column">
                    <div className="navbar-dropdown-title">{category.title}</div>
                    <ul className="navbar-dropdown-list">
                      {category.items.map((item) => (
                        <li key={item.path} className="navbar-dropdown-item">
                          <Link
                            to={item.path}
                            role="menuitem"
                            title={item.label}
                            className={
                              location.pathname === item.path
                                ? 'navbar-dropdown-link is-active'
                                : 'navbar-dropdown-link'
                            }
                            onClick={() => setOpenDropdown(null)}
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="navbar-dropdown-footer">
                <Link
                  to="/resources"
                  role="menuitem"
                  className="navbar-dropdown-footer-link"
                  onClick={() => setOpenDropdown(null)}
                >
                  View all resources
                </Link>
              </div>
            </div>
          </div>
          {mainLinks.map((link) => (
            <div key={link.to} className="navbar-dropdown-wrapper">
              <Link
                to={link.to}
                aria-label={link.ariaLabel}
                className={
                  (link.to === '/blog'
                    ? location.pathname === '/blog' || location.pathname.startsWith('/blog/')
                    : location.pathname === link.to)
                    ? 'navbar-link navbar-link-active'
                    : 'navbar-link'
                }
                onClick={() => closeMobileNav({ restoreFocus: false })}
              >
                {link.label}
              </Link>
            </div>
          ))}
          </div>
          </nav>
        </div>

        <div className="navbar-right">
          <Link to="/contact" className="navbar-cta navbar-cta-desktop navbar-cta-dark">
            <span>Book Now</span>
            <span className="navbar-cta-icon" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </span>
          </Link>
        </div>

      </div>
      <div
        id="mobile-navigation"
        ref={mobileDialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!mobileOpen}
        className={mobileOpen ? 'mobile-nav-overlay mobile-nav-overlay-open' : 'mobile-nav-overlay'}
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) closeMobileNav();
        }}
      >
        <div className="mobile-nav-panel">
          <video
            className="mobile-nav-background-video"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster="/assets/images/illustrative/services-home-min-1.jpg"
            src="/assets/videos/post-43.mp4"
            aria-hidden="true"
            tabIndex={-1}
          />
          <div className="mobile-nav-background-overlay" aria-hidden="true" />
          <div className="mobile-nav-header">
            <Link
              to="/"
              className="mobile-nav-logo"
              aria-label="Go to homepage"
              onClick={() => closeMobileNav({ restoreFocus: false })}
            >
              <img
                className="mobile-nav-logo-img"
                src="/assets/apc-branco.svg"
                decoding="async"
                alt="Algarve Pain Centre logo"
              />
            </Link>
            <button
              type="button"
              className="mobile-nav-close"
              aria-label="Close menu"
              onClick={() => closeMobileNav()}
            >
              ×
            </button>
          </div>

          <div className="mobile-nav-content">
            <button
              type="button"
              className="mobile-nav-section-toggle"
              aria-expanded={mobileExpandedSection === 'specialities'}
              aria-controls="mobile-section-specialities"
              onClick={() =>
                setMobileExpandedSection((current) =>
                  current === 'specialities' ? null : 'specialities'
                )
              }
            >
              <div className="mobile-nav-section-label">
                <span>Specialities</span>
                <div className="treatment-card-accent" aria-hidden="true" />
              </div>
              <span
                className={
                  mobileExpandedSection === 'specialities'
                    ? 'mobile-nav-chevron mobile-nav-chevron-open'
                    : 'mobile-nav-chevron'
                }
                aria-hidden="true"
              >
                ▾
              </span>
            </button>
            <div
              id="mobile-section-specialities"
              className={
                mobileExpandedSection === 'specialities'
                  ? 'mobile-nav-section-panel mobile-nav-section-panel-open'
                  : 'mobile-nav-section-panel'
              }
            >
              <div className="mobile-nav-section-panel-inner">
                {specialitiesCategories.map((category) => (
                  <div key={category.title} className="mobile-nav-group">
                    <div className="mobile-nav-group-title">{category.title}</div>
                    <div className="mobile-nav-group-links">
                      {category.items.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className="mobile-nav-link"
                          onClick={() => closeMobileNav({ restoreFocus: false })}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
                <Link to="/specialities" className="mobile-nav-link-all" onClick={() => closeMobileNav({ restoreFocus: false })}>
                  All Specialities
                </Link>
              </div>
            </div>

            <button
              type="button"
              className="mobile-nav-section-toggle"
              aria-expanded={mobileExpandedSection === 'treatments'}
              aria-controls="mobile-section-treatments"
              onClick={() =>
                setMobileExpandedSection((current) =>
                  current === 'treatments' ? null : 'treatments'
                )
              }
            >
              <div className="mobile-nav-section-label">
                <span>Treatments</span>
                <div className="treatment-card-accent" aria-hidden="true" />
              </div>
              <span
                className={
                  mobileExpandedSection === 'treatments'
                    ? 'mobile-nav-chevron mobile-nav-chevron-open'
                    : 'mobile-nav-chevron'
                }
                aria-hidden="true"
              >
                ▾
              </span>
            </button>
            <div
              id="mobile-section-treatments"
              className={
                mobileExpandedSection === 'treatments'
                  ? 'mobile-nav-section-panel mobile-nav-section-panel-open'
                  : 'mobile-nav-section-panel'
              }
            >
              <div className="mobile-nav-section-panel-inner">
                {treatmentsCategories.map((category) => (
                  <div key={category.title} className="mobile-nav-group">
                    <div className="mobile-nav-group-title">{category.title}</div>
                    <div className="mobile-nav-group-links">
                      {category.items.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className="mobile-nav-link"
                          onClick={() => closeMobileNav({ restoreFocus: false })}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
                <Link to="/treatments" className="mobile-nav-link-all" onClick={() => closeMobileNav({ restoreFocus: false })}>
                  Explore Treatments
                </Link>
              </div>
            </div>

            <button
              type="button"
              className="mobile-nav-section-toggle"
              aria-expanded={mobileExpandedSection === 'resources'}
              aria-controls="mobile-section-resources"
              onClick={() =>
                setMobileExpandedSection((current) =>
                  current === 'resources' ? null : 'resources'
                )
              }
            >
              <div className="mobile-nav-section-label">
                <span>Resources</span>
                <div className="treatment-card-accent" aria-hidden="true" />
              </div>
              <span
                className={
                  mobileExpandedSection === 'resources'
                    ? 'mobile-nav-chevron mobile-nav-chevron-open'
                    : 'mobile-nav-chevron'
                }
                aria-hidden="true"
              >
                ▾
              </span>
            </button>
            <div
              id="mobile-section-resources"
              className={
                mobileExpandedSection === 'resources'
                  ? 'mobile-nav-section-panel mobile-nav-section-panel-open'
                  : 'mobile-nav-section-panel'
              }
            >
              <div className="mobile-nav-section-panel-inner">
                {resourceCategories.map((category) => (
                  <div key={category.title} className="mobile-nav-group">
                    <div className="mobile-nav-group-title">{category.title}</div>
                    <div className="mobile-nav-group-links">
                      {category.items.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className="mobile-nav-link"
                          onClick={() => closeMobileNav({ restoreFocus: false })}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
                <Link to="/resources" className="mobile-nav-link-all" onClick={() => closeMobileNav({ restoreFocus: false })}>
                  View all resources
                </Link>
              </div>
            </div>
          </div>

          <div className="mobile-nav-footer">
            <Link
              to="/contact"
              className="navbar-cta mobile-nav-cta"
              onClick={() => closeMobileNav({ restoreFocus: false })}
            >
              <span>Book Now</span>
              <span className="navbar-cta-icon" aria-hidden="true">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </span>
            </Link>
            <Link
              to="/blog"
              className="mobile-nav-footer-link"
              aria-label="Blog"
              onClick={() => closeMobileNav({ restoreFocus: false })}
            >
              Blog
            </Link>
            <Link
              to="/about"
              className="mobile-nav-footer-link"
              onClick={() => closeMobileNav({ restoreFocus: false })}
            >
              About Us
            </Link>
            <div className="mobile-nav-social" aria-label="Social media">
              <a
                href="https://www.instagram.com/algarvepaincentre/"
                className="mobile-nav-social-link"
                aria-label="Visit Algarve Pain Centre on Instagram"
                target="_blank"
                rel="noopener noreferrer"
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
                className="mobile-nav-social-link"
                aria-label="Visit Algarve Pain Centre on Facebook"
                target="_blank"
                rel="noopener noreferrer"
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
                className="mobile-nav-social-link"
                aria-label="Visit Algarve Pain Centre on LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
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
          </div>
        </div>
      </div>
    </header>
    </>
  );
}
