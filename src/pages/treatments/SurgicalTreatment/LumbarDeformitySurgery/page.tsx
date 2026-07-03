import React from 'react';
import { TreatmentsMain } from '../../Treatments';
import { TreatmentBreadcrumb } from '../../components/detail/TreatmentBreadcrumb';
import { TreatmentDetailsGrid } from '../../components/detail/TreatmentDetailsGrid';
import { TreatmentFeature } from '../../components/detail/TreatmentFeature';
import { usePageMeta } from '../../components/detail/usePageMeta';
import './LumbarDeformitySurgery.css';

const LumbarDeformitySurgeryPage: React.FC = () => {
  usePageMeta({
    title: 'Lumbar deformity surgery in Algarve | Complex spine realignment',
    description:
      'Explore lumbar deformity surgery in Algarve for scoliosis or flat‑back. Learn options, recovery, and book a detailed spine assessment today.',
  });

  return (
    <div className="psx-page lumbar-deformity-surgery-page page-lumbardeformitysurgery" id="psx-lumbar-deformity-surgery">
      <header className="treatment-page-hero lumbar-deformity-surgery-hero" aria-label="Lumbar deformity surgery hero section">
        <div
          className="psx-hero-backdrop"
          aria-hidden="true"
          style={{ backgroundImage: "url('/assets/images/learn/3-improper-posture.webp')" }}
        />
        <div className="psx-hero-inner">
          <p className="psx-hero-eyebrow">Treatment</p>
          <h1 className="psx-hero-title">Lumbar deformity surgery</h1>
          <p className="psx-hero-subtitle">Corrective lumbar surgery realigns the spine to reduce pain and improve posture.</p>
        </div>
      </header>

      <TreatmentsMain.PageMain>
        <TreatmentBreadcrumb currentLabel="Lumbar deformity surgery" />

        <TreatmentFeature
          title="What patients can expect"
          titleId="lds-what-to-expect"
          imageSrc="/assets/images/learn/3-improper-posture.webp"
          imageAlt="Illustration representing spinal alignment and posture imbalance in lumbar deformity conditions such as scoliosis or flat-back (illustrative)."
          paragraphs={[
            'Lumbar deformity surgery is planned surgery to correct abnormal curvature or alignment of the lower spine, such as degenerative scoliosis or flat‑back. The goal is to improve balance and posture, reduce pain, and relieve nerve compression when present.',
            'Because deformity care is complex, assessment includes standing full‑spine imaging, neurological examination, and a review of how symptoms affect walking, sitting, and daily activities. Your surgeon explains the recommended levels to treat, the expected change in alignment, and the recovery milestones.',
            'Preparation and aftercare are essential. Many patients benefit from prehabilitation (strength and conditioning), medication review, and planning for home support. Recovery is progressive and closely monitored to support safe healing and return to function.',
          ]}
          primaryCta={{
            to: '/blog/spine-surgery/lumbar-deformity-surgery',
            label: 'Learn More About Lumbar Deformity Surgery',
            ariaLabel: 'Learn more about lumbar deformity surgery in our blog',
          }}
          secondaryCta={{ to: '/contact', label: 'Book an appointment' }}
          className="minimally-invasive-treatment-feature"
        />

        <TreatmentDetailsGrid
          title="Lumbar deformity surgery: technique, benefits, steps, risks, and recovery"
          titleId="lds-details-title"
          cards={[
            {
              id: 'technique',
              title: 'Technique (how it works)',
              body:
                'Surgery aims to restore spinal balance by correcting curvature and stabilising the spine. This may include decompression of nerves, fusion across multiple levels, and corrective techniques (such as osteotomies) where required. Implant systems are used to hold alignment while fusion heals.',
            },
            {
              id: 'benefits',
              title: 'Medical benefits',
              list: {
                type: 'ul',
                ariaLabel: 'Medical benefits of lumbar deformity surgery',
                items: [
                  'Improves posture, balance, and walking tolerance by restoring alignment.',
                  'Relieves leg pain or numbness when nerve compression is addressed.',
                  'Reduces pain linked to progressive deformity and instability.',
                  'Supports long‑term function when a conservative plan no longer controls symptoms.',
                ],
              },
            },
            {
              id: 'steps',
              title: 'Procedural steps',
              list: {
                type: 'ol',
                ariaLabel: 'Lumbar deformity surgery procedural steps',
                items: [
                  'Detailed planning with full‑spine imaging and alignment measurements.',
                  'Medical optimisation and preparation, including bone health and nutrition review.',
                  'Surgical correction with decompression, alignment restoration, and stabilisation.',
                  'Post‑operative mobilisation, rehabilitation planning, and staged activity progression.',
                  'Ongoing follow‑up with imaging and clinical milestones to monitor healing.',
                ],
              },
            },
            {
              id: 'risks',
              title: 'Risks and complications',
              list: {
                type: 'ul',
                ariaLabel: 'Risks of lumbar deformity surgery',
                items: [
                  'Infection, bleeding, blood clots, and medical complications related to longer surgery.',
                  'Nerve injury or persistent symptoms.',
                  'Non‑union, implant issues, or the need for revision surgery.',
                  'Adjacent segment stress over time and junctional problems in long constructs.',
                ],
              },
            },
            {
              id: 'preparation',
              title: 'Preparation and aftercare',
              list: {
                type: 'ul',
                ariaLabel: 'Preparation and aftercare for lumbar deformity surgery',
                items: [
                  'Stop smoking and optimise bone health when needed to support fusion.',
                  'Plan home support, mobility aids, and safe movement strategy for the first weeks.',
                  'Follow wound care instructions and attend scheduled follow‑up visits.',
                  'Commit to rehabilitation progression, including walking and strengthening milestones.',
                ],
              },
            },
            {
              id: 'recovery',
              title: 'Recovery timeline',
              body:
                'Recovery varies by complexity and the number of levels treated. Early goals are pain control and safe walking. Over months, rehabilitation supports endurance, posture, and strength while fusion consolidates.',
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

export default LumbarDeformitySurgeryPage;
