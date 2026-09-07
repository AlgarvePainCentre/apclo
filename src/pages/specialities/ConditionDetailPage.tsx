import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { serializeJsonForHtmlScript } from '../../utils/security';
import ArticleBreadcrumb from '../../components/ArticleBreadcrumb';
import ArticlePrevNextNav from '../../components/ArticlePrevNextNav';
import LumbarInterventions from '../../components/LumbarInterventions';
import ManagedEmbed from '../../components/ManagedEmbed';
import '../../styles/layout/specialities-layout.css';

type Syndrome = {
  id: string;
  label: string;
  description: string;
};

type ConditionDetailPageProps = {
  title: string;
  areaLabel: string;
  mainClassName?: string;
  variant?: 'default' | 'pain-specialty-clone';
  heroSubtitle?: string;
  heroEyebrow?: string;
};

const DEFAULT_SYNDROMES: Syndrome[] = [
  {
    id: 'acute',
    label: 'Acute episodes',
    description:
      'Short-lasting episodes of more intense pain, often triggered by a specific movement or activity and easing with rest.',
  },
  {
    id: 'persistent',
    label: 'Persistent pain',
    description:
      'Ongoing discomfort lasting for months, which may fluctuate in intensity and be influenced by workload, stress and sleep.',
  },
  {
    id: 'neuropathic',
    label: 'Neuropathic features',
    description:
      'Burning, tingling or electric-shock sensations suggesting nerve involvement and sometimes associated with numbness or weakness.',
  },
  {
    id: 'mixed',
    label: 'Mixed pattern',
    description:
      'A combination of mechanical and neuropathic characteristics, where careful assessment helps prioritise the most effective treatments.',
  },
];

export const SPECIALITIES_NAV_ITEMS = [
  { to: '/specialities/pain-medicine/head-pain', title: 'Head pain' },
  { to: '/specialities/pain-medicine/cervical-spine-pain', title: 'Cervical spine pain' },
  { to: '/specialities/pain-medicine/lumbar-spine-pain', title: 'Lumbar spine pain' },
  { to: '/specialities/pain-medicine/shoulder-pain', title: 'Shoulder pain' },
  { to: '/specialities/pain-medicine/hand-and-elbow-pain', title: 'Hand and elbow pain' },
  { to: '/specialities/pain-medicine/hip-and-groin-pain', title: 'Hip and groin pain' },
  { to: '/specialities/pain-medicine/knee-pain', title: 'Knee pain' },
  { to: '/specialities/pain-medicine/thoracic-wall-pain', title: 'Thoracic wall pain' },
  { to: '/specialities/pain-medicine/abdominal-wall-pain', title: 'Abdominal wall pain' },
  { to: '/specialities/pain-medicine/pelvic-and-gynaecological', title: 'Pelvic and gynaecological pain' },
  { to: '/specialities/pain-medicine/facial-pain', title: 'Facial pain' },
  { to: '/specialities/pain-medicine/foot-and-ankle-pain', title: 'Foot and ankle pain' },
  { to: '/specialities/sports-medicine/injuries', title: 'Sports injuries' },
  { to: '/specialities/sports-medicine/prevention', title: 'Injury prevention' },
  { to: '/specialities/sports-medicine/rehabilitation', title: 'Sports rehabilitation' },
  { to: '/specialities/sports-medicine/performance', title: 'Performance' },
  { to: '/specialities/sports-medicine/psychology', title: 'Sports psychology' },
  { to: '/specialities/sports-medicine/nutrition', title: 'Sports nutrition' },
  { to: '/specialities/stroke-medicine/rehabilitation', title: 'Stroke rehabilitation' },
  { to: '/specialities/stroke-medicine/clinical-and-secondary-prevention-of-stroke', title: 'Secondary prevention of stroke' },
  { to: '/specialities/stroke-medicine/feeding-autonomy', title: 'Feeding autonomy' },
  { to: '/specialities/stroke-medicine/speech-autonomy', title: 'Speech autonomy' },
  { to: '/specialities/stroke-medicine/post-stroke-depression-and-mood-disorders', title: 'Post-stroke depression and mood disorders' },
  { to: '/specialities/stroke-medicine/medical-complications-post-stroke', title: 'Medical complications post stroke' },
  { to: '/specialities/stroke-medicine/post-stroke-spasticity', title: 'Post stroke spasticity' },
  { to: '/specialities/stroke-medicine/complex-regional-pain-syndrome', title: 'Complex regional pain syndrome' },
  { to: '/specialities/stroke-medicine/postural-and-motor-control-autonomy', title: 'Postural and motor control autonomy' },
  { to: '/specialities/stroke-medicine/community-reintegration', title: 'Community reintegration' },
] as const;

export function getSpecialitiesNavItemsWithHero() {
  return SPECIALITIES_NAV_ITEMS.map((item) => {
    const slug = item.to.split('/').filter(Boolean).slice(-1)[0];
    const heroImage =
      slug && PAIN_MEDICINE_PAGE_CONTENT[slug] ? PAIN_MEDICINE_PAGE_CONTENT[slug].heroImage : undefined;
    return { ...item, heroImage };
  });
}

const PAIN_MEDICINE_PAGE_CONTENT: Record<
  string,
  {
    heroImage: string;
    overview: string[];
    patterns: Syndrome[];
    patient?: string[];
    clinician?: string[];
    citations?: Array<{ label: string; url: string }>;
  }
