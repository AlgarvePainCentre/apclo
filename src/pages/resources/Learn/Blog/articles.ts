export type ArticleBlock =
  | { type: 'p'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'img'; src: string; alt: string; caption?: string }
  | { type: 'video'; src: string; title: string; caption?: string; poster?: string };

export type ArticleSection = {
  id: string;
  heading: string;
  blocks: ArticleBlock[];
};

export type ArticleReference = {
  label: string;
  url: string;
};

export type ArticleQuickFact = {
  label: string;
  value: string;
};

export type ArticleFaqItem = {
  question: string;
  answer: string;
};

export type ArticleMedicalEntity =
  | ({ '@type': 'SurgicalProcedure' | 'MedicalProcedure' | 'TherapeuticProcedure' } & Record<string, unknown>)
  | ({ '@type': 'MedicalTherapy' } & Record<string, unknown>);

export type BlogArticle = {
  slug: string;
  title: string;
  dateISO: string;
  description: string;
  category: string;
  tags: string[];
  coverImage: { src: string; alt: string };
  author: { name: string; role: string; bio: string };
  reviewedBy?: { name: string; role: string };
  updatedISO?: string;
  quickFacts?: ArticleQuickFact[];
  checklist?: { title: string; items: string[] };
  faq?: ArticleFaqItem[];
  cta?: { primaryLabel: string; primaryTo: string; secondaryLabel: string; secondaryAction: 'print-checklist' };
  medicalEntity?: ArticleMedicalEntity;
  sections: ArticleSection[];
  references: ArticleReference[];
  relatedSlugs: string[];
};

const clinicAuthor = {
  name: 'Algarve Pain Centre',
  role: 'Clinical team',
  bio:
    'Our multidisciplinary clinicians work across pain medicine, rehabilitation, psychology, and stroke care. We translate clinical evidence into practical guidance you can use at home, while encouraging you to seek individual assessment for persistent or severe symptoms.',
};

const commonReferences: ArticleReference[] = [
  { label: 'NHS (UK) — Health A to Z', url: 'https://www.nhs.uk/conditions/' },
  { label: 'Mayo Clinic — Diseases & Conditions', url: 'https://www.mayoclinic.org/diseases-conditions' },
  { label: 'CDC — Healthy Living', url: 'https://www.cdc.gov/healthyliving/index.html' },
  { label: 'WHO — Health topics', url: 'https://www.who.int/health-topics' },
  { label: 'Cochrane — Evidence summaries', url: 'https://www.cochrane.org/evidence' },
];

const strokeReferences: ArticleReference[] = [
  { label: 'World Health Organization — Stroke', url: 'https://www.who.int/health-topics/stroke' },
  { label: 'NHS (UK) — Stroke', url: 'https://www.nhs.uk/conditions/stroke/' },
  { label: 'AHA/ASA — Stroke resources', url: 'https://www.stroke.org/' },
  { label: 'NICE — Stroke and TIA guidance', url: 'https://www.nice.org.uk/guidance' },
  { label: 'Cochrane — Stroke evidence', url: 'https://www.cochrane.org' },
];

type TopicConfig = {
  slug: string;
  title: string;
  category: BlogArticle['category'];
  dateISO: string;
  description: string;
  tags: string[];
  coverImage: BlogArticle['coverImage'];
  specificBullets: string[];
  relatedSlugs: string[];
};

const buildPainArticleSections = (cfg: TopicConfig): ArticleSection[] => {
  const topic = cfg.title;
  return [
    {
      id: 'overview',
      heading: 'Overview',
      blocks: [
        {
          type: 'p',
          text:
            `${topic} is a broad label rather than a single diagnosis. Pain is a protective signal produced by the nervous system, influenced by tissue health, load, sleep, stress, and previous injury. Because many different conditions can present with similar symptoms, a structured approach—history, examination, and targeted tests—helps identify the most likely drivers and the safest next steps.`,
        },
        {
          type: 'p',
          text:
            'Most musculoskeletal pain improves with time and appropriate activity. A small proportion is linked to specific problems that benefit from early medical review (for example, serious infection, fracture, progressive nerve deficits, or systemic illness). The aim of this guide is to help you recognise common patterns, understand red flags, and make informed decisions about self-care and when to seek assessment.',
        },
        { type: 'img', src: cfg.coverImage.src, alt: cfg.coverImage.alt, caption: 'Illustrative image.' },
      ],
    },
    {
      id: 'causes',
      heading: 'Common causes and contributing factors',
      blocks: [
        {
          type: 'p',
          text:
            `Pain in this area can be linked to overload, tendon or muscle irritation, joint sensitivity, nerve irritation, or pain that is referred from nearby regions. In many cases, imaging findings (such as “degeneration” on scans) do not perfectly match symptoms. That is why clinicians rely on function, symptom behaviour, and a full history rather than a scan result alone.`,
        },
        {
          type: 'p',
          text:
            'Contributing factors often include a rapid jump in training or activity, prolonged static postures, insufficient sleep, increased psychological stress, and deconditioning after injury. These factors are modifiable. A plan that blends graded movement, strength work, and symptom-calming strategies typically improves both pain and confidence with activity.',
        },
        { type: 'h3', text: 'Topic-specific considerations' },
        { type: 'ul', items: cfg.specificBullets },
      ],
    },
    {
      id: 'symptoms',
      heading: 'Symptoms, red flags, and when to seek help',
      blocks: [
        {
          type: 'p',
          text:
            'Pain varies in quality—dull, sharp, aching, burning—and can fluctuate by time of day, movement, or stress. It is helpful to note what makes symptoms better or worse, whether pain is spreading, and whether daily function is changing. Tracking these patterns supports more accurate diagnosis and helps measure progress over time.',
        },
        { type: 'h3', text: 'Red flags that warrant urgent assessment' },
        {
          type: 'ul',
          items: [
            'New or worsening weakness, numbness, or loss of coordination.',
            'Loss of bladder or bowel control, or numbness in the saddle area.',
            'Fever, unexplained weight loss, night sweats, or a history of cancer with new pain.',
            'Severe pain after significant trauma, or pain with suspected fracture.',
            'Sudden severe headache, facial droop, speech difficulty, or chest pain (seek emergency care).',
          ],
        },
        {
          type: 'p',
          text:
            'If symptoms persist beyond a few weeks, repeatedly interrupt sleep, or limit work and daily activities, an assessment can help identify drivers and prevent unnecessary fear or avoidance. Early, personalised guidance often reduces time-to-recovery.',
        },
      ],
    },
    {
      id: 'assessment',
      heading: 'How clinicians assess and diagnose',
      blocks: [
        {
          type: 'p',
          text:
            'A good assessment starts with your story: onset, aggravating and easing factors, previous injuries, medical history, medications, and goals. The examination looks for strength and mobility changes, provocation patterns, nerve function, and movement quality. Clinicians also screen for non-musculoskeletal causes when symptoms do not match a typical pattern.',
        },
        {
          type: 'p',
          text:
            'Imaging (X‑ray, ultrasound, CT, MRI) is used selectively—when it changes management or when serious pathology is suspected. Blood tests may be appropriate if inflammatory or systemic causes are possible. Many people benefit from a diagnosis phrased in functional terms (for example, “load intolerance” or “movement sensitivity”) alongside medical differentials.',
        },
      ],
    },
    {
      id: 'treatment',
      heading: 'Evidence-informed treatment options',
      blocks: [
        {
          type: 'p',
          text:
            'Treatment should match the likely driver. For many people, a blended plan works best: education, graded exercise, manual therapy where appropriate, and targeted pain management strategies. Medications can reduce symptoms for some conditions, but they are most effective when paired with active rehabilitation and lifestyle support.',
        },
        { type: 'h3', text: 'Common components of a plan' },
        {
          type: 'ul',
          items: [
            'Graded activity: start below flare threshold and increase stepwise each week.',
            'Strength and mobility: address key joints and muscle groups that support the painful region.',
            'Pain modulation: heat/cold, pacing, breathing, relaxation, and sleep routines.',
            'Manual therapy or soft-tissue work when it improves confidence and short-term tolerance.',
            'Behaviour change: realistic goals, consistent routines, and addressing fear of movement.',
          ],
        },
        {
          type: 'p',
          text:
            'Persistent pain sometimes needs a multidisciplinary approach (for example, physiotherapy plus psychology or medical review). This is not “pain in your head”; it reflects the way the brain and nervous system adapt. The aim is to restore function and reduce disability, even if pain does not disappear immediately.',
        },
      ],
    },
    {
      id: 'self-care',
      heading: 'Practical self-care steps you can start today',
      blocks: [
        {
          type: 'p',
          text:
            'Start with the smallest actions you can do consistently. Short, frequent movement breaks often help more than long, irregular workouts. Choose one or two exercises you can perform with tolerable discomfort (for example, 0–3/10 increase during the activity that settles within 24 hours). Consistency is more important than intensity.',
        },
        {
          type: 'ul',
          items: [
            'Aim for regular sleep and wake times; reduce late caffeine and alcohol when possible.',
            'Use pacing: alternate demanding and lighter tasks to avoid boom-bust cycles.',
            'Build a walking baseline (even 5–10 minutes) and progress gradually.',
            'Strengthen supporting muscles 2–3 days per week with simple movements.',
            'Seek review if pain is worsening or function is declining despite consistent care.',
          ],
        },
        {
          type: 'p',
          text:
            'This article provides general education and does not replace personal medical advice. If you have severe, sudden, or progressive symptoms, seek urgent medical assessment.',
        },
      ],
    },
  ];
};

const buildSportsTopicSections = (cfg: TopicConfig): ArticleSection[] => {
  const topic = cfg.title;
  return [
    {
      id: 'overview',
      heading: 'Overview',
      blocks: [
        {
          type: 'p',
          text:
            `${topic} is best approached as a process: understand your current capacity, apply the right dose of load, and monitor response over time. Whether you are returning after injury or trying to improve performance, the foundations are consistent—sleep, progressive training, recovery planning, and good decision-making when symptoms arise.`,
        },
        {
          type: 'p',
          text:
            'Sports medicine and rehabilitation focus on function. Rather than asking only “What is the diagnosis?”, clinicians also ask “What can you safely do now?” and “What needs to change to reduce risk and increase resilience?” This guide outlines practical strategies that align with common evidence-based principles used in clinical and athletic settings.',
        },
        { type: 'img', src: cfg.coverImage.src, alt: cfg.coverImage.alt, caption: 'Illustrative image.' },
      ],
    },
    {
      id: 'principles',
      heading: 'Key principles that drive results',
      blocks: [
        {
          type: 'p',
          text:
            'The body adapts to what you repeatedly do. Most setbacks occur when load (intensity, volume, frequency) increases faster than tissues can adapt, or when recovery is insufficient. A simple rule: plan progression, monitor symptoms, and adjust early. This reduces the “all-or-nothing” pattern that often prolongs pain or delays return to sport.',
        },
        { type: 'h3', text: 'Practical focus areas' },
        { type: 'ul', items: cfg.specificBullets },
        {
          type: 'p',
          text:
            'Progress is rarely linear. Minor flare-ups can be part of recovery. The goal is to keep symptoms within a manageable band and maintain confidence. If symptoms repeatedly worsen or you are losing function, an assessment can refine your plan and rule out problems that need different management.',
        },
      ],
    },
    {
      id: 'plan',
      heading: 'A simple plan you can follow',
      blocks: [
        {
          type: 'p',
          text:
            'Start by defining a baseline you can repeat without a significant flare. Then increase one variable at a time (for example, volume before intensity). Track response over 24–48 hours. This approach is used in many return-to-sport pathways and helps you progress without guessing.',
        },
        {
          type: 'ul',
          items: [
            'Baseline: choose 2–3 key exercises and a conditioning activity you can tolerate.',
            'Progress: increase total work by small steps (often 5–15%) each week as tolerated.',
            'Recover: protect sleep, plan rest days, and fuel training appropriately.',
            'Reassess: every 2–4 weeks, retest function (range, strength, tolerance, confidence).',
          ],
        },
      ],
    },
    {
      id: 'when-to-seek-help',
      heading: 'When to seek assessment',
      blocks: [
        {
          type: 'p',
          text:
            'Seek professional review if you have persistent swelling, locking or giving-way, progressive weakness, night pain that is unexplained, neurological symptoms, or repeated re-injury. Early review helps rule out conditions that need targeted management and shortens time away from training.',
        },
      ],
    },
  ];
};

const buildStrokeTopicSections = (cfg: TopicConfig): ArticleSection[] => {
  const topic = cfg.title;
  return [
    {
      id: 'overview',
      heading: 'Overview',
      blocks: [
        {
          type: 'p',
          text:
            `${topic} after stroke is often influenced by both physical changes (strength, coordination, sensation, spasticity, fatigue) and environmental factors (home setup, caregiver support, access to therapy). Recovery is highly individual. Many people continue to improve for months—and sometimes years—when training is specific, meaningful, and progressive.`,
        },
        {
          type: 'p',
          text:
            'This guide focuses on practical, evidence-aligned concepts used in stroke rehabilitation: goal-directed practice, repetition, task specificity, and risk management. It also highlights common complications and when to seek urgent medical assessment.',
        },
        { type: 'img', src: cfg.coverImage.src, alt: cfg.coverImage.alt, caption: 'Illustrative image.' },
      ],
    },
    {
      id: 'what-to-expect',
      heading: 'What to expect and why it matters',
      blocks: [
        {
          type: 'p',
          text:
            'After a stroke, the brain must reorganise networks to support movement, speech, mood, and daily activities. This is often described as neuroplasticity. Rehabilitation works best when practice is frequent, challenging-but-safe, and connected to real life (for example, cooking, walking, speaking with family, or managing medication).',
        },
        { type: 'h3', text: 'Key focus areas' },
        { type: 'ul', items: cfg.specificBullets },
      ],
    },
    {
      id: 'safety',
      heading: 'Safety, prevention, and medical follow-up',
      blocks: [
        {
          type: 'p',
          text:
            'Secondary prevention reduces the risk of another stroke. This often includes blood pressure control, diabetes and cholesterol management, smoking cessation, physical activity, and medication adherence (for example, antiplatelets or anticoagulants when prescribed). Follow your clinician’s plan and attend regular reviews.',
        },
        {
          type: 'p',
          text:
            'Seek urgent medical help if new stroke symptoms occur: facial droop, arm weakness, speech problems, severe sudden headache, new confusion, or sudden vision loss. Time-sensitive treatment can be lifesaving and may reduce disability.',
        },
      ],
    },
    {
      id: 'plan',
      heading: 'A practical rehabilitation plan',
      blocks: [
        {
          type: 'p',
          text:
            'Good plans are personalised and measurable. They include specific exercises, task practice (for example, transfers, stairs, grip tasks), and strategies to reduce fatigue. Many people benefit from coordinated input across physiotherapy, occupational therapy, speech and language therapy, psychology, and medical oversight.',
        },
        {
          type: 'ul',
          items: [
            'Set 1–3 meaningful goals for the next month (for example, prepare breakfast safely, walk to the garden, or speak clearly on the phone).',
            'Practise tasks in small blocks daily; quality and repetition are both important.',
            'Adapt the environment: handrails, seating height, lighting, and clutter reduction can improve safety.',
            'Review mood and sleep; depression and anxiety are common and treatable.',
            'Reassess progress frequently and progress the challenge safely.',
          ],
        },
      ],
    },
  ];
};

