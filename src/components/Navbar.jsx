import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

const mainLinks = [{ to: '/about', label: 'About' }];

export const specialitiesCategories = [
  {
    title: 'Pain Medicine',
    items: [
      { label: 'Head Pain', path: '/specialities/pain-medicine/head-pain' },
      {
        label: 'Cervical Spine Pain',
        path: '/specialities/pain-medicine/cervical-spine-pain',
      },
      {
        label: 'Lumbar Spine Pain',
        path: '/specialities/pain-medicine/lumbar-spine-pain',
      },
      { label: 'Shoulder Pain', path: '/specialities/pain-medicine/shoulder-pain' },
      {
        label: 'Hand and Elbow Pain',
        path: '/specialities/pain-medicine/hand-and-elbow-pain',
      },
      {
        label: 'Hip and Groin Pain',
        path: '/specialities/pain-medicine/hip-and-groin-pain',
      },
      { label: 'Knee Pain', path: '/specialities/pain-medicine/knee-pain' },
      {
        label: 'Thoracic Wall Pain',
        path: '/specialities/pain-medicine/thoracic-wall-pain',
      },
      {
        label: 'Abdominal Wall Pain',
        path: '/specialities/pain-medicine/abdominal-wall-pain',
      },
      {
        label: 'Pelvic & Gynaecological',
        path: '/specialities/pain-medicine/pelvic-and-gynaecological',
      },
      { label: 'Facial Pain', path: '/specialities/pain-medicine/facial-pain' },
      {
        label: 'Foot and Ankle Pain',
        path: '/specialities/pain-medicine/foot-and-ankle-pain',
      },
    ],
  },
  {
    title: 'Sports Medicine',
    items: [
      { label: 'Injuries', path: '/specialities/sports-medicine/injuries' },
      { label: 'Prevention', path: '/specialities/sports-medicine/prevention' },
      {
        label: 'Rehabilitation',
        path: '/specialities/sports-medicine/rehabilitation',
      },
      { label: 'Performance', path: '/specialities/sports-medicine/performance' },
      { label: 'Psychology', path: '/specialities/sports-medicine/psychology' },
      { label: 'Nutrition', path: '/specialities/sports-medicine/nutrition' },
    ],
  },
  {
    title: 'Stroke Medicine',
    items: [
      {
        label: 'Rehabilitation',
        path: '/specialities/stroke-medicine/rehabilitation',
      },
      {
        label: 'Clinical and Secondary Prevention of Stroke',
        path:
          '/specialities/stroke-medicine/clinical-and-secondary-prevention-of-stroke',
      },
      {
        label: 'Feeding Autonomy',
        path: '/specialities/stroke-medicine/feeding-autonomy',
      },
      {
        label: 'Speech Autonomy',
        path: '/specialities/stroke-medicine/speech-autonomy',
      },
      {
        label: 'Post-Stroke Depression and Mood Disorders',
        path:
          '/specialities/stroke-medicine/post-stroke-depression-and-mood-disorders',
      },
      {
        label: 'Medical Complications Post Stroke',
        path: '/specialities/stroke-medicine/medical-complications-post-stroke',
      },
      {
        label: 'Post Stroke Spasticity',
        path: '/specialities/stroke-medicine/post-stroke-spasticity',
      },
      {
        label: 'Complex Regional Pain Syndrome',
        path: '/specialities/stroke-medicine/complex-regional-pain-syndrome',
      },
      {
        label: 'Postural and Motor control Autonomy',
        path:
          '/specialities/stroke-medicine/postural-and-motor-control-autonomy',
      },
      {
        label: 'Community Reintegration',
        path: '/specialities/stroke-medicine/community-reintegration',
      },
    ],
  },
];

