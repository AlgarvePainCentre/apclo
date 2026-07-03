import React from 'react';
import { TreatmentsMain } from '../../Treatments';
import { TreatmentBreadcrumb } from '../../components/detail/TreatmentBreadcrumb';
import { TreatmentDetailsGrid } from '../../components/detail/TreatmentDetailsGrid';
import { TreatmentFeature } from '../../components/detail/TreatmentFeature';
import { usePageMeta } from '../../components/detail/usePageMeta';
import './DiscReplacement.css';

const DiscReplacementPage: React.FC = () => {
  usePageMeta({
    title: 'Disc replacement in Algarve | Motion‑preserving spine surgery',
    description:
      'Learn how cervical or lumbar disc replacement in Algarve can relieve pain, preserve motion, and start with a specialist consultation.',
  });

  return (
    <div className="psx-page disc-replacement-page page-discreplacement" id="psx-disc-replacement">
      <header className="treatment-page-hero disc-replacement-hero" aria-label="Disc replacement hero section">
        <div
          className="psx-hero-backdrop"
          aria-hidden="true"
          style={{ backgroundImage: "url('/assets/images/learn/4-disc-problems.webp')" }}
        />
        <div className="psx-hero-inner">
          <p className="psx-hero-eyebrow">Treatment</p>
          <h1 className="psx-hero-title">Disc replacement</h1>
          <p className="psx-hero-subtitle">Artificial disc replacement maintains motion while relieving pain from a damaged disc.</p>
        </div>
      </header>

      <TreatmentsMain.PageMain>
        <TreatmentBreadcrumb currentLabel="Disc replacement" />

        <TreatmentFeature
          title="What patients can expect"
          titleId="dr-what-to-expect"
          imageSrc="/assets/images/learn/4-disc-problems.webp"
          imageAlt="Illustration of spinal disc degeneration and disc-related nerve compression that may be treated with disc replacement in selected patients (illustrative)."
          paragraphs={[
            'Disc replacement (arthroplasty) is designed to relieve symptoms from a worn or damaged disc while preserving movement at that spinal level. It is most commonly performed in the neck (cervical) and, in selected cases, the lower back (lumbar).',
            'A careful selection process is essential. Your specialist reviews imaging and symptoms to confirm the disc is the primary source of pain and to assess alignment, facet joint health, and stability. Alternatives such as decompression alone or fusion may be more appropriate depending on your anatomy and diagnosis.',
            'After surgery, recovery focuses on walking, restoring comfortable movement, and gradually returning to normal activities. Post‑operative guidance includes wound care, posture and lifting advice, and a phased rehabilitation plan.',
          ]}
          primaryCta={{
            to: '/blog/spine-surgery/disc-replacement',
            label: 'Learn More About Disc Replacement',
            ariaLabel: 'Learn more about disc replacement in our blog',
          }}
          secondaryCta={{ to: '/contact', label: 'Book an appointment' }}
          className="minimally-invasive-treatment-feature"
        />

        <TreatmentDetailsGrid
          title="Disc replacement: technique, benefits, steps, risks, and recovery"
          titleId="dr-details-title"
          cards={[
            {
              id: 'technique',
              title: 'Technique (how it works)',
              body:
                'The damaged disc is removed and replaced with an artificial implant that aims to maintain controlled motion. When nerve compression is present, decompression is performed at the same time. The approach and implant choice depend on spinal level and patient anatomy.',
            },
            {
              id: 'benefits',
              title: 'Medical benefits',
              list: {
                type: 'ul',
                ariaLabel: 'Medical benefits of disc replacement',
                items: [
                  'Relieves pain and nerve symptoms caused by a symptomatic disc.',
                  'Preserves motion at the treated level in appropriately selected patients.',
                  'May reduce stress on neighbouring levels compared with fusion in some cases.',
                  'Supports earlier movement and rehabilitation where clinically appropriate.',
                ],
              },
            },
            {
              id: 'steps',
              title: 'Procedural steps',
              list: {
                type: 'ol',
                ariaLabel: 'Disc replacement procedural steps',
                items: [
                  'Pre‑operative assessment, imaging review, and suitability confirmation.',
                  'Anaesthesia and surgical approach to access the affected disc.',
                  'Disc removal and decompression of nerves where required.',
                  'Implant placement and alignment verification.',
                  'Closure, mobilisation plan, rehabilitation guidance, and follow‑up visits.',
                ],
              },
            },
            {
              id: 'risks',
              title: 'Risks and complications',
              list: {
                type: 'ul',
                ariaLabel: 'Risks of disc replacement',
                items: [
                  'Infection, bleeding, and anaesthetic risks.',
                  'Nerve injury or persistent symptoms.',
                  'Implant wear, displacement, or need for revision surgery (uncommon, but possible).',
                  'Adjacent segment symptoms can still occur over time.',
                ],
              },
            },
            {
              id: 'preparation',
              title: 'Preparation and aftercare',
              list: {
                type: 'ul',
                ariaLabel: 'Preparation and aftercare for disc replacement',
                items: [
                  'Bring imaging and a full medication list; discuss blood thinners and other risks early.',
                  'Follow pre‑op fasting and medication instructions; arrange transport and home support.',
                  'Follow wound care and activity guidance, including posture and lifting technique.',
                  'Progress rehabilitation and return‑to‑exercise planning with your clinical team.',
                ],
              },
            },
            {
              id: 'recovery',
              title: 'Recovery timeline',
              body:
                'Many patients walk on the day of surgery. Activity increases gradually over weeks with guidance. Return to work depends on symptom response, job demands, and your recovery milestones.',
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

export default DiscReplacementPage;
