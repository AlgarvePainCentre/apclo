// Specialist centres shown in the "Our Centers" section (home + about).
// The section renders every entry in this array, so adding a future
// centre is just one more object here — the grid re-flows automatically.
// NOTE: card images are optimised placeholders (~800px webp) under
// /assets/images/centres/. The client should supply dedicated imagery.
// `logo` is a single full-colour icon per centre; the card paints it white
// at rest and restores its colour on hover. Using the shared brand icon
// (logo.webp) as a placeholder for all six until per-centre icons arrive.
const PLACEHOLDER_LOGO = '/assets/logo.webp';

export const centres = [
  {
    slug: 'algarve-pain-centre',
    name: 'Algarve Pain Centre',
    image: '/assets/images/centres/pain-centre.webp',
    body: 'Evidence-based pain medicine with integrated rehabilitation and long-term care planning.',
    logo: PLACEHOLDER_LOGO,
  },
  {
    slug: 'algarve-spine-centre',
    name: 'Algarve Spine Centre',
    image: '/assets/images/centres/spine-center.webp',
    body: 'Spine diagnostics, minimally invasive interventions, and surgical pathways coordinated by our team.',
    logo: PLACEHOLDER_LOGO,
  },
  {
    slug: 'algarve-migraine-centre',
    name: 'Algarve Migraine Centre',
    image: '/assets/images/centres/migraine-centre.webp',
    body: 'Dedicated migraine and headache care, with neurotherapy pathways and preventive treatment planning.',
    path: '/algarve-migraine-neurotherapy-centre',
    logo: PLACEHOLDER_LOGO,
  },
  {
    slug: 'algarve-heart-centre',
    name: 'Algarve Heart Centre',
    image: '/assets/images/centres/heart-centre.webp',
    body: 'Cardiology assessment, cardiovascular risk screening and preventive heart care, coordinated with your wider plan.',
    logo: PLACEHOLDER_LOGO,
  },
  {
    slug: 'algarve-knee-hip-centre',
    name: 'Algarve Knee & Hip Centre',
    image: '/assets/images/centres/knee-hip-centre.webp',
    body: 'Diagnosis and treatment of knee and hip conditions, from targeted injections and rehabilitation to surgery.',
    logo: PLACEHOLDER_LOGO,
  },
  {
    slug: 'algarve-primary-care-centre',
    name: 'Algarve Primary Care Centre',
    image: '/assets/images/centres/primary-care.webp',
    body: 'Everyday medical care, health checks and fast referral into our specialist centres when you need it.',
    logo: PLACEHOLDER_LOGO,
  },
];
