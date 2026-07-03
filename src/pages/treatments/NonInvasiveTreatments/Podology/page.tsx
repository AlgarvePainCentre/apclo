import React from 'react';
import { Link } from 'react-router-dom';
import { TreatmentsMain } from '../../Treatments';
import { initTreatmentStepsTimelines } from '../../animations/treatmentTimelineAnimations';
import { TreatmentBreadcrumb } from '../../components/detail/TreatmentBreadcrumb';
import './Podology.css';

const PodologyPage: React.FC = () => {

  const faqItems = React.useMemo(
          () => [
            {
              id: 'Frequency',
              question: 'How long does a typical exercise session last?',
              answer:
                'Sessions typically last between 30 to 60 minutes, depending on the program and individual needs.',
            },
            {
              id: 'Therapy Standars',
              question: 'Will I receive a personalized exercise plan?',
              answer:
                'Yes, each client receives a tailored exercise program based on their specific goals and assessment results.',
            },
            {
              id: 'Duration',
              question: 'How often should I exercise?',
              answer:
                'The frequency of sessions varies; however, most individuals benefit from at least 2-3 sessions per week.',
            },
            {
              id: 'Conditions',
              question: 'Can exercise help with my specific condition?',
              answer:
                'Our team is experienced in designing programs for various conditions; consultations will help determine suitability.',
            },
            {
              id: 'conditions',
              question: 'Is exercise safe for everyone?',
              answer:
                'Exercise is generally safe; however, a preliminary assessment is essential to identify any potential risks or limitations.',
            },
            
          ],
          [],
        );
      
        const [activeFaqId, setActiveFaqId] = React.useState<string | null>(faqItems[0]?.id ?? null);
        const panelContentRefs = React.useRef<Record<string, HTMLDivElement | null>>({});
        const [panelHeights, setPanelHeights] = React.useState<Record<string, number>>({});
      
        const measurePanel = React.useCallback((id: string) => {
          const el = panelContentRefs.current[id];
          if (!el) return;
          const nextHeight = el.scrollHeight;
          setPanelHeights((current) => (current[id] === nextHeight ? current : { ...current, [id]: nextHeight }));
        }, []);
  
        React.useEffect(() => {
              if (!activeFaqId) return;
              measurePanel(activeFaqId);
            }, [activeFaqId, measurePanel]);
          
            React.useEffect(() => {
              const handleResize = () => {
                if (!activeFaqId) return;
                measurePanel(activeFaqId);
              };
          
              window.addEventListener('resize', handleResize);
              return () => window.removeEventListener('resize', handleResize);
            }, [activeFaqId, measurePanel]);



  React.useEffect(() => {
    const pageTitle = 'Podology in Algarve | Specialist foot care for pain and balance';
    document.title = pageTitle;

    const description =
      'Learn about podology in Algarve for foot pain, calluses, and balance issues. Specialist foot care and straightforward consultation booking.';

    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = description;
  }, []);

  React.useEffect(() => {
    const scope = document.getElementById('psx-podology') ?? document;
    return initTreatmentStepsTimelines(scope);
  }, []);

  const heroBackdropStyle: React.CSSProperties = {
    backgroundImage:
      "linear-gradient(120deg, rgba(110, 104, 40, 0.32), rgba(47, 141, 235, 0.19)), url('/assets/images/Podology/banner.webp')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className="psx-page podology-page page-podology" id="psx-podology">
      <header className="treatment-page-hero podology-hero" aria-label="Podology hero section">
        <div className="psx-hero-backdrop" aria-hidden="true" style={heroBackdropStyle} />
        <div className="psx-hero-inner">
          <p className="psx-hero-eyebrow">Treatment</p>
          <h1 className="psx-hero-title">Podology</h1>
          <p className="psx-hero-subtitle">
            Specialist foot care reduces pain, improves balance and protects your mobility.
          </p>
        </div>
      </header>

      <TreatmentsMain.PageMain>
        <TreatmentBreadcrumb currentLabel="Podology" />

        <section className="page-section treatments-feature non-invasive-treatment-feature" aria-labelledby="pod-what-to-expect">
          <div className="treatments-feature-inner">
            <div className="treatments-feature-media">
              <img
                className="treatments-feature-video"
                src="/assets/images/illustrative/Podologist-min.webp"
                alt="Podiatry and podology foot assessment and care for pain, skin and nail problems, and gait-related issues (illustrative)."
                decoding="async"
                loading="lazy"
              />
            </div>

            <div className="treatments-feature-copy">
              <h2 id="pod-what-to-expect" className="treatments-feature-title">
                What patients can expect
              </h2>
              <div className="treatments-feature-accent" />
              <p className="treatments-feature-body">
                Podology focuses on foot health, gait, and the practical factors that affect pain and balance. Care may include skin and nail
                management, assessment of walking mechanics, footwear advice, and targeted support for conditions that affect mobility.
              </p>
              <p className="treatments-feature-body">
                Your clinician will review symptoms, medical history (including diabetes or circulation issues), and examine the feet, nails,
                skin, and footwear. When needed, they coordinate with other clinicians to address nerve pain, joint issues, or balance
                problems that contribute to foot symptoms.
              </p>
              <p className="treatments-feature-body">
                After the visit, you may have a self‑care plan, footwear or insole recommendations, and a follow‑up schedule. Ongoing foot
                care can be an important part of staying active and reducing falls risk.
              </p>
            </div>
          </div>
        </section>




        {/* Understanding */}
        <section className="page-section podology-understanding st-understanding" aria-labelledby="podology-understanding-title">
          <div className="podology-understanding-inner st-understanding-inner">
            <h2 id="podology-understanding-title" className="podology-understanding-title st-understanding-title">
              Understanding
              <br />
              Podology
            </h2>
            <div className="podology-understanding-copy st-understanding-copy">
              <p className="st-understanding-paragraph">
                Podology is a specialized field focused on diagnosing and treating conditions affecting the feet, nails, and lower limbs. With a comprehensive understanding of foot biomechanics and the impact of various disorders, podologists work to address everything from structural imbalances to skin and nail issues.
              </p>
              <p className="st-understanding-paragraph">
                By providing preventive care, podology helps improve overall foot health, maintain mobility, and prevent complications associated with conditions like diabetes.
              </p>
            </div>
          </div>
        </section>

        {/* Processo */} 
        <section className="page-section podology-process st-process" aria-labelledby="podology-process-title">
          <div className="podology-process-inner st-process-inner">
            <header className="podology-process-header st-process-header">
              <h2 id="podology-process-title" className="podology-process-title st-process-title">
                What this Process Looks Like
              </h2>
            </header>

            <div className="podology-steps-grid st-steps-grid" role="list" aria-label="Podology process steps">
              <article className="st-step-card" role="listitem" aria-label="Step 1 customized treatment">
                <p className="st-step-number" aria-hidden="true">
                  1.
                </p>
                <h3 className="st-step-title">Customized Treatment</h3>
                <div className="st-step-divider" aria-hidden="true" />
                <p className="st-step-body">
                  Based on a detailed examination of the fee, the podologist will outline a treatment plan. This might involve specific foot
                  care techniques, therapeutic pedicuring, or advice on footwear and lifestyle habits.
                </p>
              </article>

              <article className="st-step-card" role="listitem" aria-label="Step 2 therapeutic techniques">
                <p className="st-step-number" aria-hidden="true">
                  2.
                </p>
                <h3 className="st-step-title">Therapeutic Techniques</h3>
                <div className="st-step-divider" aria-hidden="true" />
                <p className="st-step-body">
                  Treatments can include nail trimming, callus reduction, wart and fungal treatments, and managing conditions like ingrown
                  toenails. All procedures are performed with precision to ensure comfort and prevent further issues.
                </p>
              </article>

              <article className="st-step-card" role="listitem" aria-label="Step 3 guidance on foot health">
                <p className="st-step-number" aria-hidden="true">
                  3.
                </p>
                <h3 className="st-step-title">Guidance on Foot Health</h3>
                <div className="st-step-divider" aria-hidden="true" />
                <p className="st-step-body">
                  Following the treatment, the podologist will often provide recommendations on foot hygiene, exercises, and footwear suited
                  to your specific needs.
                </p>
              </article>
            </div>
          </div>
        </section>

         {/* Expectativa */}
        <section className="page-section podology-aftercare st-aftercare" aria-labelledby="podology-aftercare-title">
          <header className="podology-aftercare-header st-aftercare-header">
              <h2 id="podology-aftercare-title" className="podology-aftercare-title st-aftercare-title">
                What to Expect After Implementation
              </h2>
          </header>

          <div className="podology-aftercare-layout st-aftercare-layout" aria-label="Post-procedure expectations">
              <figure className="podology-aftercare-media st-aftercare-media" aria-hidden="true">
                <div className="podology-aftercare-poster st-aftercare-poster">
                  <img
                  className="st-aftercare-image"
                  src="/assets/images/Podology/card.webp"
                  alt=""
                  decoding="async"
                  loading="lazy"
                />
                </div>
              </figure>

              <div className="podology-aftercare-panel st-aftercare-panel" role="list" aria-label="Post-procedure expectations">
                <article className="st-aftercare-item" role="listitem">
                  <h3 className="st-aftercare-item-title">Improved Comfort</h3>
                  <p className="st-aftercare-item-body">
                    Many patients notice immediate relief from discomfort, especially in cases of nail and skin conditions like corns, calluses, or ingrown toenails.
                  </p>
                </article>
                <div className="st-aftercare-divider" aria-hidden="true" />
                <article className="st-aftercare-item" role="listitem">
                  <h3 className="st-aftercare-item-title">Enhanced Mobility</h3>
                  <p className="st-aftercare-item-body">
                    Proper foot care often leads to better stability, comfort, and mobility, making daily activities easier and more enjoyable.
                  </p>
                </article>
                <div className="st-aftercare-divider" aria-hidden="true" />
                <article className="st-aftercare-item" role="listitem">
                  <h3 className="st-aftercare-item-title">Preventive Insights</h3>
                  <p className="st-aftercare-item-body">
                    With personalized guidance, you’ll gain the tools to prevent future issues, reducing the risk of recurring pain or complications.
                  </p>
                  <p className="st-aftercare-item-body">
                    For patients with chronic conditions like diabetes, podology can significantly reduce the risks associated with poor foot circulation and other complications.
                  </p>
                </article>
              </div>
            </div>
        </section>

        {/* Beneficio */} 
        <section className="page-section podology-benefits st-benefits" aria-labelledby="podology-benefits-title">
          <div className="podology-benefits-inner st-benefits-inner">
            <header className="podology-benefits-header st-benefits-header">
              <h2 id="podology-benefits-title" className="podology-benefits-title st-benefits-title">
                Benefits of Podology
              </h2>

              <p className="ot-benefits-subtitle-secondary">Some of the main benefits include:</p>
            </header>

            <div className="rfa-benefits-grid" role="list" aria-label="Benefits of podology care">

              <article className="rfa-benefit" role="listitem">
                <h3 className="rfa-benefit-title">Discomfort Relief</h3>
                <div className="rfa-benefit-divider" aria-hidden="true" />
                <p className="rfa-benefit-body">
                  Treating issues like calluses, corns, and nail problems can significantly improve foot comfort and mobility.
                </p>
              </article>

              <article className="rfa-benefit" role="listitem">
                <h3 className="rfa-benefit-title">Pain Management</h3>
                <div className="rfa-benefit-divider" aria-hidden="true" />
                <p className="rfa-benefit-body">
                  For diabetic patients and those with circulatory issues, podology helps prevent more severe foot complications.
                </p>
              </article>

              <article className="rfa-benefit" role="listitem">
                <h3 className="rfa-benefit-title">Foot Health &amp; Appearance</h3>
                <div className="rfa-benefit-divider" aria-hidden="true" />
                <p className="rfa-benefit-body">
                  Treatments address both health and aesthetic concerns, helping maintain well-groomed, healthy feet.
                </p>
              </article>

            </div>
          </div>
        </section>

        {/* Condição */} 
        <section className="page-section podology-conditions st-conditions" aria-labelledby="podology-conditions-title">
          <div className="pt-conditions-inner tms-conditions-inner">
            <header className="pt-conditions-header tms-conditions-header">
              <h2 id="podology-conditions-title" className="pt-conditions-title tms-conditions-title">
                Conditions Treated with
                <br />
                Podology
              </h2>
            </header>

            <div className="pt-conditions-grid tms-conditions-grid" role="list" aria-label="Conditions supported by podology">
              <article className="pt-condition-card tms-conditions-card" role="listitem">
                <div className="pt-condition-text tms-conditions-copy">
                  <h3 className="pt-condition-title tms-conditions-card-title">Nail Disorders</h3>
                  <p className="pt-condition-body tms-conditions-card-body">
                    Ingrown nails, fungal infections, and nail deformities.
                  </p>
                </div>
                <div className="pt-condition-media tms-conditions-media" aria-hidden="true">
                  <img
                    className="pt-condition-image tms-conditions-image" 
                    src="/assets/images/Podology/NailDisoders.webp"
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </article>

              <article className="pt-condition-card tms-conditions-card" role="listitem">
                <div className="pt-condition-text tms-conditions-copy">
                  <h3 className="pt-condition-title tms-conditions-card-title">Diabetic Foot</h3>
                  <p className="pt-condition-body tms-conditions-card-body">
                    Specialized treatments to prevent and manage foot issues for diabetic patients.
                  </p>
                </div>
                <div className="pt-condition-media tms-conditions-media" aria-hidden="true">
                  <img
                    className="pt-condition-image tms-conditions-image"
                    src="/assets/images/Podology/DiabeticFoot.webp"
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </article>

              <article className="pt-condition-card tms-conditions-card" role="listitem">
                <div className="pt-condition-text tms-conditions-copy">
                  <h3 className="pt-condition-title tms-conditions-card-title">Skin Conditions</h3>
                  <p className="pt-condition-body tms-conditions-card-body">
                    Corns, calluses, warts, and dry or cracked skin.
                  </p>
                </div>
                <div className="pt-condition-media tms-conditions-media" aria-hidden="true">
                  <img
                    className="pt-condition-image tms-conditions-image"
                    src="/assets/images/Podology/SkinCondition.webp"
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </article>

              <article className="pt-condition-card tms-conditions-card" role="listitem">
                <div className="pt-condition-text tms-conditions-copy">
                  <h3 className="pt-condition-title tms-conditions-card-title">Foot Pain and Discomfort</h3>
                  <p className="pt-condition-body tms-conditions-card-body">
                    Conditions affecting gait, including issues with arches, plantar fasciitis, and other foot-related pain.
                  </p>
                </div>
                <div className="pt-condition-media tms-conditions-media" aria-hidden="true">
                  <img
                    className="pt-condition-image tms-conditions-image"
                    src="/assets/images/Podology/FootPain.webp"
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </article>

            </div>
          </div>
        </section>

        {/* Right - Question  */}
        <section className="page-section podology-right st-right" aria-labelledby="podology-right-title">
          <div className="podology-right-inner st-right-inner">
            <h2 id="podology-right-title" className="podology-right-title st-right-title">
              Is Podology
              <br />
              Right for You?
            </h2>
            <div className="podology-right-copy st-right-copy">
              <p className="st-right-body">
                Podology can help anyone dealing with foot pain, nail disorders, skin issues, or mobility limitations related to foot mechanics. It is especially valuable for people who are on their feet for work, play sport, or have recurring foot problems.
              </p>
              <p className="st-right-body">
                Good outcomes come from addressing the underlying cause (for example footwear, pressure points, or gait patterns) and following the care plan between visits, including hygiene routines and footwear recommendations.
              </p>
              <p className="st-right-body">
                If you have diabetes, reduced sensation, poor circulation, or recurrent infections, early podology assessment is recommended to reduce complications and protect long-term mobility.
              </p>
            </div>
          </div>
        </section>
        
        {/* FAQ */}
                <section className="page-section podology-faq st-faq" aria-labelledby="podology-faq-title">
                  <div className="podology-faq-inner st-faq-inner">
                    <header className="podology-faq-header st-faq-header">
                      <h2 id="podology-faq-title" className="podology-faq-title st-faq-title">
                        Podology FAQ
                      </h2>
                    </header>
        
                    <div className="podology-faq-card st-faq-card" role="list" aria-label="Podology frequently asked questions">
                      {faqItems.map((item) => {
                        const isActive = activeFaqId === item.id;
                        const rowId = `podology-faq-${item.id}`;
                        const panelId = `podology-faq-panel-${item.id}`;
                        const maxHeight = isActive ? `${panelHeights[item.id] ?? 0}px` : '0px';
        
                        return (
                          <div key={item.id} className="st-faq-item" role="listitem">
                            <button
                              id={rowId}
                              type="button"
                              className="st-faq-trigger"
                              aria-expanded={isActive}
                              aria-controls={panelId}
                              onClick={() => setActiveFaqId((current) => (current === item.id ? null : item.id))}
                            >
                              <span className="st-faq-question">{item.question}</span>
                              <span className="st-faq-icon" aria-hidden="true">
                                {isActive ? '−' : '+'}
                              </span>
                            </button>
                            <div
                              id={panelId}
                              className="st-faq-panel"
                              data-open={isActive ? 'true' : 'false'}
                              role="region"
                              aria-labelledby={rowId}
                              aria-hidden={!isActive}
                              style={{ maxHeight }}
                            >
                              <div
                                className="st-faq-panel-inner"
                                ref={(node) => {
                                  panelContentRefs.current[item.id] = node;
                                }}
                              >
                                <p className="st-faq-answer">{item.answer}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </section>  



        <section className="page-section minimally-invasive-treatment-details" aria-labelledby="pod-details-title">
          <header className="minimally-invasive-treatment-details-header">
            <h2 id="pod-details-title" className="minimally-invasive-treatment-details-title">
              Podology: technique, benefits, steps, risks, and recovery
            </h2>
            <p className="minimally-invasive-treatment-details-intro">
              Podology is especially important for people with diabetes, neuropathy, circulation problems, or reduced sensation, where
              preventive care can protect skin and reduce complications.
            </p>
          </header>

          <div className="minimally-invasive-treatment-details-grid">
            <article className="minimally-invasive-treatment-card" aria-labelledby="pod-technique-title">
              <h3 id="pod-technique-title" className="minimally-invasive-treatment-card-title">
                Technique (how it works)
              </h3>
              <p className="minimally-invasive-treatment-card-body">
                Care combines clinical foot assessment with targeted treatment and prevention. This can include nail and skin care, pressure
                management strategies, footwear guidance, and gait‑related advice to reduce strain and improve comfort.
              </p>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="pod-benefits-title">
              <h3 id="pod-benefits-title" className="minimally-invasive-treatment-card-title">
                Medical benefits
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Medical benefits of podology">
                <li>Reduced foot pain and improved comfort with walking.</li>
                <li>Improved nail and skin health, reducing infection risk.</li>
                <li>Prevention of complications in higher‑risk patients (for example diabetes).</li>
                <li>Improved balance and confidence through footwear and gait guidance.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="pod-steps-title">
              <h3 id="pod-steps-title" className="minimally-invasive-treatment-card-title">
                Procedural steps
              </h3>
              <ol className="minimally-invasive-treatment-steps" aria-label="Podology visit steps">
                <li>History and screening for risk factors (diabetes, neuropathy, circulation issues).</li>
                <li>Foot examination including skin, nails, pressure areas, and sensation checks when relevant.</li>
                <li>Treatment such as nail care, callus management, or targeted advice.</li>
                <li>Footwear guidance and prevention plan.</li>
                <li>Follow‑up schedule for maintenance or progression.</li>
              </ol>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="pod-risks-title">
              <h3 id="pod-risks-title" className="minimally-invasive-treatment-card-title">
                Risks and complications
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Risks of podology">
                <li>Minor bleeding or tenderness after nail or skin care (usually short‑lived).</li>
                <li>Infection risk if wounds occur or aftercare is not followed (uncommon with proper care).</li>
                <li>Delayed healing in people with poor circulation or diabetes.</li>
                <li>Persistent symptoms if footwear and load factors are not addressed.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="pod-prep-title">
              <h3 id="pod-prep-title" className="minimally-invasive-treatment-card-title">
                Preparation and aftercare
              </h3>
              <ul className="minimally-invasive-treatment-list" aria-label="Preparation and aftercare for podology">
                <li>Bring a medication list and relevant medical history, especially diabetes care details.</li>
                <li>Bring your most commonly worn shoes for assessment.</li>
                <li>Follow skin and nail care instructions and inspect feet regularly if sensation is reduced.</li>
                <li>Seek prompt review for redness, swelling, increasing pain, or non‑healing wounds.</li>
              </ul>
            </article>

            <article className="minimally-invasive-treatment-card" aria-labelledby="pod-recovery-title">
              <h3 id="pod-recovery-title" className="minimally-invasive-treatment-card-title">
                Recovery timeline
              </h3>
              <p className="minimally-invasive-treatment-card-body">
                Many treatments improve comfort immediately. Longer‑term results depend on prevention strategies and footwear changes, with
                ongoing follow‑up for higher‑risk patients.
              </p>
            </article>
          </div>
        </section>

        <div id="treatments" className="treatments-page">
          <TreatmentsMain hideSurgical hideMinimallyInvasive />
        </div>
      </TreatmentsMain.PageMain>
    </div>
  );
};

export default PodologyPage;
