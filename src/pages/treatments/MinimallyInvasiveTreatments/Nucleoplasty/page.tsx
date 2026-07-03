import React from 'react';
import { Link } from 'react-router-dom';
import { TreatmentsMain } from '../../Treatments';
import { initTreatmentStepsTimelines } from '../../animations/treatmentTimelineAnimations';
import { TreatmentBreadcrumb } from '../../components/detail/TreatmentBreadcrumb';
import './Nucleoplasty.css';

const NucleoplastyPage: React.FC = () => {
  const faqItems = React.useMemo(
    () => [
      {
        id: 'used-for',
        question: 'What is nucleoplasty used for?',
        answer:
          'Nucleoplasty is used in selected cases of contained disc problems where reducing disc pressure may help relieve nerve irritation—often when symptoms are more leg-dominant than back-dominant.',
      },
      {
        id: 'duration',
        question: 'How long does the pain relief from nucleoplasty last?',
        answer:
          'Relief duration varies by disc pattern, activity level, and rehabilitation. Many patients notice improvement over weeks, and longer-term results depend on a structured recovery plan.',
      },
      {
        id: 'safe',
        question: 'Is nucleoplasty safe?',
        answer:
          'When you are appropriately selected and the procedure is performed with imaging guidance, nucleoplasty is generally considered safe. Your clinician will review risks and whether it is suitable for your disc pattern.',
      },
      {
        id: 'candidate',
        question: 'Who is a good candidate for nucleoplasty?',
        answer:
          'Candidates typically have symptoms and imaging consistent with a contained disc issue and nerve irritation, without red flags that require other treatment. A clinical assessment is essential.',
      },
      {
        id: 'vs-surgery',
        question: 'How does nucleoplasty differ from traditional disc surgery?',
        answer:
          'Nucleoplasty is minimally invasive and aims to reduce disc pressure through a small needle-based approach. Traditional surgery is a larger procedure and is used for different indications, such as certain large herniations or neurological deficits.',
      },
      {
        id: 'recovery',
        question: 'What can I expect during recovery from nucleoplasty?',
        answer:
          'Recovery typically focuses on early walking, gradual return to activity, and rehabilitation to restore capacity and reduce recurrence risk. Your team will give specific lifting and activity guidance.',
      },
      {
        id: 'side-effects',
        question: 'Are there any side effects of nucleoplasty?',
        answer:
          'Temporary soreness or a short-lived symptom flare can occur. Less commonly, bleeding or infection is possible. You’ll be advised on warning signs and when to seek help.',
      },
      {
        id: 'effectiveness',
        question: 'How effective is nucleoplasty in treating disc-related pain?',
        answer:
          'Effectiveness depends heavily on selecting the right disc pattern and matching treatment to symptoms. It can help in selected cases, especially for nerve-related leg pain rather than isolated back pain.',
      },
      {
        id: 'repeat',
        question: 'Can nucleoplasty be repeated if necessary?',
        answer:
          'If symptoms return or goals are not met, your clinician will reassess the cause and discuss next steps. In some cases, repeat intervention may be considered, but it depends on the underlying disc findings.',
      },
      {
        id: 'physio',
        question: 'Will I need physical therapy after nucleoplasty?',
        answer:
          'Rehabilitation is usually recommended. Physiotherapy helps you restore movement, rebuild strength, and reduce recurrence risk while you return to normal activity.',
      },
    ],
    [],
  );

  const [activeFaqId, setActiveFaqId] = React.useState<string | null>(faqItems[0]?.id ?? null);

  React.useEffect(() => {
    const pageTitle = 'Nucleoplasty in Algarve | Minimally invasive disc decompression';
    document.title = pageTitle;

    const description =
      'Explore nucleoplasty in Algarve for contained disc herniation and back or leg pain. Minimally invasive, image‑guided, and consultation‑ready.';

    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = description;
  }, []);

  React.useEffect(() => {
    const scope = document.getElementById('psx-nucleoplasty') ?? document;
    return initTreatmentStepsTimelines(scope);
  }, []);

  return (
    <div className="psx-page nucleoplasty-page page-nucleoplasty" id="psx-nucleoplasty">
      <header className="treatment-page-hero nucleoplasty-hero" aria-label="Nucleoplasty hero section">
        <div
          className="psx-hero-backdrop"
          aria-hidden="true"
          style={{ backgroundImage: "url('/assets/images/learn/4-disc-problems.webp')" }}
        />
        <div className="psx-hero-inner">
          <p className="psx-hero-eyebrow">Treatment</p>
          <h1 className="psx-hero-title">Nucleoplasty</h1>
          <p className="psx-hero-subtitle">
            Minimally invasive disc decompression reduces pressure on nerves causing back pain.
          </p>
        </div>
      </header>

      <TreatmentsMain.PageMain>
        <TreatmentBreadcrumb currentLabel="Nucleoplasty" />

        <section className="page-section treatments-feature minimally-invasive-treatment-feature" aria-labelledby="np-what-to-expect">
          <div className="treatments-feature-inner">
            <div className="treatments-feature-media">
              <img
                className="treatments-feature-video"
                src="/assets/images/learn/4-disc-problems.webp"
                alt="Illustration of a spinal disc problem and nerve compression patterns treated with minimally invasive disc decompression such as nucleoplasty (illustrative)."
                decoding="async"
                loading="lazy"
              />
            </div>

            <div className="treatments-feature-copy">
              <h2 id="np-what-to-expect" className="treatments-feature-title">
                What patients can expect
              </h2>
              <div className="treatments-feature-accent" />
              <p className="treatments-feature-body">
                Nucleoplasty is an image‑guided, minimally invasive disc decompression technique used for carefully selected disc patterns.
                It aims to reduce pressure within the disc and relieve irritation of nearby nerves—often for leg‑dominant symptoms rather
                than isolated back pain.
              </p>
              <p className="treatments-feature-body">
                Suitability depends on symptoms, neurological findings, and imaging. Your clinician will explain whether the disc problem is
                contained, whether there are warning signs that require other treatment, and what outcomes are realistic for your case.
              </p>
              <p className="treatments-feature-body">
                Recovery typically emphasises early walking, gradual return to activity, and a rehabilitation plan to restore capacity and
                reduce recurrence risk.
              </p>
            </div>
          </div>
        </section>

        <section className="page-section np-overview" aria-labelledby="np-understanding-title">
          <div className="np-overview-inner">
            <div className="np-understanding-top">
              <h2 id="np-understanding-title" className="np-understanding-title">
                Understanding
                <br />
                Nucleoplasty
              </h2>
              <div className="np-understanding-copy">
                <p className="np-understanding-paragraph">
                  Nucleoplasty is a minimally invasive, image-guided procedure designed to reduce pressure within a contained disc
                  herniation and help relieve irritation of nearby nerve roots.
                </p>
                <p className="np-understanding-paragraph">
                  A specialised device removes a small amount of disc material, which can lower internal disc pressure. This approach may be
                  appropriate for selected disc patterns and symptoms, especially leg-dominant pain.
                </p>
                <p className="np-understanding-paragraph">Here is how the procedure is done:</p>
              </div>
            </div>

            <div className="np-steps-grid" role="list" aria-label="Nucleoplasty steps">
              <article className="np-step-card" role="listitem" aria-label="Step 1 preparation">
                <p className="np-step-number">1.</p>
                <h3 className="np-step-title">Preparation</h3>
                <div className="np-step-divider" aria-hidden="true" />
                <p className="np-step-body">
                    Local anaesthetic is used to numb the area. In some cases, light sedation may also be offered to help you stay
                    comfortable.
                </p>
              </article>

              <article className="np-step-card" role="listitem" aria-label="Step 2 insertion">
                <p className="np-step-number">2.</p>
                <h3 className="np-step-title">Insertion</h3>
                <div className="np-step-divider" aria-hidden="true" />
                <p className="np-step-body">
                    A thin needle is guided into the affected disc under imaging guidance to ensure precise placement.
                </p>
              </article>

              <article className="np-step-card" role="listitem" aria-label="Step 3 decompression">
                <p className="np-step-number">3.</p>
                <h3 className="np-step-title">Decompression</h3>
                <div className="np-step-divider" aria-hidden="true" />
                <p className="np-step-body">
                    A specialised probe is used to remove a small amount of disc material, reducing pressure and easing nerve irritation in
                    selected cases.
                </p>
              </article>

              <article className="np-step-card" role="listitem" aria-label="Step 4 completion">
                <p className="np-step-number">4.</p>
                <h3 className="np-step-title">Completion</h3>
                <div className="np-step-divider" aria-hidden="true" />
                <p className="np-step-body">
                    The probe is removed and a small dressing is applied. The procedure typically takes around 30 to 60 minutes, depending
                    on the plan.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="page-section np-aftercare" aria-labelledby="np-aftercare-title">
          <header className="np-aftercare-header">
              <h2 id="np-aftercare-title" className="np-aftercare-title">
                What to Expect After the Procedure
              </h2>
              <p className="np-aftercare-subtitle">
                After nucleoplasty, most patients are monitored briefly and then follow a gradual return to activity plan. Here’s what you
                can typically expect during recovery:
              </p>
          </header>

          <div className="np-aftercare-layout" aria-label="Post-procedure expectations">
              <figure className="np-aftercare-media" aria-hidden="true">
                <div className="np-aftercare-poster">
                  <img
                  className="np-aftercare-image"
                  src="/assets/images/learn/4-disc-problems.webp"
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
                </div>
              </figure>

              <div className="np-aftercare-panel" role="list" aria-label="Post-procedure expectations">
                <article className="np-aftercare-item" role="listitem">
                  <h3 className="np-aftercare-item-title">Temporary Soreness</h3>
                  <p className="np-aftercare-item-body">
                    Mild tenderness at the entry site or a short-lived flare of symptoms can occur and usually settles within a few days.
                  </p>
                </article>
                <div className="np-aftercare-divider" aria-hidden="true" />
                <article className="np-aftercare-item" role="listitem">
                  <h3 className="np-aftercare-item-title">Gradual Improvement</h3>
                  <p className="np-aftercare-item-body">
                    Symptom relief may build over days to weeks as the irritated nerve settles and you restore capacity with rehabilitation.
                  </p>
                </article>
                <div className="np-aftercare-divider" aria-hidden="true" />
                <article className="np-aftercare-item" role="listitem">
                  <h3 className="np-aftercare-item-title">Activity Plan</h3>
                  <p className="np-aftercare-item-body">
                    Early walking is encouraged, with a staged return to work, lifting, and sport based on symptoms and clinician guidance.
                  </p>
                </article>
              </div>
            </div>
        </section>

        <section className="page-section np-benefits" aria-labelledby="np-benefits-title">
          <div className="np-benefits-inner">
            <header className="np-benefits-header">
              <h2 id="np-benefits-title" className="np-benefits-title">
                Benefits of Nucleoplasty
              </h2>
              <p className="np-benefits-subtitle">Nucleoplasty can offer several benefits, such as:</p>
            </header>

            <div className="cryo-benefits-grid" role="list" aria-label="Benefits of nucleoplasty">
              <article className="cryo-benefit-card" role="listitem">
                <h3 className="cryo-benefit-title">Minimally Invasive</h3>
                <div className="cryo-benefit-divider" aria-hidden="true" />
                <p className="cryo-benefit-body">
                  Uses a small skin entry point under imaging guidance, aiming to reduce tissue disruption compared with open surgery.
                </p>
              </article>

              <article className="cryo-benefit-card" role="listitem">
                <h3 className="cryo-benefit-title">Quick Recovery</h3>
                <div className="cryo-benefit-divider" aria-hidden="true" />
                <p className="cryo-benefit-body">
                  Many patients return to light activity quickly, with a staged plan for work, lifting, and sport.
                </p>
              </article>

              <article className="cryo-benefit-card" role="listitem">
                <h3 className="cryo-benefit-title">Improved Quality of Life</h3>
                <div className="cryo-benefit-divider" aria-hidden="true" />
                <p className="cryo-benefit-body">
                  When symptoms improve, it can be easier to walk, sleep, and participate in rehabilitation and daily routines.
                </p>
              </article>
            </div>

            <div className="cryo-benefits-grid" role="list" aria-label="Additional benefits of nucleoplasty">
              <article className="cryo-benefit-card" role="listitem">
                <h3 className="cryo-benefit-title">Effective Pain Relief</h3>
                <div className="cryo-benefit-divider" aria-hidden="true" />
                <p className="cryo-benefit-body">
                  In selected contained disc patterns, reducing disc pressure may ease nerve irritation and leg-dominant pain.
                </p>
              </article>

              <article className="cryo-benefit-card" role="listitem">
                <h3 className="cryo-benefit-title">Outpatient Procedure</h3>
                <div className="cryo-benefit-divider" aria-hidden="true" />
                <p className="cryo-benefit-body">
                  Often performed as a day procedure, with monitoring afterwards and clear guidance for recovery and follow-up.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="page-section np-conditions" aria-labelledby="np-conditions-title">
          <div className="np-conditions-inner tms-conditions-inner">
            <header className="np-conditions-header tms-conditions-header">
              <h2 id="np-conditions-title" className="np-conditions-title tms-conditions-title">
                Conditions Treated with
                <br />
                Nucleoplasty
              </h2>
            </header>

            <div className="np-conditions-grid tms-conditions-grid" role="list" aria-label="Conditions treated with nucleoplasty">
              <article className="np-condition-card tms-conditions-card" role="listitem" aria-labelledby="np-condition-herniated-title">
                <div className="np-condition-copy tms-conditions-copy">
                  <h3 id="np-condition-herniated-title" className="np-condition-title tms-conditions-card-title">
                    Herniated Discs
                  </h3>
                  <p className="np-condition-body tms-conditions-card-body">
                    In selected contained disc patterns, reducing disc pressure can help calm nerve irritation and leg-dominant symptoms.
                  </p>
                </div>
                <div className="np-condition-media tms-conditions-media" aria-hidden="true">
                  <img className="np-condition-image tms-conditions-image" src="/assets/images/illustrative/Lumber-Spine-Pain-min.webp" alt="" loading="lazy" decoding="async" />
                </div>
              </article>

              <article className="np-condition-card tms-conditions-card" role="listitem" aria-labelledby="np-condition-bulging-title">
                <div className="np-condition-copy tms-conditions-copy">
                  <h3 id="np-condition-bulging-title" className="np-condition-title tms-conditions-card-title">
                    Bulging Discs
                  </h3>
                  <p className="np-condition-body tms-conditions-card-body">
                    A contained bulge that irritates nearby nerves may respond when decompression is appropriate for the disc pattern.
                  </p>
                </div>
                <div className="np-condition-media tms-conditions-media" aria-hidden="true">
                  <img className="np-condition-image tms-conditions-image" src="/assets/images/learn/4-disc-problems.webp" alt="" loading="lazy" decoding="async" />
                </div>
              </article>

              <article className="np-condition-card tms-conditions-card" role="listitem" aria-labelledby="np-condition-degenerative-title">
                <div className="np-condition-copy tms-conditions-copy">
                  <h3 id="np-condition-degenerative-title" className="np-condition-title tms-conditions-card-title">
                    Degenerative Disc Disease
                  </h3>
                  <p className="np-condition-body tms-conditions-card-body">
                    When symptoms relate to a specific contained disc problem, nucleoplasty may be considered as part of a broader plan.
                  </p>
                </div>
                <div className="np-condition-media tms-conditions-media" aria-hidden="true">
                  <img className="np-condition-image tms-conditions-image" src="/assets/images/illustrative/Lumber-Spine-Pain-min.webp" alt="" loading="lazy" decoding="async" />
                </div>
              </article>

              <article className="np-condition-card tms-conditions-card" role="listitem" aria-labelledby="np-condition-sciatica-title">
                <div className="np-condition-copy tms-conditions-copy">
                  <h3 id="np-condition-sciatica-title" className="np-condition-title tms-conditions-card-title">
                    Sciatica
                  </h3>
                  <p className="np-condition-body tms-conditions-card-body">
                    Leg pain from nerve irritation may improve in selected cases, especially when combined with rehabilitation and activity
                    progression.
                  </p>
                </div>
                <div className="np-condition-media tms-conditions-media" aria-hidden="true">
                  <img className="np-condition-image tms-conditions-image" src="/assets/images/learn/4-disc-problems.webp" alt="" loading="lazy" decoding="async" />
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="page-section np-faq" aria-labelledby="np-faq-title">
          <div className="np-faq-inner">
            <header className="np-faq-header">
              <h2 id="np-faq-title" className="np-faq-title">
                Nucleoplasty FAQ
              </h2>
            </header>

            <div className="np-faq-card" role="list" aria-label="Nucleoplasty frequently asked questions">
              {faqItems.map((item) => {
                const isActive = activeFaqId === item.id;
                const rowId = `np-faq-${item.id}`;
                const panelId = `np-faq-panel-${item.id}`;

                return (
                  <div key={item.id} className="np-faq-item" role="listitem">
                    <button
                      id={rowId}
                      type="button"
                      className="np-faq-trigger"
                      aria-expanded={isActive}
                      aria-controls={panelId}
                      onClick={() => setActiveFaqId((current) => (current === item.id ? null : item.id))}
                    >
                      <span className="np-faq-question">{item.question}</span>
                      <span className="np-faq-icon" aria-hidden="true">
                        {isActive ? '−' : '+'}
                      </span>
                    </button>
                    <div
                      id={panelId}
                      className="np-faq-panel"
                      data-open={isActive ? 'true' : 'false'}
                      role="region"
                      aria-labelledby={rowId}
                      aria-hidden={!isActive}
                    >
                      <p className="np-faq-answer">{item.answer}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="page-section minimally-invasive-treatment-details" aria-labelledby="np-details-title">
          <header className="minimally-invasive-treatment-details-header">
            <h2 id="np-details-title" className="minimally-invasive-treatment-details-title">
              Nucleoplasty: technique, benefits, steps, risks, and recovery
            </h2>
            <p className="minimally-invasive-treatment-details-intro">
              Nucleoplasty is not suitable for all disc herniations. A precise diagnosis and the right disc pattern are essential for safe,
              effective care.
            </p>
          </header>

          <div className="minimally-invasive-treatment-details-grid">
            <article className="minimally-invasive-treatment-card" aria-labelledby="np-technique-title">
              <h3 id="np-technique-title" className="minimally-invasive-treatment-card-title">
                Technique (how it works)
              </h3>
              <p className="minimally-invasive-treatment-card-body">
                A small probe is guided into the disc under imaging. Energy is used to remove a small amount of disc material, reducing
                internal disc pressure in selected cases and potentially easing nerve irritation.
              </p>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="np-benefits-title">
              <h3 id="np-benefits-title" className="minimally-invasive-treatment-card-title">
                Medical benefits
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Medical benefits of nucleoplasty">
                <li>May improve leg‑dominant symptoms in selected contained disc patterns.</li>
                <li>Minimally invasive outpatient procedure in many settings.</li>
                <li>Small skin entry point and a recovery plan focused on early mobility.</li>
                <li>Can complement rehabilitation and movement restoration strategies.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="np-steps-title">
              <h3 id="np-steps-title" className="minimally-invasive-treatment-card-title">
                Procedural steps
              </h3>
              <ol className="minimally-invasive-treatment-steps" aria-label="Nucleoplasty procedural steps">
                <li>Assessment and imaging review to confirm disc pattern and suitability.</li>
                <li>Skin preparation and local anaesthetic.</li>
                <li>Needle and probe placement under imaging guidance.</li>
                <li>Disc decompression with controlled energy application.</li>
                <li>Aftercare advice and rehabilitation plan.</li>
              </ol>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="np-risks-title">
              <h3 id="np-risks-title" className="minimally-invasive-treatment-card-title">
                Risks and complications
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Risks of nucleoplasty">
                <li>Temporary soreness or pain flare.</li>
                <li>Bleeding, infection, or nerve irritation (uncommon).</li>
                <li>Persistent symptoms if the pain generator is not the disc or the pattern is unsuitable.</li>
                <li>Need for additional treatment if symptoms progress or neurological signs develop.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="np-prep-title">
              <h3 id="np-prep-title" className="minimally-invasive-treatment-card-title">
                Preparation and aftercare
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Preparation and aftercare for nucleoplasty">
                <li>Bring imaging and medication list; discuss blood thinners and red‑flag symptoms.</li>
                <li>Arrange transport if sedation is used.</li>
                <li>Follow lifting and activity guidance in early recovery.</li>
                <li>Progress walking and rehabilitation to rebuild capacity and prevent recurrence.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="np-recovery-title">
              <h3 id="np-recovery-title" className="minimally-invasive-treatment-card-title">
                Recovery timeline
              </h3>
              <p className="minimally-invasive-treatment-card-body">
                Many people return to light activity quickly, with gradual improvement over weeks. The best outcomes are typically supported
                by a structured rehabilitation plan.
              </p>
            </article>
          </div>
        </section>

        <div id="treatments" className="treatments-page">
          <TreatmentsMain hideSurgical hideNonInvasive />
        </div>
      </TreatmentsMain.PageMain>
    </div>
  );
};

export default NucleoplastyPage;
