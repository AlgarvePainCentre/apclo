import './global.css';
import './responsive.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Specialities from './pages/specialities/Specialities';
import Treatments from './pages/treatments/Treatments';
import About from './pages/about/About';
import Contact from './pages/contact/Contact';
import Resources from './pages/resources/Resources';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HeadPainPage from './pages/specialities/PainMedicine/HeadPain/page';
import CervicalSpinePainPage from './pages/specialities/PainMedicine/CervicalSpinePain/page';
import LumbarSpinePainPage from './pages/specialities/PainMedicine/LumbarSpinePain/page';
import ShoulderPainPage from './pages/specialities/PainMedicine/ShoulderPain/page';
import HandAndElbowPainPage from './pages/specialities/PainMedicine/HandAndElbowPain/page';
import HipAndGroinPainPage from './pages/specialities/PainMedicine/HipAndGroinPain/page';
import KneePainPage from './pages/specialities/PainMedicine/KneePain/page';
import ThoracicWallPainPage from './pages/specialities/PainMedicine/ThoracicWallPain/page';
import AbdominalWallPainPage from './pages/specialities/PainMedicine/AbdominalWallPain/page';
import PelvicAndGynaecologicalPage from './pages/specialities/PainMedicine/PelvicAndGynaecological/page';
import FacialPainPage from './pages/specialities/PainMedicine/FacialPain/page';
import FootAndAnklePainPage from './pages/specialities/PainMedicine/FootAndAnklePain/page';
import InjuriesPage from './pages/specialities/SportsMedicine/Injuries/page';
import PreventionPage from './pages/specialities/SportsMedicine/Prevention/page';
import SportsRehabilitationPage from './pages/specialities/SportsMedicine/Rehabilitation/page';
import PerformancePage from './pages/specialities/SportsMedicine/Performance/page';
import PsychologyPage from './pages/specialities/SportsMedicine/Psychology/page';
import NutritionPage from './pages/specialities/SportsMedicine/Nutrition/page';
import StrokeRehabilitationPage from './pages/specialities/StrokeMedicine/Rehabilitation/page';
import ClinicalAndSecondaryPreventionOfStrokePage from './pages/specialities/StrokeMedicine/ClinicalAndSecondaryPreventionOfStroke/page';
import FeedingAutonomyPage from './pages/specialities/StrokeMedicine/FeedingAutonomy/page';
import SpeechAutonomyPage from './pages/specialities/StrokeMedicine/SpeechAutonomy/page';
import PostStrokeDepressionAndMoodDisordersPage from './pages/specialities/StrokeMedicine/PostStrokeDepressionAndMoodDisorders/page';
import MedicalComplicationsPostStrokePage from './pages/specialities/StrokeMedicine/MedicalComplicationsPostStroke/page';
import PostStrokeSpasticityPage from './pages/specialities/StrokeMedicine/PostStrokeSpasticity/page';
import ComplexRegionalPainSyndromePage from './pages/specialities/StrokeMedicine/ComplexRegionalPainSyndrome/page';
import PosturalAndMotorControlAutonomyPage from './pages/specialities/StrokeMedicine/PosturalAndMotorControlAutonomy/page';
import CommunityReintegrationPage from './pages/specialities/StrokeMedicine/CommunityReintegration/page';
import TubularMicrosurgeryPage from './pages/treatments/SurgicalTreatment/TubularMicrosurgery/page';
import SpinalFusionPage from './pages/treatments/SurgicalTreatment/SpinalFusion/page';
import DiscReplacementPage from './pages/treatments/SurgicalTreatment/DiscReplacement/page';
import LumbarDeformitySurgeryPage from './pages/treatments/SurgicalTreatment/LumbarDeformitySurgery/page';
import VertebroplastyPage from './pages/treatments/MinimallyInvasiveTreatments/Vertebroplasty/page';
import RadiofrequencyPage from './pages/treatments/MinimallyInvasiveTreatments/Radiofrequency/page';
import InterspinousSpacersPage from './pages/treatments/MinimallyInvasiveTreatments/InterspinousSpacers/page';
import PeripheralNerveBlockPage from './pages/treatments/MinimallyInvasiveTreatments/PeripheralNerveBlock/page';
import IntraArticularCorticosteroidsInjectionPage from './pages/treatments/MinimallyInvasiveTreatments/IntraArticularCorticosteroidsInjection/page';
import CalcificationBarbotagePage from './pages/treatments/MinimallyInvasiveTreatments/CalcificationBarbotage/page';
import CryoblationPage from './pages/treatments/MinimallyInvasiveTreatments/Cryoblation/page';
import NucleoplastyPage from './pages/treatments/MinimallyInvasiveTreatments/Nucleoplasty/page';
import PlateletsRichPlasmaInjectionPage from './pages/treatments/MinimallyInvasiveTreatments/PlateletsRichPlasmaInjection/page';
import HydrodistentionPage from './pages/treatments/MinimallyInvasiveTreatments/Hydrodistention/page';
import BotulinToxinInjectionPage from './pages/treatments/MinimallyInvasiveTreatments/BotulinToxinInjection/page';
import PharmacologicalPainManagementPage from './pages/treatments/NonInvasiveTreatments/PharmacologicalPainManagement/page';
import PhysiotherapyPage from './pages/treatments/NonInvasiveTreatments/Physiotherapy/page';
import OsteopathyPage from './pages/treatments/NonInvasiveTreatments/Osteopathy/page';
import OccupationTherapyPage from './pages/treatments/NonInvasiveTreatments/OccupationTherapy/page';
import SpeechTherapyPage from './pages/treatments/NonInvasiveTreatments/SpeechTherapy/page';
import PsychologyTreatmentPage from './pages/treatments/NonInvasiveTreatments/Psychology/page';
import NutritionTreatmentPage from './pages/treatments/NonInvasiveTreatments/Nutrition/page';
import ExercisePage from './pages/treatments/NonInvasiveTreatments/Exercise/page';
import PodologyPage from './pages/treatments/NonInvasiveTreatments/Podology/page';
import HomeCarePage from './pages/treatments/NonInvasiveTreatments/HomeCare/page';
import TipsForSelfCarePage from './pages/resources/Learn/TipsForSelfCare/page';
import BlogPage from './pages/resources/Learn/Blog/page';
import OvercomingSciaticaPainPage from './pages/resources/Testimonials/OvercomingSciaticaPain/page';
import ControlOverSpineDegenerationPage from './pages/resources/Testimonials/ControlOverSpineDegeneration/page';
import RecoveringFromSportsInjuriesPage from './pages/resources/Testimonials/RecoveringFromSportsInjuries/page';
import AllTestimonialsPage from './pages/resources/Testimonials/AllTestimonials/page';
import CareersPage from './pages/company/Careers/page';
import PressPage from './pages/company/Press/page';
import TermsOfServicePage from './pages/company/TermsOfService/page';
import PrivacyPolicyPage from './pages/company/PrivacyPolicy/page';
import CookiePolicyPage from './pages/company/CookiePolicy/page';
import AccessibilityStatementPage from './pages/company/AccessibilityStatement/page';

function SpecialityLayout({ children }) {
  return (
    <div className="page">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}

function App() {
  return (
    <div className="App">
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
          path="/resources/learn/tips-for-self-care"
          element={
            <SpecialityLayout>
              <TipsForSelfCarePage />
            </SpecialityLayout>
          }
        />
        <Route
          path="/resources/learn/blog"
          element={
            <SpecialityLayout>
              <BlogPage />
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
      </Routes>
    </div>
  );
}

export default App;
