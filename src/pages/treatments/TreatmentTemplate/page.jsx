import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './treatment-template.css';

/*
 * Standalone PREVIEW of the uniform treatment template (does not touch the live
 * treatment pages). Populated with real "Botulinum toxin injection" content so the
 * structure can be reviewed with the client. Every treatment would fill the same slots:
 *   kind, title, heroImage, overview[], steps[], treats[] (→ specialities),
 *   expect[], faqs[], (duration), citations/notes
 * The "What it treats" section is the bridge back to Specialities.
 */
const DEMO = {
  kind: 'Minimally invasive',
  title: 'Botulinum toxin injection',
  heroImage: '/assets/images/Hero/BotulinToxinInjection.webp',
  heroSubtitle:
    'Targeted injections that relax overactive muscles to relieve spasticity and pain — often paired with rehabilitation.',
  duration: 'Relief typically lasts 3–6 months',
  overview: [
    'Botulinum toxin injections are widely used for medical and therapeutic purposes, particularly to reduce muscle stiffness, relieve pain, and manage certain neurological conditions. The injection temporarily blocks the nerve signals that cause muscles to contract, providing relaxation and reducing discomfort.',
    'It has been extensively researched and is proven to help manage symptoms in conditions like spasticity and chronic pain syndromes. Effects often last for several months, and pairing treatment with rehabilitation can maximise functional gains.',
  ],
  steps: [
    {
      n: 1,
      title: 'Preparation',
      body: 'The area to be treated is cleaned, and local anaesthesia may be applied to minimise discomfort.',
    },
    {
      n: 2,
      title: 'Injection',
      body: 'Using a thin needle, botulin toxin is injected into the target muscle group. The number of injections varies with the condition being treated.',
    },
    {
      n: 3,
      title: 'Observation',
      body: 'After injection, the area is observed briefly to ensure there are no immediate reactions before you go home.',
    },
  ],
  treats: [
    { name: 'Head pain', discipline: 'Pain Medicine', to: '/specialities/pain-medicine/head-pain', img: '/assets/images/Hero/HeadPain.webp' },
    { name: 'Cervical spine pain', discipline: 'Pain Medicine', to: '/specialities/pain-medicine/cervical-spine-pain', img: '/assets/images/Hero/CervicalPain.webp' },
    { name: 'Facial pain', discipline: 'Pain Medicine', to: '/specialities/pain-medicine/facial-pain', img: '/assets/images/Hero/FacialPain.webp' },
    { name: 'Post-stroke spasticity', discipline: 'Stroke Medicine', to: '/specialities/stroke-medicine/post-stroke-spasticity', img: '/assets/images/illustrative/Post-Stroke-min-1.webp' },
  ],
  expect: [
    { title: 'Initial mild discomfort', body: 'Some soreness or a small bruise at the injection site can occur and usually settles within a day or two.' },
    { title: 'Gradual relief', body: 'The effect builds over several days, with the fullest benefit typically felt within about two weeks.' },
    { title: 'Temporary weakness', body: 'Depending on the muscle treated, mild temporary weakness may occur — your clinician reviews this beforehand.' },
  ],
  faqs: [
    { q: 'How long does the relief last?', a: 'Most patients experience relief lasting 3–6 months. Your clinician can suggest an appropriate schedule for repeat treatments based on your goals and response.' },
    { q: 'Is the procedure painful?', a: 'Discomfort is usually mild and brief. You may feel a small pinch or pressure, and some soreness can occur at the injection site for a short time.' },
    { q: 'How soon can I return to normal activities?', a: 'Most people return to normal activities the same day. If you feel sore, you may prefer lighter activity for 24–48 hours.' },
    { q: 'Can it be combined with other treatments?', a: 'Yes. It is often combined with physiotherapy, stretching, strengthening and other rehabilitation strategies to maximise functional improvement and long-term benefit.' },
  ],
};

