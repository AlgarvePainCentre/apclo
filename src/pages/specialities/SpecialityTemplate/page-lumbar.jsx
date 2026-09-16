import { useEffect } from 'react';
import SpecialityTemplateView from './view';
import { lumbarSpineData } from './data';

// Standalone PREVIEW — "content-rich" condition (Lumbar spine pain). Same template,
// more filled: longer treatments grid + a full numbered self-care section.
export default function SpecialityTemplateLumbar() {
  useEffect(() => {
    document.title = 'Speciality template · Lumbar (preview) | Algarve Pain Centre';
  }, []);
  return <SpecialityTemplateView data={lumbarSpineData} />;
}
