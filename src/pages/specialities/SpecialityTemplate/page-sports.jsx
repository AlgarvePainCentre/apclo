import { useEffect } from 'react';
import SpecialityTemplateView from './view';
import { injuryPreventionData } from './data';

// Standalone PREVIEW — "service" page (Sports · Injury prevention). Same canonical
// template with flexible headings ("What we assess" / "What we help you prevent")
// and text approaches instead of image treatment cards.
export default function SpecialityTemplateSports() {
  useEffect(() => {
    document.title = 'Speciality template · Sports (preview) | Algarve Pain Centre';
  }, []);
  return <SpecialityTemplateView data={injuryPreventionData} />;
}