const topics: TopicConfig[] = [
  {
    slug: 'about-head-pain',
    title: 'About head pain',
    category: 'Pain medicine',
    dateISO: '2024-05-15',
    description: 'A practical overview of head pain patterns, common causes, red flags, and evidence-informed options.',
    tags: ['headache', 'migraine', 'education', 'self-care'],
    coverImage: { src: '/assets/images/illustrative/Head-Pain-min.jpg', alt: 'Illustration representing head pain and headache.' },
    specificBullets: [
      'Primary headaches (migraine, tension-type, cluster) are common and often diagnosed clinically.',
      'Secondary headaches can occur with infection, bleeding, blood pressure issues, or medication overuse.',
      'Visual symptoms, nausea, light sensitivity, and activity intolerance often suggest migraine patterns.',
      'Neck and jaw factors can contribute, but do not always mean the neck is the “cause”.',
    ],
    relatedSlugs: ['facial-pain', 'psychology', 'nutrition', 'prevention'],
  },
  {
    slug: 'cervical-spine-pain',
    title: 'Cervical spine pain',
    category: 'Pain medicine',
    dateISO: '2024-05-10',
    description: 'Understand neck pain drivers, red flags, and a graded plan to restore confident movement.',
    tags: ['neck pain', 'spine', 'rehabilitation', 'posture'],
    coverImage: { src: '/assets/images/illustrative/pain-medicine-algarve-min.jpg', alt: 'Clinical illustration related to spine and pain medicine.' },
    specificBullets: [
      'Common contributors include sustained postures, sudden increases in load, and reduced cervical strength/endurance.',
      'Arm symptoms (tingling, numbness) may reflect nerve irritation and should be assessed if persistent.',
      'Dizziness, severe headache, or neurological symptoms need urgent medical assessment.',
      'Strength and movement retraining often outperform passive approaches alone over time.',
    ],
    relatedSlugs: ['shoulder-pain', 'about-head-pain', 'rehabilitation', 'psychology'],
  },
  {
    slug: 'lumbar-spine-pain',
    title: 'Lumbar spine pain',
    category: 'Pain medicine',
    dateISO: '2024-05-05',
    description: 'Back pain education: what is common, what is urgent, and how to build a stepwise recovery plan.',
    tags: ['back pain', 'spine', 'exercise', 'self-management'],
    coverImage: { src: '/assets/images/illustrative/Lumber-Spine-Pain-min.jpg', alt: 'Illustration representing lumbar spine pain.' },
    specificBullets: [
      'Most low back pain is non-specific and improves with movement, graded strength, and time.',
      'Leg pain, pins-and-needles, or weakness may suggest nerve root involvement (sciatica).',
      'Bladder/bowel changes or saddle numbness are urgent red flags.',
      'Staying active within tolerance is usually safer than prolonged bed rest.',
    ],
    relatedSlugs: ['rehabilitation', 'injuries', 'prevention', 'nutrition'],
  },
  {
    slug: 'shoulder-pain',
    title: 'Shoulder pain',
    category: 'Pain medicine',
    dateISO: '2024-04-28',
    description: 'A clear guide to shoulder pain patterns, common diagnoses, and progressive rehab steps.',
    tags: ['shoulder', 'tendon', 'rotator cuff', 'rehab'],
    coverImage: { src: '/assets/images/illustrative/Shoulder-Pain-min-1.jpg', alt: 'Illustration representing shoulder pain.' },
    specificBullets: [
      'Rotator cuff-related pain is common and often responds to strength and load management.',
      'Frozen shoulder (adhesive capsulitis) causes progressive stiffness and needs targeted guidance.',
      'Night pain and marked weakness after trauma may suggest more significant injury.',
      'Neck referral can mimic shoulder pain; assessment helps differentiate.',
    ],
    relatedSlugs: ['hand-and-elbow-pain', 'cervical-spine-pain', 'rehabilitation', 'injuries'],
  },
  {
    slug: 'hand-and-elbow-pain',
    title: 'Hand and elbow pain',
    category: 'Pain medicine',
    dateISO: '2024-04-20',
    description: 'From tendinopathy to nerve irritation: a structured approach to hand and elbow pain.',
    tags: ['elbow', 'hand', 'tendinopathy', 'nerve'],
    coverImage: { src: '/assets/images/illustrative/Hand-and-Elbow-Pain-min.jpg', alt: 'Illustration representing hand and elbow pain.' },
    specificBullets: [
      'Common causes include tendinopathy (tennis/golfer’s elbow), overuse, and joint irritation.',
      'Nerve symptoms (numbness/tingling) can arise from the neck, elbow, or wrist.',
      'Ergonomics and load pacing often reduce flare-ups in desk or manual work.',
      'Hand swelling, colour changes, or severe hypersensitivity should be assessed promptly.',
    ],
    relatedSlugs: ['shoulder-pain', 'cervical-spine-pain', 'injuries', 'complex-regional-pain-syndrome'],
  },
  {
    slug: 'hip-and-groin-pain',
    title: 'Hip and groin pain',
    category: 'Pain medicine',
    dateISO: '2024-04-15',
    description: 'Hip and groin pain explained: common patterns, how clinicians assess it, and what helps.',
    tags: ['hip', 'groin', 'strength', 'mobility'],
    coverImage: { src: '/assets/images/illustrative/Hip-and-Groin-Pain-min.jpg', alt: 'Illustration representing hip and groin pain.' },
    specificBullets: [
      'Hip joint, tendon, and referred pain can feel similar; location alone is not diagnostic.',
      'Activity-related groin pain may reflect hip joint sensitivity or load intolerance.',
      'Night pain, fever, or inability to bear weight after trauma requires urgent review.',
      'Progressive strengthening of gluteal and hip stabilisers is often central to recovery.',
    ],
    relatedSlugs: ['knee-pain', 'rehabilitation', 'injuries', 'performance'],
  },
  {
    slug: 'knee-pain',
    title: 'Knee pain',
    category: 'Pain medicine',
    dateISO: '2024-04-10',
    description: 'Knee pain doesn’t always mean damage: learn patterns, red flags, and graded return to activity.',
    tags: ['knee', 'running', 'strength', 'osteoarthritis'],
    coverImage: { src: '/assets/images/illustrative/Knee-Pain-min.jpg', alt: 'Illustration representing knee pain.' },
    specificBullets: [
      'Anterior knee pain often relates to load tolerance and hip/knee strength rather than “misalignment”.',
      'Swelling after twisting injury, locking, or giving-way needs assessment.',
      'Osteoarthritis pain can improve with strength training and weight management when relevant.',
      'Return-to-run should be gradual with capacity-based progression.',
    ],
    relatedSlugs: ['foot-and-ankle-pain', 'hip-and-groin-pain', 'rehabilitation', 'injuries'],
  },
  {
    slug: 'thoracic-wall-pain',
    title: 'Thoracic wall pain',
    category: 'Pain medicine',
    dateISO: '2024-04-05',
    description: 'A guide to chest and thoracic wall pain: musculoskeletal causes, red flags, and recovery steps.',
    tags: ['thoracic', 'rib', 'breathing', 'chest pain'],
    coverImage: { src: '/assets/images/illustrative/Thoracic-Wall-Pain-min.jpg', alt: 'Illustration representing thoracic wall pain.' },
    specificBullets: [
      'Thoracic wall pain can be related to rib joints, intercostal muscles, and posture/load.',
      'Breathing-related sharp pain may reflect muscle or rib irritation but needs assessment when severe.',
      'Chest pressure, sweating, or shortness of breath can be cardiac—seek urgent care.',
      'Gentle mobility, breathing work, and gradual loading often improve tolerance.',
    ],
    relatedSlugs: ['cervical-spine-pain', 'lumbar-spine-pain', 'rehabilitation', 'psychology'],
  },
  {
    slug: 'abdominal-wall-pain',
    title: 'Abdominal wall pain',
    category: 'Pain medicine',
    dateISO: '2024-03-30',
    description: 'Differentiate abdominal wall pain from internal causes and learn evidence-informed options.',
    tags: ['abdominal', 'core', 'nerve', 'assessment'],
    coverImage: { src: '/assets/images/illustrative/pathologies-home-min.jpg', alt: 'Illustration representing abdominal and core-related pain.' },
    specificBullets: [
      'Abdominal wall pain can arise from muscles, nerve entrapment, or scars after surgery.',
      'Digestive, urinary, or gynaecological symptoms may suggest internal causes—seek medical review.',
      'Pain that is very local and worsens when tensing the abdominal muscles can suggest wall involvement.',
      'Progressive core reconditioning can help once serious causes are excluded.',
    ],
    relatedSlugs: ['pelvic-and-gynaecological-pain', 'rehabilitation', 'nutrition', 'psychology'],
  },
  {
    slug: 'pelvic-and-gynaecological-pain',
    title: 'Pelvic & gynaecological pain',
    category: 'Pain medicine',
    dateISO: '2024-03-25',
    description: 'Understand pelvic pain: common contributors, pelvic floor factors, and multidisciplinary care options.',
    tags: ['pelvic pain', 'women’s health', 'pelvic floor', 'care'],
    coverImage: { src: '/assets/images/illustrative/pelvic-pain-min.jpg', alt: 'Illustration representing pelvic and gynaecological pain.' },
    specificBullets: [
      'Pelvic pain can involve pelvic floor muscles, nerves, bladder/bowel sensitivity, and hormonal factors.',
      'Pain with fever, pregnancy, heavy bleeding, or sudden severe symptoms needs urgent review.',
      'Persistent pain often benefits from coordinated care (medical, pelvic health physio, psychology).',
      'Graded activity and calming strategies can reduce flare cycles and improve function.',
    ],
    relatedSlugs: ['abdominal-wall-pain', 'psychology', 'nutrition', 'rehabilitation'],
  },
  {
    slug: 'facial-pain',
    title: 'Facial pain',
    category: 'Pain medicine',
    dateISO: '2024-03-18',
    description: 'Facial pain patterns and causes, including trigeminal neuralgia, jaw contributors, and red flags.',
    tags: ['facial pain', 'trigeminal', 'jaw', 'headache'],
    coverImage: { src: '/assets/images/learn/5-Trigeminal-Neuralgia.jpg', alt: 'Illustration representing trigeminal neuralgia and facial pain.' },
    specificBullets: [
      'Sharp electric-shock pain can occur with trigeminal neuralgia and needs medical assessment.',
      'Jaw (TMJ) dysfunction, dental issues, and sinus conditions can mimic nerve pain.',
      'New facial weakness, drooping, or speech changes needs urgent assessment.',
      'Management often includes medical review plus targeted rehab for jaw/neck contributors when present.',
    ],
    relatedSlugs: ['about-head-pain', 'cervical-spine-pain', 'psychology', 'nutrition'],
  },
  {
    slug: 'foot-and-ankle-pain',
    title: 'Foot and ankle pain',
    category: 'Pain medicine',
    dateISO: '2024-03-10',
    description: 'Foot and ankle pain explained: common diagnoses, load management, and a progressive strengthening plan.',
    tags: ['foot', 'ankle', 'tendon', 'walking'],
    coverImage: { src: '/assets/images/illustrative/services-home-min-1.jpg', alt: 'Illustration representing foot and ankle care.' },
    specificBullets: [
      'Common issues include plantar heel pain, Achilles tendinopathy, ankle sprain, and arthritis.',
      'Sudden inability to bear weight after injury needs assessment and possible imaging.',
      'Foot strength, calf capacity, and footwear choices can influence symptoms.',
      'Gradual return-to-walk/run is key after flare-ups or injury.',
    ],
    relatedSlugs: ['knee-pain', 'injuries', 'prevention', 'rehabilitation'],
  },
  {
    slug: 'injuries',
    title: 'Injuries',
    category: 'Sports medicine',
    dateISO: '2024-02-28',
    description: 'How to respond to injuries: early decisions, load management, and a return-to-activity framework.',
    tags: ['injury', 'return to sport', 'rehab', 'load'],
    coverImage: { src: '/assets/images/illustrative/injuries-min.jpg', alt: 'Illustration representing sports injuries.' },
    specificBullets: [
      'Early protection without complete rest: maintain safe movement and circulation when possible.',
      'Swelling and pain are signals; use them to guide progression rather than to stop all activity.',
      'Rehab milestones should be functional (strength, hopping, running tolerance), not only time-based.',
      'Identify the training error that led to overload and change it before return.',
    ],
    relatedSlugs: ['rehabilitation', 'prevention', 'performance', 'psychology'],
  },
  {
    slug: 'prevention',
    title: 'Prevention',
    category: 'Sports medicine',
    dateISO: '2024-02-20',
    description: 'Reduce injury risk with progressive training, strength, sleep, and practical habits that stick.',
    tags: ['prevention', 'strength', 'sleep', 'training'],
    coverImage: { src: '/assets/images/illustrative/prevention-min.jpg', alt: 'Illustration representing injury prevention.' },
    specificBullets: [
      'Plan load: avoid sudden spikes in weekly volume or intensity.',
      'Strength training 2–3x/week improves resilience of tendons and joints.',
      'Sleep and nutrition are “training multipliers” that affect recovery and injury risk.',
      'Warm-ups that rehearse sport-specific movement can improve readiness.',
    ],
    relatedSlugs: ['injuries', 'rehabilitation', 'nutrition', 'performance'],
  },
  {
    slug: 'rehabilitation',
    title: 'Rehabilitation',
    category: 'Sports medicine',
    dateISO: '2024-02-12',
    description: 'Rehabilitation basics: set goals, build capacity, and return to activity with confidence.',
    tags: ['rehab', 'physiotherapy', 'strength', 'progression'],
    coverImage: { src: '/assets/images/illustrative/rehabilitation-min.jpg', alt: 'Illustration representing rehabilitation exercises.' },
    specificBullets: [
      'Use graded exposure: practise what you fear in a controlled, progressive way.',
      'Measure progress with repeatable tests (range, strength, functional tasks).',
      'Include whole-body conditioning, not only local exercises.',
      'Pain does not always mean harm; monitor response over 24–48 hours.',
    ],
    relatedSlugs: ['injuries', 'prevention', 'performance', 'psychology'],
  },
  {
    slug: 'performance',
    title: 'Performance',
    category: 'Sports medicine',
    dateISO: '2024-02-05',
    description: 'Build performance safely: strength, conditioning, recovery, and realistic progression.',
    tags: ['performance', 'training', 'conditioning', 'recovery'],
    coverImage: { src: '/assets/images/illustrative/performance-min.jpg', alt: 'Illustration representing sports performance training.' },
    specificBullets: [
      'Develop a base: aerobic capacity supports recovery and training tolerance.',
      'Strength improves force production and reduces load on passive structures.',
      'Use periodisation: alternate hard and easier weeks to consolidate adaptation.',
      'Monitor readiness with sleep, mood, and performance markers.',
    ],
    relatedSlugs: ['nutrition', 'psychology', 'prevention', 'rehabilitation'],
  },
  {
    slug: 'psychology',
    title: 'Psychology',
    category: 'Sports medicine',
    dateISO: '2024-01-28',
    description: 'Pain, stress, and performance: practical psychology tools to support recovery and resilience.',
    tags: ['psychology', 'stress', 'sleep', 'pain'],
    coverImage: { src: '/assets/images/illustrative/psychology-min-1.jpg', alt: 'Illustration representing psychology and mental wellbeing.' },
    specificBullets: [
      'Stress and poor sleep can increase pain sensitivity and slow recovery.',
      'Goal-setting and graded exposure reduce fear of movement after injury.',
      'Breathing and relaxation strategies can improve symptom regulation.',
      'Support systems (family, team, clinicians) improve adherence and outcomes.',
    ],
    relatedSlugs: ['nutrition', 'performance', 'rehabilitation', 'about-head-pain'],
  },
  {
    slug: 'nutrition',
    title: 'Nutrition',
    category: 'Sports medicine',
    dateISO: '2024-01-20',
    description: 'Nutrition for recovery and performance: fueling basics, hydration, and practical habits.',
    tags: ['nutrition', 'hydration', 'recovery', 'energy'],
    coverImage: { src: '/assets/images/illustrative/nutrition-min.jpg', alt: 'Illustration representing healthy nutrition choices.' },
    specificBullets: [
      'Adequate protein supports muscle repair and adaptation when paired with training.',
      'Carbohydrates support higher-intensity work and reduce perceived exertion for some athletes.',
      'Hydration matters for cognition, performance, and headache risk in some people.',
      'If you have medical conditions, seek personalised dietetic advice before major changes.',
    ],
    relatedSlugs: ['performance', 'prevention', 'psychology', 'about-head-pain'],
  },
  {
    slug: 'clinical-and-secondary-prevention-of-stroke',
    title: 'Clinical and secondary prevention of stroke',
    category: 'Stroke medicine',
    dateISO: '2024-01-12',
    description: 'Reduce the risk of recurrent stroke with evidence-informed medical follow-up and lifestyle strategies.',
    tags: ['stroke', 'prevention', 'blood pressure', 'medication'],
    coverImage: { src: '/assets/images/illustrative/stroke-prevention-min.jpg', alt: 'Illustration representing stroke prevention.' },
    specificBullets: [
      'Blood pressure control is one of the most effective ways to reduce recurrent stroke risk.',
      'Medication adherence (as prescribed) matters; clarify side effects and schedules with your clinician.',
      'Lifestyle changes work best when small, consistent, and supported by follow-up.',
      'Know FAST warning signs and seek emergency care immediately if they appear.',
    ],
    relatedSlugs: ['medical-complications-post-stroke', 'post-stroke-depression-and-mood-disorders', 'community-reintegration', 'nutrition'],
  },
  {
    slug: 'feeding-autonomy',
    title: 'Feeding autonomy',
    category: 'Stroke medicine',
    dateISO: '2024-01-05',
    description: 'Support safe feeding and swallowing independence after stroke with practical strategies and therapy.',
    tags: ['stroke', 'swallowing', 'occupational therapy', 'safety'],
    coverImage: { src: '/assets/images/illustrative/Post-Stroke-min-1.jpg', alt: 'Illustration representing post-stroke recovery.' },
    specificBullets: [
      'Swallowing safety (dysphagia screening) is essential before progressing textures.',
      'Positioning, pacing, and utensil adaptations can improve independence.',
      'Nutrition and hydration targets must account for fatigue and reduced appetite.',
      'Seek urgent help for coughing/choking with meals or suspected aspiration.',
    ],
    relatedSlugs: ['speech-autonomy', 'medical-complications-post-stroke', 'community-reintegration', 'postural-and-motor-control-autonomy'],
  },
  {
    slug: 'speech-autonomy',
    title: 'Speech autonomy',
    category: 'Stroke medicine',
    dateISO: '2023-12-28',
    description: 'Communication after stroke: aphasia, dysarthria, therapy principles, and daily practice ideas.',
    tags: ['stroke', 'speech therapy', 'aphasia', 'communication'],
    coverImage: { src: '/assets/images/illustrative/speech-therapy-min.jpg', alt: 'Illustration representing speech therapy.' },
    specificBullets: [
      'Communication issues can involve language (aphasia), speech clarity (dysarthria), or cognition.',
      'Frequent, meaningful practice supports improvement—small daily sessions add up.',
      'Family strategies (short sentences, patience, yes/no questions) can reduce frustration.',
      'Mood and fatigue influence communication; address them in the plan.',
    ],
    relatedSlugs: ['post-stroke-depression-and-mood-disorders', 'community-reintegration', 'feeding-autonomy', 'postural-and-motor-control-autonomy'],
  },
  {
    slug: 'post-stroke-depression-and-mood-disorders',
    title: 'Post-stroke depression and mood disorders',
    category: 'Stroke medicine',
    dateISO: '2023-12-20',
    description: 'Mood changes after stroke are common and treatable. Learn signs, supports, and when to seek help.',
    tags: ['stroke', 'depression', 'anxiety', 'psychology'],
    coverImage: { src: '/assets/images/illustrative/mood-disorders-min.jpg', alt: 'Illustration representing mood disorders and emotional wellbeing.' },
    specificBullets: [
      'Depression can reduce participation in rehab; early recognition improves recovery engagement.',
      'Anxiety, irritability, and emotional lability can occur and are not a personal failing.',
      'Psychological therapy, social support, and medication (when appropriate) can help.',
      'Seek urgent help for suicidal thoughts or severe worsening mood.',
    ],
    relatedSlugs: ['speech-autonomy', 'community-reintegration', 'clinical-and-secondary-prevention-of-stroke', 'psychology'],
  },
  {
    slug: 'medical-complications-post-stroke',
    title: 'Medical complications post stroke',
    category: 'Stroke medicine',
    dateISO: '2023-12-12',
    description: 'Common medical complications after stroke and how coordinated follow-up can reduce risk.',
    tags: ['stroke', 'complications', 'medical follow-up', 'safety'],
    coverImage: { src: '/assets/images/illustrative/post-stroke-min.jpg', alt: 'Illustration representing post-stroke medical care.' },
    specificBullets: [
      'Common issues include falls, infections, pressure injuries, pain, and medication side effects.',
      'Dysphagia increases aspiration risk and needs early screening and management.',
      'Fatigue is common; pacing and sleep routines are part of recovery.',
      'Regular review helps adjust prevention medications and monitor new symptoms.',
    ],
    relatedSlugs: ['clinical-and-secondary-prevention-of-stroke', 'feeding-autonomy', 'post-stroke-spasticity', 'community-reintegration'],
  },
  {
    slug: 'post-stroke-spasticity',
    title: 'Post stroke spasticity',
    category: 'Stroke medicine',
    dateISO: '2023-12-05',
    description: 'Understand spasticity after stroke and learn practical management strategies across home and therapy.',
    tags: ['stroke', 'spasticity', 'movement', 'rehabilitation'],
    coverImage: { src: '/assets/images/illustrative/postural-therapy-min.jpg', alt: 'Illustration representing postural and motor therapy.' },
    specificBullets: [
      'Spasticity is an overactive reflex; it can coexist with weakness and reduced coordination.',
      'Positioning, stretching, and task practice are often used alongside medical options.',
      'Splints, orthoses, and assistive devices can improve function and reduce pain.',
      'Escalate care if tone is rapidly worsening or skin integrity is compromised.',
    ],
    relatedSlugs: ['postural-and-motor-control-autonomy', 'medical-complications-post-stroke', 'community-reintegration', 'rehabilitation'],
  },
  {
    slug: 'complex-regional-pain-syndrome',
    title: 'Complex regional pain syndrome',
    category: 'Pain medicine',
    dateISO: '2023-11-28',
    description: 'CRPS explained: symptoms, diagnosis, early management, and why multidisciplinary care matters.',
    tags: ['CRPS', 'nerve', 'pain', 'rehabilitation'],
    coverImage: { src: '/assets/images/illustrative/pathologies-home-min.jpg', alt: 'Illustration representing complex pain conditions.' },
    specificBullets: [
      'Symptoms can include disproportionate pain, swelling, colour/temperature change, and movement limitation.',
      'Early, graded movement and desensitisation are often recommended alongside medical review.',
      'Psychological support can help with fear and distress without implying the pain is imagined.',
      'Seek specialist assessment early; outcomes are often better with timely management.',
    ],
    relatedSlugs: ['hand-and-elbow-pain', 'rehabilitation', 'psychology', 'nutrition'],
  },
  {
    slug: 'postural-and-motor-control-autonomy',
    title: 'Postural and motor control autonomy',
    category: 'Stroke medicine',
    dateISO: '2023-11-20',
    description: 'Build balance and movement autonomy after stroke with task-specific practice and safety planning.',
    tags: ['stroke', 'balance', 'mobility', 'occupational therapy'],
    coverImage: { src: '/assets/images/illustrative/stroke-rehabilitation-min.jpg', alt: 'Illustration representing stroke rehabilitation therapy.' },
    specificBullets: [
      'Motor control improves with frequent, purposeful practice and feedback.',
      'Balance training should be progressive and safe (support, supervision, environment).',
      'Assistive devices can improve confidence and reduce fall risk.',
      'Fatigue management is essential for consistent practice.',
    ],
    relatedSlugs: ['post-stroke-spasticity', 'community-reintegration', 'feeding-autonomy', 'medical-complications-post-stroke'],
  },
  {
    slug: 'community-reintegration',
    title: 'Community reintegration',
    category: 'Stroke medicine',
    dateISO: '2023-11-12',
    description: 'Returning to community life after stroke: mobility, confidence, support systems, and participation.',
    tags: ['stroke', 'community', 'independence', 'rehabilitation'],
    coverImage: { src: '/assets/images/illustrative/services-home-min-1.jpg', alt: 'Illustration representing community support and reintegration.' },
    specificBullets: [
      'Participation goals (shops, socialising, hobbies) should guide rehab priorities.',
      'Transport planning and mobility aids can increase independence.',
      'Support networks reduce isolation and improve long-term outcomes.',
      'Gradual exposure to real-world environments builds confidence safely.',
    ],
    relatedSlugs: ['post-stroke-depression-and-mood-disorders', 'postural-and-motor-control-autonomy', 'speech-autonomy', 'clinical-and-secondary-prevention-of-stroke'],
  },
];

const legacyArticles: BlogArticle[] = topics.map((cfg) => {
  const sections =
    cfg.category === 'Stroke medicine'
      ? buildStrokeTopicSections(cfg)
      : cfg.category === 'Sports medicine'
        ? buildSportsTopicSections(cfg)
        : buildPainArticleSections(cfg);

  const references = cfg.category === 'Stroke medicine' ? strokeReferences : commonReferences;

  return {
    slug: cfg.slug,
    title: cfg.title,
    dateISO: cfg.dateISO,
    description: cfg.description,
    category: cfg.category,
    tags: cfg.tags,
    coverImage: cfg.coverImage,
    author: clinicAuthor,
    sections,
    references,
    relatedSlugs: cfg.relatedSlugs,
  };
});

const procedureReferences: ArticleReference[] = [
  { label: 'NHS (UK) — Back surgery overview', url: 'https://www.nhs.uk/conditions/lumbar-decompression-surgery/' },
  { label: 'NHS (UK) — Spinal fusion', url: 'https://www.nhs.uk/conditions/spinal-fusion/' },
  { label: 'NICE — Clinical guidance and evidence', url: 'https://www.nice.org.uk/guidance' },
  { label: 'Cochrane — Evidence summaries', url: 'https://www.cochrane.org/evidence' },
  { label: 'AAOS OrthoInfo — Patient education', url: 'https://orthoinfo.aaos.org/' },
];

type ProcedureConfig = {
  slug: string;
  title: string;
  dateISO: string;
  description: string;
  category: string;
  tags: string[];
  coverImage: BlogArticle['coverImage'];
  bodyLocation: string;
  conditionsTreated: string[];
  duration: string;
  setting: string;
  anesthesia: string;
  reliefTimeline: string;
  reliefDuration: string;
  eligibility: string[];
  contraindications: string[];
  alternatives: string[];
  keySteps: string[];
  recoveryMilestones: string[];
  risks: string[];
  successRateSummary: string;
  aftercare: string[];
  insuranceNotes: string[];
  checklist: string[];
  patientStory: { title: string; story: string[] };
  faq: ArticleFaqItem[];
  relatedSlugs: string[];
  medicalEntity: BlogArticle['medicalEntity'];
};

