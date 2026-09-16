import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './speciality-template.css';

/*
 * Standalone PREVIEW of the uniform speciality template (does not touch the live
 * speciality pages). Populated with real "Head pain" content so the structure can
 * be reviewed with the client. Every speciality would fill the same slots:
 *   discipline, title, heroImage, overview[], patterns[], treatments[], story, citations[]
 */
const DEMO = {
  discipline: 'Pain Medicine',
  title: 'Head pain',
  heroImage: '/assets/images/Hero/HeadPain.webp',
  heroSubtitle:
    'Headache and facial pain syndromes can be disabling — but many respond well to targeted diagnosis and treatment.',
  overview: [
    'Head pain can include migraine, tension-type headache, cluster headache and other primary headache disorders. It may also be secondary to conditions affecting the neck, jaw, sinuses or nerves.',
    'We focus on the pattern: onset, frequency, triggers, associated symptoms and any red flags. This helps match you to the most appropriate evidence-based pathway.',
    'Treatment may include lifestyle and trigger strategies, acute and preventive medicines when indicated, rehabilitation for cervicogenic contributors, and targeted procedures for selected headache syndromes.',
  ],
  patterns: [
    {
      id: 'migraine',
      label: 'Migraine-type headache',
      description:
        'Moderate to severe headache often with nausea, sensitivity to light or sound, and activity intolerance. We consider acute and preventive strategies based on frequency and disability.',
    },
    {
      id: 'tension',
      label: 'Tension-type headache',
      description:
        'A pressure or tight-band sensation often linked to stress, sleep and posture. Management commonly includes education, stress/sleep strategies and rehabilitation.',
    },
    {
      id: 'cluster',
      label: 'Cluster-type headache',
      description:
        'Severe one-sided attacks often around the eye, sometimes with tearing or nasal symptoms. Prompt recognition matches acute and preventive treatment.',
    },
    {
      id: 'neck-related',
      label: 'Neck-related headache features',
      description:
        'Headache that overlaps with neck pain or stiffness may suggest a cervicogenic contribution. Careful assessment guides appropriate rehabilitation or interventions.',
    },
  ],
  treatments: [
    { name: 'Botulinum toxin injection', kind: 'Minimally invasive', to: '/treatments/minimally-invasive-treatments/botulin-toxin-injection', img: '/assets/images/Hero/BotulinToxinInjection.webp' },
    { name: 'Peripheral nerve block', kind: 'Minimally invasive', to: '/treatments/minimally-invasive-treatments/peripheral-nerve-block', img: '/assets/images/Hero/PeripheralNerveBlocks.webp' },
    { name: 'Radiofrequency', kind: 'Minimally invasive', to: '/treatments/minimally-invasive-treatments/radiofrequency', img: '/assets/images/Hero/RadiofrequencyAblation.webp' },
    { name: 'Pharmacological pain management', kind: 'Non-invasive', to: '/treatments/non-invasive-treatments/pharmacological-pain-management', img: '/assets/images/Hero/PharmacologicalPainManagement.webp' },
    { name: 'Physiotherapy', kind: 'Non-invasive', to: '/treatments/non-invasive-treatments/physiotherapy', img: '/assets/images/Hero/Physiotherapy.webp' },
    { name: 'Psychology', kind: 'Non-invasive', to: '/treatments/non-invasive-treatments/psychology', img: '/assets/images/Hero/Psychology.webp' },
  ],
  guidance: [
    'Keep a simple headache diary for 2–4 weeks (frequency, duration, triggers and medication use). This improves diagnostic accuracy and treatment selection.',
    'Seek urgent medical attention for a “worst-ever” or sudden thunderclap headache, new neurological symptoms, or headache with fever and neck stiffness.',
  ],
  story: {
    quote:
      'After years of frequent migraines, a clear plan finally gave me control back. I know what to do and the attacks are far less frequent.',
    name: 'Patient story',
    detail: 'Chronic migraine · Pain Medicine',
  },
  citations: [
    { label: 'IHS — International Classification of Headache Disorders (ICHD-3)', url: 'https://ichd-3.org/' },
    { label: 'NICE — Headaches in over 12s (CG150)', url: 'https://www.nice.org.uk/guidance/cg150' },
  ],
};

