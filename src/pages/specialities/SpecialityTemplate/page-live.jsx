import { useParams, Navigate } from 'react-router-dom';
import SpecialityTemplateView from './view';
import { PAIN_SPECIALITY_BY_SLUG, SPORTS_SPECIALITY_BY_SLUG, STROKE_SPECIALITY_BY_SLUG } from './data';

// Canonical-template renderer, served at /specialities-v2/<category>/<slug> as a
// preview alongside the untouched live pages. One component drives all 29
// specialities via the per-category registry.
const REGISTRIES = {
  'pain-medicine': PAIN_SPECIALITY_BY_SLUG,
  'sports-medicine': SPORTS_SPECIALITY_BY_SLUG,
  'stroke-medicine': STROKE_SPECIALITY_BY_SLUG,
};

export default function SpecialityLivePage() {
  const { category, slug } = useParams();
  const data = REGISTRIES[category]?.[slug];

  if (!data) return <Navigate to="/specialities" replace />;

  // While these are v2 previews, keep them out of the index and point the
  // canonical URL at the existing live page, so there is no duplicate content.
  const seo = { canonicalPath: `/specialities/${category}/${slug}`, index: false };
  return <SpecialityTemplateView data={data} seo={seo} />;
}
