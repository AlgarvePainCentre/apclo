import { doctorsData } from './doctorsData';

// The team as shown on the About page, grouped by speciality. This is the
// source of truth for who is currently part of the clinic: doctorsData also
// holds older/unconfirmed profiles that are not listed here, and those must not
// be published in the sitemap or the Physician structured data.
export const teamCategories = [
  {
    id: 'medicina-dor-desportiva',
    title: 'Pain Medicine and Sports Medicine',
    meta: { label: 'Clinical Director', doctorId: 'miguel-costa' },
    groups: [
      {
        id: 'medicina-dor-desportiva',
        doctorIds: ['miguel-costa', 'gisela-leandro'],
      },
    ],
  },
  {
    id: 'neuroradiologia',
    title: 'Neuroradiology',
    groups: [
      {
        id: 'intervencao-minimamente-invasiva-coluna',
        title: 'Minimally Invasive Spine Intervention',
        doctorIds: ['miguel-batista'],
      },
    ],
  },
  {
    id: 'clinica-geral',
    title: 'General Practice and Medicine 3.0',
    groups: [{ id: 'clinica-geral', doctorIds: ['nuno-lica'] }],
  },
  {
    id: 'ortopedia',
    title: 'Orthopaedics',
    groups: [
      {
        id: 'coluna',
        title: 'Spine',
        doctorIds: ['ricardo-frada', 'pedro-sousa-neves', 'joao-ricardo-soares'],
      },
      {
        id: 'anca-e-joelho',
        title: 'Hip and Knee',
        doctorIds: ['joao-ricardo-soares', 'tiago-bessa'],
      },
      {
        id: 'ombro',
        title: 'Shoulder',
        doctorIds: ['diogo-gomes'],
      },
      {
        id: 'pe-e-tornozelo',
        title: 'Foot and Ankle',
        doctorIds: ['joao-vide'],
      },
    ],
  },
  {
    id: 'enfermeira',
    title: 'Nursing',
    groups: [{ id: 'enfermeira', doctorIds: ['joana-madeira', 'joana-ferreira', 'raquel-antao'] }],
  },
  {
    id: 'dor-cronica',
    title: 'Chronic Pain Consultant',
    groups: [{ id: 'dor-cronica', doctorIds: ['javier-duran', 'edgar-semedo'] }],
  },
];

export const activeTeamIds = new Set(
  teamCategories.flatMap((category) => category.groups.flatMap((group) => group.doctorIds)),
);

export const activeTeam = doctorsData.filter((doctor) => activeTeamIds.has(doctor.id));
