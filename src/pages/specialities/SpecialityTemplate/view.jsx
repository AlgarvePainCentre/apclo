import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ArticleBreadcrumb from '../../../components/ArticleBreadcrumb';
import './speciality-template.css';

/*
 * Presentational speciality template — one component, driven by `data`.
 * The self-care slot is adaptive: a short `guidance[]` renders as a small aside
 * next to the story; a longer `tips[]` renders as its own numbered grid section.
 */
// §9 Final CTA — category fallback (used when a page defines no `cta` override).
const CTA_FALLBACKS = {
  'pain-medicine': (area) => ({
    heading: `Book a consultation for ${area}`,
    body: `You don't have to manage ${area} alone. Tell us what you're experiencing and our multidisciplinary team will help you understand the cause and the options to feel better.`,
    primaryLabel: 'Book an appointment',
    primaryHref: '/contact',
  }),
  'sports-medicine': (area) => ({
    heading: 'Ready to get back to it?',
    body: `Book an assessment for ${area} and we'll build a plan to recover, prevent re-injury and get you performing at your best.`,
    primaryLabel: 'Book an assessment',
    primaryHref: '/contact',
  }),
  'stroke-medicine': () => ({
    heading: 'Let us support your recovery',
    body: 'Book a consultation and our team will work with you and your family on a plan built around your goals and everyday independence.',
    primaryLabel: 'Book a consultation',
    primaryHref: '/contact',
  }),
};

