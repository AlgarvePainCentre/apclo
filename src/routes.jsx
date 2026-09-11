import { Navigate } from 'react-router-dom';
import { createProtectedPageLoader } from './app/routerGuards';

function createLazyRouteModule(factory) {
  const lazy = async () => {
    const module = await factory();
    return { Component: module.default };
  };

  lazy.preload = factory;
  return lazy;
}

const routeEntries = [
  { path: '', lazy: createLazyRouteModule(() => import('./pages/home/Home')), preloadPath: '/' },
  { path: 'specialities', lazy: createLazyRouteModule(() => import('./pages/specialities/Specialities')), preloadPath: '/specialities' },
  { path: 'treatments', lazy: createLazyRouteModule(() => import('./pages/treatments/TreatmentsLanding')), preloadPath: '/treatments' },
  { path: 'about', lazy: createLazyRouteModule(() => import('./pages/about/About')), preloadPath: '/about' },
  { path: 'doctor/:id', lazy: createLazyRouteModule(() => import('./pages/doctor/DoctorDetail')), preloadPath: '/doctor/:id' },
  { path: 'contact', lazy: createLazyRouteModule(() => import('./pages/contact/Contact')), preloadPath: '/contact' },
  { path: 'resources', lazy: createLazyRouteModule(() => import('./pages/resources/Resources')), preloadPath: '/resources' },
  { path: 'algarve-migraine-neurotherapy-centre', lazy: createLazyRouteModule(() => import('./pages/centres/MigraineCentre/page')), preloadPath: '/algarve-migraine-neurotherapy-centre' },

  { path: 'specialities/pain-medicine/head-pain', lazy: createLazyRouteModule(() => import('./pages/specialities/PainMedicine/HeadPain/page')), preloadPath: '/specialities/pain-medicine/head-pain' },
  { path: 'specialities/pain-medicine/cervical-spine-pain', lazy: createLazyRouteModule(() => import('./pages/specialities/PainMedicine/CervicalSpinePain/page')), preloadPath: '/specialities/pain-medicine/cervical-spine-pain' },
  { path: 'specialities/pain-medicine/lumbar-spine-pain', lazy: createLazyRouteModule(() => import('./pages/specialities/PainMedicine/LumbarSpinePain/page')), preloadPath: '/specialities/pain-medicine/lumbar-spine-pain' },
  { path: 'specialities/pain-medicine/shoulder-pain', lazy: createLazyRouteModule(() => import('./pages/specialities/PainMedicine/ShoulderPain/page')), preloadPath: '/specialities/pain-medicine/shoulder-pain' },
  { path: 'specialities/pain-medicine/hand-and-elbow-pain', lazy: createLazyRouteModule(() => import('./pages/specialities/PainMedicine/HandAndElbowPain/page')), preloadPath: '/specialities/pain-medicine/hand-and-elbow-pain' },
  { path: 'specialities/pain-medicine/hip-and-groin-pain', lazy: createLazyRouteModule(() => import('./pages/specialities/PainMedicine/HipAndGroinPain/page')), preloadPath: '/specialities/pain-medicine/hip-and-groin-pain' },
  { path: 'specialities/pain-medicine/knee-pain', lazy: createLazyRouteModule(() => import('./pages/specialities/PainMedicine/KneePain/page')), preloadPath: '/specialities/pain-medicine/knee-pain' },
  { path: 'specialities/pain-medicine/thoracic-wall-pain', lazy: createLazyRouteModule(() => import('./pages/specialities/PainMedicine/ThoracicWallPain/page')), preloadPath: '/specialities/pain-medicine/thoracic-wall-pain' },
  { path: 'specialities/pain-medicine/abdominal-wall-pain', lazy: createLazyRouteModule(() => import('./pages/specialities/PainMedicine/AbdominalWallPain/page')), preloadPath: '/specialities/pain-medicine/abdominal-wall-pain' },
  { path: 'specialities/pain-medicine/pelvic-and-gynaecological', lazy: createLazyRouteModule(() => import('./pages/specialities/PainMedicine/PelvicAndGynaecological/page')), preloadPath: '/specialities/pain-medicine/pelvic-and-gynaecological' },
  { path: 'specialities/pain-medicine/facial-pain', lazy: createLazyRouteModule(() => import('./pages/specialities/PainMedicine/FacialPain/page')), preloadPath: '/specialities/pain-medicine/facial-pain' },
  { path: 'specialities/pain-medicine/foot-and-ankle-pain', lazy: createLazyRouteModule(() => import('./pages/specialities/PainMedicine/FootAndAnklePain/page')), preloadPath: '/specialities/pain-medicine/foot-and-ankle-pain' },

  { path: 'specialities/sports-medicine/injuries', lazy: createLazyRouteModule(() => import('./pages/specialities/SportsMedicine/Injuries/page')), preloadPath: '/specialities/sports-medicine/injuries' },
  { path: 'specialities/sports-medicine/prevention', lazy: createLazyRouteModule(() => import('./pages/specialities/SportsMedicine/Prevention/page')), preloadPath: '/specialities/sports-medicine/prevention' },
  { path: 'specialities/sports-medicine/rehabilitation', lazy: createLazyRouteModule(() => import('./pages/specialities/SportsMedicine/Rehabilitation/page')), preloadPath: '/specialities/sports-medicine/rehabilitation' },
  { path: 'specialities/sports-medicine/performance', lazy: createLazyRouteModule(() => import('./pages/specialities/SportsMedicine/Performance/page')), preloadPath: '/specialities/sports-medicine/performance' },
  { path: 'specialities/sports-medicine/psychology', lazy: createLazyRouteModule(() => import('./pages/specialities/SportsMedicine/Psychology/page')), preloadPath: '/specialities/sports-medicine/psychology' },
  { path: 'specialities/sports-medicine/nutrition', lazy: createLazyRouteModule(() => import('./pages/specialities/SportsMedicine/Nutrition/page')), preloadPath: '/specialities/sports-medicine/nutrition' },

  { path: 'specialities/stroke-medicine/rehabilitation', lazy: createLazyRouteModule(() => import('./pages/specialities/StrokeMedicine/Rehabilitation/page')), preloadPath: '/specialities/stroke-medicine/rehabilitation' },
  { path: 'specialities/stroke-medicine/clinical-and-secondary-prevention-of-stroke', lazy: createLazyRouteModule(() => import('./pages/specialities/StrokeMedicine/ClinicalAndSecondaryPreventionOfStroke/page')), preloadPath: '/specialities/stroke-medicine/clinical-and-secondary-prevention-of-stroke' },
  { path: 'specialities/stroke-medicine/feeding-autonomy', lazy: createLazyRouteModule(() => import('./pages/specialities/StrokeMedicine/FeedingAutonomy/page')), preloadPath: '/specialities/stroke-medicine/feeding-autonomy' },
  { path: 'specialities/stroke-medicine/speech-autonomy', lazy: createLazyRouteModule(() => import('./pages/specialities/StrokeMedicine/SpeechAutonomy/page')), preloadPath: '/specialities/stroke-medicine/speech-autonomy' },
  { path: 'specialities/stroke-medicine/post-stroke-depression-and-mood-disorders', lazy: createLazyRouteModule(() => import('./pages/specialities/StrokeMedicine/PostStrokeDepressionAndMoodDisorders/page')), preloadPath: '/specialities/stroke-medicine/post-stroke-depression-and-mood-disorders' },
  { path: 'specialities/stroke-medicine/medical-complications-post-stroke', lazy: createLazyRouteModule(() => import('./pages/specialities/StrokeMedicine/MedicalComplicationsPostStroke/page')), preloadPath: '/specialities/stroke-medicine/medical-complications-post-stroke' },
  { path: 'specialities/stroke-medicine/post-stroke-spasticity', lazy: createLazyRouteModule(() => import('./pages/specialities/StrokeMedicine/PostStrokeSpasticity/page')), preloadPath: '/specialities/stroke-medicine/post-stroke-spasticity' },
  { path: 'specialities/stroke-medicine/complex-regional-pain-syndrome', lazy: createLazyRouteModule(() => import('./pages/specialities/StrokeMedicine/ComplexRegionalPainSyndrome/page')), preloadPath: '/specialities/stroke-medicine/complex-regional-pain-syndrome' },
  { path: 'specialities/stroke-medicine/postural-and-motor-control-autonomy', lazy: createLazyRouteModule(() => import('./pages/specialities/StrokeMedicine/PosturalAndMotorControlAutonomy/page')), preloadPath: '/specialities/stroke-medicine/postural-and-motor-control-autonomy' },
  { path: 'specialities/stroke-medicine/community-reintegration', lazy: createLazyRouteModule(() => import('./pages/specialities/StrokeMedicine/CommunityReintegration/page')), preloadPath: '/specialities/stroke-medicine/community-reintegration' },

  { path: 'treatments/surgical-treatments/tubular-microsurgery', lazy: createLazyRouteModule(() => import('./pages/treatments/SurgicalTreatment/TubularMicrosurgery/page')), preloadPath: '/treatments/surgical-treatments/tubular-microsurgery' },
  { path: 'treatments/surgical-treatments/spinal-fusion', lazy: createLazyRouteModule(() => import('./pages/treatments/SurgicalTreatment/SpinalFusion/page')), preloadPath: '/treatments/surgical-treatments/spinal-fusion' },
  { path: 'treatments/surgical-treatments/disc-replacement', lazy: createLazyRouteModule(() => import('./pages/treatments/SurgicalTreatment/DiscReplacement/page')), preloadPath: '/treatments/surgical-treatments/disc-replacement' },
  { path: 'treatments/surgical-treatments/lumbar-deformity-surgery', lazy: createLazyRouteModule(() => import('./pages/treatments/SurgicalTreatment/LumbarDeformitySurgery/page')), preloadPath: '/treatments/surgical-treatments/lumbar-deformity-surgery' },

  { path: 'treatments/minimally-invasive-treatments/vertebroplasty', lazy: createLazyRouteModule(() => import('./pages/treatments/MinimallyInvasiveTreatments/Vertebroplasty/page')), preloadPath: '/treatments/minimally-invasive-treatments/vertebroplasty' },
  { path: 'treatments/minimally-invasive-treatments/radiofrequency', lazy: createLazyRouteModule(() => import('./pages/treatments/MinimallyInvasiveTreatments/Radiofrequency/page')), preloadPath: '/treatments/minimally-invasive-treatments/radiofrequency' },
  { path: 'treatments/minimally-invasive-treatments/interspinous-spacers', lazy: createLazyRouteModule(() => import('./pages/treatments/MinimallyInvasiveTreatments/InterspinousSpacers/page')), preloadPath: '/treatments/minimally-invasive-treatments/interspinous-spacers' },
  { path: 'treatments/minimally-invasive-treatments/peripheral-nerve-block', lazy: createLazyRouteModule(() => import('./pages/treatments/MinimallyInvasiveTreatments/PeripheralNerveBlock/page')), preloadPath: '/treatments/minimally-invasive-treatments/peripheral-nerve-block' },
  { path: 'treatments/minimally-invasive-treatments/intra-articular-corticosteroids-injection', lazy: createLazyRouteModule(() => import('./pages/treatments/MinimallyInvasiveTreatments/IntraArticularCorticosteroidsInjection/page')), preloadPath: '/treatments/minimally-invasive-treatments/intra-articular-corticosteroids-injection' },
  { path: 'treatments/minimally-invasive-treatments/calcification-barbotage', lazy: createLazyRouteModule(() => import('./pages/treatments/MinimallyInvasiveTreatments/CalcificationBarbotage/page')), preloadPath: '/treatments/minimally-invasive-treatments/calcification-barbotage' },
  { path: 'treatments/minimally-invasive-treatments/cryoablation', lazy: createLazyRouteModule(() => import('./pages/treatments/MinimallyInvasiveTreatments/Cryoblation/page')), preloadPath: '/treatments/minimally-invasive-treatments/cryoablation' },
  { path: 'treatments/minimally-invasive-treatments/nucleoplasty', lazy: createLazyRouteModule(() => import('./pages/treatments/MinimallyInvasiveTreatments/Nucleoplasty/page')), preloadPath: '/treatments/minimally-invasive-treatments/nucleoplasty' },
  { path: 'treatments/minimally-invasive-treatments/platelets-rich-plasma-injection', lazy: createLazyRouteModule(() => import('./pages/treatments/MinimallyInvasiveTreatments/PlateletsRichPlasmaInjection/page')), preloadPath: '/treatments/minimally-invasive-treatments/platelets-rich-plasma-injection' },
  { path: 'treatments/minimally-invasive-treatments/hydrodistention', lazy: createLazyRouteModule(() => import('./pages/treatments/MinimallyInvasiveTreatments/Hydrodistention/page')), preloadPath: '/treatments/minimally-invasive-treatments/hydrodistention' },
  { path: 'treatments/minimally-invasive-treatments/botulin-toxin-injection', lazy: createLazyRouteModule(() => import('./pages/treatments/MinimallyInvasiveTreatments/BotulinToxinInjection/page')), preloadPath: '/treatments/minimally-invasive-treatments/botulin-toxin-injection' },

  { path: 'treatments/non-invasive-treatments/pharmacological-pain-management', lazy: createLazyRouteModule(() => import('./pages/treatments/NonInvasiveTreatments/PharmacologicalPainManagement/page')), preloadPath: '/treatments/non-invasive-treatments/pharmacological-pain-management' },
  { path: 'treatments/non-invasive-treatments/physiotherapy', lazy: createLazyRouteModule(() => import('./pages/treatments/NonInvasiveTreatments/Physiotherapy/page')), preloadPath: '/treatments/non-invasive-treatments/physiotherapy' },
  { path: 'treatments/non-invasive-treatments/osteopathy', lazy: createLazyRouteModule(() => import('./pages/treatments/NonInvasiveTreatments/Osteopathy/page')), preloadPath: '/treatments/non-invasive-treatments/osteopathy' },
  { path: 'treatments/non-invasive-treatments/occupational-therapy', lazy: createLazyRouteModule(() => import('./pages/treatments/NonInvasiveTreatments/OccupationTherapy/page')), preloadPath: '/treatments/non-invasive-treatments/occupational-therapy' },
  { path: 'treatments/non-invasive-treatments/speech-therapy', lazy: createLazyRouteModule(() => import('./pages/treatments/NonInvasiveTreatments/SpeechTherapy/page')), preloadPath: '/treatments/non-invasive-treatments/speech-therapy' },
  { path: 'treatments/non-invasive-treatments/psychology', lazy: createLazyRouteModule(() => import('./pages/treatments/NonInvasiveTreatments/Psychology/page')), preloadPath: '/treatments/non-invasive-treatments/psychology' },
  { path: 'treatments/non-invasive-treatments/nutrition', lazy: createLazyRouteModule(() => import('./pages/treatments/NonInvasiveTreatments/Nutrition/page')), preloadPath: '/treatments/non-invasive-treatments/nutrition' },
  { path: 'treatments/non-invasive-treatments/exercise', lazy: createLazyRouteModule(() => import('./pages/treatments/NonInvasiveTreatments/Exercise/page')), preloadPath: '/treatments/non-invasive-treatments/exercise' },
  { path: 'treatments/non-invasive-treatments/podology', lazy: createLazyRouteModule(() => import('./pages/treatments/NonInvasiveTreatments/Podology/page')), preloadPath: '/treatments/non-invasive-treatments/podology' },
  { path: 'treatments/non-invasive-treatments/home-care', lazy: createLazyRouteModule(() => import('./pages/treatments/NonInvasiveTreatments/HomeCare/page')), preloadPath: '/treatments/non-invasive-treatments/home-care' },

  { path: 'support', lazy: createLazyRouteModule(() => import('./pages/gethelp/Support/page')), preloadPath: '/support', loader: createProtectedPageLoader('support') },
  { path: 'pricing', lazy: createLazyRouteModule(() => import('./pages/gethelp/Pricing/page')), preloadPath: '/pricing', loader: createProtectedPageLoader('pricing') },

  { path: 'blog', lazy: createLazyRouteModule(() => import('./pages/resources/Learn/Blog/page')), preloadPath: '/blog' },
  { path: 'blog/:slug', lazy: createLazyRouteModule(() => import('./pages/resources/Learn/Blog/articlePage')), preloadPath: '/blog/:slug' },
  { path: 'blog/*', lazy: createLazyRouteModule(() => import('./pages/resources/Learn/Blog/articlePage')), preloadPath: '/blog/*' },

  { path: 'resources/learn/cervical-pain', lazy: createLazyRouteModule(() => import('./pages/resources/Learn/CervicalPain/page')), preloadPath: '/resources/learn/cervical-pain' },
  { path: 'resources/learn/conquering-cervical-pain', lazy: createLazyRouteModule(() => import('./pages/resources/Learn/ConqueringCervicalPain/page')), preloadPath: '/resources/learn/conquering-cervical-pain' },
  { path: 'resources/learn/acute-and-chronic-pain', lazy: createLazyRouteModule(() => import('./pages/resources/Learn/AcuteAndChronicPain/page')), preloadPath: '/resources/learn/acute-and-chronic-pain' },

  { path: 'resources/testimonials/overcoming-sciatica-pain', lazy: createLazyRouteModule(() => import('./pages/resources/Testimonials/OvercomingSciaticaPain/page')), preloadPath: '/resources/testimonials/overcoming-sciatica-pain' },
  { path: 'resources/testimonials/control-over-spine-degeneration', lazy: createLazyRouteModule(() => import('./pages/resources/Testimonials/ControlOverSpineDegeneration/page')), preloadPath: '/resources/testimonials/control-over-spine-degeneration' },
  { path: 'resources/testimonials/recovering-from-sports-injuries', lazy: createLazyRouteModule(() => import('./pages/resources/Testimonials/RecoveringFromSportsInjuries/page')), preloadPath: '/resources/testimonials/recovering-from-sports-injuries' },

  { path: 'company/careers', lazy: createLazyRouteModule(() => import('./pages/company/Careers/page')), preloadPath: '/company/careers' },
  { path: 'company/press', lazy: createLazyRouteModule(() => import('./pages/company/Press/page')), preloadPath: '/company/press' },
  { path: 'company/terms-of-service', lazy: createLazyRouteModule(() => import('./pages/company/TermsOfService/page')), preloadPath: '/company/terms-of-service' },
  { path: 'company/privacy-policy', lazy: createLazyRouteModule(() => import('./pages/company/PrivacyPolicy/page')), preloadPath: '/company/privacy-policy' },
  { path: 'company/cookie-policy', lazy: createLazyRouteModule(() => import('./pages/company/CookiePolicy/page')), preloadPath: '/company/cookie-policy' },
  { path: 'company/cookies', lazy: createLazyRouteModule(() => import('./pages/company/Cookies/page')), preloadPath: '/company/cookies' },
  { path: 'company/accessibility-statement', lazy: createLazyRouteModule(() => import('./pages/company/AccessibilityStatement/page')), preloadPath: '/company/accessibility-statement' },
];

export const preloaders = routeEntries.map(({ preloadPath, lazy }) => ({
  path: preloadPath,
  preload: lazy.preload,
}));

export const appChildRoutes = [
  ...routeEntries.map(({ path, lazy, loader }) => ({ path, lazy, loader })),
  { path: 'resources/learn/tips-for-self-care', element: <Navigate to="/resources" replace /> },
];
