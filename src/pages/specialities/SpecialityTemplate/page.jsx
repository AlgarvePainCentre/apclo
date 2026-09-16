import { useEffect } from 'react';
import SpecialityTemplateView from './view';
import { headPainData } from './data';

// Standalone PREVIEW — "lean" condition (Head pain). Does not touch live pages.
export default function SpecialityTemplate() {
  useEffect(() => {
    document.title = 'Speciality template (preview) | Algarve Pain Centre';
  }, []);
  return <SpecialityTemplateView data={headPainData} />;
}