> = {
  'cervical-spine-pain': {
    heroImage: "/assets/images/Hero/CervicalPain.webp",
    overview: [
      'Cervical spine pain (neck pain) is often linked to joints, muscles, discs or nerves. Symptoms can include stiffness, reduced range of motion, headache, and pain that may travel into the shoulder blade or arm.',
      'During your first consultation we focus on the pattern of symptoms—what triggers flare-ups, what eases them, and whether there are any nerve-related features such as tingling or weakness. This helps guide the next step, from simple measures to more targeted investigations or interventions.',
      'Treatment plans frequently combine education, movement and strengthening, posture strategies, and—when appropriate—image-guided procedures to reduce pain and support rehabilitation.',
    ],
    patterns: [
      {
        id: 'stiffness',
        label: 'Stiffness and restricted turning',
        description:
          'Pain that is worse with looking up, turning the head, or prolonged desk work. Often improves with gentle movement and targeted strengthening.',
      },
      {
        id: 'headache',
        label: 'Headache linked to neck pain',
        description:
          'Headache that seems to start from the upper neck and base of the skull, sometimes accompanied by neck tightness or sensitivity.',
      },
      {
        id: 'arm-symptoms',
        label: 'Arm pain, tingling or weakness',
        description:
          'Symptoms that travel into the shoulder, arm or hand may suggest nerve irritation. We prioritise a careful neurological assessment to guide treatment safely.',
      },
      {
        id: 'persistent',
        label: 'Persistent pain with flare-ups',
        description:
          'Ongoing neck discomfort with fluctuating intensity, often influenced by sleep, workload and stress. A stepwise plan can help reduce flare-ups over time.',
      },
    ],
  },
  'lumbar-spine-pain': {
    heroImage: "/assets/images/Hero/LumbarSpinePain.webp",
    overview: [
      'Lumbar spine pain refers to pain that is felt in the lower back, specifically in the area of the lumbar vertebrae.',
      'The lumbar region is the lower portion of the spine and consists of five vertebrae that are responsible for supporting the weight of the upper body and providing flexibility and range of motion for the lower body.',
      'Chronic low back pain is one of the most common pain syndromes and represents an important burden and cost generator for society.',
    ],
    patterns: [
      {
        id: 'mechanical',
        label: 'Mechanical back pain',
        description:
          'Pain that changes with posture or movement (bending, lifting, prolonged sitting). Often improves with graded activity and strengthening.',
      },
      {
        id: 'sciatica',
        label: 'Leg pain or sciatica-type symptoms',
        description:
          'Pain, tingling or numbness that travels into the leg may suggest nerve involvement. We assess neurological signs and red flags before deciding on treatment.',
      },
      {
        id: 'stiffness',
        label: 'Morning stiffness and reduced mobility',
        description:
          'Stiffness after rest or first movements of the day that eases with activity. Treatment focuses on mobility, pacing and tailored exercise.',
      },
      {
        id: 'persistent',
        label: 'Persistent pain with flare-ups',
        description:
          'Longer-lasting pain influenced by workload, sleep and stress. A structured plan aims to reduce flare-up frequency and restore function.',
      },
    ],
  },
  'shoulder-pain': {
    heroImage: "/assets/images/Hero/ShoulderPain.webp",
    overview: [
      'Shoulder pain can arise from the rotator cuff, bursa, joint irritation, tendon overload, or stiffness. It often affects reaching, dressing, lifting and sleep.',
      'We look at when the pain occurs (overhead movement, behind-the-back reach, lying on the shoulder) and whether weakness or reduced range of motion is present. This helps clarify whether rehabilitation, injections or other targeted treatments may help.',
      'Treatment commonly combines guided exercise, load management, and—when indicated—image-guided procedures to reduce pain so rehabilitation can progress.',
    ],
    patterns: [
      {
        id: 'overhead',
        label: 'Pain with overhead reach',
        description:
          'Pain when lifting the arm or working above shoulder height. Often linked to tendon overload or irritation around the shoulder.',
      },
      {
        id: 'night',
        label: 'Night pain and sleep disruption',
        description:
          'Pain that worsens when lying on the shoulder or during the night. We focus on reducing irritation and restoring comfortable movement.',
      },
      {
        id: 'stiffness',
        label: 'Stiffness and loss of range',
        description:
          'Difficulty reaching behind the back or overhead with a stiff, painful end range. Treatment emphasises mobility and progressive strengthening.',
      },
      {
        id: 'weakness',
        label: 'Weakness or giving way',
        description:
          'A feeling of reduced strength when lifting or carrying. We assess the rotator cuff and surrounding stabilisers and match the plan accordingly.',
      },
    ],
    citations: [
      { label: 'AAOS Clinical Practice Guideline: Management of Rotator Cuff Injuries (2019)', url: 'https://www.aaos.org/' },
    ],
  },
  'hand-and-elbow-pain': {
    heroImage: "/assets/images/Hero/HandandElbowPain.webp",
    overview: [
      'Hand and elbow pain can be driven by tendon overload, joint irritation, nerve entrapment or post-injury stiffness. It can affect grip, fine motor tasks, work and sport.',
      'We assess how symptoms relate to gripping, lifting, typing and sport-specific activity, and whether there is any numbness or tingling. This helps guide rehabilitation, splinting strategies, or targeted interventions when appropriate.',
      'Treatment plans frequently combine load management, strengthening and mobility work, and carefully selected procedures to support recovery and function.',
    ],
    patterns: [
      {
        id: 'grip',
        label: 'Grip-related pain',
        description:
          'Pain triggered by gripping, twisting, or repetitive use. Often improves with progressive loading and technique changes.',
      },
      {
        id: 'tendon',
        label: 'Tendon overload around the elbow',
        description:
          'Pain on the inside or outside of the elbow that worsens with lifting or sport. A stepwise plan focuses on tendon capacity and symptom control.',
      },
      {
        id: 'nerve',
        label: 'Numbness or tingling',
        description:
          'Pins-and-needles or altered sensation in the hand can suggest nerve irritation. We assess nerve distribution patterns to guide safe care.',
      },
      {
        id: 'stiffness',
        label: 'Post-injury stiffness',
        description:
          'Reduced motion after sprain, fracture or surgery. Rehabilitation focuses on restoring mobility and rebuilding confidence in use.',
      },
    ],
  },
  'hip-and-groin-pain': {
    heroImage: "/assets/images/Hero/HipandGroinPain.webp",
    overview: [
      'Hip and groin pain can come from the hip joint, tendons, bursa, muscle overload, or referral from the lumbar spine. It may affect walking, stairs, sport and sleep.',
      'We explore where you feel pain (groin, side of hip, buttock), how it behaves with sitting, walking or rotation, and whether there is stiffness or weakness. This helps guide rehabilitation and targeted treatments when needed.',
      'Many people improve with a combined plan that rebuilds hip strength, improves movement control, and targets pain generators to support return to activity.',
    ],
    patterns: [
      {
        id: 'groin',
        label: 'Groin pain with walking or stairs',
        description:
          'Pain felt deep in the groin that worsens with walking, stairs or pivoting. Often linked to hip joint irritation or reduced hip control.',
      },
      {
        id: 'lateral',
        label: 'Lateral hip pain',
        description:
          'Pain on the outside of the hip, sometimes worse when lying on that side. We focus on tendon load tolerance and movement strategy.',
      },
      {
        id: 'stiffness',
        label: 'Stiffness after sitting',
        description:
          'Stiffness when getting up from a chair or out of a car that eases after a few steps. Treatment emphasises mobility and graded strengthening.',
      },
      {
        id: 'referred',
        label: 'Referred pain patterns',
        description:
          'Pain that overlaps with low back or buttock symptoms can be referral. Assessment clarifies whether the hip, spine or both need attention.',
      },
    ],
  },
  'knee-pain': {
    heroImage: "/assets/images/Hero/KneePain.webp",
    overview: [
      'Knee pain may be related to joint irritation, cartilage changes, tendon overload, or biomechanics during walking, stairs and sport. It can affect confidence, fitness and daily activity.',
      'We assess where the pain sits (front, inside, outside, back of knee), whether swelling or instability is present, and how symptoms behave with load. This guides rehabilitation, lifestyle strategies and targeted interventions when indicated.',
      'Treatment focuses on improving strength and control around the knee and hip, building load tolerance, and using injections or other options selectively to support rehabilitation.',
    ],
    patterns: [
      {
        id: 'stairs',
        label: 'Pain with stairs or squatting',
        description:
          'Pain at the front of the knee during stairs, squats or sitting-to-standing. Often improves with strengthening and movement retraining.',
      },
      {
        id: 'swelling',
        label: 'Swelling and stiffness',
        description:
          'Swelling after activity with stiffness that limits bending or walking. We consider load modification and targeted symptom control.',
      },
      {
        id: 'instability',
        label: 'Locking or giving way',
        description:
          'A sense of catching, locking or instability can indicate internal derangement. We assess carefully and coordinate appropriate next steps.',
      },
      {
        id: 'persistent',
        label: 'Persistent pain with reduced tolerance',
        description:
          'Ongoing knee pain that limits walking distance or activity. A progressive plan helps rebuild capacity while keeping symptoms manageable.',
      },
    ],
    citations: [
      { label: 'NICE Guideline: Osteoarthritis in over 16s (NG226, 2022)', url: 'https://www.nice.org.uk/guidance/ng226' },
    ],
  },
  'thoracic-wall-pain': {
    heroImage: "/assets/images/Hero/ThoracicWallPain.webp",
    overview: [
      'Thoracic wall pain is felt around the ribs, upper back or chest wall. It is commonly linked to posture, muscle overload, joint irritation, or nerve sensitivity.',
      'We assess breathing-related triggers, movement patterns, and whether the pain is localised to the chest wall. This helps identify treatable causes and reduce unnecessary worry when serious causes have been excluded.',
      'Treatment often includes education, mobility and strengthening, breathing and posture strategies, and targeted interventions when a specific pain generator is identified.',
    ],
    patterns: [
      {
        id: 'posture',
        label: 'Posture-related pain',
        description:
          'Pain that worsens with prolonged sitting or rounded posture and improves with movement. Rehabilitation focuses on mobility and endurance.',
      },
      {
        id: 'rib-joint',
        label: 'Rib or joint irritation',
        description:
          'Pain near the spine or rib joints that is sensitive to twisting or deep breathing. Assessment helps pinpoint the source for targeted care.',
      },
      {
        id: 'muscle',
        label: 'Muscle strain and overload',
        description:
          'Pain after lifting, coughing, or sudden movement. Treatment prioritises calm-down strategies and a gradual return to normal activity.',
      },
      {
        id: 'nerve',
        label: 'Nerve-type pain',
        description:
          'Sharp, burning or band-like pain that may follow a rib line. We assess nerve involvement and tailor management accordingly.',
      },
    ],
  },
  'abdominal-wall-pain': {
    heroImage: "/assets/images/Hero/AbdominalWallPain.webp",
    overview: [
      'Abdominal wall pain is pain originating from the muscles, fascia or nerves of the abdominal wall rather than from internal organs. It can feel sharp, localised and tender to touch.',
      'Because it can mimic internal abdominal problems, we focus on a careful clinical assessment to confirm the likely source and rule out warning features that require medical investigation.',
      'Treatment may include targeted rehabilitation, medication strategies, and—when appropriate—image-guided injections or nerve-focused approaches to reduce pain and improve function.',
    ],
    patterns: [
      {
        id: 'localised',
        label: 'A well-localised tender spot',
        description:
          'Pain that you can point to with one finger, often worsened by pressure on a specific area of the abdominal wall.',
      },
      {
        id: 'movement',
        label: 'Pain with movement or core activity',
        description:
          'Symptoms that flare with coughing, sit-ups, turning in bed, or certain postures. Treatment focuses on graded loading and symptom control.',
      },
      {
        id: 'nerve',
        label: 'Nerve irritation features',
        description:
          'Burning or shooting pain that follows a small area and may be sensitive to light touch. We assess for nerve entrapment patterns.',
      },
      {
        id: 'post-surgery',
        label: 'Post-surgical or scar-related pain',
        description:
          'Pain around a scar or after abdominal procedures can be due to nerve sensitivity. A stepwise plan helps calm symptoms and restore function.',
      },
    ],
  },
  'pelvic-and-gynaecological-pain': {
    heroImage: "/assets/images/Hero/PelvicandGynaecologicalPain.webp",
    overview: [
      'Pelvic and gynaecological pain can have multiple contributors, including pelvic floor muscle tension, nerve sensitivity, joint or connective tissue irritation, and gynaecological or urological factors.',
      'We take a respectful, whole-person history to understand symptom triggers and impact on daily life, sleep and wellbeing. When needed, we coordinate with relevant specialists to ensure appropriate investigation and care.',
      'Treatment is often multidisciplinary, combining education, rehabilitation and pelvic floor–informed approaches, medication optimisation, and targeted interventions when appropriate.',
    ],
    patterns: [
      {
        id: 'flare-ups',
        label: 'Persistent pain with flare-ups',
        description:
          'Ongoing symptoms that vary day to day and are influenced by stress, sleep, activity and life events. A structured plan helps reduce flare frequency.',
      },
      {
        id: 'sitting',
        label: 'Pain with sitting',
        description:
          'Pain that worsens with prolonged sitting and eases with changing position. We look at pelvic floor, nerve sensitivity and movement strategies.',
      },
      {
        id: 'cycle',
        label: 'Symptoms linked to hormonal cycle',
        description:
          'Pain that changes with the menstrual cycle or hormonal factors. Assessment helps clarify timing and coordinate appropriate investigation and treatment.',
      },
      {
        id: 'bladder-bowel',
        label: 'Bladder or bowel-related triggers',
        description:
          'Pain that is influenced by bladder filling, bowel symptoms or pelvic pressure. Multidisciplinary input can be helpful for a comprehensive plan.',
      },
    ],
    citations: [
      { label: 'ACOG Practice Bulletin: Chronic Pelvic Pain', url: 'https://www.acog.org/' },
    ],
  },
  'head-pain': {
    heroImage: "/assets/images/Hero/HeadPain.webp",
    overview: [
      'Head pain can include migraine, tension-type headache, cluster headache and other primary headache disorders. It may also be secondary to conditions affecting the neck, jaw, sinuses or nerves.',
      'We focus on the pattern: onset, frequency, triggers, associated symptoms (nausea, light sensitivity, tearing, nasal congestion), and any red flags. This helps match you to the most appropriate evidence-based pathway.',
      'Treatment may include lifestyle and trigger strategies, acute and preventive medicines when indicated, rehabilitation for cervicogenic contributors, and targeted procedures for selected headache syndromes.',
    ],
    patterns: [
      {
        id: 'migraine',
        label: 'Migraine-type headache',
        description:
          'Moderate to severe headache often associated with nausea, sensitivity to light or sound, and activity intolerance. We consider acute and preventive strategies based on frequency and disability.',
      },
      {
        id: 'tension',
        label: 'Tension-type headache',
        description:
          'A pressure or tight-band sensation often linked to stress, sleep and posture factors. Management commonly includes education, stress/sleep strategies and rehabilitation.',
      },
      {
        id: 'cluster',
        label: 'Cluster-type headache',
        description:
          'Severe one-sided attacks often around the eye, sometimes with tearing or nasal symptoms. Prompt recognition is important to match acute and preventive treatment.',
      },
      {
        id: 'neck-related',
        label: 'Neck-related headache features',
        description:
          'Headache that overlaps with neck pain or stiffness may suggest cervicogenic contribution. A careful assessment helps guide appropriate rehabilitation or interventions.',
      },
    ],
    patient: [
      'Keep a simple headache diary for 2–4 weeks (frequency, duration, triggers, and medication use). This improves diagnostic accuracy and treatment selection.',
      'Seek urgent medical attention for “worst-ever” headache, sudden onset thunderclap headache, new neurological symptoms, or headache with fever/neck stiffness.',
    ],
    clinician: [
      'We align diagnosis with ICHD-3 patterns and prioritise medication-overuse screening, red flags, and coordinated preventive strategies when indicated.',
      'Referral notes that include frequency, disability, acute medication use, and any prior preventive trials help streamline care.',
    ],
    citations: [
      { label: 'IHS: International Classification of Headache Disorders (ICHD-3)', url: 'https://ichd-3.org/' },
      { label: 'NICE: Headaches in over 12s (CG150)', url: 'https://www.nice.org.uk/guidance/cg150' },
    ],
  },
  'facial-pain': {
    heroImage: "/assets/images/Hero/FacialPain.webp",
    overview: [
      'Facial pain can be complex and distressing. It may be related to nerve irritation, jaw and muscle tension, dental or sinus referral, or headache syndromes.',
      'We focus on the quality and timing of pain—short electric-shock episodes versus persistent aching or burning—and whether there are triggers such as chewing, touch or cold air. This helps determine the most appropriate pathway.',
      'Treatment may include medication optimisation for nerve pain, targeted procedures when indicated, and coordinated care with dental, ENT or neurology services when needed.',
    ],
    patterns: [
      {
        id: 'shock',
        label: 'Brief electric-shock episodes',
        description:
          'Sudden, sharp pain triggered by touch, chewing or brushing teeth can suggest neuralgia-type pain. Assessment helps guide targeted treatment.',
      },
      {
        id: 'jaw',
        label: 'Jaw and chewing-related pain',
        description:
          'Pain around the jaw or temples that worsens with chewing or clenching. We assess jaw mechanics and contributing muscle tension.',
      },
      {
        id: 'burning',
        label: 'Persistent burning or aching',
        description:
          'Continuous pain that may be sensitive to light touch or temperature. Management focuses on calm-down strategies and nerve-informed care.',
      },
      {
        id: 'headache',
        label: 'Overlap with headache syndromes',
        description:
          'Facial pain may overlap with headache patterns. A careful history helps match you with the most effective treatments.',
      },
    ],
    citations: [
      { label: 'AAN Guideline: Trigeminal Neuralgia (2019)', url: 'https://www.aan.com/' },
    ],
  },
  'foot-and-ankle-pain': {
    heroImage: "/assets/images/Hero/FootandAnklePain.webp",
    overview: [
      'Foot and ankle pain can come from tendon and ligament overload, joint irritation, plantar fascia strain, nerve irritation, or lingering symptoms after a sprain.',
      'We assess your walking pattern, footwear and activity demands, and whether pain is localised (heel, arch, ankle, forefoot) or associated with swelling, instability or nerve symptoms.',
      'Treatment commonly combines load management, strengthening, footwear and orthotic advice when appropriate, and targeted interventions to support rehabilitation and return to activity.',
    ],
    patterns: [
      {
        id: 'first-steps',
        label: 'Pain on first steps',
        description:
          'Heel or arch pain that is worst on the first steps in the morning and eases with movement. Treatment focuses on load management and progressive strengthening.',
      },
      {
        id: 'sprain',
        label: 'Post-sprain pain or instability',
        description:
          'Symptoms after an ankle sprain can include swelling, pain and a sense of giving way. Rehabilitation targets strength, balance and confidence.',
      },
      {
        id: 'tendon',
        label: 'Tendon overload',
        description:
          'Pain around the ankle that worsens with walking hills, running or jumping. A graded plan helps restore tendon capacity safely.',
      },
      {
        id: 'nerve',
        label: 'Numbness or tingling',
        description:
          'Pins-and-needles, burning or altered sensation may indicate nerve irritation. Assessment clarifies contributors and guides targeted care.',
      },
    ],
    citations: [
      { label: 'BJSM: Plantar heel pain clinical practice guideline (2019)', url: 'https://bjsm.bmj.com/' },
    ],
  },
  // Sports Medicine
  'sports-injuries': {
    heroImage: "/assets/images/Hero/ShoulderPain.webp",
    overview: [
      'Sports injuries range from sprains and strains to tendon tears and stress reactions. Understanding the mechanism and load context guides safe return to play.',
      'We assess movement patterns, sport-specific demands and tissue healing timelines to tailor rehabilitation and decide when imaging or procedures may help.',
      'Plans emphasise progressive loading, technique coaching and when necessary image‑guided interventions to calm pain and support training resumption.',
    ],
    patterns: [
      { id: 'acute', label: 'Acute soft‑tissue injury', description: 'Early management focuses on load control and a graded return guided by symptoms and function.' },
      { id: 'tendon', label: 'Tendon overload', description: 'Progressive tendon loading restores capacity while controlling pain and avoiding deconditioning.' },
      { id: 'stress', label: 'Bone stress risk', description: 'Red‑flag screening and appropriate imaging or rest if bone stress is suspected.' },
      { id: 'recurrent', label: 'Recurrent strain', description: 'Movement and strength screening to address modifiable risk and build robustness.' },
    ],
    citations: [
      { label: 'BJSM: IOC consensus on acute soft‑tissue injury management (2020)', url: 'https://bjsm.bmj.com/' },
    ],
  },
  'injury-prevention': {
    heroImage: "/assets/images/Hero/Exercise.webp",
    overview: [
      'Injury prevention combines screening for modifiable risk factors with education, load planning and neuromuscular training.',
      'Programmes are tailored to sport, position and season, embedding proven warm‑up and strength components without overloading schedules.',
      'We track readiness and recovery to adjust training and reduce time‑loss injuries over time.',
    ],
    patterns: [
      { id: 'screen', label: 'Movement screening', description: 'Identify mobility, control and strength gaps that carry risk during specific tasks.' },
      { id: 'warmup', label: 'Proven warm‑ups', description: 'Implement evidence‑based neuromuscular warm‑ups appropriate to your sport and level.' },
      { id: 'load', label: 'Load planning', description: 'Balance training stimulus and recovery with objective and subjective monitoring.' },
      { id: 'education', label: 'Education & habits', description: 'Build sleep, nutrition and recovery practices that support adaptation and reduce risk.' },
    ],
    citations: [
      { label: 'BMJ: Sports injury prevention best practice', url: 'https://bjsm.bmj.com/' },
    ],
  },
  'sports-rehabilitation': {
    heroImage: "/assets/images/Hero/Physiotherapy.webp",
    overview: [
      'Sports rehabilitation rebuilds capacity through staged strength, control and conditioning, aligned to tissue healing and performance demands.',
      'We integrate pain‑management when needed so progressive loading remains possible and safe.',
      'Return‑to‑sport testing supports confident transitions back to training and competition.',
    ],
    patterns: [
      { id: 'capacity', label: 'Capacity building', description: 'Staged strength and conditioning with objective progress markers.' },
      { id: 'control', label: 'Motor control', description: 'Technique, balance and coordination tailored to sport‑specific tasks.' },
      { id: 'criteria', label: 'Criteria‑based progression', description: 'Clear criteria for phase advancement and return to training.' },
      { id: 'prehab', label: 'Prehab for performance', description: 'Preventive strength and mobility work to support upcoming loads.' },
    ],
    citations: [
      { label: 'BJSM: Return-to-sport consensus statements', url: 'https://bjsm.bmj.com/' },
    ],
  },
  'sports-performance': {
    heroImage: "/assets/images/Hero/Exercise.webp",
    overview: [
      'Performance support aligns strength, conditioning and skill work with recovery and nutrition to sustain adaptation.',
      'We emphasise progressive overload, movement efficiency and monitoring to inform training decisions.',
      'When pain or prior injury exists, performance planning integrates capacity restoration to avoid setbacks.',
    ],
    patterns: [
      { id: 'strength', label: 'Strength & power', description: 'Programme design to improve force, rate of force and movement efficiency.' },
      { id: 'conditioning', label: 'Conditioning', description: 'Aerobic and anaerobic conditioning tailored to sport‑specific demands.' },
      { id: 'monitoring', label: 'Monitoring', description: 'Use simple and reliable monitoring to adjust loads and support recovery.' },
      { id: 'integration', label: 'Integration with rehab', description: 'Bridge the gap between rehabilitation and performance training.' },
    ],
  },
  'sports-psychology': {
    heroImage: "/assets/images/Hero/Psychology.webp",
    overview: [
      'Sports psychology supports motivation, confidence and coping under pressure, especially after injury or performance dips.',
      'We build practical strategies for goal‑setting, imagery, arousal regulation and returning to competition.',
      'Approach is collaborative with coaches and medical staff while protecting athlete wellbeing.',
    ],
    patterns: [
      { id: 'confidence', label: 'Confidence after injury', description: 'Gradual exposure and psychological skills training to reduce fear of re‑injury.' },
      { id: 'focus', label: 'Focus & arousal regulation', description: 'Breathing, self‑talk and imagery to modulate arousal and improve focus.' },
      { id: 'motivation', label: 'Motivation & adherence', description: 'Structured goals and feedback loops to maintain progress.' },
      { id: 'return', label: 'Return to competition', description: 'Mental readiness plans aligned with physical criteria.' },
    ],
    citations: [
      { label: 'APA Division 47: Sport, Exercise & Performance Psychology resources', url: 'https://www.apa.org/' },
    ],
  },
  'sports-nutrition': {
    heroImage: "/assets/images/Hero/Nutrition.webp",
    overview: [
      'Sports nutrition optimises training adaptation, recovery and body composition while considering health and performance goals.',
      'We customise fuelling around sessions and events, and address energy availability, hydration and supplementation when appropriate.',
      'Plans integrate medical considerations and are monitored for safety and effectiveness.',
    ],
    patterns: [
      { id: 'fuelling', label: 'Session fuelling', description: 'Carbohydrate and protein timing aligned to training load and goals.' },
      { id: 'recovery', label: 'Recovery nutrition', description: 'Hydration and nutrition strategies to support adaptation and next sessions.' },
      { id: 'energy', label: 'Energy availability', description: 'Screening and management to avoid low energy availability consequences.' },
      { id: 'supplements', label: 'Evidence‑based supplements', description: 'Consider limited, safe, evidence‑supported supplementation.' },
    ],
    citations: [
      { label: 'IOC Consensus: Dietary supplements and the high‑performance athlete', url: 'https://bjsm.bmj.com/' },
    ],
  },
  // Stroke Medicine
  'clinical-and-secondary-prevention-of-stroke': {
    heroImage: "/assets/images/Hero/OccupationalTherapy.webp",
    overview: [
      'Secondary prevention aims to reduce the risk of recurrent stroke or TIA through medication optimisation and lifestyle interventions.',
      'We work with your medical team to address blood pressure, lipids, antithrombotic therapy and risk factors such as smoking and diabetes.',
      'Education and coordinated follow‑up support adherence and long‑term risk reduction.',
    ],
    patterns: [
      { id: 'bp', label: 'Blood pressure & lipids', description: 'Optimise targets according to contemporary guidelines and comorbidities.' },
      { id: 'antithrombotic', label: 'Antithrombotic therapy', description: 'Use antiplatelet or anticoagulation as indicated by stroke mechanism.' },
      { id: 'lifestyle', label: 'Lifestyle change', description: 'Support smoking cessation, activity, diet and sleep.’' },
      { id: 'adherence', label: 'Adherence & follow‑up', description: 'Education and review to maintain long‑term prevention gains.' },
    ],
    citations: [
      { label: 'AHA/ASA Guideline for the Prevention of Stroke in Patients With Stroke & TIA (2021)', url: 'https://www.ahajournals.org/' },
    ],
  },
  'feeding-autonomy': {
    heroImage: "/assets/images/Hero/OccupationalTherapy.webp",
    overview: [
      'Feeding autonomy focuses on safe, independent eating and drinking after stroke while managing dysphagia risk.',
      'We coordinate swallow assessment, texture modifications, posture, and caregiver training as needed.',
      'Goals emphasise safety, nutrition and dignity while advancing towards independence.',
    ],
    patterns: [
      { id: 'swallow', label: 'Swallow safety', description: 'Speech‑language assessment, posture and texture modifications to reduce aspiration risk.' },
      { id: 'posture', label: 'Positioning', description: 'Optimise seating and head position to support safe swallowing.' },
      { id: 'training', label: 'Caregiver training', description: 'Education on safe feeding techniques and monitoring signs of difficulty.' },
      { id: 'progression', label: 'Diet progression', description: 'Gradual changes guided by objective assessment and tolerance.' },
    ],
  },
  'speech-autonomy': {
    heroImage: "/assets/images/Hero/SpeechTherapy.webp",
    overview: [
      'Speech autonomy supports communication and swallowing after stroke, including aphasia, dysarthria and apraxia of speech.',
      'We build personalised therapy around functional goals with assistive strategies and caregiver involvement.',
      'We coordinate with medical teams to monitor progress and adjust the plan as needs evolve.',
    ],
    patterns: [
      { id: 'aphasia', label: 'Aphasia', description: 'Impairment in language affecting speaking, comprehension, reading or writing.' },
      { id: 'dysarthria', label: 'Dysarthria', description: 'Motor speech difficulties due to weakness or incoordination.' },
      { id: 'apraxia', label: 'Apraxia of speech', description: 'Difficulty planning and sequencing the movements needed for speech.' },
      { id: 'swallow', label: 'Dysphagia', description: 'Swallowing difficulty requiring safety strategies and supervised progression.' },
    ],
  },
  'post-stroke-depression-and-mood-disorders': {
    heroImage: "/assets/images/Hero/Psychology.webp",
    overview: [
      'Mood disorders after stroke are common and treatable. We screen for depression and anxiety and coordinate care across teams.',
      'Management includes psychoeducation, psychological therapies and medication when indicated, with monitoring for response and safety.',
      'Family and caregiver support is integral to recovery and quality of life.',
    ],
    patterns: [
      { id: 'depression', label: 'Depression', description: 'Persistent low mood, anhedonia and fatigue affecting recovery and engagement.' },
      { id: 'anxiety', label: 'Anxiety', description: 'Excessive worry, restlessness, and physiological symptoms that can impede participation.' },
      { id: 'adjustment', label: 'Adjustment difficulties', description: 'Coping with functional changes after stroke with tailored support.' },
      { id: 'sleep', label: 'Sleep disturbance', description: 'Addressing sleep as part of a holistic mood management plan.' },
    ],
  },
  'medical-complications-post-stroke': {
    heroImage: "/assets/images/Hero/HomeCare.webp",
    overview: [
      'Medical complications post-stroke (e.g., infections, DVT, pressure injuries) can impede rehabilitation and must be proactively managed.',
      'We coordinate surveillance and communication with medical teams to reduce avoidable complications and support early interventions.',
      'Education empowers patients and caregivers to recognise warning signs and seek timely care.',
    ],
    patterns: [
      { id: 'infection', label: 'Infection risk', description: 'Monitor for pneumonia, UTI and other infections; encourage mobility, hydration and hygiene.' },
      { id: 'thrombo', label: 'Thromboembolism', description: 'Encourage early mobility and appropriate prophylaxis per medical advice.' },
      { id: 'pressure', label: 'Pressure injuries', description: 'Positioning, skin checks and equipment to reduce risk.' },
      { id: 'malnutrition', label: 'Malnutrition/dehydration', description: 'Screening and nutrition support integrated with rehab.' },
    ],
  },
  'post-stroke-spasticity': {
    heroImage: "/assets/images/Hero/Physiotherapy.webp",
    overview: [
      'Spasticity after stroke can impair movement and function. Management blends therapy with medications and injections when indicated.',
      'We prioritise functional goals, positioning and splinting, and coordinate botulinum toxin or other interventions in selected cases.',
      'Progress is measured by comfort, ease of care and participation in rehab tasks.',
    ],
    patterns: [
      { id: 'goals', label: 'Goal‑oriented care', description: 'Define meaningful functional goals for any intervention considered.' },
      { id: 'therapy', label: 'Therapy & positioning', description: 'Optimise range, comfort and limb care; splinting as appropriate.' },
      { id: 'botox', label: 'Chemodenervation', description: 'Botulinum toxin or phenol in selected cases with clear goals and follow‑up.' },
      { id: 'review', label: 'Review & adjust', description: 'Monitor effect and adjust plan, educating patients and caregivers.' },
    ],
  },
  'complex-regional-pain-syndrome': {
    heroImage: "/assets/images/Hero/PeripheralNerveBlocks.webp",
    overview: [
      'Complex Regional Pain Syndrome (CRPS) is a chronic pain condition often following injury or immobilisation, marked by pain disproportionate to the inciting event.',
      'Management emphasises education, graded exposure, desensitisation, and when needed medication and interventional pain approaches.',
      'Early recognition and coordinated care improve outcomes and limit disability.',
    ],
    patterns: [
      { id: 'sensory', label: 'Sensory disturbance', description: 'Allodynia, hyperalgesia and temperature changes are common features.' },
      { id: 'motor', label: 'Motor changes', description: 'Stiffness and weakness require careful graded re‑activation.' },
      { id: 'autonomic', label: 'Autonomic signs', description: 'Colour/temperature/asymmetry may be present and fluctuate.' },
      { id: 'psychosocial', label: 'Psychosocial impact', description: 'Address mood, sleep and coping to support recovery.' },
    ],
  },
  'postural-and-motor-control-autonomy': {
    heroImage: "/assets/images/Hero/Physiotherapy.webp",
    overview: [
      'Postural and motor control autonomy focuses on regaining safe, independent movement and balance after stroke.',
      'Training targets trunk and limb control, sit‑to‑stand, stepping and gait with task‑specific practice and progression.',
      'Assistive devices are used judiciously and tapered as capacity improves.',
    ],
    patterns: [
      { id: 'balance', label: 'Balance training', description: 'Progress balance tasks safely with appropriate challenge.' },
      { id: 'gait', label: 'Gait re‑training', description: 'Task‑specific stepping and gait drills with feedback.' },
      { id: 'strength', label: 'Strength and endurance', description: 'Progressive resistance and aerobic work for overall autonomy.' },
      { id: 'device', label: 'Assistive devices', description: 'Selection and tapering of aids as function returns.' },
    ],
  },
  'community-reintegration': {
    heroImage: "/assets/images/Hero/HomeCare.webp",
    overview: [
      'Community reintegration supports return to home, work, leisure and social participation after stroke.',
      'We identify environmental barriers, build confidence in real‑world tasks, and coordinate supports and transport where needed.',
      'Education and peer/community links help maintain momentum beyond formal therapy.',
    ],
    patterns: [
      { id: 'adl', label: 'Activities of daily living', description: 'Independence in personal care, household tasks and community activities.' },
      { id: 'transport', label: 'Transport & access', description: 'Plan for safe transport, mobility and community access.' },
      { id: 'work', label: 'Return to work', description: 'Graded returns with employer and team liaison where appropriate.' },
      { id: 'social', label: 'Social participation', description: 'Build routines and connections that support wellbeing and independence.' },
    ],
  },
};

