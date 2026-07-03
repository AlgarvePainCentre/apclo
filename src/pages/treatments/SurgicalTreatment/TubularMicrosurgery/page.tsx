import React from 'react';
import { TreatmentsMain } from '../../Treatments';
import { initTreatmentStepsTimelines } from '../../animations/treatmentTimelineAnimations';
import { TreatmentBreadcrumb } from '../../components/detail/TreatmentBreadcrumb';
import { TreatmentDetailsGrid } from '../../components/detail/TreatmentDetailsGrid';
import { TreatmentFaq } from '../../components/detail/TreatmentFaq';
import { TreatmentFeature } from '../../components/detail/TreatmentFeature';
import { usePageMeta } from '../../components/detail/usePageMeta';
import './TubularMicrosurgery.css';

const TubularMicrosurgeryPage: React.FC = () => {
  const faqItems = React.useMemo(
    () => [
      {
        id: 'conditions',
        question: 'What conditions can tubular microsurgery treat?',
        answer:
          'Tubular microsurgery is commonly used to treat conditions such as herniated discs, spinal stenosis, and other spinal disorders that cause chronic pain in the neck, lower back, and related areas.',
      },
      {
        id: 'duration',
        question: 'How long does the procedure take?',
        answer:
          'Procedure time varies depending on the condition treated and the level involved. Your doctor will review your imaging and explain the expected duration for your specific case.',
      },
      {
        id: 'recovery',
        question: 'How long does recovery take after tubular microsurgery?',
        answer:
          'Many patients return to light activities within days, but recovery depends on the diagnosis, the extent of decompression, and your baseline health. Your team will provide a personalised plan for returning to work and exercise.',
      },
      {
        id: 'painful',
        question: 'Is tubular microsurgery painful?',
        answer:
          'Some post‑operative soreness is expected, but pain is often less intense than with more invasive surgeries. Pain control strategies are discussed before and after the procedure.',
      },
      {
        id: 'physio',
        question: 'Will I need physical therapy after tubular microsurgery?',
        answer:
          'Rehabilitation is commonly recommended to restore strength, mobility, and confidence with movement. The exact program depends on your symptoms and functional goals.',
      },
      {
        id: 'same-day',
        question: 'Can I go home the same day after surgery?',
        answer:
          'Many patients are discharged the same day or the day after, depending on your procedure, pain control, mobility, and medical considerations. Your surgeon will confirm what is appropriate for you.',
      },
      {
        id: 'risks',
        question: 'Are there risks associated with tubular microsurgery?',
        answer:
          'All surgery carries risks. These may include bleeding, infection, nerve irritation or injury, and recurrence of symptoms. Your team will explain your personalised risk profile.',
      },
      {
        id: 'prepare',
        question: 'How can I prepare for tubular microsurgery?',
        answer:
          'Preparation typically includes a review of medications, imaging, and health history, plus specific pre‑op instructions such as fasting, transport planning, and post‑op support at home.',
      },
    ],
    [],
  );

  usePageMeta({
    title: 'Tubular microsurgery in Algarve | Minimally invasive spine care',
    description:
      'Learn about minimally invasive tubular microsurgery in Algarve. Reduce nerve pain, protect mobility, and review your scans with our specialist team.',
  });

  React.useEffect(() => {
    const scope = document.getElementById('psx-tubular-microsurgery') ?? document;
    return initTreatmentStepsTimelines(scope);
  }, []);

  return (
    <div className="psx-page tubular-microsurgery-page page-tubularmicrosurgery" id="psx-tubular-microsurgery">
      <header className="treatment-page-hero tubular-microsurgery-hero" aria-label="Tubular microsurgery hero section">
        <div
          className="psx-hero-backdrop"
          aria-hidden="true"
          style={{ backgroundImage: "url('/assets/images/learn/6-Chronic-Back-Pain.webp')" }}
        />
        <div className="psx-hero-inner">
          <p className="psx-hero-eyebrow">Treatment</p>
          <h1 className="psx-hero-title">Tubular microsurgery</h1>
          <p className="psx-hero-subtitle">Minimally invasive spine surgery using tubular retractors to relieve nerve compression.</p>
        </div>
      </header>

      <TreatmentsMain.PageMain>
        <TreatmentBreadcrumb currentLabel="Tubular microsurgery" />

        <TreatmentFeature
          title="What patients can expect"
          titleId="tms-what-to-expect"
          imageSrc="/assets/images/learn/6-Chronic-Back-Pain.webp"
          imageAlt="Patient holding the lower back, representing chronic lumbar spine pain and nerve irritation addressed by minimally invasive spine surgery (illustrative)."
          paragraphs={[
            'Tubular microsurgery is a minimally invasive technique that reaches the spine through a small incision using a tubular retractor. By gently separating muscle fibres instead of stripping them away, it aims to reduce tissue trauma while allowing precise decompression of irritated nerves.',
            'You will typically have a detailed review of symptoms and imaging (MRI/CT) to confirm the pain generator. On the day of surgery, the team explains the plan, anaesthesia options, and the immediate post‑operative milestones such as walking, pain control, and discharge criteria.',
            'Recovery focuses on safe mobility, wound care, and progressive return to activity. Rehabilitation may include walking progression and structured physiotherapy to rebuild strength and confidence in movement.',
          ]}
          primaryCta={{
            to: '/blog/spine-surgery/tubular-microsurgery',
            label: 'Learn More About Tubular Microsurgery',
            ariaLabel: 'Learn more about tubular microsurgery in our blog',
          }}
          secondaryCta={{ to: '/contact', label: 'Book an appointment' }}
          className="minimally-invasive-treatment-feature"
        />

        <section className="page-section tms-overview" aria-labelledby="tms-understanding-title">
          <div className="tms-overview-inner">
            <div className="tms-understanding-top">
              <h2 id="tms-understanding-title" className="tms-understanding-title">
                Understanding Tubular Microsurgery
              </h2>
              <div className="tms-understanding-copy">
                <p className="tms-understanding-paragraph">
                  Tubular microsurgery is a minimally invasive surgical technique used to treat various conditions affecting the spine and
                  surrounding tissues. This advanced approach is designed to alleviate chronic pain and discomfort in areas such as the head,
                  cervical spine (neck), lumbar spine (lower back), shoulders, hands, hips, and knees.
                </p>
                <p className="tms-understanding-paragraph">
                  Using specialized instruments, tubular microsurgery allows surgeons to access the targeted area through small incisions,
                  minimizing damage to surrounding tissues and promoting faster recovery. This technique is often employed for procedures like
                  disc herniation repair, spinal decompression, and other conditions that can cause pain and affect mobility.
                </p>
                <p className="tms-understanding-paragraph">Here is how the procedure is done:</p>
              </div>
            </div>
            <div className="tms-steps-grid" role="list" aria-label="Tubular microsurgery procedural overview">
              <article className="tms-step-card" role="listitem" aria-label="Step 1 small incision">
                <p className="tms-step-number" aria-hidden="true">
                  1.
                </p>
                <h3 className="tms-step-title">
                  Small Incision
                </h3>
                <div className="tms-step-divider" aria-hidden="true" />
                <p className="tms-step-body">The surgeon makes a small incision to access the affected area.</p>
              </article>

              <article className="tms-step-card" role="listitem" aria-label="Step 2 tubular retractor">
                <p className="tms-step-number" aria-hidden="true">
                  2.
                </p>
                <h3 className="tms-step-title">
                  Tubular Retractor
                </h3>
                <div className="tms-step-divider" aria-hidden="true" />
                <p className="tms-step-body">
                  A tubular retractor is inserted, which gently expands the muscles and tissues, minimizing damage.
                </p>
              </article>

              <article className="tms-step-card" role="listitem" aria-label="Step 3 microscope operation">
                <p className="tms-step-number" aria-hidden="true">
                  3.
                </p>
                <h3 className="tms-step-title">
                  Microscope Operation
                </h3>
                <div className="tms-step-divider" aria-hidden="true" />
                <p className="tms-step-body">
                  A microscope is used to ensure precision, allowing for delicate movements without large incisions.
                </p>
              </article>

              <article className="tms-step-card" role="listitem" aria-label="Step 4 removal or repair">
                <p className="tms-step-number" aria-hidden="true">
                  4.
                </p>
                <h3 className="tms-step-title">
                  Removal or Repair
                </h3>
                <div className="tms-step-divider" aria-hidden="true" />
                <p className="tms-step-body">
                  The damaged structures, such as herniated discs or bone spurs, are removed or repaired.
                </p>
              </article>

              <article className="tms-step-card" role="listitem" aria-label="Step 5 closure and recovery">
                <p className="tms-step-number" aria-hidden="true">
                  5.
                </p>
                <h3 className="tms-step-title">
                  Closure &amp; Recovery
                </h3>
                <div className="tms-step-divider" aria-hidden="true" />
                <p className="tms-step-body">
                  Once the procedure is completed, the incision is closed, and recovery begins, typically faster than traditional surgeries.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="page-section tms-aftercare" aria-labelledby="tms-aftercare-title">
          <header className="tms-aftercare-header">
            <h2 id="tms-aftercare-title" className="tms-aftercare-title">
              What to Expect After the Procedure
            </h2>
            <p className="tms-aftercare-subtitle">
              Recovery from tubular microsurgery is generally quicker than traditional open surgery thanks to the minimally invasive
              approach.
            </p>
            <p className="tms-aftercare-subtitle">Here&apos;s a breakdown of what you can expect:</p>
          </header>

          <div className="tms-aftercare-layout" aria-label="Post-procedure expectations">
            <figure className="tms-aftercare-media" aria-hidden="true">
              <div className="tms-aftercare-poster">
                <img
                  className="tms-aftercare-image"
                  src="/assets/images/learn/DSC07089.webp"
                  alt=""
                  decoding="async"
                  loading="lazy"
                />
              </div>
            </figure>

            <div className="cryo-aftercare-panel" role="list" aria-label="Post-procedure expectations">
              <article className="tms-aftercare-item" role="listitem">
                <h3 className="tms-aftercare-item-title">Recovery Time</h3>
                <p className="tms-aftercare-item-body">
                  Many patients are able to go home the same day or the day after surgery. While some discomfort is expected, recovery is
                  often faster than with traditional open procedures.
                </p>
              </article>
              <div className="tms-aftercare-divider" aria-hidden="true" />
              <article className="tms-aftercare-item" role="listitem">
                <h3 className="tms-aftercare-item-title">Pain Relief</h3>
                <p className="tms-aftercare-item-body">
                  Some soreness is normal after surgery, but pain is often less intense compared to more invasive techniques because there
                  is less disruption to surrounding tissues.
                </p>
              </article>
              <div className="tms-aftercare-divider" aria-hidden="true" />
              <article className="tms-aftercare-item" role="listitem">
                <h3 className="tms-aftercare-item-title">Gradual Return to Movement</h3>
                <p className="tms-aftercare-item-body">
                  Patients are usually encouraged to start light activity soon after the procedure, with guidance on when to progress back
                  to normal activities, work, and exercise.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="page-section tms-benefits" aria-labelledby="tms-benefits-title">
          <div className="cryo-benefits-inner">
            <header className="cryo-benefits-header">
              <h2 id="tms-benefits-title" className="cryo-benefits-title">
                Benefits of Tubular Microsurgery
              </h2>
              <p className="cryo-benefits-subtitle">
                Tubular microsurgery offers several advantages over traditional surgical methods, including:
              </p>
            </header>

            <div className="cryo-benefits-grid" role="list" aria-label="Benefits of tubular microsurgery">
              <article className="cryo-benefit-card" role="listitem">
                <h3 className="cryo-benefit-title">Less Invasive Approach</h3>
                <div className="cryo-benefit-divider" aria-hidden="true" />
                <p className="cryo-benefit-body">
                  Smaller incisions mean reduced tissue damage, less scarring, and a lower risk of complications.
                </p>
              </article>

              <article className="cryo-benefit-card" role="listitem">
                <h3 className="cryo-benefit-title">Quicker Recovery Times</h3>
                <div className="cryo-benefit-divider" aria-hidden="true" />
                <p className="cryo-benefit-body">
                  Due to the less invasive nature of the surgery, patients often return to light activities in just a few days.
                </p>
              </article>

              <article className="cryo-benefit-card" role="listitem">
                <h3 className="cryo-benefit-title">Reduced Post-surgery Pain</h3>
                <div className="cryo-benefit-divider" aria-hidden="true" />
                <p className="cryo-benefit-body">
                  Less trauma to the surrounding tissues leads to reduced pain levels after the procedure.
                </p>
              </article>

              <article className="cryo-benefit-card" role="listitem">
                <h3 className="cryo-benefit-title">Lower Infection Risk</h3>
                <div className="cryo-benefit-divider" aria-hidden="true" />
                <p className="cryo-benefit-body">
                  The small incisions reduce the risk of infection compared to traditional open surgeries.
                </p>
              </article>

              <article className="cryo-benefit-card" role="listitem">
                <h3 className="cryo-benefit-title">Improved Mobility</h3>
                <div className="cryo-benefit-divider" aria-hidden="true" />
                <p className="cryo-benefit-body">
                  Precision allows for better long-term outcomes, restoring mobility and reducing complications.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="page-section tms-conditions" aria-labelledby="tms-conditions-title">
          <div className="tms-conditions-inner">
            <header className="tms-conditions-header">
              <h2 id="tms-conditions-title" className="tms-conditions-title">
                Conditions Treated with Tubular Microsurgery
              </h2>
            </header>

            <div className="tms-conditions-grid" role="list" aria-label="Conditions treated with tubular microsurgery">
              <article className="tms-conditions-card" role="listitem">
                <div className="tms-conditions-copy">
                  <h3 className="tms-conditions-card-title">Herniated Discs</h3>
                  <p className="tms-conditions-card-body">
                    A common cause of pain, herniated discs can compress nerves, causing discomfort and mobility issues.
                  </p>
                </div>
                <div className="tms-conditions-media" aria-hidden="true">
                  <img className="tms-conditions-image" src="/assets/images/learn/6-Chronic-Back-Pain.webp" alt="" loading="lazy" decoding="async" />
                </div>
              </article>

              <article className="tms-conditions-card" role="listitem">
                <div className="tms-conditions-copy">
                  <h3 className="tms-conditions-card-title">Spinal Stenosis</h3>
                  <p className="tms-conditions-card-body">
                    This condition involves the narrowing of the spinal canal, leading to nerve compression and pain.
                  </p>
                </div>
                <div className="tms-conditions-media" aria-hidden="true">
                  <img className="tms-conditions-image" src="/assets/images/learn/DSC06831.webp" alt="" loading="lazy" decoding="async" />
                </div>
              </article>

              <article className="tms-conditions-card" role="listitem">
                <div className="tms-conditions-copy">
                  <h3 className="tms-conditions-card-title">Degenerative Disc Disease</h3>
                  <p className="tms-conditions-card-body">
                    Over time, discs can wear down, causing chronic pain and limiting mobility, which tubular microsurgery can address.
                  </p>
                </div>
                <div className="tms-conditions-media" aria-hidden="true">
                  <img className="tms-conditions-image" src="/assets/images/learn/DSC07395.webp" alt="" loading="lazy" decoding="async" />
                </div>
              </article>

              <article className="tms-conditions-card" role="listitem">
                <div className="tms-conditions-copy">
                  <h3 className="tms-conditions-card-title">Bone Spurs</h3>
                  <p className="tms-conditions-card-body">
                    These bony growths can irritate nearby nerves and tissues, leading to discomfort that this procedure can help alleviate.
                  </p>
                </div>
                <div className="tms-conditions-media" aria-hidden="true">
                  <img className="tms-conditions-image" src="/assets/images/learn/DSC07729.webp" alt="" loading="lazy" decoding="async" />
                </div>
              </article>
            </div>
          </div>
        </section>

        <TreatmentFaq title="Tubular Microsurgery FAQ" titleId="tms-faq-title" items={faqItems} />

        <TreatmentDetailsGrid
          title="Tubular microsurgery: technique, benefits, steps, risks, and recovery"
          titleId="tms-details-title"
          cards={[
            {
              id: 'technique',
              title: 'Technique (how it works)',
              body:
                'Through a small incision, dilators create a working corridor and a tubular retractor maintains access. Using magnification and specialised instruments, the surgeon decompresses the nerve by removing the compressing structure (for example, disc material or bone) while preserving stabilising tissues where possible.',
            },
            {
              id: 'benefits',
              title: 'Medical benefits',
              list: {
                type: 'ul',
                ariaLabel: 'Medical benefits of tubular microsurgery',
                items: [
                  'Targets nerve compression to reduce leg/arm pain and improve function.',
                  'Smaller incision and less muscle disruption than traditional open approaches.',
                  'Often supports earlier mobilisation and a faster return to daily activities.',
                  'Preserves stabilising structures when clinically appropriate.',
                ],
              },
            },
            {
              id: 'steps',
              title: 'Procedural steps',
              list: {
                type: 'ol',
                ariaLabel: 'Tubular microsurgery procedural steps',
                items: [
                  'Pre‑operative planning and imaging review to confirm surgical level and target.',
                  'Anaesthesia and positioning to protect nerves and pressure points.',
                  'Small incision and progressive dilation to place the tubular retractor.',
                  'Microsurgical decompression of the nerve/spinal canal as indicated.',
                  'Closure, early mobilisation, discharge planning, and follow‑up scheduling.',
                ],
              },
            },
            {
              id: 'risks',
              title: 'Risks and complications',
              body: 'All surgery carries risk. Your team will explain your personalised risk profile based on diagnosis, anatomy, and health factors.',
              list: {
                type: 'ul',
                ariaLabel: 'Risks of tubular microsurgery',
                items: [
                  'Bleeding, infection, wound healing issues.',
                  'Nerve irritation or injury, numbness, or weakness (rare but important).',
                  'Dural tear and cerebrospinal fluid leak.',
                  'Recurrence of symptoms or need for further treatment.',
                ],
              },
            },
            {
              id: 'preparation',
              title: 'Preparation and aftercare',
              list: {
                type: 'ul',
                ariaLabel: 'Preparation and aftercare for tubular microsurgery',
                items: [
                  'Bring imaging and a medication list; discuss blood thinners and diabetes control early.',
                  'Follow fasting and pre‑op instructions and arrange transport/support for discharge.',
                  'Keep the wound clean and dry as advised; monitor for fever, redness, or drainage.',
                  'Walk regularly and follow activity restrictions and physiotherapy guidance.',
                ],
              },
            },
            {
              id: 'recovery',
              title: 'Recovery timeline',
              body:
                'Many patients mobilise the same day. Pain often improves over weeks as inflammation settles. Return to work and sport depends on the procedure performed, job demands, and rehabilitation progress.',
            },
          ]}
          className="minimally-invasive-treatment-details"
        />

        <div id="treatments" className="treatments-page">
          <TreatmentsMain hideMinimallyInvasive hideNonInvasive />
        </div>
      </TreatmentsMain.PageMain>
    </div>
  );
};

export default TubularMicrosurgeryPage;
