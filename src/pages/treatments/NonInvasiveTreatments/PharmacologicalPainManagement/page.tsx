import React from 'react';
import { Link } from 'react-router-dom';
import { TreatmentsMain } from '../../Treatments';
import '../../Treatments.css';
import './PharmacologicalPainManagement.css';

type PharmacologicalPainManagementFaqItem = {
  id: string;
  question: string;
  answer: string;
};

const PHARMACOLOGICAL_PAIN_MANAGEMENT_FAQ: PharmacologicalPainManagementFaqItem[] = [
  {
    id: 'results',
    question: 'How long will it take to see results?',
    answer:
      'Timing varies by diagnosis and medication type. Some people notice changes within days, while others may need a few weeks to assess benefit. Your clinician will define a review timeframe based on the medicine chosen and your goals.',
  },
  {
    id: 'dependency',
    question: 'Are there risks of dependency?',
    answer:
      'Some medicines can carry dependence or tolerance risks. When that applies, we use the lowest effective dose for the shortest necessary duration, review regularly, and consider alternatives to reduce risk.',
  },
  {
    id: 'lifestyle',
    question: 'Do I need to make lifestyle changes?',
    answer:
      'Often, yes. Medication tends to work best alongside rehabilitation, sleep routines, pacing strategies, and activity planning. Your plan may include simple changes to support recovery and long‑term control.',
  },
  {
    id: 'interfere',
    question: 'Will the medications interfere with other treatments?',
    answer:
      'Your clinician checks for interactions with other medicines, supplements, and treatments. Let your team know about everything you take so we can coordinate safely alongside physiotherapy, procedures, or surgery if needed.',
  },
];

