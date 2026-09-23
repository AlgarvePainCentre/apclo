import { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import SpecialityTemplateView from './view';
import { PAIN_PREVIEW_BY_SLUG } from './data';

// Dynamic PREVIEW route for the canonical speciality template — renders any
// Pain Medicine speciality from its live route slug so the client can review
// the whole set at /specialities-template/:slug before we migrate live.
export default function SpecialityTemplateBySlug() {
  const { slug } = useParams();
  const data = PAIN_PREVIEW_BY_SLUG[slug];

  useEffect(() => {
    if (data) document.title = `Speciality template · ${data.title} (preview) | Algarve Pain Centre`;
  }, [data]);

  if (!data) return <Navigate to="/specialities-template" replace />;
  return <SpecialityTemplateView data={data} />;
}
