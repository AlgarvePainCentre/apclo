import { useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import SpecialityTemplateView from './view';
import { PAIN_SPECIALITY_BY_SLUG } from './data';

// LIVE speciality page — the canonical template served on the real
// /specialities/pain-medicine/<slug> URLs. The slug is derived from the path
// so all 12 Pain Medicine routes can share this one data-driven component.
export default function SpecialityLivePage() {
  const { pathname } = useLocation();
  const slug = pathname.replace(/\/+$/, '').split('/').pop();
  const data = PAIN_SPECIALITY_BY_SLUG[slug];

  useEffect(() => {
    if (data) document.title = `${data.title} | Algarve Pain Centre`;
  }, [data]);

  if (!data) return <Navigate to="/specialities" replace />;
  return <SpecialityTemplateView data={data} />;
}
