import { useEffect } from 'react';
import TreatmentDetailView from './TreatmentDetailView';
import { radiofrequencyData } from './radiofrequency.data';

// PILOT — Radiofrequency on the canonical treatment renderer (shares the
// speciality visual system: chapters rail, left hero, CTA).
export default function TreatmentRadiofrequencyPreview() {
  useEffect(() => {
    document.title = 'Treatment template · Radiofrequency (preview) | Algarve Pain Centre';
  }, []);
  return <TreatmentDetailView data={radiofrequencyData} />;
}
