import { useEffect } from 'react';
import SpecialityTemplateView from './view';
import { strokeRehabData } from './data';

export default function SpecialityTemplateStroke() {
  useEffect(() => {
    document.title = 'Speciality template · Stroke (preview) | Algarve Pain Centre';
  }, []);
  return <SpecialityTemplateView data={strokeRehabData} />;
}
