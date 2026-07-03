import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  specialitiesCategories,
  treatmentsCategories,
  resourceCategories,
} from '../data/navigation';
import Search from './Search';
import './Navigation/Navbar.css';
import './Navigation/MobileMenu.css';

const mainLinks = [
  { to: '/about', label: 'About', ariaLabel: 'About' },
];

export { specialitiesCategories, treatmentsCategories, resourceCategories };

function NavDropdown({
  menuKey,
  label,
  categories,
  footerLinkTo,
  footerLinkLabel,
  isActive,
  isOpen,
  supportsHover,
  onHoverOpen,
  onHoverClose,
  onClick,
  onKeyDown,
  onMenuKeyDown,
}) {
  const location = useLocation();
  const triggerId = `trigger-${menuKey}`;
  const menuId = `menu-${menuKey}`;

  return (
    <div
      className="navbar-dropdown-wrapper"
      onMouseEnter={() => onHoverOpen(menuKey)}
      onMouseLeave={() => onHoverClose(menuKey)}
    >
      <button
        type="button"
        id={triggerId}
        className={
          isActive
            ? isOpen
              ? 'navbar-link navbar-link-button navbar-link-active navbar-link-open'
              : 'navbar-link navbar-link-button navbar-link-active'
            : isOpen
              ? 'navbar-link navbar-link-button navbar-link-open'
              : 'navbar-link navbar-link-button'
        }
        aria-label={label}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={menuId}
        onClick={() => onClick(false)}
        onKeyDown={(e) => onKeyDown(e, menuKey)}
      >
        {label}
      </button>
      <div
        id={menuId}
        role="menu"
        aria-label={label}
        aria-labelledby={triggerId}
        aria-orientation="vertical"
        className={
          isOpen ? 'navbar-dropdown navbar-dropdown-open' : 'navbar-dropdown'
        }
        onKeyDown={(e) => onMenuKeyDown(e, menuKey)}
        onMouseEnter={() => onHoverOpen(menuKey, true)}
        onMouseLeave={() => onHoverClose(menuKey, true)}
      >
        <div className="navbar-dropdown-inner">
          {categories.map((category) => (
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
                      onClick={() => onClick(true)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [shouldFocusDropdown, setShouldFocusDropdown] = useState(false);
  const [mobileActiveSection, setMobileActiveSection] = useState(null);
  
  const [supportsHover, setSupportsHover] = useState(() => {
    if (typeof window === 'undefined') return true;
    if (!window.matchMedia) return true;
    return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  });

  const mobileDialogRef = useRef(null);
  const mobileToggleRef = useRef(null);
  const mobilePanelRef = useRef(null);
  const headerRef = useRef(null);

  const hoverOpenDelayMs = 90;
  const hoverCloseDelayMs = 160;
  const hoverOpenTimerRef = useRef(null);
  const hoverCloseTimerRef = useRef(null);
  const dropdownKeys = ['specialities', 'treatments', 'resources'];
  const lastFocusedElementRef = useRef(null);
  const mobileSections = [
    { id: 'specialities', label: 'Specialities', data: specialitiesCategories, isActive: location.pathname.startsWith('/specialities') },
    { id: 'treatments', label: 'Treatments', data: treatmentsCategories, isActive: location.pathname.startsWith('/treatments') },
    { id: 'resources', label: 'Resources', data: resourceCategories, isActive: location.pathname.startsWith('/resources') },
  ];
  const currentMobileSection = mobileSections.find((section) => section.id === mobileActiveSection) ?? null;

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 8);
          ticking = false;
        });
        ticking = true;
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    let ticking = false;
    function setOffset() {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const h = headerRef.current ? headerRef.current.offsetHeight : 88;
          document.documentElement.style.setProperty('--navbar-offset', h + 'px');
          ticking = false;
        });
        ticking = true;
      }
    }
    
    // Stabilize dynamic layout calculations to only run after full DOM and resource loading
    if (document.readyState === 'complete') {
      setOffset();
    } else {
      window.addEventListener('load', setOffset);
    }
    
    window.addEventListener('resize', setOffset, { passive: true });
    return () => {
      window.removeEventListener('resize', setOffset);
      window.removeEventListener('load', setOffset);
    };
  }, []);

  useEffect(() => {
    setOpenDropdown(null);
    clearHoverTimers();
    setMobileOpen(false);
    setMobileActiveSection(null);
  }, [location.pathname]);

  useEffect(() => {
    if (!mobileOpen) {
      return undefined;
    }

    const scrollY = window.scrollY;
    const html = document.documentElement;
    const previousHtmlOverflow = html.style.overflow;
    const previousHtmlTouchAction = html.style.touchAction;
    const previousBodyOverflow = document.body.style.overflow;
    const previousBodyTouchAction = document.body.style.touchAction;
    const previousBodyPosition = document.body.style.position;
    const previousBodyTop = document.body.style.top;
    const previousBodyWidth = document.body.style.width;
    const panel = mobilePanelRef.current;
    lastFocusedElementRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;

    html.style.overflow = 'hidden';
    html.style.touchAction = 'none';
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';

    const focusFirstElement = window.requestAnimationFrame(() => {
      const firstFocusable = panel?.querySelector(
        'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
      );
      firstFocusable?.focus();
    });

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setMobileOpen(false);
        return;
      }

      if (event.key !== 'Tab' || !panel) return;

      const focusableElements = Array.from(
        panel.querySelectorAll('button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'),
      ).filter((element) => !element.hasAttribute('disabled'));

      if (!focusableElements.length) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFirstElement);
      document.removeEventListener('keydown', handleKeyDown);
      html.style.overflow = previousHtmlOverflow;
      html.style.touchAction = previousHtmlTouchAction;
      document.body.style.overflow = previousBodyOverflow;
      document.body.style.touchAction = previousBodyTouchAction;
      document.body.style.position = previousBodyPosition;
      document.body.style.top = previousBodyTop;
      document.body.style.width = previousBodyWidth;
      window.scrollTo(0, scrollY);
      lastFocusedElementRef.current?.focus?.();
    };
  }, [mobileOpen]);

  const clearHoverTimers = () => {
    if (hoverOpenTimerRef.current) clearTimeout(hoverOpenTimerRef.current);
    if (hoverCloseTimerRef.current) clearTimeout(hoverCloseTimerRef.current);
  };

  const scheduleHoverOpen = (key, fromMenu = false) => {
    if (!supportsHover) return;
    if (hoverCloseTimerRef.current) clearTimeout(hoverCloseTimerRef.current);
    if (hoverOpenTimerRef.current) clearTimeout(hoverOpenTimerRef.current);
    
    hoverOpenTimerRef.current = setTimeout(() => {
      setShouldFocusDropdown(false);
      setOpenDropdown(key);
    }, hoverOpenDelayMs);
  };

  const scheduleHoverClose = (key, fromMenu = false) => {
    if (!supportsHover) return;
    const menu = document.getElementById(`menu-${key}`);
    if (menu && menu.contains(document.activeElement)) return;
    
    if (hoverOpenTimerRef.current) clearTimeout(hoverOpenTimerRef.current);
    if (hoverCloseTimerRef.current) clearTimeout(hoverCloseTimerRef.current);
    
    hoverCloseTimerRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, hoverCloseDelayMs);
  };

  const handleDropdownClick = (key, closeOnly = false) => {
    setMobileOpen(false);
    if (closeOnly) {
      setOpenDropdown(null);
      return;
    }
    navigate(`/${key}`);
  };

  const handleTriggerKeyDown = (e, key) => {
    const idx = dropdownKeys.indexOf(key);
    if (e.key === 'ArrowRight' && idx >= 0) {
      e.preventDefault();
      const nextId = `trigger-${dropdownKeys[(idx + 1) % dropdownKeys.length]}`;
      document.getElementById(nextId)?.focus();
    } else if (e.key === 'ArrowLeft' && idx >= 0) {
      e.preventDefault();
      const prevId = `trigger-${dropdownKeys[(idx - 1 + dropdownKeys.length) % dropdownKeys.length]}`;
      document.getElementById(prevId)?.focus();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setShouldFocusDropdown(true);
      setOpenDropdown(key);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setOpenDropdown(null);
    }
  };

  const handleMenuKeyDown = (e, key) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      setOpenDropdown(null);
      document.getElementById(`trigger-${key}`)?.focus();
    }
  };

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setMobileActiveSection(null);
  };

  const openMobileSection = (sectionId) => {
    setMobileActiveSection(sectionId);
  };

  const returnToMobileMenuRoot = () => {
    setMobileActiveSection(null);
  };

  return (
    <header
      ref={headerRef}
      className={['navbar', scrolled ? 'navbar-scrolled' : ''].filter(Boolean).join(' ')}
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
              if (mobileOpen) {
                closeMobileMenu();
              } else {
                setMobileOpen(true);
              }
            }}
          >
            <span className="mobile-nav-toggle-bar" />
            <span className="mobile-nav-toggle-bar" />
            <span className="mobile-nav-toggle-bar" />
          </button>
          
          <nav id="primary-navigation" role="navigation" aria-label="Primary navigation" className="navbar-nav">
            <div className="navbar-links-desktop">
              <NavDropdown
                menuKey="specialities"
                label="Specialities"
                categories={specialitiesCategories}
                footerLinkTo="/specialities"
                footerLinkLabel="All Specialities"
                isActive={location.pathname.startsWith('/specialities')}
                isOpen={openDropdown === 'specialities'}
                supportsHover={supportsHover}
                onHoverOpen={scheduleHoverOpen}
                onHoverClose={scheduleHoverClose}
                onClick={(closeOnly) => handleDropdownClick('specialities', closeOnly)}
                onKeyDown={handleTriggerKeyDown}
                onMenuKeyDown={handleMenuKeyDown}
              />
              <NavDropdown
                menuKey="treatments"
                label="Treatments"
                categories={treatmentsCategories}
                footerLinkTo="/treatments"
                footerLinkLabel="Explore Treatments"
                isActive={location.pathname.startsWith('/treatments')}
                isOpen={openDropdown === 'treatments'}
                supportsHover={supportsHover}
                onHoverOpen={scheduleHoverOpen}
                onHoverClose={scheduleHoverClose}
                onClick={(closeOnly) => handleDropdownClick('treatments', closeOnly)}
                onKeyDown={handleTriggerKeyDown}
                onMenuKeyDown={handleMenuKeyDown}
              />
              <NavDropdown
                menuKey="resources"
                label="Resources"
                categories={resourceCategories}
                footerLinkTo="/resources"
                footerLinkLabel="View all resources"
                isActive={location.pathname.startsWith('/resources')}
                isOpen={openDropdown === 'resources'}
                supportsHover={supportsHover}
                onHoverOpen={scheduleHoverOpen}
                onHoverClose={scheduleHoverClose}
                onClick={(closeOnly) => handleDropdownClick('resources', closeOnly)}
                onKeyDown={handleTriggerKeyDown}
                onMenuKeyDown={handleMenuKeyDown}
              />
              {mainLinks.map((link) => (
                <div key={link.to} className="navbar-dropdown-wrapper">
                  <Link
                    to={link.to}
                    aria-label={link.ariaLabel}
                    className={(location.pathname === link.to || location.pathname.startsWith(`${link.to}/`)) ? 'navbar-link navbar-link-active' : 'navbar-link'}
                  >
                    {link.label}
                  </Link>
                </div>
              ))}
            </div>
          </nav>
        </div>

        <div className="navbar-right">
          <div className="navbar-search-slot">
            <Search
              variant="nav"
              containerId="navbar-search"
              dropdownId="navbar-search-dropdown"
              onNavigate={closeMobileMenu}
            />
          </div>
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
          if (e.target === e.currentTarget) closeMobileMenu();
        }}
      >
        <div
          ref={mobilePanelRef}
          className={`mobile-nav-panel ${mobileOpen ? 'is-open' : ''}`}
          style={{
            transform: mobileOpen ? 'translateX(0)' : 'translateX(100%)',
            transition: 'transform 260ms cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <div className="mobile-nav-header">
            <Link to="/" className="mobile-nav-brand" onClick={closeMobileMenu}>
              <img src="/assets/apc-preto.svg" alt="Algarve Pain Centre logo" className="mobile-nav-logo" />
            </Link>
            <button
              type="button"
              className="mobile-nav-close"
              aria-label="Close menu"
              onClick={closeMobileMenu}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <div className="mobile-nav-content">
            <div className={`mobile-nav-view mobile-nav-view-root ${mobileActiveSection ? 'is-hidden' : 'is-active'}`} aria-hidden={Boolean(mobileActiveSection)}>
              {mobileSections.map((section) => (
                <div key={section.id} className="mobile-nav-group">
                  <button
                    type="button"
                    id={`mobile-nav-trigger-${section.id}`}
                    className={section.isActive ? 'mobile-nav-entry is-current-section' : 'mobile-nav-entry'}
                    aria-label={`Open ${section.label} menu`}
                    onClick={() => openMobileSection(section.id)}
                  >
                    <span className="mobile-nav-entry-label">{section.label}</span>
                    <span className="mobile-nav-entry-icon" aria-hidden="true">›</span>
                  </button>
                </div>
              ))}
              {mainLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={
                    (location.pathname === link.to || location.pathname.startsWith(`${link.to}/`))
                      ? 'mobile-nav-entry mobile-nav-standalone-link is-current-section'
                      : 'mobile-nav-entry mobile-nav-standalone-link'
                  }
                  onClick={closeMobileMenu}
                  aria-current={(location.pathname === link.to || location.pathname.startsWith(`${link.to}/`)) ? 'page' : undefined}
                >
                  <span className="mobile-nav-entry-label">{link.label}</span>
                </Link>
              ))}
            </div>

            <div
              className={`mobile-nav-view mobile-nav-view-detail ${mobileActiveSection ? 'is-active' : 'is-hidden'}`}
              aria-hidden={!mobileActiveSection}
            >
              {currentMobileSection && (
                <>
                  <div className="mobile-nav-subpage-header">
                    <button
                      type="button"
                      className="mobile-nav-back"
                      onClick={returnToMobileMenuRoot}
                      aria-label={`Go back from ${currentMobileSection.label}`}
                    >
                      <span className="mobile-nav-back-icon" aria-hidden="true">‹</span>
                      <span>Back</span>
                    </button>
                    <h2 className="mobile-nav-subpage-title">{currentMobileSection.label}</h2>
                  </div>

                  <div className="mobile-nav-subpage-list" role="region" aria-label={`${currentMobileSection.label} pages`}>
                    {currentMobileSection.data.map((category) => (
                      <section key={category.title} className="mobile-nav-category">
                        <h3 className="mobile-nav-category-title">{category.title}</h3>
                        <div className="mobile-nav-links-list">
                          {category.items.map((item) => (
                            <Link
                              key={item.path}
                              to={item.path}
                              className={
                                location.pathname === item.path
                                  ? 'mobile-nav-link is-active'
                                  : 'mobile-nav-link'
                              }
                              onClick={closeMobileMenu}
                              aria-current={location.pathname === item.path ? 'page' : undefined}
                            >
                              <span>{item.label}</span>
                              <span className="mobile-nav-link-icon" aria-hidden="true">›</span>
                            </Link>
                          ))}
                        </div>
                      </section>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="mobile-nav-bottom">
              <Link
                to="/contact"
                className="navbar-cta mobile-nav-cta"
                onClick={closeMobileMenu}
                aria-current={location.pathname === '/contact' ? 'page' : undefined}
              >
                Book Now
              </Link>

              <div className="mobile-nav-footer-bottom">
                <div className="mobile-nav-footer-social" aria-label="Social media">
                  <a
                    href="https://www.instagram.com/algarvepaincentre/"
                    className="mobile-nav-footer-social-link"
                    aria-label="Visit Algarve Pain Centre on Instagram"
                  >
                    <svg fill="currentColor" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
                      <title>instagram</title>
                      <path d="M 9.9980469 3 C 6.1390469 3 3 6.1419531 3 10.001953 L 3 20.001953 C 3 23.860953 6.1419531 27 10.001953 27 L 20.001953 27 C 23.860953 27 27 23.858047 27 19.998047 L 27 9.9980469 C 27 6.1390469 23.858047 3 19.998047 3 L 9.9980469 3 z M 22 7 C 22.552 7 23 7.448 23 8 C 23 8.552 22.552 9 22 9 C 21.448 9 21 8.552 21 8 C 21 7.448 21.448 7 22 7 z M 15 9 C 18.309 9 21 11.691 21 15 C 21 18.309 18.309 21 15 21 C 11.691 21 9 18.309 9 15 C 9 11.691 11.691 9 15 9 z M 15 11 A 4 4 0 0 0 11 15 A 4 4 0 0 0 15 19 A 4 4 0 0 0 19 15 A 4 4 0 0 0 15 11 z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.facebook.com/profile.php?id=100068862086045"
                    className="mobile-nav-footer-social-link"
                    aria-label="Visit Algarve Pain Centre on Facebook"
                  >
                    <svg fill="currentColor" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                      <title>facebook</title>
                      <path d="M30.996 16.091c-0.001-8.281-6.714-14.994-14.996-14.994s-14.996 6.714-14.996 14.996c0 7.455 5.44 13.639 12.566 14.8l0.086 0.012v-10.478h-3.808v-4.336h3.808v-3.302c-0.019-0.167-0.029-0.361-0.029-0.557 0-2.923 2.37-5.293 5.293-5.293 0.141 0 0.281 0.006 0.42 0.016l-0.018-0.001c1.199 0.017 2.359 0.123 3.491 0.312l-0.134-0.019v3.69h-1.892c-0.086-0.012-0.185-0.019-0.285-0.019-1.197 0-2.168 0.97-2.168 2.168 0 0.068 0.003 0.135 0.009 0.202l-0.001-0.009v2.812h4.159l-0.665 4.336h-3.494v10.478c7.213-1.174 12.653-7.359 12.654-14.814v-0z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.linkedin.com/company/algarve-pain-centre/"
                    className="mobile-nav-footer-social-link"
                    aria-label="Visit Algarve Pain Centre on LinkedIn"
                  >
                    <svg fill="currentColor" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M478.234 600.75V1920H.036V600.75h478.198Zm720.853-2.438v77.737c69.807-45.056 150.308-71.249 272.38-71.249 397.577 0 448.521 308.666 448.521 577.562v737.602h-480.6v-700.836c0-117.867-42.173-140.215-120.15-140.215-74.134 0-120.151 23.55-120.151 140.215v700.836h-480.6V598.312h480.6ZM239.099 0c131.925 0 239.099 107.294 239.099 239.099s-107.174 239.099-239.1 239.099C107.295 478.198 0 370.904 0 239.098 0 107.295 107.294 0 239.099 0Z"
                        fillRule="evenodd"
                      />
                    </svg>
                  </a>
                </div>
                <p className="mobile-nav-footer-meta">© {new Date().getFullYear()} Algarve Pain Centre. All rights reserved.</p>
                <div className="mobile-nav-footer-credits">
                  <a
                    href="https://venenu.com/"
                    className="mobile-nav-footer-credits-link"
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
          </div>
        </div>
      </div>
    </header>
  );
}
