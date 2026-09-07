// Pain Medicine speciality page content, navigation and syndrome data.
// Extracted verbatim from ConditionDetailPage.tsx to keep that component presentational.

export type Syndrome = {
  id: string;
  label: string;
  description: string;
};

export const DEFAULT_SYNDROMES: Syndrome[] = [
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

export const PAIN_MEDICINE_PAGE_CONTENT: Record<
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

export const KNEE_MOST_COMMON_SYNDROMES: Syndrome[] = [
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

export const HIP_MOST_COMMON_SYNDROMES: Syndrome[] = [
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

export const HEAD_MOST_COMMON_SYNDROMES: Syndrome[] = [
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

export const CERVICAL_MOST_COMMON_SYNDROMES: Syndrome[] = [
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

export const SHOULDER_MOST_COMMON_SYNDROMES: Syndrome[] = [
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

export const HAND_ELBOW_MOST_COMMON_SYNDROMES: Syndrome[] = [
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

export const THORACIC_WALL_MOST_COMMON_SYNDROMES: Syndrome[] = [
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

export const ABDOMINAL_WALL_MOST_COMMON_SYNDROMES: Syndrome[] = [
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

export const PELVIC_MOST_COMMON_SYNDROMES: Syndrome[] = [
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

export const FACIAL_MOST_COMMON_SYNDROMES: Syndrome[] = [
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

export const FOOT_ANKLE_MOST_COMMON_SYNDROMES: Syndrome[] = [
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
