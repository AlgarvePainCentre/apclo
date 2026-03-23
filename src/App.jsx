import './global.css';
import './responsive.css';
import './pages/home/Home.css';
import './pages/treatments/Treatments.css';
import './pages/specialities/MedicalSections.css';
import './pages/specialities/PainSpecialtyClone.css';
import { Component, Suspense, lazy } from 'react';
import { Link, Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const Home = lazy(() => import('./pages/home/Home'));
const Specialities = lazy(() => import('./pages/specialities/Specialities'));
const Treatments = lazy(() => import('./pages/treatments/Treatments'));
const About = lazy(() => import('./pages/about/About'));
const Contact = lazy(() => import('./pages/contact/Contact'));
const Resources = lazy(() => import('./pages/resources/Resources'));

const HeadPainPage = lazy(() => import('./pages/specialities/PainMedicine/HeadPain/page'));
const CervicalSpinePainPage = lazy(() => import('./pages/specialities/PainMedicine/CervicalSpinePain/page'));
const LumbarSpinePainPage = lazy(() => import('./pages/specialities/PainMedicine/LumbarSpinePain/page'));
const ShoulderPainPage = lazy(() => import('./pages/specialities/PainMedicine/ShoulderPain/page'));
const HandAndElbowPainPage = lazy(() => import('./pages/specialities/PainMedicine/HandAndElbowPain/page'));
const HipAndGroinPainPage = lazy(() => import('./pages/specialities/PainMedicine/HipAndGroinPain/page'));
const KneePainPage = lazy(() => import('./pages/specialities/PainMedicine/KneePain/page'));
const ThoracicWallPainPage = lazy(() => import('./pages/specialities/PainMedicine/ThoracicWallPain/page'));
const AbdominalWallPainPage = lazy(() => import('./pages/specialities/PainMedicine/AbdominalWallPain/page'));
const PelvicAndGynaecologicalPage = lazy(() => import('./pages/specialities/PainMedicine/PelvicAndGynaecological/page'));
const FacialPainPage = lazy(() => import('./pages/specialities/PainMedicine/FacialPain/page'));
const FootAndAnklePainPage = lazy(() => import('./pages/specialities/PainMedicine/FootAndAnklePain/page'));

const InjuriesPage = lazy(() => import('./pages/specialities/SportsMedicine/Injuries/page'));
const PreventionPage = lazy(() => import('./pages/specialities/SportsMedicine/Prevention/page'));
const SportsRehabilitationPage = lazy(() => import('./pages/specialities/SportsMedicine/Rehabilitation/page'));
const PerformancePage = lazy(() => import('./pages/specialities/SportsMedicine/Performance/page'));
const PsychologyPage = lazy(() => import('./pages/specialities/SportsMedicine/Psychology/page'));
const NutritionPage = lazy(() => import('./pages/specialities/SportsMedicine/Nutrition/page'));

const StrokeRehabilitationPage = lazy(() => import('./pages/specialities/StrokeMedicine/Rehabilitation/page'));
const ClinicalAndSecondaryPreventionOfStrokePage = lazy(() =>
  import('./pages/specialities/StrokeMedicine/ClinicalAndSecondaryPreventionOfStroke/page')
);
const FeedingAutonomyPage = lazy(() => import('./pages/specialities/StrokeMedicine/FeedingAutonomy/page'));
const SpeechAutonomyPage = lazy(() => import('./pages/specialities/StrokeMedicine/SpeechAutonomy/page'));
const PostStrokeDepressionAndMoodDisordersPage = lazy(() =>
  import('./pages/specialities/StrokeMedicine/PostStrokeDepressionAndMoodDisorders/page')
);
const MedicalComplicationsPostStrokePage = lazy(() =>
  import('./pages/specialities/StrokeMedicine/MedicalComplicationsPostStroke/page')
);
const PostStrokeSpasticityPage = lazy(() => import('./pages/specialities/StrokeMedicine/PostStrokeSpasticity/page'));
const ComplexRegionalPainSyndromePage = lazy(() =>
  import('./pages/specialities/StrokeMedicine/ComplexRegionalPainSyndrome/page')
);
const PosturalAndMotorControlAutonomyPage = lazy(() =>
  import('./pages/specialities/StrokeMedicine/PosturalAndMotorControlAutonomy/page')
);
const CommunityReintegrationPage = lazy(() => import('./pages/specialities/StrokeMedicine/CommunityReintegration/page'));

const TubularMicrosurgeryPage = lazy(() => import('./pages/treatments/SurgicalTreatment/TubularMicrosurgery/page'));
const SpinalFusionPage = lazy(() => import('./pages/treatments/SurgicalTreatment/SpinalFusion/page'));
const DiscReplacementPage = lazy(() => import('./pages/treatments/SurgicalTreatment/DiscReplacement/page'));
const LumbarDeformitySurgeryPage = lazy(() => import('./pages/treatments/SurgicalTreatment/LumbarDeformitySurgery/page'));

const VertebroplastyPage = lazy(() => import('./pages/treatments/MinimallyInvasiveTreatments/Vertebroplasty/page'));
const RadiofrequencyPage = lazy(() => import('./pages/treatments/MinimallyInvasiveTreatments/Radiofrequency/page'));
const InterspinousSpacersPage = lazy(() =>
  import('./pages/treatments/MinimallyInvasiveTreatments/InterspinousSpacers/page')
);
const PeripheralNerveBlockPage = lazy(() =>
  import('./pages/treatments/MinimallyInvasiveTreatments/PeripheralNerveBlock/page')
);
const IntraArticularCorticosteroidsInjectionPage = lazy(() =>
  import('./pages/treatments/MinimallyInvasiveTreatments/IntraArticularCorticosteroidsInjection/page')
);
const CalcificationBarbotagePage = lazy(() =>
  import('./pages/treatments/MinimallyInvasiveTreatments/CalcificationBarbotage/page')
);
const CryoblationPage = lazy(() => import('./pages/treatments/MinimallyInvasiveTreatments/Cryoblation/page'));
const NucleoplastyPage = lazy(() => import('./pages/treatments/MinimallyInvasiveTreatments/Nucleoplasty/page'));
const PlateletsRichPlasmaInjectionPage = lazy(() =>
  import('./pages/treatments/MinimallyInvasiveTreatments/PlateletsRichPlasmaInjection/page')
);
const HydrodistentionPage = lazy(() => import('./pages/treatments/MinimallyInvasiveTreatments/Hydrodistention/page'));
const BotulinToxinInjectionPage = lazy(() => import('./pages/treatments/MinimallyInvasiveTreatments/BotulinToxinInjection/page'));

const PharmacologicalPainManagementPage = lazy(() =>
  import('./pages/treatments/NonInvasiveTreatments/PharmacologicalPainManagement/page')
);
const PhysiotherapyPage = lazy(() => import('./pages/treatments/NonInvasiveTreatments/Physiotherapy/page'));
const OsteopathyPage = lazy(() => import('./pages/treatments/NonInvasiveTreatments/Osteopathy/page'));
const OccupationTherapyPage = lazy(() => import('./pages/treatments/NonInvasiveTreatments/OccupationTherapy/page'));
const SpeechTherapyPage = lazy(() => import('./pages/treatments/NonInvasiveTreatments/SpeechTherapy/page'));
const PsychologyTreatmentPage = lazy(() => import('./pages/treatments/NonInvasiveTreatments/Psychology/page'));
const NutritionTreatmentPage = lazy(() => import('./pages/treatments/NonInvasiveTreatments/Nutrition/page'));
const ExercisePage = lazy(() => import('./pages/treatments/NonInvasiveTreatments/Exercise/page'));
const PodologyPage = lazy(() => import('./pages/treatments/NonInvasiveTreatments/Podology/page'));
const HomeCarePage = lazy(() => import('./pages/treatments/NonInvasiveTreatments/HomeCare/page'));

const BlogPage = lazy(() => import('./pages/resources/Learn/Blog/page'));
const BlogArticlePage = lazy(() => import('./pages/resources/Learn/Blog/articlePage'));
const CervicalPainPage = lazy(() => import('./pages/resources/Learn/CervicalPain/page'));
const ConqueringCervicalPainPage = lazy(() => import('./pages/resources/Learn/ConqueringCervicalPain/page'));
const AcuteAndChronicPainPage = lazy(() => import('./pages/resources/Learn/AcuteAndChronicPain/page'));

const OvercomingSciaticaPainPage = lazy(() => import('./pages/resources/Testimonials/OvercomingSciaticaPain/page'));
const ControlOverSpineDegenerationPage = lazy(() => import('./pages/resources/Testimonials/ControlOverSpineDegeneration/page'));
const RecoveringFromSportsInjuriesPage = lazy(() => import('./pages/resources/Testimonials/RecoveringFromSportsInjuries/page'));
const AllTestimonialsPage = lazy(() => import('./pages/resources/Testimonials/AllTestimonials/page'));

const CareersPage = lazy(() => import('./pages/company/Careers/page'));
const PressPage = lazy(() => import('./pages/company/Press/page'));
const TermsOfServicePage = lazy(() => import('./pages/company/TermsOfService/page'));
const PrivacyPolicyPage = lazy(() => import('./pages/company/PrivacyPolicy/page'));
const CookiePolicyPage = lazy(() => import('./pages/company/CookiePolicy/page'));
const AccessibilityStatementPage = lazy(() => import('./pages/company/AccessibilityStatement/page'));
const SupportPage = lazy(() => import('./pages/gethelp/Support/page'));
const PricingPage = lazy(() => import('./pages/gethelp/Pricing/page'));

function ShellLayout() {
  return (
    <div className="page">
      <Navbar />
      <Outlet />
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

  return (
    <div className="App">
      <AppErrorBoundary key={location.key}>
        <Suspense fallback={<div className="page-loading" role="status" aria-live="polite">Loading…</div>}>
          <Routes>
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
