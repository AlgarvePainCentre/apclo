import { Link, useNavigate } from 'react-router-dom';
import ArticleBreadcrumb from '../../../components/ArticleBreadcrumb';
import './speciality-template.css';

/*
 * Presentational speciality template — one component, driven by `data`.
 * The self-care slot is adaptive: a short `guidance[]` renders as a small aside
 * next to the story; a longer `tips[]` renders as its own numbered grid section.
 */
export default function SpecialityTemplateView({ data: d }) {
  const navigate = useNavigate();
  const hasTips = Array.isArray(d.tips) && d.tips.length > 0;

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
        <div className="stpl-overview-head">
          <p className="stpl-eyebrow">Overview</p>
          <h2 className="stpl-h2">Understanding {d.title.toLowerCase()}</h2>
        </div>
        <p className="stpl-lead-intro">{d.overview[0]}</p>
        {d.overview.length > 1 && (
          <div className="stpl-overview-rest">
            {d.overview.slice(1).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        )}
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

      {/* 4 · How we treat it → bridge to Treatments (grid scales with count) */}
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

      {/* 6 · Patient story (+ small guidance aside when there are no big tips) */}
      <section className={`stpl-block stpl-story-row${hasTips ? ' is-solo' : ''}`}>
        <figure className="stpl-story">
          <span className="stpl-q" aria-hidden="true">&rdquo;</span>
          <blockquote>{d.story.quote}</blockquote>
          <figcaption>
            <span className="stpl-story-name">{d.story.name}</span>
            <span className="stpl-story-detail">{d.story.detail}</span>
          </figcaption>
        </figure>
        {!hasTips && Array.isArray(d.guidance) && d.guidance.length > 0 && (
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

      {/* 7 · Location */}
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

      {/* 8 · Contact / CTA */}
      <section className="stpl-cta">
        <span className="stpl-cta-glow stpl-cta-glow--a" aria-hidden="true" />
        <span className="stpl-cta-glow stpl-cta-glow--b" aria-hidden="true" />
        <div className="stpl-cta-inner">
          <p className="stpl-cta-eyebrow">Ready when you are</p>
          <h2>Living with {d.title.toLowerCase()}?<br />Let&apos;s find your relief.</h2>
          <p className="stpl-cta-sub">Book an assessment with our multidisciplinary team in Vale do Lobo, Algarve.</p>
          <div className="stpl-hero-actions">
            <button type="button" className="stpl-btn stpl-btn--cta" onClick={() => navigate('/contact')}>
              Book an appointment <span aria-hidden="true">→</span>
            </button>
            <button type="button" className="stpl-btn stpl-btn--ghost-dark" onClick={() => navigate('/specialities')}>
              All specialities
            </button>
          </div>
          <ul className="stpl-cta-assure">
            <li>Multidisciplinary team</li>
            <li>Personalised plan</li>
            <li>Vale do Lobo, Algarve</li>
          </ul>
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
