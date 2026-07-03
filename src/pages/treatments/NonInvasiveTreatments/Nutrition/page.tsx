import React from 'react';
import { Link } from 'react-router-dom';
import { TreatmentsMain } from '../../Treatments';
import { initTreatmentStepsTimelines } from '../../animations/treatmentTimelineAnimations';
import { TreatmentBreadcrumb } from '../../components/detail/TreatmentBreadcrumb';
import './Nutrition.css';

const NutritionPage: React.FC = () => {

  const faqItems = React.useMemo(
      () => [
        {
          id: 'time',
          question: 'How long does a typical consultation last?',
          answer:
            'Initial consultations usually last about 60 minutes, while follow-up appointments may be shorter.',
        },
        {
          id: 'plan',
          question: 'Will I receive a meal plan?',
          answer:
            'Yes, a personalized meal plan will be provided based on your health goals and preferences.',
        },
        {
          id: 'sessions',
          question: 'How often should I have follow-up sessions?',
          answer:
            'Follow-up frequency depends on individual needs; many clients benefit from monthly or bi-monthly sessions.',
        },
        {
          id: 'conditions',
          question: 'Can nutrition consultations help with specific medical conditions?',
          answer:
            'Yes, our nutritionists are trained to provide support for various health conditions and can work alongside your healthcare team.',
        },
         {
          id: 'insurance',
          question: 'Is nutrition covered by insurance?',
          answer:
            'Coverage varies by plan; it’s advisable to check with your insurance provider for specifics regarding nutrition services.',
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
      if (!activeFaqId) return;
      if (typeof ResizeObserver === 'undefined') return;
      const el = panelContentRefs.current[activeFaqId];
      if (!el) return;
  
      const ro = new ResizeObserver(() => measurePanel(activeFaqId));
      ro.observe(el);
      return () => ro.disconnect();
    }, [activeFaqId, measurePanel]);
  


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

  React.useEffect(() => {
    const scope = document.getElementById('psx-nutrition') ?? document;
    return initTreatmentStepsTimelines(scope);
  }, []);

  const heroBackdropStyle: React.CSSProperties = {
    backgroundImage:
      "url('/assets/images/Nutrition/banner.webp')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className="psx-page nutrition-page page-nutrition" id="psx-nutrition">
      <header className="treatment-page-hero nutrition-hero" aria-label="Nutrition hero section">
        <div className="psx-hero-backdrop" aria-hidden="true" style={heroBackdropStyle} />
        <div className="psx-hero-inner">
          <p className="psx-hero-eyebrow">Treatment</p>
          <h1 className="psx-hero-title">Nutrition</h1>
          <p className="psx-hero-subtitle">
            Personalised nutrition supports healing, energy and long-term health goals.
          </p>
        </div>
      </header>

      <TreatmentsMain.PageMain>
        <TreatmentBreadcrumb currentLabel="Nutrition" />
        
        {/* Card Inicio*/}
        <section className="page-section treatments-feature non-invasive-treatment-feature" aria-labelledby="nut-what-to-expect">
          <div className="treatments-feature-inner">
            <div className="treatments-feature-media">
              <img
                className="treatments-feature-video"
                src="/assets/images/illustrative/Nutrition-min-1.webp"
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
            </div>
          </div>
        </section>
        
        {/* Understanding */}
        <section className="page-section nutrition-understanding st-understanding" aria-labelledby="nutrition-understanding-title">
                  <div className="nutrition-understanding-inner st-understanding-inner">
                    <h2 id="nutrition-understanding-title" className="nutrition-understanding-title st-understanding-title">
                      Understanding
                      <br />
                      Nutrition
                    </h2>
                    <div className="nutrition-understanding-copy st-understanding-copy">
                      <p className="st-understanding-paragraph">
                        Nutrition is the study of how food affects the body, influencing overall health, growth, and well-being. It encompasses a wide range of factors, including dietary habits, food choices, and nutritional requirements for different life stages.
                        <br /><br />
                        A qualified nutritionist assesses individual needs, preferences, and health goals to develop personalized dietary plans that promote optimal health. Understanding the role of macronutrients, micronutrients, and hydration is essential for achieving and maintaining a balanced diet.
                      </p>
                    </div>
                  </div>
                </section>
        
                {/* Processo */}
                <section className="page-section nutrition-process st-process" aria-labelledby="nutrition-process-title">
                  <div className="nutrition-process-inner st-process-inner">
                    <header className="nutrition-process-header st-process-header">
                      <h2 id="nutrition-process-title" className="nutrition-process-title st-process-title">
                        What this Process Looks Like
                      </h2>
                    </header>
        
                    <div className="nutrition-steps-grid st-steps-grid" role="list" aria-label="Nutrition process steps">
                      <article className="st-step-card" role="listitem" aria-label="Step 1 consultation and analysis">
                        <p className="st-step-number" aria-hidden="true">
                          1.
                        </p>
                        <h3 className="st-step-title">Consultation &amp; Analysis</h3>
                        <div className="st-step-divider" aria-hidden="true" />
                        <p className="st-step-body">
                          The process begins with an in-depth consultation where the nutritionist gathers information about your health history,
                          dietary habits, lifestyle, and specific health goals.
                        </p>
                      </article>
        
                      <article className="st-step-card" role="listitem" aria-label="Step 2 assessment and analysis">
                        <p className="st-step-number" aria-hidden="true">
                          2.
                        </p>
                        <h3 className="st-step-title">Assessment &amp; Analysis</h3>
                        <div className="st-step-divider" aria-hidden="true" />
                        <p className="st-step-body">
                          Based on the assessment, a tailored nutrition plan is developed, which includes recommended food choices, meal
                          timing, portion sizes, and strategies for incorporating healthy habits into daily life.
                        </p>
                      </article>
        
                      <article className="st-step-card" role="listitem" aria-label="Step 3 follow-up sessions">
                        <p className="st-step-number" aria-hidden="true">
                          3.
                        </p>
                        <h3 className="st-step-title">Follow-Up Sessions</h3>
                        <div className="st-step-divider" aria-hidden="true" />
                        <p className="st-step-body">
                          Regular follow-up appointments are scheduled to monitor progress, address challenges, and adjust the nutrition plan as
                          needed to ensure continuous improvement.
                        </p>
                      </article>
                    </div>
                  </div>
                </section>
                 
                {/* Espectativa */}
                <section className="page-section nutrition-aftercare st-aftercare" aria-labelledby="nutrition-aftercare-title">
                    <header className="nutrition-aftercare-header st-aftercare-header">
                      <h2 id="nutrition-aftercare-title" className="nutrition-aftercare-title st-aftercare-title">
                        What to Expect After Implementation
                      </h2>
                    </header>
        
                    <div className="nutrition-aftercare-layout st-aftercare-layout" aria-label="Post-procedure expectations">
                      <figure className="nutrition-aftercare-media st-aftercare-media" aria-hidden="true">
                        <div className="nutrition-aftercare-poster st-aftercare-poster">
                          <img
                          className="st-aftercare-image"
                          src="/assets/images/Nutrition/card.webp"
                          alt=""
                          decoding="async"
                          loading="lazy"
                        />
                        </div>
                      </figure>
        
                      <div className="nutrition-aftercare-panel st-aftercare-panel" role="list" aria-label="Post-procedure expectations">
                        <article className="st-aftercare-item" role="listitem">
                          <h3 className="st-aftercare-item-title">Increased Energy Levels</h3>
                          <p className="st-aftercare-item-body">
                            A balanced diet can lead to improved energy levels, allowing for better performance in daily activities and physical exercise.
                          </p>
                        </article>
                        <div className="st-aftercare-divider" aria-hidden="true" />
                        <article className="st-aftercare-item" role="listitem">
                          <h3 className="st-aftercare-item-title">Improved Digestion</h3>
                          <p className="st-aftercare-item-body">
                            Adopting healthier eating habits can enhance digestive health, reducing issues such as bloating and discomfort.
                          </p>
                        </article>
                        <div className="st-aftercare-divider" aria-hidden="true" />
                        <article className="st-aftercare-item" role="listitem">
                          <h3 className="st-aftercare-item-title">Weight Management</h3>
                          <p className="st-aftercare-item-body">
                            Effective nutritional strategies can support weight loss or maintenance, helping individuals achieve their desired body composition.
                          </p>
                        </article>
                      </div>
                    </div>
                </section>
                  
                {/* Beneficios */}  
                <section className="page-section nutrition-benefits st-benefits" aria-labelledby="nutrition-benefits-title">
                  <div className="nutrition-benefits-inner st-benefits-inner">
                    <header className="nutrition-benefits-header st-benefits-header">
                      <h2 id="nutrition-benefits-title" className="nutrition-benefits-title st-benefits-title">
                        Benefits of Nutrition
                      </h2>
                      <p className="st-benefits-subtitle">
                        Nutrition can significantly improve quality of life. 
                      </p>
                      <p className="ot-benefits-subtitle-secondary">Some of the main benefits include:</p>
                    </header>
        
                    <div className="rfa-benefits-grid" role="list" aria-label="Benefits of nutrition support">
                      <article className="rfa-benefit" role="listitem">
                        <h3 className="rfa-benefit-title">Personalized Guidance</h3>
                        <div className="rfa-benefit-divider" aria-hidden="true" />
                        <p className="rfa-benefit-body">
                          Nutritional consultations provide tailored advice that considers individual health needs and preferences, making dietary changes more effective.
                        </p>
                      </article>
        
                      <article className="rfa-benefit" role="listitem">
                        <h3 className="rfa-benefit-title">Support for Health Goals</h3>
                        <div className="rfa-benefit-divider" aria-hidden="true" />
                        <p className="rfa-benefit-body">
                          Whether it’s weight loss, muscle gain, or managing a medical condition, nutritionists provide targeted support to help you achieve your objectives.
                        </p>
                      </article>
        
                      <article className="rfa-benefit" role="listitem">
                        <h3 className="rfa-benefit-title">Improved Quality of Life</h3>
                        <div className="rfa-benefit-divider" aria-hidden="true" />
                        <p className="rfa-benefit-body">
                          Healthy eating habits contribute to enhanced physical and mental well-being, promoting a better quality of life.
                        </p>
                      </article>

                      <article className="rfa-benefit" role="listitem">
                        <h3 className="rfa-benefit-title">Knowledge &amp; Empowerment</h3>
                        <div className="rfa-benefit-divider" aria-hidden="true" />
                        <p className="rfa-benefit-body">
                          Clients gain valuable insights into nutrition and healthy eating practices, empowering them to make informed choices.
                        </p>
                      </article>

                      <article className="rfa-benefit" role="listitem">
                        <h3 className="rfa-benefit-title">Disease Prevention</h3>
                        <div className="rfa-benefit-divider" aria-hidden="true" />
                        <p className="rfa-benefit-body">
                          Proper nutrition plays a critical role in preventing chronic diseases such as diabetes, heart disease, and obesity.
                        </p>
                      </article>


                    </div>
                  </div>
                </section>
                
                {/* Conditions */}
                <section className="page-section nutrition-conditions st-conditions" aria-labelledby="nutrition-conditions-title">
                  <div className="pt-conditions-inner tms-conditions-inner">
                    <header className="pt-conditions-header tms-conditions-header">
                      <h2 id="nutrition-conditions-title" className="pt-conditions-title tms-conditions-title">
                        Conditions Treated with
                        <br />
                        Nutrition
                      </h2>
                    </header>
        
                    <div className="pt-conditions-grid tms-conditions-grid" role="list" aria-label="Conditions supported by nutrition">
                      <article className="pt-condition-card tms-conditions-card" role="listitem">
                        <div className="pt-condition-text tms-conditions-copy">
                          <h3 className="pt-condition-title tms-conditions-card-title">Nutritional Deficiencies</h3>
                          <p className="pt-condition-body tms-conditions-card-body">
                            Assessing and addressing deficiencies in essential nutrients to support overall health.
                          </p>
                        </div>
                        <div className="pt-condition-media tms-conditions-media" aria-hidden="true">
                          <img
                            className="pt-condition-image tms-conditions-image" 
                            src="/assets/images/Nutrition/NutritionalDeficiencies.webp"
                            alt=""
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      </article>
        
                      <article className="pt-condition-card tms-conditions-card" role="listitem">
                        <div className="pt-condition-text tms-conditions-copy">
                          <h3 className="pt-condition-title tms-conditions-card-title">Digestive Disorders</h3>
                          <p className="pt-condition-body tms-conditions-card-body">
                            Nutritional strategies for managing conditions like IBS, GERD, and other digestive issues.
                          </p>
                        </div>
                        <div className="pt-condition-media tms-conditions-media" aria-hidden="true">
                          <img
                            className="pt-condition-image tms-conditions-image"
                            src="/assets/images/Nutrition/DigestiveDisorders.webp"
                            alt=""
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      </article>
        
                      <article className="pt-condition-card tms-conditions-card" role="listitem">
                        <div className="pt-condition-text tms-conditions-copy">
                          <h3 className="pt-condition-title tms-conditions-card-title">Weight Management</h3>
                          <p className="pt-condition-body tms-conditions-card-body">
                            Strategies for weight loss, weight gain, or maintenance tailored to individual goals.
                          </p>
                        </div>
                        <div className="pt-condition-media tms-conditions-media" aria-hidden="true">
                          <img
                            className="pt-condition-image tms-conditions-image"
                            src="/assets/images/Nutrition/WeightManagement.webp"
                            alt=""
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      </article>
        
                    </div>
                  </div>
                </section>
                 
                {/* Question */}
                <section className="page-section nutrition-right st-right" aria-labelledby="nutrition-right-title">
                  <div className="nutrition-right-inner st-right-inner">
                    <h2 id="nutrition-right-title" className="nutrition-right-title st-right-title">
                      Is Nutrition
                      <br />
                      Right for You?
                    </h2>
                    <div className="nutrition-right-copy st-right-copy">
                      <p className="st-right-body">
                        Nutritional consultations are ideal for anyone seeking to improve eating habits, manage weight, or address specific health needs. With personalized guidance, they support healthier dietary choices for various goals.
                      </p>
                      <p className="st-right-body">
                        Success in nutrition requires a commitment to change, including a willingness to adjust one’s diet and embrace healthier habits. This proactive approach leads to lasting benefits.
                      </p>
                      <p className="st-right-body">
                        Nutritional support is suitable for all ages—from children to seniors—offering tailored advice to meet individual needs at any life stage.
                      </p>
                    </div>
                  </div>
                </section>
        
              <section className="page-section nutrition-faq st-faq" aria-labelledby="nutrition-faq-title">
          <div className="nutrition-faq-inner st-faq-inner">
            <header className="nutrition-faq-header st-faq-header">
              <h2 id="nutrition-faq-title" className="nutrition-faq-title st-faq-title">
                Nutrition FAQ
              </h2>
            </header>

            <div className="nutrition-faq-card st-faq-card" role="list" aria-label="Nutrition frequently asked questions">
              {faqItems.map((item) => {
                const isActive = activeFaqId === item.id;
                const rowId = `nutrition-faq-${item.id}`;
                const panelId = `nutrition-faq-panel-${item.id}`;
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





        {/* Sumario */}
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

        <div id="treatments" className="treatments-page">
          <TreatmentsMain hideSurgical hideMinimallyInvasive />
        </div>
      </TreatmentsMain.PageMain>
    </div>
  );
};

export default NutritionPage;
