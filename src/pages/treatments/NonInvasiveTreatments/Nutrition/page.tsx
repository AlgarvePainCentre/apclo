import React from 'react';
import { Link } from 'react-router-dom';
import { TreatmentsMain } from '../../Treatments';
import '../../Treatments.css';
import './Nutrition.css';

const NutritionPage: React.FC = () => {
  React.useEffect(() => {
    const pageTitle = 'Nutrition in Algarve | Diet plans for pain, weight, and recovery';
    document.title = pageTitle;

    const description =
      'Learn about nutrition support in Algarve for pain, weight, and long‑term health. Personalised diet plans and simple consultation booking.';

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
      "linear-gradient(120deg, rgba(0, 51, 102, 0.85), rgba(0, 51, 102, 0.55)), url('/assets/images/illustrative/Nutrition-min-1.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className="psx-page nutrition-page" id="psx-nutrition">
      <header className="psx-hero nutrition-hero" aria-label="Nutrition hero section">
        <div className="psx-hero-backdrop" aria-hidden="true" style={heroBackdropStyle} />
        <div className="psx-hero-inner">
          <p className="psx-hero-eyebrow">Treatment</p>
          <h1 className="psx-hero-title">Nutrition</h1>
          <p className="psx-hero-subtitle">
            Personalised nutrition supports healing, energy and long-term health goals.
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
            <li aria-current="page">Nutrition</li>
          </ol>
        </nav>

        <section className="page-section treatments-feature non-invasive-treatment-feature" aria-labelledby="nut-what-to-expect">
          <div className="treatments-feature-inner">
            <div className="treatments-feature-media">
              <img
                className="treatments-feature-video"
                src="/assets/images/illustrative/Nutrition-min-1.jpg"
                alt="Nutrition planning with fresh foods to support recovery, energy, and long-term health goals (illustrative)."
                decoding="async"
                loading="lazy"
              />
            </div>

            <div className="treatments-feature-copy">
              <h2 id="nut-what-to-expect" className="treatments-feature-title">
                What patients can expect
              </h2>
              <div className="treatments-feature-accent" />
              <p className="treatments-feature-body">
                Nutrition support helps align your eating habits with recovery, energy, weight goals, and long‑term health. For pain and
                rehabilitation, the focus is usually on sustainable routines—adequate protein, fibre, hydration, and meal timing—rather than
                restrictive short‑term diets.
              </p>
              <p className="treatments-feature-body">
                Your clinician will review your medical history, medications, lifestyle, preferences, and goals. Plans are personalised and
                practical, and may address issues such as inflammation management, weight change, gastrointestinal tolerance, or nutrition
                around exercise and physiotherapy.
              </p>
              <p className="treatments-feature-body">
                After the consultation, you’ll have clear next steps: a tailored plan, simple habits to prioritise, and a follow‑up schedule
                to review progress and adapt the approach.
              </p>

              <div className="minimally-invasive-treatment-cta">
                <Link to="/blog/rehabilitation-therapies/nutrition" className="treatment-card-button" aria-label="Learn more about nutrition support in our blog">
                  <span>Learn More About Nutrition Support</span>
                </Link>
                <Link to="/contact" className="minimally-invasive-treatment-secondary-link" aria-label="Book an appointment">
                  Book an appointment
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="page-section minimally-invasive-treatment-details" aria-labelledby="nut-details-title">
          <header className="minimally-invasive-treatment-details-header">
            <h2 id="nut-details-title" className="minimally-invasive-treatment-details-title">
              Nutrition: technique, benefits, steps, risks, and recovery
            </h2>
            <p className="minimally-invasive-treatment-details-intro">
              Nutrition plans should fit your health conditions and preferences. Your clinician will check for safety issues such as diabetes
              control, kidney disease, food allergies, and medication interactions.
            </p>
          </header>

          <div className="minimally-invasive-treatment-details-grid">
            <article className="minimally-invasive-treatment-card" aria-labelledby="nut-technique-title">
              <h3 id="nut-technique-title" className="minimally-invasive-treatment-card-title">
                Technique (how it works)
              </h3>
              <p className="minimally-invasive-treatment-card-body">
                Nutrition therapy uses assessment and coaching to change eating patterns over time. It often focuses on protein adequacy,
                energy balance, fibre and gut health, hydration, and meal routines that support recovery and stable energy.
              </p>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="nut-benefits-title">
              <h3 id="nut-benefits-title" className="minimally-invasive-treatment-card-title">
                Medical benefits
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Medical benefits of nutrition support">
                <li>Supports tissue healing and recovery with adequate protein and energy intake.</li>
                <li>Improves long‑term health risk factors such as cardiovascular health and metabolic control.</li>
                <li>Helps manage weight when relevant to joint load and mobility.</li>
                <li>Can improve exercise performance and rehabilitation tolerance.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="nut-steps-title">
              <h3 id="nut-steps-title" className="minimally-invasive-treatment-card-title">
                Procedural steps
              </h3>
              <ol className="minimally-invasive-treatment-steps" aria-label="Nutrition consultation steps">
                <li>Assessment of goals, health conditions, medications, and current diet.</li>
                <li>Identification of barriers (time, appetite, GI symptoms, cravings, fatigue).</li>
                <li>Plan design: priorities, meal structure, and realistic habit targets.</li>
                <li>Tracking approach (simple checklists or food logs when useful).</li>
                <li>Follow‑up review and adjustments based on progress and tolerance.</li>
              </ol>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="nut-risks-title">
              <h3 id="nut-risks-title" className="minimally-invasive-treatment-card-title">
                Risks and complications
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Risks of nutrition support">
                <li>Nutrient deficiencies with overly restrictive diets.</li>
                <li>Blood sugar instability if changes are not aligned with diabetes treatment.</li>
                <li>Gastrointestinal discomfort during fibre changes if increased too quickly.</li>
                <li>Medication interactions (for example supplements) if not reviewed.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="nut-prep-title">
              <h3 id="nut-prep-title" className="minimally-invasive-treatment-card-title">
                Preparation and aftercare
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Preparation and aftercare for nutrition support">
                <li>Bring a medication list and note any allergies, intolerances, or GI symptoms.</li>
                <li>Track 2–3 days of typical food and drink intake if possible.</li>
                <li>Start with small changes you can repeat; consistency matters more than perfection.</li>
                <li>Arrange follow‑ups to review progress and adjust goals safely.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="nut-recovery-title">
              <h3 id="nut-recovery-title" className="minimally-invasive-treatment-card-title">
                Recovery timeline
              </h3>
              <p className="minimally-invasive-treatment-card-body">
                Some changes (hydration, meal timing) can help within days. Body composition and metabolic improvements usually develop over
                weeks to months with consistent habits and follow‑up support.
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

export default NutritionPage;