const buildProcedureSections = (cfg: ProcedureConfig): ArticleSection[] => {
  return [
    {
      id: 'overview',
      heading: 'Overview',
      blocks: [
        { type: 'p', text: cfg.description },
        {
          type: 'p',
          text: `This page explains how ${cfg.title.toLowerCase()} is typically performed, who it may help, what recovery often looks like, and what risks to consider. It is educational and does not replace an individual clinical assessment.`,
        },
        { type: 'img', src: cfg.coverImage.src, alt: cfg.coverImage.alt, caption: 'Illustrative image.' },
      ],
    },
    {
      id: 'eligibility',
      heading: 'Who this is for (eligibility)',
      blocks: [
        {
          type: 'p',
          text: `Eligibility depends on your diagnosis, symptoms, imaging, and overall health. Clinicians usually consider both how severe symptoms are and how much they limit daily life.`,
        },
        { type: 'h3', text: 'Common reasons it may be recommended' },
        { type: 'ul', items: cfg.eligibility },
        { type: 'h3', text: 'Not appropriate if… (contraindications / caution)' },
        { type: 'ul', items: cfg.contraindications },
      ],
    },
    {
      id: 'alternatives',
      heading: 'Alternatives to consider',
      blocks: [
        {
          type: 'p',
          text: 'The best option depends on the cause of symptoms, your goals, and your risk profile. In many cases, clinicians start with less invasive treatments and escalate if needed.',
        },
        { type: 'ul', items: cfg.alternatives },
      ],
    },
    {
      id: 'how-it-works',
      heading: 'How the procedure works (step-by-step)',
      blocks: [
        {
          type: 'p',
          text: `Procedural details vary by surgeon, anatomy, and the exact problem being treated. The steps below describe a typical pathway in patient-friendly terms.`,
        },
        { type: 'h3', text: 'Typical steps' },
        { type: 'ul', items: cfg.keySteps },
        {
          type: 'video',
          src: '/assets/videos/Pain-Medicine-min.mp4',
          title: 'Illustrative procedure animation',
          caption: 'Procedure animation (illustrative).',
        },
      ],
    },
    {
      id: 'preparation',
      heading: 'Pre-operative preparation',
      blocks: [
        {
          type: 'p',
          text: 'Preparation aims to reduce risk and support smoother recovery. Your team will tailor advice to your medical history and medications.',
        },
        { type: 'ul', items: cfg.checklist },
      ],
    },
    {
      id: 'recovery',
      heading: 'Recovery timeline (what to expect)',
      blocks: [
        {
          type: 'p',
          text: `Recovery varies. Your baseline fitness, the size of the procedure, and how your nervous system responds to pain all influence the timeline.`,
        },
        { type: 'h3', text: 'Common milestones' },
        { type: 'ul', items: cfg.recoveryMilestones },
        {
          type: 'img',
          src: '/assets/images/illustrative/rehabilitation-min.jpg',
          alt: 'Illustration representing rehabilitation progress and recovery planning.',
          caption: 'Recovery progression infographic (illustrative).',
        },
      ],
    },
    {
      id: 'risks',
      heading: 'Potential risks and complications',
      blocks: [
        {
          type: 'p',
          text: 'Every procedure has potential downsides. Your clinician should explain risks in the context of your health and the expected benefit.',
        },
        { type: 'ul', items: cfg.risks },
        {
          type: 'p',
          text: 'Seek urgent medical help after a procedure if you develop chest pain, severe shortness of breath, high fever, uncontrolled bleeding, new severe weakness, or loss of bladder/bowel control.',
        },
      ],
    },
    {
      id: 'outcomes',
      heading: 'Outcomes and success rates',
      blocks: [
        {
          type: 'p',
          text: cfg.successRateSummary,
        },
        {
          type: 'p',
          text: 'Success depends on choosing the right indication, using good technique, and following an appropriate rehabilitation plan. Outcomes are usually better when expectations are realistic and goals are function-based.',
        },
      ],
    },
    {
      id: 'aftercare',
      heading: 'Post-procedure care',
      blocks: [
        {
          type: 'p',
          text: 'Aftercare focuses on protecting healing tissues, restoring movement and strength, and reducing the risk of complications.',
        },
        { type: 'ul', items: cfg.aftercare },
      ],
    },
    {
      id: 'insurance',
      heading: 'Costs and insurance (general guidance)',
      blocks: [
        {
          type: 'p',
          text: 'Coverage depends on your plan, diagnosis, and clinical documentation. Ask your insurer what is covered, what needs prior authorisation, and what out-of-pocket costs may apply.',
        },
        { type: 'ul', items: cfg.insuranceNotes },
      ],
    },
    {
      id: 'testimonial',
      heading: cfg.patientStory.title,
      blocks: cfg.patientStory.story.map((t) => ({ type: 'p', text: t })),
    },
    {
      id: 'next-steps',
      heading: 'Next steps',
      blocks: [
        {
          type: 'p',
          text: `If you are considering ${cfg.title.toLowerCase()}, bring your imaging reports, medication list, and a brief timeline of symptoms to your consultation. A clinician can help confirm the diagnosis, explain realistic outcomes, and coordinate alternatives when appropriate.`,
        },
      ],
    },
    {
      id: 'disclaimer',
      heading: 'Medical disclaimer',
      blocks: [
        {
          type: 'p',
          text: 'This article is for general education only and is not medical advice. Treatment decisions should be made with a qualified clinician who understands your medical history and examination findings.',
        },
      ],
    },
  ];
};

const buildQuickFacts = (cfg: ProcedureConfig): ArticleQuickFact[] => [
  { label: 'Conditions treated', value: cfg.conditionsTreated.join(', ') },
  { label: 'Typical duration', value: cfg.duration },
  { label: 'Anaesthesia', value: cfg.anesthesia },
  { label: 'Setting', value: cfg.setting },
  { label: 'When improvement starts', value: cfg.reliefTimeline },
  { label: 'How long relief lasts', value: cfg.reliefDuration },
];

const reviewedBy = { name: 'Algarve Pain Centre', role: 'Medically reviewed' };

