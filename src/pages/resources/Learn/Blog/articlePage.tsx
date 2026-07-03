import React, { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useLocation, useParams } from 'react-router-dom';
import SocialShare from '../../../../components/SocialShare';
import '../../../../styles/layout/article-layout.css';
import { blogArticles, getBlogArticleBySlug } from './articles';

type Comment = {
  id: string;
  name: string;
  message: string;
  createdAtISO: string;
};

const formatDate = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
};

const safeId = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const getMeta = (name: string) => document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
const getOg = (property: string) =>
  document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;

const setMeta = (name: string, content: string) => {
  let meta = getMeta(name);
  if (!meta) {
    meta = document.createElement('meta');
    meta.name = name;
    document.head.appendChild(meta);
  }
  meta.content = content;
};

const setOg = (property: string, content: string) => {
  let meta = getOg(property);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('property', property);
    document.head.appendChild(meta);
  }
  meta.content = content;
};

const setCanonical = (href: string) => {
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }
  link.href = href;
};

const useComments = (slug: string) => {
  const storageKey = `blog-comments:${slug}`;
  const [comments, setComments] = useState<Comment[]>(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (!raw) return [];
      const parsed = JSON.parse(raw) as Comment[];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(comments));
    } catch {}
  }, [comments, storageKey]);

  return { comments, setComments };
};