export const treatmentsCategories = [
  {
    title: 'Surgical Treatments',
    items: [
      {
        label: 'Tubular Microsurgery',
        path: '/treatments/surgical-treatments/tubular-microsurgery',
      },
      {
        label: 'Spinal Fusion',
        path: '/treatments/surgical-treatments/spinal-fusion',
      },
      {
        label: 'Disc Replacement',
        path: '/treatments/surgical-treatments/disc-replacement',
      },
      {
        label: 'Lumbar Deformity Surgery',
        path: '/treatments/surgical-treatments/lumbar-deformity-surgery',
      },
    ],
  },
  {
    title: 'Minimally Invasive Treatments',
    items: [
      {
        label: 'Vertebroplasty',
        path: '/treatments/minimally-invasive-treatments/vertebroplasty',
      },
      {
        label: 'Radiofrequency',
        path: '/treatments/minimally-invasive-treatments/radiofrequency',
      },
      {
        label: 'Interspinous Spacers',
        path: '/treatments/minimally-invasive-treatments/interspinous-spacers',
      },
      {
        label: 'Peripheral Nerve Block',
        path: '/treatments/minimally-invasive-treatments/peripheral-nerve-block',
      },
      {
        label: 'Intra-articular Corticosteroids Injection',
        path:
          '/treatments/minimally-invasive-treatments/intra-articular-corticosteroids-injection',
      },
      {
        label: 'Calcification Barbotage',
        path: '/treatments/minimally-invasive-treatments/calcification-barbotage',
      },
      {
        label: 'Cryoblation',
        path: '/treatments/minimally-invasive-treatments/cryoblation',
      },
      {
        label: 'Nucleoplasty',
        path: '/treatments/minimally-invasive-treatments/nucleoplasty',
      },
      {
        label: 'Platelets Rich Plasma Injection',
        path:
          '/treatments/minimally-invasive-treatments/platelets-rich-plasma-injection',
      },
      {
        label: 'Hydrodistention',
        path: '/treatments/minimally-invasive-treatments/hydrodistention',
      },
      {
        label: 'Botulin Toxin Injection',
        path: '/treatments/minimally-invasive-treatments/botulin-toxin-injection',
      },
    ],
  },
  {
    title: 'Non-Invasive Treatments',
    items: [
      {
        label: 'Pharmacological Pain Management',
        path:
          '/treatments/non-invasive-treatments/pharmacological-pain-management',
      },
      {
        label: 'Physiotherapy',
        path: '/treatments/non-invasive-treatments/physiotherapy',
      },
      {
        label: 'Osteopathy',
        path: '/treatments/non-invasive-treatments/osteopathy',
      },
      {
        label: 'Occupation Therapy',
        path: '/treatments/non-invasive-treatments/occupation-therapy',
      },
      {
        label: 'Speech Therapy',
        path: '/treatments/non-invasive-treatments/speech-therapy',
      },
      {
        label: 'Psychology',
        path: '/treatments/non-invasive-treatments/psychology',
      },
      {
        label: 'Nutrition',
        path: '/treatments/non-invasive-treatments/nutrition',
      },
      {
        label: 'Exercise',
        path: '/treatments/non-invasive-treatments/exercise',
      },
      {
        label: 'Podology',
        path: '/treatments/non-invasive-treatments/podology',
      },
      {
        label: 'Home Care',
        path: '/treatments/non-invasive-treatments/home-care',
      },
    ],
  },
];

export const resourceCategories = [
  {
    title: 'Learn',
    items: [
      {
        label: 'Tips for Self-Care',
        path: '/resources/learn/tips-for-self-care',
      },
      {
        label: 'Blog',
        path: '/resources/learn/blog',
      },
    ],
  },
  {
    title: 'Testimonials',
    items: [
      {
        label: 'Overcoming Sciatica Pain',
        path: '/resources/testimonials/overcoming-sciatica-pain',
      },
      {
        label: 'Control Over Spine Degeneration',
        path: '/resources/testimonials/control-over-spine-degeneration',
      },
      {
        label: 'Recovering from Sports Injuries',
        path: '/resources/testimonials/recovering-from-sports-injuries',
      },
      {
        label: 'All Testimonials',
        path: '/resources/testimonials/all-testimonials',
      },
    ],
  },
];

