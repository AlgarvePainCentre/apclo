/*
 * "What it treats" bridge — FACTS ONLY.
 * The exact treatment <-> speciality links that already exist in the site today,
 * inverted from each speciality's "approaches". Nothing proposed, nothing removed.
 * Treatments with an empty array have no link declared anywhere in the site yet
 * (the template hides the section when empty). Source: APC-treatments-HANDOFF (D1).
 */
const PM = 'Pain Medicine';
const s = (name, slug, img) => ({ name, discipline: PM, to: `/specialities/pain-medicine/${slug}`, img: `/assets/images/Hero/${img}` });

const CERVICAL = s('Cervical spine pain', 'cervical-spine-pain', 'CervicalPain.webp');
const FOOT = s('Foot and ankle pain', 'foot-and-ankle-pain', 'FootandAnklePain.webp');
const HAND = s('Hand and elbow pain', 'hand-and-elbow-pain', 'HandandElbowPain.webp');
const HIP = s('Hip and groin pain', 'hip-and-groin-pain', 'HipandGroinPain.webp');
const KNEE = s('Knee pain', 'knee-pain', 'KneePain.webp');
const LUMBAR = s('Lumbar spine pain', 'lumbar-spine-pain', 'LumbarSpinePain.webp');
const SHOULDER = s('Shoulder pain', 'shoulder-pain', 'ShoulderPain.webp');
const HEAD = s('Head pain', 'head-pain', 'HeadPain.webp');
const FACIAL = s('Facial pain', 'facial-pain', 'FacialPain.webp');
const PELVIC = s('Pelvic and gynaecological pain', 'pelvic-and-gynaecological', 'PelvicandGynaecologicalPain.webp');
const ABDO = s('Abdominal wall pain', 'abdominal-wall-pain', 'AbdominalWallPain.webp');
const THORACIC = s('Thoracic wall pain', 'thoracic-wall-pain', 'ThoracicWallPain.webp');
const SPORTS = { name: 'Sports injuries', discipline: 'Sports Medicine', to: '/specialities/sports-medicine/injuries', img: '/assets/images/Hero/ShoulderPain.webp' };

export const TREATMENT_TREATS = {
  // ===== Minimally invasive =====
  'botulin-toxin-injection': [HEAD, HIP, KNEE, LUMBAR],
  'calcification-barbotage': [HIP, KNEE, LUMBAR, SHOULDER],
  cryoablation: [CERVICAL, FOOT, HAND, HIP, KNEE, LUMBAR],
  hydrodistention: [HIP, KNEE, LUMBAR, SHOULDER],
  'interspinous-spacers': [],
  'intra-articular-corticosteroids-injection': [CERVICAL, FACIAL, FOOT, HAND, HIP, KNEE, LUMBAR, PELVIC],
  nucleoplasty: [CERVICAL, HIP, KNEE, LUMBAR],
  'peripheral-nerve-block': [ABDO, FOOT, HAND, HIP, KNEE, LUMBAR, THORACIC],
  'platelets-rich-plasma-injection': [FOOT, HAND, HIP, KNEE, LUMBAR],
  radiofrequency: [CERVICAL, FOOT, HAND, HIP, KNEE, LUMBAR, SPORTS],
  vertebroplasty: [],
  // ===== Non-invasive =====
  exercise: [],
  'home-care': [],
  nutrition: [],
  'occupational-therapy': [],
  osteopathy: [],
  'pharmacological-pain-management': [ABDO, CERVICAL, FACIAL, FOOT, HAND, HEAD, HIP, KNEE, LUMBAR, PELVIC, SHOULDER, THORACIC],
  physiotherapy: [],
  podology: [],
  psychology: [],
  'speech-therapy': [],
  // ===== Surgical =====
  'disc-replacement': [],
  'lumbar-deformity-surgery': [],
  'spinal-fusion': [],
  'tubular-microsurgery': [],
};