const BlogArticlePage: React.FC = () => {
  const params = useParams();
  const slug = (params['*'] || params.slug || '').replace(/^\/+/, '').replace(/\/+$/, '');
  const location = useLocation();
  const article = useMemo(() => getBlogArticleBySlug(slug), [slug]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (!article) return;

    const title = `${article.title} | Blog | Algarve Pain Centre`;
    document.title = title;
    setMeta('description', article.description);
    setMeta('robots', 'index,follow');
    setMeta('keywords', article.tags.join(', '));

    const canonical = `${window.location.origin}/blog/${article.slug}`;
    setCanonical(canonical);
    setOg('og:title', title);
    setOg('og:description', article.description);
    setOg('og:type', 'article');
    setOg('og:url', canonical);
    const ogImage = `${window.location.origin}${article.coverImage.src}`;
    setOg('og:image', ogImage);

    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', article.description);
    setMeta('twitter:image', ogImage);

    const schemaId = 'schema-blog-article';
    const existing = document.getElementById(schemaId);
    if (existing) existing.remove();

    const breadcrumbJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${window.location.origin}/` },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${window.location.origin}/blog` },
        {
          '@type': 'ListItem',
          position: 3,
          name: article.title,
          item: `${window.location.origin}/blog/${article.slug}`,
        },
      ],
    };

    const medicalWebPageJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'MedicalWebPage',
      name: article.title,
      description: article.description,
      url: `${window.location.origin}/blog/${article.slug}`,
      inLanguage: 'en',
      datePublished: article.dateISO,
      dateModified: article.dateISO,
      author: { '@type': 'Organization', name: article.author.name },
      publisher: { '@type': 'Organization', name: 'Algarve Pain Centre' },
      image: [`${window.location.origin}${article.coverImage.src}`],
      about: { '@type': 'Thing', name: article.title },
      mainEntityOfPage: { '@type': 'WebPage', '@id': `${window.location.origin}/blog/${article.slug}` },
    };

    const medicalArticleJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'MedicalArticle',
      headline: article.title,
      description: article.description,
      datePublished: article.dateISO,
      dateModified: article.dateISO,
      author: { '@type': 'Organization', name: article.author.name },
      publisher: { '@type': 'Organization', name: 'Algarve Pain Centre' },
      mainEntityOfPage: { '@type': 'WebPage', '@id': `${window.location.origin}/blog/${article.slug}` },
      image: [`${window.location.origin}${article.coverImage.src}`],
      keywords: article.tags.join(', '),
      about: { '@type': 'Thing', name: article.title },
      citation: article.references.map((r) => r.url),
    };

    const script = document.createElement('script');
    script.id = schemaId;
    script.type = 'application/ld+json';
    const extra = article.medicalEntity ? [{ '@context': 'https://schema.org', ...article.medicalEntity }] : [];
    script.text = JSON.stringify([breadcrumbJsonLd, medicalWebPageJsonLd, medicalArticleJsonLd, ...extra]);
    document.head.appendChild(script);

    return () => {
      const cleanup = document.getElementById(schemaId);
      if (cleanup) cleanup.remove();
    };
  }, [article]);

  const { comments, setComments } = useComments(slug);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [formError, setFormError] = useState('');
  const formErrorId = `comment-error:${slug}`;

  const categories = useMemo(
    () => Array.from(new Set(blogArticles.map((a) => a.category))).sort(),
    []
  );

  const related = useMemo(() => {
    if (!article) return [];
    const bySlug = new Map(blogArticles.map((a) => [a.slug, a]));
    const picks = article.relatedSlugs.map((s) => bySlug.get(s)).filter(Boolean) as typeof blogArticles;
    if (picks.length >= 6) return picks.slice(0, 6);
    const fallback = blogArticles
      .filter((a) => a.slug !== article.slug)
      .filter((a) => a.category === article.category)
      .slice(0, 6 - picks.length);
    return [...picks, ...fallback];
  }, [article]);

  const onSubmitComment: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedMessage = message.trim();

    if (trimmedName.length < 2) {
      setFormError('Please enter your name (at least 2 characters).');
      return;
    }
    if (trimmedMessage.length < 10) {
      setFormError('Please enter a comment (at least 10 characters).');
      return;
    }

    setFormError('');
    const now = new Date().toISOString();
    setComments((prev) => [
      {
        id: `${now}:${Math.random().toString(16).slice(2)}`,
        name: trimmedName,
        message: trimmedMessage,
        createdAtISO: now,
      },
      ...prev,
    ]);
    setMessage('');
  };

  if (!slug) return <Navigate to="/blog" replace />;

  if (!article) {
    return (
      <div className="article-page">
        <header className="article-hero">
          <div className="article-hero-content">
            <h1>Article not found</h1>
            <p className="article-subtitle">We couldn’t find a blog article for this URL.</p>
          </div>
        </header>
        <main className="article-main">
          <nav className="article-breadcrumb" aria-label="Breadcrumb">
            <ol className="article-breadcrumb-list">
              <li>
                <Link to="/" className="article-breadcrumb-link">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">›</li>
              <li>
                <Link to="/blog" className="article-breadcrumb-link">
                  Blog
                </Link>
              </li>
              <li aria-hidden="true">›</li>
              <li aria-current="page">Not found</li>
            </ol>
          </nav>
          <section className="article-section">
            <h2>Browse all articles</h2>
            <p>
              Head back to the blog index to filter and explore topics.
            </p>
            <Link to="/blog" className="article-inline-link">
              Go to Blog
            </Link>
          </section>
        </main>
      </div>
    );
  }

  const sectionToc = article.sections.map((s) => ({ id: safeId(s.id || s.heading), heading: s.heading }));
  const hasChecklist = Boolean(article.checklist && article.checklist.items.length > 0);
  const hasFaq = Boolean(article.faq && article.faq.length > 0);

  const onPrintChecklist = () => {
    if (!hasChecklist) return;
    const cleanup = () => {
      document.body.classList.remove('print-checklist');
      window.removeEventListener('afterprint', cleanup);
    };
    window.addEventListener('afterprint', cleanup);
    document.body.classList.add('print-checklist');
    document.getElementById('checklist')?.scrollIntoView({ behavior: 'auto', block: 'start' });
    window.print();
  };

  return (
    <div className="article-page" data-article={article.slug}>
      <header className="article-hero">
        <div className="article-hero-content">
          <h1>{article.title}</h1>
          <p className="article-subtitle">{article.description}</p>
          <p className="article-meta" aria-label="Publication date">
            Published {formatDate(article.dateISO)}
            {article.updatedISO ? ` · Updated ${formatDate(article.updatedISO)}` : ''}
          </p>
          {article.reviewedBy ? (
            <p className="article-meta" aria-label="Medical review">
              Medically reviewed by {article.reviewedBy.name} · {article.reviewedBy.role}
            </p>
          ) : null}
          {article.cta ? (
            <div className="article-ctas" aria-label="Article actions">
              {article.cta.secondaryAction === 'print-checklist' && hasChecklist ? (
                <button type="button" className="navbar-cta" onClick={onPrintChecklist}>
                  <span>{article.cta.secondaryLabel}</span>
                  <span className="navbar-cta-icon" aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </span>
                </button>
              ) : null}
            </div>
          ) : null}
        </div>
      </header>

      <main className="article-main" aria-label="Article content">
        <nav className="article-breadcrumb" aria-label="Breadcrumb">
          <ol className="article-breadcrumb-list">
            <li>
              <Link to="/" className="article-breadcrumb-link">
                Home
              </Link>
            </li>
            <li aria-hidden="true">›</li>
            <li>
              <Link to="/blog" className="article-breadcrumb-link">
                Blog
              </Link>
            </li>
            <li aria-hidden="true">›</li>
            <li aria-current="page">{article.title}</li>
          </ol>
        </nav>

        <div className="article-layout">
          <article className="article-content">
            <SocialShare />

            {article.quickFacts && article.quickFacts.length > 0 ? (
              <section className="article-facts" aria-label="Quick facts">
                <h2 className="article-facts-title">Quick facts</h2>
                <dl className="article-facts-grid">
                  {article.quickFacts.map((f) => (
                    <div key={f.label} className="article-facts-item">
                      <dt className="article-facts-label">{f.label}</dt>
                      <dd className="article-facts-value">{f.value}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            ) : null}

            <div className="article-toc" aria-label="On this page">
              <h2 className="article-toc-title">On this page</h2>
              <ul className="article-toc-list">
                {sectionToc.map((s) => (
                  <li key={s.id}>
                    <a className="article-toc-link" href={`#${s.id}`}>
                      {s.heading}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {hasChecklist ? (
              <section id="checklist" className="article-section article-checklist" aria-label="Preparation checklist">
                <h2>{article.checklist?.title || 'Preparation checklist'}</h2>
                <p>
                  Use this checklist to prepare. To download as a PDF, choose “Save as PDF” in the print dialog.
                </p>
                <ul>
                  {article.checklist?.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <button type="button" className="navbar-cta article-checklist-print" onClick={onPrintChecklist}>
                  <span>Print / Save as PDF</span>
                  <span className="navbar-cta-icon" aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </span>
                </button>
              </section>
            ) : null}

            {article.sections.map((section) => {
              const id = safeId(section.id || section.heading);
              return (
                <section key={id} id={id} className="article-section">
                  <h2>{section.heading}</h2>
                  {section.blocks.map((b, idx) => {
                    if (b.type === 'p') return <p key={idx}>{b.text}</p>;
                    if (b.type === 'h3') return <h3 key={idx}>{b.text}</h3>;
                    if (b.type === 'ul')
                      return (
                        <ul key={idx}>
                          {b.items.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      );
                    if (b.type === 'img')
                      return (
                        <figure key={idx} className="article-figure">
                          <img
                            src={b.src}
                            alt={b.alt}
                            loading="lazy"
                            decoding="async"
                            className="article-figure-img"
                          />
                          {b.caption ? <figcaption className="article-figure-caption">{b.caption}</figcaption> : null}
                        </figure>
                      );
                    if (b.type === 'video')
                      return (
                        <figure key={idx} className="article-figure">
                          <video
                            className="article-figure-img"
                            controls
                            preload="none"
                            playsInline
                            aria-label={b.title}
                            poster={b.poster}
                          >
                            <source
                              src={b.src.includes('.av1.mp4') ? b.src : b.src.replace(/\.(h264\.)?mp4$|\.mov$/i, '.av1.mp4')}
                              type='video/mp4; codecs="av01.0.05M.08"'
                            />
                            <source
                              src={b.src.includes('.h264.mp4') ? b.src : b.src.replace(/\.(av1\.)?mp4$|\.mov$/i, '.h264.mp4')}
                              type='video/mp4; codecs="avc1.42E01E"'
                            />
                          </video>
                          {b.caption ? <figcaption className="article-figure-caption">{b.caption}</figcaption> : null}
                        </figure>
                      );
                    return null;
                  })}
                </section>
              );
            })}

            {hasFaq ? (
              <section className="article-section" aria-label="Frequently asked questions">
                <h2>FAQs</h2>
                {article.faq?.map((item) => (
                  <React.Fragment key={item.question}>
                    <h3>{item.question}</h3>
                    <p>{item.answer}</p>
                  </React.Fragment>
                ))}
              </section>
            ) : null}

            <section className="article-section" aria-label="References">
              <h2>References</h2>
              <ul>
                {article.references.map((r) => (
                  <li key={r.url}>
                    <a className="article-inline-link" href={r.url} target="_blank" rel="noopener noreferrer">
                      {r.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            <section className="article-author" aria-label="Author information">
              <h2>About the author</h2>
              <div className="article-author-card">
                <div className="article-author-body">
                  <p className="article-author-name">{article.author.name}</p>
                  <p className="article-author-role">{article.author.role}</p>
                  <p className="article-author-bio">{article.author.bio}</p>
                </div>
              </div>
            </section>

            <section className="article-comments" aria-label="Comments">
              <h2>Comments</h2>
              <p className="article-comments-note" aria-live="polite">
                Comments are stored on this device.
              </p>

              <form className="article-comments-form" onSubmit={onSubmitComment} aria-label="Add a comment">
                <div className="article-form-row">
                  <label htmlFor="comment-name" className="article-form-label">
                    Name
                  </label>
                  <input
                    id="comment-name"
                    className="article-form-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                    required
                    minLength={2}
                    aria-describedby={formError ? formErrorId : undefined}
                  />
                </div>

                <div className="article-form-row">
                  <label htmlFor="comment-message" className="article-form-label">
                    Comment
                  </label>
                  <textarea
                    id="comment-message"
                    className="article-form-textarea"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    required
                    minLength={10}
                    aria-describedby={formError ? formErrorId : undefined}
                  />
                </div>

                {formError ? (
                  <p id={formErrorId} className="article-form-error" role="alert">
                    {formError}
                  </p>
                ) : null}

                <button type="submit" className="article-form-submit">
                  Post comment
                </button>
              </form>

              {comments.length === 0 ? (
                <p className="article-comments-empty" role="status">
                  No comments yet.
                </p>
              ) : (
                <ul className="article-comments-list" aria-label="Posted comments">
                  {comments.map((c) => (
                    <li key={c.id} className="article-comment">
                      <div className="article-comment-head">
                        <p className="article-comment-name">{c.name}</p>
                        <p className="article-comment-date">{formatDate(c.createdAtISO)}</p>
                      </div>
                      <p className="article-comment-message">{c.message}</p>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </article>

          <aside className="article-sidebar" aria-label="Related content">
            <div className="article-sidebar-card">
              <h2 className="article-sidebar-title">Related articles</h2>
              <ul className="article-sidebar-list">
                {related.map((a) => (
                  <li key={a.slug}>
                    <Link to={`/blog/${a.slug}`} className="article-sidebar-link">
                      {a.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="article-sidebar-card">
              <h2 className="article-sidebar-title">Categories</h2>
              <ul className="article-sidebar-list" aria-label="Blog categories">
                {categories.map((c) => (
                  <li key={c}>
                    <Link
                      to={`/blog?category=${encodeURIComponent(c)}`}
                      className="article-sidebar-link"
                      state={{ from: location.pathname }}
                    >
                      {c}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default BlogArticlePage;