export default function SpecialityTemplate() {
  const navigate = useNavigate();
  const d = DEMO;

  useEffect(() => {
    document.title = 'Speciality template (preview) | Algarve Pain Centre';
  }, []);

  return (
    <div className="spec-tpl">
      {/* 1 · Hero */}
      <header className="stpl-hero" aria-label="Speciality hero">
        <div className="stpl-hero-media" aria-hidden="true">
          <img src={d.heroImage} alt="" />
        </div>
        <div className="stpl-hero-inner">
          <p className="stpl-eyebrow stpl-eyebrow--onmedia">{d.discipline} · Speciality</p>
          <h1>{d.title}</h1>
          <p className="stpl-hero-sub">{d.heroSubtitle}</p>
          <div className="stpl-hero-actions">
            <button type="button" className="stpl-btn stpl-btn--primary" onClick={() => navigate('/contact')}>
              Book an appointment
            </button>
            <a href="#treat" className="stpl-btn stpl-btn--ghost">How we treat it</a>
          </div>
        </div>
      </header>

      {/* 2 · Overview */}
      <section className="stpl-block stpl-overview">
        <div className="stpl-head">
          <p className="stpl-eyebrow">Overview</p>
          <h2 className="stpl-h2">Understanding {d.title.toLowerCase()}</h2>
        </div>
        <div className="stpl-overview-body">
          {d.overview.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>

      {/* 3 · How it can present */}
      <section className="stpl-block">
        <div className="stpl-head">
          <p className="stpl-eyebrow">How it can present</p>
          <h2 className="stpl-h2">Common patterns</h2>
          <p className="stpl-lead">Recognising the pattern helps us match you to the right pathway.</p>
        </div>
        <div className="stpl-patterns">
          {d.patterns.map((p) => (
            <article key={p.id} className="stpl-pattern">
              <h3>{p.label}</h3>
              <p>{p.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* 4 · How we treat it → bridge to Treatments */}
      <section className="stpl-block stpl-treat" id="treat">
        <div className="stpl-head">
          <p className="stpl-eyebrow stpl-eyebrow--treat">How we treat it</p>
          <h2 className="stpl-h2">Related treatments</h2>
          <p className="stpl-lead">
            Your plan is personalised. These are treatments we commonly draw on for {d.title.toLowerCase()}.
          </p>
        </div>
        <div className="stpl-treatments">
          {d.treatments.map((t) => (
            <Link key={t.to} to={t.to} className="stpl-treatment">
              <span className="stpl-treatment-media">
                <img src={t.img} alt="" loading="lazy" />
                <span className="stpl-treatment-kind">{t.kind}</span>
              </span>
              <span className="stpl-treatment-body">
                <span className="stpl-treatment-name">{t.name}</span>
                <span className="stpl-treatment-arrow" aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 5 · Patient story + guidance */}
      <section className="stpl-block stpl-story-row">
        <figure className="stpl-story">
          <span className="stpl-q" aria-hidden="true">&rdquo;</span>
          <blockquote>{d.story.quote}</blockquote>
          <figcaption>
            <span className="stpl-story-name">{d.story.name}</span>
            <span className="stpl-story-detail">{d.story.detail}</span>
          </figcaption>
        </figure>
        <aside className="stpl-guidance">
          <p className="stpl-eyebrow">Good to know</p>
          <h3>Self-care &amp; when to seek help</h3>
          <ul>
            {d.guidance.map((g, i) => (
              <li key={i}>{g}</li>
            ))}
          </ul>
        </aside>
      </section>

      {/* 6 · Location */}
      <section className="stpl-block stpl-location">
        <div className="stpl-head">
          <p className="stpl-eyebrow">Visit us</p>
          <h2 className="stpl-h2">Our location</h2>
          <p className="stpl-lead">Algarve Pain Centre · Av. do Mar, Vale do Lobo, Algarve, Portugal.</p>
        </div>
        <div className="stpl-map">
          <iframe
            title="Algarve Pain Centre location map"
            src="https://www.google.com/maps?q=Av.+do+Mar+8135-107+Portugal&z=16&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </section>

      {/* 7 · Contact / CTA */}
      <section className="stpl-cta">
        <div className="stpl-cta-inner">
          <h2>Living with {d.title.toLowerCase()}?</h2>
          <p>Book an assessment with our multidisciplinary team in Vale do Lobo, Algarve.</p>
          <div className="stpl-hero-actions">
            <button type="button" className="stpl-btn stpl-btn--primary" onClick={() => navigate('/contact')}>
              Book an appointment
            </button>
            <button type="button" className="stpl-btn stpl-btn--ghost-dark" onClick={() => navigate('/specialities')}>
              All specialities
            </button>
          </div>
        </div>
      </section>

      {d.citations?.length > 0 && (
        <section className="stpl-refs">
          <p className="stpl-eyebrow">References</p>
          <ul>
            {d.citations.map((c) => (
              <li key={c.url}>
                <a href={c.url} target="_blank" rel="noreferrer">{c.label}</a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
