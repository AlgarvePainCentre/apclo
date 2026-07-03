import './SurgicalProceduresStack.css';
import { TreatmentCategoryCarousel } from './TreatmentCategoryCarousel';

const procedures = [
  {
    id: 1,
    title: "Pharmacological Pain Management",
    description: "Pain causing disability and psychosocial issues is diagnosed through anamnesis and physical exams. Treatment usually involves medication for pain from tissue damage, inflammation, or nerve disorders.",
    link: "/treatments/non-invasive-treatments/pharmacological-pain-management",
    iconSrc: "/assets/images/Treatments-Icons/PharmacologicalPainManagement.webp"
  },
  {
    id: 2,
    title: "Physiotherapy",
    description: "Physiotherapy restores movement and function with personalized exercises and techniques. It improves physical function, aids recovery, and helps prevent future issues through customized programs.",
    link: "/treatments/non-invasive-treatments/physiotherapy",
    iconSrc: "/assets/images/Treatments-Icons/Physiotherapy.webp"
  },
  {
    id: 3,
    title: "Osteopathy",
    description: "By moving, stretching and massaging a patient's muscles and joints, osteopathy can treat and prevent musculoskeletal diseases. Our certified team will provide the best techniques targeted for you.",
    link: "/treatments/non-invasive-treatments/osteopathy",
    iconSrc: "/assets/images/Treatments-Icons/Osteopathy.webp"
  },
  {
    id: 4,
    title: "Occupational Therapy",
    description: "The goal of the therapy is to develop, recover, or maintain the meaningful activities of the patient. In this context we have a specialized team with personalized techniques in order to provide you the best care.",
    link: "/treatments/non-invasive-treatments/occupation-therapy",
    iconSrc: "/assets/images/Treatments-Icons/OccupationalTherapy.webp"
  },
  {
    id: 5,
    title: "Speech Therapy",
    description: "This therapy focuses on the assessment and treatment of communication, speech or swallowing disorders. For that reason, we have with us a certified team that will help you to prevent, evaluate and treat these wide range of pathologies.",
    link: "/treatments/non-invasive-treatments/speech-therapy",
    iconSrc: "/assets/images/Treatments-Icons/SpeechTherapy.webp"
  },
  {
    id: 6,
    title: "Psychology",
    description: "Psychology is the scientific study of the mind and behavior and includes many sub-fields. Our certified team, as in any other consultation, reserves the right to confidentiality and is ready to help you improve your mental health.",
    link: "/treatments/non-invasive-treatments/psychology",
    iconSrc: "/assets/images/Treatments-Icons/Psychology.webp"
  },
  {
    id: 7,
    title: "Nutrition",
    description: "Our clinic offers expert nutritional consultations to optimize your physical performance. Our experienced team provides advice on healthy eating, weight loss, child and adolescent nutrition, pregnancy, food intolerances, and more.",
    link: "/treatments/non-invasive-treatments/nutrition",
    iconSrc: "/assets/images/Treatments-Icons/Nutrition.webp"
  },
  {
    id: 8,
    title: "Exercise",
    description: "Our team offers personalized exercise programs to speed recovery, reduce pain, and build patient confidence. A good rehabilitation program also benefits mental health, motivation, and overall lifestyle. With one-on-one guidance, we aim for better results in less time.",
    link: "/treatments/non-invasive-treatments/exercise",
    iconSrc: "/assets/images/Treatments-Icons/Exercise.webp"
  },
  {
    id: 9,
    title: "Podology",
    description: "Feet house a quarter of the body's bones and support its weight. Podology treats foot and nail conditions, including care for diabetic patients. Our podiatrists offer advanced pedicuring and foot care services.",
    link: "/treatments/non-invasive-treatments/podology",
    iconSrc: "/assets/images/Treatments-Icons/Podology.webp"
  },
  {
    id: 10,
    title: "Home Care",
    description: "We provide home care services that promote the independent living that suits you. Your bespoke care plan will reflect your exact needs to ensure that your support is focused entirely around you.",
    link: "/treatments/non-invasive-treatments/home-care",
    iconSrc: "/assets/images/Treatments-Icons/HomeCare.webp"
  }
];

export default function NonInvasiveProceduresList() {
  return (
    <section className="treatment-category-section bg-white">
      <div className="treatment-category-inner">
        <header className="treatment-category-header">
          <div className="treatment-category-avatar" aria-hidden="true">
            <img
              src="/assets/images/Treatments-Icons/PharmacologicalPainManagement.webp"
              alt=""
              className="treatment-category-avatar-image"
              loading="lazy"
              decoding="async"
            />
          </div>
          <h2 className="treatment-category-title">Non-Invasive Treatments</h2>
          <p className="treatment-category-desc">Comprehensive therapies and conservative care plans without breaking the skin.</p>
        </header>
        <TreatmentCategoryCarousel items={procedures} ariaLabel="Non-invasive treatments carousel" />
      </div>
    </section>
  );
}
