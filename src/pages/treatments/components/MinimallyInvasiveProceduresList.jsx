import './SurgicalProceduresStack.css';
import { TreatmentCategoryCarousel } from './TreatmentCategoryCarousel';

const procedures = [
  {
    id: 1,
    title: "Vertebroplasty",
    description: "Vertebroplasty treats spinal fractures by injecting bone cement to stabilize the vertebra. This minimally invasive procedure reduces pain and improves mobility, especially for compression fractures in osteoporosis patients.",
    link: "/treatments/minimally-invasive-treatments/vertebroplasty",
    iconSrc: "/assets/images/Treatments-Icons/Vertebroplasty.webp"
  },
  {
    id: 2,
    title: "Radiofrequency",
    description: "Radiofrequency ablation is a minimally invasive procedure guided by ultrasound or fluoroscopy that uses an electric current to heat and disable nerve tissue, preventing it from sending pain signals.",
    link: "/treatments/minimally-invasive-treatments/radiofrequency",
    iconSrc: "/assets/images/Treatments-Icons/Radiofrequency.webp"
  },
  {
    id: 3,
    title: "Interspinous Spacers",
    description: "Interspinous spacers are small implants that relieve spinal nerve pressure, effectively treating lower back pain and stenosis. This minimally invasive procedure offers faster recovery and is typically done in under an hour.",
    link: "/treatments/minimally-invasive-treatments/interspinous-spacers",
    iconSrc: "/assets/images/Treatments-Icons/InterspinousSpacers.webp"
  },
  {
    id: 4,
    title: "Peripheral Nerve Block",
    description: "This minimally invasive procedure, guided by ultrasound or fluoroscopy, injects a local anesthetic to block nerve signals. Adding corticosteroids extends its effect, useful for acute or subacute musculoskeletal conditions.",
    link: "/treatments/minimally-invasive-treatments/peripheral-nerve-block",
    iconSrc: "/assets/images/Treatments-Icons/PeripheralNerveBlock.webp"
  },
  {
    id: 5,
    title: "Intra-articular Corticosteroids Injection",
    description: "Corticosteroids, injected with ultrasound guidance, reduce pain and inflammation in inflammatory arthritis and musculoskeletal conditions. This precise, minimally invasive procedure avoids systemic effects.",
    link: "/treatments/minimally-invasive-treatments/intra-articular-corticosteroids-injection",
    iconSrc: "/assets/images/Treatments-Icons/Intra-articularCorticosteroidsInjection.webp"
  },
  {
    id: 6,
    title: "Calcification Barbotage",
    description: "Calcific tendinitis, caused by calcium deposits in tendons, is treated with ultrasound-guided barbotage. This procedure removes the deposits and is followed by a corticosteroid injection to reduce inflammation.",
    link: "/treatments/minimally-invasive-treatments/calcification-barbotage",
    iconSrc: "/assets/images/Treatments-Icons/CalcificationBarbotage.webp"
  },
  {
    id: 7,
    title: "Cryoablation",
    description: "Cryoablation uses cold temperatures and is a minimally invasive procedure guided by ultrasound or fluoroscopy. The indications vary and include treatment of chronic low back pain, others spine pain and osteoarthritic joints with severe pain and non-controlled by medication.",
    link: "/treatments/minimally-invasive-treatments/cryoablation",
    iconSrc: "/assets/images/Treatments-Icons/Cryoablation.webp"
  },
  {
    id: 8,
    title: "Nucleoplasty",
    description: "Nucleoplasty is a fluoroscopy-guided procedure that treats disc herniation by relieving pressure on the disc and nerves. It takes less than an hour and is performed on an outpatient basis.",
    link: "/treatments/minimally-invasive-treatments/nucleoplasty",
    iconSrc: "/assets/images/Treatments-Icons/Nucleoplasty.webp"
  },
  {
    id: 9,
    title: "Platelets Rich Plasma Injection",
    description: "PRP therapy extracts a platelet-rich portion of a patient's blood and injects it into damaged tissues to promote healing. Typically, three injections are given 1-2 weeks apart for conditions like osteoarthritis, tennis elbow, and muscle tears.",
    link: "/treatments/minimally-invasive-treatments/platelets-rich-plasma-injection",
    iconSrc: "/assets/images/Treatments-Icons/PlateletsRichPlasmaInjection.webp"
  },
  {
    id: 10,
    title: "Hydrodistention",
    description: "Hydrodistention is mainly used for shoulder conditions, but it can also help with joint pain. By injecting fluid into the joint, it can reduce pain and improve mobility, offering relief in cases of joint stiffness or inflammation.",
    link: "/treatments/minimally-invasive-treatments/hydrodistention",
    iconSrc: "/assets/images/Treatments-Icons/Hydrodistention.webp"
  },
  {
    id: 11,
    title: "Botulin Toxin Injection",
    description: "Botulinum toxin blocks acetylcholine release, relaxing overactive muscles when injected, ideally under ultrasound. It treats spasticity, contractures, overuse tendinosis, and can benefit knee osteoarthritis and migraines.",
    link: "/treatments/minimally-invasive-treatments/botulin-toxin-injection",
    iconSrc: "/assets/images/Treatments-Icons/BotulinToxinInjection.webp"
  }
];

export default function MinimallyInvasiveProceduresList() {
  return (
    <section className="treatment-category-section bg-alt">
      <div className="treatment-category-inner">
        <header className="treatment-category-header">
          <div className="treatment-category-avatar" aria-hidden="true">
            <img
              src="/assets/images/Treatments-Icons/PeripheralNerveBlock.webp"
              alt=""
              className="treatment-category-avatar-image"
              loading="lazy"
              decoding="async"
            />
          </div>
          <h2 className="treatment-category-title">Minimally <br /> Invasive Treatments</h2>
          <p className="treatment-category-desc">State-of-the-art techniques requiring only small incisions, reducing recovery time and discomfort.</p>
        </header>
        <TreatmentCategoryCarousel items={procedures} ariaLabel="Minimally invasive treatments carousel" />
      </div>
    </section>
  );
}