export default function TreatmentTemplate() {
  const navigate = useNavigate();
  const d = DEMO;
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    document.title = 'Treatment template (preview) | Algarve Pain Centre';
  }, []);

  return (
    <div className="treat-tpl">
      {/* 1 · Hero */}
      <header className="ttpl-hero" aria-label="Treatment hero">
        <div className="ttpl-hero-media" aria-hidden="true">
          <img src={d.heroImage} alt="" />
        </div>
        <div className="ttpl-hero-inner">
          <p className="ttpl-eyebrow ttpl-eyebrow--onmedia">Treatment · {d.kind}</p>
          <h1>{d.title}</h1>
          <p className="ttpl-hero-sub">{d.heroSubtitle}</p>
          <div className="ttpl-hero-actions">
            <button type="button" className="ttpl-btn ttpl-btn--primary" onClick={() => navigate('/contact')}>
              Book an appointment
            </button>
            <a href="#treats" className="ttpl-btn ttpl-btn--ghost">What it treats</a>
          </div>
          {d.duration && <p className="ttpl-hero-tag">{d.duration}</p>}
        </div>
      </header>

      {/* 2 · Overview */}
      <section className="ttpl-block ttpl-overview">
        <div className="ttpl-head">
          <p className="ttpl-eyebrow">Overview</p>
          <h2 className="ttpl-h2">Understanding {d.title.toLowerCase()}</h2>
        </div>
        <div className="ttpl-overview-body">
          {d.overview.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>

      {/* 3 · How it works — steps */}
      <section className="ttpl-block">
        <div className="ttpl-head">
          <p className="ttpl-eyebrow">The procedure</p>
          <h2 className="ttpl-h2">How it works</h2>
          <p className="ttpl-lead">A straightforward, minimally invasive procedure — usually completed in a single visit.</p>
        </div>
        <ol className="ttpl-steps">
          {d.steps.map((s) => (
            <li key={s.n} className="ttpl-step">
              <span className="ttpl-step-n">{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* 4 · What it treats → bridge to Specialities */}
      <section className="ttpl-block" id="treats">
        <div className="ttpl-head">
          <p className="ttpl-eyebrow ttpl-eyebrow--bridge">What it treats</p>
          <h2 className="ttpl-h2">Conditions we use it for</h2>
          <p className="ttpl-lead">This treatment is one option within a personalised plan for these specialities.</p>
        </div>
        <div className="ttpl-treats">
          {d.treats.map((t) => (
            <Link key={t.to} to={t.to} className="ttpl-treat">
              <span className="ttpl-treat-media">
                <img src={t.img} alt="" loading="lazy" />
                <span className="ttpl-treat-disc">{t.discipline}</span>
              </span>
              <span className="ttpl-treat-body">
                <span className="ttpl-treat-name">{t.name}</span>
                <span className="ttpl-treat-arrow" aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 5 · What to expect */}
      <section className="ttpl-block">
        <div className="ttpl-head">
          <p className="ttpl-eyebrow">Recovery</p>
          <h2 className="ttpl-h2">What to expect</h2>
        </div>
        <div className="ttpl-expect">
          {d.expect.map((e, i) => (
            <article key={i} className="ttpl-expect-item">
              <h3>{e.title}</h3>
              <p>{e.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* 6 · FAQ */}
      <section className="ttpl-block ttpl-faq-block">
        <div className="ttpl-head">
          <p className="ttpl-eyebrow">Good to know</p>
          <h2 className="ttpl-h2">Frequently asked</h2>
        </div>
        <div className="ttpl-faq">
          {d.faqs.map((f, i) => {
            const open = openFaq === i;
            return (
              <div key={i} className={`ttpl-faq-item${open ? ' is-open' : ''}`}>
                <button type="button" className="ttpl-faq-q" aria-expanded={open} onClick={() => setOpenFaq(open ? -1 : i)}>
                  <span>{f.q}</span>
                  <span className="ttpl-faq-icon" aria-hidden="true">{open ? '–' : '+'}</span>
                </button>
                {open && <p className="ttpl-faq-a">{f.a}</p>}
              </div>
            );
          })}
        </div>
      </section>

      {/* 7 · Location */}
      <section className="ttpl-block ttpl-location">
        <div className="ttpl-head">
          <p className="ttpl-eyebrow">Visit us</p>
          <h2 className="ttpl-h2">Our location</h2>
          <p className="ttpl-lead">Algarve Pain Centre · Av. do Mar, Vale do Lobo, Algarve, Portugal.</p>
        </div>
        <div className="ttpl-map">
          <iframe
            title="Algarve Pain Centre location map"
            src="https://www.google.com/maps?q=Av.+do+Mar+8135-107+Portugal&z=16&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </section>

      {/* 8 · CTA */}
      <section className="ttpl-cta">
        <span className="ttpl-cta-glow ttpl-cta-glow--a" aria-hidden="true" />
        <span className="ttpl-cta-glow ttpl-cta-glow--b" aria-hidden="true" />
        <div className="ttpl-cta-inner">
          <p className="ttpl-cta-eyebrow">Ready when you are</p>
          <h2>Could {d.title.toLowerCase()}<br />be right for you?</h2>
          <p className="ttpl-cta-sub">Book an assessment and our team will tell you whether this treatment fits your plan.</p>
          <div className="ttpl-hero-actions">
            <button type="button" className="ttpl-btn ttpl-btn--cta" onClick={() => navigate('/contact')}>
              Book an appointment <span aria-hidden="true">→</span>
            </button>
            <button type="button" className="ttpl-btn ttpl-btn--ghost-dark" onClick={() => navigate('/treatments')}>
              All treatments
            </button>
          </div>
          <ul className="ttpl-cta-assure">
            <li>Multidisciplinary team</li>
            <li>Personalised plan</li>
            <li>Vale do Lobo, Algarve</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
