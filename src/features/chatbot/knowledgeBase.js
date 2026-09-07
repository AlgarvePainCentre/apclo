import { resourceCategories, specialitiesCategories, treatmentsCategories } from '../../data/navigation';

export const chatbotContact = {
  phone: '+351 915 915 001',
  phoneHref: 'tel:+351915915001',
  whatsappHref: 'https://wa.me/351915915001',
  email: 'info@algarvepaincentre.com',
  emailHref: 'mailto:info@algarvepaincentre.com',
  address: 'Algarve Pain Centre - Av. do Mar, 8135-107',
  mapsHref:
    'https://www.google.com/maps/search/?api=1&query=Algarve+Pain+Centre+Av.+do+Mar+8135-107',
  contactPage: '/contact',
};

export const chatbotTopicGroups = [
  {
    id: 'specialities',
    title: 'Specialities',
    description:
      'The website includes Pain Medicine, Sports Medicine, and Stroke Medicine pages with condition-focused guidance.',
    path: '/specialities',
    categories: specialitiesCategories,
  },
  {
    id: 'treatments',
    title: 'Treatments',
    description:
      'The website includes Surgical, Minimally Invasive, and Non-Invasive treatment pages to help users explore options.',
    path: '/treatments',
    categories: treatmentsCategories,
  },
  {
    id: 'resources',
    title: 'Resources',
    description:
      'The website also includes patient resources and testimonials for users who want to learn more before contacting the clinic.',
    path: '/resources',
    categories: resourceCategories,
  },
];

export const chatbotStarterPrompts = [
  'I have knee pain',
  'Show me minimally invasive treatments',
  'How can I contact the clinic?',
  'Where is Algarve Pain Centre located?',
];

export const chatbotCategorySummaries = {
  'Pain Medicine':
    'Pain Medicine pages focus on conditions such as head pain, neck pain, back pain, joint pain, facial pain, pelvic pain, and other pain-related concerns.',
  'Sports Medicine':
    'Sports Medicine pages focus on injuries, prevention, rehabilitation, performance, psychology, and nutrition for active patients.',
  'Stroke Medicine':
    'Stroke Medicine pages focus on rehabilitation, autonomy, mood, complications, and long-term recovery after stroke.',
  'Surgical Treatments':
    'Surgical treatment pages cover more advanced procedural options designed for stability, structural correction, and long-term pain relief.',
  'Minimally Invasive Treatments':
    'Minimally invasive treatment pages focus on image-guided or lower-impact procedures such as radiofrequency, vertebroplasty, peripheral nerve block, and related options.',
  'Non-Invasive Treatments':
    'Non-invasive treatment pages focus on conservative care such as physiotherapy, osteopathy, psychology, nutrition, home care, and other supportive approaches.',
  Testimonials:
    'Testimonial pages share patient stories and outcomes so visitors can learn from real experiences before contacting the clinic.',
};

const serviceAliasMap = {
  'Head Pain': ['headache', 'migraine'],
  'Cervical Spine Pain': ['neck pain', 'neck', 'cervical'],
  'Lumbar Spine Pain': ['back pain', 'low back pain', 'lower back', 'lumbar'],
  'Shoulder Pain': ['shoulder'],
  'Hand and Elbow Pain': ['hand pain', 'elbow pain', 'hand', 'elbow'],
  'Hip and Groin Pain': ['hip pain', 'groin pain', 'hip', 'groin'],
  'Knee Pain': ['knee pain', 'knee'],
  'Thoracic Wall Pain': ['thoracic', 'chest wall', 'rib pain'],
  'Abdominal Wall Pain': ['abdominal', 'abdomen', 'stomach wall'],
  'Pelvic & Gynaecological': ['pelvic pain', 'gynaecological', 'gynecological', 'pelvic'],
  'Facial Pain': ['face pain', 'jaw pain', 'facial'],
  'Foot and Ankle Pain': ['foot pain', 'ankle pain', 'foot', 'ankle'],
  'Rehabilitation': ['rehab', 'recovery'],
  'Tubular Microsurgery': ['microsurgery', 'tubular surgery'],
  'Disc Replacement': ['disc'],
  'Lumbar Deformity Surgery': ['deformity surgery'],
  'Peripheral Nerve Block': ['nerve block'],
  'Intra-articular Corticosteroids Injection': ['corticosteroid injection', 'joint injection'],
  Cryoblation: ['cryoablation', 'cryo'],
  'Platelets Rich Plasma Injection': ['prp', 'platelet rich plasma'],
  Hydrodistention: ['hydro distention'],
  'Botulin Toxin Injection': ['botox', 'botulin toxin'],
  'Pharmacological Pain Management': ['medication', 'medicine', 'pain medication'],
  Physiotherapy: ['physical therapy', 'physio'],
  'Occupation Therapy': ['occupational therapy'],
  'Speech Therapy': ['speech'],
  Psychology: ['psychological support', 'mental health'],
  Nutrition: ['diet', 'nutritional support'],
  Exercise: ['exercise program', 'movement'],
  'Home Care': ['home support', 'at home care'],
};