export default function SpecialityTemplateView({ data: d }) {
  const navigate = useNavigate();
  const hasTips = Array.isArray(d.tips) && d.tips.length > 0;
  const showAside = !hasTips && Array.isArray(d.guidance) && d.guidance.length > 0;
  const [openSyn, setOpenSyn] = useState(0);

  const area = d.areaLabel || d.title.toLowerCase();
  const ctaFallback = (CTA_FALLBACKS[d.category] || CTA_FALLBACKS['pain-medicine'])(area);
  const cta = { ...ctaFallback, ...(d.cta || {}) };
  const ctaSecondaryLabel = cta.secondaryLabel || 'Call +351 915 915 001';
  const ctaSecondaryHref = cta.secondaryHref || 'tel:+351915915001';

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

      {/* Breadcrumb — as on the original page */}
      <nav className="stpl-crumbs" aria-label="Breadcrumb">
        <ArticleBreadcrumb
          items={[
            { label: 'Home', to: '/' },
            { label: 'Specialities', to: '/specialities' },
            { label: d.title, isCurrent: true },
          ]}
        />
      </nav>

      {/* 2 · Overview */}
      <section className="stpl-block stpl-overview">
        <div className="stpl-overview-grid">
          <div className="stpl-overview-head">
            <p className="stpl-eyebrow">Overview</p>
            <h2 className="stpl-h2">Understanding {d.title.toLowerCase()}</h2>
          </div>
          <div className="stpl-overview-copy">
            <p className="stpl-lead-intro">{d.overview[0]}</p>
            {d.overview.slice(1).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Optional · Symptoms & diagnosis — tinted panel */}
      {Array.isArray(d.symptoms) && d.symptoms.length > 0 && (
        <section className="stpl-block">
          <div className="stpl-symptoms-panel">
            <div className="stpl-symptoms-head">
              <span className="stpl-symptoms-badge" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8v4l3 2" /><circle cx="12" cy="12" r="9" /></svg>
              </span>
              <div>
                <p className="stpl-eyebrow">Symptoms &amp; diagnosis</p>
                <h2 className="stpl-h2">Knowing what to look for</h2>
              </div>
            </div>
            <div className="stpl-symptoms-body">
              {d.symptoms.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3 · Signs & symptoms / What we assess (flexible heading) */}
      <section className="stpl-block">
        <div className="stpl-head">
          <p className="stpl-eyebrow">What to look for</p>
          <h2 className="stpl-h2">{d.presentationHeading || 'Signs & symptoms'}</h2>
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

      {/* Optional · Most common syndromes (named, with imagery + learn link) */}
      {Array.isArray(d.syndromes) && d.syndromes.length > 0 && (
        <section className="stpl-block">
          <div className="stpl-head">
            <p className="stpl-eyebrow">In detail</p>
            <h2 className="stpl-h2">{d.conditionsHeading || 'Common conditions'}</h2>
            <p className="stpl-lead">The specific diagnoses and areas we most often identify and treat.</p>
          </div>
          <div className="stpl-syn-acc">
            {d.syndromes.map((s, i) => {
              const open = openSyn === i;
              return (
                <div key={i} className={`stpl-syn-item${open ? ' is-open' : ''}`}>
                  <button type="button" className="stpl-syn-q" aria-expanded={open} onClick={() => setOpenSyn(open ? -1 : i)}>
                    {s.img && (
                      <span className="stpl-syn-thumb" aria-hidden="true">
                        <img src={s.img} alt="" loading="lazy" />
                      </span>
                    )}
                    <span className="stpl-syn-name">{s.name}</span>
                    <span className="stpl-syn-icon" aria-hidden="true">{open ? '–' : '+'}</span>
                  </button>
                  {open && (
                    <div className="stpl-syn-a">
                      {s.copy.map((c, j) => (
                        <p key={j}>{c}</p>
                      ))}
                      {s.to && (
                        <Link to={s.to} className="stpl-syndrome-link">
                          Learn more <span aria-hidden="true">›</span>
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* §5 · When to seek help — universal safety slot */}
      {Array.isArray(d.seekHelp) && d.seekHelp.length > 0 && (
        <section className="stpl-block">
          <div className="stpl-seek">
            <div className="stpl-seek-head">
              <span className="stpl-seek-badge" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3 4 6v5c0 5 3.5 8 8 10 4.5-2 8-5 8-10V6z" /><path d="M12 8v4" /><path d="M12 16h.01" /></svg>
              </span>
              <div>
                <p className="stpl-eyebrow stpl-eyebrow--seek">Your safety</p>
                <h2 className="stpl-h2">When to seek help</h2>
              </div>
            </div>
            <ul className="stpl-seek-list">
              {d.seekHelp.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* §6 · How we assess & treat — image treatment cards, or text approaches */}
      <section className="stpl-block stpl-treat" id="treat">
        <div className="stpl-head">
          <p className="stpl-eyebrow stpl-eyebrow--treat">How we assess &amp; treat</p>
          <h2 className="stpl-h2">{d.treatHeading || 'Related treatments'}</h2>
          <p className="stpl-lead">
            Your plan is personalised. These are the approaches we commonly draw on for {area}.
          </p>
        </div>
        {Array.isArray(d.treatments) && d.treatments.length > 0 ? (
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
        ) : (
          <div className="stpl-approaches">
            {(d.approaches || []).map((a, i) => (
              <article key={i} className="stpl-approach">
                <h3>{a.title}</h3>
                <p>{a.text}</p>
                {a.href && (
                  <Link to={a.href} className="stpl-syndrome-link">
                    Explore <span aria-hidden="true">›</span>
                  </Link>
                )}
              </article>
            ))}
          </div>
        )}
      </section>

      {/* 5 · Self-care — full numbered grid when there are many tips */}
      {hasTips && (
        <section className="stpl-block">
          <div className="stpl-head">
            <p className="stpl-eyebrow">Self-care</p>
            <h2 className="stpl-h2">Living well with {d.title.toLowerCase()}</h2>
            <p className="stpl-lead">Practical habits that reduce strain and support recovery over time.</p>
          </div>
          <ol className="stpl-tips">
            {d.tips.map((t, i) => (
              <li key={i} className="stpl-tip">
                <span className="stpl-tip-n">{i + 1}</span>
                <h3>{t.title}</h3>
                <p>{t.body}</p>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* Optional · Patient story (+ small guidance aside when there are no big tips) */}
      {d.story && (
        <section className={`stpl-block stpl-story-row${showAside ? '' : ' is-solo'}`}>
          <figure className="stpl-story">
            <span className="stpl-q" aria-hidden="true">&rdquo;</span>
            <blockquote>{d.story.quote}</blockquote>
            <figcaption>
              <span className="stpl-story-name">{d.story.name}</span>
              <span className="stpl-story-detail">{d.story.detail}</span>
            </figcaption>
          </figure>
          {showAside && (
            <aside className="stpl-guidance">
              <p className="stpl-eyebrow">Good to know</p>
              <h3>Self-care &amp; when to seek help</h3>
              <ul>
                {d.guidance.map((g, i) => (
                  <li key={i}>{g}</li>
                ))}
              </ul>
            </aside>
          )}
        </section>
      )}

      {/* §7 · Let us help you (+ for patients / for clinicians) */}
      {d.help && (
        <section className="stpl-block stpl-help">
          <div className="stpl-head">
            <p className="stpl-eyebrow">Why it matters</p>
            <h2 className="stpl-h2">Let us help you</h2>
          </div>
          <div className="stpl-help-grid">
            <div className="stpl-help-copy">
              {d.help.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="stpl-help-cards">
              {Array.isArray(d.help.patient) && d.help.patient.length > 0 && (
                <div className="stpl-help-card">
                  <h3>For patients</h3>
                  <ul>
                    {d.help.patient.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                </div>
              )}
              {Array.isArray(d.help.clinician) && d.help.clinician.length > 0 && (
                <div className="stpl-help-card">
                  <h3>For clinicians</h3>
                  <ul>
                    {d.help.clinician.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* §8 · References */}
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

      {/* §9 · Final CTA (category fallback + tel: secondary) */}
      <section className="stpl-cta">
        <span className="stpl-cta-glow stpl-cta-glow--a" aria-hidden="true" />
        <span className="stpl-cta-glow stpl-cta-glow--b" aria-hidden="true" />
        <div className="stpl-cta-inner">
          <p className="stpl-cta-eyebrow">Ready when you are</p>
          <h2>{cta.heading}</h2>
          <p className="stpl-cta-sub">{cta.body}</p>
          <div className="stpl-hero-actions">
            <button type="button" className="stpl-btn stpl-btn--cta" onClick={() => navigate(cta.primaryHref)}>
              {cta.primaryLabel} <span aria-hidden="true">→</span>
            </button>
            <a href={ctaSecondaryHref} className="stpl-btn stpl-btn--ghost-dark">{ctaSecondaryLabel}</a>
          </div>
          <ul className="stpl-cta-assure">
            <li>Multidisciplinary team</li>
            <li>Personalised plan</li>
            <li>Vale do Lobo, Algarve</li>
          </ul>
        </div>
      </section>

      {/* §10 · Location */}
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