export default function Navbar() {
  const location = useLocation();
  const [specialitiesOpen, setSpecialitiesOpen] = useState(false);
  const [treatmentsOpen, setTreatmentsOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const specialitiesRef = useRef(null);
  const treatmentsRef = useRef(null);
  const resourcesRef = useRef(null);
  const [specialitiesQuery, setSpecialitiesQuery] = useState('');
  const [treatmentsQuery, setTreatmentsQuery] = useState('');
  const [debouncedSpec, setDebouncedSpec] = useState('');
  const [debouncedTreat, setDebouncedTreat] = useState('');

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

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSpec(specialitiesQuery.trim()), 200);
    return () => clearTimeout(t);
  }, [specialitiesQuery]);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedTreat(treatmentsQuery.trim()), 200);
    return () => clearTimeout(t);
  }, [treatmentsQuery]);

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
    <header className="navbar">
      <div className="navbar-inner">
        <div className="navbar-left">
          <Link to="/" className="navbar-brand">
            <img
              className="navbar-logo"
              src="/assets/apc-preto.svg"
              alt="Algarve Pain Centre logo"
            />
          </Link>
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
          >
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
              {specialitiesCategories.flatMap(c => c.items).length > 10 && (
                <div className="navbar-dropdown-search">
                  <input
                    className="navbar-dropdown-input"
                    type="search"
                    placeholder="Search Specialities"
                    aria-label="Search Specialities"
                    value={specialitiesQuery}
                    onChange={(e) => setSpecialitiesQuery(e.target.value)}
                  />
                </div>
              )}
              <div className="navbar-dropdown-inner">
                {specialitiesCategories.map((category) => {
                  const items = debouncedSpec
                    ? category.items.filter((i) =>
                        i.label
                          .toLowerCase()
                          .includes(debouncedSpec.toLowerCase())
                      )
                    : category.items;
                  return (
                    <div
                      key={category.title}
                      className="navbar-dropdown-column"
                    >
                      <h3 className="navbar-dropdown-title">
                        {category.title}
                      </h3>
                      <ul className="navbar-dropdown-list">
                        {items.map((item) => (
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
                  );
                })}
                {debouncedSpec &&
                  specialitiesCategories.every((c) =>
                    c.items.every(
                      (i) =>
                        !i.label
                          .toLowerCase()
                          .includes(debouncedSpec.toLowerCase())
                    )
                  ) && (
                  <div className="navbar-dropdown-empty">No results</div>
                )}
              </div>
              <div className="navbar-dropdown-footer">
                <Link
                  to="/specialities"
                  className="navbar-dropdown-footer-link"
                  onClick={() => setSpecialitiesOpen(false)}
                >
                  View all Specialities
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
              {treatmentsCategories.flatMap(c => c.items).length > 10 && (
                <div className="navbar-dropdown-search">
                  <input
                    className="navbar-dropdown-input"
                    type="search"
                    placeholder="Search Treatments"
                    aria-label="Search Treatments"
                    value={treatmentsQuery}
                    onChange={(e) => setTreatmentsQuery(e.target.value)}
                  />
                </div>
              )}
              <div className="navbar-dropdown-inner">
                {treatmentsCategories.map((category) => {
                  const items = debouncedTreat
                    ? category.items.filter((i) =>
                        i.label
                          .toLowerCase()
                          .includes(debouncedTreat.toLowerCase())
                      )
                    : category.items;
                  return (
                    <div
                      key={category.title}
                      className="navbar-dropdown-column"
                    >
                      <h3 className="navbar-dropdown-title">
                        {category.title}
                      </h3>
                      <ul className="navbar-dropdown-list">
                        {items.map((item) => (
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
                  );
                })}
                {debouncedTreat &&
                  treatmentsCategories.every((c) =>
                    c.items.every(
                      (i) =>
                        !i.label
                          .toLowerCase()
                          .includes(debouncedTreat.toLowerCase())
                    )
                  ) && (
                  <div className="navbar-dropdown-empty">No results</div>
                )}
              </div>
              <div className="navbar-dropdown-footer">
                <Link
                  to="/treatments"
                  className="navbar-dropdown-footer-link"
                  onClick={() => setTreatmentsOpen(false)}
                >
                  View all Treatments
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
              Resource
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
              <div className="navbar-dropdown-footer">
                <Link
                  to="/resources"
                  className="navbar-dropdown-footer-link"
                  onClick={() => setResourcesOpen(false)}
                >
                  View all Resources
                </Link>
              </div>
            </div>
          </div>
          {mainLinks.map((link) => (
            <Link
              key={link.to}
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
          ))}
          <Link
            to="/contact"
            className="navbar-cta navbar-cta-mobile"
            onClick={() => setMobileOpen(false)}
          >
            Contact Us
          </Link>
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
            }}
          />
        </div>
        <Link to="/contact" className="navbar-cta navbar-cta-desktop">
          Contact Us
        </Link>
      </div>
    </header>
  );
}