const specialisedProcedures: ProcedureConfig[] = [
  {
    slug: 'spine-surgery/tubular-microsurgery',
    title: 'Tubular microsurgery',
    dateISO: '2024-06-12',
    description:
      'Tubular microsurgery is a minimally invasive spine technique that uses a small tube to access the spine with less muscle disruption. It may reduce post-operative pain and speed up early recovery for selected conditions.',
    category: 'Spine surgery',
    tags: ['tubular microsurgery', 'minimally invasive spine', 'disc herniation', 'lumbar stenosis', 'recovery'],
    coverImage: {
      src: '/assets/images/illustrative/Lumber-Spine-Pain-min.jpg',
      alt: 'Illustration representing lumbar spine anatomy and back pain.',
    },
    bodyLocation: 'Spine (typically lumbar or cervical)',
    conditionsTreated: ['Disc herniation with nerve symptoms', 'Lumbar stenosis in selected cases', 'Focal nerve compression'],
    duration: '60–180 minutes (varies by level and complexity)',
    setting: 'Hospital, often day case or short stay',
    anesthesia: 'Usually general anaesthesia',
    reliefTimeline: 'Some leg pain improves immediately; back soreness often improves over days to weeks',
    reliefDuration: 'Long-term relief depends on the underlying condition and rehab plan',
    eligibility: [
      'Symptoms consistent with nerve compression (for example, leg pain, numbness, or weakness) confirmed by assessment.',
      'Imaging supports a focal target that can be addressed through a small corridor.',
      'Symptoms persist despite appropriate conservative treatment, or there are progressive neurological deficits.',
    ],
    contraindications: [
      'Severe instability or deformity requiring wider reconstruction.',
      'Infection, uncontrolled medical conditions, or bleeding risk that is not optimised.',
      'Diffuse or unclear pain pattern without a clear surgical target.',
    ],
    alternatives: [
      'Physiotherapy and graded strengthening, especially for non-specific back pain.',
      'Medication optimisation and activity modification.',
      'Image-guided injections (for selected cases).',
      'Conventional open surgery when minimally invasive access is not appropriate.',
    ],
    keySteps: [
      'Positioning and anaesthesia; the surgical site is confirmed with imaging.',
      'A small incision is made and a tubular retractor gently separates muscle fibres.',
      'Microsurgical instruments are used to decompress the nerve (for example, removing a small disc fragment).',
      'The tube is removed and the incision is closed with a small dressing.',
    ],
    recoveryMilestones: [
      'Day 0–2: walking short distances; expected incision soreness; leg pain may reduce quickly in some cases.',
      'Week 1–2: gradual increase in walking; avoid heavy lifting and prolonged bending early on.',
      'Week 3–6: rehab progresses to mobility and core/hip strength; many return to desk work if comfortable.',
      'Week 6–12: graded return to sport/strenuous work depending on symptoms and clinician advice.',
    ],
    risks: [
      'Infection, bleeding, or wound healing problems.',
      'Nerve irritation or injury (rare but important).',
      'Spinal fluid leak (dural tear) which may require additional care.',
      'Recurrent disc herniation or persistent symptoms.',
    ],
    successRateSummary:
      'In well-selected cases where leg symptoms are due to a focal disc herniation or nerve compression, many people experience meaningful improvement in leg pain and function. Outcomes vary by diagnosis, symptom duration, and the presence of nerve damage.',
    aftercare: [
      'Follow wound-care instructions and keep the dressing clean and dry as advised.',
      'Walk little-and-often; avoid long periods of sitting early on.',
      'Use pain relief as prescribed and wean as symptoms improve.',
      'Start a progressive rehabilitation plan focused on mobility, strength, and confidence with movement.',
    ],
    insuranceNotes: [
      'Ask whether surgeon fees, hospital fees, anaesthesia, imaging, and follow-up visits are covered.',
      'Prior authorisation often requires imaging reports and documentation of symptoms and conservative care.',
      'If you have neurological deficit, include exam findings and timelines in documentation.',
    ],
    checklist: [
      'Bring a full medication list (including blood thinners, supplements, and allergies).',
      'Ask whether to stop anticoagulants/antiplatelets and exactly when (never stop without guidance).',
      'Optimise smoking cessation, blood sugar, and blood pressure where relevant.',
      'Plan transport home and support for the first 24–48 hours.',
      'Prepare your home: clear trip hazards, set up a comfortable resting space, and place essentials at waist height.',
    ],
    patientStory: {
      title: 'Patient story (composite example)',
      story: [
        'A working adult with leg-dominant pain from a confirmed disc herniation struggled with sleep and walking tolerance.',
        'After a period of physiotherapy and medication optimisation, symptoms persisted and the team confirmed a clear surgical target.',
        'Following tubular microsurgery and a graded rehab plan, walking improved first, then strength and confidence with daily tasks progressed over the following weeks.',
        'This is a de-identified composite example for education. Individual outcomes vary.',
      ],
    },
    faq: [
      { question: 'How soon can I walk after surgery?', answer: 'Many people walk the same day or the next day, depending on comfort and clinical advice.' },
      { question: 'Will my back pain disappear immediately?', answer: 'Incision soreness is common early on. Nerve-related leg pain may improve quickly, but recovery varies.' },
      { question: 'When can I drive?', answer: 'Driving is usually considered once you can sit comfortably, move safely, and are not using sedating pain medication.' },
      { question: 'Do I need physiotherapy after tubular microsurgery?', answer: 'Rehab often helps restore strength and confidence and reduce recurrence risk.' },
      { question: 'What are signs I should seek urgent help?', answer: 'New severe weakness, loss of bladder/bowel control, high fever, or severe shortness of breath need urgent review.' },
      { question: 'Is minimally invasive always better?', answer: 'Not always. The best approach depends on anatomy, diagnosis, and safety.' },
    ],
    relatedSlugs: ['spine-surgery/spinal-fusion', 'interventional-pain/radiofrequency-ablation', 'rehabilitation-therapies/physiotherapy', 'lumbar-spine-pain'],
    medicalEntity: {
      '@type': 'SurgicalProcedure',
      name: 'Tubular microsurgery',
      bodyLocation: 'Spine',
      preparation: 'Medication review, anaesthetic assessment, and optimisation of relevant health factors (for example, smoking cessation).',
      followup: 'Follow-up visit and progressive rehabilitation plan.',
    },
  },
  {
    slug: 'spine-surgery/spinal-fusion',
    title: 'Spinal fusion',
    dateISO: '2024-06-10',
    description:
      'Spinal fusion is surgery that stabilises a painful or unstable spinal segment by encouraging two or more vertebrae to heal together. It can help selected conditions such as instability, deformity, or certain causes of nerve compression.',
    category: 'Spine surgery',
    tags: ['spinal fusion', 'back surgery', 'instability', 'spondylolisthesis', 'recovery'],
    coverImage: { src: '/assets/images/illustrative/Lumber-Spine-Pain-min.jpg', alt: 'Illustration representing lumbar spine structure.' },
    bodyLocation: 'Spine',
    conditionsTreated: ['Spondylolisthesis with instability', 'Deformity in selected cases', 'Painful segment with confirmed mechanical instability'],
    duration: '2–6 hours (varies by technique and number of levels)',
    setting: 'Hospital inpatient',
    anesthesia: 'General anaesthesia',
    reliefTimeline: 'Improvement is gradual over weeks to months as healing progresses',
    reliefDuration: 'Aims for long-term stability; adjacent segment symptoms can occur over time',
    eligibility: [
      'Confirmed diagnosis where stability is a key driver of pain or neurological symptoms.',
      'Symptoms meaningfully limit function despite an appropriate trial of non-surgical care.',
      'Bone health and medical conditions can be optimised for healing.',
    ],
    contraindications: [
      'Active infection or uncontrolled medical conditions that increase surgical risk.',
      'Poor bone quality that is not addressed (risk of fixation failure).',
      'Pain pattern without a clear structural explanation or target.',
    ],
    alternatives: [
      'Physiotherapy with graded strength and capacity building.',
      'Medication optimisation and pain education approaches.',
      'Interventional procedures for selected pain generators.',
      'Motion-preserving options (for selected patients) such as disc replacement.',
    ],
    keySteps: [
      'Anaesthesia and positioning; imaging confirms levels.',
      'Exposure of the target level(s); decompression may be performed if nerves are compressed.',
      'Placement of fixation (for example, screws/rods) and bone graft to promote fusion.',
      'Closure and early mobilisation plan.',
    ],
    recoveryMilestones: [
      'Days 1–4: inpatient care, walking with guidance, pain control, and early discharge planning.',
      'Weeks 2–6: gradual increase in walking; avoid heavy lifting; wound check and early rehab advice.',
      'Weeks 6–12: progressive strengthening and endurance; return to many daily activities.',
      'Months 3–12: fusion maturation; return to higher-demand activities is phased and individualised.',
    ],
    risks: [
      'Infection, bleeding, or blood clots.',
      'Nerve injury or persistent nerve symptoms.',
      'Non-union (failure to fuse) or hardware issues.',
      'Adjacent segment degeneration symptoms over time.',
    ],
    successRateSummary:
      'Fusion can improve pain and function when instability or deformity is a major driver. Success rates vary by indication, number of levels, bone health, and smoking status. Your surgeon should explain evidence relevant to your diagnosis.',
    aftercare: [
      'Follow wound-care and activity restrictions; avoid twisting and heavy lifting as advised.',
      'Walk daily and progress gradually; avoid long static sitting early on.',
      'Attend follow-up imaging/appointments to monitor healing.',
      'Work with rehabilitation to restore strength, movement confidence, and function.',
    ],
    insuranceNotes: [
      'Coverage often requires imaging and documentation of functional limitation and prior conservative care.',
      'Ask what is covered: implants, hospital stay, anaesthesia, physiotherapy, and follow-up imaging.',
      'Clarify pre-approval requirements and expected co-payments.',
    ],
    checklist: [
      'Review medications and supplements; discuss blood thinners and diabetes control.',
      'Stop smoking if applicable; smoking increases non-union risk.',
      'Optimise nutrition and protein intake for healing.',
      'Plan home support and safe mobility (rails, raised seating, clutter reduction).',
      'Prepare questions about the exact levels fused and expected activity restrictions.',
    ],
    patientStory: {
      title: 'Patient story (composite example)',
      story: [
        'A person with confirmed instability and leg symptoms had repeated flare-ups and reduced walking tolerance.',
        'After structured rehabilitation and careful assessment, fusion was recommended with a clear explanation of goals and risks.',
        'Recovery focused on walking, gradual strength, and pacing; function improved over months rather than days.',
        'This is a de-identified composite example for education. Individual outcomes vary.',
      ],
    },
    faq: [
      { question: 'How long does a fusion take to heal?', answer: 'Bone healing progresses over months; many restrictions ease by 6–12 weeks, but full fusion maturation can take longer.' },
      { question: 'Will I lose all movement?', answer: 'Movement at the fused level reduces, but many people still move well overall depending on the number of levels fused.' },
      { question: 'Do I need a brace?', answer: 'Some people are given a brace depending on technique and surgeon preference.' },
      { question: 'What affects fusion success?', answer: 'Smoking, bone health, diabetes control, nutrition, and adherence to rehab can all matter.' },
      { question: 'Can fusion help leg pain?', answer: 'If leg pain is from nerve compression and the surgery addresses that, leg symptoms may improve.' },
      { question: 'What are alternatives?', answer: 'Alternatives depend on diagnosis and may include rehab, injections, or other surgical approaches.' },
    ],
    relatedSlugs: ['spine-surgery/disc-replacement', 'rehabilitation-therapies/exercise-therapy', 'interventional-pain/radiofrequency-ablation', 'lumbar-spine-pain'],
    medicalEntity: {
      '@type': 'SurgicalProcedure',
      name: 'Spinal fusion',
      bodyLocation: 'Spine',
      preparation: 'Pre-operative assessment, optimisation of medical conditions, and medication review.',
      followup: 'Follow-up imaging and progressive rehabilitation.',
    },
  },
  {
    slug: 'spine-surgery/disc-replacement',
    title: 'Disc replacement',
    dateISO: '2024-06-08',
    description:
      'Artificial disc replacement (arthroplasty) aims to preserve motion at a spinal segment while reducing pain from a damaged disc in selected patients. Suitability depends on diagnosis, level, and overall spine stability.',
    category: 'Spine surgery',
    tags: ['disc replacement', 'arthroplasty', 'motion preserving surgery', 'neck pain', 'back pain'],
    coverImage: { src: '/assets/images/illustrative/Lumber-Spine-Pain-min.jpg', alt: 'Illustration representing the spine and intervertebral discs.' },
    bodyLocation: 'Spine (selected cervical or lumbar levels)',
    conditionsTreated: ['Discogenic pain with a confirmed target disc', 'Selected cervical radiculopathy cases', 'Single-level disc degeneration in appropriate candidates'],
    duration: '1–3 hours (varies by level and approach)',
    setting: 'Hospital, often short stay',
    anesthesia: 'General anaesthesia',
    reliefTimeline: 'Pain and function improvements are usually gradual over weeks; some symptoms may improve earlier',
    reliefDuration: 'Aims for durable improvement; long-term outcomes depend on selection and rehab',
    eligibility: [
      'Disc-related symptoms with a clear target level supported by clinical assessment and imaging.',
      'Limited number of affected levels (often one level) and preserved overall spine stability.',
      'Reasonable bone quality and absence of major facet joint arthritis at the target level.',
    ],
    contraindications: [
      'Significant instability, deformity, or multiple pain generators without a clear target.',
      'Severe facet joint arthritis at the target level.',
      'Osteoporosis or medical factors that increase implant/fixation risk.',
    ],
    alternatives: [
      'Structured rehabilitation and graded strength/endurance programmes.',
      'Medication optimisation and lifestyle factors (sleep, pacing, weight where relevant).',
      'Interventional pain procedures for selected pain generators.',
      'Spinal fusion when stability is the priority or disc replacement is not suitable.',
    ],
    keySteps: [
      'Anaesthesia and positioning; imaging confirms the target level.',
      'The damaged disc is removed to decompress nerves and prepare the space.',
      'A disc implant is placed to restore height and allow motion.',
      'Closure and early mobilisation with precautions.',
    ],
    recoveryMilestones: [
      'Days 1–7: walking and gentle movement; manage incision discomfort; avoid heavy lifting.',
      'Weeks 2–6: increase walking tolerance; begin guided mobility and strength work.',
      'Weeks 6–12: progressive rehabilitation; return to many daily activities; work return varies.',
      'Months 3–6: gradual return to higher-demand activities depending on symptoms and clinician guidance.',
    ],
    risks: [
      'Infection, bleeding, or blood clots.',
      'Nerve irritation/injury or persistent symptoms.',
      'Implant-related issues (malposition, wear, loosening) over time.',
      'Adjacent level symptoms can still occur depending on overall spine health.',
    ],
    successRateSummary:
      'When used for the right indication and level, many people report meaningful improvements in pain and function. Your surgeon should discuss expected benefit compared with fusion and how your anatomy and diagnosis affect outcomes.',
    aftercare: [
      'Follow wound-care instructions and early activity guidance.',
      'Avoid heavy lifting and aggressive end-range movements early on as advised.',
      'Start progressive rehabilitation focusing on mobility, strength, and movement confidence.',
      'Attend follow-up appointments to monitor recovery and implant position.',
    ],
    insuranceNotes: [
      'Ask whether disc replacement is covered for your diagnosis and level; coverage can vary by insurer and region.',
      'Prior authorisation may require imaging and documentation of failed conservative care and functional limitation.',
      'Confirm coverage for implant/device costs and post-operative rehabilitation.',
    ],
    checklist: [
      'Bring imaging reports and a timeline of symptoms and previous treatments.',
      'Review medications and allergies; discuss blood thinners with your team.',
      'Optimise bone health, nutrition, and smoking cessation where relevant.',
      'Plan transport home and help with early daily tasks.',
      'Prepare questions about eligibility, expected motion, and return-to-activity milestones.',
    ],
    patientStory: {
      title: 'Patient story (composite example)',
      story: [
        'A person with a clear single-level disc problem had persistent pain despite a structured rehab plan.',
        'After assessment confirmed suitability for motion preservation, disc replacement was chosen over fusion.',
        'Recovery focused on walking first, then mobility and strength with graded progressions.',
        'This is a de-identified composite example for education. Individual outcomes vary.',
      ],
    },
    faq: [
      { question: 'How is disc replacement different from fusion?', answer: 'Replacement aims to preserve motion at the treated level; fusion aims to stabilise by stopping motion at that segment.' },
      { question: 'Am I a candidate if I have arthritis?', answer: 'Facet joint arthritis at the target level can reduce suitability; assessment helps clarify this.' },
      { question: 'How soon can I return to work?', answer: 'Desk work may be possible in a few weeks for some; heavy work often requires longer and depends on recovery.' },
      { question: 'Is the implant permanent?', answer: 'It is designed to be long-lasting, but all implants have long-term considerations that your surgeon should discuss.' },
      { question: 'Will it help leg or arm symptoms?', answer: 'If nerve compression is addressed and the disc level is the driver, nerve symptoms may improve, but timelines vary.' },
      { question: 'Do I need physiotherapy?', answer: 'Rehabilitation is commonly recommended to restore capacity and reduce recurrence risk.' },
    ],
    relatedSlugs: ['spine-surgery/spinal-fusion', 'interventional-pain/radiofrequency-ablation', 'rehabilitation-therapies/physiotherapy', 'cervical-spine-pain'],
    medicalEntity: {
      '@type': 'SurgicalProcedure',
      name: 'Artificial disc replacement',
      bodyLocation: 'Spine',
      preparation: 'Pre-operative assessment, medication review, and optimisation of relevant health factors.',
      followup: 'Follow-up visits and progressive rehabilitation.',
    },
  },
  {
    slug: 'spine-surgery/lumbar-deformity-surgery',
    title: 'Lumbar deformity surgery',
    dateISO: '2024-06-06',
    description:
      'Lumbar deformity surgery addresses spinal alignment problems (such as scoliosis or sagittal imbalance) that can drive pain, nerve symptoms, and difficulty standing or walking. Planning is highly individual and often involves staged steps.',
    category: 'Spine surgery',
    tags: ['lumbar deformity surgery', 'scoliosis', 'spinal alignment', 'sagittal balance', 'recovery'],
    coverImage: { src: '/assets/images/illustrative/Lumber-Spine-Pain-min.jpg', alt: 'Illustration representing spine alignment and lumbar region.' },
    bodyLocation: 'Spine (lumbar and sometimes thoracolumbar)',
    conditionsTreated: ['Adult scoliosis with symptoms', 'Sagittal imbalance limiting function', 'Deformity with nerve compression in selected cases'],
    duration: '4–10+ hours (varies by levels and staging)',
    setting: 'Hospital inpatient',
    anesthesia: 'General anaesthesia',
    reliefTimeline: 'Function and tolerance typically improve gradually over months',
    reliefDuration: 'Aims for durable alignment and symptom reduction; long-term outcomes depend on bone health and rehab',
    eligibility: [
      'Symptoms and functional limitation consistent with deformity-related mechanical load and/or nerve compression.',
      'Imaging confirms clinically relevant alignment issues and targets for correction.',
      'Medical optimisation is possible (bone health, nutrition, cardiovascular risk).',
    ],
    contraindications: [
      'Unoptimised medical conditions that make surgery high risk.',
      'Severe osteoporosis not addressed (higher risk of fixation failure).',
      'Goals that do not match what surgery can realistically deliver.',
    ],
    alternatives: [
      'Non-surgical management: targeted rehabilitation, conditioning, pacing, and pain management.',
      'Interventional procedures for selected pain generators.',
      'Limited decompression for nerve symptoms in selected cases (when appropriate).',
    ],
    keySteps: [
      'Pre-operative planning with detailed imaging and alignment targets.',
      'Decompression of nerves when needed and preparation of segments for correction.',
      'Instrumentation and correction manoeuvres to restore alignment.',
      'Bone grafting/fusion across multiple levels to maintain correction.',
    ],
    recoveryMilestones: [
      'Week 0–2: inpatient recovery, walking with assistance, pain control, and discharge planning.',
      'Weeks 2–6: gradual walking progression, basic daily activities with pacing and precautions.',
      'Weeks 6–12: structured rehabilitation begins to rebuild endurance and strength.',
      'Months 3–12: ongoing conditioning and function building; milestones are individualised.',
    ],
    risks: [
      'Infection, bleeding, or blood clots.',
      'Nerve injury or persistent neurological symptoms.',
      'Non-union, implant issues, or proximal junctional problems.',
      'Medical complications (especially in complex, long procedures).',
    ],
    successRateSummary:
      'When performed for the right indication, deformity surgery can improve standing and walking tolerance and reduce pain linked to malalignment. Because cases vary widely, success rates should be discussed using evidence relevant to your deformity type and health profile.',
    aftercare: [
      'Follow wound-care and activity precautions; prioritise safe walking and posture strategies.',
      'Use a gradual, measurable rehabilitation plan to rebuild endurance.',
      'Optimise bone health and nutrition to support healing.',
      'Attend scheduled follow-up imaging and clinical reviews.',
    ],
    insuranceNotes: [
      'Complex reconstructions often require prior authorisation with detailed imaging and documentation of functional limitation.',
      'Confirm what is covered: hospital stay, implants, anaesthesia, rehab, and follow-up imaging.',
      'Ask about coverage for prehabilitation and post-operative physiotherapy.',
    ],
    checklist: [
      'Bring all imaging and previous operative notes if relevant.',
      'Complete medical optimisation: bone density, smoking cessation, diabetes control, and nutrition review.',
      'Plan extended home support and mobility equipment if needed.',
      'Prepare a realistic recovery plan with time off work and staged goals.',
      'Clarify your main goals (walking distance, standing tolerance, leg symptoms) for the consultation.',
    ],
    patientStory: {
      title: 'Patient story (composite example)',
      story: [
        'A person with worsening alignment-related fatigue and leg symptoms found standing and walking increasingly limited.',
        'After careful planning and medical optimisation, surgery focused on restoring balance and reducing nerve compression.',
        'Rehabilitation emphasised safe walking, endurance building, and pacing over many months.',
        'This is a de-identified composite example for education. Individual outcomes vary.',
      ],
    },
    faq: [
      { question: 'Why is planning so detailed?', answer: 'Alignment targets and bone health strongly influence stability and long-term outcomes, so planning reduces avoidable risk.' },
      { question: 'Is recovery longer than other spine surgeries?', answer: 'Often yes. Multi-level correction and fusion usually require a longer rehabilitation timeline.' },
      { question: 'Do I need prehabilitation?', answer: 'Many people benefit from improving strength, conditioning, and medical factors before surgery.' },
      { question: 'Will surgery fix all pain?', answer: 'It can improve deformity-related pain and function, but pain can have multiple drivers.' },
      { question: 'Can deformity surgery help leg pain?', answer: 'If leg symptoms are from nerve compression addressed during surgery, improvement is possible.' },
      { question: 'What if I am not a surgical candidate?', answer: 'A multidisciplinary plan can still improve function, pacing, and pain control.' },
    ],
    relatedSlugs: ['spine-surgery/spinal-fusion', 'rehabilitation-therapies/physiotherapy', 'rehabilitation-therapies/home-care', 'lumbar-spine-pain'],
    medicalEntity: {
      '@type': 'SurgicalProcedure',
      name: 'Lumbar deformity surgery',
      bodyLocation: 'Spine',
      preparation: 'Pre-operative planning, medical optimisation, and medication review.',
      followup: 'Follow-up imaging and long-term rehabilitation.',
    },
  },
  {
    slug: 'spine-surgery/vertebroplasty',
    title: 'Vertebroplasty',
    dateISO: '2024-06-04',
    description:
      'Vertebroplasty is a minimally invasive procedure that stabilises a painful vertebral compression fracture by injecting medical cement into the collapsed vertebra in selected patients.',
    category: 'Spine surgery',
    tags: ['vertebroplasty', 'compression fracture', 'osteoporosis', 'minimally invasive', 'back pain'],
    coverImage: { src: '/assets/images/illustrative/pathologies-home-min.jpg', alt: 'Illustration representing spine pathologies and pain.' },
    bodyLocation: 'Spine (vertebrae)',
    conditionsTreated: ['Painful vertebral compression fractures in selected cases'],
    duration: '30–90 minutes (varies by number of levels)',
    setting: 'Hospital or day procedure unit',
    anesthesia: 'Local anaesthetic with sedation or general anaesthesia (varies)',
    reliefTimeline: 'Pain relief can be rapid in some people; others improve over days to weeks',
    reliefDuration: 'Stabilisation is intended to be durable for the treated fracture',
    eligibility: [
      'Recent painful compression fracture confirmed on imaging with clinical correlation.',
      'Pain remains severe despite appropriate pain control and bracing/rehab as advised.',
      'No signs that pain is coming mainly from another source.',
    ],
    contraindications: [
      'Infection, uncorrected bleeding risk, or fracture instability requiring different management.',
      'Neurological compression that needs decompression rather than cement stabilisation.',
      'Fractures that are old and no longer the main pain generator (selection is key).',
    ],
    alternatives: [
      'Optimised pain relief, bracing when appropriate, and gradual mobilisation.',
      'Osteoporosis assessment and treatment to reduce future fracture risk.',
      'Kyphoplasty in selected cases (balloon-assisted).',
    ],
    keySteps: [
      'Imaging confirms the correct vertebral level.',
      'A needle is guided into the vertebra through the skin using imaging.',
      'Medical cement is injected to stabilise the fracture.',
      'Observation period and discharge with aftercare advice.',
    ],
    recoveryMilestones: [
      'Day 0–2: walking as tolerated; follow guidance on bending/lifting; monitor pain response.',
      'Week 1–2: increase daily activity; begin gentle mobility and strength work if advised.',
      'Week 3–6: focus on osteoporosis prevention strategies and graded conditioning.',
      'Ongoing: fracture prevention plan and fall-risk reduction.',
    ],
    risks: [
      'Cement leakage (often harmless, rarely clinically significant).',
      'Infection or bleeding (uncommon).',
      'Allergic reaction or cardiopulmonary complications (rare).',
      'New fractures can occur, especially if bone health is not addressed.',
    ],
    successRateSummary:
      'For carefully selected painful recent fractures, vertebroplasty can reduce pain and improve mobility. The evidence base and suitability vary by fracture type and timing, so individual assessment is essential.',
    aftercare: [
      'Resume gentle walking and daily tasks as tolerated, following clinician advice.',
      'Use pain relief as needed and reduce gradually as symptoms improve.',
      'Arrange follow-up for osteoporosis evaluation and fracture prevention.',
      'Start a graded strengthening and balance programme to reduce future fall risk.',
    ],
    insuranceNotes: [
      'Coverage typically requires imaging evidence of a compression fracture and documentation of persistent pain and functional limitation.',
      'Ask whether vertebroplasty vs kyphoplasty is covered and what prior authorisation is needed.',
      'Confirm coverage for osteoporosis work-up and rehabilitation.',
    ],
    checklist: [
      'Bring imaging and the timing of symptom onset; recent fractures are assessed differently than older fractures.',
      'Review blood thinners and bleeding risk medications with your clinician.',
      'Plan transport home and help with early activity pacing.',
      'Ask about osteoporosis evaluation and prevention after the procedure.',
      'Prepare a fall-prevention plan at home (lighting, clutter reduction, footwear).',
    ],
    patientStory: {
      title: 'Patient story (composite example)',
      story: [
        'A person with a recent painful compression fracture found walking and sleep severely limited.',
        'After assessment confirmed the fracture as the primary pain source, vertebroplasty was used to stabilise it.',
        'Early pain relief improved mobility, and the longer-term focus shifted to bone health and fall prevention.',
        'This is a de-identified composite example for education. Individual outcomes vary.',
      ],
    },
    faq: [
      { question: 'Is vertebroplasty the same as kyphoplasty?', answer: 'Both use cement to stabilise fractures. Kyphoplasty uses a balloon to create space before cement in selected cases.' },
      { question: 'How quickly can I go home?', answer: 'Many people go home the same day after observation, depending on health and anaesthesia.' },
      { question: 'Will it treat osteoporosis?', answer: 'No. Osteoporosis treatment is important to reduce future fracture risk.' },
      { question: 'Can I walk right away?', answer: 'Walking is usually encouraged as tolerated after clinician review.' },
      { question: 'What are the main risks?', answer: 'Cement leakage is the most discussed risk; serious complications are uncommon with appropriate selection.' },
      { question: 'Will I need physiotherapy?', answer: 'Many people benefit from graded strength and balance training after fracture.' },
    ],
    relatedSlugs: ['rehabilitation-therapies/physiotherapy', 'rehabilitation-therapies/nutrition', 'rehabilitation-therapies/exercise-therapy', 'lumbar-spine-pain'],
    medicalEntity: {
      '@type': 'TherapeuticProcedure',
      name: 'Vertebroplasty',
      bodyLocation: 'Spine',
      preparation: 'Medication review and imaging confirmation of the target level.',
      followup: 'Fracture prevention plan and rehabilitation as needed.',
    },
  },
  {
    slug: 'spine-surgery/interspinous-spacers',
    title: 'Interspinous spacers',
    dateISO: '2024-06-02',
    description:
      'Interspinous spacers are small implants placed between the spinous processes to help maintain space and reduce symptoms of lumbar spinal stenosis in selected patients, often aiming to relieve leg symptoms when standing or walking.',
    category: 'Spine surgery',
    tags: ['interspinous spacer', 'lumbar stenosis', 'neurogenic claudication', 'minimally invasive', 'walking pain'],
    coverImage: { src: '/assets/images/illustrative/Lumber-Spine-Pain-min.jpg', alt: 'Illustration representing lumbar spine and spinal canal.' },
    bodyLocation: 'Lumbar spine',
    conditionsTreated: ['Lumbar spinal stenosis with neurogenic claudication in selected cases'],
    duration: '30–90 minutes',
    setting: 'Hospital or day surgery unit',
    anesthesia: 'Local anaesthetic with sedation or general anaesthesia (varies)',
    reliefTimeline: 'Walking and standing tolerance may improve over days to weeks',
    reliefDuration: 'Relief can be durable, but outcomes vary and some people need further treatment later',
    eligibility: [
      'Leg symptoms when standing/walking that improve when sitting or bending forward (typical claudication pattern).',
      'Imaging confirms stenosis at a level suitable for spacer placement.',
      'No major instability requiring fusion.',
    ],
    contraindications: [
      'Significant instability, fracture risk, or deformity at the target level.',
      'Infection or unoptimised medical risk.',
      'Symptoms not consistent with stenosis-related claudication.',
    ],
    alternatives: [
      'Rehabilitation focusing on walking tolerance, strength, and pacing strategies.',
      'Medication optimisation and activity modification.',
      'Epidural or targeted injections in selected cases.',
      'Decompression surgery or fusion when indicated by anatomy and stability needs.',
    ],
    keySteps: [
      'Imaging confirms the target level and approach.',
      'A small incision is made and the spacer is positioned between spinous processes.',
      'The device is secured to help limit painful extension at the treated level.',
      'Closure and discharge planning with walking progression advice.',
    ],
    recoveryMilestones: [
      'Days 1–7: short walks with gradual increases; monitor leg symptoms and incision comfort.',
      'Weeks 2–6: progressive walking tolerance; begin guided strengthening and mobility.',
      'Weeks 6–12: build endurance and confidence; return to many daily activities.',
      'Ongoing: maintain conditioning and symptom management plan.',
    ],
    risks: [
      'Infection, bleeding, or implant site pain.',
      'Device movement or failure (uncommon but possible).',
      'Persistent or recurrent stenosis symptoms; some may need additional procedures.',
      'Fracture risk in patients with low bone density (selection matters).',
    ],
    successRateSummary:
      'In selected patients with stenosis-related claudication, interspinous spacers can improve walking tolerance and reduce leg symptoms. Outcomes depend on correct diagnosis, stability, and bone quality.',
    aftercare: [
      'Follow wound-care instructions and avoid heavy lifting early on as advised.',
      'Walk daily and increase distance gradually; track symptom response.',
      'Start a structured rehabilitation plan to improve leg strength and overall conditioning.',
      'Attend follow-up to review symptom changes and device positioning if needed.',
    ],
    insuranceNotes: [
      'Coverage varies by plan and device; prior authorisation may require imaging and documentation of symptoms and conservative care.',
      'Ask about coverage for device cost, facility fees, and post-procedure physiotherapy.',
      'Clarify what happens if additional treatment becomes necessary.',
    ],
    checklist: [
      'Bring imaging and a symptom diary showing how walking/standing triggers symptoms.',
      'Review medications and blood thinners with your team.',
      'Optimise bone health if you have osteoporosis risk factors.',
      'Plan transport and early walking support if needed.',
      'Prepare questions about alternative options if a spacer is not suitable.',
    ],
    patientStory: {
      title: 'Patient story (composite example)',
      story: [
        'A person with stenosis-related leg symptoms could only walk short distances before needing to sit.',
        'After assessment confirmed a suitable pattern and stable anatomy, a spacer was offered as an option.',
        'With gradual walking progressions and rehabilitation, standing tolerance improved over the following weeks.',
        'This is a de-identified composite example for education. Individual outcomes vary.',
      ],
    },
    faq: [
      { question: 'What is neurogenic claudication?', answer: 'It is leg pain/heaviness or numbness triggered by standing or walking and relieved by sitting or bending forward.' },
      { question: 'Does a spacer replace decompression surgery?', answer: 'It can be an option for selected patients, but decompression or fusion may be better for others.' },
      { question: 'Will I still need physiotherapy?', answer: 'Rehabilitation often improves walking tolerance and long-term symptom management.' },
      { question: 'How soon can I walk?', answer: 'Walking is usually encouraged early, increasing gradually based on comfort and advice.' },
      { question: 'How long does it last?', answer: 'Some people have durable relief, but outcomes vary and further treatment can be needed.' },
      { question: 'What are the main risks?', answer: 'Implant-related issues and persistent symptoms are key considerations discussed in consultation.' },
    ],
    relatedSlugs: ['spine-surgery/tubular-microsurgery', 'interventional-pain/radiofrequency-ablation', 'rehabilitation-therapies/physiotherapy', 'lumbar-spine-pain'],
    medicalEntity: {
      '@type': 'SurgicalProcedure',
      name: 'Interspinous spacer implantation',
      bodyLocation: 'Lumbar spine',
      preparation: 'Imaging review and medication assessment.',
      followup: 'Follow-up assessment and rehabilitation programme.',
    },
  },
];

const interventionalReferences: ArticleReference[] = [
  { label: 'NHS (UK) — Steroid injections', url: 'https://www.nhs.uk/conditions/steroid-injections/' },
  { label: 'AAOS OrthoInfo — Injections and procedures', url: 'https://orthoinfo.aaos.org/' },
  { label: 'Cochrane — Evidence summaries', url: 'https://www.cochrane.org/evidence' },
  { label: 'NICE — Clinical guidance and evidence', url: 'https://www.nice.org.uk/guidance' },
  { label: 'Mayo Clinic — Patient education', url: 'https://www.mayoclinic.org/diseases-conditions' },
];

type InterventionalConfig = {
  slug: string;
  title: string;
  dateISO: string;
  description: string;
  category: string;
  tags: string[];
  coverImage: BlogArticle['coverImage'];
  bodyLocation: string;
  conditionsTreated: string[];
  duration: string;
  setting: string;
  anesthesia: string;
  mechanism: string[];
  expectedOutcomes: string[];
  reliefDuration: string;
  sideEffects: string[];
  contraindications: string[];
  comparisons: string[];
  aftercare: string[];
  insuranceNotes: string[];
  checklist: string[];
  patientStory: { title: string; story: string[] };
  faq: ArticleFaqItem[];
  relatedSlugs: string[];
  medicalEntity: BlogArticle['medicalEntity'];
};

