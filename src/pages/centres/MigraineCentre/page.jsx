import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MigraineCentre.css';

const conditions = [
  {
    title: 'Chronic migraine',
    body: 'Preventive botulinum toxin protocols to reduce the frequency and intensity of chronic migraine.',
  },
  {
    title: 'Movement disorders',
    body: 'Assessment and targeted, ultrasound-guided treatment of disabling movement disorders.',
  },
  {
    title: 'Dystonia',
    body: 'Botulinum toxin for cervical and focal dystonias to ease sustained, involuntary muscle contractions.',
  },
  {
    title: 'Myofascial pain',
    body: 'Precise, image-guided treatment of trigger points and persistent myofascial pain.',
  },
  {
    title: 'Trigeminal neuralgia',
    body: 'Care pathways for facial nerve pain, coordinated with the wider medical team.',
  },
  {
    title: 'Hemifacial spasm',
    body: 'Botulinum toxin to relieve involuntary contractions on one side of the face.',
  },
  {
    title: 'Blepharospasm',
    body: 'Treatment of involuntary eyelid spasms to restore comfort and everyday function.',
  },
];

export default function MigraineCentrePage() {
  useEffect(() => {
    document.title = 'Algarve Migraine & Neurotherapy Centre | Algarve Pain Centre';
  }, []);

  return (
    <div className="migraine-centre-page">
      <section className="mc-hero">
        <div className="mc-hero-inner">
          <p className="mc-eyebrow">Specialist centre</p>
          <h1 className="mc-title">Algarve Migraine &amp; Neurotherapy Centre</h1>
          <p className="mc-lead">
            Advanced botulinum toxin and neuromodulation treatments for chronic migraine,
            movement disorders and facial pain.
          </p>
          <Link to="/contact" className="mc-cta">
            Book a consultation
          </Link>
        </div>
      </section>

      <div className="mc-body">
        <section className="mc-section">
          <h2 className="mc-section-title">A dedicated centre for migraine and neurotherapy</h2>
          <p className="mc-paragraph">
            The Algarve Migraine &amp; Neurotherapy Centre offers expert treatment for chronic
            migraine, movement disorders, dystonia, myofascial pain, trigeminal neuralgia,
            hemifacial spasm and blepharospasm, using therapeutic botulinum toxin and advanced
            neuromodulation techniques.
          </p>
          <p className="mc-paragraph">
            Care is delivered with ultrasound-guided precision and coordinated with our Pain,
            Sports and Stroke Medicine teams across non-invasive, minimally invasive and surgical
            pathways.
          </p>
        </section>

        <section className="mc-section">
          <h2 className="mc-section-title">Conditions we treat</h2>
          <ul className="mc-conditions" role="list">
            {conditions.map((condition) => (
              <li key={condition.title} className="mc-condition-card">
                <h3 className="mc-condition-title">{condition.title}</h3>
                <p className="mc-condition-body">{condition.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mc-section mc-panel">
          <p className="mc-eyebrow mc-eyebrow--dark">Clinical lead</p>
          <h2 className="mc-section-title">Dr. Gisela Henriques Leandro</h2>
          <p className="mc-paragraph">
            A specialist in Physical and Rehabilitation Medicine (Physiatrist) with expertise in
            ultrasound-guided interventional procedures and the specialised treatment of
            spasticity, dystonia and chronic migraine.
          </p>
          <p className="mc-paragraph">
            She holds an Integrated Master&rsquo;s Degree in Medicine (University of Lisbon), a
            Postgraduate Degree in Sports Medicine (University of Porto) and a Master&rsquo;s Degree
            in Musculoskeletal Ultrasound and Ultrasound-Guided Interventional Procedures. She
            coordinates the Ultrasound-Guided Interventional Unit (Pain and Spasticity) and the
            Physiatry&ndash;Spasticity Consultation at Faro Hospital, directs the Medical Department
            at the Cerebral Palsy Centre of Beja, and teaches at the University of Algarve.
          </p>
          <Link to="/doctor/gisela-leandro" className="mc-link">
            View full profile &rarr;
          </Link>
        </section>

        <section className="mc-section mc-panel mc-contact">
          <h2 className="mc-section-title">Book an appointment</h2>
          <p className="mc-paragraph">Av. do Mar, Vale do Lobo, 8135-107 Almancil, Algarve</p>
          <p className="mc-paragraph">
            <a href="tel:+351915915001" className="mc-inline-link">
              +351 915 915 001
            </a>{' '}
            &middot;{' '}
            <a href="mailto:info@algarvepaincentre.com" className="mc-inline-link">
              info@algarvepaincentre.com
            </a>
          </p>
          <Link to="/contact" className="mc-cta">
            Contact the centre
          </Link>
        </section>
      </div>
    </div>
  );
}
