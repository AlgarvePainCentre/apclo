import { useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import SpecialityTemplateView from './view';
import { PAIN_SPECIALITY_BY_SLUG, SPORTS_SPECIALITY_BY_SLUG, STROKE_SPECIALITY_BY_SLUG } from './data';

// LIVE speciality page — the canonical template served on the real
// /specialities/<category>/<slug> URLs. Category + slug are derived from the
// path so every migrated speciality shares this one data-driven component.
const REGISTRIES = {
  'pain-medicine': PAIN_SPECIALITY_BY_SLUG,
  'sports-medicine': SPORTS_SPECIALITY_BY_SLUG,
  'stroke-medicine': STROKE_SPECIALITY_BY_SLUG,
};

export default function SpecialityLivePage() {
  const { pathname } = useLocation();
  const parts = pathname.replace(/\/+$/, '').split('/').filter(Boolean);
  const slug = parts[parts.length - 1];
  const category = parts[parts.length - 2];
  const data = REGISTRIES[category]?.[slug];

  useEffect(() => {
    if (data) document.title = `${data.title} | Algarve Pain Centre`;
  }, [data]);

  if (!data) return <Navigate to="/specialities" replace />;
  return <SpecialityTemplateView data={data} />;
}