const buildInterventionalSections = (cfg: InterventionalConfig): ArticleSection[] => [
  {
    id: 'overview',
    heading: 'Overview',
    blocks: [
      { type: 'p', text: cfg.description },
      { type: 'p', text: 'Interventional pain procedures can reduce pain to create a “window” for movement, sleep, and rehabilitation. The best results usually come when the procedure is matched to the right diagnosis and followed by a structured plan.' },
      { type: 'img', src: cfg.coverImage.src, alt: cfg.coverImage.alt, caption: 'Illustrative image.' },
    ],
  },
  {
    id: 'mechanism',
    heading: 'Mechanism of action',
    blocks: [
      { type: 'p', text: 'Mechanism depends on the target tissues and the technique used. Your clinician should explain exactly what is being treated and how it relates to your symptoms.' },
      { type: 'ul', items: cfg.mechanism },
    ],
  },
  {
    id: 'conditions',
    heading: 'Conditions treated',
    blocks: [
      { type: 'p', text: 'These procedures are usually recommended when symptoms and examination suggest a specific pain generator that can be targeted safely.' },
      { type: 'ul', items: cfg.conditionsTreated },
    ],
  },
  {
    id: 'procedure',
    heading: 'What happens during the procedure',
    blocks: [
      { type: 'p', text: `Most procedures are performed as an outpatient day case. Imaging guidance (such as ultrasound or X-ray) improves accuracy and safety.` },
      { type: 'h3', text: 'Typical steps' },
      {
        type: 'ul',
        items: [
          'Consent and safety checks; confirm allergies and medications.',
          'Positioning and sterile skin preparation.',
          'Local anaesthetic to numb the skin and deeper tissues.',
          'Targeting with imaging guidance, then treatment delivery.',
          'Short observation period and discharge instructions.',
        ],
      },
      { type: 'video', src: '/assets/videos/Pain-Medicine-min.mp4', title: 'Illustrative interventional procedure animation', caption: 'Procedure animation (illustrative).' },
    ],
  },
  {
    id: 'outcomes',
    heading: 'Expected outcomes and how long relief lasts',
    blocks: [
      { type: 'p', text: 'Response varies by diagnosis, severity, and nervous system sensitivity. Your team will set goals in terms of function (walking, sleep, return to work) rather than pain score alone.' },
      { type: 'ul', items: cfg.expectedOutcomes },
      { type: 'p', text: `Typical duration of benefit: ${cfg.reliefDuration}.` },
    ],
  },
  {
    id: 'side-effects',
    heading: 'Side effects, risks, and safety',
    blocks: [
      { type: 'p', text: 'Most side effects are temporary. Serious complications are uncommon when procedures are appropriately selected and performed with imaging guidance.' },
      { type: 'ul', items: cfg.sideEffects },
      { type: 'p', text: 'Seek urgent help for severe shortness of breath, chest pain, high fever, rapidly spreading redness, or new severe weakness.' },
    ],
  },
  {
    id: 'contraindications',
    heading: 'Contraindications and when to avoid it',
    blocks: [
      { type: 'p', text: 'Your clinician should screen for factors that increase risk or reduce likely benefit.' },
      { type: 'ul', items: cfg.contraindications },
    ],
  },
  {
    id: 'comparison',
    heading: 'How it compares with other options',
    blocks: [
      { type: 'p', text: 'Different procedures are suited to different pain generators. A “best” choice depends on the diagnosis and your goals.' },
      { type: 'ul', items: cfg.comparisons },
    ],
  },
  {
    id: 'aftercare',
    heading: 'Aftercare and rehabilitation integration',
    blocks: [
      { type: 'p', text: 'Aftercare is where results are protected. The aim is to increase safe activity while symptoms are calmer.' },
      { type: 'ul', items: cfg.aftercare },
      {
        type: 'img',
        src: '/assets/images/illustrative/rehabilitation-min.jpg',
        alt: 'Illustration representing rehabilitation planning after a procedure.',
        caption: 'Recovery progression infographic (illustrative).',
      },
    ],
  },
  {
    id: 'insurance',
    heading: 'Costs and insurance (general guidance)',
    blocks: [
      { type: 'p', text: 'Coverage varies. Ask what documentation is required and whether diagnostic blocks or conservative care are prerequisites.' },
      { type: 'ul', items: cfg.insuranceNotes },
    ],
  },
  {
    id: 'testimonial',
    heading: cfg.patientStory.title,
    blocks: cfg.patientStory.story.map((t) => ({ type: 'p', text: t })),
  },
  {
    id: 'next-steps',
    heading: 'Next steps',
    blocks: [
      { type: 'p', text: 'Bring a medication list, relevant imaging reports, and a short symptom timeline to your consultation. Your clinician can confirm the target, explain realistic outcomes, and coordinate follow-up rehabilitation.' },
    ],
  },
  {
    id: 'disclaimer',
    heading: 'Medical disclaimer',
    blocks: [
      { type: 'p', text: 'This article is for general education only and is not medical advice. Procedures carry risks and should be chosen with a clinician who understands your medical history and examination findings.' },
    ],
  },
];

const buildInterventionalQuickFacts = (cfg: InterventionalConfig): ArticleQuickFact[] => [
  { label: 'Conditions treated', value: cfg.conditionsTreated.slice(0, 3).join(', ') },
  { label: 'Typical duration', value: cfg.duration },
  { label: 'Anaesthesia', value: cfg.anesthesia },
  { label: 'Setting', value: cfg.setting },
  { label: 'Body location', value: cfg.bodyLocation },
  { label: 'Relief duration', value: cfg.reliefDuration },
];

const interventionalProcedures: InterventionalConfig[] = [
  {
    slug: 'interventional-pain/radiofrequency-ablation',
    title: 'Radiofrequency ablation (RFA)',
    dateISO: '2024-06-14',
    description:
      'Radiofrequency ablation (RFA) uses heat to disrupt pain signals from targeted nerves. It is commonly used for facet joint–related spine pain after diagnostic blocks confirm the likely pain generator.',
    category: 'Interventional pain',
    tags: ['radiofrequency ablation', 'RFA', 'facet joint pain', 'spine pain', 'pain relief duration'],
    coverImage: { src: '/assets/images/illustrative/pain-medicine-algarve-min.jpg', alt: 'Clinical illustration related to pain management.' },
    bodyLocation: 'Spine (medial branch nerves) and selected peripheral targets',
    conditionsTreated: ['Facet joint–related neck or back pain', 'Selected sacroiliac joint pain pathways', 'Some peripheral nerve pain targets (case-dependent)'],
    duration: '30–90 minutes',
    setting: 'Outpatient day procedure',
    anesthesia: 'Local anaesthetic; sometimes light sedation',
    mechanism: [
      'A probe delivers controlled heat to a small nerve segment to reduce pain signalling.',
      'The goal is to target sensory nerves without affecting major motor function.',
      'Benefit is typically better when diagnostic nerve blocks predict response.',
    ],
    expectedOutcomes: [
      'Reduced pain during standing, walking, or prolonged sitting (when facet pain is the driver).',
      'Improved sleep and capacity for rehabilitation exercises.',
      'Reduced reliance on pain medication for some people.',
    ],
    reliefDuration: 'Often months; some people report 6–18 months, but duration varies',
    sideEffects: ['Temporary soreness or bruising at needle sites', 'Temporary numbness or tingling', 'Post-procedure neuritis (irritated nerve pain) in a minority', 'Infection or bleeding (uncommon)'],
    contraindications: ['Active infection', 'Uncorrected bleeding risk or inability to safely manage anticoagulants', 'Pregnancy considerations (case-dependent)', 'Diagnosis not supported by clinical assessment and diagnostic blocks'],
    comparisons: [
      'Compared with steroid injections: RFA aims for longer-lasting relief for confirmed facet pain.',
      'Compared with cryoablation: both target nerves; selection depends on target and clinician approach.',
      'Compared with rehabilitation alone: procedures can create a window for more effective rehab when pain limits function.',
    ],
    aftercare: ['Avoid strenuous activity for 24–48 hours', 'Walk gently and use heat/ice for soreness', 'Start or resume a graded rehab plan within clinician guidance', 'Track function improvements (walking time, sleep, tolerance)'],
    insuranceNotes: ['Insurers may require diagnostic medial branch blocks before RFA', 'Prior authorisation may require imaging, exam findings, and documentation of conservative care'],
    checklist: ['Bring a medication and allergy list', 'Confirm anticoagulant instructions', 'Arrange transport if sedated', 'Wear comfortable clothing and plan a lighter day after the procedure'],
    patientStory: {
      title: 'Patient story (composite example)',
      story: [
        'A person with back pain worse with extension and standing had temporary relief from diagnostic blocks, suggesting facet involvement.',
        'After RFA and a graded strengthening plan, standing tolerance improved over the next weeks.',
        'This is a de-identified composite example for education. Individual outcomes vary.',
      ],
    },
    faq: [
      { question: 'Do I need diagnostic blocks first?', answer: 'Often yes. Blocks help confirm whether the targeted nerves are likely contributing to pain.' },
      { question: 'Will RFA permanently destroy the nerve?', answer: 'Nerves can regrow over time, which is why relief may be temporary.' },
      { question: 'How soon does relief start?', answer: 'Some feel better within days; others take a few weeks as soreness settles.' },
      { question: 'Can I exercise after RFA?', answer: 'Light activity is usually encouraged; your clinician will guide progression.' },
      { question: 'Is RFA safe?', answer: 'Serious complications are uncommon when properly selected and performed with imaging guidance.' },
      { question: 'What if it does not work?', answer: 'Your clinician will reassess diagnosis and discuss alternatives such as rehab changes or different targets.' },
    ],
    relatedSlugs: ['interventional-pain/cryoablation', 'interventional-pain/peripheral-nerve-block', 'rehabilitation-therapies/physiotherapy', 'spine-surgery/interspinous-spacers'],
    medicalEntity: { '@type': 'TherapeuticProcedure', name: 'Radiofrequency ablation', bodyLocation: 'Spine and peripheral nerves', followup: 'Rehabilitation plan and follow-up review.' },
  },
  {
    slug: 'interventional-pain/peripheral-nerve-block',
    title: 'Peripheral nerve block',
    dateISO: '2024-06-13',
    description:
      'A peripheral nerve block uses local anaesthetic (sometimes with other medicines) near a nerve to reduce pain and sometimes improve diagnostic clarity. It can be used for acute pain, procedural pain, or chronic pain targets.',
    category: 'Interventional pain',
    tags: ['nerve block', 'peripheral nerve block', 'local anaesthetic', 'pain relief', 'diagnostic block'],
    coverImage: { src: '/assets/images/illustrative/pain-medicine-algarve-min.jpg', alt: 'Clinical illustration related to interventional pain care.' },
    bodyLocation: 'Peripheral nerves (varies by target)',
    conditionsTreated: ['Procedure-related pain control', 'Selected chronic pain targets', 'Diagnostic clarification for nerve-related pain'],
    duration: '10–45 minutes',
    setting: 'Outpatient clinic or day procedure',
    anesthesia: 'Local anaesthetic at the skin; block medicine provides the primary numbing effect',
    mechanism: ['Local anaesthetic temporarily reduces nerve signal conduction', 'Some blocks are used diagnostically to confirm a pain generator', 'Ultrasound guidance improves accuracy and safety for many blocks'],
    expectedOutcomes: ['Temporary pain reduction to enable movement or therapy', 'Information about whether a nerve target is contributing to pain', 'Reduced pain during or after a procedure when used for anaesthesia'],
    reliefDuration: 'Often hours to days (depends on medicines used and the target)',
    sideEffects: ['Temporary numbness or weakness in the target area', 'Bruising or soreness at the injection site', 'Allergic reactions are rare', 'Infection or bleeding is uncommon'],
    contraindications: ['Infection at injection site', 'Unmanaged bleeding risk', 'Allergy to planned medicines', 'Unclear diagnosis where risks outweigh potential benefit'],
    comparisons: ['Compared with RFA: nerve blocks are temporary; RFA aims for longer relief in selected targets', 'Compared with medication alone: blocks can offer rapid targeted relief for some conditions', 'Compared with surgery: blocks are less invasive and often part of a stepwise plan'],
    aftercare: ['Protect the numb area to avoid injury while sensation is reduced', 'Avoid driving if you have weakness or have been sedated', 'Resume gentle activity as advised', 'Track symptom changes to inform follow-up'],
    insuranceNotes: ['Coverage varies; diagnostic blocks may require documentation of suspected target and conservative care'],
    checklist: ['Confirm transport if sedation is used', 'Bring medication and allergy list', 'Plan for temporary numbness/weakness after the block'],
    patientStory: {
      title: 'Patient story (composite example)',
      story: [
        'A person with suspected nerve-related pain received a targeted block and noted clear, time-limited symptom improvement.',
        'That response helped the team refine the diagnosis and build a more focused rehabilitation plan.',
        'This is a de-identified composite example for education. Individual outcomes vary.',
      ],
    },
    faq: [
      { question: 'Is a nerve block diagnostic or therapeutic?', answer: 'It can be either. Some blocks test whether a nerve is contributing to pain; others aim to reduce pain for a period.' },
      { question: 'How long will numbness last?', answer: 'Typically hours, sometimes longer depending on medicines used.' },
      { question: 'Can I drive after a nerve block?', answer: 'Not if you have numbness/weakness or sedation. Follow clinician advice.' },
      { question: 'Do nerve blocks have steroids?', answer: 'Some do, but many use only local anaesthetic. Your clinician will explain the plan.' },
      { question: 'What are warning signs after a block?', answer: 'High fever, increasing redness, severe swelling, or breathing problems should be assessed urgently.' },
      { question: 'Can blocks be repeated?', answer: 'Sometimes, but repetition depends on diagnosis, response, and risk profile.' },
    ],
    relatedSlugs: ['interventional-pain/radiofrequency-ablation', 'interventional-pain/intra-articular-corticosteroid-injection', 'rehabilitation-therapies/physiotherapy', 'pain-medicine-algarve'],
    medicalEntity: { '@type': 'TherapeuticProcedure', name: 'Peripheral nerve block', bodyLocation: 'Peripheral nerves', followup: 'Follow-up assessment and plan adjustment based on response.' },
  },
  {
    slug: 'interventional-pain/intra-articular-corticosteroid-injection',
    title: 'Intra-articular corticosteroid injection',
    dateISO: '2024-06-11',
    description:
      'A corticosteroid joint injection places anti-inflammatory medicine inside a joint to reduce pain and stiffness in selected inflammatory or degenerative conditions. Relief is usually time-limited and works best alongside rehabilitation.',
    category: 'Interventional pain',
    tags: ['corticosteroid injection', 'joint injection', 'arthritis', 'pain relief', 'inflammation'],
    coverImage: { src: '/assets/images/illustrative/shoulder-pain-min.jpg', alt: 'Illustration representing shoulder and joint pain.' },
    bodyLocation: 'Joints (for example knee, shoulder, hip—target depends on symptoms)',
    conditionsTreated: ['Inflammatory flares in arthritis', 'Adhesive capsulitis (frozen shoulder) in selected phases', 'Pain-limited rehab when inflammation is a driver'],
    duration: '10–30 minutes',
    setting: 'Outpatient clinic',
    anesthesia: 'Local anaesthetic; sometimes combined with the injection',
    mechanism: ['Steroid reduces inflammatory signalling inside the joint', 'Local anaesthetic can provide short-term pain relief and confirm target', 'Relief can enable more effective rehabilitation and movement'],
    expectedOutcomes: ['Reduced pain to improve sleep and movement', 'Improved tolerance for physiotherapy and exercise', 'Reduced flare intensity for some people'],
    reliefDuration: 'Often weeks to a few months; varies by joint and condition',
    sideEffects: ['Temporary pain flare for 24–48 hours', 'Skin colour change or fat atrophy at injection site (uncommon)', 'Temporary blood sugar rise in diabetics', 'Infection is rare but serious'],
    contraindications: ['Active infection', 'Uncontrolled diabetes (relative, needs planning)', 'Allergy to injection medicines', 'Very frequent repeat injections (risk to cartilage/tendons depending on site)'],
    comparisons: ['Compared with PRP: PRP has different evidence and timing; selection depends on diagnosis and goals', 'Compared with physiotherapy alone: injection can reduce pain to enable better rehab participation', 'Compared with oral anti-inflammatories: injection can be more targeted with different risk trade-offs'],
    aftercare: ['Rest the joint for 24 hours; then resume gentle activity', 'Avoid heavy load for a short period as advised', 'Start/continue rehab within the relief window', 'Monitor for increasing redness, severe pain, or fever'],
    insuranceNotes: ['Coverage often depends on diagnosis and documentation of failed conservative care', 'Ultrasound-guided injections may have different coverage rules'],
    checklist: ['Bring medication list, especially blood thinners', 'If you have diabetes, plan blood sugar monitoring after injection', 'Schedule physiotherapy shortly after to use the relief window'],
    patientStory: {
      title: 'Patient story (composite example)',
      story: [
        'A person with a painful shoulder flare could not sleep and avoided movement, making rehab hard to start.',
        'After an injection and a clear exercise plan, they regained motion and reduced flare cycles over the following weeks.',
        'This is a de-identified composite example for education. Individual outcomes vary.',
      ],
    },
    faq: [
      { question: 'How soon will I feel relief?', answer: 'Local anaesthetic can help the same day; steroid effect may take several days.' },
      { question: 'How often can I have injections?', answer: 'It depends on the joint and diagnosis. Repeated injections have limits and should be discussed with your clinician.' },
      { question: 'Can injections weaken tendons?', answer: 'Steroids can increase tendon risk in some locations. Proper targeting and spacing matter.' },
      { question: 'Is it safe if I have diabetes?', answer: 'It can be, but steroids may raise blood sugar. Plan monitoring and discuss with your clinician.' },
      { question: 'Do I still need physiotherapy?', answer: 'Usually yes. Rehab helps convert symptom relief into lasting function improvements.' },
      { question: 'What are warning signs?', answer: 'Severe increasing pain, fever, or spreading redness needs urgent assessment.' },
    ],
    relatedSlugs: ['interventional-pain/prp-injection', 'interventional-pain/hydrodistention', 'rehabilitation-therapies/physiotherapy', 'rehabilitation-therapies/exercise-therapy'],
    medicalEntity: { '@type': 'TherapeuticProcedure', name: 'Intra-articular corticosteroid injection', bodyLocation: 'Joint', followup: 'Rehabilitation plan and monitoring for response and side effects.' },
  },
  {
    slug: 'interventional-pain/calcification-barbotage',
    title: 'Calcification barbotage (ultrasound-guided lavage)',
    dateISO: '2024-06-09',
    description:
      'Calcification barbotage uses ultrasound guidance to wash out calcium deposits in tendons (commonly the rotator cuff) to reduce pain and improve movement when calcific tendinitis is the driver.',
    category: 'Interventional pain',
    tags: ['calcific tendinitis', 'barbotage', 'ultrasound guided lavage', 'shoulder pain', 'rotator cuff'],
    coverImage: { src: '/assets/images/illustrative/Shoulder-Pain-min-1.jpg', alt: 'Illustration representing shoulder anatomy and pain.' },
    bodyLocation: 'Shoulder tendons (often rotator cuff)',
    conditionsTreated: ['Calcific tendinitis causing pain and movement limitation'],
    duration: '20–60 minutes',
    setting: 'Outpatient clinic',
    anesthesia: 'Local anaesthetic',
    mechanism: ['Needle lavage breaks up and removes calcium deposits', 'Reducing deposit burden can reduce mechanical irritation and inflammatory response', 'Often combined with rehab to restore strength and motion'],
    expectedOutcomes: ['Reduced pain over days to weeks', 'Improved range of motion', 'Better tolerance for strengthening'],
    reliefDuration: 'If the deposit is successfully reduced, benefit can be long-lasting; recurrence varies',
    sideEffects: ['Temporary soreness', 'Bruising', 'Temporary flare of pain', 'Infection is rare'],
    contraindications: ['Infection', 'Unmanaged bleeding risk', 'Unclear diagnosis or non-calcific tendon pain'],
    comparisons: ['Compared with steroid injection: barbotage targets the deposit itself', 'Compared with shockwave therapy: both can be options; selection depends on deposit type and symptoms', 'Compared with surgery: barbotage is less invasive and often tried first for suitable deposits'],
    aftercare: ['Relative rest for 24–48 hours', 'Gentle mobility then progressive strengthening', 'Avoid heavy overhead load early on', 'Follow-up review if pain worsens or function declines'],
    insuranceNotes: ['Coverage may depend on imaging-confirmed calcification and documentation of symptoms and conservative care'],
    checklist: ['Bring ultrasound/X-ray reports if available', 'Avoid heavy shoulder loading the day before', 'Plan a light day after the procedure'],
    patientStory: {
      title: 'Patient story (composite example)',
      story: [
        'A person with severe shoulder pain and imaging-confirmed calcific tendinitis struggled to lift the arm.',
        'After barbotage and a graded strengthening plan, pain gradually reduced and function improved.',
        'This is a de-identified composite example for education. Individual outcomes vary.',
      ],
    },
    faq: [
      { question: 'Is barbotage painful?', answer: 'Local anaesthetic is used. Some pressure or soreness can occur during and after the procedure.' },
      { question: 'How soon can I use my shoulder?', answer: 'Gentle use is usually encouraged; heavy lifting is delayed briefly depending on symptoms.' },
      { question: 'Will I still need physiotherapy?', answer: 'Yes. Rehab helps restore capacity and reduces recurrence risk.' },
      { question: 'Does it remove all calcium?', answer: 'Not always. Even partial reduction can improve symptoms.' },
      { question: 'What if it does not work?', answer: 'Your clinician will review diagnosis and consider other options such as shockwave therapy or surgery.' },
      { question: 'Are there risks?', answer: 'Serious risks are uncommon; infection and bleeding are rare.' },
    ],
    relatedSlugs: ['interventional-pain/intra-articular-corticosteroid-injection', 'rehabilitation-therapies/physiotherapy', 'shoulder-pain', 'rehabilitation-therapies/exercise-therapy'],
    medicalEntity: { '@type': 'TherapeuticProcedure', name: 'Ultrasound-guided calcification barbotage', bodyLocation: 'Shoulder tendon', followup: 'Rehabilitation and follow-up assessment.' },
  },
  {
    slug: 'interventional-pain/cryoablation',
    title: 'Cryoablation (cryoanalgesia)',
    dateISO: '2024-06-07',
    description:
      'Cryoablation uses controlled freezing to reduce pain signalling from targeted nerves. It can be an alternative to heat-based techniques for selected pain targets.',
    category: 'Interventional pain',
    tags: ['cryoablation', 'cryoanalgesia', 'nerve pain', 'pain relief', 'procedure'],
    coverImage: { src: '/assets/images/illustrative/pain-medicine-algarve-min.jpg', alt: 'Clinical illustration related to pain medicine.' },
    bodyLocation: 'Targeted nerves (varies by indication)',
    conditionsTreated: ['Selected nerve-related pain targets', 'Some post-surgical or scar-related pain targets (case-dependent)'],
    duration: '30–90 minutes',
    setting: 'Outpatient day procedure',
    anesthesia: 'Local anaesthetic; sometimes light sedation',
    mechanism: ['A probe creates an ice ball to temporarily disrupt nerve signalling', 'The goal is to reduce pain while preserving surrounding structures', 'Technique and target selection influence duration and response'],
    expectedOutcomes: ['Reduced pain to enable rehabilitation', 'Improved sleep and activity tolerance', 'Reduced medication reliance for some people'],
    reliefDuration: 'Often months; duration varies by target and nerve regeneration',
    sideEffects: ['Temporary soreness', 'Temporary numbness', 'Skin sensitivity changes near superficial nerves', 'Infection or bleeding (uncommon)'],
    contraindications: ['Active infection', 'Unmanaged bleeding risk', 'Target too close to skin without appropriate safeguards', 'Diagnosis not matched to a treatable target'],
    comparisons: ['Compared with RFA: both target nerves; selection depends on anatomy and clinician preference', 'Compared with injections: nerve ablation aims for longer relief when appropriate', 'Compared with rehab alone: procedures are most effective when paired with rehab progressions'],
    aftercare: ['Avoid strenuous activity for 24–48 hours', 'Use symptom-guided walking and gentle movement', 'Start or resume rehabilitation during the relief window', 'Follow-up review to assess function changes'],
    insuranceNotes: ['Coverage varies and may require documentation of prior treatments and target selection rationale'],
    checklist: ['Medication and allergy list', 'Anticoagulant management plan', 'Arrange transport if sedation is used'],
    patientStory: {
      title: 'Patient story (composite example)',
      story: [
        'A person with a clear peripheral nerve pain target had limited function due to repeated flare-ups.',
        'After cryoablation and a graded activity plan, symptom intensity reduced and daily activities became more consistent.',
        'This is a de-identified composite example for education. Individual outcomes vary.',
      ],
    },
    faq: [
      { question: 'Does freezing damage the nerve permanently?', answer: 'Benefit is often temporary as nerves can recover; the timeline varies.' },
      { question: 'How is it different from RFA?', answer: 'RFA uses heat; cryoablation uses freezing. Targets and expected duration can differ.' },
      { question: 'When does relief start?', answer: 'Some feel improvement within days; others take longer as soreness settles.' },
      { question: 'Is it safe?', answer: 'Serious complications are uncommon with correct selection and technique.' },
      { question: 'Can it be repeated?', answer: 'Sometimes, depending on response and risk profile.' },
      { question: 'Do I still need rehabilitation?', answer: 'Yes. Rehab helps convert symptom relief into lasting function improvements.' },
    ],
    relatedSlugs: ['interventional-pain/radiofrequency-ablation', 'interventional-pain/peripheral-nerve-block', 'rehabilitation-therapies/exercise-therapy', 'rehabilitation-therapies/physiotherapy'],
    medicalEntity: { '@type': 'TherapeuticProcedure', name: 'Cryoablation', bodyLocation: 'Peripheral nerves', followup: 'Follow-up assessment and rehabilitation.' },
  },
  {
    slug: 'interventional-pain/nucleoplasty',
    title: 'Nucleoplasty (disc decompression)',
    dateISO: '2024-06-05',
    description:
      'Nucleoplasty is a minimally invasive disc procedure that uses a small probe to reduce disc volume and pressure in selected cases, aiming to improve nerve-related symptoms from contained disc problems.',
    category: 'Interventional pain',
    tags: ['nucleoplasty', 'disc decompression', 'back pain', 'sciatica', 'minimally invasive'],
    coverImage: { src: '/assets/images/illustrative/Lumber-Spine-Pain-min.jpg', alt: 'Illustration representing lumbar spine and discs.' },
    bodyLocation: 'Spine (intervertebral disc)',
    conditionsTreated: ['Contained disc bulge with nerve irritation in selected patients', 'Disc-related leg pain in specific cases'],
    duration: '30–60 minutes',
    setting: 'Day procedure',
    anesthesia: 'Local anaesthetic with sedation (varies)',
    mechanism: ['A small probe reduces disc material volume (for example, using plasma-mediated energy)', 'Reduced disc pressure can lessen nerve irritation in selected disc patterns', 'Selection is critical; it is not appropriate for all herniations'],
    expectedOutcomes: ['Reduced leg pain in selected cases', 'Improved walking tolerance', 'Earlier participation in rehabilitation'],
    reliefDuration: 'Variable; depends on disc pattern and overall management plan',
    sideEffects: ['Temporary soreness', 'Temporary symptom flare', 'Bleeding or infection (uncommon)', 'Persistent symptoms if disc pattern is not suitable'],
    contraindications: ['Large sequestered herniation requiring different management', 'Infection', 'Unmanaged bleeding risk', 'Progressive neurological deficit requiring urgent assessment'],
    comparisons: ['Compared with surgery: nucleoplasty is less invasive but more limited in what it can treat', 'Compared with injections: it targets disc pressure rather than inflammation alone', 'Compared with rehab alone: best used when a treatable disc pattern limits progress'],
    aftercare: ['Short period of reduced bending/lifting as advised', 'Walking and gentle movement early', 'Progressive rehab focused on strength and load management', 'Follow-up review if symptoms persist or worsen'],
    insuranceNotes: ['Coverage varies and may require documentation of imaging findings and conservative care'],
    checklist: ['Bring imaging reports', 'Confirm anticoagulant plan', 'Arrange transport if sedated', 'Plan a gradual return to activity with rehab support'],
    patientStory: {
      title: 'Patient story (composite example)',
      story: [
        'A person with persistent leg pain and a contained disc issue struggled to progress with rehabilitation.',
        'After nucleoplasty and a graded exercise plan, walking tolerance improved and flare-ups reduced.',
        'This is a de-identified composite example for education. Individual outcomes vary.',
      ],
    },
    faq: [
      { question: 'Is nucleoplasty the same as a discectomy?', answer: 'No. Discectomy is a surgical removal of disc material; nucleoplasty is a minimally invasive decompression technique for selected disc patterns.' },
      { question: 'How quickly does it work?', answer: 'Some improve within weeks; others need longer and rehab is important.' },
      { question: 'Will it fix back pain?', answer: 'It is aimed at selected disc-related symptoms, often leg-dominant. Back pain can have multiple drivers.' },
      { question: 'What if I have weakness?', answer: 'Progressive weakness needs urgent medical assessment; suitability depends on findings.' },
      { question: 'Do I need physio afterward?', answer: 'Yes. Rehab helps restore capacity and reduce recurrence risk.' },
      { question: 'Are results guaranteed?', answer: 'No. Response depends strongly on selection and diagnosis.' },
    ],
    relatedSlugs: ['spine-surgery/tubular-microsurgery', 'interventional-pain/radiofrequency-ablation', 'rehabilitation-therapies/physiotherapy', 'lumbar-spine-pain'],
    medicalEntity: { '@type': 'TherapeuticProcedure', name: 'Nucleoplasty', bodyLocation: 'Intervertebral disc', followup: 'Rehabilitation and follow-up review.' },
  },
  {
    slug: 'interventional-pain/prp-injection',
    title: 'Platelet-rich plasma (PRP) injection',
    dateISO: '2024-06-03',
    description:
      'PRP injection uses a concentrated portion of your own blood (platelets and growth factors) placed into a target tissue to support healing in selected tendon, ligament, or joint conditions. Evidence varies by condition.',
    category: 'Interventional pain',
    tags: ['PRP injection', 'platelet rich plasma', 'tendinopathy', 'osteoarthritis', 'sports medicine'],
    coverImage: { src: '/assets/images/illustrative/sports-medicine-min.jpeg', alt: 'Illustration representing sports medicine and recovery.' },
    bodyLocation: 'Tendons, ligaments, or joints (target depends on diagnosis)',
    conditionsTreated: ['Selected tendinopathies', 'Some mild-to-moderate osteoarthritis cases', 'Soft tissue healing support in specific indications'],
    duration: '30–60 minutes',
    setting: 'Outpatient clinic',
    anesthesia: 'Local anaesthetic at the skin; anaesthetic in the target is case-dependent',
    mechanism: ['Blood is processed to concentrate platelets', 'Platelets release growth factors that may influence healing response', 'Best results usually require a structured loading and rehab plan'],
    expectedOutcomes: ['Gradual symptom improvement over weeks to months', 'Improved tissue load tolerance', 'Reduced pain flare frequency with appropriate rehab'],
    reliefDuration: 'Varies; some people report months of benefit, especially when rehab is optimised',
    sideEffects: ['Soreness at injection site', 'Temporary pain flare', 'Bruising', 'Infection is rare'],
    contraindications: ['Active infection', 'Blood disorders or anticoagulation considerations (case-dependent)', 'Unclear diagnosis or unrealistic expectations', 'Severe joint damage where other options may be more appropriate'],
    comparisons: ['Compared with steroid injections: steroids can reduce inflammation quickly; PRP is often slower and condition-dependent', 'Compared with exercise therapy: PRP is usually an adjunct, not a replacement', 'Compared with surgery: PRP is less invasive but not appropriate for structural problems needing repair'],
    aftercare: ['Relative rest for 24–48 hours', 'Avoid heavy load briefly, then follow a graded loading plan', 'Schedule rehabilitation follow-up', 'Track function changes rather than pain alone'],
    insuranceNotes: ['Coverage for PRP varies widely; some insurers consider it elective', 'Ask about package costs and follow-up rehabilitation coverage'],
    checklist: ['Confirm whether to avoid NSAIDs around the procedure (clinician-specific guidance)', 'Bring medication list', 'Plan rehab schedule for the following weeks'],
    patientStory: {
      title: 'Patient story (composite example)',
      story: [
        'A person with chronic tendon pain had plateaued despite exercise progressions.',
        'After PRP and an updated loading plan, symptoms improved gradually over the next months.',
        'This is a de-identified composite example for education. Individual outcomes vary.',
      ],
    },
    faq: [
      { question: 'How long does PRP take to work?', answer: 'It is usually gradual, often weeks to months, depending on the condition and rehab adherence.' },
      { question: 'Is PRP better than steroids?', answer: 'They serve different goals. Steroids are often faster for inflammation; PRP may be helpful for selected tendon conditions.' },
      { question: 'Do I need imaging guidance?', answer: 'Often yes, especially for tendon or joint targets, to improve accuracy.' },
      { question: 'Is PRP safe?', answer: 'It uses your own blood, and serious complications are uncommon, but any injection carries risk.' },
      { question: 'How many injections are needed?', answer: 'It depends on diagnosis and response. Some need one; others follow a series.' },
      { question: 'Should I stop NSAIDs?', answer: 'Ask your clinician. Recommendations vary by protocol and target.' },
    ],
    relatedSlugs: ['interventional-pain/intra-articular-corticosteroid-injection', 'rehabilitation-therapies/exercise-therapy', 'rehabilitation-therapies/physiotherapy', 'injuries'],
    medicalEntity: { '@type': 'TherapeuticProcedure', name: 'Platelet-rich plasma injection', bodyLocation: 'Tendons, ligaments, or joints', followup: 'Rehabilitation plan and follow-up.' },
  },
  {
    slug: 'interventional-pain/hydrodistention',
    title: 'Hydrodistention (for frozen shoulder)',
    dateISO: '2024-06-01',
    description:
      'Hydrodistention involves injecting fluid into the shoulder joint capsule to stretch it and improve motion in selected cases of frozen shoulder (adhesive capsulitis). Rehabilitation afterward is key.',
    category: 'Interventional pain',
    tags: ['hydrodistention', 'frozen shoulder', 'adhesive capsulitis', 'shoulder stiffness', 'rehab'],
    coverImage: { src: '/assets/images/illustrative/Shoulder-Pain-min-1.jpg', alt: 'Illustration representing shoulder pain and stiffness.' },
    bodyLocation: 'Shoulder joint capsule',
    conditionsTreated: ['Frozen shoulder (adhesive capsulitis) in selected phases'],
    duration: '20–45 minutes',
    setting: 'Outpatient clinic',
    anesthesia: 'Local anaesthetic',
    mechanism: ['Fluid stretches the tight capsule', 'Reduced capsular tightness can improve range of motion', 'Best outcomes usually require guided stretching and strengthening afterward'],
    expectedOutcomes: ['Improved shoulder motion', 'Reduced pain during movement', 'Better tolerance for daily tasks and rehab'],
    reliefDuration: 'Motion gains can persist when rehab maintains them; symptoms can fluctuate by phase',
    sideEffects: ['Temporary soreness', 'Transient flare of pain', 'Bruising', 'Infection is rare'],
    contraindications: ['Infection', 'Unmanaged bleeding risk', 'Unclear diagnosis (for example, major rotator cuff tear causing weakness)'],
    comparisons: ['Compared with steroid injection: both can reduce pain; hydrodistention focuses on capsule stretching', 'Compared with physiotherapy alone: procedure may speed early motion gains for some', 'Compared with surgery: less invasive and often tried before surgical release'],
    aftercare: ['Start stretching the same day or next day as advised', 'Schedule physiotherapy quickly to maintain motion gains', 'Use pain relief strategies to tolerate movement', 'Track functional improvements (reaching, dressing, sleep)'],
    insuranceNotes: ['Coverage may require imaging/exam confirmation of adhesive capsulitis and conservative care trial'],
    checklist: ['Plan physiotherapy sessions soon after', 'Wear comfortable clothing for shoulder access', 'Bring medication list and allergies'],
    patientStory: {
      title: 'Patient story (composite example)',
      story: [
        'A person with marked shoulder stiffness struggled with dressing and reaching overhead.',
        'After hydrodistention and structured stretching, range of motion improved and daily tasks became easier.',
        'This is a de-identified composite example for education. Individual outcomes vary.',
      ],
    },
    faq: [
      { question: 'Will hydrodistention cure frozen shoulder?', answer: 'It can help with motion, but frozen shoulder often improves over time. Rehab and phase-specific management matter.' },
      { question: 'Does it hurt?', answer: 'Local anaesthetic is used. Some pressure and temporary soreness are common.' },
      { question: 'How soon should I start physiotherapy?', answer: 'Usually as soon as possible to keep the motion gains.' },
      { question: 'How long do results last?', answer: 'Gains last better when maintained with exercises. Symptoms can still fluctuate.' },
      { question: 'Is it safe?', answer: 'Serious complications are rare when done correctly.' },
      { question: 'What if it does not help?', answer: 'Your clinician may adjust rehab or discuss other options such as injections or surgery.' },
    ],
    relatedSlugs: ['interventional-pain/intra-articular-corticosteroid-injection', 'rehabilitation-therapies/physiotherapy', 'interventional-pain/calcification-barbotage', 'shoulder-pain'],
    medicalEntity: { '@type': 'TherapeuticProcedure', name: 'Hydrodistention', bodyLocation: 'Shoulder joint capsule', followup: 'Physiotherapy and follow-up assessment.' },
  },
  {
    slug: 'interventional-pain/botulinum-toxin-injection',
    title: 'Botulinum toxin injection',
    dateISO: '2024-05-30',
    description:
      'Botulinum toxin injections can reduce muscle overactivity and spasticity, helping comfort, posture, and function in selected neurological and musculoskeletal conditions. Therapy integration is essential.',
    category: 'Interventional pain',
    tags: ['botulinum toxin', 'spasticity', 'stroke rehabilitation', 'muscle overactivity', 'injection'],
    coverImage: { src: '/assets/images/illustrative/post-stroke-min.jpg', alt: 'Illustration representing post-stroke rehabilitation.' },
    bodyLocation: 'Target muscles (for example arm/leg spasticity patterns)',
    conditionsTreated: ['Post-stroke spasticity', 'Focal dystonia patterns in selected cases', 'Some pain conditions linked to muscle overactivity (case-dependent)'],
    duration: '20–45 minutes',
    setting: 'Outpatient clinic',
    anesthesia: 'Usually none; sometimes topical/local anaesthetic for comfort',
    mechanism: ['Reduces acetylcholine release at the neuromuscular junction to lower muscle overactivity', 'Effect is temporary and dose/target dependent', 'Works best alongside stretching, splinting (if needed), and task-specific therapy'],
    expectedOutcomes: ['Reduced stiffness and easier movement', 'Improved comfort and hygiene care', 'Better ability to practise functional tasks in therapy'],
    reliefDuration: 'Often 8–16 weeks; varies by dose and individual response',
    sideEffects: ['Local soreness or bruising', 'Temporary weakness in injected muscles', 'Flu-like symptoms (uncommon)', 'Spread effects are rare at appropriate dosing'],
    contraindications: ['Infection at injection site', 'Certain neuromuscular conditions (case-dependent)', 'Pregnancy/breastfeeding considerations (case-dependent)', 'Unrealistic goals without a therapy plan to use the effect window'],
    comparisons: ['Compared with oral antispasticity medicines: injections are focal with different side effect trade-offs', 'Compared with physiotherapy alone: injections can reduce tone to make therapy more effective', 'Compared with surgery: far less invasive and typically trialled first'],
    aftercare: ['Begin or continue therapy within days', 'Track functional goals (hand opening, walking, hygiene)', 'Plan follow-up timing as effects wear off', 'Continue self-management stretching and positioning'],
    insuranceNotes: ['Coverage may require documentation of spasticity severity, functional goals, and prior therapy', 'Some plans require periodic reassessment for ongoing approval'],
    checklist: ['Bring a list of functional goals you want to improve', 'Wear clothing that allows access to target muscles', 'Plan therapy appointments after injection'],
    patientStory: {
      title: 'Patient story (composite example)',
      story: [
        'A person with post-stroke arm spasticity found dressing and hygiene difficult due to stiffness.',
        'After targeted injections and therapy, hand opening improved enough to practise daily tasks more comfortably.',
        'This is a de-identified composite example for education. Individual outcomes vary.',
      ],
    },
    faq: [
      { question: 'How long does it take to work?', answer: 'Effects typically start within days and peak over 1–2 weeks.' },
      { question: 'Will it make me weak?', answer: 'Some targeted weakness can occur; dosing and muscle selection aim to balance function and tone reduction.' },
      { question: 'How often is it repeated?', answer: 'Often every 3–4 months, depending on goals and response.' },
      { question: 'Do I need therapy afterwards?', answer: 'Yes. Therapy uses the effect window to improve function and movement patterns.' },
      { question: 'Is it safe after stroke?', answer: 'It is commonly used for post-stroke spasticity when clinically appropriate.' },
      { question: 'What if it does not help?', answer: 'Your team will reassess targets, goals, and alternatives.' },
    ],
    relatedSlugs: ['post-stroke-spasticity', 'rehabilitation-therapies/physiotherapy', 'rehabilitation-therapies/occupational-therapy', 'rehabilitation-therapies/home-care'],
    medicalEntity: { '@type': 'TherapeuticProcedure', name: 'Botulinum toxin injection', bodyLocation: 'Target muscles', followup: 'Therapy integration and reassessment.' },
  },
];