const PharmacologicalPainManagementPage: React.FC = () => {
  const [activeFaqId, setActiveFaqId] = React.useState<string | null>(() => PHARMACOLOGICAL_PAIN_MANAGEMENT_FAQ[0]?.id ?? null);

  React.useEffect(() => {
    const pageTitle =
      'Pharmacological pain management in Algarve | Tailored medication plans';
    document.title = pageTitle;

    const description =
      'Learn about pharmacological pain management in Algarve. Individualised medication plans, side‑effect monitoring, and easy access to specialist consultation.';

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
      "linear-gradient(120deg, rgba(0, 51, 102, 0.85), rgba(0, 51, 102, 0.55)), url('/assets/images/illustrative/Pharmacological-Pain-Management-min.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className="psx-page pharmacological-pain-management-page" id="psx-pharmacological-pain-management">
      <header className="psx-hero pharmacological-pain-management-hero" aria-label="Pharmacological pain management hero section">
        <div className="psx-hero-backdrop" aria-hidden="true" style={heroBackdropStyle} />
        <div className="psx-hero-inner">
          <p className="psx-hero-eyebrow">Treatment</p>
          <h1 className="psx-hero-title">Pharmacological pain management</h1>
          <p className="psx-hero-subtitle">
            Tailored medication plans help balance pain relief with safety and side effects.
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
            <li aria-current="page">Pharmacological pain management</li>
          </ol>
        </nav>

        <section className="page-section treatments-feature non-invasive-treatment-feature" aria-labelledby="ppm-what-to-expect">
          <div className="treatments-feature-inner">
            <div className="treatments-feature-media">
              <img
                className="treatments-feature-video"
                src="/assets/images/illustrative/Pharmacological-Pain-Management-min.jpg"
                alt="Medication planning and review as part of pharmacological pain management and safe prescribing (illustrative)."
                decoding="async"
                loading="lazy"
              />
            </div>

            <div className="treatments-feature-copy">
              <h2 id="ppm-what-to-expect" className="treatments-feature-title">
                What patients can expect
              </h2>
              <div className="treatments-feature-accent" />
              <p className="treatments-feature-body">
                Pharmacological pain management is a structured way of using medicines to reduce symptoms, improve sleep, and support daily
                function while minimising side effects. It is usually most effective when paired with rehabilitation, lifestyle strategies,
                and a clear plan for monitoring benefit.
              </p>
              <p className="treatments-feature-body">
                Your clinician reviews your pain pattern, medical history, current medicines (including supplements), and goals. The focus
                is on choosing the safest option for your situation, defining a trial period, and deciding how success will be measured
                (for example walking time, sleep, or work tolerance).
              </p>
              <p className="treatments-feature-body">
                Follow-up is an essential part of good medication care. Plans often change over time as symptoms improve, side effects
                appear, or other treatments (physiotherapy or procedures) are introduced.
              </p>

              <div className="minimally-invasive-treatment-cta">
                <Link
                  to="/blog/rehabilitation-therapies/pharmacological-pain-management"
                  className="treatment-card-button"
                  aria-label="Learn more about pharmacological pain management in our blog"
                >
                  <span>Learn More About Medication Plans</span>
                </Link>
                <Link to="/contact" className="minimally-invasive-treatment-secondary-link" aria-label="Book an appointment">
                  Book an appointment
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="page-section ppm-process" aria-labelledby="ppm-process-title">
          <div className="ppm-process-inner">
            <div className="ppm-process-top">
              <h2 id="ppm-process-title" className="ppm-process-title">
                Understanding
                <br />
                Pharmacological Pain
                <br />
                Management
              </h2>
              <div className="ppm-process-copy">
                <p className="ppm-process-paragraph">
                  Pharmacological pain management is a safe, non‑invasive approach that uses medication to help relieve different types of
                  pain without surgery.
                </p>
                <p className="ppm-process-paragraph">
                  Plans are individualised. The goal is to relieve pain effectively by addressing its likely mechanism while balancing
                  safety, interactions, and side effects.
                </p>
                <p className="ppm-process-paragraph">
                  This approach can be particularly valuable for people who need ongoing relief but wish to avoid surgical procedures or
                  more invasive options.
                </p>
              </div>
            </div>

            <h2 className="ppm-process-steps-title">What this Process Looks Like</h2>

            <div className="ppm-steps-grid" role="list" aria-label="Pharmacological pain management process steps">
              <article className="ppm-step-card" role="listitem" aria-label="Step 1 initial assessment">
                <p className="ppm-step-number">1.</p>
                <h3 className="ppm-step-title">Initial Assessment</h3>
                <div className="ppm-step-divider" aria-hidden="true" />
                <p className="ppm-step-body">
                  The process begins with a comprehensive assessment, including a medical history review and physical examination to
                  determine the best treatment approach.
                </p>
              </article>

              <article className="ppm-step-card" role="listitem" aria-label="Step 2 prescription and monitoring">
                <p className="ppm-step-number">2.</p>
                <h3 className="ppm-step-title">
                  Prescription &amp;
                  <br />
                  Monitoring
                </h3>
                <div className="ppm-step-divider" aria-hidden="true" />
                <p className="ppm-step-body">
                  Your clinician selects medication based on your symptoms and health profile, then monitors response and side effects to
                  optimise safety and effectiveness.
                </p>
              </article>

              <article className="ppm-step-card" role="listitem" aria-label="Step 3 ongoing support">
                <p className="ppm-step-number">3.</p>
                <h3 className="ppm-step-title">Ongoing Support</h3>
                <div className="ppm-step-divider" aria-hidden="true" />
                <p className="ppm-step-body">
                  Regular follow‑ups help evaluate progress, adjust doses, and address any questions or concerns you may have about your
                  medication plan.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="page-section ppm-aftercare" aria-labelledby="ppm-aftercare-title">
          <header className="ppm-aftercare-header">
            <h2 id="ppm-aftercare-title" className="ppm-aftercare-title">
              What to Expect After
              <br />
              Implementation
            </h2>
            <p className="ppm-aftercare-subtitle">Here&apos;s a breakdown of what you can expect:</p>
          </header>

          <div className="ppm-aftercare-layout" aria-label="After implementation expectations">
            <figure className="ppm-aftercare-media" aria-hidden="true">
              <div className="ppm-aftercare-poster">
                <img
                  className="ppm-aftercare-image"
                  src="/assets/images/medical/DSC04816-1536x1229.jpg"
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </figure>

            <div className="ppm-aftercare-panel" role="list" aria-label="After implementation expectations">
              <article className="ppm-aftercare-item" role="listitem">
                <h3 className="ppm-aftercare-item-title">Pain Relief</h3>
                <p className="ppm-aftercare-item-body">
                  Many people begin to notice pain reduction within days to weeks, depending on the medication and individual response.
                </p>
              </article>
              <div className="ppm-aftercare-divider" aria-hidden="true" />
              <article className="ppm-aftercare-item" role="listitem">
                <h3 className="ppm-aftercare-item-title">Minimal Side Effects</h3>
                <p className="ppm-aftercare-item-body">
                  Plans are designed to minimise potential side effects. If they occur, they are usually mild and addressed with dose
                  adjustments or medication changes.
                </p>
              </article>
              <div className="ppm-aftercare-divider" aria-hidden="true" />
              <article className="ppm-aftercare-item" role="listitem">
                <h3 className="ppm-aftercare-item-title">Lifestyle Adjustments</h3>
                <p className="ppm-aftercare-item-body">
                  Complementary lifestyle strategies such as activity pacing, sleep routines, and rehabilitation can improve the overall
                  effectiveness of your plan.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="page-section ppm-benefits" aria-labelledby="ppm-benefits-title">
          <div className="ppm-benefits-inner">
            <header className="ppm-benefits-header">
              <h2 id="ppm-benefits-title" className="ppm-benefits-title">Benefits of Pharmacological Pain Management</h2>
              <p className="ppm-benefits-subtitle">
                Pharmacological pain management can significantly improve quality of life for people living with chronic pain. Some of the
                main benefits include:
              </p>
            </header>

            <div className="ppm-benefits-grid" role="list" aria-label="Benefits of pharmacological pain management">
              <article className="ppm-benefit-card ppm-benefit-card--highlight" role="listitem">
                <h3 className="ppm-benefit-title">Non–Invasive Relief</h3>
                <div className="ppm-benefit-divider" aria-hidden="true" />
                <p className="ppm-benefit-body">
                  Unlike surgical treatments, medication plans provide pain relief without breaking the skin or requiring recovery time.
                </p>
              </article>

              <article className="ppm-benefit-card" role="listitem">
                <h3 className="ppm-benefit-title">Enhanced Functionality</h3>
                <div className="ppm-benefit-divider" aria-hidden="true" />
                <p className="ppm-benefit-body">
                  Pain relief can improve mobility and physical function, enabling people to resume daily activities more comfortably.
                </p>
              </article>

              <article className="ppm-benefit-card" role="listitem">
                <h3 className="ppm-benefit-title">Emotional &amp; Mental Relief</h3>
                <div className="ppm-benefit-divider" aria-hidden="true" />
                <p className="ppm-benefit-body">
                  Effective pain management can reduce stress, anxiety, and low mood related to persistent symptoms, improving wellbeing.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="page-section ppm-conditions" aria-labelledby="ppm-conditions-title">
          <div className="ppm-conditions-inner">
            <header className="ppm-conditions-header">
              <h2 id="ppm-conditions-title" className="ppm-conditions-title">
                Conditions Treated with
                <br />
                Pharmacological Pain Management
              </h2>
            </header>

            <div className="ppm-conditions-grid" role="list" aria-label="Conditions treated with pharmacological pain management">
              <article className="ppm-condition-card" role="listitem">
                <div className="ppm-condition-text">
                  <h3 className="ppm-condition-title">Arthritis</h3>
                  <p className="ppm-condition-body">
                    Medication can help reduce pain and inflammation and support movement while you progress rehabilitation and lifestyle
                    strategies.
                  </p>
                </div>
                <div className="ppm-condition-media" aria-hidden="true">
                  <img
                    className="ppm-condition-image"
                    src="/assets/images/treatment-img/Arthrits.jpg"
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </article>

              <article className="ppm-condition-card ppm-condition-card--reverse" role="listitem">
                <div className="ppm-condition-text">
                  <h3 className="ppm-condition-title">Neuropathic pain</h3>
                  <p className="ppm-condition-body">
                    Certain medicines can help calm nerve‑related pain patterns and improve tolerance for daily activity and sleep.
                  </p>
                </div>
                <div className="ppm-condition-media" aria-hidden="true">
                  <img
                    className="ppm-condition-image"
                    src="/assets/images/treatment-img/Neuropatic.jpg"
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </article>

              <article className="ppm-condition-card ppm-condition-card--reverse" role="listitem">
                <div className="ppm-condition-text">
                  <h3 className="ppm-condition-title">Fibromyalgia</h3>
                  <p className="ppm-condition-body">
                    A tailored plan can target widespread pain and sensitivity while supporting graded activity and sleep routines.
                  </p>
                </div>
                <div className="ppm-condition-media" aria-hidden="true">
                  <img
                    className="ppm-condition-image"
                    src="/assets/images/treatment-img/Fibromyalgia.jpg"
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </article>

              <article className="ppm-condition-card" role="listitem">
                <div className="ppm-condition-text">
                  <h3 className="ppm-condition-title">Migraines &amp; Headaches</h3>
                  <p className="ppm-condition-body">
                    Preventive or acute medicines may reduce attack frequency and intensity when matched to your migraine pattern.
                  </p>
                </div>
                <div className="ppm-condition-media" aria-hidden="true">
                  <img
                    className="ppm-condition-image"
                    src="/assets/images/treatment-img/Migraines.jpg"
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="page-section ppm-help" aria-labelledby="ppm-help-title">
          <div className="ppm-help-inner">
            <h2 id="ppm-help-title" className="ppm-help-title">
              Is Pharmacological
              <br />
              Pain Management
              <br />
              Right for You?
            </h2>
            <div className="ppm-help-copy">
              <p className="ppm-help-paragraph">
                This approach may be suitable for people experiencing chronic pain that affects daily life and who prefer a non‑invasive
                option for relief.
              </p>
              <p className="ppm-help-paragraph">
                People with certain medical conditions, such as liver or kidney disease, may need alternative strategies. A thorough review
                with your clinician helps determine the safest path forward.
              </p>
              <p className="ppm-help-paragraph">
                Pharmacological pain management is a flexible option that can be adapted for long‑term use when appropriate, especially for
                people who require ongoing symptom control.
              </p>
            </div>
          </div>

          <div className="ppm-help-cta" aria-label="Get help call to action">
            <div className="ppm-help-cta-inner">
              <h2 className="ppm-help-cta-title">Learn how we can help you</h2>
              <p className="ppm-help-cta-subtitle">
                If you&apos;re having symptoms described in this article, it&apos;s crucial to seek professional medical advice.
              </p>
              <Link to="/contact" className="ppm-help-cta-button" aria-label="Get help now">
                Get Help Now
              </Link>
            </div>
          </div>
        </section>

        <section className="page-section ppm-faq" aria-labelledby="ppm-faq-title">
          <div className="ppm-faq-inner">
            <header className="ppm-faq-header">
              <h2 id="ppm-faq-title" className="ppm-faq-title">
                Pharmacological Pain Management FAQ
              </h2>
            </header>
            <div className="ppm-faq-card" role="list" aria-label="Pharmacological pain management frequently asked questions">
              {PHARMACOLOGICAL_PAIN_MANAGEMENT_FAQ.map((item) => {
                const isActive = activeFaqId === item.id;
                const rowId = `ppm-faq-${item.id}`;
                const panelId = `ppm-faq-panel-${item.id}`;

                return (
                  <div key={item.id} className="ppm-faq-item" role="listitem">
                    <button
                      id={rowId}
                      type="button"
                      className="ppm-faq-trigger"
                      aria-expanded={isActive}
                      aria-controls={panelId}
                      onClick={() => setActiveFaqId((current) => (current === item.id ? null : item.id))}
                    >
                      <span className="ppm-faq-question">{item.question}</span>
                      <span className="ppm-faq-icon" aria-hidden="true">
                        {isActive ? '−' : '+'}
                      </span>
                    </button>
                    <div
                      id={panelId}
                      className="ppm-faq-panel"
                      data-open={isActive ? 'true' : 'false'}
                      role="region"
                      aria-labelledby={rowId}
                      aria-hidden={!isActive}
                    >
                      <p className="ppm-faq-answer">{item.answer}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="page-section minimally-invasive-treatment-details" aria-labelledby="ppm-details-title">
          <header className="minimally-invasive-treatment-details-header">
            <h2 id="ppm-details-title" className="minimally-invasive-treatment-details-title">
              Pharmacological pain management: technique, benefits, steps, risks, and recovery
            </h2>
            <p className="minimally-invasive-treatment-details-intro">
              Medicine plans are individualised. Your clinician will explain expected benefits, safety monitoring, and how medication fits
              alongside rehabilitation and self‑management.
            </p>
          </header>

          <div className="minimally-invasive-treatment-details-grid">
            <article className="minimally-invasive-treatment-card" aria-labelledby="ppm-technique-title">
              <h3 id="ppm-technique-title" className="minimally-invasive-treatment-card-title">
                Technique (how it works)
              </h3>
              <p className="minimally-invasive-treatment-card-body">
                A clinician matches medication choice and timing to the likely pain mechanism and your health profile. Plans often involve
                stepwise trials, dose adjustments, and coordination with physiotherapy or psychological strategies to improve function.
              </p>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="ppm-benefits-title">
              <h3 id="ppm-benefits-title" className="minimally-invasive-treatment-card-title">
                Medical benefits
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Medical benefits of pharmacological pain management">
                <li>Reduced pain interference with daily activities for selected conditions.</li>
                <li>Improved sleep and ability to participate in rehabilitation.</li>
                <li>Better control of flare‑ups with a clear, structured plan.</li>
                <li>Safety improvements through monitoring and interaction checks.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="ppm-steps-title">
              <h3 id="ppm-steps-title" className="minimally-invasive-treatment-card-title">
                Procedural steps
              </h3>
              <ol className="minimally-invasive-treatment-steps" aria-label="Medication management steps">
                <li>Comprehensive review of diagnosis, symptoms, and current medicines.</li>
                <li>Risk assessment (interactions, sedation risk, dependence risk) and baseline measures.</li>
                <li>Trial plan with dose, duration, and success criteria.</li>
                <li>Monitoring of function and side effects using simple tracking.</li>
                <li>Review and adjustment, including tapering when appropriate.</li>
              </ol>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="ppm-risks-title">
              <h3 id="ppm-risks-title" className="minimally-invasive-treatment-card-title">
                Risks and complications
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Risks of pharmacological pain management">
                <li>Side effects such as dizziness, constipation, nausea, or drowsiness (medication‑dependent).</li>
                <li>Interactions with other medicines, supplements, or alcohol.</li>
                <li>Dependence or withdrawal risk with some medications if stopped abruptly.</li>
                <li>Reduced alertness affecting driving or work tasks (for sedating medicines).</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="ppm-prep-title">
              <h3 id="ppm-prep-title" className="minimally-invasive-treatment-card-title">
                Preparation and aftercare
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Preparation and aftercare for medication plans">
                <li>Bring a complete medication and supplement list, including allergies.</li>
                <li>Agree on a simple tracker for symptoms, sleep, and side effects.</li>
                <li>Follow dosing and tapering guidance; do not stop medicines suddenly unless advised.</li>
                <li>Seek urgent help for severe reactions, confusion, breathing difficulty, or chest pain.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="ppm-recovery-title">
              <h3 id="ppm-recovery-title" className="minimally-invasive-treatment-card-title">
                Recovery timeline
              </h3>
              <p className="minimally-invasive-treatment-card-body">
                Medication benefit can be immediate or gradual depending on the drug class. The goal is progressive improvement in function
                over weeks, guided by follow‑up reviews and integration with rehabilitation.
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

export default PharmacologicalPainManagementPage;
