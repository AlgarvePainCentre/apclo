import './SurgicalProceduresStack.css';
import { TreatmentCategoryCarousel } from './TreatmentCategoryCarousel';

const procedures = [
  {
    id: 1,
    title: "Tubular Microsurgery",
    description: "Tubular microsurgery uses small, specialized instruments and a tiny incision to perform intricate procedures. This minimally invasive technique reduces pain and recovery time, allowing for precise operations with minimal disruption to surrounding tissues.",
    link: "/treatments/surgical-treatments/tubular-microsurgery",
    iconSrc: "/assets/images/Treatments-Icons/TubularMicrosurgery.webp"
  },
  {
    id: 2,
    title: "Spinal Fusion",
    description: "Spinal fusion is a surgical procedure that joins two or more vertebrae to stabilize the spine and reduce pain. By fusing the vertebrae, this technique helps correct spinal deformities and alleviate chronic back pain, with a focus on long-term stability.",
    link: "/treatments/surgical-treatments/spinal-fusion",
    iconSrc: "/assets/images/Treatments-Icons/SpinalFusion.webp"
  },
  {
    id: 3,
    title: "Disc Replacement",
    description: "Disc replacement involves removing a damaged spinal disc and replacing it with an artificial one. This procedure aims to relieve pain and restore mobility by mimicking the natural disc's function while maintaining spine flexibility.",
    link: "/treatments/surgical-treatments/disc-replacement",
    iconSrc: "/assets/images/Treatments-Icons/DiscReplacement.webp"
  },
  {
    id: 4,
    title: "Lumbar Deformity Surgery",
    description: "Lumbar deformity surgery corrects abnormal spinal curves in the lower back. This procedure aims to restore proper alignment, reduce pain, and improve function by realigning the spine and stabilizing it with implants or other techniques.",
    link: "/treatments/surgical-treatments/lumbar-deformity-surgery",
    iconSrc: "/assets/images/Treatments-Icons/LumbarDeformitySurgery.webp"
  }
];

export default function SurgicalProceduresStack() {
  return (
    <section className="treatment-category-section bg-white">
      <div className="treatment-category-inner">
        <header className="treatment-category-header">
          <div className="treatment-category-avatar" aria-hidden="true">
            <img
              src="/assets/images/Treatments-Icons/TubularMicrosurgery.webp"
              alt=""
              className="treatment-category-avatar-image"
              loading="lazy"
              decoding="async"
            />
          </div>
          <h2 className="treatment-category-title">Surgical Treatments</h2>
          <p className="treatment-category-desc">Advanced surgical interventions designed for long-term stability and pain relief.</p>
        </header>
        <TreatmentCategoryCarousel items={procedures} ariaLabel="Surgical treatments carousel" />
      </div>
    </section>
  );
}