const rehabReferences: ArticleReference[] = [
  { label: 'NHS (UK) — Physiotherapy', url: 'https://www.nhs.uk/conditions/physiotherapy/' },
  { label: 'NHS (UK) — Medicines information', url: 'https://www.nhs.uk/medicines/' },
  { label: 'WHO — Health topics', url: 'https://www.who.int/health-topics' },
  { label: 'Cochrane — Evidence summaries', url: 'https://www.cochrane.org/evidence' },
  { label: 'CDC — Healthy Living', url: 'https://www.cdc.gov/healthyliving/index.html' },
];

type TherapyConfig = {
  slug: string;
  title: string;
  dateISO: string;
  description: string;
  category: string;
  tags: string[];
  coverImage: BlogArticle['coverImage'];
  philosophy: string[];
  assessment: string[];
  plan: string[];
  equipment: string[];
  frequency: string;
  outcomes: string[];
  integration: string[];
  selfManagement: string[];
  checklist: string[];
  patientStory: { title: string; story: string[] };
  faq: ArticleFaqItem[];
  relatedSlugs: string[];
  medicalEntity: BlogArticle['medicalEntity'];
};

const buildTherapySections = (cfg: TherapyConfig): ArticleSection[] => [
  {
    id: 'overview',
    heading: 'Overview',
    blocks: [
      { type: 'p', text: cfg.description },
      { type: 'p', text: 'Supportive therapies work best when they are personalised, measurable, and integrated with medical care. This guide explains what to expect and how to track progress.' },
      { type: 'img', src: cfg.coverImage.src, alt: cfg.coverImage.alt, caption: 'Illustrative image.' },
    ],
  },
  {
    id: 'philosophy',
    heading: 'Treatment philosophy',
    blocks: [
      { type: 'h3', text: 'Core principles' },
      { type: 'ul', items: cfg.philosophy },
    ],
  },
  {
    id: 'assessment',
    heading: 'Assessment process',
    blocks: [
      { type: 'h3', text: 'What your clinician assesses' },
      { type: 'ul', items: cfg.assessment },
    ],
  },
  {
    id: 'plan',
    heading: 'Customised treatment plans',
    blocks: [
      { type: 'h3', text: 'What a plan typically includes' },
      { type: 'ul', items: cfg.plan },
    ],
  },
  {
    id: 'equipment',
    heading: 'Equipment and tools',
    blocks: [
      { type: 'p', text: 'Equipment depends on goals and home environment. Many programmes can start with minimal tools and progress over time.' },
      { type: 'h3', text: 'Common equipment' },
      { type: 'ul', items: cfg.equipment },
    ],
  },
  {
    id: 'frequency',
    heading: 'Session frequency and follow-up',
    blocks: [
      { type: 'p', text: `Typical frequency: ${cfg.frequency}. Your clinician will adjust based on progress, complexity, and safety.` },
    ],
  },
  {
    id: 'outcomes',
    heading: 'Measurable outcomes (how progress is tracked)',
    blocks: [
      { type: 'h3', text: 'Examples of measures' },
      { type: 'ul', items: cfg.outcomes },
    ],
  },
  {
    id: 'integration',
    heading: 'Integration with medical treatments',
    blocks: [
      { type: 'h3', text: 'How it fits with medical care' },
      { type: 'ul', items: cfg.integration },
    ],
  },
  {
    id: 'self-management',
    heading: 'Self-management strategies',
    blocks: [
      { type: 'h3', text: 'What you can do between sessions' },
      { type: 'ul', items: cfg.selfManagement },
    ],
  },
  { id: 'testimonial', heading: cfg.patientStory.title, blocks: cfg.patientStory.story.map((t) => ({ type: 'p', text: t })) },
  { id: 'next-steps', heading: 'Next steps', blocks: [{ type: 'p', text: 'Bring your goals, medication list, and a short symptom timeline to your consultation. A clinician can help coordinate the right team members and a practical plan.' }] },
  { id: 'disclaimer', heading: 'Medical disclaimer', blocks: [{ type: 'p', text: 'This article is for general education only and is not medical advice. Seek individual assessment for persistent, severe, or worsening symptoms.' }] },
];

