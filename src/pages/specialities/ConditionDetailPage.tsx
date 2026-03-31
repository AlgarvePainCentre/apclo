import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { serializeJsonForHtmlScript } from '../../utils/security';
import ArticleBreadcrumb from '../../components/ArticleBreadcrumb';
import ArticlePrevNextNav from '../../components/ArticlePrevNextNav';
import LumbarInterventions from '../../components/LumbarInterventions';

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
    heroImage: "/assets/images/resources/Cervical-1.jpg",
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
    heroImage: "/assets/images/lumbar/hero-banner.jpg",
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
    heroImage: "/assets/images/illustrative/Shoulder-Pain-min-1.jpg",
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
    heroImage: "/assets/images/illustrative/Hand-and-Elbow-Pain-min.jpg",
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
    heroImage: "/assets/images/illustrative/Hip-and-Groin-Pain-min.jpg",
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
    heroImage: "/assets/images/illustrative/Knee-Pain-min.jpg",
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
    heroImage: "/assets/images/illustrative/Thoracic-Wall-Pain-min.jpg",
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
    heroImage: "/assets/images/illustrative/pain-medicine-algarve-min.jpg",
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
    heroImage: "/assets/images/illustrative/pelvic-pain-min.jpg",
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
    heroImage: "/assets/images/illustrative/Head-Pain-min.jpg",
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
    heroImage: "/assets/images/illustrative/Head-Pain-min.jpg",
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
    heroImage: "/assets/images/medical/ankle-pain-min.jpg",
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
    heroImage: "/assets/images/illustrative/injuries-min.jpg",
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
    heroImage: "/assets/images/illustrative/prevention-min.jpg",
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
    heroImage: "/assets/images/illustrative/rehabilitation-min.jpg",
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
    heroImage: "/assets/images/illustrative/performance-min.jpg",
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
    heroImage: "/assets/images/illustrative/Psychology-min-1.jpg",
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
    heroImage: "/assets/images/illustrative/Nutrition-min-1.jpg",
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
    heroImage: "/assets/images/illustrative/stroke-prevention-min.jpg",
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
    heroImage: "/assets/images/learn/DSC07089.jpg",
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
    heroImage: "/assets/images/illustrative/Speech-Therapy-min-1.jpg",
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
    heroImage: "/assets/images/illustrative/mood-disorders-min.jpg",
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
    heroImage: "/assets/images/illustrative/post-stroke-min.jpg",
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
    heroImage: "/assets/images/learn/DSC07598-1.jpg",
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
    heroImage: "/assets/images/illustrative/Hand-and-Elbow-Pain-min.jpg",
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
    heroImage: "/assets/images/learn/DSC07600.jpg",
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
    heroImage: "/assets/images/illustrative/rehabilitation-min.jpg",
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

