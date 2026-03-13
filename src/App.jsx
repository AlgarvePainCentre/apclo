import './global.css';
import './responsive.css';
import './pages/home/Home.css';
import './pages/specialities/MedicalSections.css';
import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
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

const TipsForSelfCarePage = lazy(() => import('./pages/resources/Learn/TipsForSelfCare/page'));
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

function SpecialityLayout({ children }) {
  return (
    <div className="page">
      <Navbar />
      {children}
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

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div className="page-loading" role="status" aria-live="polite">Loading…</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
        <Route path="/specialities" element={<Specialities />} />
        <Route
          path="/specialities/pain-medicine/head-pain"
          element={
            <SpecialityLayout>
              <HeadPainPage />
            </SpecialityLayout>
          }
        />
        <Route
          path="/specialities/pain-medicine/cervical-spine-pain"
          element={
            <SpecialityLayout>
              <CervicalSpinePainPage />
            </SpecialityLayout>
          }
        />
        <Route
          path="/specialities/pain-medicine/lumbar-spine-pain"
          element={
            <SpecialityLayout>
              <LumbarSpinePainPage />
            </SpecialityLayout>
          }
        />
        <Route
          path="/specialities/pain-medicine/shoulder-pain"
          element={
            <SpecialityLayout>
              <ShoulderPainPage />
            </SpecialityLayout>
          }
        />
        <Route
          path="/specialities/pain-medicine/hand-and-elbow-pain"
          element={
            <SpecialityLayout>
              <HandAndElbowPainPage />
            </SpecialityLayout>
          }
        />
        <Route
          path="/specialities/pain-medicine/hip-and-groin-pain"
          element={
            <SpecialityLayout>
              <HipAndGroinPainPage />
            </SpecialityLayout>
          }
        />
        <Route
          path="/specialities/pain-medicine/knee-pain"
          element={
            <SpecialityLayout>
              <KneePainPage />
            </SpecialityLayout>
          }
        />
        <Route
          path="/specialities/pain-medicine/thoracic-wall-pain"
          element={
            <SpecialityLayout>
              <ThoracicWallPainPage />
            </SpecialityLayout>
          }
        />
        <Route
          path="/specialities/pain-medicine/abdominal-wall-pain"
          element={
            <SpecialityLayout>
              <AbdominalWallPainPage />
            </SpecialityLayout>
          }
        />
        <Route
          path="/specialities/pain-medicine/pelvic-and-gynaecological"
          element={
            <SpecialityLayout>
              <PelvicAndGynaecologicalPage />
            </SpecialityLayout>
          }
        />
        <Route
          path="/specialities/pain-medicine/facial-pain"
          element={
            <SpecialityLayout>
              <FacialPainPage />
            </SpecialityLayout>
          }
        />
        <Route
          path="/specialities/pain-medicine/foot-and-ankle-pain"
          element={
            <SpecialityLayout>
              <FootAndAnklePainPage />
            </SpecialityLayout>
          }
        />
        <Route
          path="/specialities/sports-medicine/injuries"
          element={
            <SpecialityLayout>
              <InjuriesPage />
            </SpecialityLayout>
          }
        />
        <Route
          path="/specialities/sports-medicine/prevention"
          element={
            <SpecialityLayout>
              <PreventionPage />
            </SpecialityLayout>
          }
        />
        <Route
          path="/specialities/sports-medicine/rehabilitation"
          element={
            <SpecialityLayout>
              <SportsRehabilitationPage />
            </SpecialityLayout>
          }
        />
        <Route
          path="/specialities/sports-medicine/performance"
          element={
            <SpecialityLayout>
              <PerformancePage />
            </SpecialityLayout>
          }
        />
        <Route
          path="/specialities/sports-medicine/psychology"
          element={
            <SpecialityLayout>
              <PsychologyPage />
            </SpecialityLayout>
          }
        />
        <Route
          path="/specialities/sports-medicine/nutrition"
          element={
            <SpecialityLayout>
              <NutritionPage />
            </SpecialityLayout>
          }
        />
        <Route
          path="/specialities/stroke-medicine/rehabilitation"
          element={
            <SpecialityLayout>
              <StrokeRehabilitationPage />
            </SpecialityLayout>
          }
        />
        <Route
          path="/specialities/stroke-medicine/clinical-and-secondary-prevention-of-stroke"
          element={
            <SpecialityLayout>
              <ClinicalAndSecondaryPreventionOfStrokePage />
            </SpecialityLayout>
          }
        />
        <Route
          path="/specialities/stroke-medicine/feeding-autonomy"
          element={
            <SpecialityLayout>
              <FeedingAutonomyPage />
            </SpecialityLayout>
          }
        />
        <Route
          path="/specialities/stroke-medicine/speech-autonomy"
          element={
            <SpecialityLayout>
              <SpeechAutonomyPage />
            </SpecialityLayout>
          }
        />
        <Route
          path="/specialities/stroke-medicine/post-stroke-depression-and-mood-disorders"
          element={
            <SpecialityLayout>
              <PostStrokeDepressionAndMoodDisordersPage />
            </SpecialityLayout>
          }
        />
        <Route
          path="/specialities/stroke-medicine/medical-complications-post-stroke"
          element={
            <SpecialityLayout>
              <MedicalComplicationsPostStrokePage />
            </SpecialityLayout>
          }
        />
        <Route
          path="/specialities/stroke-medicine/post-stroke-spasticity"
          element={
            <SpecialityLayout>
              <PostStrokeSpasticityPage />
            </SpecialityLayout>
          }
        />
        <Route
          path="/specialities/stroke-medicine/complex-regional-pain-syndrome"
          element={
            <SpecialityLayout>
              <ComplexRegionalPainSyndromePage />
            </SpecialityLayout>
          }
        />
        <Route
          path="/specialities/stroke-medicine/postural-and-motor-control-autonomy"
          element={
            <SpecialityLayout>
              <PosturalAndMotorControlAutonomyPage />
            </SpecialityLayout>
          }
        />
        <Route
          path="/specialities/stroke-medicine/community-reintegration"
          element={
            <SpecialityLayout>
              <CommunityReintegrationPage />
            </SpecialityLayout>
          }
        />
        <Route path="/treatments" element={<Treatments />} />
        <Route
          path="/treatments/surgical-treatments/tubular-microsurgery"
          element={
            <SpecialityLayout>
              <TubularMicrosurgeryPage />
            </SpecialityLayout>
          }
        />
        <Route
          path="/treatments/surgical-treatments/spinal-fusion"
          element={
            <SpecialityLayout>
              <SpinalFusionPage />
            </SpecialityLayout>
          }
        />
        <Route
          path="/treatments/surgical-treatments/disc-replacement"
          element={
            <SpecialityLayout>
              <DiscReplacementPage />
            </SpecialityLayout>
          }
        />
        <Route
          path="/treatments/surgical-treatments/lumbar-deformity-surgery"
          element={
            <SpecialityLayout>
              <LumbarDeformitySurgeryPage />
            </SpecialityLayout>
          }
        />
        <Route
          path="/treatments/minimally-invasive-treatments/vertebroplasty"
          element={
            <SpecialityLayout>
              <VertebroplastyPage />
            </SpecialityLayout>
          }
        />
        <Route
          path="/treatments/minimally-invasive-treatments/radiofrequency"
          element={
            <SpecialityLayout>
              <RadiofrequencyPage />
            </SpecialityLayout>
          }
        />
        <Route
          path="/treatments/minimally-invasive-treatments/interspinous-spacers"
          element={
            <SpecialityLayout>
              <InterspinousSpacersPage />
            </SpecialityLayout>
          }
        />
        <Route
          path="/treatments/minimally-invasive-treatments/peripheral-nerve-block"
          element={
            <SpecialityLayout>
              <PeripheralNerveBlockPage />
            </SpecialityLayout>
          }
        />
        <Route
          path="/treatments/minimally-invasive-treatments/intra-articular-corticosteroids-injection"
          element={
            <SpecialityLayout>
              <IntraArticularCorticosteroidsInjectionPage />
            </SpecialityLayout>
          }
        />
        <Route
          path="/treatments/minimally-invasive-treatments/calcification-barbotage"
          element={
            <SpecialityLayout>
              <CalcificationBarbotagePage />
            </SpecialityLayout>
          }
        />
        <Route
          path="/treatments/minimally-invasive-treatments/cryoblation"
          element={
            <SpecialityLayout>
              <CryoblationPage />
            </SpecialityLayout>
          }
        />
        <Route
          path="/treatments/minimally-invasive-treatments/nucleoplasty"
          element={
            <SpecialityLayout>
              <NucleoplastyPage />
            </SpecialityLayout>
          }
        />
        <Route
          path="/treatments/minimally-invasive-treatments/platelets-rich-plasma-injection"
          element={
            <SpecialityLayout>
              <PlateletsRichPlasmaInjectionPage />
            </SpecialityLayout>
          }
        />
        <Route
          path="/treatments/minimally-invasive-treatments/hydrodistention"
          element={
            <SpecialityLayout>
              <HydrodistentionPage />
            </SpecialityLayout>
          }
        />
        <Route
          path="/treatments/minimally-invasive-treatments/botulin-toxin-injection"
          element={
            <SpecialityLayout>
              <BotulinToxinInjectionPage />
            </SpecialityLayout>
          }
        />
        <Route
          path="/treatments/non-invasive-treatments/pharmacological-pain-management"
          element={
            <SpecialityLayout>
              <PharmacologicalPainManagementPage />
            </SpecialityLayout>
          }
        />
        <Route
          path="/treatments/non-invasive-treatments/physiotherapy"
          element={
            <SpecialityLayout>
              <PhysiotherapyPage />
            </SpecialityLayout>
          }
        />
        <Route
          path="/treatments/non-invasive-treatments/osteopathy"
          element={
            <SpecialityLayout>
              <OsteopathyPage />
            </SpecialityLayout>
          }
        />
        <Route
          path="/treatments/non-invasive-treatments/occupation-therapy"
          element={
            <SpecialityLayout>
              <OccupationTherapyPage />
            </SpecialityLayout>
          }
        />
        <Route
          path="/treatments/non-invasive-treatments/speech-therapy"
          element={
            <SpecialityLayout>
              <SpeechTherapyPage />
            </SpecialityLayout>
          }
        />
        <Route
          path="/treatments/non-invasive-treatments/psychology"
          element={
            <SpecialityLayout>
              <PsychologyTreatmentPage />
            </SpecialityLayout>
          }
        />
        <Route
          path="/treatments/non-invasive-treatments/nutrition"
          element={
            <SpecialityLayout>
              <NutritionTreatmentPage />
            </SpecialityLayout>
          }
        />
        <Route
          path="/treatments/non-invasive-treatments/exercise"
          element={
            <SpecialityLayout>
              <ExercisePage />
            </SpecialityLayout>
          }
        />
        <Route
          path="/treatments/non-invasive-treatments/podology"
          element={
            <SpecialityLayout>
              <PodologyPage />
            </SpecialityLayout>
          }
        />
        <Route
          path="/treatments/non-invasive-treatments/home-care"
          element={
            <SpecialityLayout>
              <HomeCarePage />
            </SpecialityLayout>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/support"
          element={
            <SpecialityLayout>
              <main className="support-page">
                <h1>Support</h1>
                <p>Content for Support will go here.</p>
              </main>
            </SpecialityLayout>
          }
        />
        <Route
          path="/pricing"
          element={
            <SpecialityLayout>
              <main className="pricing-page">
                <h1>Pricing</h1>
                <p>Content for Pricing will go here.</p>
              </main>
            </SpecialityLayout>
          }
        />
        <Route path="/resources" element={<Resources />} />
        <Route
          path="/blog"
          element={
            <SpecialityLayout>
              <BlogPage />
            </SpecialityLayout>
          }
        />
        <Route
          path="/blog/*"
          element={
            <SpecialityLayout>
              <BlogArticlePage />
            </SpecialityLayout>
          }
        />
        <Route
          path="/resources/learn/tips-for-self-care"
          element={
            <SpecialityLayout>
              <TipsForSelfCarePage />
            </SpecialityLayout>
          }
        />
        <Route
          path="/resources/learn/blog"
          element={<Navigate to="/blog" replace />}
        />
        <Route
          path="/resources/learn/cervical-pain"
          element={
            <SpecialityLayout>
              <CervicalPainPage />
            </SpecialityLayout>
          }
        />
        <Route
          path="/resources/learn/conquering-cervical-pain"
          element={
            <SpecialityLayout>
              <ConqueringCervicalPainPage />
            </SpecialityLayout>
          }
        />
        <Route
          path="/resources/learn/acute-and-chronic-pain"
          element={
            <SpecialityLayout>
              <AcuteAndChronicPainPage />
            </SpecialityLayout>
          }
        />
        <Route
          path="/resources/testimonials/overcoming-sciatica-pain"
          element={
            <SpecialityLayout>
              <OvercomingSciaticaPainPage />
            </SpecialityLayout>
          }
        />
        <Route
          path="/resources/testimonials/control-over-spine-degeneration"
          element={
            <SpecialityLayout>
              <ControlOverSpineDegenerationPage />
            </SpecialityLayout>
          }
        />
        <Route
          path="/resources/testimonials/recovering-from-sports-injuries"
          element={
            <SpecialityLayout>
              <RecoveringFromSportsInjuriesPage />
            </SpecialityLayout>
          }
        />
        <Route
          path="/resources/testimonials/all-testimonials"
          element={
            <SpecialityLayout>
              <AllTestimonialsPage />
            </SpecialityLayout>
          }
        />
        <Route path="/resources/testemunial/*" element={<RedirectTestimonialsTypos />} />
        <Route path="/resources/testemunials/*" element={<RedirectTestimonialsTypos />} />
        <Route
          path="/company/careers"
          element={
            <SpecialityLayout>
              <CareersPage />
            </SpecialityLayout>
          }
        />
        <Route
          path="/company/press"
          element={
            <SpecialityLayout>
              <PressPage />
            </SpecialityLayout>
          }
        />
        <Route
          path="/company/terms-of-service"
          element={
            <SpecialityLayout>
              <TermsOfServicePage />
            </SpecialityLayout>
          }
        />
        <Route
          path="/company/privacy-policy"
          element={
            <SpecialityLayout>
              <PrivacyPolicyPage />
            </SpecialityLayout>
          }
        />
        <Route
          path="/company/cookie-policy"
          element={
            <SpecialityLayout>
              <CookiePolicyPage />
            </SpecialityLayout>
          }
        />
        <Route
          path="/company/accessibility-statement"
          element={
            <SpecialityLayout>
              <AccessibilityStatementPage />
            </SpecialityLayout>
          }
        />
        <Route
          path="*"
          element={
            <SpecialityLayout>
              <main className="page-main">
                <section className="page-section">
                  <h1>Page not found</h1>
                  <p>Check the URL or return to the home page.</p>
                </section>
              </main>
            </SpecialityLayout>
          }
        />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
