import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './resources-hub.css';
import { useGetTestimonialStoriesQuery } from '../../../features/content/contentApi';

// The four genuine Learn guides (not the treatment/condition topic pages).
const GUIDES = [
  {
    title: 'Cervical Pain',
    to: '/resources/learn/cervical-pain',
    tag: 'Cervical pain',
    read: '5 min read',
    img: '/assets/images/resources/Cervical-1.webp',
    featured: true,
  },
  {
    title: 'Conquering Cervical Pain',
    to: '/resources/learn/conquering-cervical-pain',
    tag: 'Self-care',
    read: '7 min read',
    img: '/assets/images/resources/Cervical-Card-2.webp',
  },
  {
    title: 'Understanding Acute & Chronic Pain',
    to: '/resources/learn/acute-and-chronic-pain',
    tag: 'Foundations',
    read: '6 min read',
    img: '/assets/images/resources/Cervical-Card-3.webp',
  },
  {
    title: 'Self-care tips for cervical pain',
    to: '/resources/learn/tips-for-self-care',
    tag: 'Everyday',
    read: '4 min read',
    img: '/assets/images/resources/Cervical-1.webp',
  },
];

export default function ResourcesHub() {
  const navigate = useNavigate();
  const { data: stories = [] } = useGetTestimonialStoriesQuery();
  const featured = stories[0];
  const rest = stories.slice(1);
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  useEffect(() => {
    document.title = 'Resources (preview) | Algarve Pain Centre';
  }, []);

  const submitGuide = (e) => {
    e.preventDefault();
    if (email.trim()) setSent(true);
  };

  return (
    <div className="rhub">
      <header className="rhub-hero">
        <p className="rhub-eyebrow rhub-eyebrow--hero">Resources</p>
        <h1>Everything to support your recovery</h1>
        <p className="rhub-hero-sub">
          Expert guides and real patient stories — plus a free guide to take away. Explore what fits
          where you are.
        </p>
        <div className="rhub-chips">
          <a href="#guides" className="rhub-chip">Guides</a>
          <a href="#stories" className="rhub-chip">Patient stories</a>
          <a href="#guide" className="rhub-chip">Free guide</a>
        </div>
      </header>

      <section className="rhub-overview">
        <a className="rhub-ov" href="#guides">
          <span className="rhub-ov-num">{GUIDES.length}</span>
          <h3>Guides</h3>
          <p>Short, expert-written explainers to understand and manage your pain.</p>
          <span className="rhub-ov-go">Browse guides →</span>
        </a>
        <a className="rhub-ov" href="#stories">
          <span className="rhub-ov-num">{stories.length || 8}</span>
          <h3>Patient stories</h3>
          <p>Real recovery journeys, in our patients&apos; own words.</p>
          <span className="rhub-ov-go">See the stories →</span>
        </a>
        <a className="rhub-ov" href="#guide">
          <span className="rhub-ov-num">1</span>
          <h3>Free guide</h3>
          <p>Our spine-health ebook, sent straight to your inbox.</p>
          <span className="rhub-ov-go">Get the guide →</span>
        </a>
      </section>

      <section className="rhub-block" id="guides">
        <div className="rhub-head">
          <p className="rhub-eyebrow">Guides</p>
          <h2 className="rhub-h2">Learn the essentials</h2>
          <p className="rhub-lead">Clear explainers on the most common pain problems.</p>
        </div>
        <div className="rhub-bento">
          {GUIDES.map((g) => (
            <Link
              key={g.to}
              to={g.to}
              className={`rhub-guide${g.featured ? ' is-feature' : ''}`}
              style={{ backgroundImage: `url('${g.img}')` }}
            >
              <span className="rhub-guide-c">
                <span className="rhub-guide-tag">{g.tag} · {g.read}</span>
                <span className="rhub-guide-title">{g.title}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="rhub-block" id="stories">
        <div className="rhub-head">
          <p className="rhub-eyebrow">Patient stories</p>
          <h2 className="rhub-h2">Real stories of recovery</h2>
          <p className="rhub-lead">How our patients reclaimed their lives — in their own words.</p>
        </div>

        {featured && (
          <div className="rhub-featured">
            <div className="rhub-featured-copy">
              <p className="rhub-featured-k">Featured story</p>
              <h3>Overcoming Sciatica Pain</h3>
              <p>
                Sciatica can be debilitating — but it doesn&apos;t have to be permanent. See how
                targeted therapy and personalised care changed everything.
              </p>
              <button type="button" className="rhub-featured-cta" onClick={() => navigate(featured.to)}>
                {featured.cta} →
              </button>
            </div>
            <figure className="rhub-featured-q">
              <span className="rhub-q-mark" aria-hidden="true">&rdquo;</span>
              <blockquote>{featured.quote}</blockquote>
              <figcaption className="rhub-featured-author">
                <span className="rhub-av" aria-hidden="true">
                  <img src={featured.img} alt="" loading="lazy" />
                </span>
                <span className="rhub-av-meta">
                  <span className="rhub-av-name">{featured.name}</span>
                  <span className="rhub-av-loc">Sciatica recovery</span>
                </span>
              </figcaption>
            </figure>
          </div>
        )}

        <div className="rhub-stories">
          {rest.map((s) => (
            <Link key={s.to} to={s.to} className="rhub-story" aria-label={`Read ${s.name}'s story`}>
              <span className="rhub-story-av" aria-hidden="true">
                <img src={s.img} alt="" loading="lazy" />
              </span>
              <p className="rhub-story-q">&ldquo;{s.quote}&rdquo;</p>
              <span className="rhub-story-foot">
                <span className="rhub-story-meta">
                  <span className="rhub-story-name">{s.name}</span>
                  <span className="rhub-story-read">{s.readMins} min read</span>
                </span>
                <span className="rhub-story-arrow" aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="rhub-guide-band" id="guide">
        <div className="rhub-guide-copy">
          <p className="rhub-guide-k">Free guide · by email</p>
          <h3>5 Daily Habits for a Healthy Spine</h3>
          <p>
            Simple, effective changes to improve posture, reduce back pain and increase mobility.
            Enter your email and we&apos;ll send it over.
          </p>
          {sent ? (
            <p className="rhub-guide-thanks">Thanks — check your inbox for the guide.</p>
          ) : (
            <form className="rhub-guide-form" onSubmit={submitGuide}>
              <input
                id="rhub-guide-email"
                type="email"
                required
                placeholder="you@example.com"
                aria-label="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit">Send me the guide</button>
            </form>
          )}
        </div>
        <div className="rhub-ebook">
          <img src="/assets/images/resources/ebook.webp" alt="5 Daily Habits for a Healthy Spine ebook cover" loading="lazy" />
        </div>
      </section>
    </div>
  );
}