export const chatbotSymptomGuides = [
  {
    id: 'knee-pain',
    match: ['knee pain', 'knee'],
    summary:
      'Knee pain is covered on the website through speciality pages and also connects naturally with treatment exploration depending on the patient situation.',
    relatedPages: [
      '/specialities/pain-medicine/knee-pain',
      '/treatments/non-invasive-treatments/physiotherapy',
      '/treatments/non-invasive-treatments/exercise',
      '/treatments/minimally-invasive-treatments/platelets-rich-plasma-injection',
    ],
  },
  {
    id: 'back-pain',
    match: ['back pain', 'lower back', 'lumbar pain', 'low back pain'],
    summary:
      'Back pain can relate to several website sections, especially lumbar spine pain, minimally invasive procedures, and surgical pathways for more advanced cases.',
    relatedPages: [
      '/specialities/pain-medicine/lumbar-spine-pain',
      '/treatments/minimally-invasive-treatments/radiofrequency',
      '/treatments/minimally-invasive-treatments/cryoablation',
      '/treatments/surgical-treatments/spinal-fusion',
    ],
  },
  {
    id: 'neck-pain',
    match: ['neck pain', 'cervical pain', 'neck'],
    summary:
      'Neck pain is covered through the cervical spine pain speciality page and may also connect with rehabilitation or other treatment pathways.',
    relatedPages: [
      '/specialities/pain-medicine/cervical-spine-pain',
      '/specialities/sports-medicine/rehabilitation',
      '/treatments/non-invasive-treatments/physiotherapy',
    ],
  },
  {
    id: 'shoulder-pain',
    match: ['shoulder pain', 'shoulder'],
    summary:
      'Shoulder pain can be explored through the speciality page and through supportive or minimally invasive treatment options listed on the site.',
    relatedPages: [
      '/specialities/pain-medicine/shoulder-pain',
      '/treatments/minimally-invasive-treatments/hydrodistention',
      '/treatments/non-invasive-treatments/physiotherapy',
    ],
  },
  {
    id: 'sports-injury',
    match: ['sports injury', 'injury', 'sports pain', 'athlete'],
    summary:
      'Sports-related concerns are covered through Sports Medicine pages such as injuries, prevention, rehabilitation, performance, psychology, and nutrition.',
    relatedPages: [
      '/specialities/sports-medicine/injuries',
      '/specialities/sports-medicine/rehabilitation',
      '/specialities/sports-medicine/performance',
    ],
  },
  {
    id: 'stroke-recovery',
    match: ['stroke', 'post stroke', 'stroke recovery'],
    summary:
      'Stroke-related support is covered through the Stroke Medicine section, including rehabilitation, autonomy, complications, and long-term recovery topics.',
    relatedPages: [
      '/specialities/stroke-medicine/rehabilitation',
      '/specialities/stroke-medicine/speech-autonomy',
      '/specialities/stroke-medicine/community-reintegration',
    ],
  },
];

function pathAliases(path) {
  return path
    .split('/')
    .filter(Boolean)
    .map((segment) => segment.replaceAll('-', ' '));
}

export function buildServiceIndex() {
  return chatbotTopicGroups.flatMap((group) =>
    group.categories.flatMap((category) =>
      category.items.map((item) => ({
        type: group.id === 'resources' ? 'resource' : group.id.slice(0, -1),
        groupId: group.id,
        groupTitle: group.title,
        categoryTitle: category.title,
        label: item.label,
        path: item.path,
        aliases: [
          item.label,
          category.title,
          group.title,
          ...pathAliases(item.path),
          ...(serviceAliasMap[item.label] || []),
        ],
      })),
    ),
  );
}
