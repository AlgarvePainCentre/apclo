import React from 'react';
import { Link } from 'react-router-dom';
import { TreatmentsMain } from '../../Treatments';
import '../../Treatments.css';
import './HomeCare.css';

const HomeCarePage: React.FC = () => {
  React.useEffect(() => {
    const pageTitle = 'Home care in Algarve | Support for recovery and independence';
    document.title = pageTitle;

    const description =
      'Discover home care in Algarve for recovery, mobility, and daily activities. Practical, compassionate care and simple booking.';

    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = description;
  }, []);

  const heroBackdropStyle: React.CSSProperties = {
    backgroundImage:
      "linear-gradient(120deg, rgba(0, 51, 102, 0.85), rgba(0, 51, 102, 0.55)), url('/assets/images/illustrative/Home-Care-min.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className="psx-page home-care-page" id="psx-home-care">
      <header className="psx-hero home-care-hero" aria-label="Home care hero section">
        <div className="psx-hero-backdrop" aria-hidden="true" style={heroBackdropStyle} />
        <div className="psx-hero-inner">
          <p className="psx-hero-eyebrow">Treatment</p>
          <h1 className="psx-hero-title">Home care</h1>
          <p className="psx-hero-subtitle">
            Professional support at home helps you continue treatment in a familiar setting.
          </p>
        </div>
      </header>

      <main className="page-main treatments-page">
        <nav className="article-breadcrumb" aria-label="Breadcrumb">
          <ol className="article-breadcrumb-list">
            <li>
              <Link to="/" className="article-breadcrumb-link">
                Home
              </Link>
            </li>
            <li aria-hidden="true">›</li>
            <li>
              <Link to="/treatments" className="article-breadcrumb-link">
                Treatments
              </Link>
            </li>
            <li aria-hidden="true">›</li>
            <li aria-current="page">Home care</li>
          </ol>
        </nav>

        <section className="page-section treatments-feature non-invasive-treatment-feature" aria-labelledby="hc-what-to-expect">
          <div className="treatments-feature-inner">
            <div className="treatments-feature-media">
              <img
                className="treatments-feature-video"
                src="/assets/images/illustrative/Home-Care-min.jpg"
                alt="Home care support for recovery, mobility, and daily activities delivered in a familiar home environment (illustrative)."
                decoding="async"
                loading="lazy"
              />
            </div>

            <div className="treatments-feature-copy">
              <h2 id="hc-what-to-expect" className="treatments-feature-title">
                What patients can expect
              </h2>
              <div className="treatments-feature-accent" />
              <p className="treatments-feature-body">
                Home care provides practical support where it matters most—at home. It may include help with mobility, personal care, daily
                routines, medication reminders, and safety strategies that reduce falls risk and support recovery after illness, injury, or
                surgery.
              </p>
              <p className="treatments-feature-body">
                Care starts with an assessment of needs and goals: what tasks are difficult, what risks exist in the home, and what level of
                support is helpful. Plans are personalised and can be adjusted as recovery progresses.
              </p>
              <p className="treatments-feature-body">
                Home care often works alongside physiotherapy, occupational therapy, and medical follow‑up. The aim is independence where
                possible, and safe, compassionate support when assistance is needed.
              </p>

              <div className="minimally-invasive-treatment-cta">
                <Link to="/blog/rehabilitation-therapies/home-care" className="treatment-card-button" aria-label="Learn more about home care in our blog">
                  <span>Learn More About Home Care</span>
                </Link>
                <Link to="/contact" className="minimally-invasive-treatment-secondary-link" aria-label="Book an appointment">
                  Book an appointment
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="page-section minimally-invasive-treatment-details" aria-labelledby="hc-details-title">
          <header className="minimally-invasive-treatment-details-header">
            <h2 id="hc-details-title" className="minimally-invasive-treatment-details-title">
              Home care: technique, benefits, steps, risks, and recovery
            </h2>
            <p className="minimally-invasive-treatment-details-intro">
              Home care is designed around safety and dignity. Your care plan should be reviewed regularly, especially after hospital
              discharge or changes in mobility, medication, or cognition.
            </p>
          </header>

          <div className="minimally-invasive-treatment-details-grid">
            <article className="minimally-invasive-treatment-card" aria-labelledby="hc-technique-title">
              <h3 id="hc-technique-title" className="minimally-invasive-treatment-card-title">
                Technique (how it works)
              </h3>
              <p className="minimally-invasive-treatment-card-body">
                Home care combines practical assistance with safety strategies: mobility support, hygiene help, meal preparation, medication
                reminders, and home environment adjustments. The level of support can be short‑term during recovery or longer‑term for chronic
                needs.
              </p>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="hc-benefits-title">
              <h3 id="hc-benefits-title" className="minimally-invasive-treatment-card-title">
                Medical benefits
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Medical benefits of home care">
                <li>Safer recovery at home with reduced falls risk.</li>
                <li>Support with daily tasks, improving comfort and quality of life.</li>
                <li>Improved adherence to rehabilitation routines and medications when appropriate.</li>
                <li>Reduced caregiver burden through structured support and planning.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="hc-steps-title">
              <h3 id="hc-steps-title" className="minimally-invasive-treatment-card-title">
                Procedural steps
              </h3>
              <ol className="minimally-invasive-treatment-steps" aria-label="Home care steps">
                <li>Initial assessment: needs, risks, preferences, and goals.</li>
                <li>Care plan creation: schedule, tasks, and safety measures.</li>
                <li>Home set‑up recommendations (equipment, lighting, trip hazards).</li>
                <li>Ongoing support and monitoring of changes in function.</li>
                <li>Regular review and coordination with clinicians and family.</li>
              </ol>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="hc-risks-title">
              <h3 id="hc-risks-title" className="minimally-invasive-treatment-card-title">
                Risks and complications
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Risks of home care">
                <li>Falls risk if mobility assistance or equipment is not used correctly.</li>
                <li>Medication errors if responsibility is unclear; plans should be explicit.</li>
                <li>Skin problems if mobility is limited and repositioning needs are not met.</li>
                <li>Delayed escalation if symptoms worsen; carers should know red flags.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="hc-prep-title">
              <h3 id="hc-prep-title" className="minimally-invasive-treatment-card-title">
                Preparation and aftercare
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Preparation and aftercare for home care">
                <li>Prepare a medication list and emergency contact information.</li>
                <li>Review the home for trip hazards and ensure adequate lighting.</li>
                <li>Agree on care tasks and boundaries to protect privacy and dignity.</li>
                <li>Seek urgent help for chest pain, severe shortness of breath, sudden weakness, or confusion.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="hc-recovery-title">
              <h3 id="hc-recovery-title" className="minimally-invasive-treatment-card-title">
                Recovery timeline
              </h3>
              <p className="minimally-invasive-treatment-card-body">
                Home care timelines vary. After procedures or illness, support may be needed for days to weeks. Longer‑term care can be
                adjusted as independence changes, with regular reviews to match needs.
              </p>
            </article>
          </div>
        </section>

        <div id="treatments">
          <TreatmentsMain hideSurgical hideMinimallyInvasive />
        </div>
      </main>
    </div>
  );
};

export default HomeCarePage;
