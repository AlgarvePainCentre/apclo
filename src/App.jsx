import './global.css';
import './responsive.css';
import './pages/home/Home.css';
import './pages/treatments/Treatments.css';
import './pages/specialities/MedicalSections.css';
import './pages/specialities/PainSpecialtyClone.css';
import { Component, Suspense, lazy, useEffect, useMemo, useRef, useState } from 'react';
import {
  Link,
  Navigate,
  Outlet,
  Route,
  Routes,
  matchPath,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function lazyWithPreload(factory) {
  const Component = lazy(factory);
  Component.preload = factory;
  return Component;
}

const Home = lazyWithPreload(() => import('./pages/home/Home'));
const Specialities = lazyWithPreload(() => import('./pages/specialities/Specialities'));
const Treatments = lazyWithPreload(() => import('./pages/treatments/Treatments'));
const About = lazyWithPreload(() => import('./pages/about/About'));
const Contact = lazyWithPreload(() => import('./pages/contact/Contact'));
const Resources = lazyWithPreload(() => import('./pages/resources/Resources'));

const HeadPainPage = lazyWithPreload(() => import('./pages/specialities/PainMedicine/HeadPain/page'));
const CervicalSpinePainPage = lazyWithPreload(() => import('./pages/specialities/PainMedicine/CervicalSpinePain/page'));
const LumbarSpinePainPage = lazyWithPreload(() => import('./pages/specialities/PainMedicine/LumbarSpinePain/page'));
const ShoulderPainPage = lazyWithPreload(() => import('./pages/specialities/PainMedicine/ShoulderPain/page'));
const HandAndElbowPainPage = lazyWithPreload(() => import('./pages/specialities/PainMedicine/HandAndElbowPain/page'));
const HipAndGroinPainPage = lazyWithPreload(() => import('./pages/specialities/PainMedicine/HipAndGroinPain/page'));
const KneePainPage = lazyWithPreload(() => import('./pages/specialities/PainMedicine/KneePain/page'));
const ThoracicWallPainPage = lazyWithPreload(() => import('./pages/specialities/PainMedicine/ThoracicWallPain/page'));
const AbdominalWallPainPage = lazyWithPreload(() => import('./pages/specialities/PainMedicine/AbdominalWallPain/page'));
const PelvicAndGynaecologicalPage = lazyWithPreload(() => import('./pages/specialities/PainMedicine/PelvicAndGynaecological/page'));
const FacialPainPage = lazyWithPreload(() => import('./pages/specialities/PainMedicine/FacialPain/page'));
const FootAndAnklePainPage = lazyWithPreload(() => import('./pages/specialities/PainMedicine/FootAndAnklePain/page'));

const InjuriesPage = lazyWithPreload(() => import('./pages/specialities/SportsMedicine/Injuries/page'));
const PreventionPage = lazyWithPreload(() => import('./pages/specialities/SportsMedicine/Prevention/page'));
const SportsRehabilitationPage = lazyWithPreload(() => import('./pages/specialities/SportsMedicine/Rehabilitation/page'));
const PerformancePage = lazyWithPreload(() => import('./pages/specialities/SportsMedicine/Performance/page'));
const PsychologyPage = lazyWithPreload(() => import('./pages/specialities/SportsMedicine/Psychology/page'));
const NutritionPage = lazyWithPreload(() => import('./pages/specialities/SportsMedicine/Nutrition/page'));

const StrokeRehabilitationPage = lazyWithPreload(() => import('./pages/specialities/StrokeMedicine/Rehabilitation/page'));
const ClinicalAndSecondaryPreventionOfStrokePage = lazyWithPreload(() =>
  import('./pages/specialities/StrokeMedicine/ClinicalAndSecondaryPreventionOfStroke/page')
);
const FeedingAutonomyPage = lazyWithPreload(() => import('./pages/specialities/StrokeMedicine/FeedingAutonomy/page'));
const SpeechAutonomyPage = lazyWithPreload(() => import('./pages/specialities/StrokeMedicine/SpeechAutonomy/page'));
const PostStrokeDepressionAndMoodDisordersPage = lazyWithPreload(() =>
  import('./pages/specialities/StrokeMedicine/PostStrokeDepressionAndMoodDisorders/page')
);
const MedicalComplicationsPostStrokePage = lazyWithPreload(() =>
  import('./pages/specialities/StrokeMedicine/MedicalComplicationsPostStroke/page')
);
const PostStrokeSpasticityPage = lazyWithPreload(() => import('./pages/specialities/StrokeMedicine/PostStrokeSpasticity/page'));
const ComplexRegionalPainSyndromePage = lazyWithPreload(() =>
  import('./pages/specialities/StrokeMedicine/ComplexRegionalPainSyndrome/page')
);
const PosturalAndMotorControlAutonomyPage = lazyWithPreload(() =>
  import('./pages/specialities/StrokeMedicine/PosturalAndMotorControlAutonomy/page')
);
const CommunityReintegrationPage = lazyWithPreload(() => import('./pages/specialities/StrokeMedicine/CommunityReintegration/page'));

const TubularMicrosurgeryPage = lazyWithPreload(() => import('./pages/treatments/SurgicalTreatment/TubularMicrosurgery/page'));
const SpinalFusionPage = lazyWithPreload(() => import('./pages/treatments/SurgicalTreatment/SpinalFusion/page'));
const DiscReplacementPage = lazyWithPreload(() => import('./pages/treatments/SurgicalTreatment/DiscReplacement/page'));
const LumbarDeformitySurgeryPage = lazyWithPreload(() => import('./pages/treatments/SurgicalTreatment/LumbarDeformitySurgery/page'));

const VertebroplastyPage = lazyWithPreload(() => import('./pages/treatments/MinimallyInvasiveTreatments/Vertebroplasty/page'));
const RadiofrequencyPage = lazyWithPreload(() => import('./pages/treatments/MinimallyInvasiveTreatments/Radiofrequency/page'));
const InterspinousSpacersPage = lazyWithPreload(() =>
  import('./pages/treatments/MinimallyInvasiveTreatments/InterspinousSpacers/page')
);
const PeripheralNerveBlockPage = lazyWithPreload(() =>
  import('./pages/treatments/MinimallyInvasiveTreatments/PeripheralNerveBlock/page')
);
const IntraArticularCorticosteroidsInjectionPage = lazyWithPreload(() =>
  import('./pages/treatments/MinimallyInvasiveTreatments/IntraArticularCorticosteroidsInjection/page')
);
const CalcificationBarbotagePage = lazyWithPreload(() =>
  import('./pages/treatments/MinimallyInvasiveTreatments/CalcificationBarbotage/page')
);
const CryoblationPage = lazyWithPreload(() => import('./pages/treatments/MinimallyInvasiveTreatments/Cryoblation/page'));
const NucleoplastyPage = lazyWithPreload(() => import('./pages/treatments/MinimallyInvasiveTreatments/Nucleoplasty/page'));
const PlateletsRichPlasmaInjectionPage = lazyWithPreload(() =>
  import('./pages/treatments/MinimallyInvasiveTreatments/PlateletsRichPlasmaInjection/page')
);
const HydrodistentionPage = lazyWithPreload(() => import('./pages/treatments/MinimallyInvasiveTreatments/Hydrodistention/page'));
const BotulinToxinInjectionPage = lazyWithPreload(() => import('./pages/treatments/MinimallyInvasiveTreatments/BotulinToxinInjection/page'));

const PharmacologicalPainManagementPage = lazyWithPreload(() =>
  import('./pages/treatments/NonInvasiveTreatments/PharmacologicalPainManagement/page')
);
const PhysiotherapyPage = lazyWithPreload(() => import('./pages/treatments/NonInvasiveTreatments/Physiotherapy/page'));
const OsteopathyPage = lazyWithPreload(() => import('./pages/treatments/NonInvasiveTreatments/Osteopathy/page'));
const OccupationTherapyPage = lazyWithPreload(() => import('./pages/treatments/NonInvasiveTreatments/OccupationTherapy/page'));
const SpeechTherapyPage = lazyWithPreload(() => import('./pages/treatments/NonInvasiveTreatments/SpeechTherapy/page'));
const PsychologyTreatmentPage = lazyWithPreload(() => import('./pages/treatments/NonInvasiveTreatments/Psychology/page'));
const NutritionTreatmentPage = lazyWithPreload(() => import('./pages/treatments/NonInvasiveTreatments/Nutrition/page'));
const ExercisePage = lazyWithPreload(() => import('./pages/treatments/NonInvasiveTreatments/Exercise/page'));
const PodologyPage = lazyWithPreload(() => import('./pages/treatments/NonInvasiveTreatments/Podology/page'));
const HomeCarePage = lazyWithPreload(() => import('./pages/treatments/NonInvasiveTreatments/HomeCare/page'));

const BlogPage = lazyWithPreload(() => import('./pages/resources/Learn/Blog/page'));
const BlogArticlePage = lazyWithPreload(() => import('./pages/resources/Learn/Blog/articlePage'));
const CervicalPainPage = lazyWithPreload(() => import('./pages/resources/Learn/CervicalPain/page'));
const ConqueringCervicalPainPage = lazyWithPreload(() => import('./pages/resources/Learn/ConqueringCervicalPain/page'));
const AcuteAndChronicPainPage = lazyWithPreload(() => import('./pages/resources/Learn/AcuteAndChronicPain/page'));

const OvercomingSciaticaPainPage = lazyWithPreload(() => import('./pages/resources/Testimonials/OvercomingSciaticaPain/page'));
const ControlOverSpineDegenerationPage = lazyWithPreload(() => import('./pages/resources/Testimonials/ControlOverSpineDegeneration/page'));
const RecoveringFromSportsInjuriesPage = lazyWithPreload(() => import('./pages/resources/Testimonials/RecoveringFromSportsInjuries/page'));
const AllTestimonialsPage = lazyWithPreload(() => import('./pages/resources/Testimonials/AllTestimonials/page'));

const CareersPage = lazyWithPreload(() => import('./pages/company/Careers/page'));
const PressPage = lazyWithPreload(() => import('./pages/company/Press/page'));
const TermsOfServicePage = lazyWithPreload(() => import('./pages/company/TermsOfService/page'));
const PrivacyPolicyPage = lazyWithPreload(() => import('./pages/company/PrivacyPolicy/page'));
const CookiePolicyPage = lazyWithPreload(() => import('./pages/company/CookiePolicy/page'));
const AccessibilityStatementPage = lazyWithPreload(() => import('./pages/company/AccessibilityStatement/page'));
const SupportPage = lazyWithPreload(() => import('./pages/gethelp/Support/page'));
const PricingPage = lazyWithPreload(() => import('./pages/gethelp/Pricing/page'));

function ShellLayout() {
  return (
    <div className="page">
      <Navbar />
      <div className="page-transition-shell">
        <div className="page-content">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
}

function RedirectTestimonialsTypos() {
  const location = useLocation();
  const pathname = location.pathname
    .replace('/resources/testemunials', '/resources/testimonials')
    .replace('/resources/testemunial', '/resources/testimonials');

  const resolvedPathname =
    pathname === '/resources/testimonials' ? '/resources/testimonials/all-testimonials' : pathname;

  return <Navigate to={`${resolvedPathname}${location.search}${location.hash}`} replace />;
}

class AppErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {}

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="page">
        <Navbar />
        <main className="page-main">
          <section className="page-section">
            <h1>Something went wrong</h1>
            <p>Try refreshing the page or return to the home page.</p>
            <p>
              <Link to="/">Go to Home</Link>
            </p>
          </section>
        </main>
        <Footer />
      </div>
    );
  }
}