const ConditionDetailPage: React.FC<ConditionDetailPageProps> = ({
  title,
  areaLabel,
  mainClassName,
  variant = 'default',
  heroSubtitle,
  heroEyebrow,
}) => {
  const location = useLocation();
  const locationMapIframeRef = React.useRef<HTMLIFrameElement | null>(null);
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
  const accordionSyndromes =
    slugBase === 'knee-pain'
      ? KNEE_MOST_COMMON_SYNDROMES
      : slugBase === 'hip-and-groin-pain'
        ? HIP_MOST_COMMON_SYNDROMES
        : syndromes;
  const [activeSyndromeId, setActiveSyndromeId] = React.useState<string | null>(() => accordionSyndromes[0]?.id ?? null);
  React.useEffect(() => {
    setActiveSyndromeId(accordionSyndromes[0]?.id ?? null);
  }, [accordionSyndromes]);
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

  React.useEffect(() => {
    const iframe = locationMapIframeRef.current;
    if (!iframe) return undefined;

    const loadMap = () => {
      const dataSrc = iframe.getAttribute('data-src');
      if (dataSrc && !iframe.getAttribute('src')) {
        iframe.setAttribute('src', dataSrc);
      }
    };

    if (typeof window === 'undefined') return undefined;
    if (!('IntersectionObserver' in window)) {
      loadMap();
      return undefined;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          loadMap();
          io.disconnect();
        });
      },
      { threshold: 0.15 },
    );
    io.observe(iframe);
    return () => io.disconnect();
  }, []);

  if (variant === 'pain-specialty-clone') {
    const defaultHeroImage = '/assets/images/illustrative/pain-medicine-algarve-min.jpg';
    const defaultOverview = [
      'Pain in this area can have many causes, including joint, muscle, nerve and postural factors. During your first consultation we explore how your symptoms started, how they have evolved over time and which movements or activities make them better or worse.',
      'We also look carefully at your medical history, lifestyle and previous treatments. Some people come to us after years of trying isolated approaches without a clear plan. Others seek support early, when symptoms are starting to interfere with work, sport or sleep.',
      'Common goals include reducing flare‑ups, improving confidence in movement and protecting long‑term joint and spine health. Many people benefit from a combination of these elements over time.',
    ];
    const pageContent = PAIN_MEDICINE_PAGE_CONTENT[slugBase];
    const heroImage = pageContent?.heroImage ?? defaultHeroImage;
    const overviewParagraphs = pageContent?.overview ?? defaultOverview;

    return (
      <div
        className="psx-page"
        id={`psx-${slugBase}`}
        style={
          {
            '--psx-hero-image': `url('${heroImage}')`,
          } as React.CSSProperties
        }
      >
        <header className="psx-hero">
          <div className="psx-hero-backdrop" aria-hidden="true" />
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
                    <source src="/assets/videos/post-43.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </div>
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
                        src="/assets/images/treatment-img/No-Invasive.png"
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
                        src="/assets/images/treatment-img/Minimally-Invasive.png"
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
                        to="/treatments#treatments-minimally-invasive"
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
                        src="/assets/images/treatment-img/Surgical.png"
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
                    src="/assets/images/lumbar-cards/RadicularPain.jpg"
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
                    src="/assets/images/lumbar-cards/FacetJointSyndrome.jpg"
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
                    src="/assets/images/lumbar-cards/SacroiliacJointPain.jpg"
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
                    src="/assets/images/lumbar-cards/LumbarSpinalStenosis.jpg"
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
                    src="/assets/images/lumbar-cards/DiscogenicPain.jpg"
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
                <LumbarInterventions />
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

          {slugBase !== 'knee-pain' && slugBase !== 'hip-and-groin-pain' && (
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
              <div className="location-grid">
                <div className="location-details" aria-label="Address and opening hours">
                  <address className="location-address">
                    Av. do Mar
                    <br />
                    8135-107, Portugal
                  </address>
                  <a className="location-phone" href="tel:+351915915001" aria-label="Call +351 915 915 001">
                    <span className="location-phone-text">+351 915 915 001</span>
                  </a>
                  <div className="location-hours" aria-label="Hours of operation">
                    <div className="location-hours-title">Hours of Operation:</div>
                    <div className="location-hours-list" role="list">
                      <div className="location-hours-row" role="listitem">
                        <span className="location-hours-day">Monday</span>
                        <span className="location-hours-time">09:00 - 18:00</span>
                      </div>
                      <div className="location-hours-row" role="listitem">
                        <span className="location-hours-day">Tuesday</span>
                        <span className="location-hours-time">09:00 - 18:00</span>
                      </div>
                      <div className="location-hours-row" role="listitem">
                        <span className="location-hours-day">Wednesday</span>
                        <span className="location-hours-time">09:00 - 18:00</span>
                      </div>
                      <div className="location-hours-row" role="listitem">
                        <span className="location-hours-day">Thursday</span>
                        <span className="location-hours-time">09:00 - 18:00</span>
                      </div>
                      <div className="location-hours-row" role="listitem">
                        <span className="location-hours-day">Friday</span>
                        <span className="location-hours-time">09:00 - 18:00</span>
                      </div>
                    </div>
                  </div>
                  <Link
                    className="navbar-cta navbar-cta-desktop navbar-cta-dark location-book-cta"
                    aria-label="Book now"
                    to="/contact"
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
                        <line x1="7" y1="17" x2="17" y2="7" />
                        <polyline points="7 7 17 7 17 17" />
                      </svg>
                    </span>
                  </Link>
                </div>
                <div className="location-map" aria-label="Map">
                  <iframe
                    ref={locationMapIframeRef}
                    className="location-map-iframe"
                    title="Business location map"
                    data-src="https://www.google.com/maps?q=Av.+do+Mar+8135-107+Portugal&z=16&output=embed"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </section>

          <ArticlePrevNextNav
            items={SPECIALITIES_NAV_ITEMS as unknown as { to: string; title: string }[]}
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
                src="/assets/videos/post-43.mp4"
              />
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
            <iframe
              title="Algarve Pain Centre location"
              src="https://www.google.com/maps?q=Algarve+Pain+Centre+Av.+do+Mar+Vale+do+Lobo+Algarve+8135-107+Almancil&z=16&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
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
