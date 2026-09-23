import { useParams, Navigate } from 'react-router-dom';
import TreatmentDetailView from './TreatmentDetailView';
import { TREATMENT_TREATS } from './treatmentTreats';

// Canonical treatment template, served at /treatments-v2/<category>/<slug> as a
// preview alongside the untouched live treatment pages. Every per-treatment
// dataset in ./data/*.data.js is auto-collected; "What it treats" links are
// injected from the facts bridge so they stay consistent in one place.
const modules = import.meta.glob('./data/*.data.js', { eager: true });
const BY_KEY = {};
for (const mod of Object.values(modules)) {
  const d = mod.data;
  if (d?.slug && d?.category) BY_KEY[`${d.category}/${d.slug}`] = d;
}

export default function TreatmentLivePage() {
  const { category, slug } = useParams();
  const base = BY_KEY[`${category}/${slug}`];

  if (!base) return <Navigate to="/treatments" replace />;

  const data = { ...base, treats: TREATMENT_TREATS[base.slug] || [] };
  const seo = { canonicalPath: `/treatments/${category}/${slug}`, index: false };
  return <TreatmentDetailView data={data} seo={seo} />;
}
