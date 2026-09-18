import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ArticleBreadcrumb from '../../../components/ArticleBreadcrumb';
import { ChaptersRailNav, useChaptersRail } from '../../../components/ChaptersRail';
import '../../specialities/SpecialityTemplate/speciality-template.css';

/*
 * Canonical treatment renderer — shares the speciality visual system (spec-tpl
 * classes + chapters rail), with treatment-specific sections: How it works
 * (steps), What it treats (→ specialities), Benefits, What to expect, Risks, FAQ.
 */
export default function TreatmentDetailView({ data: d }) {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(0);
  const area = d.areaLabel || d.title.toLowerCase();

  const hasRisks = Array.isArray(d.risks) && d.risks.length > 0;
  const chapters = [
    { id: 'overview', label: 'Overview' },
    { id: 'steps', label: 'How it works' },
    { id: 'treats', label: 'What it treats' },
    { id: 'benefits', label: 'Benefits' },
    { id: 'expect', label: 'What to expect' },
    ...(hasRisks ? [{ id: 'risks', label: 'Risks' }] : []),
    { id: 'faq', label: 'FAQ' },
  ];
  const { activeCh, shellRef, tocRef } = useChaptersRail(chapters);

  return (
    <div className="spec-tpl">
      {/* Hero */}
      <header className="stpl-hero" aria-label="Treatment hero">
        <div className="stpl-hero-media" aria-hidden="true">
          <img src={d.heroImage} alt="" />
        </div>
        <div className="stpl-hero-inner">
          <p className="stpl-eyebrow stpl-eyebrow--onmedia">Treatment · {d.kind}</p>
          <h1>{d.title}</h1>
          <p className="stpl-hero-sub">{d.heroSubtitle}</p>
          <div className="stpl-hero-actions">
            <button type="button" className="stpl-btn stpl-btn--primary" onClick={() => navigate('/contact')}>
              Book an appointment
            </button>
            <a href="#treats" className="stpl-btn stpl-btn--ghost">What it treats</a>
          </div>
          {d.duration && <p className="stpl-hero-tag">{d.duration}</p>}
        </div>
      </header>

      <nav className="stpl-crumbs" aria-label="Breadcrumb">
        <ArticleBreadcrumb
          items={[
            { label: 'Home', to: '/' },
            { label: 'Treatments', to: '/treatments' },
            { label: d.title, isCurrent: true },
          ]}
        />
      </nav>

      <div className="stpl-shell" ref={shellRef}>
        <ChaptersRailNav chapters={chapters} activeCh={activeCh} tocRef={tocRef} />

        <div className="stpl-main">
          {/* Overview */}
          <section className="stpl-block stpl-overview" id="overview">
            <div className="stpl-overview-grid">
              <div className="stpl-overview-head">
                <p className="stpl-eyebrow">Overview</p>
                <h2 className="stpl-h2">Understanding {area}</h2>
              </div>
              <div className="stpl-overview-copy">
                <p className="stpl-lead-intro">{d.overview[0]}</p>
                {d.overview.slice(1).map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </section>

          {/* How it works — numbered steps */}
          <section className="stpl-block" id="steps">
            <div className="stpl-head">
              <p className="stpl-eyebrow">The procedure</p>
              <h2 className="stpl-h2">How it works</h2>
              <p className="stpl-lead">A minimally invasive, image-guided procedure — usually completed in a single visit.</p>
            </div>
            <ol className="stpl-tips">
              {d.steps.map((s) => (
                <li key={s.n} className="stpl-tip">
                  <span className="stpl-tip-n">{s.n}</span>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* What it treats → specialities (the bridge) */}
          {Array.isArray(d.treats) && d.treats.length > 0 && (
            <section className="stpl-block stpl-treat" id="treats">
              <div className="stpl-head">
                <p className="stpl-eyebrow stpl-eyebrow--treat">What it treats</p>
                <h2 className="stpl-h2">Conditions we use it for</h2>
                <p className="stpl-lead">This treatment is one option within a personalised plan for these specialities.</p>
              </div>
              <div className="stpl-treatments">
                {d.treats.map((t) => (
                  <Link key={t.to} to={t.to} className="stpl-treatment">
                    <span className="stpl-treatment-media">
                      <img src={t.img} alt="" loading="lazy" />
                      <span className="stpl-treatment-kind">{t.discipline}</span>
                    </span>
                    <span className="stpl-treatment-body">
                      <span className="stpl-treatment-name">{t.name}</span>
                      <span className="stpl-treatment-arrow" aria-hidden="true">→</span>
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Benefits */}
          <section className="stpl-block" id="benefits">
            <div className="stpl-head">
              <p className="stpl-eyebrow">Why it helps</p>
              <h2 className="stpl-h2">Benefits</h2>
            </div>
            <div className="stpl-patterns">
              {d.benefits.map((b, i) => (
                <article key={i} className="stpl-pattern">
                  <h3>{b.title}</h3>
                  {b.body && <p>{b.body}</p>}
                </article>
              ))}
            </div>
          </section>

          {/* What to expect */}
          <section className="stpl-block" id="expect">
            <div className="stpl-head">
              <p className="stpl-eyebrow">Recovery</p>
              <h2 className="stpl-h2">What to expect</h2>
            </div>
            <div className="stpl-approaches">
              {d.expect.map((e, i) => (
                <article key={i} className="stpl-approach">
                  <h3>{e.title}</h3>
                  <p>{e.body}</p>
                </article>
              ))}
            </div>
          </section>

          {/* Risks (optional) */}
          {hasRisks && (
            <section className="stpl-block" id="risks">
              <div className="stpl-head">
                <p className="stpl-eyebrow">Good to know</p>
                <h2 className="stpl-h2">Risks &amp; side effects</h2>
              </div>
              <div className="stpl-patterns">
                {d.risks.map((r, i) => (
                  <article key={i} className="stpl-pattern">
                    <h3>{r.title}</h3>
                    <p>{r.body}</p>
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* FAQ — header left, accordion right */}
          <section className="stpl-block" id="faq">
            <div className="stpl-cond-grid">
              <div className="stpl-head">
                <p className="stpl-eyebrow">Good to know</p>
                <h2 className="stpl-h2">Frequently asked</h2>
                <p className="stpl-lead">Common questions about {area}.</p>
              </div>
              <div className="stpl-syn-acc">
                {d.faqs.map((f, i) => {
                  const open = openFaq === i;
                  return (
                    <div key={i} className={`stpl-syn-item${open ? ' is-open' : ''}`}>
                      <button type="button" className="stpl-syn-q" aria-expanded={open} onClick={() => setOpenFaq(open ? -1 : i)}>
                        <span className="stpl-syn-name">{f.q}</span>
                        <span className="stpl-syn-icon" aria-hidden="true">{open ? '–' : '+'}</span>
                      </button>
                      {open && (
                        <div className="stpl-syn-a">
                          <p>{f.a}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* References */}
      {d.citations?.length > 0 && (
        <footer className="stpl-refs">
          <span className="stpl-refs-label">References</span>
          <ul>
            {d.citations.map((c) => (
              <li key={c.url}>
                <a href={c.url} target="_blank" rel="noreferrer">{c.label}</a>
              </li>
            ))}
          </ul>
        </footer>
      )}

      {/* CTA */}
      <section className="stpl-cta">
        <span className="stpl-cta-glow stpl-cta-glow--a" aria-hidden="true" />
        <span className="stpl-cta-glow stpl-cta-glow--b" aria-hidden="true" />
        <div className="stpl-cta-inner">
          <p className="stpl-cta-eyebrow">Ready when you are</p>
          <h2>Could {area} be right for you?</h2>
          <p className="stpl-cta-sub">Book an assessment and our team will tell you whether this treatment fits your plan.</p>
          <div className="stpl-hero-actions">
            <button type="button" className="stpl-btn stpl-btn--cta" onClick={() => navigate('/contact')}>
              Book an appointment <span aria-hidden="true">→</span>
            </button>
            <button type="button" className="stpl-btn stpl-btn--ghost-dark" onClick={() => navigate('/treatments')}>
              All treatments
            </button>
          </div>
          <ul className="stpl-cta-assure">
            <li>Multidisciplinary team</li>
            <li>Personalised plan</li>
            <li>Vale do Lobo, Algarve</li>
          </ul>
        </div>
      </section>

      {/* Location */}
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
    </div>
  );
}
