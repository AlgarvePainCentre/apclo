import { useEffect } from 'react';
import SpecialityTemplateView from './view';
import { cervicalSpineData } from './data';

export default function SpecialityTemplateCervical() {
  useEffect(() => {
    document.title = 'Speciality template · Cervical (preview) | Algarve Pain Centre';
  }, []);
  return <SpecialityTemplateView data={cervicalSpineData} />;
}