const buildTherapyQuickFacts = (cfg: TherapyConfig): ArticleQuickFact[] => [
  { label: 'Typical frequency', value: cfg.frequency },
  { label: 'Focus', value: cfg.tags.slice(0, 3).join(', ') },
  { label: 'Tools', value: cfg.equipment.slice(0, 3).join(', ') },
];

const rehabTherapies: TherapyConfig[] = [
  {
    slug: 'rehabilitation-therapies/pharmacological-pain-management',
    title: 'Pharmacological pain management',
    dateISO: '2024-05-28',
    description:
      'Pharmacological pain management uses medicines thoughtfully to reduce symptoms, improve sleep, and support function while minimising side effects. It is most effective when combined with rehabilitation and self-management strategies.',
    category: 'Rehabilitation therapies',
    tags: ['pain medication', 'chronic pain', 'sleep', 'side effects', 'tapering'],
    coverImage: { src: '/assets/images/illustrative/Pharmacological-Pain-Management-min.jpg', alt: 'Illustration representing medication management and pain care.' },
    philosophy: ['Use the lowest effective dose for the shortest necessary duration', 'Match medicine choice to pain mechanism and patient factors', 'Prioritise safety: interactions, dependence risk, and monitoring'],
    assessment: ['Review diagnosis, pain pattern, and function goals', 'Medication list reconciliation (including supplements)', 'Screen for sleep, mood, and risk factors', 'Agree on monitoring plan and stop rules'],
    plan: ['Stepwise approach with clear trial periods', 'Side effect prevention (for example constipation plans where relevant)', 'Tapering strategy when appropriate', 'Coordination with physiotherapy and psychology when needed'],
    equipment: ['Medication list template', 'Symptom and side-effect tracker', 'Blood pressure or glucose monitoring when relevant'],
    frequency: 'Reviews every 2–6 weeks during changes; longer intervals once stable',
    outcomes: ['Function goals (walking time, work tolerance)', 'Sleep quality', 'Side effects and adherence', 'Reduced flare frequency'],
    integration: ['Coordinate medicine timing around rehabilitation sessions', 'Avoid sedating medicines before driving/work tasks as advised', 'Review procedure plans (injections/surgery) that may change medication needs'],
    selfManagement: ['Keep a simple daily tracker', 'Use pacing and graded activity to reduce flare cycles', 'Ask before stopping or starting medicines', 'Avoid sharing medicines and keep them stored safely'],
    checklist: ['Bring a complete medication and supplement list', 'List previous medicines tried and why they were stopped', 'Define 1–3 function goals for the next month', 'Plan monitoring for side effects'],
    patientStory: {
      title: 'Patient story (composite example)',
      story: [
        'A person with persistent pain struggled with poor sleep and medication side effects.',
        'After a structured review, the plan focused on safer options, clear trial periods, and better integration with rehabilitation.',
        'This is a de-identified composite example for education. Individual outcomes vary.',
      ],
    },
    faq: [
      { question: 'Are strong pain medicines always the best option?', answer: 'Not always. The best option balances benefit and safety, and often includes non-drug strategies.' },
      { question: 'Can I stop a medicine suddenly?', answer: 'Some medicines need tapering. Always discuss changes with your clinician.' },
      { question: 'How do we measure success?', answer: 'Use function goals (sleep, walking, work) and side-effect monitoring, not pain score alone.' },
      { question: 'Do medicines cure the cause?', answer: 'Most medicines manage symptoms. Treating the cause depends on diagnosis and may involve rehab or procedures.' },
      { question: 'What about addiction risk?', answer: 'Risk depends on medicine type and patient factors. Your clinician should discuss this openly.' },
      { question: 'How does medication fit with injections or surgery?', answer: 'Plans often change around procedures; coordination improves safety.' },
    ],
    relatedSlugs: ['rehabilitation-therapies/psychology', 'rehabilitation-therapies/physiotherapy', 'interventional-pain/radiofrequency-ablation', 'lumbar-spine-pain'],
    medicalEntity: { '@type': 'MedicalTherapy', name: 'Pharmacological pain management', followup: 'Regular review and monitoring plan.' },
  },
  {
    slug: 'rehabilitation-therapies/physiotherapy',
    title: 'Physiotherapy',
    dateISO: '2024-05-26',
    description:
      'Physiotherapy helps restore movement, strength, and confidence with activity through assessment, graded exercise, and practical strategies for flare-ups. It is central to recovery after procedures and for long-term pain management.',
    category: 'Rehabilitation therapies',
    tags: ['physiotherapy', 'rehabilitation', 'exercise', 'strength', 'self-management'],
    coverImage: { src: '/assets/images/illustrative/Physiotherapy-min.jpg', alt: 'Illustration representing physiotherapy and rehabilitation.' },
    philosophy: ['Build capacity through graded loading', 'Use education to reduce fear and improve self-efficacy', 'Focus on functional goals that matter to the patient'],
    assessment: ['History and symptom behaviour', 'Movement screening and strength/endurance testing', 'Functional measures (stairs, sit-to-stand, walking time)', 'Plan for safe progression and flare management'],
    plan: ['Personalised exercise programme with progressions', 'Manual therapy when appropriate as an adjunct', 'Return-to-work or return-to-sport planning', 'Home programme with clear minimum effective dose'],
    equipment: ['Resistance bands', 'Light weights', 'Step/box for functional training', 'Walking plan or activity tracker'],
    frequency: 'Often weekly or fortnightly early, then spaced as independence increases',
    outcomes: ['Pain interference with activity', 'Strength and endurance measures', 'Walking distance/time', 'Confidence and self-management skills'],
    integration: ['Use procedure relief windows to accelerate rehab progress', 'Coordinate with medication timing for participation', 'Flag red flags back to medical team'],
    selfManagement: ['Daily walking or activity routine', 'Strength progressions 2–3×/week as tolerated', 'Simple flare-up plan: reduce load, keep moving, reassess', 'Sleep and stress strategies when relevant'],
    checklist: ['Write down your top 3 goals', 'Bring supportive footwear and comfortable clothing', 'Track a week of activity and symptoms', 'List previous injuries/surgeries'],
    patientStory: {
      title: 'Patient story (composite example)',
      story: [
        'A person avoided movement due to fear of damage and repeated flare-ups.',
        'With graded exposure and measurable progressions, they rebuilt confidence and returned to daily activities.',
        'This is a de-identified composite example for education. Individual outcomes vary.',
      ],
    },
    faq: [
      { question: 'Do I need a scan before physiotherapy?', answer: 'Not always. Many problems can be assessed clinically; imaging is used when it changes management.' },
      { question: 'Will exercises make pain worse?', answer: 'Some discomfort can occur, but programmes are designed to be safe and progressive.' },
      { question: 'How many sessions will I need?', answer: 'It depends on goals and complexity. Many people transition to an independent plan over time.' },
      { question: 'Is manual therapy necessary?', answer: 'It can help some people, but long-term improvement usually requires active rehabilitation.' },
      { question: 'How do we measure progress?', answer: 'We track function (walking, strength, tasks) and confidence, not pain alone.' },
      { question: 'Can physiotherapy help after surgery?', answer: 'Yes. Rehab often improves recovery, strength, and return to activity.' },
    ],
    relatedSlugs: ['rehabilitation-therapies/exercise-therapy', 'rehabilitation-therapies/psychology', 'spine-surgery/spinal-fusion', 'interventional-pain/radiofrequency-ablation'],
    medicalEntity: { '@type': 'MedicalTherapy', name: 'Physiotherapy', followup: 'Reassessment and progressive plan adjustments.' },
  },
  {
    slug: 'rehabilitation-therapies/osteopathy',
    title: 'Osteopathy',
    dateISO: '2024-05-24',
    description:
      'Osteopathy combines hands-on assessment with movement advice and exercise planning to improve comfort and function. It is most effective when treatment is goal-based and paired with an active home plan.',
    category: 'Rehabilitation therapies',
    tags: ['osteopathy', 'manual therapy', 'mobility', 'back pain', 'neck pain'],
    coverImage: { src: '/assets/images/illustrative/Osteopathy-min.jpg', alt: 'Illustration representing osteopathy assessment and treatment.' },
    philosophy: [
      'Use hands-on techniques as an adjunct, not the whole plan.',
      'Improve function by combining movement retraining with symptom management.',
      'Support long-term change with education and home exercises.',
    ],
    assessment: [
      'History: symptom triggers, flare patterns, sleep, stress, and goals.',
      'Movement assessment: range, control, and tolerance to loading.',
      'Screening for red flags and referral needs when appropriate.',
      'Identify contributing factors such as posture, work demands, and deconditioning.',
    ],
    plan: [
      'Hands-on treatment targeted to your presentation (when appropriate).',
      'Simple mobility and strengthening exercises with progressions.',
      'Advice for work and daily activity pacing to reduce flare-ups.',
      'A flare-up plan: what to change for 24–48 hours and how to restart progressions.',
    ],
    equipment: ['Comfortable clothing', 'Resistance band', 'Foam roller or massage ball (optional)'],
    frequency: 'Often weekly or fortnightly early, then spaced as self-management improves',
    outcomes: ['Improved task tolerance (sitting, walking, lifting)', 'Range of motion and movement confidence', 'Reduced flare frequency and faster recovery from flare-ups'],
    integration: ['Coordinate with imaging results and medical review when needed', 'Combine with physiotherapy/exercise therapy for capacity building', 'Use injections or surgery recovery windows to progress rehab safely'],
    selfManagement: ['Daily movement breaks', 'Short mobility routine', 'Graded strengthening 2–3×/week', 'Track triggers and adjust load rather than stopping activity completely'],
    checklist: ['List your top 3 activities you want to do more comfortably', 'Bring any imaging reports', 'Wear clothing that allows movement assessment', 'Be ready to discuss your typical week and flare pattern'],
    patientStory: {
      title: 'Patient story (composite example)',
      story: [
        'A person with recurrent back pain relied on rest during flare-ups and lost confidence with movement.',
        'With a combined hands-on and exercise plan, they learned pacing and progressed strength, reducing flare frequency over time.',
        'This is a de-identified composite example for education. Individual outcomes vary.',
      ],
    },
    faq: [
      { question: 'Is osteopathy only “hands-on” treatment?', answer: 'No. Many osteopaths combine manual treatment with exercise, education, and activity planning for longer-term change.' },
      { question: 'Will I need imaging first?', answer: 'Not always. Imaging is useful when it changes management or when red flags are present.' },
      { question: 'Can osteopathy help chronic pain?', answer: 'Often as part of a broader plan that includes graded activity, sleep strategies, and sometimes psychology or medication support.' },
      { question: 'How many sessions are typical?', answer: 'It varies. Many people start with a few sessions and transition to an independent home plan.' },
      { question: 'What should I feel after a session?', answer: 'Mild soreness can happen. Severe or worsening symptoms should be discussed with your clinician.' },
      { question: 'Do I still need exercise?', answer: 'Usually yes. Exercise helps build capacity and makes results more durable.' },
    ],
    relatedSlugs: ['rehabilitation-therapies/physiotherapy', 'rehabilitation-therapies/exercise-therapy', 'rehabilitation-therapies/psychology', 'lumbar-spine-pain'],
    medicalEntity: { '@type': 'MedicalTherapy', name: 'Osteopathy', followup: 'Progress review and updated home programme.' },
  },
  {
    slug: 'rehabilitation-therapies/occupational-therapy',
    title: 'Occupational therapy',
    dateISO: '2024-05-22',
    description:
      'Occupational therapy helps you do the daily activities that matter most: self-care, work, home tasks, and community participation. Plans often include practical strategies, assistive equipment, and habit routines.',
    category: 'Rehabilitation therapies',
    tags: ['occupational therapy', 'daily activities', 'work modifications', 'assistive devices', 'independence'],
    coverImage: { src: '/assets/images/illustrative/Occupational-Therapy-min.jpg', alt: 'Illustration representing occupational therapy and daily living support.' },
    philosophy: ['Focus on meaningful activities and participation', 'Reduce barriers with practical strategies and environment changes', 'Build skills and confidence through graded practice'],
    assessment: ['Identify priority tasks (washing, cooking, typing, driving, hobbies)', 'Assess strength, coordination, pain interference, and fatigue', 'Review home/work environment and safety risks', 'Screen cognition, mood, and support needs when relevant'],
    plan: ['Task-specific training and pacing strategies', 'Ergonomic and work-station adjustments', 'Assistive devices (splints, grips, shower aids) when helpful', 'Energy management and fatigue planning'],
    equipment: ['Grip aids or jar openers', 'Splints (when prescribed)', 'Workstation supports (chair, keyboard, monitor setup)'],
    frequency: 'Often weekly initially, then spaced as strategies become routine',
    outcomes: ['Improved independence in targeted tasks', 'Reduced pain interference at work/home', 'Safer transfers and reduced fall risk when relevant'],
    integration: ['Coordinate with physiotherapy for strength and mobility', 'Coordinate with psychology for coping and behaviour change support', 'Support post-procedure recovery with safe daily activity plans'],
    selfManagement: ['Use pacing: break tasks into steps with planned rests', 'Set up your environment to reduce strain', 'Practise one priority task daily in a graded way', 'Track success with simple checkboxes rather than pain scores'],
    checklist: ['Write down 3–5 tasks you want to improve', 'Bring photos of your workspace or home setup (optional)', 'List equipment you already use', 'Bring a medication list if fatigue or dizziness is an issue'],
    patientStory: {
      title: 'Patient story (composite example)',
      story: [
        'A person with persistent pain struggled to keep working due to fatigue and flare-ups.',
        'With pacing, workstation changes, and a graded return-to-task plan, they improved consistency and confidence.',
        'This is a de-identified composite example for education. Individual outcomes vary.',
      ],
    },
    faq: [
      { question: 'Is occupational therapy only for older adults?', answer: 'No. It supports anyone who is limited by injury, pain, illness, or disability in daily activities.' },
      { question: 'Will I be given equipment?', answer: 'Sometimes. Equipment is used when it improves safety or reduces strain and supports independence.' },
      { question: 'Can OT help me return to work?', answer: 'Yes. OT often includes work modifications, pacing, and graded exposure to work tasks.' },
      { question: 'Do I still need physiotherapy?', answer: 'Often yes. Physiotherapy builds physical capacity; OT applies that capacity to real tasks.' },
      { question: 'What if my main problem is fatigue?', answer: 'Energy management and routine design are core OT skills.' },
      { question: 'How do we measure progress?', answer: 'We track the specific tasks you choose: time, ease, and independence level.' },
    ],
    relatedSlugs: ['rehabilitation-therapies/home-care', 'rehabilitation-therapies/physiotherapy', 'rehabilitation-therapies/psychology', 'community-reintegration'],
    medicalEntity: { '@type': 'MedicalTherapy', name: 'Occupational therapy', followup: 'Goal review and plan adjustment over time.' },
  },
  {
    slug: 'rehabilitation-therapies/speech-therapy',
    title: 'Speech therapy',
    dateISO: '2024-05-20',
    description:
      'Speech therapy supports communication, voice, and swallowing. After neurological events such as stroke, early assessment and a targeted plan can improve safety and independence.',
    category: 'Rehabilitation therapies',
    tags: ['speech therapy', 'swallowing', 'communication', 'stroke recovery', 'voice'],
    coverImage: { src: '/assets/images/illustrative/speech-therapy-min.jpg', alt: 'Illustration representing speech and swallowing therapy.' },
    philosophy: ['Improve safety first (especially swallowing)', 'Build communication skills through frequent, meaningful practice', 'Involve family and caregivers to support real-life communication'],
    assessment: ['Screen swallowing safety and aspiration risk when relevant', 'Assess speech clarity, language, and cognitive-communication', 'Identify barriers: fatigue, hearing, environment noise', 'Set goals that reflect daily life needs'],
    plan: ['Swallowing strategies and exercises when indicated', 'Speech and language therapy tasks with home practice', 'Communication aids (apps, picture boards) when helpful', 'Caregiver education and safe eating/drinking guidance when needed'],
    equipment: ['Home practice worksheets/apps', 'Communication aids as needed', 'Adaptive utensils or thickener plans when prescribed'],
    frequency: 'Often weekly early, plus daily home practice for best results',
    outcomes: ['Safer swallowing and fewer choking episodes', 'Improved speech clarity or word finding', 'Greater independence in communication tasks'],
    integration: ['Coordinate with stroke medicine and dietetics for swallowing safety', 'Coordinate with occupational therapy for daily communication needs', 'Coordinate with psychology for confidence and social participation'],
    selfManagement: ['Practise short daily sessions', 'Use quiet environments and face-to-face positioning', 'Follow swallowing safety rules provided by your clinician', 'Ask for reassessment if swallowing worsens'],
    checklist: ['Bring a list of swallowing or communication concerns', 'Note when symptoms are worse (fatigue, stress, evenings)', 'Bring any prior reports', 'Bring a family member if you want support in planning'],
    patientStory: {
      title: 'Patient story (composite example)',
      story: [
        'After a stroke, a person struggled with word finding and avoided social situations.',
        'With therapy and a simple home practice routine, communication confidence improved and participation increased.',
        'This is a de-identified composite example for education. Individual outcomes vary.',
      ],
    },
    faq: [
      { question: 'Is speech therapy only about speech?', answer: 'No. It can also address swallowing, voice, language, and cognitive-communication.' },
      { question: 'How do I know if swallowing is unsafe?', answer: 'Coughing with meals, wet voice, frequent chest infections, or weight loss should be assessed.' },
      { question: 'How quickly do improvements happen?', answer: 'It varies. Frequent practice usually leads to better progress.' },
      { question: 'Can I practise at home?', answer: 'Yes. Home practice is often essential. Follow your clinician’s guidance.' },
      { question: 'Do I need a referral?', answer: 'This depends on your healthcare system and insurer. We can guide you.' },
      { question: 'What if I feel embarrassed speaking?', answer: 'That is common. Therapy includes confidence-building and strategies for real situations.' },
    ],
    relatedSlugs: ['rehabilitation-therapies/occupational-therapy', 'rehabilitation-therapies/home-care', 'post-stroke-spasticity', 'feeding-autonomy'],
    medicalEntity: { '@type': 'MedicalTherapy', name: 'Speech therapy', followup: 'Reassessment and goal progression.' },
  },
  {
    slug: 'rehabilitation-therapies/psychology',
    title: 'Psychology (pain and rehabilitation support)',
    dateISO: '2024-05-18',
    description:
      'Psychology support can reduce distress, improve sleep, and help you build consistent habits during recovery. It does not mean your symptoms are imagined. It helps the nervous system become less reactive while you rebuild function.',
    category: 'Rehabilitation therapies',
    tags: ['psychology', 'pain coping', 'sleep', 'stress', 'CBT'],
    coverImage: { src: '/assets/images/illustrative/psychology-min.jpg', alt: 'Illustration representing psychology support and coping strategies.' },
    philosophy: ['Focus on function and quality of life, not perfect pain elimination', 'Use evidence-based approaches such as CBT and ACT', 'Address sleep, stress, and fear of movement to reduce flare cycles'],
    assessment: ['Understand pain history and current stressors', 'Screen sleep, mood, and pain-related fear', 'Identify flare triggers and coping patterns', 'Set measurable goals (sleep, activity, confidence)'],
    plan: ['Skills training: pacing, relaxation, and attention strategies', 'Behaviour change support for consistent routines', 'Exposure work for feared activities when appropriate', 'Coordination with the medical team for safety and messaging'],
    equipment: ['Sleep diary', 'Simple routine planner', 'Breathing or relaxation audio guidance'],
    frequency: 'Often weekly or fortnightly initially, then spaced as skills consolidate',
    outcomes: ['Improved sleep quality', 'Reduced pain interference and fear of movement', 'More consistent activity and fewer severe flare-ups'],
    integration: ['Align messaging with physiotherapy and medical review', 'Support medication tapering plans where appropriate', 'Prepare for procedures and recovery with coping and pacing strategies'],
    selfManagement: ['Use a short daily routine (sleep, movement, recovery)', 'Practise a calming skill daily for 5–10 minutes', 'Use values-based goals to guide activity', 'Ask for urgent support for suicidal thoughts or severe worsening mood'],
    checklist: ['Bring a list of your main stressors and goals', 'Track sleep for 1 week if possible', 'List activities you avoid due to fear or flare risk', 'Bring a medication list'],
    patientStory: {
      title: 'Patient story (composite example)',
      story: [
        'A person with persistent pain stopped many activities because they feared damage, which increased isolation and low mood.',
        'With pacing, sleep work, and graded exposure alongside physiotherapy, they regained confidence and function over time.',
        'This is a de-identified composite example for education. Individual outcomes vary.',
      ],
    },
    faq: [
      { question: 'Does seeing a psychologist mean the pain is “in my head”?', answer: 'No. Pain is real. Psychology helps you change the nervous system response and build skills to live well while you recover.' },
      { question: 'What approaches are used?', answer: 'Common approaches include CBT, ACT, and skills for sleep and stress regulation.' },
      { question: 'Will it reduce my pain?', answer: 'It can reduce pain interference and flare cycles. Many people also notice symptom improvement as function increases.' },
      { question: 'How long does it take?', answer: 'It depends on goals. Many plans are structured over weeks with skills you continue independently.' },
      { question: 'Can it help before surgery or procedures?', answer: 'Yes. Preparation and coping strategies can improve recovery consistency.' },
      { question: 'What if I’m in crisis?', answer: 'Seek urgent help if you have suicidal thoughts, feel unsafe, or have severe worsening mental health symptoms.' },
    ],
    relatedSlugs: ['rehabilitation-therapies/physiotherapy', 'rehabilitation-therapies/pharmacological-pain-management', 'rehabilitation-therapies/nutrition', 'rehabilitation'],
    medicalEntity: { '@type': 'MedicalTherapy', name: 'Psychological therapy', followup: 'Skill review and progression to independence.' },
  },
  {
    slug: 'rehabilitation-therapies/nutrition',
    title: 'Nutrition (for recovery and pain support)',
    dateISO: '2024-05-16',
    description:
      'Nutrition supports recovery by improving energy, tissue repair, and overall health. For persistent pain, stable blood sugar, adequate protein, and practical routines can make rehabilitation easier.',
    category: 'Rehabilitation therapies',
    tags: ['nutrition', 'recovery', 'protein', 'inflammation', 'energy'],
    coverImage: { src: '/assets/images/illustrative/nutrition-min.jpg', alt: 'Illustration representing nutrition for recovery.' },
    philosophy: ['Prioritise practical, sustainable changes', 'Support tissue repair with adequate protein and micronutrients', 'Use nutrition to improve energy, sleep, and training tolerance'],
    assessment: ['Review weight history and appetite changes', 'Assess daily routine, hydration, and meal timing', 'Screen for deficiencies risk and medical conditions (diabetes, kidney disease)', 'Agree on goals linked to function (energy, training tolerance)'],
    plan: ['Protein target planning across meals', 'Fibre and hydration routines to support gut health', 'Strategy for flare days: easy meals and consistent timing', 'Coordination with medical advice for specific conditions'],
    equipment: ['Simple meal template', 'Water bottle and hydration reminders', 'Grocery list and batch-cooking plan'],
    frequency: 'Often monthly reviews, with check-ins during behaviour change phases',
    outcomes: ['Improved energy and training tolerance', 'Better body composition support when relevant', 'More consistent meal and hydration routines'],
    integration: ['Coordinate with medications (for example timing with meals)', 'Support weight management to reduce joint load when appropriate', 'Support post-operative nutrition planning for healing'],
    selfManagement: ['Aim for regular meals and hydration', 'Include protein at each main meal', 'Plan 2–3 easy “default” meals for busy days', 'Avoid extreme diets without clinical guidance'],
    checklist: ['Track a typical 2–3 day food and hydration pattern', 'List dietary preferences and constraints', 'Bring recent blood tests if available', 'Define one practical goal for the next 2 weeks'],
    patientStory: {
      title: 'Patient story (composite example)',
      story: [
        'A person in rehabilitation felt exhausted and skipped meals, leading to low energy for exercise sessions.',
        'With a simple meal structure and hydration routine, energy improved and rehab sessions became more consistent.',
        'This is a de-identified composite example for education. Individual outcomes vary.',
      ],
    },
    faq: [
      { question: 'Is there one “anti-inflammatory” diet that works for everyone?', answer: 'No. Many people benefit from a balanced, fibre-rich pattern with adequate protein, but individual needs vary.' },
      { question: 'Do I need supplements?', answer: 'Not always. Supplements are used when deficiency risk or blood tests indicate a need.' },
      { question: 'Can nutrition help pain?', answer: 'It can support overall health, energy, and recovery consistency, which often reduces pain interference.' },
      { question: 'What if I have diabetes?', answer: 'Plans should be individualised. Meal timing and blood sugar stability become key priorities.' },
      { question: 'Should I avoid all sugar?', answer: 'Most people do better with moderation and consistent meals rather than strict restriction.' },
      { question: 'How do we measure progress?', answer: 'We track energy, meal consistency, rehab tolerance, and relevant health markers.' },
    ],
    relatedSlugs: ['rehabilitation-therapies/exercise-therapy', 'rehabilitation-therapies/pharmacological-pain-management', 'rehabilitation-therapies/psychology', 'nutrition'],
    medicalEntity: { '@type': 'MedicalTherapy', name: 'Nutrition counselling', followup: 'Review and adjust plan based on goals and health needs.' },
  },
  {
    slug: 'rehabilitation-therapies/exercise-therapy',
    title: 'Exercise therapy',
    dateISO: '2024-05-14',
    description:
      'Exercise therapy uses a structured, progressive programme to build strength, endurance, and confidence with movement. The goal is to improve function and reduce flare-ups through the right dose of activity.',
    category: 'Rehabilitation therapies',
    tags: ['exercise therapy', 'strength', 'endurance', 'graded activity', 'recovery'],
    coverImage: { src: '/assets/images/illustrative/performance-min.jpg', alt: 'Illustration representing exercise training and recovery.' },
    philosophy: ['Dose matters: start where you can succeed and progress gradually', 'Build whole-body capacity, not only the painful area', 'Measure progress with repeatable tests and function goals'],
    assessment: ['Assess baseline capacity (walking time, strength tests, balance)', 'Review flare pattern and recovery time after activity', 'Screen red flags and safety considerations', 'Select exercises linked to your goals'],
    plan: ['Strength training 2–3×/week with progressions', 'Aerobic plan (walking/cycling) with pacing rules', 'Mobility work to support movement quality', 'A flare-up adjustment plan that keeps you moving'],
    equipment: ['Comfortable shoes', 'Resistance bands or weights', 'Step/box or chair for functional exercises'],
    frequency: 'Most plans use 2–3 strength sessions/week plus regular low-intensity activity',
    outcomes: ['Walking time/distance', 'Strength and endurance measures', 'Reduced pain interference with daily tasks', 'Greater confidence with activity'],
    integration: ['Coordinate with physiotherapy for technique and progressions', 'Use procedure relief windows to increase activity safely', 'Coordinate with medication timing for participation and safety'],
    selfManagement: ['Use the 24–48 hour rule: monitor response after training', 'Progress one variable at a time (load, reps, or duration)', 'Keep a simple training log', 'Prioritise sleep and recovery routines'],
    checklist: ['Define your top 3 function goals', 'Track a week of steps or walking time', 'List any equipment you have at home', 'Plan realistic session times you can keep consistently'],
    patientStory: {
      title: 'Patient story (composite example)',
      story: [
        'A person with knee pain stopped activity and became less fit, making stairs and walking harder.',
        'With a graded strengthening plan and paced walking, they rebuilt capacity and improved daily function.',
        'This is a de-identified composite example for education. Individual outcomes vary.',
      ],
    },
    faq: [
      { question: 'Should I stop exercise if it hurts?', answer: 'Not always. Some discomfort can be normal. The goal is to find a safe dose and monitor response over 24–48 hours.' },
      { question: 'How fast should I progress?', answer: 'Progress depends on recovery. Many people do best with small weekly increases.' },
      { question: 'Do I need a gym?', answer: 'No. Many effective programmes use bands, body weight, and simple home equipment.' },
      { question: 'What if I flare up?', answer: 'Reduce dose, keep gentle movement, then restart progressions once symptoms settle.' },
      { question: 'Is cardio important?', answer: 'Often yes. Aerobic fitness supports recovery and reduces overall load sensitivity.' },
      { question: 'How do we measure success?', answer: 'We track function measures like walking time, strength, and task performance.' },
    ],
    relatedSlugs: ['rehabilitation-therapies/physiotherapy', 'rehabilitation-therapies/nutrition', 'rehabilitation-therapies/psychology', 'performance'],
    medicalEntity: { '@type': 'MedicalTherapy', name: 'Exercise therapy', followup: 'Progress review with programme updates.' },
  },
  {
    slug: 'rehabilitation-therapies/podology',
    title: 'Podiatry / podology',
    dateISO: '2024-05-12',
    description:
      'Podiatry (podology) focuses on foot and ankle health, gait, footwear, and skin and nail care. Foot mechanics and shoe choices can influence pain up the chain, including knees, hips, and back.',
    category: 'Rehabilitation therapies',
    tags: ['podiatry', 'podology', 'foot pain', 'footwear', 'orthotics'],
    coverImage: { src: '/assets/images/illustrative/Podologist-min.jpg', alt: 'Illustration representing podiatry and foot care.' },
    philosophy: ['Reduce pain by improving load distribution and tissue capacity', 'Use footwear and orthoses when they improve function', 'Combine foot care with strengthening and gait advice'],
    assessment: ['History of symptoms and footwear habits', 'Foot and ankle mobility/strength assessment', 'Gait and load pattern review', 'Skin, nail, and pressure area assessment when relevant'],
    plan: ['Footwear recommendations matched to your activity', 'Orthoses or inserts when indicated', 'Strengthening for foot/ankle and calf capacity', 'Skin and nail care plan when needed'],
    equipment: ['Supportive footwear', 'Insoles or orthoses (when prescribed)', 'Simple foot strengthening tools (band, towel)'],
    frequency: 'Often one assessment plus follow-up at 4–8 weeks; ongoing care as needed',
    outcomes: ['Reduced foot pain during walking', 'Improved gait tolerance', 'Fewer skin/nail complications when relevant'],
    integration: ['Coordinate with physiotherapy for calf and hip strength', 'Coordinate with diabetes care teams for high-risk foot management', 'Support return-to-walk/run programmes with footwear planning'],
    selfManagement: ['Check footwear wear patterns', 'Do short foot strength routines 3–4×/week', 'Use gradual exposure to longer walks', 'Seek urgent help for wounds, infection, or sudden severe swelling'],
    checklist: ['Bring your most-used shoes', 'Note when pain is worse (first steps, hills, long walks)', 'Bring a list of medical conditions (diabetes, neuropathy) if relevant', 'Bring any prior orthoses'],
    patientStory: {
      title: 'Patient story (composite example)',
      story: [
        'A person with heel pain changed shoes often but did not progress strengthening, leading to repeated flares.',
        'With footwear guidance and a graded calf/foot programme, walking tolerance improved.',
        'This is a de-identified composite example for education. Individual outcomes vary.',
      ],
    },
    faq: [
      { question: 'Do I need orthotics?', answer: 'Not everyone. Orthotics are used when they improve function and comfort, often alongside strengthening.' },
      { question: 'Can footwear affect knee or hip pain?', answer: 'Yes. Foot mechanics and shoe choices can influence load up the chain.' },
      { question: 'How quickly will I improve?', answer: 'It depends on the condition. Strength changes take weeks, but footwear changes can help sooner.' },
      { question: 'What if I have diabetes?', answer: 'Foot care and skin checks become especially important. Seek prompt help for wounds or infection.' },
      { question: 'Should I stop walking?', answer: 'Usually no. We adjust load and build capacity rather than stopping activity completely.' },
      { question: 'How do we measure progress?', answer: 'We track walking tolerance, pain interference, and any skin/nail issues.' },
    ],
    relatedSlugs: ['foot-and-ankle-pain', 'rehabilitation-therapies/exercise-therapy', 'rehabilitation-therapies/physiotherapy', 'knee-pain'],
    medicalEntity: { '@type': 'MedicalTherapy', name: 'Podiatry / podology', followup: 'Reassessment and adjustment of footwear/orthoses plan.' },
  },
  {
    slug: 'rehabilitation-therapies/home-care',
    title: 'Home care',
    dateISO: '2024-05-10',
    description:
      'Home care supports safety and independence at home through practical help, equipment, and caregiver support. It can be useful after surgery, after stroke, or when pain limits daily tasks.',
    category: 'Rehabilitation therapies',
    tags: ['home care', 'caregiver support', 'safety', 'equipment', 'independence'],
    coverImage: { src: '/assets/images/illustrative/Home-Care-min.jpg', alt: 'Illustration representing home care support and safety planning.' },
    philosophy: ['Safety first: reduce falls and prevent complications', 'Support independence with the right help at the right time', 'Coordinate care to reduce gaps and confusion'],
    assessment: ['Home environment and fall risk screening', 'Daily task assessment (washing, dressing, meals, medication)', 'Caregiver capacity and support needs', 'Equipment and accessibility review (stairs, bathroom, bed)'],
    plan: ['Personal care support and routine design', 'Home exercise support and prompts where appropriate', 'Equipment recommendations (rails, shower chair, walker)', 'Escalation plan for red flags and urgent issues'],
    equipment: ['Grab rails or non-slip mats', 'Shower chair or commode (when indicated)', 'Medication organiser and reminders'],
    frequency: 'Varies from short-term daily support to periodic check-ins depending on needs',
    outcomes: ['Fewer falls and safer mobility', 'Improved independence in self-care', 'Better adherence to rehab and medication plans'],
    integration: ['Coordinate with occupational therapy for equipment and routines', 'Coordinate with physiotherapy for safe mobility plans', 'Coordinate with medical teams for wound care and red flags'],
    selfManagement: ['Keep pathways clear and well lit', 'Use assistive devices consistently if prescribed', 'Follow wound and medication instructions closely', 'Seek urgent help for chest pain, shortness of breath, or new severe weakness'],
    checklist: ['List the tasks you struggle with most', 'Take photos of key areas (bathroom, stairs) if helpful', 'Bring a medication list and appointment schedule', 'Identify who can help at home in the first week after a procedure'],
    patientStory: {
      title: 'Patient story (composite example)',
      story: [
        'After a procedure, a person worried about climbing stairs and managing meals and medication alone.',
        'With short-term home care and equipment setup, they stayed safe while building independence through rehabilitation.',
        'This is a de-identified composite example for education. Individual outcomes vary.',
      ],
    },
    faq: [
      { question: 'Is home care only for older adults?', answer: 'No. It can support anyone who needs short-term help after surgery, stroke, or a flare of illness.' },
      { question: 'What kinds of help are included?', answer: 'Support can include personal care, equipment setup, mobility safety, and coordination with therapy plans.' },
      { question: 'How long will I need home care?', answer: 'It depends on your recovery and support network. Many people use it short-term during a transition.' },
      { question: 'Can home care include exercise support?', answer: 'Yes, within the plan set by your therapy team.' },
      { question: 'What should trigger urgent help?', answer: 'Chest pain, shortness of breath, high fever, or new severe weakness should be assessed urgently.' },
      { question: 'How is home care arranged?', answer: 'This depends on your healthcare system and insurer. We can help you understand options.' },
    ],
    relatedSlugs: ['rehabilitation-therapies/occupational-therapy', 'rehabilitation-therapies/physiotherapy', 'spine-surgery/spinal-fusion', 'community-reintegration'],
    medicalEntity: { '@type': 'MedicalTherapy', name: 'Home care', followup: 'Review needs as independence improves.' },
  },
];