function NotFoundPage() {
  return (
    <main className="page-main">
      <section className="page-section">
        <h1>Page not found</h1>
        <p>Check the URL or return to the home page.</p>
        <p>
          <Link to="/">Go to Home</Link>
        </p>
      </section>
    </main>
  );
}

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [renderLocation, setRenderLocation] = useState(location);
  const [transitionStatus, setTransitionStatus] = useState(() => ({
    active: false,
    showLoader: false,
    error: null,
    pendingHref: null,
    prevHref: null,
  }));
  const pendingRef = useRef({ id: 0, href: null });
  const stableHrefRef = useRef(`${location.pathname}${location.search}${location.hash}`);
  const suppressNextLocationSyncRef = useRef(false);

  const prefersReducedMotion = useMemo(() => {
    try {
      return Boolean(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    } catch {
      return false;
    }
  }, []);

  const preloaders = useMemo(() => {
    const entries = [
      { path: '/', preload: Home.preload },
      { path: '/specialities', preload: Specialities.preload },
      { path: '/treatments', preload: Treatments.preload },
      { path: '/about', preload: About.preload },
      { path: '/contact', preload: Contact.preload },
      { path: '/resources', preload: Resources.preload },

      { path: '/specialities/pain-medicine/head-pain', preload: HeadPainPage.preload },
      { path: '/specialities/pain-medicine/cervical-spine-pain', preload: CervicalSpinePainPage.preload },
      { path: '/specialities/pain-medicine/lumbar-spine-pain', preload: LumbarSpinePainPage.preload },
      { path: '/specialities/pain-medicine/shoulder-pain', preload: ShoulderPainPage.preload },
      { path: '/specialities/pain-medicine/hand-and-elbow-pain', preload: HandAndElbowPainPage.preload },
      { path: '/specialities/pain-medicine/hip-and-groin-pain', preload: HipAndGroinPainPage.preload },
      { path: '/specialities/pain-medicine/knee-pain', preload: KneePainPage.preload },
      { path: '/specialities/pain-medicine/thoracic-wall-pain', preload: ThoracicWallPainPage.preload },
      { path: '/specialities/pain-medicine/abdominal-wall-pain', preload: AbdominalWallPainPage.preload },
      { path: '/specialities/pain-medicine/pelvic-and-gynaecological', preload: PelvicAndGynaecologicalPage.preload },
      { path: '/specialities/pain-medicine/facial-pain', preload: FacialPainPage.preload },
      { path: '/specialities/pain-medicine/foot-and-ankle-pain', preload: FootAndAnklePainPage.preload },

      { path: '/specialities/sports-medicine/injuries', preload: InjuriesPage.preload },
      { path: '/specialities/sports-medicine/prevention', preload: PreventionPage.preload },
      { path: '/specialities/sports-medicine/rehabilitation', preload: SportsRehabilitationPage.preload },
      { path: '/specialities/sports-medicine/performance', preload: PerformancePage.preload },
      { path: '/specialities/sports-medicine/psychology', preload: PsychologyPage.preload },
      { path: '/specialities/sports-medicine/nutrition', preload: NutritionPage.preload },

      { path: '/specialities/stroke-medicine/rehabilitation', preload: StrokeRehabilitationPage.preload },
      {
        path: '/specialities/stroke-medicine/clinical-and-secondary-prevention-of-stroke',
        preload: ClinicalAndSecondaryPreventionOfStrokePage.preload,
      },
      { path: '/specialities/stroke-medicine/feeding-autonomy', preload: FeedingAutonomyPage.preload },
      { path: '/specialities/stroke-medicine/speech-autonomy', preload: SpeechAutonomyPage.preload },
      {
        path: '/specialities/stroke-medicine/post-stroke-depression-and-mood-disorders',
        preload: PostStrokeDepressionAndMoodDisordersPage.preload,
      },
      {
        path: '/specialities/stroke-medicine/medical-complications-post-stroke',
        preload: MedicalComplicationsPostStrokePage.preload,
      },
      { path: '/specialities/stroke-medicine/post-stroke-spasticity', preload: PostStrokeSpasticityPage.preload },
      { path: '/specialities/stroke-medicine/complex-regional-pain-syndrome', preload: ComplexRegionalPainSyndromePage.preload },
      {
        path: '/specialities/stroke-medicine/postural-and-motor-control-autonomy',
        preload: PosturalAndMotorControlAutonomyPage.preload,
      },
      { path: '/specialities/stroke-medicine/community-reintegration', preload: CommunityReintegrationPage.preload },

      { path: '/treatments/surgical-treatments/tubular-microsurgery', preload: TubularMicrosurgeryPage.preload },
      { path: '/treatments/surgical-treatments/spinal-fusion', preload: SpinalFusionPage.preload },
      { path: '/treatments/surgical-treatments/disc-replacement', preload: DiscReplacementPage.preload },
      { path: '/treatments/surgical-treatments/lumbar-deformity-surgery', preload: LumbarDeformitySurgeryPage.preload },

      { path: '/treatments/minimally-invasive-treatments/vertebroplasty', preload: VertebroplastyPage.preload },
      { path: '/treatments/minimally-invasive-treatments/radiofrequency', preload: RadiofrequencyPage.preload },
      { path: '/treatments/minimally-invasive-treatments/interspinous-spacers', preload: InterspinousSpacersPage.preload },
      { path: '/treatments/minimally-invasive-treatments/peripheral-nerve-block', preload: PeripheralNerveBlockPage.preload },
      {
        path: '/treatments/minimally-invasive-treatments/intra-articular-corticosteroids-injection',
        preload: IntraArticularCorticosteroidsInjectionPage.preload,
      },
      { path: '/treatments/minimally-invasive-treatments/calcification-barbotage', preload: CalcificationBarbotagePage.preload },
      { path: '/treatments/minimally-invasive-treatments/cryoblation', preload: CryoblationPage.preload },
      { path: '/treatments/minimally-invasive-treatments/nucleoplasty', preload: NucleoplastyPage.preload },
      {
        path: '/treatments/minimally-invasive-treatments/platelets-rich-plasma-injection',
        preload: PlateletsRichPlasmaInjectionPage.preload,
      },
      { path: '/treatments/minimally-invasive-treatments/hydrodistention', preload: HydrodistentionPage.preload },
      { path: '/treatments/minimally-invasive-treatments/botulin-toxin-injection', preload: BotulinToxinInjectionPage.preload },

      { path: '/treatments/non-invasive-treatments/pharmacological-pain-management', preload: PharmacologicalPainManagementPage.preload },
      { path: '/treatments/non-invasive-treatments/physiotherapy', preload: PhysiotherapyPage.preload },
      { path: '/treatments/non-invasive-treatments/osteopathy', preload: OsteopathyPage.preload },
      { path: '/treatments/non-invasive-treatments/occupation-therapy', preload: OccupationTherapyPage.preload },
      { path: '/treatments/non-invasive-treatments/speech-therapy', preload: SpeechTherapyPage.preload },
      { path: '/treatments/non-invasive-treatments/psychology', preload: PsychologyTreatmentPage.preload },
      { path: '/treatments/non-invasive-treatments/nutrition', preload: NutritionTreatmentPage.preload },
      { path: '/treatments/non-invasive-treatments/exercise', preload: ExercisePage.preload },
      { path: '/treatments/non-invasive-treatments/podology', preload: PodologyPage.preload },
      { path: '/treatments/non-invasive-treatments/home-care', preload: HomeCarePage.preload },

      { path: '/support', preload: SupportPage.preload },
      { path: '/pricing', preload: PricingPage.preload },

      { path: '/blog', preload: BlogPage.preload },
      { path: '/blog/:slug', preload: BlogArticlePage.preload },
      { path: '/blog/*', preload: BlogArticlePage.preload },

      { path: '/resources/learn/cervical-pain', preload: CervicalPainPage.preload },
      { path: '/resources/learn/conquering-cervical-pain', preload: ConqueringCervicalPainPage.preload },
      { path: '/resources/learn/acute-and-chronic-pain', preload: AcuteAndChronicPainPage.preload },

      { path: '/resources/testimonials/overcoming-sciatica-pain', preload: OvercomingSciaticaPainPage.preload },
      { path: '/resources/testimonials/control-over-spine-degeneration', preload: ControlOverSpineDegenerationPage.preload },
      { path: '/resources/testimonials/recovering-from-sports-injuries', preload: RecoveringFromSportsInjuriesPage.preload },
      { path: '/resources/testimonials/all-testimonials', preload: AllTestimonialsPage.preload },

      { path: '/company/careers', preload: CareersPage.preload },
      { path: '/company/press', preload: PressPage.preload },
      { path: '/company/terms-of-service', preload: TermsOfServicePage.preload },
      { path: '/company/privacy-policy', preload: PrivacyPolicyPage.preload },
      { path: '/company/cookie-policy', preload: CookiePolicyPage.preload },
      { path: '/company/accessibility-statement', preload: AccessibilityStatementPage.preload },
    ];

    return entries.filter((e) => typeof e.preload === 'function');
  }, []);

  const preloadForPathname = useMemo(() => {
    const cache = new Map();
    return async (pathname) => {
      if (!pathname || typeof pathname !== 'string') return;
      if (cache.has(pathname)) return cache.get(pathname);

      const match = preloaders.find((entry) => matchPath({ path: entry.path, end: true }, pathname));
      if (!match) return;

      const p = Promise.resolve()
        .then(() => match.preload())
        .catch((err) => {
          cache.delete(pathname);
          throw err;
        });

      cache.set(pathname, p);
      return p;
    };
  }, [preloaders]);

  useEffect(() => {
    stableHrefRef.current = `${renderLocation.pathname}${renderLocation.search}${renderLocation.hash}`;
  }, [renderLocation.pathname, renderLocation.search, renderLocation.hash]);

  useEffect(() => {
    if (suppressNextLocationSyncRef.current) {
      suppressNextLocationSyncRef.current = false;
      setRenderLocation(location);
      return;
    }

    const nextHref = `${location.pathname}${location.search}${location.hash}`;
    const currentHref = `${renderLocation.pathname}${renderLocation.search}${renderLocation.hash}`;

    if (nextHref === currentHref) return;
    if (location.pathname === renderLocation.pathname && location.search === renderLocation.search) {
      setRenderLocation(location);
      return;
    }
    if (prefersReducedMotion) {
      setRenderLocation(location);
      return;
    }

    const nextId = pendingRef.current.id + 1;
    pendingRef.current = { id: nextId, href: nextHref };

    setTransitionStatus({
      active: true,
      showLoader: false,
      error: null,
      pendingHref: nextHref,
      prevHref: stableHrefRef.current,
    });

    const showLoaderTimer = window.setTimeout(() => {
      setTransitionStatus((s) => (s.active ? { ...s, showLoader: true } : s));
    }, 120);

    const timeoutMs = 12000;
    let timeoutTimer = 0;
    const timeoutPromise = new Promise((_, reject) => {
      timeoutTimer = window.setTimeout(() => {
        reject(new Error('Navigation timed out'));
      }, timeoutMs);
    });

    Promise.race([preloadForPathname(location.pathname), timeoutPromise])
      .then(() => {
        if (pendingRef.current.id !== nextId) return;
        window.clearTimeout(showLoaderTimer);
        if (timeoutTimer) window.clearTimeout(timeoutTimer);
        setRenderLocation(location);
      })
      .catch((err) => {
        if (pendingRef.current.id !== nextId) return;
        window.clearTimeout(showLoaderTimer);
        if (timeoutTimer) window.clearTimeout(timeoutTimer);
        setTransitionStatus((s) => ({ ...s, active: true, showLoader: true, error: err }));
      });

    return () => {
      window.clearTimeout(showLoaderTimer);
      if (timeoutTimer) window.clearTimeout(timeoutTimer);
    };
  }, [location, prefersReducedMotion, preloadForPathname, renderLocation]);

  useEffect(() => {
    if (!transitionStatus.active) return;
    if (transitionStatus.error) return;
    if (!transitionStatus.pendingHref) return;

    const currentHref = `${renderLocation.pathname}${renderLocation.search}${renderLocation.hash}`;
    if (currentHref !== transitionStatus.pendingHref) return;

    const t = window.setTimeout(() => {
      setTransitionStatus({ active: false, showLoader: false, error: null, pendingHref: null, prevHref: null });
    }, 180);
    return () => window.clearTimeout(t);
  }, [renderLocation.pathname, renderLocation.search, renderLocation.hash, transitionStatus.active, transitionStatus.error, transitionStatus.pendingHref]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const w = window;
    w.__apcPreloadRoute = (to) => {
      try {
        const url = typeof to === 'string' ? new URL(to, w.location.origin) : null;
        if (!url || url.origin !== w.location.origin) return;
        return preloadForPathname(url.pathname);
      } catch {
        return;
      }
    };

    const conn = w.navigator?.connection;
    const saveData = Boolean(conn && conn.saveData);
    const effectiveType = conn && typeof conn.effectiveType === 'string' ? conn.effectiveType : '';
    const shouldPrefetchOnIdle = !saveData && !/2g/.test(effectiveType);

    const onAnchorIntent = (e) => {
      const target = e.target;
      if (!(target instanceof Element)) return;
      const a = target.closest('a[href]');
      if (!a) return;
      if (a.getAttribute('target') === '_blank') return;
      const raw = a.getAttribute('href');
      if (!raw || raw.startsWith('mailto:') || raw.startsWith('tel:')) return;
      let url;
      try {
        url = new URL(raw, w.location.origin);
      } catch {
        return;
      }
      if (url.origin !== w.location.origin) return;
      preloadForPathname(url.pathname);
    };

    document.addEventListener('pointerover', onAnchorIntent, true);
    document.addEventListener('focusin', onAnchorIntent, true);
    document.addEventListener('touchstart', onAnchorIntent, { passive: true, capture: true });

    let idleId = null;
    const idle = (cb) => {
      if (!shouldPrefetchOnIdle) return null;
      if (typeof w.requestIdleCallback === 'function') return w.requestIdleCallback(cb, { timeout: 2500 });
      return w.setTimeout(cb, 1800);
    };
    idleId = idle(() => {
      preloadForPathname('/contact');
      preloadForPathname('/about');
      preloadForPathname('/blog');
    });

    return () => {
      document.removeEventListener('pointerover', onAnchorIntent, true);
      document.removeEventListener('focusin', onAnchorIntent, true);
      document.removeEventListener('touchstart', onAnchorIntent, true);
      if (idleId) {
        if (typeof w.cancelIdleCallback === 'function') w.cancelIdleCallback(idleId);
        else w.clearTimeout(idleId);
      }
      try {
        delete w.__apcPreloadRoute;
      } catch {}
    };
  }, [preloadForPathname]);

  return (
    <div className="App">
      <AppErrorBoundary key={renderLocation.key}>
        <div
          className={transitionStatus.active ? 'page-transition-overlay is-active' : 'page-transition-overlay'}
          aria-hidden={transitionStatus.active ? 'false' : 'true'}
        />
        <div className={transitionStatus.showLoader ? 'page-top-loader is-active' : 'page-top-loader'} aria-hidden="true" />

        {transitionStatus.error ? (
          <div
            role="alertdialog"
            aria-modal="true"
            aria-label="Navigation error"
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 1200,
              display: 'grid',
              placeItems: 'center',
              padding: '24px',
            }}
          >
            <div
              style={{
                width: 'min(560px, 100%)',
                background: '#ffffff',
                borderRadius: 16,
                boxShadow: '0 20px 60px rgba(0,0,0,0.18)',
                padding: 20,
              }}
            >
              <h2 style={{ fontSize: 20, marginBottom: 8 }}>Page didn’t load</h2>
              <p style={{ marginBottom: 14, color: '#374151' }}>
                Check your connection and try again.
              </p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <button
                  type="button"
                  className="primary-btn"
                  onClick={() => {
                    const href = transitionStatus.pendingHref;
                    if (!href) {
                      setTransitionStatus({ active: false, showLoader: false, error: null, pendingHref: null, prevHref: null });
                      return;
                    }
                    setTransitionStatus((s) => ({ ...s, active: true, showLoader: true, error: null }));
                    preloadForPathname(location.pathname)
                      .then(() => {
                        setRenderLocation(location);
                      })
                      .catch((err) => {
                        setTransitionStatus((s) => ({ ...s, active: true, showLoader: true, error: err }));
                      });
                  }}
                >
                  Retry
                </button>
                <button
                  type="button"
                  className="outline-btn"
                  onClick={() => {
                    const prevHref = transitionStatus.prevHref;
                    setTransitionStatus({ active: false, showLoader: false, error: null, pendingHref: null, prevHref: null });
                    if (prevHref) {
                      suppressNextLocationSyncRef.current = true;
                      navigate(prevHref, { replace: true });
                    }
                  }}
                >
                  Stay here
                </button>
                <a className="secondary-btn" href={window.location.href}>
                  Reload site
                </a>
              </div>
            </div>
          </div>
        ) : null}

        <Suspense fallback={null}>
          <Routes location={renderLocation}>
            <Route path="/resources/testemunial/*" element={<RedirectTestimonialsTypos />} />
            <Route path="/resources/testemunials/*" element={<RedirectTestimonialsTypos />} />
            <Route path="/resources/learn/blog" element={<Navigate to="/blog" replace />} />

            <Route element={<ShellLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/specialities" element={<Specialities />} />
              <Route path="/treatments" element={<Treatments />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/resources" element={<Resources />} />

              <Route path="/specialities/pain-medicine/head-pain" element={<HeadPainPage />} />
              <Route path="/specialities/pain-medicine/cervical-spine-pain" element={<CervicalSpinePainPage />} />
              <Route path="/specialities/pain-medicine/lumbar-spine-pain" element={<LumbarSpinePainPage />} />
              <Route path="/specialities/pain-medicine/shoulder-pain" element={<ShoulderPainPage />} />
              <Route path="/specialities/pain-medicine/hand-and-elbow-pain" element={<HandAndElbowPainPage />} />
              <Route path="/specialities/pain-medicine/hip-and-groin-pain" element={<HipAndGroinPainPage />} />
              <Route path="/specialities/pain-medicine/knee-pain" element={<KneePainPage />} />
              <Route path="/specialities/pain-medicine/thoracic-wall-pain" element={<ThoracicWallPainPage />} />
              <Route path="/specialities/pain-medicine/abdominal-wall-pain" element={<AbdominalWallPainPage />} />
              <Route path="/specialities/pain-medicine/pelvic-and-gynaecological" element={<PelvicAndGynaecologicalPage />} />
              <Route path="/specialities/pain-medicine/facial-pain" element={<FacialPainPage />} />
              <Route path="/specialities/pain-medicine/foot-and-ankle-pain" element={<FootAndAnklePainPage />} />

              <Route path="/specialities/sports-medicine/injuries" element={<InjuriesPage />} />
              <Route path="/specialities/sports-medicine/prevention" element={<PreventionPage />} />
              <Route path="/specialities/sports-medicine/rehabilitation" element={<SportsRehabilitationPage />} />
              <Route path="/specialities/sports-medicine/performance" element={<PerformancePage />} />
              <Route path="/specialities/sports-medicine/psychology" element={<PsychologyPage />} />
              <Route path="/specialities/sports-medicine/nutrition" element={<NutritionPage />} />

              <Route path="/specialities/stroke-medicine/rehabilitation" element={<StrokeRehabilitationPage />} />
              <Route path="/specialities/stroke-medicine/clinical-and-secondary-prevention-of-stroke" element={<ClinicalAndSecondaryPreventionOfStrokePage />} />
              <Route path="/specialities/stroke-medicine/feeding-autonomy" element={<FeedingAutonomyPage />} />
              <Route path="/specialities/stroke-medicine/speech-autonomy" element={<SpeechAutonomyPage />} />
              <Route path="/specialities/stroke-medicine/post-stroke-depression-and-mood-disorders" element={<PostStrokeDepressionAndMoodDisordersPage />} />
              <Route path="/specialities/stroke-medicine/medical-complications-post-stroke" element={<MedicalComplicationsPostStrokePage />} />
              <Route path="/specialities/stroke-medicine/post-stroke-spasticity" element={<PostStrokeSpasticityPage />} />
              <Route path="/specialities/stroke-medicine/complex-regional-pain-syndrome" element={<ComplexRegionalPainSyndromePage />} />
              <Route path="/specialities/stroke-medicine/postural-and-motor-control-autonomy" element={<PosturalAndMotorControlAutonomyPage />} />
              <Route path="/specialities/stroke-medicine/community-reintegration" element={<CommunityReintegrationPage />} />

              <Route path="/treatments/surgical-treatments/tubular-microsurgery" element={<TubularMicrosurgeryPage />} />
              <Route path="/treatments/surgical-treatments/spinal-fusion" element={<SpinalFusionPage />} />
              <Route path="/treatments/surgical-treatments/disc-replacement" element={<DiscReplacementPage />} />
              <Route path="/treatments/surgical-treatments/lumbar-deformity-surgery" element={<LumbarDeformitySurgeryPage />} />

              <Route path="/treatments/minimally-invasive-treatments/vertebroplasty" element={<VertebroplastyPage />} />
              <Route path="/treatments/minimally-invasive-treatments/radiofrequency" element={<RadiofrequencyPage />} />
              <Route path="/treatments/minimally-invasive-treatments/interspinous-spacers" element={<InterspinousSpacersPage />} />
              <Route path="/treatments/minimally-invasive-treatments/peripheral-nerve-block" element={<PeripheralNerveBlockPage />} />
              <Route path="/treatments/minimally-invasive-treatments/intra-articular-corticosteroids-injection" element={<IntraArticularCorticosteroidsInjectionPage />} />
              <Route path="/treatments/minimally-invasive-treatments/calcification-barbotage" element={<CalcificationBarbotagePage />} />
              <Route path="/treatments/minimally-invasive-treatments/cryoblation" element={<CryoblationPage />} />
              <Route path="/treatments/minimally-invasive-treatments/nucleoplasty" element={<NucleoplastyPage />} />
              <Route path="/treatments/minimally-invasive-treatments/platelets-rich-plasma-injection" element={<PlateletsRichPlasmaInjectionPage />} />
              <Route path="/treatments/minimally-invasive-treatments/hydrodistention" element={<HydrodistentionPage />} />
              <Route path="/treatments/minimally-invasive-treatments/botulin-toxin-injection" element={<BotulinToxinInjectionPage />} />

              <Route path="/treatments/non-invasive-treatments/pharmacological-pain-management" element={<PharmacologicalPainManagementPage />} />
              <Route path="/treatments/non-invasive-treatments/physiotherapy" element={<PhysiotherapyPage />} />
              <Route path="/treatments/non-invasive-treatments/osteopathy" element={<OsteopathyPage />} />
              <Route path="/treatments/non-invasive-treatments/occupation-therapy" element={<OccupationTherapyPage />} />
              <Route path="/treatments/non-invasive-treatments/speech-therapy" element={<SpeechTherapyPage />} />
              <Route path="/treatments/non-invasive-treatments/psychology" element={<PsychologyTreatmentPage />} />
              <Route path="/treatments/non-invasive-treatments/nutrition" element={<NutritionTreatmentPage />} />
              <Route path="/treatments/non-invasive-treatments/exercise" element={<ExercisePage />} />
              <Route path="/treatments/non-invasive-treatments/podology" element={<PodologyPage />} />
              <Route path="/treatments/non-invasive-treatments/home-care" element={<HomeCarePage />} />

              <Route path="/support" element={<SupportPage />} />
              <Route path="/pricing" element={<PricingPage />} />

              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogArticlePage />} />
              <Route path="/blog/*" element={<BlogArticlePage />} />

              <Route path="/resources/learn/tips-for-self-care" element={<Navigate to="/resources" replace />} />
              <Route path="/resources/learn/cervical-pain" element={<CervicalPainPage />} />
              <Route path="/resources/learn/conquering-cervical-pain" element={<ConqueringCervicalPainPage />} />
              <Route path="/resources/learn/acute-and-chronic-pain" element={<AcuteAndChronicPainPage />} />

              <Route path="/resources/testimonials/overcoming-sciatica-pain" element={<OvercomingSciaticaPainPage />} />
              <Route path="/resources/testimonials/control-over-spine-degeneration" element={<ControlOverSpineDegenerationPage />} />
              <Route path="/resources/testimonials/recovering-from-sports-injuries" element={<RecoveringFromSportsInjuriesPage />} />
              <Route path="/resources/testimonials/all-testimonials" element={<AllTestimonialsPage />} />

              <Route path="/company/careers" element={<CareersPage />} />
              <Route path="/company/press" element={<PressPage />} />
              <Route path="/company/terms-of-service" element={<TermsOfServicePage />} />
              <Route path="/company/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/company/cookie-policy" element={<CookiePolicyPage />} />
              <Route path="/company/accessibility-statement" element={<AccessibilityStatementPage />} />

              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Suspense>
      </AppErrorBoundary>
    </div>
  );
}

export default App;