const KNEE_MOST_COMMON_SYNDROMES: Syndrome[] = [
  {
    id: 'patellar-subluxation',
    label: 'Patellar subluxation or dislocation',
    description:
      'The kneecap (patella) can partially shift or fully dislocate, often causing sudden pain, swelling, and a feeling of instability or “giving way”.',
  },
  {
    id: 'osgood-schlatter',
    label: 'Osgood–Schlatter lesion',
    description:
      'A common cause of knee pain in active adolescents, linked to traction at the tibial tuberosity and tenderness just below the kneecap.',
  },
  {
    id: 'patellar-tendinitis',
    label: 'Patellar tendinitis',
    description:
      'Pain at the patellar tendon (often below the kneecap) that can worsen with jumping, stairs, and load—frequently associated with overuse or rapid training changes.',
  },
  {
    id: 'patellofemoral-pain',
    label: 'Patellofemoral pain syndrome',
    description:
      'Pain around or behind the kneecap, often aggravated by stairs, squatting, running, or prolonged sitting, and influenced by load tolerance and biomechanics.',
  },
  {
    id: 'collateral-ligament-sprain',
    label: 'Medial / Lateral collateral ligament sprain',
    description:
      'Injury to the ligaments on the inside (MCL) or outside (LCL) of the knee, commonly from a twist or impact, causing localized pain and tenderness.',
  },
  {
    id: 'meniscal-tear',
    label: 'Medial / Lateral meniscal tear',
    description:
      'Meniscus injuries can cause joint‑line pain, swelling, catching, or locking sensations. Presentation varies by tear type and activity demands.',
  },
  {
    id: 'pes-anserine-bursitis',
    label: 'Pes anserine bursitis',
    description:
      'Pain and tenderness on the inner side of the knee below the joint line, sometimes associated with tendon irritation and load sensitivity.',
  },
  {
    id: 'itb-tendinopathy',
    label: 'Iliotibial band tendinitis',
    description:
      'Common in runners and cyclists, presenting as pain on the outside of the knee that worsens with repetitive bending and loading.',
  },
  {
    id: 'bakers-cyst',
    label: "Baker's cyst",
    description:
      'A fluid‑filled swelling behind the knee that can be associated with underlying joint irritation. It may cause tightness, pain, or reduced range of motion.',
  },
  {
    id: 'knee-osteoarthritis',
    label: 'Knee Osteoarthritis',
    description:
      'Degenerative joint changes can lead to pain, stiffness, swelling, and reduced function—often influenced by activity levels, strength, and overall load tolerance.',
  },
];

const HIP_MOST_COMMON_SYNDROMES: Syndrome[] = [
  {
    id: 'meralgia-paresthetica',
    label: 'Meralgia paresthetica',
    description:
      'Burning, tingling, or numbness on the outer thigh due to irritation of the lateral femoral cutaneous nerve, sometimes influenced by posture, load, or compression.',
  },
  {
    id: 'athletic-pubalgia',
    label: 'Athletic pubalgia',
    description:
      'Groin pain linked to the pubic region and surrounding soft tissues, commonly in athletes and often aggravated by sprinting, cutting, or kicking.',
  },
  {
    id: 'femoral-neck-fracture',
    label: 'Femoral neck fracture/stress fracture',
    description:
      'Hip or groin pain that can worsen with weight‑bearing and may follow trauma or repetitive load. Prompt assessment is important when suspected.',
  },
  {
    id: 'fai',
    label: 'Femoroacetabular impingement',
    description:
      'Hip joint impingement that can cause groin pain, stiffness, and reduced range of motion, often worse with sitting, squatting, or rotation.',
  },
  {
    id: 'labral-tear',
    label: 'Hip labral tear',
    description:
      'Pain often felt in the groin with clicking, catching, or giving‑way sensations. Symptoms may vary with activity and hip position.',
  },
  {
    id: 'iliopsoas-bursitis',
    label: 'Iliopsoas bursitis (internal snapping hip)',
    description:
      'Anterior hip or groin discomfort with snapping sensations during hip flexion/extension, sometimes linked to tendon irritation and load sensitivity.',
  },
  {
    id: 'legg-calve-perthes',
    label: 'Legg–Calvé–Perthes disease',
    description:
      'A childhood condition affecting the femoral head that can cause hip/groin pain, stiffness, and a limp. Specialist assessment guides management.',
  },
  {
    id: 'oa-on',
    label: 'Osteoarthritis/Osteonecrosis of the hip',
    description:
      'Joint‑related pain and stiffness that can limit walking and daily activity. In older adults, osteoarthritis is a common cause of hip pain.',
  },
  {
    id: 'transient-synovitis',
    label: 'Transient synovitis',
    description:
      'Temporary hip joint inflammation (more common in children) that can cause pain and limp, usually improving over time with appropriate care.',
  },
  {
    id: 'external-snapping',
    label: 'External snapping hip',
    description:
      'Snapping sensation on the outside of the hip, often related to the iliotibial band or surrounding soft tissues moving over bony landmarks.',
  },
  {
    id: 'gtps',
    label: 'Greater trochanteric pain syndrome',
    description:
      'Lateral hip pain linked to gluteal tendons and bursa irritation, often worse with walking, stairs, side‑lying, or prolonged standing.',
  },
  {
    id: 'muscle-tear',
    label: 'Muscle tear or avulsion',
    description:
      'Acute pain after a sudden load or sprinting, sometimes with bruising or weakness. Assessment helps confirm the involved structure and guide return to activity.',
  },
  {
    id: 'si-joint',
    label: 'Sacroiliac joint dysfunction',
    description:
      'Pain around the buttock and pelvis that can refer to the groin or thigh, influenced by posture and load. Targeted examination helps confirm likely sources.',
  },
  {
    id: 'piriformis',
    label: 'Piriformis syndrome',
    description:
      'Buttock pain with possible leg symptoms related to irritation near the sciatic nerve. Symptoms often vary with sitting, hip position, and activity.',
  },
];

const HEAD_MOST_COMMON_SYNDROMES: Syndrome[] = [
  {
    id: 'cluster-headache',
    label: 'Cluster Headache',
    description:
      'Severe, one‑sided headache attacks with autonomic symptoms such as tearing or nasal congestion, often occurring in clusters over weeks.',
  },
  {
    id: 'tension-headache',
    label: 'Tension Headache',
    description:
      'A common headache pattern often described as a pressing or tightening sensation, sometimes associated with stress, sleep, and muscle tension.',
  },
  {
    id: 'paroxysmal-hemicrania',
    label: 'Paroxysmal Hemicrania',
    description:
      'Short, frequent, one‑sided headache attacks that can respond strongly to specific anti‑inflammatory medication under medical supervision.',
  },
  {
    id: 'sunha',
    label: 'Short‑lasting unilateral neuralgiform headache attacks',
    description:
      'Brief, sharp attacks of head pain with prominent autonomic features. Care focuses on confirming the diagnosis and choosing an appropriate treatment plan.',
  },
];

const CERVICAL_MOST_COMMON_SYNDROMES: Syndrome[] = [
  {
    id: 'whiplash-injury',
    label: '“Whiplash” Injury',
    description:
      'Whiplash‑associated disorders (WAD) can follow acceleration–deceleration injury (for example, a rear‑end collision). Symptoms may include neck pain and stiffness, headache, and sensitivity with movement.',
  },
  {
    id: 'fractures-dislocations',
    label: 'Fractures and fracture dislocations',
    description:
      'Neck pain after trauma requires careful assessment. When suspected, imaging and specialist review help confirm stability and guide safe management.',
  },
  {
    id: 'degenerative-disease',
    label: 'Cervical disk and facet joint degenerative disease',
    description:
      'Age‑related changes in discs and facet joints can contribute to stiffness, local neck pain, and referred pain into the shoulder blade region, especially with sustained posture or rotation.',
  },
  {
    id: 'inflammatory-joint-disease',
    label: 'Inflammatory joint diseases (ankylosing spondylitis)',
    description:
      'Inflammatory conditions can cause persistent pain and morning stiffness. Treatment often combines medication optimisation with rehabilitation and posture strategies.',
  },
  {
    id: 'muscle-contractures',
    label: 'Cervical Muscles Contractures',
    description:
      'Muscle spasm or protective guarding can limit range of motion and amplify pain. Plans typically include education, graded movement, and strengthening to restore tolerance.',
  },
];

const SHOULDER_MOST_COMMON_SYNDROMES: Syndrome[] = [
  {
    id: 'subacromial-impingement',
    label: 'Subacromial impingement (tendinopathy, bursitis)',
    description:
      'Pain with overhead reaching or side‑lying that can reflect rotator cuff tendon overload and bursa irritation. Management typically combines load guidance, exercise, and selected injections.',
  },
  {
    id: 'rotator-cuff-tear',
    label: 'Rotator Cuff Tear',
    description:
      'Weakness and pain with lifting or reaching can indicate a tendon tear. Assessment helps determine severity and whether rehabilitation, injections, or surgical referral is appropriate.',
  },
  {
    id: 'suprascapular-neuropathy',
    label: 'Suprascapular neuropathy',
    description:
      'Irritation of the suprascapular nerve can contribute to shoulder pain and weakness, sometimes linked to overhead activity or cysts near the labrum.',
  },
  {
    id: 'shoulder-instability',
    label: 'Shoulder instability (Multi–directional; Uni–directional)',
    description:
      'A feeling of slipping, catching, or apprehension can reflect instability. Treatment focuses on stability, strength, and movement control; imaging helps when structural injury is suspected.',
  },
  {
    id: 'labral-slap',
    label: 'Labral/SLAP tears',
    description:
      'Labral injuries can cause deep shoulder pain, clicking, or reduced performance with overhead tasks. Plans range from rehabilitation to targeted injections or surgical review depending on function.',
  },
  {
    id: 'biceps-tendinopathy',
    label: 'Biceps tendinopathy, ruptures or subluxation',
    description:
      'Front‑of‑shoulder pain can relate to the long head of biceps tendon. Management includes load modification and strengthening; imaging can help confirm tears or tendon instability.',
  },
  {
    id: 'ac-arthropathy',
    label: 'AC arthropathy/instability',
    description:
      'Pain on top of the shoulder, especially with cross‑body movements, can relate to the acromioclavicular joint. Treatment may include rehabilitation and image‑guided injections.',
  },
  {
    id: 'glenohumeral-arthropathy',
    label: 'Glenohumeral joint arthropathy',
    description:
      'Arthritis in the main shoulder joint can cause stiffness, night pain, and reduced range of motion. Care combines exercise, pain control, injections, and surgical options when needed.',
  },
  {
    id: 'scapulothoracic-dyskinesis',
    label: 'Scapulo–thoracic dyskinesis',
    description:
      'Altered shoulder blade control can increase load on shoulder tissues. Rehabilitation targets posture, strength, and coordination to improve movement efficiency.',
  },
];

const HAND_ELBOW_MOST_COMMON_SYNDROMES: Syndrome[] = [
  {
    id: 'epicondylitis',
    label: 'Lateral/Medial epicondylitis',
    description:
      'Common tendon overload conditions around the elbow (often called tennis elbow or golfer’s elbow). Symptoms can be triggered by gripping, lifting, typing, and repetitive wrist or forearm activity. Management typically includes load modification, progressive strengthening, and targeted symptom control.',
  },
  {
    id: 'pronator-syndrome',
    label: 'Pronator syndrome',
    description:
      'Median nerve irritation in the forearm that can cause aching pain and altered sensation. Assessment focuses on symptom pattern, provoking positions, and functional triggers to guide rehabilitation and, when needed, targeted intervention.',
  },
  {
    id: 'radial-tunnel',
    label: 'Radial tunnel syndrome',
    description:
      'Pain in the forearm related to irritation around the radial nerve, sometimes overlapping with lateral elbow symptoms. Treatment can include activity changes, strengthening, and nerve‑sensitive load progression.',
  },
  {
    id: 'cubital-tunnel',
    label: 'Cubital tunnel syndrome',
    description:
      'Ulnar nerve irritation at the elbow that may cause numbness or tingling in the ring and little fingers. Management often includes posture and sleep positioning strategies, splinting, and graded strengthening.',
  },
  {
    id: 'carpal-tunnel',
    label: 'Carpal tunnel syndrome',
    description:
      'Median nerve compression at the wrist that can cause numbness, tingling, and night symptoms. Treatment may include splinting, ergonomic changes, rehabilitation, injections, or surgical referral when indicated.',
  },
  {
    id: 'de-quervain',
    label: 'De Quervain’s tenosynovitis',
    description:
      'Pain on the thumb side of the wrist linked to tendon sheath irritation, often worsened by gripping and lifting. Care typically includes load management, splinting, and targeted procedures when needed.',
  },
  {
    id: 'ganglion-cysts',
    label: 'Ganglion cysts',
    description:
      'Fluid‑filled swellings that can cause discomfort or limit movement depending on location. Management depends on symptoms and may include observation, aspiration, or other targeted treatment.',
  },
  {
    id: 'rheumatoid-arthritis',
    label: 'Rheumatoid arthritis',
    description:
      'Inflammatory joint disease that can affect the hands and wrists with pain, swelling, and morning stiffness. Treatment often requires coordinated medical management alongside rehabilitation and activity planning.',
  },
];

const THORACIC_WALL_MOST_COMMON_SYNDROMES: Syndrome[] = [
  {
    id: 'costochondritis',
    label: 'Costochondritis',
    description:
      'Inflammation of the costal cartilage at the articulation of the ribs and sternum. Usually benign and often presents with insidious chest wall pain, sometimes with tenderness over affected joints. Pain control with anti‑inflammatory strategies may help.',
  },
  {
    id: 'intercostal-strain',
    label: 'Pectoral or intercostal muscles strains',
    description:
      'Strain of chest wall muscles can follow coughing, lifting, or twisting. Management focuses on load guidance, mobility, breathing mechanics, and progressive strengthening.',
  },
  {
    id: 'lower-rib-pain',
    label: 'Lower rib pain syndrome',
    description:
      'Irritation of lower rib attachments can cause focal chest wall pain, sometimes with movement or breathing. Treatment combines reassurance, activity modification, and targeted symptom relief.',
  },
  {
    id: 'sternalis-syndrome',
    label: 'Sternalis syndrome',
    description:
      'A less common source of anterior chest wall pain related to sternal or parasternal tissues. Assessment helps exclude serious causes and guide conservative management.',
  },
  {
    id: 'costovertebral-pain',
    label: 'Pain from thoracic spine/costovertebral joints',
    description:
      'Facet and costovertebral joint irritation can refer pain to the chest wall. Plans often include posture strategies, mobility, strengthening, and selected interventions when appropriate.',
  },
];

const ABDOMINAL_WALL_MOST_COMMON_SYNDROMES: Syndrome[] = [
  {
    id: 'acnes',
    label: 'Anterior cutaneous nerve entrapment syndrome',
    description:
      'This syndrome is a common and frequently missed cause of chronic abdominal pain, characterized by the entrapment of cutaneous branches of intercostal nerves. The pain is usually aggravated by any movement of abdominal muscles and treatment should begin with ultrasound-guided nerve blocks.',
  },
  {
    id: 'thoracic-radiculopathy',
    label: 'Thoracic nerve radiculopathy',
    description:
      'Irritation of a thoracic spinal nerve can refer pain to the chest or abdominal wall. Assessment looks for posture, movement, and nerve-related features to guide rehabilitation and targeted treatment.',
  },
  {
    id: 'lower-rib-pain-syndromes',
    label: 'Lower rib pain syndromes',
    description:
      'Pain arising from lower rib and costal margin structures can mimic abdominal pain. Treatment often includes reassurance, load modification, mobility, and targeted symptom control.',
  },
];

const PELVIC_MOST_COMMON_SYNDROMES: Syndrome[] = [
  {
    id: 'fibromyalgia',
    label: 'Fibromyalgia',
    description:
      'Fibromyalgia is a condition where pain-conducting systems transmit information in an erroneous manner. In approaching this type of pain, it is important to understand that it is a benign condition and, although it is not to be depreciated, the patient should be reassured. Physical exercise, medication and physiotherapy may help reduce the pain.',
  },
  {
    id: 'pelvic-floor-tension',
    label: 'Pelvic floor muscle tension',
    description:
      'Increased pelvic floor muscle tone can contribute to pelvic pain, urinary or bowel symptoms, and pain with sitting or activity. Treatment commonly includes education, pelvic floor–informed rehabilitation, and graded exposure to comfortable movement.',
  },
  {
    id: 'pubic-symphysis-inflammation',
    label: 'Inflammation of the pubic joint (pubic symphysis)',
    description:
      'Irritation around the pubic symphysis can cause pain in the groin or lower abdomen, sometimes worsened with walking, stairs, or rolling in bed. A stepwise plan often includes load management and targeted rehabilitation.',
  },
  {
    id: 'chronic-pelvic-inflammatory-disease',
    label: 'Chronic pelvic inflammatory disease',
    description:
      'Inflammatory conditions affecting pelvic structures can contribute to persistent pain. Care may require coordinated assessment with appropriate specialists alongside symptom control and rehabilitation strategies.',
  },
];

const FACIAL_MOST_COMMON_SYNDROMES: Syndrome[] = [
  {
    id: 'trigeminal-neuralgia',
    label: 'Trigeminal neuralgia',
    description:
      'Classically presents as brief, severe “electric shock” pain in the face, often triggered by touch, chewing, or cold air. Management focuses on confirming the diagnosis and optimising neuropathic pain treatment.',
  },
  {
    id: 'post-herpetic-neuralgia',
    label: 'Post‑herpetic neuralgia',
    description:
      'Persistent burning or sensitive pain that can follow shingles. Treatment aims to reduce nerve pain, improve sleep, and restore confidence with daily activities.',
  },
  {
    id: 'tmj-disorder',
    label: 'Temporomandibular disorder (jaw-related pain)',
    description:
      'Jaw and facial pain linked to muscle tension, clenching, joint irritation, or clicking. Care often includes education, muscle and jaw load strategies, and coordinated dental assessment when needed.',
  },
  {
    id: 'persistent-idiopathic-facial-pain',
    label: 'Persistent idiopathic facial pain',
    description:
      'Ongoing facial pain without a clear structural cause after appropriate evaluation. A multidisciplinary plan can help reduce symptoms and improve function over time.',
  },
];

const FOOT_ANKLE_MOST_COMMON_SYNDROMES: Syndrome[] = [
  {
    id: 'achilles',
    label: 'Achilles Tendonitys / Tendon rupture',
    description:
      'Achilles pain can reflect tendon overload or, less commonly, rupture after a sudden load. Assessment focuses on onset, swelling, strength, and function to guide safe treatment.',
  },
  {
    id: 'avulsion-fracture',
    label: 'Avulsion fracture',
    description:
      'A small bone fragment can be pulled off where a tendon or ligament attaches, often after a twist or impact. Imaging may be needed to confirm and guide management.',
  },
  {
    id: 'gout',
    label: 'Gout',
    description:
      'A sudden, very painful, swollen joint (often the big toe) caused by urate crystal inflammation. Treatment focuses on acute control and prevention when recurrent.',
  },
  {
    id: 'hammertoe',
    label: 'Hammertoe and mallet toe',
    description:
      'Toe deformities that can cause pressure points, corns, and pain in footwear. Treatment may include footwear changes, splinting, orthoses, and specialist review when severe.',
  },
  {
    id: 'mortons-neuroma',
    label: "Morton's neuroma",
    description:
      'Forefoot pain or burning between toes due to nerve irritation, often worse in tight shoes. Care includes footwear strategies, load changes, and targeted interventions when needed.',
  },
  {
    id: 'plantar-fasciitis',
    label: 'Plantar fasciitis',
    description:
      'Heel pain that is often worse with first steps and improves with movement. Management focuses on progressive loading, calf/foot strengthening, and footwear advice.',
  },
  {
    id: 'rheumatoid-arthritis-foot',
    label: 'Rheumatoid arthritis',
    description:
      'Inflammatory joint disease can affect the feet and ankles with pain, swelling, and stiffness. Coordinated medical care and rehabilitation help protect function and comfort.',
  },
  {
    id: 'tarsal-tunnel',
    label: 'Tarsal tunnel syndrome',
    description:
      'Tingling, burning, or shooting pain in the foot due to tibial nerve irritation near the ankle. Treatment may include load modification, footwear changes, and targeted care.',
  },
  {
    id: 'sprained-ankle',
    label: 'Sprained ankle',
    description:
      'Ligament injury after a twist can lead to pain, swelling, and instability. Rehabilitation focuses on strength, balance, and confidence to reduce recurrence.',
  },
  {
    id: 'stress-fractures',
    label: 'Stress fractures',
    description:
      'Overuse bone stress can cause focal pain that worsens with activity. Early recognition, load management, and imaging when indicated help prevent progression.',
  },
];