const surgeryArticles: BlogArticle[] = specialisedProcedures.map((cfg) => ({
  slug: cfg.slug,
  title: cfg.title,
  dateISO: cfg.dateISO,
  description: cfg.description,
  category: cfg.category,
  tags: cfg.tags,
  coverImage: cfg.coverImage,
  author: clinicAuthor,
  reviewedBy,
  updatedISO: cfg.dateISO,
  quickFacts: buildQuickFacts(cfg),
  checklist: { title: 'Preparation checklist', items: cfg.checklist },
  faq: cfg.faq,
  cta: {
    primaryLabel: 'Book a consultation',
    primaryTo: '/contact',
    secondaryLabel: 'Download preparation checklist (PDF)',
    secondaryAction: 'print-checklist',
  },
  medicalEntity: cfg.medicalEntity,
  sections: buildProcedureSections(cfg),
  references: procedureReferences,
  relatedSlugs: cfg.relatedSlugs,
}));

const interventionalArticles: BlogArticle[] = interventionalProcedures.map((cfg) => ({
  slug: cfg.slug,
  title: cfg.title,
  dateISO: cfg.dateISO,
  description: cfg.description,
  category: cfg.category,
  tags: cfg.tags,
  coverImage: cfg.coverImage,
  author: clinicAuthor,
  reviewedBy,
  updatedISO: cfg.dateISO,
  quickFacts: buildInterventionalQuickFacts(cfg),
  checklist: { title: 'Preparation checklist', items: cfg.checklist },
  faq: cfg.faq,
  cta: { primaryLabel: 'Book a consultation', primaryTo: '/contact', secondaryLabel: 'Download preparation checklist (PDF)', secondaryAction: 'print-checklist' },
  medicalEntity: cfg.medicalEntity,
  sections: buildInterventionalSections(cfg),
  references: interventionalReferences,
  relatedSlugs: cfg.relatedSlugs,
}));

const therapyArticles: BlogArticle[] = rehabTherapies.map((cfg) => ({
  slug: cfg.slug,
  title: cfg.title,
  dateISO: cfg.dateISO,
  description: cfg.description,
  category: cfg.category,
  tags: cfg.tags,
  coverImage: cfg.coverImage,
  author: clinicAuthor,
  reviewedBy,
  updatedISO: cfg.dateISO,
  quickFacts: buildTherapyQuickFacts(cfg),
  checklist: { title: 'Getting started checklist', items: cfg.checklist },
  faq: cfg.faq,
  cta: { primaryLabel: 'Book a consultation', primaryTo: '/contact', secondaryLabel: 'Download checklist (PDF)', secondaryAction: 'print-checklist' },
  medicalEntity: cfg.medicalEntity,
  sections: buildTherapySections(cfg),
  references: rehabReferences,
  relatedSlugs: cfg.relatedSlugs,
}));

const hubArticles: BlogArticle[] = [
  {
    slug: 'spine-surgery',
    title: 'Spine surgery: procedures, preparation, and recovery',
    dateISO: '2024-06-15',
    description:
      'A hub for advanced spine surgery content. Explore candidacy, preparation, recovery planning, and related rehabilitation guidance for common modern procedures.',
    category: 'Blog hubs',
    tags: ['spine surgery', 'recovery', 'preparation', 'rehabilitation'],
    coverImage: { src: '/assets/images/illustrative/Lumber-Spine-Pain-min.jpg', alt: 'Illustration representing lumbar spine and recovery planning.' },
    author: clinicAuthor,
    reviewedBy,
    updatedISO: '2024-06-15',
    sections: [
      {
        id: 'what-youll-find',
        heading: 'What you’ll find in this hub',
        blocks: [
          { type: 'p', text: 'Spine surgery is most helpful when the diagnosis is clear, goals are realistic, and recovery is planned. Use this hub to compare procedures and understand how rehabilitation fits into outcomes.' },
          { type: 'ul', items: ['Preparation checklists and what to bring to your consultation', 'Step-by-step explanations in patient-friendly language', 'Recovery timelines and red flags', 'Links to rehabilitation therapies that support recovery'] },
        ],
      },
    ],
    references: procedureReferences,
    relatedSlugs: [
      'spine-surgery/tubular-microsurgery',
      'spine-surgery/spinal-fusion',
      'spine-surgery/disc-replacement',
      'spine-surgery/lumbar-deformity-surgery',
      'spine-surgery/vertebroplasty',
      'spine-surgery/interspinous-spacers',
    ],
  },
  {
    slug: 'interventional-pain',
    title: 'Interventional pain: targeted procedures and aftercare',
    dateISO: '2024-06-15',
    description:
      'A hub for interventional pain procedures. Learn what different injections and nerve procedures do, what they treat, and how to plan rehabilitation afterward.',
    category: 'Blog hubs',
    tags: ['interventional pain', 'injections', 'nerve procedures', 'aftercare'],
    coverImage: { src: '/assets/images/illustrative/pain-medicine-algarve-min.jpg', alt: 'Clinical illustration related to interventional pain procedures.' },
    author: clinicAuthor,
    reviewedBy,
    updatedISO: '2024-06-15',
    sections: [
      {
        id: 'how-to-use',
        heading: 'How to use this hub',
        blocks: [
          { type: 'p', text: 'Procedures work best when they match a specific diagnosis and are paired with a plan. Use this hub to understand options and compare mechanisms and expected duration.' },
          { type: 'ul', items: ['Mechanism of action and target tissues', 'What to expect on the day', 'How long relief may last and what affects it', 'Comparison with other modalities'] },
        ],
      },
    ],
    references: interventionalReferences,
    relatedSlugs: interventionalProcedures.map((p) => p.slug),
  },
  {
    slug: 'rehabilitation-therapies',
    title: 'Rehabilitation therapies: multidisciplinary recovery and support',
    dateISO: '2024-06-15',
    description:
      'A hub for rehabilitation and supportive care. Explore evidence-informed therapies that build function, reduce flare-ups, and integrate with medical treatments.',
    category: 'Blog hubs',
    tags: ['rehabilitation', 'physiotherapy', 'psychology', 'nutrition', 'home care'],
    coverImage: { src: '/assets/images/illustrative/rehabilitation-min.jpg', alt: 'Illustration representing rehabilitation therapies and support.' },
    author: clinicAuthor,
    reviewedBy,
    updatedISO: '2024-06-15',
    sections: [
      {
        id: 'team-based-care',
        heading: 'Why multidisciplinary care matters',
        blocks: [
          { type: 'p', text: 'Many pain and recovery journeys improve faster when care is coordinated. This hub helps you understand how different therapies fit together and what to expect.' },
          { type: 'ul', items: ['Assessment and goal-setting', 'Practical home programmes', 'Measurable outcomes and progress tracking', 'Integration with procedures and medications'] },
        ],
      },
    ],
    references: rehabReferences,
    relatedSlugs: rehabTherapies.map((t) => t.slug),
  },
];

const specialisedArticles: BlogArticle[] = [...surgeryArticles, ...interventionalArticles, ...therapyArticles, ...hubArticles];

export const blogArticles: BlogArticle[] = [...legacyArticles, ...specialisedArticles].sort((a, b) =>
  b.dateISO.localeCompare(a.dateISO)
);

export const getBlogArticleBySlug = (slug: string) => {
  const normalised = slug.replace(/^\/+/, '').replace(/\/+$/, '');
  return blogArticles.find((a) => a.slug === normalised);
};
