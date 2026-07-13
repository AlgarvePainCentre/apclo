import React from 'react';
import { TreatmentsMain } from '../../Treatments';
import { TreatmentBreadcrumb } from '../../components/detail/TreatmentBreadcrumb';
import { TreatmentDetailsGrid } from '../../components/detail/TreatmentDetailsGrid';
import { TreatmentFeature } from '../../components/detail/TreatmentFeature';
import { usePageMeta } from '../../components/detail/usePageMeta';
import ManagedEmbed from '../../../../components/ManagedEmbed';
import './SpinalFusion.css';

const SpinalFusionPage: React.FC = () => {
  usePageMeta({
    title: 'Spinal fusion in Portugal | Expert spine fusion surgeon care',
    description:
      'Considering spinal fusion in Portugal? Meet an experienced spine fusion surgeon, explore options, and arrange a consultation or imaging review today.',
  });

  return (
    <div className="psx-page spinal-fusion-page page-spinalfusion" id="psx-spinal-fusion">
      <header className="treatment-page-hero spinal-fusion-hero" aria-label="Spinal fusion hero section">
        <div
          className="psx-hero-backdrop"
          aria-hidden="true"
          style={{ backgroundImage: "url('/assets/images/learn/6-Trauma-Induced-Spinal-Fractures.webp')" }}
        />
        <div className="psx-hero-inner">
          <p className="psx-hero-eyebrow">Treatment</p>
          <h1 className="psx-hero-title">Spinal fusion</h1>
          <p className="psx-hero-subtitle">Surgical fusion stabilises the spine when joints or discs are severely damaged.</p>
        </div>
      </header>

      <TreatmentsMain.PageMain>
        <TreatmentBreadcrumb currentLabel="Spinal fusion" />

        <TreatmentFeature
          title="What patients can expect"
          titleId="sf-what-to-expect"
          imageSrc="/assets/images/learn/6-Trauma-Induced-Spinal-Fractures.webp"
          imageAlt="Illustration representing spinal injury and vertebral fracture patterns that may require stabilisation surgery such as spinal fusion (illustrative)."
          paragraphs={[
            'Spinal fusion joins two or more vertebrae so they heal as a single, stable unit. It is considered when pain and disability come from instability, severe degeneration, deformity, or nerve compression that also requires stabilisation.',
            'Before surgery you will have a structured assessment, imaging review, and a discussion of goals: pain relief, walking tolerance, nerve symptom improvement, and function. The team also reviews health factors that influence healing such as smoking status, nutrition, bone density, and diabetes control.',
            'After surgery, recovery includes early mobilisation, pain control, and a staged plan to build strength. Some patients use a brace depending on the level and technique. Follow‑up visits track healing and guide progression back to work and sport.',
          ]}
          primaryCta={{
            to: '/blog/spine-surgery/spinal-fusion',
            label: 'Learn More About Spinal Fusion',
            ariaLabel: 'Learn more about spinal fusion in our blog',
          }}
          secondaryCta={{ to: '/contact', label: 'Book an appointment' }}
          className="minimally-invasive-treatment-feature"
        />

        <section className="page-section sf-understanding" aria-labelledby="sf-understanding-title">
          <div className="sf-understanding-inner">
            <div className="sf-understanding-copy-block">
              <h2 id="sf-understanding-title" className="sf-understanding-title">
                Understanding Spinal Fusion
              </h2>
              <div className="sf-understanding-copy">
                <p className="sf-understanding-body">
                  Spinal fusion is a surgical procedure aimed at alleviating chronic pain in various areas of the body. This surgery is
                  typically recommended when the pain is related to spinal conditions that impact these regions, such as herniated discs or
                  degenerative disc disease.
                </p>
                <p className="sf-understanding-body">
                  The procedure involves joining two or more vertebrae in the spine to eliminate painful motion between them. By stabilising
                  the spine, spinal fusion helps reduce pain caused by movement and pressure on nerves.
                </p>
                <p className="sf-understanding-body">
                  Depending on the location of the issue—neck, lower back, etc.—the surgical approach might differ slightly, but the goal
                  remains the same: to stabilize the spine and reduce pain.
                </p>
              </div>
            </div>
            <div className="sf-understanding-video" aria-label="Spinal fusion video">
              <div className="sf-understanding-video-frame">
                <ManagedEmbed
                  className="sf-understanding-iframe"
                  src="https://www.youtube-nocookie.com/embed/F2czjQyJa7c?start=1"
                  title="Spinal Fusion, Our Treatments"
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  openHref="https://www.youtube.com/watch?v=F2czjQyJa7c"
                />
              </div>
            </div>
          </div>
        </section>

        <TreatmentDetailsGrid
          title="Spinal fusion: technique, benefits, steps, risks, and recovery"
          titleId="sf-details-title"
          cards={[
            {
              id: 'technique',
              title: 'Technique (how it works)',
              body:
                'Fusion uses implants (such as screws/rods) to stabilise the spine while bone graft promotes healing between vertebrae. In selected cases, minimally invasive techniques may reduce muscle disruption. Decompression for nerve pressure can be performed alongside fusion when indicated.',
            },
            {
              id: 'benefits',
              title: 'Medical benefits',
              list: {
                type: 'ul',
                ariaLabel: 'Medical benefits of spinal fusion',
                items: [
                  'Improves stability when painful motion or slippage is the source of symptoms.',
                  'Can protect nerves by maintaining alignment after decompression.',
                  'Supports correction of deformity and restoration of spinal balance in selected cases.',
                  'May reduce recurrent episodes when instability drives repeated flare‑ups.',
                ],
              },
            },
            {
              id: 'steps',
              title: 'Procedural steps',
              list: {
                type: 'ol',
                ariaLabel: 'Spinal fusion procedural steps',
                items: [
                  'Pre‑operative work‑up, imaging, and optimisation of medical risk factors.',
                  'Anaesthesia, positioning, and surgical approach selection based on level and diagnosis.',
                  'Decompression if needed, followed by implant placement for stabilisation.',
                  'Bone graft placement and alignment confirmation.',
                  'Wound closure, mobilisation, rehabilitation plan, and follow‑up imaging.',
                ],
              },
            },
            {
              id: 'risks',
              title: 'Risks and complications',
              list: {
                type: 'ul',
                ariaLabel: 'Risks of spinal fusion',
                items: [
                  'Infection, bleeding, and blood clots.',
                  'Nerve injury or persistent nerve symptoms.',
                  'Non‑union (failure of the bones to fuse), implant issues, or need for revision surgery.',
                  'Adjacent segment stress over time, especially with larger fusions.',
                ],
              },
            },
            {
              id: 'preparation',
              title: 'Preparation and aftercare',
              list: {
                type: 'ul',
                ariaLabel: 'Preparation and aftercare for spinal fusion',
                items: [
                  'Review medications and stop smoking if applicable to support bone healing.',
                  'Arrange home support and clarify safe movement guidance (lifting, bending, driving).',
                  'Follow wound care instructions and watch for signs of infection.',
                  'Adhere to physiotherapy milestones and gradual return‑to‑activity planning.',
                ],
              },
            },
            {
              id: 'recovery',
              title: 'Recovery timeline',
              body:
                'Hospital stay and recovery duration vary by procedure complexity and the number of levels fused. Bone healing continues for months. The team monitors progress and helps you build a safe pathway back to work, sport, and longer‑term spine health.',
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

export default SpinalFusionPage;