const ConditionDetailPage: React.FC<ConditionDetailPageProps> = ({
  title,
  areaLabel,
  mainClassName,
  variant = 'default',
  heroSubtitle,
  heroEyebrow,
}) => {
  const location = useLocation();
  const slugBase = React.useMemo(
    () =>
      title
        .toLowerCase()
        .trim()
        .replace(/['’]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, ''),
    [title],
  );
  const syndromes = variant === 'pain-specialty-clone' && PAIN_MEDICINE_PAGE_CONTENT[slugBase]
    ? PAIN_MEDICINE_PAGE_CONTENT[slugBase].patterns
    : DEFAULT_SYNDROMES;
  const accordionSyndromes = React.useMemo(() => {
    if (slugBase === 'knee-pain') return KNEE_MOST_COMMON_SYNDROMES;
    if (slugBase === 'hip-and-groin-pain') return HIP_MOST_COMMON_SYNDROMES;
    if (slugBase === 'head-pain') return HEAD_MOST_COMMON_SYNDROMES;
    if (slugBase === 'cervical-spine-pain') return CERVICAL_MOST_COMMON_SYNDROMES;
    if (slugBase === 'shoulder-pain') return SHOULDER_MOST_COMMON_SYNDROMES;
    if (slugBase === 'hand-and-elbow-pain') return HAND_ELBOW_MOST_COMMON_SYNDROMES;
    if (slugBase === 'thoracic-wall-pain') return THORACIC_WALL_MOST_COMMON_SYNDROMES;
    if (slugBase === 'abdominal-wall-pain') return ABDOMINAL_WALL_MOST_COMMON_SYNDROMES;
    if (slugBase === 'pelvic-and-gynaecological-pain') return PELVIC_MOST_COMMON_SYNDROMES;
    if (slugBase === 'facial-pain') return FACIAL_MOST_COMMON_SYNDROMES;
    if (slugBase === 'foot-and-ankle-pain') return FOOT_ANKLE_MOST_COMMON_SYNDROMES;
    return syndromes;
  }, [slugBase, syndromes]);
  const initialActiveSyndromeId = React.useMemo(() => {
    if (slugBase === 'head-pain' || slugBase === 'shoulder-pain') return null;
    return accordionSyndromes[0]?.id ?? null;
  }, [accordionSyndromes, slugBase]);
  const [activeSyndromeId, setActiveSyndromeId] = React.useState<string | null>(() => initialActiveSyndromeId);
  React.useEffect(() => {
    setActiveSyndromeId(initialActiveSyndromeId);
  }, [initialActiveSyndromeId]);
  const treatmentsSectionId = `${slugBase}-treatments`;
  const contactIdPrefix = `${slugBase}-contact`;

  const canonicalUrl = React.useMemo(() => {
    if (typeof window === 'undefined') return '';
    const origin = window.location.origin || 'https://www.algarvepaincentre.com';
    return `${origin}${location.pathname}`;
  }, [location.pathname]);

  const structuredDataJson = React.useMemo(() => {
    const organization = {
      '@type': 'MedicalOrganization',
      name: 'Algarve Pain Centre',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Av. do Mar',
        addressLocality: 'Vale do Lobo',
        addressRegion: 'Algarve',
        addressCountry: 'PT',
      },
    };

    const pageId = canonicalUrl ? `${canonicalUrl}#webpage` : 'https://www.algarvepaincentre.com/#webpage';
    const conditionId = canonicalUrl ? `${canonicalUrl}#condition` : 'https://www.algarvepaincentre.com/#condition';

    return JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'MedicalWebPage',
          '@id': pageId,
          url: canonicalUrl || 'https://www.algarvepaincentre.com/',
          name: title,
          description: `Specialist assessment and treatment for ${areaLabel} at Algarve Pain Centre in Vale do Lobo, Algarve, Portugal.`,
          about: { '@id': conditionId },
          isPartOf: {
            '@type': 'WebSite',
            name: 'Algarve Pain Centre',
            url: 'https://www.algarvepaincentre.com/',
          },
          publisher: organization,
        },
        {
          '@type': 'MedicalCondition',
          '@id': conditionId,
          name: title,
          description: `Specialist assessment and treatment for ${areaLabel} at Algarve Pain Centre in Vale do Lobo, Algarve, Portugal.`,
          url: canonicalUrl || 'https://www.algarvepaincentre.com/',
          study: {
            '@type': 'MedicalStudy',
            name: 'Comprehensive pain management programme',
          },
          guideline: {
            '@type': 'MedicalGuideline',
            evidenceLevel: 'Evidence-based clinical practice',
          },
          recognizingAuthority: organization,
        },
        {
          '@type': 'MedicalTherapy',
          name: 'Image-guided interventions',
          description:
            'Minimally invasive, image-guided procedures such as nerve blocks, radiofrequency ablation and joint or spine injections when clinically appropriate.',
          offeredBy: organization,
        },
        {
          '@type': 'MedicalTherapy',
          name: 'Rehabilitation and physiotherapy',
          description:
            'Structured rehabilitation programmes including physiotherapy, guided exercise and functional training to restore confidence in movement and daily activities.',
          offeredBy: organization,
        },
        {
          '@type': 'MedicalTherapy',
          name: 'Medication optimisation',
          description:
            'Stepwise, time-limited medication plans where needed, balancing symptom relief with safety and long-term goals.',
          offeredBy: organization,
        },
      ],
    });
  }, [areaLabel, canonicalUrl, title]);

  React.useEffect(() => {
    const pageTitle = `${title} | Algarve Pain Centre`;
    document.title = pageTitle;

    const description = `Specialist assessment and treatment for ${areaLabel} at Algarve Pain Centre, a multidisciplinary pain clinic in Vale do Lobo, Algarve, Portugal. Discover how our team combines minimally invasive procedures, rehabilitation and medication to relieve pain, restore movement and improve your quality of life.`;

    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = description;
  }, [title, areaLabel]);

  if (variant === 'pain-specialty-clone') {
    const defaultHeroImage = '/assets/images/Hero/HomeCare.webp';
    const defaultOverview = [
      'Pain in this area can have many causes, including joint, muscle, nerve and postural factors. During your first consultation we explore how your symptoms started, how they have evolved over time and which movements or activities make them better or worse.',
      'We also look carefully at your medical history, lifestyle and previous treatments. Some people come to us after years of trying isolated approaches without a clear plan. Others seek support early, when symptoms are starting to interfere with work, sport or sleep.',
      'Common goals include reducing flare‑ups, improving confidence in movement and protecting long‑term joint and spine health. Many people benefit from a combination of these elements over time.',
    ];
    const pageContent = PAIN_MEDICINE_PAGE_CONTENT[slugBase];
    const heroImage = pageContent?.heroImage ?? defaultHeroImage;
    const overviewParagraphs = pageContent?.overview ?? defaultOverview;

    return (
      <div className="psx-page" id={`psx-${slugBase}`}>
        <header className="psx-hero">
          <div
            className="psx-hero-backdrop"
            aria-hidden="true"
            style={{ backgroundImage: `url('${heroImage}')` }}
          />
          <div className="psx-hero-inner">
            <p className="psx-hero-eyebrow">{heroEyebrow ?? 'Speciality'}</p>
            <h1 className="psx-hero-title">{title}</h1>
            <p className="psx-hero-subtitle">
              {heroSubtitle ??
                `Specialist assessment and treatment pathways for ${areaLabel}—personalised care that helps you find relief and return to daily life with confidence.`}
            </p>
            <div className="psx-hero-actions">
              <Link to="/contact" className="psx-btn-primary" aria-label={`Book an appointment for ${areaLabel}`}>
                <span>Book an appointment</span>
              </Link>
              <a
                href={`#${treatmentsSectionId}`}
                className="psx-btn-outline"
                aria-label={`Explore treatments for ${areaLabel}`}
              >
                Explore treatments
              </a>
            </div>

          </div>
        </header>
        <main className={mainClassName ? `psx-main ${mainClassName}` : 'psx-main'}>
          <ArticleBreadcrumb
            items={[
              { label: 'Home', to: '/' },
              { label: 'Specialities', to: '/specialities' },
              { label: title, isCurrent: true },
            ]}
          />
          <section id={treatmentsSectionId} className="psx-section psx-treatments">
            <div className="psx-lead">
              <h2 className="psx-lead-title">Treatments for {areaLabel}</h2>
              <p className="psx-lead-subtitle">
                At Algarve Pain Centre in Vale do Lobo, Algarve, we offer a comprehensive range of
                evidence-based treatments for {areaLabel}. Our multidisciplinary team of pain medicine
                physicians, spine surgeons, rehabilitation specialists and psychologists works together
                so that your plan is built from multiple expert perspectives, not just one.
              </p>
              <p className="psx-lead-subtitle">
                Whether your pain is recent or long‑standing, we focus on understanding how it affects
                your daily life and long‑term goals. This helps us decide when simple measures are
                enough and when more advanced interventions are needed.
              </p>
            </div>
            <div className="psx-treatments-layout">
              <article className="psx-card">
                <h3 className="psx-card-title">{title} overview</h3>
                <div className="psx-accent" />
                {overviewParagraphs.map((paragraph, idx) => (
                  <p key={`${slugBase}-overview-${idx}`} className="psx-body">
                    {paragraph}
                  </p>
                ))}
                <Link to="/contact" className="psx-btn-primary" aria-label={`Book an appointment for ${areaLabel}`}>
                  <span>Book an appointment</span>
                </Link>
              </article>
              <div className="psx-media" aria-hidden="true">
                <div className="psx-media-inner">
                  <video
                    className="psx-video"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    poster={heroImage}
                  >
                    <source src="/assets/videos/post-43.av1.mp4" type='video/mp4; codecs="av01.0.05M.08"' />
                    <source src="/assets/videos/post-43.h264.mp4" type='video/mp4; codecs="avc1.42E01E"' />
                    <source src="/assets/videos/post-43.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </div>
            {slugBase === 'foot-and-ankle-pain' && (
              <div className="psx-syndromes-accordion" aria-labelledby="foot-ankle-syndromes-title">
                <header className="psx-syndromes-accordion-header">
                  <h2 id="foot-ankle-syndromes-title" className="psx-syndromes-accordion-title">
                    Most Common Syndromes
                  </h2>
                  <p className="psx-syndromes-accordion-subtitle">
                    Foot and ankle pain can come from very different structures and have several etiologies, some of the most common are described here.
                  </p>
                </header>
                <div className="psx-syndromes-accordion-card">
                  <div className="psx-accordion" role="list" aria-label="Most common foot and ankle pain syndromes">
                    {accordionSyndromes.map((syndrome) => {
                      const isActive = activeSyndromeId === syndrome.id;
                      const rowId = `psx-foot-ankle-syndrome-${syndrome.id}`;
                      const panelId = `psx-foot-ankle-syndrome-panel-${syndrome.id}`;
                      return (
                        <div key={syndrome.id} className="psx-accordion-item" role="listitem">
                          <button
                            id={rowId}
                            type="button"
                            className="psx-accordion-trigger"
                            aria-expanded={isActive}
                            aria-controls={panelId}
                            onClick={() =>
                              setActiveSyndromeId((current) => (current === syndrome.id ? null : syndrome.id))
                            }
                          >
                            <span className="psx-accordion-label">{syndrome.label}</span>
                            <span className="psx-accordion-icon" aria-hidden="true">
                              {isActive ? '−' : '+'}
                            </span>
                          </button>
                          <div
                            id={panelId}
                            className="psx-accordion-panel"
                            data-open={isActive ? 'true' : 'false'}
                            role="region"
                            aria-labelledby={rowId}
                            aria-hidden={!isActive}
                          >
                            <p className="psx-accordion-text">{syndrome.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
            {slugBase === 'foot-and-ankle-pain' && (
              <section className="psx-approaches psx-approaches--foot-ankle" aria-labelledby="foot-ankle-approaches-title">
                <header className="psx-approaches-header">
                  <h2 id="foot-ankle-approaches-title" className="psx-approaches-title">
                    Treatment Approaches
                  </h2>
                </header>
                <div className="psx-approaches-grid" role="list" aria-label="Foot and ankle pain treatment approaches">
                  <article className="psx-approach-card" role="listitem">
                    <div className="psx-approach-illustration" aria-hidden="true">
                      <img
                        className="psx-approach-icon"
                        src="/assets/images/lumbar/Corticosteroid.webp"
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="psx-approach-body">
                      <h3 className="psx-approach-title">Corticosteroids Injection</h3>
                      <div className="psx-approach-divider" aria-hidden="true" />
                      <p className="psx-approach-text">
                        Targeted anti-inflammatory injection to reduce pain and support movement while rehabilitation progresses.
                      </p>
                      <Link
                        to="/treatments/minimally-invasive-treatments/intra-articular-corticosteroids-injection"
                        className="psx-approach-link"
                        aria-label="Learn more about corticosteroids injection"
                      >
                        <span>Learn more</span>
                        <span className="psx-approach-link-icon" aria-hidden="true">›</span>
                      </Link>
                    </div>
                  </article>

                  <article className="psx-approach-card" role="listitem">
                    <div className="psx-approach-illustration" aria-hidden="true">
                      <img
                        className="psx-approach-icon"
                        src="/assets/images/lumbar/PeripheralNerveBlocks.webp"
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="psx-approach-body">
                      <h3 className="psx-approach-title">Peripheric Nerve Block</h3>
                      <div className="psx-approach-divider" aria-hidden="true" />
                      <p className="psx-approach-text">
                        Local anaesthetic near nerves for diagnostic clarity or therapeutic relief when symptoms suggest nerve-related pain.
                      </p>
                      <Link
                        to="/treatments/minimally-invasive-treatments/peripheral-nerve-block"
                        className="psx-approach-link"
                        aria-label="Learn more about peripheric nerve block"
                      >
                        <span>Learn more</span>
                        <span className="psx-approach-link-icon" aria-hidden="true">›</span>
                      </Link>
                    </div>
                  </article>

                  <article className="psx-approach-card" role="listitem">
                    <div className="psx-approach-illustration" aria-hidden="true">
                      <img
                        className="psx-approach-icon"
                        src="/assets/images/lumbar/Crioblation.webp"
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="psx-approach-body">
                      <h3 className="psx-approach-title">Crioablation</h3>
                      <div className="psx-approach-divider" aria-hidden="true" />
                      <p className="psx-approach-text">
                        Cold-based nerve modulation to interrupt pain signalling, guided by ultrasound or fluoroscopy when appropriate.
                      </p>
                      <Link
                        to="/treatments/minimally-invasive-treatments/cryoblation"
                        className="psx-approach-link"
                        aria-label="Learn more about crioablation"
                      >
                        <span>Learn more</span>
                        <span className="psx-approach-link-icon" aria-hidden="true">›</span>
                      </Link>
                    </div>
                  </article>

                  <article className="psx-approach-card" role="listitem">
                    <div className="psx-approach-illustration" aria-hidden="true">
                      <img
                        className="psx-approach-icon"
                        src="/assets/images/lumbar/Pharmacological.webp"
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="psx-approach-body">
                      <h3 className="psx-approach-title">Pharmacological Management</h3>
                      <div className="psx-approach-divider" aria-hidden="true" />
                      <p className="psx-approach-text">
                        Pharmacological management pain is commonly part of the treatment and a wide range of drugs can be used to manage pain.
                      </p>
                      <Link
                        to="/treatments/non-invasive-treatments/pharmacological-pain-management"
                        className="psx-approach-link"
                        aria-label="Learn more about pharmacological management"
                      >
                        <span>Learn more</span>
                        <span className="psx-approach-link-icon" aria-hidden="true">›</span>
                      </Link>
                    </div>
                  </article>

                  <article className="psx-approach-card" role="listitem">
                    <div className="psx-approach-illustration" aria-hidden="true">
                      <img
                        className="psx-approach-icon"
                        src="/assets/images/lumbar/PlateletRichPlasma.webp"
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="psx-approach-body">
                      <h3 className="psx-approach-title">Plasma Injection</h3>
                      <div className="psx-approach-divider" aria-hidden="true" />
                      <p className="psx-approach-text">
                        PRP (platelet rich plasma) contains 2-5 times the usual number of platelets and have a regenerative effect on the tissues.
                      </p>
                      <Link
                        to="/treatments/minimally-invasive-treatments/platelets-rich-plasma-injection"
                        className="psx-approach-link"
                        aria-label="Learn more about plasma injection"
                      >
                        <span>Learn more</span>
                        <span className="psx-approach-link-icon" aria-hidden="true">›</span>
                      </Link>
                    </div>
                  </article>

                  <article className="psx-approach-card" role="listitem">
                    <div className="psx-approach-illustration" aria-hidden="true">
                      <img
                        className="psx-approach-icon"
                        src="/assets/images/lumbar/Radiofrequency.webp"
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="psx-approach-body">
                      <h3 className="psx-approach-title">Radiofrequency</h3>
                      <div className="psx-approach-divider" aria-hidden="true" />
                      <p className="psx-approach-text">
                        Radiofrequency ablation is a minimally invasive procedure guided for ultrasound or fluoroscopy.
                      </p>
                      <Link
                        to="/treatments/minimally-invasive-treatments/radiofrequency"
                        className="psx-approach-link"
                        aria-label="Learn more about radiofrequency"
                      >
                        <span>Learn more</span>
                        <span className="psx-approach-link-icon" aria-hidden="true">›</span>
                      </Link>
                    </div>
                  </article>
                </div>
              </section>
            )}
            {slugBase === 'facial-pain' && (
              <div className="psx-syndromes-accordion" aria-labelledby="facial-syndromes-title">
                <header className="psx-syndromes-accordion-header">
                  <h2 id="facial-syndromes-title" className="psx-syndromes-accordion-title">
                    Most Common Syndromes
                  </h2>
                  <p className="psx-syndromes-accordion-subtitle">
                    After excluding dental and sinus causes, neuropathic facial pain syndromes should be kept in mind.
                  </p>
                </header>
                <div className="psx-syndromes-accordion-card">
                  <div className="psx-accordion" role="list" aria-label="Most common facial pain syndromes">
                    {accordionSyndromes.map((syndrome) => {
                      const isActive = activeSyndromeId === syndrome.id;
                      const rowId = `psx-facial-syndrome-${syndrome.id}`;
                      const panelId = `psx-facial-syndrome-panel-${syndrome.id}`;
                      return (
                        <div key={syndrome.id} className="psx-accordion-item" role="listitem">
                          <button
                            id={rowId}
                            type="button"
                            className="psx-accordion-trigger"
                            aria-expanded={isActive}
                            aria-controls={panelId}
                            onClick={() =>
                              setActiveSyndromeId((current) => (current === syndrome.id ? null : syndrome.id))
                            }
                          >
                            <span className="psx-accordion-label">{syndrome.label}</span>
                            <span className="psx-accordion-icon" aria-hidden="true">
                              {isActive ? '−' : '+'}
                            </span>
                          </button>
                          <div
                            id={panelId}
                            className="psx-accordion-panel"
                            data-open={isActive ? 'true' : 'false'}
                            role="region"
                            aria-labelledby={rowId}
                            aria-hidden={!isActive}
                          >
                            <p className="psx-accordion-text">{syndrome.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
            {slugBase === 'facial-pain' && (
              <section className="psx-approaches psx-approaches--facial" aria-labelledby="facial-approaches-title">
                <header className="psx-approaches-header">
                  <h2 id="facial-approaches-title" className="psx-approaches-title">
                    Treatment Approaches
                  </h2>
                </header>
                <div className="psx-approaches-grid" role="list" aria-label="Facial pain treatment approaches">
                  <article className="psx-approach-card" role="listitem">
                    <div className="psx-approach-illustration" aria-hidden="true">
                      <img
                        className="psx-approach-icon"
                        src="/assets/images/lumbar/Corticosteroid.webp"
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="psx-approach-body">
                      <h3 className="psx-approach-title">Corticosteroids Injection</h3>
                      <div className="psx-approach-divider" aria-hidden="true" />
                      <p className="psx-approach-text">
                        Corticosteroids medications are used to reduce pain and inflammation and can be taken oral or through an injection.
                      </p>
                      <Link
                        to="/treatments/minimally-invasive-treatments/intra-articular-corticosteroids-injection"
                        className="psx-approach-link"
                        aria-label="Learn more about corticosteroids injection"
                      >
                        <span>Learn more</span>
                        <span className="psx-approach-link-icon" aria-hidden="true">
                          ›
                        </span>
                      </Link>
                    </div>
                  </article>

                  <article className="psx-approach-card" role="listitem">
                    <div className="psx-approach-illustration" aria-hidden="true">
                      <img
                        className="psx-approach-icon"
                        src="/assets/images/lumbar/Pharmacological.webp"
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="psx-approach-body">
                      <h3 className="psx-approach-title">Pharmacological Management</h3>
                      <div className="psx-approach-divider" aria-hidden="true" />
                      <p className="psx-approach-text">
                        Pharmacological management pain is commonly part of the treatment and a wide range of drugs can be used to manage
                        pain.
                      </p>
                      <Link
                        to="/treatments/non-invasive-treatments/pharmacological-pain-management"
                        className="psx-approach-link"
                        aria-label="Learn more about pharmacological management"
                      >
                        <span>Learn more</span>
                        <span className="psx-approach-link-icon" aria-hidden="true">
                          ›
                        </span>
                      </Link>
                    </div>
                  </article>
                </div>
              </section>
            )}
            {slugBase === 'facial-pain' && (
              <div className="psx-facial-note" aria-label="Facial pain information">
                <div className="psx-facial-note-inner">
                  <h3 className="psx-facial-note-title">Complex Facial Pain</h3>
                  <p className="psx-facial-note-text">
                    Facial pain can be caused by numerous factors: nerve damage (for example after dental procedures), various pathologies
                    (including TMJ disorders) or be derived from a previous surgery. Other times the origin can be myofascial, in the jaw and
                    facial muscles. It is often a complex phenomenon, as it tends to involve problems related to sleep, stress and quality of
                    life. This circumstance makes the treatment of facial pain very challenging.
                  </p>
                </div>
              </div>
            )}
            {slugBase === 'pelvic-and-gynaecological-pain' && (
              <div className="psx-syndromes-accordion" aria-labelledby="pelvic-syndromes-title">
                <header className="psx-syndromes-accordion-header">
                  <h2 id="pelvic-syndromes-title" className="psx-syndromes-accordion-title">
                    Most Common Syndromes
                  </h2>
                  <p className="psx-syndromes-accordion-subtitle">
                    In the presence of pelvic pain, having been excluded visceral origin for the pain, other causes should be kept in mind.
                  </p>
                </header>
                <div className="psx-syndromes-accordion-card">
                  <div className="psx-accordion" role="list" aria-label="Most common pelvic and gynaecological pain syndromes">
                    {accordionSyndromes.map((syndrome) => {
                      const isActive = activeSyndromeId === syndrome.id;
                      const rowId = `psx-pelvic-syndrome-${syndrome.id}`;
                      const panelId = `psx-pelvic-syndrome-panel-${syndrome.id}`;
                      return (
                        <div key={syndrome.id} className="psx-accordion-item" role="listitem">
                          <button
                            id={rowId}
                            type="button"
                            className="psx-accordion-trigger"
                            aria-expanded={isActive}
                            aria-controls={panelId}
                            onClick={() =>
                              setActiveSyndromeId((current) => (current === syndrome.id ? null : syndrome.id))
                            }
                          >
                            <span className="psx-accordion-label">{syndrome.label}</span>
                            <span className="psx-accordion-icon" aria-hidden="true">
                              {isActive ? '−' : '+'}
                            </span>
                          </button>
                          <div
                            id={panelId}
                            className="psx-accordion-panel"
                            data-open={isActive ? 'true' : 'false'}
                            role="region"
                            aria-labelledby={rowId}
                            aria-hidden={!isActive}
                          >
                            <p className="psx-accordion-text">{syndrome.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
            {slugBase === 'pelvic-and-gynaecological-pain' && (
              <section className="psx-approaches psx-approaches--pelvic" aria-labelledby="pelvic-approaches-title">
                <header className="psx-approaches-header">
                  <h2 id="pelvic-approaches-title" className="psx-approaches-title">
                    Treatment Approaches
                  </h2>
                </header>
                <div className="psx-approaches-grid" role="list" aria-label="Pelvic and gynaecological pain treatment approaches">
                  <article className="psx-approach-card" role="listitem">
                    <div className="psx-approach-illustration" aria-hidden="true">
                      <img
                        className="psx-approach-icon"
                        src="/assets/images/lumbar/Corticosteroid.webp"
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="psx-approach-body">
                      <h3 className="psx-approach-title">Corticosteroids Injection</h3>
                      <div className="psx-approach-divider" aria-hidden="true" />
                      <p className="psx-approach-text">
                        Corticosteroids medications are used to reduce pain and inflammation and can be taken oral or through an injection.
                      </p>
                      <Link
                        to="/treatments/minimally-invasive-treatments/intra-articular-corticosteroids-injection"
                        className="psx-approach-link"
                        aria-label="Learn more about corticosteroids injection"
                      >
                        <span>Learn more</span>
                        <span className="psx-approach-link-icon" aria-hidden="true">
                          ›
                        </span>
                      </Link>
                    </div>
                  </article>

                  <article className="psx-approach-card" role="listitem">
                    <div className="psx-approach-illustration" aria-hidden="true">
                      <img
                        className="psx-approach-icon"
                        src="/assets/images/lumbar/Pharmacological.webp"
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="psx-approach-body">
                      <h3 className="psx-approach-title">Pharmacological Management</h3>
                      <div className="psx-approach-divider" aria-hidden="true" />
                      <p className="psx-approach-text">
                        Pharmacological management pain is commonly part of the treatment and a wide range of drugs can be used to manage
                        pain.
                      </p>
                      <Link
                        to="/treatments/non-invasive-treatments/pharmacological-pain-management"
                        className="psx-approach-link"
                        aria-label="Learn more about pharmacological management"
                      >
                        <span>Learn more</span>
                        <span className="psx-approach-link-icon" aria-hidden="true">
                          ›
                        </span>
                      </Link>
                    </div>
                  </article>
                </div>
              </section>
            )}
            {slugBase === 'pelvic-and-gynaecological-pain' && (
              <div className="psx-pelvic-note" aria-label="Pelvic pain information">
                <div className="psx-pelvic-note-inner">
                  <h3 className="psx-pelvic-note-title">Chronic Pelvic Pain</h3>
                  <p className="psx-pelvic-note-text">
                    This clinical scenario can be caused by numerous factors: the result of nerve damage, such as pudendal, caused by cycling,
                    various pathologies (such as endometriosis) or derived from a previous surgery. Other times the origin can be myofascial,
                    in the pelvic floor area. It is often a complex phenomenon, as it tends up involving problems related to sedestation,
                    defecation, sexuality... This circumstance makes the treatment of pelvic pain very challenging.
                  </p>
                </div>
              </div>
            )}
            {slugBase === 'abdominal-wall-pain' && (
              <div className="psx-syndromes-accordion" aria-labelledby="abdominal-syndromes-title">
                <header className="psx-syndromes-accordion-header">
                  <h2 id="abdominal-syndromes-title" className="psx-syndromes-accordion-title">
                    Most Common Syndromes
                  </h2>
                  <p className="psx-syndromes-accordion-subtitle">
                    There are a few overlooked yet common causes for abdominal wall pain, which should be sought in the presence of chronic
                    abdominal pain.
                  </p>
                </header>
                <div className="psx-syndromes-accordion-card">
                  <div className="psx-accordion" role="list" aria-label="Most common abdominal wall pain syndromes">
                    {accordionSyndromes.map((syndrome) => {
                      const isActive = activeSyndromeId === syndrome.id;
                      const rowId = `psx-abdominal-syndrome-${syndrome.id}`;
                      const panelId = `psx-abdominal-syndrome-panel-${syndrome.id}`;
                      return (
                        <div key={syndrome.id} className="psx-accordion-item" role="listitem">
                          <button
                            id={rowId}
                            type="button"
                            className="psx-accordion-trigger"
                            aria-expanded={isActive}
                            aria-controls={panelId}
                            onClick={() =>
                              setActiveSyndromeId((current) => (current === syndrome.id ? null : syndrome.id))
                            }
                          >
                            <span className="psx-accordion-label">{syndrome.label}</span>
                            <span className="psx-accordion-icon" aria-hidden="true">
                              {isActive ? '−' : '+'}
                            </span>
                          </button>
                          <div
                            id={panelId}
                            className="psx-accordion-panel"
                            data-open={isActive ? 'true' : 'false'}
                            role="region"
                            aria-labelledby={rowId}
                            aria-hidden={!isActive}
                          >
                            <p className="psx-accordion-text">{syndrome.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
            {slugBase === 'abdominal-wall-pain' && (
              <section className="psx-approaches psx-approaches--abdominal" aria-labelledby="abdominal-approaches-title">
                <header className="psx-approaches-header">
                  <h2 id="abdominal-approaches-title" className="psx-approaches-title">
                    Treatment Approaches
                  </h2>
                </header>
                <div className="psx-approaches-grid" role="list" aria-label="Abdominal wall pain treatment approaches">
                  <article className="psx-approach-card" role="listitem">
                    <div className="psx-approach-illustration" aria-hidden="true">
                      <img
                        className="psx-approach-icon"
                        src="/assets/images/lumbar/PeripheralNerveBlocks.webp"
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="psx-approach-body">
                      <h3 className="psx-approach-title">Peripheric Nerve Block</h3>
                      <div className="psx-approach-divider" aria-hidden="true" />
                      <p className="psx-approach-text">
                        This minimally invasive procedure, as radiofrequency ablation and cryoablation, should be guided for ultrasound or
                        fluoroscopy.
                      </p>
                      <Link
                        to="/treatments/minimally-invasive-treatments/peripheral-nerve-block"
                        className="psx-approach-link"
                        aria-label="Learn more about peripheric nerve block"
                      >
                        <span>Learn more</span>
                        <span className="psx-approach-link-icon" aria-hidden="true">
                          ›
                        </span>
                      </Link>
                    </div>
                  </article>

                  <article className="psx-approach-card" role="listitem">
                    <div className="psx-approach-illustration" aria-hidden="true">
                      <img
                        className="psx-approach-icon"
                        src="/assets/images/lumbar/Pharmacological.webp"
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="psx-approach-body">
                      <h3 className="psx-approach-title">Pharmacological Management</h3>
                      <div className="psx-approach-divider" aria-hidden="true" />
                      <p className="psx-approach-text">
                        Pharmacological management pain is commonly part of the treatment and a wide range of drugs can be used to manage
                        pain.
                      </p>
                      <Link
                        to="/treatments/non-invasive-treatments/pharmacological-pain-management"
                        className="psx-approach-link"
                        aria-label="Learn more about pharmacological management"
                      >
                        <span>Learn more</span>
                        <span className="psx-approach-link-icon" aria-hidden="true">
                          ›
                        </span>
                      </Link>
                    </div>
                  </article>
                </div>
              </section>
            )}
            {slugBase === 'abdominal-wall-pain' && (
              <div className="psx-abdominal-note" aria-label="Abdominal wall pain information">
                <div className="psx-abdominal-note-inner">
                  <h3 className="psx-abdominal-note-title">Chronic Abdominal Wall Pain</h3>
                  <p className="psx-abdominal-note-text">
                    There are several reasons that can result in severe pain in the chronic abdominal wall: post‑surgical pain,
                    peripheral nerve entrapment, muscle problems. Other than oral medication, there are other weapons to control this pain:
                    ultrasound‑guided percutaneous techniques. TAP block (Transversus Abdominal Plane), Thermal Radiofrequency or
                    Crioablation of peripherical nerves, are just a few examples in our clinical practice.
                  </p>
                </div>
              </div>
            )}
            {slugBase === 'thoracic-wall-pain' && (
              <section className="psx-approaches psx-approaches--thoracic" aria-labelledby="thoracic-approaches-title">
                <header className="psx-approaches-header">
                  <h2 id="thoracic-approaches-title" className="psx-approaches-title">
                    Treatment Approaches
                  </h2>
                </header>
                <div className="psx-approaches-grid" role="list" aria-label="Thoracic wall pain treatment approaches">
                  <article className="psx-approach-card" role="listitem">
                    <div className="psx-approach-illustration" aria-hidden="true">
                      <img
                        className="psx-approach-icon"
                        src="/assets/images/lumbar/PeripheralNerveBlocks.webp"
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="psx-approach-body">
                      <h3 className="psx-approach-title">Peripheric Nerve Block</h3>
                      <div className="psx-approach-divider" aria-hidden="true" />
                      <p className="psx-approach-text">
                        This minimally invasive procedure, as radiofrequency ablation and cryoablation, should be guided for ultrasound or
                        fluoroscopy.
                      </p>
                      <Link
                        to="/treatments/minimally-invasive-treatments/peripheral-nerve-block"
                        className="psx-approach-link"
                        aria-label="Learn more about peripheric nerve block"
                      >
                        <span>Learn more</span>
                        <span className="psx-approach-link-icon" aria-hidden="true">
                          ›
                        </span>
                      </Link>
                    </div>
                  </article>

                  <article className="psx-approach-card" role="listitem">
                    <div className="psx-approach-illustration" aria-hidden="true">
                      <img
                        className="psx-approach-icon"
                        src="/assets/images/lumbar/Pharmacological.webp"
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="psx-approach-body">
                      <h3 className="psx-approach-title">Pharmacological Management</h3>
                      <div className="psx-approach-divider" aria-hidden="true" />
                      <p className="psx-approach-text">
                        Pharmacological management pain is commonly part of the treatment and a wide range of drugs can be used to manage
                        pain.
                      </p>
                      <Link
                        to="/treatments/non-invasive-treatments/pharmacological-pain-management"
                        className="psx-approach-link"
                        aria-label="Learn more about pharmacological management"
                      >
                        <span>Learn more</span>
                        <span className="psx-approach-link-icon" aria-hidden="true">
                          ›
                        </span>
                      </Link>
                    </div>
                  </article>
                </div>
              </section>
            )}
            {slugBase === 'thoracic-wall-pain' && (
              <div className="psx-syndromes-accordion" aria-labelledby="thoracic-syndromes-title">
                <header className="psx-syndromes-accordion-header">
                  <h2 id="thoracic-syndromes-title" className="psx-syndromes-accordion-title">
                    Most Common Syndromes
                  </h2>
                  <p className="psx-syndromes-accordion-subtitle">
                    Post‑herpetic pain among post‑surgical syndromes are two of the main causes for Thoracic Pain.
                  </p>
                </header>
                <div className="psx-syndromes-accordion-card">
                  <div className="psx-accordion" role="list" aria-label="Most common thoracic wall pain syndromes">
                    {accordionSyndromes.map((syndrome) => {
                      const isActive = activeSyndromeId === syndrome.id;
                      const rowId = `psx-thoracic-syndrome-${syndrome.id}`;
                      const panelId = `psx-thoracic-syndrome-panel-${syndrome.id}`;
                      return (
                        <div key={syndrome.id} className="psx-accordion-item" role="listitem">
                          <button
                            id={rowId}
                            type="button"
                            className="psx-accordion-trigger"
                            aria-expanded={isActive}
                            aria-controls={panelId}
                            onClick={() =>
                              setActiveSyndromeId((current) => (current === syndrome.id ? null : syndrome.id))
                            }
                          >
                            <span className="psx-accordion-label">{syndrome.label}</span>
                            <span className="psx-accordion-icon" aria-hidden="true">
                              {isActive ? '−' : '+'}
                            </span>
                          </button>
                          <div
                            id={panelId}
                            className="psx-accordion-panel"
                            data-open={isActive ? 'true' : 'false'}
                            role="region"
                            aria-labelledby={rowId}
                            aria-hidden={!isActive}
                          >
                            <p className="psx-accordion-text">{syndrome.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
            {slugBase === 'hand-and-elbow-pain' && (
              <div className="psx-syndromes-accordion" aria-labelledby="hand-elbow-syndromes-title">
                <header className="psx-syndromes-accordion-header">
                  <h2 id="hand-elbow-syndromes-title" className="psx-syndromes-accordion-title">
                    Most Common Syndromes
                  </h2>
                </header>
                <div className="psx-syndromes-accordion-card">
                  <div className="psx-accordion" role="list" aria-label="Most common hand and elbow pain syndromes">
                    {accordionSyndromes.map((syndrome) => {
                      const isActive = activeSyndromeId === syndrome.id;
                      const rowId = `psx-hand-elbow-syndrome-${syndrome.id}`;
                      const panelId = `psx-hand-elbow-syndrome-panel-${syndrome.id}`;
                      return (
                        <div key={syndrome.id} className="psx-accordion-item" role="listitem">
                          <button
                            id={rowId}
                            type="button"
                            className="psx-accordion-trigger"
                            aria-expanded={isActive}
                            aria-controls={panelId}
                            onClick={() =>
                              setActiveSyndromeId((current) => (current === syndrome.id ? null : syndrome.id))
                            }
                          >
                            <span className="psx-accordion-label">{syndrome.label}</span>
                            <span className="psx-accordion-icon" aria-hidden="true">
                              {isActive ? '−' : '+'}
                            </span>
                          </button>
                          <div
                            id={panelId}
                            className="psx-accordion-panel"
                            data-open={isActive ? 'true' : 'false'}
                            role="region"
                            aria-labelledby={rowId}
                            aria-hidden={!isActive}
                          >
                            <p className="psx-accordion-text">{syndrome.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
            {slugBase === 'hand-and-elbow-pain' && (
              <section className="psx-approaches psx-approaches--hand-elbow" aria-labelledby="hand-elbow-approaches-title">
                <header className="psx-approaches-header">
                  <h2 id="hand-elbow-approaches-title" className="psx-approaches-title">
                    Treatment Approaches
                  </h2>
                </header>
                <div className="psx-approaches-grid" role="list" aria-label="Hand and elbow pain treatment approaches">
                  <article className="psx-approach-card" role="listitem">
                    <div className="psx-approach-illustration" aria-hidden="true">
                      <img
                        className="psx-approach-icon"
                        src="/assets/images/lumbar/Radiofrequency.webp"
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="psx-approach-body">
                      <h3 className="psx-approach-title">Radiofrequency</h3>
                      <div className="psx-approach-divider" aria-hidden="true" />
                      <p className="psx-approach-text">Radiofrequency ablation is a minimally invasive procedure guided for ultrasound or fluoroscopy.</p>
                      <Link
                        to="/treatments/minimally-invasive-treatments/radiofrequency"
                        className="psx-approach-link"
                        aria-label="Learn more about radiofrequency"
                      >
                        <span>Learn more</span>
                        <span className="psx-approach-link-icon" aria-hidden="true">
                          ›
                        </span>
                      </Link>
                    </div>
                  </article>

                  <article className="psx-approach-card" role="listitem">
                    <div className="psx-approach-illustration" aria-hidden="true">
                      <img
                        className="psx-approach-icon"
                        src="/assets/images/lumbar/PlateletRichPlasma.webp"
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="psx-approach-body">
                      <h3 className="psx-approach-title">Plasma Injection</h3>
                      <div className="psx-approach-divider" aria-hidden="true" />
                      <p className="psx-approach-text">
                        PRP (platelet rich plasma) contains 2-5 times the usual number of platelets and have a regenerative effect on the tissues.
                      </p>
                      <Link
                        to="/treatments/minimally-invasive-treatments/platelets-rich-plasma-injection"
                        className="psx-approach-link"
                        aria-label="Learn more about plasma injection"
                      >
                        <span>Learn more</span>
                        <span className="psx-approach-link-icon" aria-hidden="true">
                          ›
                        </span>
                      </Link>
                    </div>
                  </article>

                  <article className="psx-approach-card" role="listitem">
                    <div className="psx-approach-illustration" aria-hidden="true">
                      <img
                        className="psx-approach-icon"
                        src="/assets/images/lumbar/Pharmacological.webp"
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="psx-approach-body">
                      <h3 className="psx-approach-title">Pharmacological Management</h3>
                      <div className="psx-approach-divider" aria-hidden="true" />
                      <p className="psx-approach-text">
                        Pharmacological management pain is commonly part of the treatment and a wide range of drugs can be used to manage pain.
                      </p>
                      <Link
                        to="/treatments/non-invasive-treatments/pharmacological-pain-management"
                        className="psx-approach-link"
                        aria-label="Learn more about pharmacological management"
                      >
                        <span>Learn more</span>
                        <span className="psx-approach-link-icon" aria-hidden="true">
                          ›
                        </span>
                      </Link>
                    </div>
                  </article>

                  <article className="psx-approach-card" role="listitem">
                    <div className="psx-approach-illustration" aria-hidden="true">
                      <img
                        className="psx-approach-icon"
                        src="/assets/images/lumbar/PeripheralNerveBlocks.webp"
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="psx-approach-body">
                      <h3 className="psx-approach-title">Peripheric Nerve Block</h3>
                      <div className="psx-approach-divider" aria-hidden="true" />
                      <p className="psx-approach-text">
                        Local anaesthetic near nerves for diagnostic clarity or therapeutic relief when symptoms suggest nerve-related pain.
                      </p>
                      <Link
                        to="/treatments/minimally-invasive-treatments/peripheral-nerve-block"
                        className="psx-approach-link"
                        aria-label="Learn more about peripheric nerve block"
                      >
                        <span>Learn more</span>
                        <span className="psx-approach-link-icon" aria-hidden="true">
                          ›
                        </span>
                      </Link>
                    </div>
                  </article>

                  <article className="psx-approach-card" role="listitem">
                    <div className="psx-approach-illustration" aria-hidden="true">
                      <img
                        className="psx-approach-icon"
                        src="/assets/images/lumbar/Corticosteroid.webp"
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="psx-approach-body">
                      <h3 className="psx-approach-title">Corticosteroids Injection</h3>
                      <div className="psx-approach-divider" aria-hidden="true" />
                      <p className="psx-approach-text">
                        Targeted anti-inflammatory injection to reduce pain and support movement while rehabilitation progresses.
                      </p>
                      <Link
                        to="/treatments/minimally-invasive-treatments/intra-articular-corticosteroids-injection"
                        className="psx-approach-link"
                        aria-label="Learn more about corticosteroids injection"
                      >
                        <span>Learn more</span>
                        <span className="psx-approach-link-icon" aria-hidden="true">
                          ›
                        </span>
                      </Link>
                    </div>
                  </article>

                  <article className="psx-approach-card" role="listitem">
                    <div className="psx-approach-illustration" aria-hidden="true">
                      <img
                        className="psx-approach-icon"
                        src="/assets/images/lumbar/Crioblation.webp"
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="psx-approach-body">
                      <h3 className="psx-approach-title">Crioablation</h3>
                      <div className="psx-approach-divider" aria-hidden="true" />
                      <p className="psx-approach-text">
                        Cold-based nerve modulation to interrupt pain signalling, guided by ultrasound or fluoroscopy when appropriate.
                      </p>
                      <Link
                        to="/treatments/minimally-invasive-treatments/cryoblation"
                        className="psx-approach-link"
                        aria-label="Learn more about crioablation"
                      >
                        <span>Learn more</span>
                        <span className="psx-approach-link-icon" aria-hidden="true">
                          ›
                        </span>
                      </Link>
                    </div>
                  </article>
                </div>
              </section>
            )}
            {slugBase === 'hand-and-elbow-pain' && (
              <div className="psx-hand-elbow-note" aria-label="Hand and elbow information">
                <div className="psx-hand-elbow-note-inner">
                  <h3 className="psx-hand-elbow-note-title">Hand &amp; Elbow Anatomy</h3>
                  <p className="psx-hand-elbow-note-text">
                    The hand is a wondrously complex structure of bones, muscles, ligaments, and tendons which work together to perform
                    tasks. The wrist and elbow are stabilizing joints that support the steady use of the hand and provide attachment points
                    for the muscles that control the hand and wrist. All three of these areas are prone to injury from overuse or trauma.
                    Their complexity requires the skills of an expert for proper diagnosis and recover from injury.
                  </p>
                </div>
              </div>
            )}
            {slugBase === 'shoulder-pain' && (
              <div className="psx-syndromes-accordion" aria-labelledby="shoulder-syndromes-title">
                <header className="psx-syndromes-accordion-header">
                  <h2 id="shoulder-syndromes-title" className="psx-syndromes-accordion-title">
                    Most Common Syndromes
                  </h2>
                </header>
                <div className="psx-syndromes-accordion-card">
                  <div className="psx-accordion" role="list" aria-label="Most common shoulder pain syndromes">
                    {accordionSyndromes.map((syndrome) => {
                      const isActive = activeSyndromeId === syndrome.id;
                      const rowId = `psx-shoulder-syndrome-${syndrome.id}`;
                      const panelId = `psx-shoulder-syndrome-panel-${syndrome.id}`;
                      return (
                        <div key={syndrome.id} className="psx-accordion-item" role="listitem">
                          <button
                            id={rowId}
                            type="button"
                            className="psx-accordion-trigger"
                            aria-expanded={isActive}
                            aria-controls={panelId}
                            onClick={() =>
                              setActiveSyndromeId((current) => (current === syndrome.id ? null : syndrome.id))
                            }
                          >
                            <span className="psx-accordion-label">{syndrome.label}</span>
                            <span className="psx-accordion-icon" aria-hidden="true">
                              {isActive ? '−' : '+'}
                            </span>
                          </button>
                          <div
                            id={panelId}
                            className="psx-accordion-panel"
                            data-open={isActive ? 'true' : 'false'}
                            role="region"
                            aria-labelledby={rowId}
                            aria-hidden={!isActive}
                          >
                            <p className="psx-accordion-text">{syndrome.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
            {slugBase === 'shoulder-pain' && (
              <section className="psx-approaches psx-approaches--shoulder" aria-labelledby="shoulder-approaches-title">
                <header className="psx-approaches-header">
                  <h2 id="shoulder-approaches-title" className="psx-approaches-title">
                    Treatment Approaches
                  </h2>
                  <p className="psx-approaches-subtitle">
                    Our team of doctors has the capacity to perform the most different approaches to shoulder treatment, including ultrasound guided procedures.
                  </p>
                </header>
                <div className="psx-approaches-grid" role="list" aria-label="Shoulder pain treatment approaches">
                  <article className="psx-approach-card" role="listitem">
                    <div className="psx-approach-illustration" aria-hidden="true">
                      <img
                        className="psx-approach-icon"
                        src="/assets/images/lumbar/Pharmacological.webp"
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="psx-approach-body">
                      <h3 className="psx-approach-title">Pharmacological Management</h3>
                      <div className="psx-approach-divider" aria-hidden="true" />
                      <p className="psx-approach-text">
                        Medication is commonly part of treatment and a wide range of drugs can be used to manage pain.
                      </p>
                      <Link
                        to="/treatments/non-invasive-treatments/pharmacological-pain-management"
                        className="psx-approach-link"
                        aria-label="Learn more about pharmacological management"
                      >
                        <span>Learn more</span>
                        <span className="psx-approach-link-icon" aria-hidden="true">
                          ›
                        </span>
                      </Link>
                    </div>
                  </article>

                  <article className="psx-approach-card" role="listitem">
                    <div className="psx-approach-illustration" aria-hidden="true">
                      <img
                        className="psx-approach-icon"
                        src="/assets/images/lumbar/Hydrodistention.webp"
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="psx-approach-body">
                      <h3 className="psx-approach-title">Hydrodistention</h3>
                      <div className="psx-approach-divider" aria-hidden="true" />
                      <p className="psx-approach-text">
                        Hydrodistention is a minimally invasive procedure guided for ultrasound that aims to stretch the tight joint capsule.
                      </p>
                      <Link
                        to="/treatments/minimally-invasive-treatments/hydrodistention"
                        className="psx-approach-link"
                        aria-label="Learn more about hydrodistention"
                      >
                        <span>Learn more</span>
                        <span className="psx-approach-link-icon" aria-hidden="true">
                          ›
                        </span>
                      </Link>
                    </div>
                  </article>

                  <article className="psx-approach-card" role="listitem">
                    <div className="psx-approach-illustration" aria-hidden="true">
                      <img
                        className="psx-approach-icon"
                        src="/assets/images/lumbar/CalcificationBarbotage.webp"
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="psx-approach-body">
                      <h3 className="psx-approach-title">Calcification Barbotage</h3>
                      <div className="psx-approach-divider" aria-hidden="true" />
                      <p className="psx-approach-text">
                        Calcification barbotage is a minimally invasive procedure guided for ultrasound used to treat this condition.
                      </p>
                      <Link
                        to="/treatments/minimally-invasive-treatments/calcification-barbotage"
                        className="psx-approach-link"
                        aria-label="Learn more about calcification barbotage"
                      >
                        <span>Learn more</span>
                        <span className="psx-approach-link-icon" aria-hidden="true">
                          ›
                        </span>
                      </Link>
                    </div>
                  </article>
                </div>
              </section>
            )}
            {slugBase === 'cervical-spine-pain' && (
              <div className="psx-syndromes-accordion" aria-labelledby="cervical-syndromes-title">
                <header className="psx-syndromes-accordion-header">
                  <h2 id="cervical-syndromes-title" className="psx-syndromes-accordion-title">
                    Most Common Syndromes
                  </h2>
                  <p className="psx-syndromes-accordion-subtitle">
                    Cervical facet joints (FJs) constitute a common source of pain and remain a misunderstood, misdiagnosed and improperly
                    treated pathology. Facet osteoarthritis is the most frequent form of facet pathology.
                  </p>
                </header>
                <div className="psx-syndromes-accordion-card">
                  <div className="psx-accordion" role="list" aria-label="Most common cervical spine pain syndromes">
                    {accordionSyndromes.map((syndrome) => {
                      const isActive = activeSyndromeId === syndrome.id;
                      const rowId = `psx-cervical-syndrome-${syndrome.id}`;
                      const panelId = `psx-cervical-syndrome-panel-${syndrome.id}`;
                      return (
                        <div key={syndrome.id} className="psx-accordion-item" role="listitem">
                          <button
                            id={rowId}
                            type="button"
                            className="psx-accordion-trigger"
                            aria-expanded={isActive}
                            aria-controls={panelId}
                            onClick={() =>
                              setActiveSyndromeId((current) => (current === syndrome.id ? null : syndrome.id))
                            }
                          >
                            <span className="psx-accordion-label">{syndrome.label}</span>
                            <span className="psx-accordion-icon" aria-hidden="true">
                              {isActive ? '−' : '+'}
                            </span>
                          </button>
                          <div
                            id={panelId}
                            className="psx-accordion-panel"
                            data-open={isActive ? 'true' : 'false'}
                            role="region"
                            aria-labelledby={rowId}
                            aria-hidden={!isActive}
                          >
                            <p className="psx-accordion-text">{syndrome.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
            {slugBase === 'cervical-spine-pain' && (
              <section className="psx-approaches psx-approaches--cervical" aria-labelledby="cervical-approaches-title">
                <header className="psx-approaches-header">
                  <h2 id="cervical-approaches-title" className="psx-approaches-title">
                    Treatment Approaches
                  </h2>
                  <p className="psx-approaches-subtitle">
                    We have a team expert in diagnosis and management of the cervical pain.
                  </p>
                </header>
                <div className="psx-approaches-grid" role="list" aria-label="Cervical spine pain treatment approaches">
                  <article className="psx-approach-card" role="listitem">
                    <div className="psx-approach-illustration" aria-hidden="true">
                      <img
                        className="psx-approach-icon"
                        src="/assets/images/lumbar/Corticosteroid.webp"
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="psx-approach-body">
                      <h3 className="psx-approach-title">Corticosteroid Injection</h3>
                      <div className="psx-approach-divider" aria-hidden="true" />
                      <p className="psx-approach-text">
                        Corticosteroids medication are used to reduce pain and inflammation and can be taken oral or through an injection.
                      </p>
                      <Link
                        to="/treatments/minimally-invasive-treatments/intra-articular-corticosteroids-injection"
                        className="psx-approach-link"
                        aria-label="Learn more about corticosteroid injection"
                      >
                        <span>Learn more</span>
                        <span className="psx-approach-link-icon" aria-hidden="true">
                          ›
                        </span>
                      </Link>
                    </div>
                  </article>

                  <article className="psx-approach-card" role="listitem">
                    <div className="psx-approach-illustration" aria-hidden="true">
                      <img
                        className="psx-approach-icon"
                        src="/assets/images/lumbar/Crioblation.webp"
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="psx-approach-body">
                      <h3 className="psx-approach-title">Crioablation</h3>
                      <div className="psx-approach-divider" aria-hidden="true" />
                      <p className="psx-approach-text">
                        Cryoablation uses cold temperatures and is a minimally invasive procedure guided for ultrasound or fluoroscopy.
                      </p>
                      <Link
                        to="/treatments/minimally-invasive-treatments/cryoblation"
                        className="psx-approach-link"
                        aria-label="Learn more about crioablation"
                      >
                        <span>Learn more</span>
                        <span className="psx-approach-link-icon" aria-hidden="true">
                          ›
                        </span>
                      </Link>
                    </div>
                  </article>

                  <article className="psx-approach-card" role="listitem">
                    <div className="psx-approach-illustration" aria-hidden="true">
                      <img
                        className="psx-approach-icon"
                        src="/assets/images/lumbar/Nucleoplasty.webp"
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="psx-approach-body">
                      <h3 className="psx-approach-title">Nucleoplasty</h3>
                      <div className="psx-approach-divider" aria-hidden="true" />
                      <p className="psx-approach-text">
                        Nucleoplasty is an advanced injection procedure guided for fluoroscopy for treating the disc herniation.
                      </p>
                      <Link
                        to="/treatments/minimally-invasive-treatments/nucleoplasty"
                        className="psx-approach-link"
                        aria-label="Learn more about nucleoplasty"
                      >
                        <span>Learn more</span>
                        <span className="psx-approach-link-icon" aria-hidden="true">
                          ›
                        </span>
                      </Link>
                    </div>
                  </article>

                  <article className="psx-approach-card" role="listitem">
                    <div className="psx-approach-illustration" aria-hidden="true">
                      <img
                        className="psx-approach-icon"
                        src="/assets/images/lumbar/Pharmacological.webp"
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="psx-approach-body">
                      <h3 className="psx-approach-title">Pharmacological Management</h3>
                      <div className="psx-approach-divider" aria-hidden="true" />
                      <p className="psx-approach-text">
                        Optimised medicines can help control pain, improve sleep, and support rehabilitation while minimising side effects.
                      </p>
                      <Link
                        to="/treatments/non-invasive-treatments/pharmacological-pain-management"
                        className="psx-approach-link"
                        aria-label="Learn more about pharmacological management"
                      >
                        <span>Learn more</span>
                        <span className="psx-approach-link-icon" aria-hidden="true">
                          ›
                        </span>
                      </Link>
                    </div>
                  </article>

                  <article className="psx-approach-card" role="listitem">
                    <div className="psx-approach-illustration" aria-hidden="true">
                      <img
                        className="psx-approach-icon"
                        src="/assets/images/lumbar/Radiofrequency.webp"
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="psx-approach-body">
                      <h3 className="psx-approach-title">Radiofrequency</h3>
                      <div className="psx-approach-divider" aria-hidden="true" />
                      <p className="psx-approach-text">
                        Thermal lesioning can reduce pain from selected nerves and joints when matched to the right diagnosis.
                      </p>
                      <Link
                        to="/treatments/minimally-invasive-treatments/radiofrequency"
                        className="psx-approach-link"
                        aria-label="Learn more about radiofrequency"
                      >
                        <span>Learn more</span>
                        <span className="psx-approach-link-icon" aria-hidden="true">
                          ›
                        </span>
                      </Link>
                    </div>
                  </article>
                </div>
              </section>
            )}
            {slugBase === 'cervical-spine-pain' && (
              <div className="psx-cervical-note" aria-label="Cervical spine pain information">
                <div className="psx-cervical-note-inner">
                  <h3 className="psx-cervical-note-title">Cervical Spine Pain</h3>
                  <p className="psx-cervical-note-text">
                    Chronic neck pain is one of the most common pain syndromes and represents an enormous burden and cost generator for
                    society.
                  </p>
                </div>
              </div>
            )}
            {slugBase === 'head-pain' && (
              <div className="psx-syndromes-accordion" aria-labelledby="head-syndromes-title">
                <header className="psx-syndromes-accordion-header">
                  <h2 id="head-syndromes-title" className="psx-syndromes-accordion-title">
                    Most Common Syndromes
                  </h2>
                </header>
                <div className="psx-syndromes-accordion-card">
                  <div className="psx-accordion" role="list" aria-label="Most common head pain syndromes">
                    {accordionSyndromes.map((syndrome) => {
                      const isActive = activeSyndromeId === syndrome.id;
                      const rowId = `psx-head-syndrome-${syndrome.id}`;
                      const panelId = `psx-head-syndrome-panel-${syndrome.id}`;
                      return (
                        <div key={syndrome.id} className="psx-accordion-item" role="listitem">
                          <button
                            id={rowId}
                            type="button"
                            className="psx-accordion-trigger"
                            aria-expanded={isActive}
                            aria-controls={panelId}
                            onClick={() =>
                              setActiveSyndromeId((current) => (current === syndrome.id ? null : syndrome.id))
                            }
                          >
                            <span className="psx-accordion-label">{syndrome.label}</span>
                            <span className="psx-accordion-icon" aria-hidden="true">
                              {isActive ? '−' : '+'}
                            </span>
                          </button>
                          <div
                            id={panelId}
                            className="psx-accordion-panel"
                            data-open={isActive ? 'true' : 'false'}
                            role="region"
                            aria-labelledby={rowId}
                            aria-hidden={!isActive}
                          >
                            <p className="psx-accordion-text">{syndrome.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
            {slugBase === 'head-pain' && (
              <section className="psx-approaches psx-approaches--head" aria-labelledby="head-approaches-title">
                <header className="psx-approaches-header">
                  <h2 id="head-approaches-title" className="psx-approaches-title">
                    Treatment Approaches
                  </h2>
                  <p className="psx-approaches-subtitle">
                    We have a team expert in diagnosis and management of the head.
                  </p>
                </header>
                <div className="psx-approaches-grid" role="list" aria-label="Head pain treatment approaches">
                  <article className="psx-approach-card" role="listitem">
                    <div className="psx-approach-illustration" aria-hidden="true">
                      <img
                        className="psx-approach-icon"
                        src="/assets/images/lumbar/Botulin.webp"
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="psx-approach-body">
                      <h3 className="psx-approach-title">Botulin Toxin Injection</h3>
                      <div className="psx-approach-divider" aria-hidden="true" />
                      <p className="psx-approach-text">
                        A potent neurotoxin that inhibits release of acetylcholine at the neuromuscular junction.
                      </p>
                      <Link
                        to="/treatments/minimally-invasive-treatments/botulin-toxin-injection"
                        className="psx-approach-link"
                        aria-label="Learn more about botulin toxin injection"
                      >
                        <span>Learn more</span>
                        <span className="psx-approach-link-icon" aria-hidden="true">
                          ›
                        </span>
                      </Link>
                    </div>
                  </article>

                  <article className="psx-approach-card" role="listitem">
                    <div className="psx-approach-illustration" aria-hidden="true">
                      <img
                        className="psx-approach-icon"
                        src="/assets/images/lumbar/Pharmacological.webp"
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="psx-approach-body">
                      <h3 className="psx-approach-title">Pharmacological Management</h3>
                      <div className="psx-approach-divider" aria-hidden="true" />
                      <p className="psx-approach-text">
                        Medication strategies are commonly part of treatment and a wide range of drugs can be used to manage pain.
                      </p>
                      <Link
                        to="/treatments/non-invasive-treatments/pharmacological-pain-management"
                        className="psx-approach-link"
                        aria-label="Learn more about pharmacological management"
                      >
                        <span>Learn more</span>
                        <span className="psx-approach-link-icon" aria-hidden="true">
                          ›
                        </span>
                      </Link>
                    </div>
                  </article>
                </div>
              </section>
            )}
            {slugBase === 'head-pain' && (
              <div className="psx-head-note" aria-label="Head pain information">
                <div className="psx-head-note-inner">
                  <h3 className="psx-head-note-title">Head Pain in Numbers</h3>
                  <p className="psx-head-note-text">
                    Head pain is a common health problem with a global prevalence of 47% (symptoms occurring at least once in the past year)
                    and women are disproportionately affected (3:1).
                  </p>
                  <p className="psx-head-note-text">
                    Many factors, like stress, anxiety, injury and migraine can lead to headaches. In European populations, the annual
                    sex-adjusted prevalence for tension-type headache is 35%, for migraine is 38%, but for cluster headache is only 0.15%.
                  </p>
                  <p className="psx-head-note-text">
                    Consequently, sometimes the high frequency and intensity of headaches affects a patient&apos;s quality of life and a
                    diagnosis and effective treatment make a huge difference to the patient and can be very rewarding for the clinician.
                  </p>
                </div>
              </div>
            )}
            {slugBase === 'sports-injuries' && (
              <section className="psx-approaches" aria-labelledby="sports-approaches-title">
                <header className="psx-approaches-header">
                  <h2 id="sports-approaches-title" className="psx-approaches-title">
                    Our Treatment Approaches
                  </h2>
                  <p className="psx-approaches-subtitle">We can help you at every level of your health journey.</p>
                </header>
                <div className="psx-approaches-grid" role="list" aria-label="Treatment approaches">
                  <article className="psx-approach-card" role="listitem">
                    <div className="psx-approach-illustration" aria-hidden="true">
                      <img
                        className="psx-approach-icon"
                        src="/assets/images/treatment-img/No-Invasive.webp"
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="psx-approach-body">
                      <h3 className="psx-approach-title">Non–Invasive Treatments</h3>
                      <div className="psx-approach-divider" aria-hidden="true" />
                      <p className="psx-approach-text">
                        Quick and non‑committing steps we can take together to improve your health.
                      </p>
                      <Link
                        to="/treatments#treatments-non-invasive"
                        className="psx-approach-link"
                        aria-label="Learn more about non-invasive treatments"
                      >
                        <span>Learn more</span>
                        <span className="psx-approach-link-icon" aria-hidden="true">
                          ›
                        </span>
                      </Link>
                    </div>
                  </article>

                  <article className="psx-approach-card" role="listitem">
                    <div className="psx-approach-illustration" aria-hidden="true">
                      <img
                        className="psx-approach-icon"
                        src="/assets/images/treatment-img/Minimally-Invasive.webp"
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="psx-approach-body">
                      <h3 className="psx-approach-title">Minimally Invasive Treatments</h3>
                      <div className="psx-approach-divider" aria-hidden="true" />
                      <p className="psx-approach-text">
                        Procedures with reduced surgical risks that promote quicker recovery times.
                      </p>
                      <Link
                        to="/treatments/minimally-invasive-treatments/radiofrequency"
                        className="psx-approach-link"
                        aria-label="Learn more about minimally invasive treatments"
                      >
                        <span>Learn more</span>
                        <span className="psx-approach-link-icon" aria-hidden="true">
                          ›
                        </span>
                      </Link>
                    </div>
                  </article>

                  <article className="psx-approach-card" role="listitem">
                    <div className="psx-approach-illustration" aria-hidden="true">
                      <img
                        className="psx-approach-icon"
                        src="/assets/images/treatment-img/Surgical.webp"
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="psx-approach-body">
                      <h3 className="psx-approach-title">Surgical Treatments</h3>
                      <div className="psx-approach-divider" aria-hidden="true" />
                      <p className="psx-approach-text">
                        Comprehensive procedures tailored to address complex health issues with precision.
                      </p>
                      <Link
                        to="/treatments#treatments-surgical"
                        className="psx-approach-link"
                        aria-label="Learn more about surgical treatments"
                      >
                        <span>Learn more</span>
                        <span className="psx-approach-link-icon" aria-hidden="true">
                          ›
                        </span>
                      </Link>
                    </div>
                  </article>
                </div>
              </section>
            )}
            {slugBase === 'hip-and-groin-pain' && (
              <>
                <div className="psx-lead">
                  <h2 id="hip-interventions-title" className="psx-lead-title">
                    Intervention Options
                  </h2>
                  <p className="psx-lead-subtitle">
                    Explore common procedures that can support pain relief and rehabilitation.
                  </p>
                </div>
                <div className="lumbar-cards-wrap" aria-label="Hip and groin intervention options">
                  <LumbarInterventions />
                </div>
                <div className="psx-syndromes-accordion" aria-labelledby="hip-syndromes-title">
                  <header className="psx-syndromes-accordion-header">
                    <h2 id="hip-syndromes-title" className="psx-syndromes-accordion-title">
                      Most Common Syndromes
                    </h2>
                    <p className="psx-syndromes-accordion-subtitle">
                      Hip osteoarthritis is one of the most common causes of hip pain in the older population.
                    </p>
                  </header>
                  <div className="psx-syndromes-accordion-card">
                    <div className="psx-accordion" role="list" aria-label="Most common hip syndromes">
                      {accordionSyndromes.map((syndrome) => {
                        const isActive = activeSyndromeId === syndrome.id;
                        const rowId = `psx-hip-syndrome-${syndrome.id}`;
                        const panelId = `psx-hip-syndrome-panel-${syndrome.id}`;
                        return (
                          <div key={syndrome.id} className="psx-accordion-item" role="listitem">
                            <button
                              id={rowId}
                              type="button"
                              className="psx-accordion-trigger"
                              aria-expanded={isActive}
                              aria-controls={panelId}
                              onClick={() =>
                                setActiveSyndromeId((current) => (current === syndrome.id ? null : syndrome.id))
                              }
                            >
                              <span className="psx-accordion-label">{syndrome.label}</span>
                              <span className="psx-accordion-icon" aria-hidden="true">
                                {isActive ? '−' : '+'}
                              </span>
                            </button>
                            <div
                              id={panelId}
                              className="psx-accordion-panel"
                              data-open={isActive ? 'true' : 'false'}
                              role="region"
                              aria-labelledby={rowId}
                              aria-hidden={!isActive}
                            >
                              <p className="psx-accordion-text">{syndrome.description}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="psx-hip-interventional-note" aria-label="Hip and groin interventional pain management information">
                  <div className="psx-hip-interventional-note-inner">
                    <h3 className="psx-hip-interventional-note-title">Interventional Pain Management</h3>
                    <p className="psx-hip-interventional-note-text">
                      Percutaneous interventional pain management is a good alternative treatment.
                    </p>
                    <p className="psx-hip-interventional-note-text">
                      The hip joint is the more stable joint of the human body and is composed of femoral head and acetabulum. It is made of
                      cartilage, ligaments and fluid. Muscles and tendons help the hip joint move. It can withstand repeated motion and a fair
                      amount of wear and tear.
                    </p>
                    <p className="psx-hip-interventional-note-text">
                      For that reason, one of the main diseases of the hip is osteoarthritis and, as in the knee, the ultimate treatment is
                      prosthetic surgery. Despite that, percutaneous interventional pain management (Steroid, Platelet Rich Plasma or Hyaluronic
                      Acid Injection) are a good alternative treatment for some patients who are not eligible for an operation or experience
                      persistent or intense pain after surgery or while waiting for surgery.
                    </p>
                  </div>
                </div>
              </>
            )}
          </section>
          {slugBase === 'knee-pain' && (
            <section className="psx-section" aria-labelledby="knee-interventions-title">
              <div className="psx-lead">
                <h2 id="knee-interventions-title" className="psx-lead-title">
                  Intervention Options
                </h2>
                <p className="psx-lead-subtitle">
                  Explore common procedures that can support pain relief and rehabilitation.
                </p>
              </div>
              <div className="lumbar-cards-wrap">
                <LumbarInterventions />
              </div>
            </section>
          )}
          {slugBase === 'knee-pain' && (
            <section className="psx-section psx-syndromes-accordion" aria-labelledby="knee-syndromes-title">
              <header className="psx-syndromes-accordion-header">
                <h2 id="knee-syndromes-title" className="psx-syndromes-accordion-title">
                  Most Common Syndromes
                </h2>
                <p className="psx-syndromes-accordion-subtitle">
                  Knee pain is a very prevalent symptom, either in younger and in older people. It can have many sources, some of which are
                  described next.
                </p>
              </header>
              <div className="psx-syndromes-accordion-card">
                <div className="psx-accordion" role="list" aria-label="Most common knee syndromes">
                  {accordionSyndromes.map((syndrome) => {
                    const isActive = activeSyndromeId === syndrome.id;
                    const rowId = `psx-knee-syndrome-${syndrome.id}`;
                    const panelId = `psx-knee-syndrome-panel-${syndrome.id}`;
                    return (
                      <div key={syndrome.id} className="psx-accordion-item" role="listitem">
                        <button
                          id={rowId}
                          type="button"
                          className="psx-accordion-trigger"
                          aria-expanded={isActive}
                          aria-controls={panelId}
                          onClick={() =>
                            setActiveSyndromeId((current) => (current === syndrome.id ? null : syndrome.id))
                          }
                        >
                          <span className="psx-accordion-label">{syndrome.label}</span>
                          <span className="psx-accordion-icon" aria-hidden="true">
                            {isActive ? '−' : '+'}
                          </span>
                        </button>
                        <div
                          id={panelId}
                          className="psx-accordion-panel"
                          data-open={isActive ? 'true' : 'false'}
                          role="region"
                          aria-labelledby={rowId}
                          aria-hidden={!isActive}
                        >
                          <p className="psx-accordion-text">{syndrome.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          )}
          {slugBase === 'lumbar-spine-pain' && (
            <section className="psx-section psx-edu">
              <div className="psx-edu-row">
                <h3 className="psx-edu-heading">Symptoms & Diagnosis</h3>
                <div className="psx-edu-copy">
                  <p className="psx-edu-paragraph">Symptoms of lumbar spine pain can vary widely depending on the underlying cause and may include localized pain in the lower back, as well as radiating pain, numbness, or tingling sensations in the legs or feet.</p>
                  <p className="psx-edu-paragraph">Lumbar spine pain can be caused by a variety of factors, including injury, poor posture, arthritis, or degenerative disc disease. In some cases, the pain may be acute and resolve on its own with rest and conservative treatments. However, in other cases, the pain may be chronic and require more aggressive interventions, such as surgery.</p>
                  <p className="psx-edu-paragraph">Diagnostic tests for lumbar spine pain may include X‑rays, CT scans, MRIs, and nerve conduction studies to help identify the underlying cause and guide treatment decisions.</p>
                </div>
              </div>
            </section>
          )}
          {slugBase === 'lumbar-spine-pain' && (
            <section className="psx-section psx-syndromes">
              <header className="psx-syndromes-header">
                <h2 className="psx-syndromes-title">Most Common Syndromes</h2>
                <p className="psx-syndromes-subtitle">
                  Lumbar facet joints constitute a common source of pain and remain a misunderstood, misdiagnosed and
                  improperly treated pathology.
                </p>
                <p className="psx-syndromes-subtitle">
                  Facet osteoarthritis is the most frequent form of facet pathology.
                </p>
              </header>
              <div className="psx-syndromes-layout">
                <article className="psx-syndrome-card">
                  <h3 className="psx-syndrome-heading">Radicular Pain</h3>
                  <div className="psx-syndrome-accent" />
                  <div className="psx-syndrome-copy">
                    <p>
                      Radicular pain is a term applied to describe pain that results from the stimulation of, or a
                      disorder of, a nerve root. Irritation of the nerves in the spine can cause a variety of symptoms,
                      which differ from person to person.
                    </p>
                    <p>
                      Common symptoms include: pain and increased sensitivity; pins and needles; and numbness; muscle
                      weakness; altered sensations such as trickling water.
                    </p>
                    <p>
                      Nerve pain is usually described as burning in nature, and normally spreads below the knee or
                      elbow in the affected limb. Often nerve pain and back pain are present at the same time.
                    </p>
                  </div>
                  <Link to="/resources/learn/cervical-pain" className="psx-syndrome-link" aria-label="Learn more about radicular pain">
                    <span>Learn more</span>
                    <span aria-hidden="true">›</span>
                  </Link>
                </article>
                <figure className="psx-syndrome-media" aria-hidden="true">
                  <img
                    src="/assets/images/lumbar-cards/RadicularPain.webp"
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="psx-syndrome-image"
                  />
                </figure>
              </div>
              <div className="psx-syndromes-layout">
                <figure className="psx-syndrome-media" aria-hidden="true">
                  <img
                    src="/assets/images/lumbar-cards/FacetJointSyndrome.webp"
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="psx-syndrome-image"
                  />
                </figure>
                <article className="psx-syndrome-card">
                  <h3 className="psx-syndrome-heading">Facet Joint Syndrome</h3>
                  <div className="psx-syndrome-accent" />
                  <div className="psx-syndrome-copy">
                    <p>
                      Lumbar facet joints (FJs) constitute a common source of pain and remain a misunderstood,
                      misdiagnosed and improperly treated pathology. Facet osteoarthritis is the most frequent form of
                      facet pathology.
                    </p>
                    <p>
                      FJ pain may be referred distally into the lower limb, thereby mimicking sciatica.
                    </p>
                    <p>
                      “Pseudo‑radicular” lumbar pain typically radiates uni‑ or bilaterally to the buttock and the
                      trochanteric region, the groin and the thighs, ending above the knee, without neurological
                      deficits.
                    </p>
                  </div>
                </article>
              </div>
              <div className="psx-syndromes-layout">
                <article className="psx-syndrome-card">
                  <h3 className="psx-syndrome-heading">Sacroiliac Joint Pain</h3>
                  <div className="psx-syndrome-accent" />
                  <div className="psx-syndrome-copy">
                    <p>
                      Patients experiencing sacroiliac joint pain may present with a wide variety of complaints.
                      Gluteal pain near or surrounding the posterior superior iliac spine is the most common region.
                    </p>
                    <p>
                      Other symptoms include groin pain, pain radiating into the lower extremity, numbness, and clicking
                      or popping in the posterior pelvis.
                    </p>
                    <p>
                      Pain, clicking, or both with transitional activities such as getting up from a chair or in and
                      out of a car may also be noted.
                    </p>
                  </div>
                </article>
                <figure className="psx-syndrome-media" aria-hidden="true">
                  <img
                    src="/assets/images/lumbar-cards/SacroiliacJointPain.webp"
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="psx-syndrome-image"
                  />
                </figure>
              </div>
              <div className="psx-syndromes-layout">
                <figure className="psx-syndrome-media" aria-hidden="true">
                  <img
                    src="/assets/images/lumbar-cards/LumbarSpinalStenosis.webp"
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="psx-syndrome-image"
                  />
                </figure>
                <article className="psx-syndrome-card">
                  <h3 className="psx-syndrome-heading">Lumbar Spinal Stenosis</h3>
                  <div className="psx-syndrome-accent" />
                  <div className="psx-syndrome-copy">
                    <p>
                      The term lumbar spinal stenosis refers to the anatomical narrowing of the spinal canal and is
                      associated with a plethora of clinical symptoms.
                    </p>
                    <p>
                      The clinical features of the condition are heterogeneous, and often, but not always, include
                      neurological symptoms. Typically, patient symptoms comprise unilateral or bilateral (exertional)
                      back and leg pain, which slowly develops and persists over several months, or even years.
                    </p>
                    <p>
                      The back pain is localized to the lumbar spine and can radiate towards the gluteal region, groin
                      and legs, frequently displaying a pseudo radicular pattern.
                    </p>
                  </div>
                </article>
              </div>
              <div className="psx-syndromes-layout">
                <article className="psx-syndrome-card">
                  <h3 className="psx-syndrome-heading">Discogenic Pain</h3>
                  <div className="psx-syndrome-accent" />
                  <div className="psx-syndrome-copy">
                    <p>
                      Discogenic pain shares clinical signs with lumbosacral radicular pain. There are no specific
                      characteristics in the patient&apos;s history that confirm or disprove the diagnosis of discogenic
                      low back pain.
                    </p>
                    <p>
                      More typical features include persistent, nociceptive low back, groin and/or leg pain that
                      worsens with axial loading and improves with recumbence.
                    </p>
                  </div>
                </article>
                <figure className="psx-syndrome-media" aria-hidden="true">
                  <img
                    src="/assets/images/lumbar-cards/DiscogenicPain.webp"
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="psx-syndrome-image"
                  />
                </figure>
              </div>
            </section>
          )}
          {slugBase === 'lumbar-spine-pain' && (
            <section className="psx-section" aria-labelledby="lumbar-interventions-title">
              <div className="psx-lead">
                <h2 id="lumbar-interventions-title" className="psx-lead-title">Intervention Options</h2>
                <p className="psx-lead-subtitle">Explore common procedures that can support pain relief and rehabilitation.</p>
              </div>
              <div className="lumbar-cards-wrap">
                <LumbarInterventions variant="full" />
              </div>
            </section>
          )}

          {slugBase === 'lumbar-spine-pain' && (
            <section className="psx-section psx-tips" aria-labelledby="lumbar-tips-title">
              <header className="psx-tips-header">
                <h2 id="lumbar-tips-title" className="psx-tips-title">Tips for maintaining a healthy spine</h2>
                <p className="psx-tips-subtitle">
                  Maintaining a healthy spine supports overall wellbeing. These practical habits can help reduce strain and improve movement over time.
                </p>
              </header>
              <div className="psx-tips-grid" role="list" aria-label="Healthy spine tips">
                <article className="psx-tip" role="listitem">
                  <p className="psx-tip-number">1.</p>
                  <h3 className="psx-tip-title">Practice Good Posture</h3>
                  <div className="psx-tip-divider" aria-hidden="true" />
                  <p className="psx-tip-body">
                    Keep a neutral spine when sitting or standing. Avoid slouching and long periods in one position.
                  </p>
                </article>
                <article className="psx-tip" role="listitem">
                  <p className="psx-tip-number">2.</p>
                  <h3 className="psx-tip-title">Exercise Regularly</h3>
                  <div className="psx-tip-divider" aria-hidden="true" />
                  <p className="psx-tip-body">
                    Build strength and mobility with low‑impact activity such as walking, swimming or cycling.
                  </p>
                </article>
                <article className="psx-tip" role="listitem">
                  <p className="psx-tip-number">3.</p>
                  <h3 className="psx-tip-title">Maintain a Healthy Weight</h3>
                  <div className="psx-tip-divider" aria-hidden="true" />
                  <p className="psx-tip-body">
                    Reducing excess load on the spine can ease symptoms and support long‑term joint health.
                  </p>
                </article>
                <article className="psx-tip" role="listitem">
                  <p className="psx-tip-number">4.</p>
                  <h3 className="psx-tip-title">Use Proper Lifting Techniques</h3>
                  <div className="psx-tip-divider" aria-hidden="true" />
                  <p className="psx-tip-body">
                    Bend at the hips and knees, keep the load close, and avoid twisting when lifting.
                  </p>
                </article>
                <article className="psx-tip" role="listitem">
                  <p className="psx-tip-number">5.</p>
                  <h3 className="psx-tip-title">Take Breaks from Sitting</h3>
                  <div className="psx-tip-divider" aria-hidden="true" />
                  <p className="psx-tip-body">
                    Stand up, stretch and move every 30–60 minutes to reduce stiffness and pressure.
                  </p>
                </article>
                <article className="psx-tip" role="listitem">
                  <p className="psx-tip-number">6.</p>
                  <h3 className="psx-tip-title">Practice Stress Reduction</h3>
                  <div className="psx-tip-divider" aria-hidden="true" />
                  <p className="psx-tip-body">
                    Sleep, breathing and relaxation techniques can reduce muscle tension and improve recovery.
                  </p>
                </article>
              </div>
            </section>
          )}

          {slugBase === 'lumbar-spine-pain' && (
            <section className="psx-section psx-help" aria-labelledby="lumbar-help-title">
              <div className="psx-help-layout">
                <h2 id="lumbar-help-title" className="psx-help-title">Let us help you</h2>
                <div className="psx-help-copy">
                  <p className="psx-help-paragraph">
                    If you&apos;re experiencing lumbar spine pain, consulting a healthcare provider is essential. This type of pain may signal serious underlying issues like herniated discs, spinal stenosis, or spondylolisthesis, which can lead to nerve damage or spinal cord compression if left untreated. Early intervention is crucial to prevent long‑term complications and manage pain effectively.
                  </p>
                  <p className="psx-help-paragraph">
                    Lumbar spine pain can also significantly impact daily activities, such as walking or sitting, and interfere with work and recreational pursuits. Seeking treatment not only helps alleviate pain but also improves functionality, preventing the condition from becoming chronic. A healthcare provider can also address risk factors or lifestyle issues contributing to the pain, offering recommendations such as posture‑improving exercises or weight loss strategies.
                  </p>
                  <p className="psx-help-paragraph">
                    Remember, timely treatment is key to maintaining your quality of life and preventing more invasive interventions later.
                  </p>
                </div>
              </div>
            </section>
          )}

          <section className="psx-section">
            <div className="psx-treatments-layout">
              <article className="psx-card">
                <h3 className="psx-card-title">For patients</h3>
                <div className="psx-accent" />
                {(pageContent?.patient ?? [
                  'Your plan is built collaboratively. We explain findings, discuss options and agree next steps that fit your goals.',
                  'Please bring medication lists and any imaging reports to appointments. Let us know your priorities so we can tailor care.',
                ]).map((p, idx) => (
                  <p key={`${slugBase}-patient-${idx}`} className="psx-body">
                    {p}
                  </p>
                ))}
              </article>
              <article className="psx-card">
                <h3 className="psx-card-title">For clinicians</h3>
                <div className="psx-accent" />
                {(pageContent?.clinician ?? [
                  'We welcome referrals and provide clear communication on assessment, working diagnosis and management plans.',
                  'Our approach integrates guideline-informed care and shared decision-making. Please contact us to discuss complex cases.',
                ]).map((p, idx) => (
                  <p key={`${slugBase}-clinician-${idx}`} className="psx-body">
                    {p}
                  </p>
                ))}
              </article>
            </div>
          </section>

          {slugBase !== 'knee-pain' &&
            slugBase !== 'hip-and-groin-pain' &&
            slugBase !== 'head-pain' &&
            slugBase !== 'cervical-spine-pain' &&
            slugBase !== 'shoulder-pain' &&
            slugBase !== 'hand-and-elbow-pain' &&
            slugBase !== 'thoracic-wall-pain' &&
            slugBase !== 'abdominal-wall-pain' &&
            slugBase !== 'pelvic-and-gynaecological-pain' &&
            slugBase !== 'facial-pain' &&
            slugBase !== 'foot-and-ankle-pain' &&
            (
            <section className="psx-section psx-patterns">
              <div className="psx-patterns-layout">
                <header className="psx-patterns-header">
                  <p className="psx-patterns-eyebrow">Most common patterns</p>
                  <h2 className="psx-patterns-title">How {areaLabel} can present</h2>
                  <p className="psx-patterns-subtitle">
                    People experience pain in different ways. Exploring the pattern of your symptoms helps
                    us match you with the most appropriate investigation and treatment.
                  </p>
                </header>
                <div className="psx-accordion" role="list">
                  {syndromes.map((syndrome) => {
                    const isActive = activeSyndromeId === syndrome.id;
                    const rowId = `psx-accordion-${slugBase}-${syndrome.id}`;
                    const panelId = `psx-accordion-panel-${slugBase}-${syndrome.id}`;
                    return (
                      <div key={syndrome.id} className="psx-accordion-item" role="listitem">
                        <button
                          id={rowId}
                          type="button"
                          className="psx-accordion-trigger"
                          aria-expanded={isActive}
                          aria-controls={panelId}
                          onClick={() =>
                            setActiveSyndromeId((current) => (current === syndrome.id ? null : syndrome.id))
                          }
                        >
                          <span className="psx-accordion-label">{syndrome.label}</span>
                          <span className="psx-accordion-icon" aria-hidden="true">
                            +
                          </span>
                        </button>
                        <div
                          id={panelId}
                          className="psx-accordion-panel"
                          data-open={isActive ? 'true' : 'false'}
                          role="region"
                          aria-labelledby={rowId}
                          aria-hidden={!isActive}
                        >
                          <p className="psx-accordion-text">{syndrome.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          )}

          {pageContent?.citations && pageContent.citations.length > 0 ? (
            <section className="psx-section">
              <div className="psx-treatments-layout">
                <article className="psx-card">
                  <h3 className="psx-card-title">References</h3>
                  <div className="psx-accent" />
                  <ol className="psx-body" role="list">
                    {pageContent.citations.map((c, idx) => (
                      <li key={`${slugBase}-ref-${idx}`}>
                        <a href={c.url} target="_blank" rel="noopener noreferrer">
                          {c.label}
                        </a>
                      </li>
                    ))}
                  </ol>
                </article>
              </div>
            </section>
          ) : null}

          <section className="home-section-location" aria-labelledby={`${slugBase}-location-title`}>
            <div className="home-section-location-inner">
              <header className="location-header">
                <h2 className="location-title" id={`${slugBase}-location-title`}>
                  Our Location
                </h2>
                <div className="location-title-rule" aria-hidden="true" />
              </header>
              <div className="location-grid location-grid--map-only">
                <div className="location-map" aria-label="Map">
                  <ManagedEmbed
                    className="location-map-iframe"
                    title="Business location map"
                    type="map"
                    src="https://www.google.com/maps?q=Av.+do+Mar+8135-107+Portugal&z=16&output=embed"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                    openHref="https://maps.google.com/?q=Av.+do+Mar+8135-107+Portugal"
                  />
                </div>
              </div>
            </div>
          </section>

          <ArticlePrevNextNav
            items={getSpecialitiesNavItemsWithHero() as unknown as { to: string; title: string; heroImage?: string }[]}
            ariaLabel="Speciality page navigation"
            previousLabel="Previous Page"
            nextLabel="Next Page"
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: serializeJsonForHtmlScript(structuredDataJson) }}
          />
        </main>
      </div>
    );
  }

  return (
    <main className={mainClassName ? `page-main condition-main ${mainClassName}` : 'page-main condition-main'}>
      <section className="page-section treatments-overview">
        <div className="treatments-overview-header">
          <h2 className="treatments-overview-title">Treatments for {areaLabel}</h2>
          <p className="treatments-overview-subtitle">
            At Algarve Pain Centre in Vale do Lobo, Algarve, we offer a comprehensive range of
            evidence-based treatments for {areaLabel}. Our multidisciplinary team of pain medicine
            physicians, spine surgeons, rehabilitation specialists and psychologists works together
            so that your plan is built from multiple expert perspectives, not just one.
          </p>
          <p className="treatments-overview-subtitle">
            Whether your pain is recent or long‑standing, we focus on understanding how it affects
            your daily life and long‑term goals. This helps us decide when simple measures are
            enough and when more advanced interventions are needed.
          </p>
        </div>
        <div className="treatments-overview-layout">
          <article className="treatments-overview-card">
            <h3 className="treatments-overview-card-title">{title} overview</h3>
            <div className="treatments-overview-card-accent" />
            <p className="treatments-overview-card-body">
              Pain in this area can have many causes, including joint, muscle, nerve and postural
              factors. During your first consultation we explore how your symptoms started, how they
              have evolved over time and which movements or activities make them better or worse.
              Understanding this pattern allows us to reach an accurate diagnosis and design a
              treatment plan that combines the most appropriate interventions for you.
            </p>
            <p className="treatments-overview-card-body">
              We also look carefully at your medical history, lifestyle and previous treatments.
              Some people come to us after years of trying isolated approaches without a clear plan.
              Others seek support early, when symptoms are starting to interfere with work, sport or
              sleep. Wherever you are in your journey, we aim to explain your condition in plain
              language and agree on priorities together.
            </p>
            <p className="treatments-overview-card-body">
              Common goals include reducing flare‑ups, improving confidence in movement and
              protecting long‑term joint and spine health. For some patients this means structured
              rehabilitation; for others it means targeted procedures or surgical opinion. Many
              people benefit from a combination of these elements over time.
            </p>
            <p className="treatments-overview-card-body">
              If you are unsure whether your {areaLabel} requires specialist assessment, consider
              seeking help when:
            </p>
            <ul className="treatments-overview-card-body">
              <li>pain persists for more than a few weeks despite simple measures</li>
              <li>movement is increasingly limited or everyday tasks are becoming difficult</li>
              <li>you notice weakness, pins and needles or changes in balance</li>
              <li>
                pain is affecting your mood, sleep, work or ability to enjoy family and social life
              </li>
            </ul>
            <p className="treatments-overview-card-body">
              Early assessment can often prevent symptoms from becoming more complex and can give
              you a clearer sense of what to expect in the months ahead.
            </p>
          </article>
          <div className="treatments-overview-media" aria-hidden="true">
            <div className="treatments-overview-media-inner">
              <video
                className="treatments-overview-video"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              >
                <source src="/assets/videos/post-43.av1.mp4" type='video/mp4; codecs="av01.0.05M.08"' />
                <source src="/assets/videos/post-43.h264.mp4" type='video/mp4; codecs="avc1.42E01E"' />
                <source src="/assets/videos/post-43.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section condition-treatment condition-approaches">
        <div className="treatments-overview-header">
          <h2 className="treatments-overview-title">Treatment approaches</h2>
          <p className="treatments-overview-subtitle">
            We combine minimally invasive procedures, rehabilitation and medication when needed to
            create a thoughtful treatment pathway rather than a single isolated procedure.
          </p>
        </div>
        <div className="condition-approaches-inner">
          <div className="condition-approaches-grid">
            <article className="condition-approach-card">
              <div
                className="condition-approach-media condition-approach-media-interventions"
                aria-hidden="true"
              />
              <div className="condition-approach-card-body">
                <h3 className="condition-approach-card-title">
                  Targeted <span>interventions</span>
                </h3>
                <div className="condition-approach-card-accent" />
                <p className="condition-approach-card-text">
                  Image‑guided procedures such as nerve blocks,{' '}
                  <Link to="/treatments/minimally-invasive-treatments/radiofrequency">
                    radiofrequency ablation
                  </Link>{' '}
                  or joint and spine injections can be used to reduce pain while preserving function
                  and supporting rehabilitation. These minimally invasive treatments are usually
                  performed as day‑case procedures in our clinic.
                </p>
                <p className="condition-approach-card-text">
                  For some conditions, surgical options such as{' '}
                  <Link to="/treatments/surgical-treatments/tubular-microsurgery">
                    tubular microsurgery
                  </Link>{' '}
                  or decompression may be considered. When this is the case, you will meet with a
                  spine surgeon to discuss risks, benefits and alternatives in detail.
                </p>
              </div>
            </article>
            <article className="condition-approach-card">
              <div
                className="condition-approach-media condition-approach-media-rehab"
                aria-hidden="true"
              />
              <div className="condition-approach-card-body">
                <h3 className="condition-approach-card-title">
                  Pharmacological and <span>rehabilitation</span>
                </h3>
                <div className="condition-approach-card-accent" />
                <p className="condition-approach-card-text">
                  Medication, physiotherapy and lifestyle measures frequently work together, helping
                  you to move with more confidence and regain autonomy in daily activities. We
                  favour stepwise, time‑limited use of medicines where possible, always balancing
                  symptom relief with safety.
                </p>
                <p className="condition-approach-card-text">
                  Our rehabilitation team provides structured programmes that may include{' '}
                  <Link to="/treatments/non-invasive-treatments/physiotherapy">physiotherapy</Link>
                  , guided exercise and functional training. When emotional or behavioural factors
                  play a role, we can also involve{' '}
                  <Link to="/treatments/non-invasive-treatments/psychology">psychology</Link> or{' '}
                  <Link to="/treatments/non-invasive-treatments/nutrition">nutrition</Link> support
                  so that your plan addresses the whole person, not just the painful area.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="page-section condition-treatment condition-syndromes">
        <div className="condition-syndromes-layout">
          <header className="condition-syndromes-header condition-syndromes-header-center">
            <p className="condition-syndromes-eyebrow">Most common patterns</p>
            <h2 className="condition-syndromes-title">How {areaLabel} can present</h2>
            <p className="condition-syndromes-subtitle">
              People experience pain in different ways. Exploring the pattern of your symptoms helps
              us match you with the most appropriate investigation and treatment.
            </p>
          </header>
          <div className="condition-syndromes-card" role="list">
            {DEFAULT_SYNDROMES.map((syndrome) => {
              const isActive = activeSyndromeId === syndrome.id;
              return (
                <div
                  key={syndrome.id}
                  className="condition-syndrome-item"
                  role="listitem"
                  aria-expanded={isActive}
                >
                  <button
                    type="button"
                    className={`condition-syndrome-row ${
                      isActive ? 'condition-syndrome-row-active' : ''
                    }`}
                    aria-expanded={isActive}
                    aria-controls={`condition-syndrome-panel-${syndrome.id}`}
                    onClick={() =>
                      setActiveSyndromeId((current) =>
                        current === syndrome.id ? null : syndrome.id,
                      )
                    }
                  >
                    <span className="condition-syndrome-label">{syndrome.label}</span>
                    <span
                      className={`condition-syndrome-icon ${
                        isActive ? 'condition-syndrome-icon-active' : ''
                      }`}
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </button>
                  <div
                    id={`condition-syndrome-panel-${syndrome.id}`}
                    className={`condition-syndrome-panel ${
                      isActive ? 'condition-syndrome-panel-open' : ''
                    }`}
                    role="region"
                    aria-hidden={!isActive}
                  >
                    <p className="condition-syndrome-panel-text">{syndrome.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="page-section condition-treatment condition-testimonials">
        <header className="condition-testimonials-header">
          <h2 className="condition-testimonials-title">Testimonials</h2>
        </header>
        <div className="condition-testimonials-grid">
          <blockquote className="condition-testimonial">
            <span className="condition-testimonial-quote" aria-hidden="true">
              ”
            </span>
            <p className="condition-testimonial-text">
              “From the first consultation I felt that my concerns were listened to and that there
              was a clear plan for how to move forward.”
            </p>
            <footer className="condition-testimonial-meta">
              <cite className="condition-testimonial-author">Jean‑François Cristau</cite>
              <span className="condition-testimonial-location">France</span>
            </footer>
          </blockquote>
          <blockquote className="condition-testimonial">
            <span className="condition-testimonial-quote" aria-hidden="true">
              ”
            </span>
            <p className="condition-testimonial-text">
              “After treatment and guided exercises I can now get on with my life with much less
              pain and more confidence.”
            </p>
            <footer className="condition-testimonial-meta">
              <cite className="condition-testimonial-author">Carole Lee</cite>
              <span className="condition-testimonial-location">The Netherlands</span>
            </footer>
          </blockquote>
        </div>
      </section>

      <section className="page-section condition-treatment condition-faq">
        <div className="condition-faq-inner">
          <header className="condition-faq-header">
            <h2 className="condition-faq-title">Frequently asked questions about {areaLabel}</h2>
            <p className="condition-faq-subtitle">
              Patients often share similar questions when they first contact us. These answers can
              help you decide on next steps and prepare for your consultation.
            </p>
          </header>
          <div className="condition-faq-grid">
            <article className="condition-faq-item">
              <h3 className="condition-faq-question">
                When should I see a specialist for {areaLabel}?
              </h3>
              <p className="condition-faq-answer">
                You should consider a specialist assessment if your symptoms have lasted more than a
                few weeks, are getting worse, limit your daily activities or are associated with
                worrying signs such as weakness, changes in sensation or difficulties with balance.
                If you are unsure, our team can review your situation and advise whether urgent
                investigation is needed.
              </p>
            </article>
            <article className="condition-faq-item">
              <h3 className="condition-faq-question">
                What happens during the first appointment for {areaLabel}?
              </h3>
              <p className="condition-faq-answer">
                Your first visit usually includes a detailed history, physical examination and
                review of any previous imaging or reports. We focus on understanding your goals,
                daily activities and any treatments you have already tried. Based on this
                information we propose a personalised plan, which may include further tests,
                rehabilitation, minimally invasive procedures or a surgical opinion.
              </p>
            </article>
            <article className="condition-faq-item">
              <h3 className="condition-faq-question">
                Will I always need injections or surgery for {areaLabel}?
              </h3>
              <p className="condition-faq-answer">
                No. Many people improve with a combination of education, tailored exercise, weight
                management, sleep optimisation and carefully chosen medication. Injections,{' '}
                <Link to="/treatments/minimally-invasive-treatments/vertebroplasty">
                  minimally invasive procedures
                </Link>{' '}
                or surgery are recommended only when the expected benefits clearly outweigh the
                risks and after a thorough discussion with you.
              </p>
            </article>
            <article className="condition-faq-item">
              <h3 className="condition-faq-question">
                Do you treat international patients with {areaLabel}?
              </h3>
              <p className="condition-faq-answer">
                Yes. Algarve Pain Centre regularly cares for patients visiting from other regions of
                Portugal and from abroad. Our team can help coordinate investigations, treatment and
                follow‑up around your travel plans so that you can benefit from specialist care in
                the Algarve while maintaining continuity with your local doctors.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="page-section condition-treatment condition-contact">
        <div className="contact-visit-layout condition-contact-layout">
          <div className="condition-contact-form-column">
            <h2 className="contact-form-title">Talk to our team</h2>
            <p className="contact-form-subtitle">
              Share your symptoms and questions, and we will help you understand the cause and plan
              the next step in your care.
            </p>
            <form
              className="contact-form"
              onSubmit={(event) => {
                event.preventDefault();
              }}
            >
              <div className="contact-form-field">
                <label className="contact-form-label" htmlFor="condition-contact-first-name">
                  Name
                </label>
                <div className="contact-form-name-row">
                  <input
                    id="condition-contact-first-name"
                    type="text"
                    className="contact-input"
                    placeholder="First Name"
                  />
                  <input
                    id="condition-contact-last-name"
                    type="text"
                    className="contact-input"
                    placeholder="Last Name"
                  />
                </div>
              </div>
              <div className="contact-form-field">
                <label className="contact-form-label" htmlFor="condition-contact-email">
                  Email <span className="contact-label-required">*</span>
                </label>
                <input
                  id="condition-contact-email"
                  type="email"
                  className="contact-input"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div className="contact-form-field">
                <label className="contact-form-label" htmlFor="condition-contact-phone">
                  Phone
                </label>
                <div className="contact-form-phone-row">
                  <span className="contact-phone-flag" aria-hidden="true">
                    🇵🇹
                  </span>
                  <input
                    id="condition-contact-phone"
                    type="tel"
                    className="contact-input"
                    placeholder="+351 000 000 000"
                  />
                </div>
              </div>
              <div className="contact-form-field">
                <label className="contact-form-label" htmlFor="condition-contact-message">
                  Message <span className="contact-label-required">*</span>
                </label>
                <textarea
                  id="condition-contact-message"
                  className="contact-textarea"
                  placeholder="Tell us more about your pain, symptoms or questions..."
                  rows={4}
                  required
                />
              </div>
              <div className="contact-form-footer-row">
                <label className="contact-form-human">
                  <input type="checkbox" className="contact-human-checkbox" />
                  <span>I am human</span>
                </label>
                <div className="contact-form-captcha-placeholder" aria-hidden="true">
                  <span>reCAPTCHA</span>
                </div>
              </div>
              <div className="contact-form-actions">
                <button type="submit" className="contact-form-submit treatment-card-button">
                  <span>Submit</span>
                </button>
              </div>
            </form>
          </div>
          <div className="contact-visit-map">
            <ManagedEmbed
              title="Algarve Pain Centre location"
              type="map"
              src="https://www.google.com/maps?q=Algarve+Pain+Centre+Av.+do+Mar+Vale+do+Lobo+Algarve+8135-107+Almancil&z=16&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              openHref="https://maps.google.com/?q=Algarve+Pain+Centre+Av.+do+Mar+Vale+do+Lobo+Algarve+8135-107+Almancil"
            />
          </div>
        </div>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonForHtmlScript(structuredDataJson) }}
      />
    </main>
  );
};

export default ConditionDetailPage;
