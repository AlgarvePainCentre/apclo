import React from 'react';
import { Link } from 'react-router-dom';

type Card = {
  id: string;
  title: string;
  desc: string;
  href: string;
  imgJpg: string;
  imgWebp: string;
};

type DataLayerEvent = Record<string, unknown>;
type WindowWithDataLayer = Window & { dataLayer?: DataLayerEvent[] };

function pushAnalytics(event: string, detail: Record<string, unknown>) {
  try {
    const w = window as WindowWithDataLayer;
    if (!w.dataLayer) w.dataLayer = [];
    w.dataLayer.push({ event, ...detail });
  } catch {}
}

type LumbarInterventionsVariant = 'compact' | 'full';

const compactCards: Card[] = [
  {
    id: 'radiofrequency',
    title: 'Radiofrequency',
    desc: 'Thermal ablation to reduce pain from selected nerves and joints.',
    href: '/treatments/minimally-invasive-treatments/radiofrequency',
    imgJpg: '/assets/images/lumbar/Radiofrequency.webp',
    imgWebp: '/assets/images/lumbar/Radiofrequency.webp',
  },
  {
    id: 'cryoablation',
    title: 'Cryoablation',
    desc: 'Cold‑based nerve modulation to interrupt pain signalling.',
    href: '/treatments/minimally-invasive-treatments/cryoablation',
    imgJpg: '/assets/images/lumbar/Crioblation.webp',
    imgWebp: '/assets/images/lumbar/Crioblation.webp',
  },
  {
    id: 'corticosteroid',
    title: 'Corticosteroid Injection',
    desc: 'Targeted anti‑inflammatory injections for joint or nerve pain.',
    href: '/treatments/minimally-invasive-treatments/intra-articular-corticosteroids-injection',
    imgJpg: '/assets/images/lumbar/Corticosteroid.webp',
    imgWebp: '/assets/images/lumbar/Corticosteroid.webp',
  },
  {
    id: 'prp',
    title: 'Platelet Rich Plasma',
    desc: 'Biologic injections aimed at promoting tissue healing.',
    href: '/treatments/minimally-invasive-treatments/platelets-rich-plasma-injection',
    imgJpg: '/assets/images/lumbar/PlateletRichPlasma.webp',
    imgWebp: '/assets/images/lumbar/PlateletRichPlasma.webp',
  },
  {
    id: 'peripheral-nerve-block',
    title: 'Peripheral Nerve Block',
    desc: 'Local anaesthetic near nerves for diagnostic or therapeutic relief.',
    href: '/treatments/minimally-invasive-treatments/peripheral-nerve-block',
    imgJpg: '/assets/images/lumbar/PeripheralNerveBlocks.webp',
    imgWebp: '/assets/images/lumbar/PeripheralNerveBlocks.webp',
  },
  {
    id: 'pharma',
    title: 'Pharmacological Management',
    desc: 'Optimised medicines to control pain and improve function.',
    href: '/treatments/non-invasive-treatments/pharmacological-pain-management',
    imgJpg: '/assets/images/lumbar/Pharmacological.webp',
    imgWebp: '/assets/images/lumbar/Pharmacological.webp',
  },
];

const fullCards: Card[] = [
  compactCards[0],
  compactCards[1],
  {
    id: 'nucleoplasty',
    title: 'Nucleoplasty',
    desc: 'Minimally invasive disc decompression for selected cases.',
    href: '/treatments/minimally-invasive-treatments/nucleoplasty',
    imgJpg: '/assets/images/lumbar/Nucleoplasty.webp',
    imgWebp: '/assets/images/lumbar/Nucleoplasty.webp',
  },
  compactCards[2],
  compactCards[3],
  compactCards[4],
  {
    id: 'hydrodistention',
    title: 'Hydrodistention',
    desc: 'Fluid stretch of joint or nerve sheath to reduce adhesions.',
    href: '/treatments/minimally-invasive-treatments/hydrodistention',
    imgJpg: '/assets/images/lumbar/Hydrodistention.webp',
    imgWebp: '/assets/images/lumbar/Hydrodistention.webp',
  },
  {
    id: 'barbotage',
    title: 'Calcification Barbotage',
    desc: 'Needle lavage to break up and aspirate calcific deposits.',
    href: '/treatments/minimally-invasive-treatments/calcification-barbotage',
    imgJpg: '/assets/images/lumbar/CalcificationBarbotage.webp',
    imgWebp: '/assets/images/lumbar/CalcificationBarbotage.webp',
  },
  {
    id: 'botulinum',
    title: 'Botulinum Toxin Injection',
    desc: 'Targeted muscle relaxation for spasm or focal dystonia.',
    href: '/treatments/minimally-invasive-treatments/botulin-toxin-injection',
    imgJpg: '/assets/images/lumbar/Botulin.webp',
    imgWebp: '/assets/images/lumbar/Botulin.webp',
  },
  compactCards[5],
];

export default function LumbarInterventions({ variant = 'compact' }: { variant?: LumbarInterventionsVariant }) {
  const cards = variant === 'full' ? fullCards : compactCards;
  return (
    <div className="lumbar-cards" role="list" aria-label="Lumbar intervention options">
      {cards.map((c) => (
        <article key={c.id} className="lumbar-card" role="listitem">
          <Link
            to={c.href}
            className="lumbar-card-link"
            aria-label={`Explore ${c.title}`}
            onClick={() => pushAnalytics('lumbar_intervention_click', { intervention: c.id })}
          >
            <h3 className="lumbar-card-title">{c.title}</h3>
            <p className="lumbar-card-desc">{c.desc}</p>
            <picture>
              <source srcSet={c.imgWebp} type="image/webp" />
              <img
                className="lumbar-card-image"
                src={c.imgJpg}
              alt={`${c.title} illustration`}
                loading="lazy"
                decoding="async"
              />
            </picture>
          </Link>
        </article>
      ))}
    </div>
  );
}
