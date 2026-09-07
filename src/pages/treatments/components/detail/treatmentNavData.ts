export type TreatmentNavItem = {
  label: string;
  path: string;
  iconSrc: string;
};

export const ALL_TREATMENT_NAV_ITEMS: TreatmentNavItem[] = [
  {
    label: 'Pharmacological Pain Management',
    path: '/treatments/non-invasive-treatments/pharmacological-pain-management',
    iconSrc: '/assets/images/Treatments-Icons/PharmacologicalPainManagement.webp',
  },
  {
    label: 'Physiotherapy',
    path: '/treatments/non-invasive-treatments/physiotherapy',
    iconSrc: '/assets/images/Treatments-Icons/Physiotherapy.webp',
  },
  {
    label: 'Osteopathy',
    path: '/treatments/non-invasive-treatments/osteopathy',
    iconSrc: '/assets/images/Treatments-Icons/Osteopathy.webp',
  },
  {
    label: 'Occupation Therapy',
    path: '/treatments/non-invasive-treatments/occupational-therapy',
    iconSrc: '/assets/images/Treatments-Icons/OccupationalTherapy.webp',
  },
  {
    label: 'Speech Therapy',
    path: '/treatments/non-invasive-treatments/speech-therapy',
    iconSrc: '/assets/images/Treatments-Icons/SpeechTherapy.webp',
  },
  {
    label: 'Psychology',
    path: '/treatments/non-invasive-treatments/psychology',
    iconSrc: '/assets/images/Treatments-Icons/Psychology.webp',
  },
  {
    label: 'Nutrition',
    path: '/treatments/non-invasive-treatments/nutrition',
    iconSrc: '/assets/images/Treatments-Icons/Nutrition.webp',
  },
  {
    label: 'Exercise',
    path: '/treatments/non-invasive-treatments/exercise',
    iconSrc: '/assets/images/Treatments-Icons/Exercise.webp',
  },
  {
    label: 'Podology',
    path: '/treatments/non-invasive-treatments/podology',
    iconSrc: '/assets/images/Treatments-Icons/Podology.webp',
  },
  {
    label: 'Home Care',
    path: '/treatments/non-invasive-treatments/home-care',
    iconSrc: '/assets/images/Treatments-Icons/HomeCare.webp',
  },
  {
    label: 'Vertebroplasty',
    path: '/treatments/minimally-invasive-treatments/vertebroplasty',
    iconSrc: '/assets/images/Treatments-Icons/Vertebroplasty.webp',
  },
  {
    label: 'Radiofrequency',
    path: '/treatments/minimally-invasive-treatments/radiofrequency',
    iconSrc: '/assets/images/Treatments-Icons/Radiofrequency.webp',
  },
  {
    label: 'Interspinous Spacers',
    path: '/treatments/minimally-invasive-treatments/interspinous-spacers',
    iconSrc: '/assets/images/Treatments-Icons/InterspinousSpacers.webp',
  },
  {
    label: 'Peripheral Nerve Block',
    path: '/treatments/minimally-invasive-treatments/peripheral-nerve-block',
    iconSrc: '/assets/images/Treatments-Icons/PeripheralNerveBlock.webp',
  },
  {
    label: 'Intra-articular Corticosteroids Injection',
    path: '/treatments/minimally-invasive-treatments/intra-articular-corticosteroids-injection',
    iconSrc: '/assets/images/Treatments-Icons/Intra-articularCorticosteroidsInjection.webp',
  },
  {
    label: 'Calcification Barbotage',
    path: '/treatments/minimally-invasive-treatments/calcification-barbotage',
    iconSrc: '/assets/images/Treatments-Icons/CalcificationBarbotage.webp',
  },
  {
    label: 'Cryoblation',
    path: '/treatments/minimally-invasive-treatments/cryoablation',
    iconSrc: '/assets/images/Treatments-Icons/Cryoablation.webp',
  },
  {
    label: 'Nucleoplasty',
    path: '/treatments/minimally-invasive-treatments/nucleoplasty',
    iconSrc: '/assets/images/Treatments-Icons/Nucleoplasty.webp',
  },
  {
    label: 'Platelets Rich Plasma Injection',
    path: '/treatments/minimally-invasive-treatments/platelets-rich-plasma-injection',
    iconSrc: '/assets/images/Treatments-Icons/PlateletsRichPlasmaInjection.webp',
  },
  {
    label: 'Hydrodistention',
    path: '/treatments/minimally-invasive-treatments/hydrodistention',
    iconSrc: '/assets/images/Treatments-Icons/Hydrodistention.webp',
  },
  {
    label: 'Botulin Toxin Injection',
    path: '/treatments/minimally-invasive-treatments/botulin-toxin-injection',
    iconSrc: '/assets/images/Treatments-Icons/BotulinToxinInjection.webp',
  },
  {
    label: 'Tubular Microsurgery',
    path: '/treatments/surgical-treatments/tubular-microsurgery',
    iconSrc: '/assets/images/Treatments-Icons/TubularMicrosurgery.webp',
  },
  {
    label: 'Spinal Fusion',
    path: '/treatments/surgical-treatments/spinal-fusion',
    iconSrc: '/assets/images/Treatments-Icons/SpinalFusion.webp',
  },
  {
    label: 'Disc Replacement',
    path: '/treatments/surgical-treatments/disc-replacement',
    iconSrc: '/assets/images/Treatments-Icons/DiscReplacement.webp',
  },
  {
    label: 'Lumbar Deformity Surgery',
    path: '/treatments/surgical-treatments/lumbar-deformity-surgery',
    iconSrc: '/assets/images/Treatments-Icons/LumbarDeformitySurgery.webp',
  },
];

export function getAllTreatmentNavItems(pathname: string): TreatmentNavItem[] | null {
  const segments = pathname.split('/').filter(Boolean);
  if (segments[0] !== 'treatments' || segments.length < 3) return null;
  return ALL_TREATMENT_NAV_ITEMS;
}
