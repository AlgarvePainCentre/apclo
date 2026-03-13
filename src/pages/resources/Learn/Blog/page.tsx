import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Blog.css';
import { blogArticles } from './articles';

type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  author: { name: string; role: string };
  readTimeMins: number;
  dateISO: string;
  featuredImage: { src: string; alt: string };
  to: string;
  isFeatured?: boolean;
};

type Suggestion =
  | { id: string; kind: 'title'; label: string; slug: string }
  | { id: string; kind: 'tag'; label: string; tag: string }
  | { id: string; kind: 'category'; label: string; category: string };

function formatDate(dateISO: string) {
  const date = new Date(dateISO);
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

function monthYearLabel(dateISO: string) {
  const date = new Date(dateISO);
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long' });
}

function clampQuery(raw: string) {
  if (raw.length <= 120) return raw;
  return raw.slice(0, 120);
}

function validateQuery(query: string) {
  const trimmed = query.trim();
  if (!trimmed) return '';
  if (trimmed.length > 120) return 'Search is limited to 120 characters.';
  const hasAlphaNumeric = /[A-Za-z0-9]/.test(trimmed);
  if (!hasAlphaNumeric) return 'Please enter letters or numbers to search.';
  return '';
}

function estimateReadTimeMinsFromText(text: string) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(2, Math.round(words / 200));
}

function estimateReadTimeMins(article: (typeof blogArticles)[number]) {
  let text = `${article.title} ${article.description}`;
  article.sections.forEach((s) => {
    text += ` ${s.heading}`;
    s.blocks.forEach((b) => {
      if (b.type === 'p' || b.type === 'h3') text += ` ${b.text}`;
      if (b.type === 'ul') text += ` ${b.items.join(' ')}`;
    });
  });
  return estimateReadTimeMinsFromText(text);
}

const getMeta = (name: string) => document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
const setMeta = (name: string, content: string) => {
  let meta = getMeta(name);
  if (!meta) {
    meta = document.createElement('meta');
    meta.name = name;
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

type PaginationToken = number | 'ellipsis';

function clampNumber(value: number, min: number, max: number) {
  if (!Number.isFinite(value)) return min;
  return Math.min(Math.max(value, min), max);
}

function buildPaginationTokens(totalPages: number, currentPage: number, windowSize = 5): PaginationToken[] {
  if (totalPages <= 0) return [];
  if (totalPages <= windowSize + 2) return Array.from({ length: totalPages }, (_, i) => i + 1);

  const safeCurrent = clampNumber(currentPage, 1, totalPages);
  const side = Math.floor(windowSize / 2);
  let start = Math.max(2, safeCurrent - side);
  let end = Math.min(totalPages - 1, safeCurrent + side);

  const windowCount = end - start + 1;
  if (windowCount < windowSize) {
    const needed = windowSize - windowCount;
    start = Math.max(2, start - needed);
    end = Math.min(totalPages - 1, end + needed);
  }

  const tokens: PaginationToken[] = [1];
  if (start > 2) tokens.push('ellipsis');
  for (let p = start; p <= end; p += 1) tokens.push(p);
  if (end < totalPages - 1) tokens.push('ellipsis');
  tokens.push(totalPages);
  return tokens;
}

function normalizeSearchParams(params: URLSearchParams) {
  const entries = Array.from(params.entries()).sort(([aK, aV], [bK, bV]) => {
    const keyCmp = aK.localeCompare(bK);
    if (keyCmp !== 0) return keyCmp;
    return aV.localeCompare(bV);
  });
  const normalized = new URLSearchParams();
  entries.forEach(([k, v]) => normalized.append(k, v));
  return normalized.toString();
}

type PaginationProps = {
  totalItems: number;
  currentPage: number;
  itemsPerPage?: number;
  onPageChange: (nextPage: number) => void;
  onItemsPerPageChange?: (nextItemsPerPage: number) => void;
  isLoading?: boolean;
  scrollToTop?: () => void;
};

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  currentPage,
  itemsPerPage = 10,
  onPageChange,
  onItemsPerPageChange,
  isLoading,
  scrollToTop,
}) => {
  const safeItemsPerPage = Math.max(1, Math.floor(itemsPerPage));
  const totalPages = totalItems > 0 ? Math.ceil(totalItems / safeItemsPerPage) : 0;
  const safeCurrent = totalPages > 0 ? clampNumber(currentPage, 1, totalPages) : 1;

  useEffect(() => {
    if (totalPages > 0 && safeCurrent !== currentPage) onPageChange(safeCurrent);
    if (totalPages === 0 && currentPage !== 1) onPageChange(1);
  }, [currentPage, safeCurrent, totalPages, onPageChange]);

  const tokens = useMemo(() => buildPaginationTokens(totalPages, safeCurrent, 5), [totalPages, safeCurrent]);

  const startIndex = totalItems === 0 ? 0 : (safeCurrent - 1) * safeItemsPerPage + 1;
  const endIndex = totalItems === 0 ? 0 : Math.min(totalItems, safeCurrent * safeItemsPerPage);

  const goTo = (next: number) => {
    if (isLoading) return;
    if (totalPages <= 0) return;
    const clamped = clampNumber(next, 1, totalPages);
    if (clamped === safeCurrent) return;
    onPageChange(clamped);
    if (scrollToTop) scrollToTop();
  };

  return (
    <div className="blog-pagination" aria-label="Pagination">
      <div className="blog-pagination-summary" aria-live="polite">
        {totalItems === 0 ? '0 articles' : `Showing ${startIndex}–${endIndex} of ${totalItems} articles`}
      </div>

      <div className="blog-pagination-controls">
        {onItemsPerPageChange ? (
          <label className="blog-pagination-perPage">
            <span className="blog-pagination-perPageLabel">Per page</span>
            <select
              className="blog-pagination-perPageSelect"
              value={safeItemsPerPage}
              onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
              aria-label="Items per page"
              disabled={Boolean(isLoading)}
            >
              {[10, 20, 50].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </label>
        ) : null}

        <nav
          className="blog-pagination-nav"
          aria-label="Blog pages"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') {
              e.preventDefault();
              goTo(safeCurrent - 1);
            } else if (e.key === 'ArrowRight') {
              e.preventDefault();
              goTo(safeCurrent + 1);
            } else if (e.key === 'Home') {
              e.preventDefault();
              goTo(1);
            } else if (e.key === 'End') {
              e.preventDefault();
              goTo(totalPages);
            }
          }}
        >
          <button
            type="button"
            className="blog-pagination-btn"
            onClick={() => goTo(safeCurrent - 1)}
            disabled={Boolean(isLoading) || totalPages <= 1 || safeCurrent <= 1}
            aria-label="Previous page"
          >
            Previous
          </button>

          <ol className="blog-pagination-list" aria-label="Page numbers">
            {tokens.map((t, idx) => {
              if (t === 'ellipsis') {
                return (
                  <li key={`e-${idx}`} className="blog-pagination-ellipsis" aria-hidden="true">
                    …
                  </li>
                );
              }
              const active = t === safeCurrent;
              return (
                <li key={t}>
                  <button
                    type="button"
                    className={active ? 'blog-pagination-page blog-pagination-page-active' : 'blog-pagination-page'}
                    onClick={() => goTo(t)}
                    aria-label={`Page ${t}`}
                    aria-current={active ? 'page' : undefined}
                    disabled={Boolean(isLoading) || active}
                  >
                    {t}
                  </button>
                </li>
              );
            })}
          </ol>

          <button
            type="button"
            className="blog-pagination-btn"
            onClick={() => goTo(safeCurrent + 1)}
            disabled={Boolean(isLoading) || totalPages <= 1 || safeCurrent >= totalPages}
            aria-label="Next page"
          >
            Next
          </button>
        </nav>
      </div>
    </div>
  );
};

const BlogCardCompact: React.FC<{ post: BlogPost }> = ({ post }) => (
  <article className="blog-card blog-card-compact" role="listitem">
    <div className="blog-card-media">
      <img
        src={post.featuredImage.src}
        alt={post.featuredImage.alt}
        loading="lazy"
        decoding="async"
        className="blog-card-img"
      />
    </div>
    <div className="blog-card-body">
      <p className="blog-card-meta">
        <span className="blog-pill">{post.category}</span>
        <span aria-hidden="true"> · </span>
        <span>{formatDate(post.dateISO)}</span>
        <span aria-hidden="true"> · </span>
        <span>{post.readTimeMins} min read</span>
      </p>
      <h3 className="blog-card-title">{post.title}</h3>
      <p className="blog-card-excerpt">{post.excerpt}</p>
      <div className="blog-card-footer">
        <p className="blog-card-author">
          <span className="blog-author-name">{post.author.name}</span>
          <span className="blog-author-role">{post.author.role}</span>
        </p>
        <Link className="blog-readMore" to={post.to} aria-label={`Read more: ${post.title}`}>
          Read More <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  </article>
);

const VirtualBlogGrid: React.FC<{ posts: BlogPost[]; isLoading?: boolean }> = ({ posts, isLoading }) => {
  const outerRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const [columns, setColumns] = useState(1);
  const [range, setRange] = useState({ start: 0, end: posts.length });

  useEffect(() => {
    const el = gridRef.current;
    if (!el || typeof window === 'undefined') return;

    const computeColumns = () => {
      const computed = window.getComputedStyle(el).gridTemplateColumns;
      const next = computed.split(' ').filter(Boolean).length;
      setColumns(Math.max(1, next));
    };

    computeColumns();
    window.addEventListener('resize', computeColumns);
    return () => {
      window.removeEventListener('resize', computeColumns);
    };
  }, []);

  useEffect(() => {
    if (posts.length === 0) {
      setRange({ start: 0, end: 0 });
      return;
    }
    const rowHeight = columns === 1 ? 440 : 380;
    const overscanRows = 2;
    const rowCount = Math.ceil(posts.length / columns);

    let raf = 0;
    const compute = () => {
      raf = 0;
      const container = outerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const viewportTop = 0;
      const viewportBottom = window.innerHeight;
      const startRow = clampNumber(Math.floor((viewportTop - rect.top) / rowHeight) - overscanRows, 0, rowCount - 1);
      const endRow = clampNumber(Math.floor((viewportBottom - rect.top) / rowHeight) + overscanRows, 0, rowCount - 1);
      const start = startRow * columns;
      const end = Math.min(posts.length, (endRow + 1) * columns);
      setRange({ start, end });
    };

    const onScrollOrResize = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize);
    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, [posts, columns]);

  const visible = useMemo(() => posts.slice(range.start, range.end), [posts, range.start, range.end]);
  const rowHeight = columns === 1 ? 440 : 380;
  const rowCount = columns > 0 ? Math.ceil(posts.length / columns) : 0;
  const totalHeight = rowCount * rowHeight;
  const offsetY = Math.floor(range.start / columns) * rowHeight;

  return (
    <div
      ref={outerRef}
      className={isLoading ? 'blog-cardGridVirtual blog-cardGrid-loading' : 'blog-cardGridVirtual'}
      style={{ height: totalHeight }}
      aria-label="Articles list"
    >
      <div style={{ transform: `translateY(${offsetY}px)` }}>
        <div ref={gridRef} className="blog-cardGrid" role="list">
          {visible.map((p) => (
            <BlogCardCompact key={p.slug} post={p} />
          ))}
        </div>
      </div>
    </div>
  );
};

const BlogPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const listboxId = useId();
  const contentId = useId();
  const articlesRef = useRef<HTMLElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const suggestionRef = useRef<HTMLDivElement | null>(null);
  const mobileDrawerCloseRef = useRef<HTMLButtonElement | null>(null);

  const [query, setQuery] = useState('');
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const [isSuggestOpen, setIsSuggestOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isPaging, setIsPaging] = useState(false);

  const [category, setCategory] = useState<string>('All');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const queryError = validateQuery(query);
  const dateError =
    dateFrom && dateTo && new Date(dateFrom).getTime() > new Date(dateTo).getTime()
      ? 'Start date must be before end date.'
      : '';

  const posts = useMemo<BlogPost[]>(() => {
    const sorted = [...blogArticles].sort(
      (a, b) => new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime()
    );
    return sorted.map((a, idx) => ({
      slug: a.slug,
      title: a.title,
      excerpt: a.description,
      category: a.category,
      tags: a.tags,
      author: { name: a.author.name, role: a.author.role },
      readTimeMins: estimateReadTimeMins(a),
      dateISO: a.dateISO,
      featuredImage: { src: a.coverImage.src, alt: a.coverImage.alt },
      to: `/blog/${a.slug}`,
      isFeatured: idx < 3,
    }));
  }, []);

  useEffect(() => {
    document.title = 'Blog | Algarve Pain Centre';
    setMeta(
      'description',
      'Clinically grounded articles on pain medicine, sports medicine, and stroke rehabilitation. Browse evidence-informed guidance and practical next steps.'
    );
    setMeta('robots', 'index,follow');
    setCanonical(`${window.location.origin}/blog`);
  }, []);

  const categories = useMemo(() => {
    const all = Array.from(new Set(posts.map((p) => p.category))).sort((a, b) => a.localeCompare(b));
    return ['All', ...all];
  }, [posts]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const nextCategory = params.get('category');
    if (!nextCategory) {
      setCategory('All');
      return;
    }
    if (categories.includes(nextCategory)) {
      setCategory(nextCategory);
    }
  }, [categories, location.search]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const rawPerPage = params.get('perPage');
    const rawPage = params.get('page');

    const parsedPerPage = rawPerPage ? Number(rawPerPage) : 10;
    const nextPerPage = [10, 20, 50].includes(parsedPerPage) ? parsedPerPage : 10;
    setItemsPerPage(nextPerPage);

    const parsedPage = rawPage ? Number(rawPage) : 1;
    setCurrentPage(Number.isFinite(parsedPage) ? Math.max(1, Math.floor(parsedPage)) : 1);
  }, [location.search]);

  const allTags = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [posts]);

  const archives = useMemo(() => {
    const map = new Map<string, { key: string; label: string; count: number }>();
    posts.forEach((p) => {
      const key = p.dateISO.slice(0, 7);
      const existing = map.get(key);
      if (existing) {
        existing.count += 1;
      } else {
        map.set(key, { key, label: monthYearLabel(p.dateISO), count: 1 });
      }
    });
    return Array.from(map.values()).sort((a, b) => b.key.localeCompare(a.key));
  }, [posts]);

  const featured = useMemo(() => posts.filter((p) => p.isFeatured).slice(0, 3), [posts]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const hasQuery = q.length > 0 && !queryError;
    const tagSet = new Set(selectedTags);
    const fromTs = dateFrom ? new Date(dateFrom).getTime() : null;
    const toTs = dateTo ? new Date(dateTo).getTime() : null;

    return posts
      .filter((p) => (category === 'All' ? true : p.category === category))
      .filter((p) => {
        if (tagSet.size === 0) return true;
        return p.tags.some((t) => tagSet.has(t));
      })
      .filter((p) => {
        if (!fromTs && !toTs) return true;
        const ts = new Date(p.dateISO).getTime();
        if (fromTs && ts < fromTs) return false;
        if (toTs && ts > toTs) return false;
        return true;
      })
      .filter((p) => {
        if (!hasQuery) return true;
        const haystack = `${p.title} ${p.excerpt} ${p.category} ${p.tags.join(' ')}`.toLowerCase();
        return haystack.includes(q);
      })
      .sort((a, b) => b.dateISO.localeCompare(a.dateISO));
  }, [posts, query, queryError, category, dateFrom, dateTo, selectedTags]);

  const totalResults = filtered.length;
  const safeItemsPerPage = [10, 20, 50].includes(itemsPerPage) ? itemsPerPage : 10;
  const totalPages = totalResults > 0 ? Math.ceil(totalResults / safeItemsPerPage) : 0;
  const safeCurrentPage = totalPages > 0 ? clampNumber(currentPage, 1, totalPages) : 1;

  useEffect(() => {
    if (safeCurrentPage !== currentPage) setCurrentPage(safeCurrentPage);
  }, [currentPage, safeCurrentPage]);

  const filterKey = useMemo(() => {
    const tags = [...selectedTags].sort((a, b) => a.localeCompare(b)).join(',');
    return `${query.trim()}|${category}|${dateFrom}|${dateTo}|${tags}`;
  }, [query, category, dateFrom, dateTo, selectedTags]);

  const prevFilterKeyRef = useRef<string | null>(null);
  useEffect(() => {
    if (prevFilterKeyRef.current === null) {
      prevFilterKeyRef.current = filterKey;
      return;
    }
    if (prevFilterKeyRef.current !== filterKey) {
      prevFilterKeyRef.current = filterKey;
      setCurrentPage(1);
    }
  }, [filterKey]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const desiredPage = safeCurrentPage <= 1 ? null : String(safeCurrentPage);
    const desiredPerPage = safeItemsPerPage === 10 ? null : String(safeItemsPerPage);

    if (desiredPage) params.set('page', desiredPage);
    else params.delete('page');

    if (desiredPerPage) params.set('perPage', desiredPerPage);
    else params.delete('perPage');

    const nextSearch = normalizeSearchParams(params);
    const currentSearch = normalizeSearchParams(new URLSearchParams(location.search));
    if (nextSearch !== currentSearch) {
      navigate(
        { pathname: location.pathname, search: nextSearch ? `?${nextSearch}` : '' },
        { replace: true }
      );
    }
  }, [location.pathname, location.search, navigate, safeCurrentPage, safeItemsPerPage]);

  const pageSlice = useMemo(() => {
    if (totalResults === 0) return [];
    const start = (safeCurrentPage - 1) * safeItemsPerPage;
    const end = start + safeItemsPerPage;
    return filtered.slice(start, end);
  }, [filtered, safeCurrentPage, safeItemsPerPage, totalResults]);

  const suggestions = useMemo<Suggestion[]>(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2 || queryError) return [];

    const byTitle = posts
      .filter((p) => p.title.toLowerCase().includes(q))
      .slice(0, 6)
      .map((p) => ({ id: `t:${p.slug}`, kind: 'title' as const, label: p.title, slug: p.slug }));

    const byTags = allTags
      .filter((t) => t.toLowerCase().includes(q))
      .slice(0, 6)
      .map((t) => ({ id: `g:${t}`, kind: 'tag' as const, label: `Tag: ${t}`, tag: t }));

    const byCategory = categories
      .filter((c) => c !== 'All')
      .filter((c) => c.toLowerCase().includes(q))
      .slice(0, 4)
      .map((c) => ({
        id: `c:${c}`,
        kind: 'category' as const,
        label: `Category: ${c}`,
        category: c,
      }));

    return [...byTitle, ...byTags, ...byCategory].slice(0, 8);
  }, [query, queryError, posts, allTags, categories]);

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const scrollToArticles = () => {
    const el = articlesRef.current;
    if (el) el.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
  };

  const schedulePagingDone = () => {
    window.setTimeout(() => setIsPaging(false), 220);
  };

  const onPageChange = (nextPage: number) => {
    const next = Math.max(1, Math.floor(nextPage));
    if (next === currentPage) return;
    setIsPaging(true);
    setCurrentPage(next);
    schedulePagingDone();
  };

  const onItemsPerPageChange = (next: number) => {
    const desired = [10, 20, 50].includes(next) ? next : 10;
    if (desired === safeItemsPerPage) return;
    setIsPaging(true);
    setItemsPerPage(desired);
    setCurrentPage(1);
    schedulePagingDone();
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => {
      const set = new Set(prev);
      if (set.has(tag)) set.delete(tag);
      else set.add(tag);
      return Array.from(set);
    });
  };

  const clearFilters = () => {
    setQuery('');
    setCategory('All');
    setDateFrom('');
    setDateTo('');
    setSelectedTags([]);
    setActiveSuggestion(-1);
    setIsSuggestOpen(false);
    if (inputRef.current) inputRef.current.focus();
  };

  const endOfMonthISO = (yearMonth: string) => {
    const [y, m] = yearMonth.split('-').map((v) => Number(v));
    const end = new Date(y, m, 0);
    const yyyy = end.getFullYear();
    const mm = String(end.getMonth() + 1).padStart(2, '0');
    const dd = String(end.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const afterSidebarAction = () => {
    if (sidebarOpen) setSidebarOpen(false);
    scrollToArticles();
  };

  const onSelectSuggestion = (s: Suggestion) => {
    if (s.kind === 'title') {
      const post = posts.find((p) => p.slug === s.slug);
      if (post) {
        navigate(post.to);
        return;
      }
    }
    if (s.kind === 'tag') {
      toggleTag(s.tag);
    }
    if (s.kind === 'category') {
      setCategory(s.category);
    }
    setIsSuggestOpen(false);
    setActiveSuggestion(-1);
    scrollToArticles();
  };

  const sidebarBody = (
    <>
      <div className="blog-sidebar-header">
        <h2 className="blog-sidebar-title">Browse</h2>
        <button
          type="button"
          className="blog-sidebar-clear-btn"
          onClick={clearFilters}
          aria-label="Clear search and filters"
          disabled={!query && category === 'All' && !dateFrom && !dateTo && selectedTags.length === 0}
        >
          Clear
        </button>
      </div>

      <details className="blog-sidebar-section" open>
        <summary>Categories</summary>
        <div className="blog-sidebar-section-body" role="group" aria-label="Categories">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              className={c === category ? 'blog-chip blog-chip-active' : 'blog-chip'}
              onClick={() => {
                setCategory(c);
                afterSidebarAction();
              }}
              aria-pressed={c === category}
            >
              {c}
              <span className="blog-chip-count" aria-hidden="true">
                {c === 'All' ? posts.length : posts.filter((p) => p.category === c).length}
              </span>
            </button>
          ))}
        </div>
      </details>

      <details className="blog-sidebar-section" open>
        <summary>Popular tags</summary>
        <div className="blog-sidebar-section-body" role="group" aria-label="Tags">
          {allTags.slice(0, 16).map((t) => {
            const active = selectedTags.includes(t);
            return (
              <button
                key={t}
                type="button"
                className={active ? 'blog-tag blog-tag-active' : 'blog-tag'}
                onClick={() => {
                  toggleTag(t);
                  afterSidebarAction();
                }}
                aria-pressed={active}
              >
                {t}
              </button>
            );
          })}
        </div>
      </details>

      <details className="blog-sidebar-section">
        <summary>Recent posts</summary>
        <div className="blog-sidebar-section-body">
          <ul className="blog-recent-list">
            {posts
              .slice()
              .sort((a, b) => b.dateISO.localeCompare(a.dateISO))
              .slice(0, 4)
              .map((p) => (
                <li key={p.slug} className="blog-recent-item">
                  <Link
                    className="blog-recent-link"
                    to={p.to}
                    aria-label={`Read ${p.title}`}
                    onClick={() => {
                      if (sidebarOpen) setSidebarOpen(false);
                    }}
                  >
                    <span className="blog-recent-title">{p.title}</span>
                    <span className="blog-recent-meta">{formatDate(p.dateISO)}</span>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </details>

      <details className="blog-sidebar-section">
        <summary>Archive</summary>
        <div className="blog-sidebar-section-body">
          <ul className="blog-archive-list" aria-label="Archive by month and year">
            {archives.map((a) => (
              <li key={a.key}>
                <button
                  type="button"
                  className="blog-archive-btn"
                  onClick={() => {
                    setDateFrom(`${a.key}-01`);
                    setDateTo(endOfMonthISO(a.key));
                    afterSidebarAction();
                  }}
                >
                  <span>{a.label}</span>
                  <span className="blog-archive-count" aria-hidden="true">
                    {a.count}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </details>
    </>
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!sidebarOpen) return;
      if (e.key === 'Escape') setSidebarOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [sidebarOpen]);

  useEffect(() => {
    if (!sidebarOpen) return;
    if (mobileDrawerCloseRef.current) mobileDrawerCloseRef.current.focus();
  }, [sidebarOpen]);

  useEffect(() => {
    const onPointerDown = (e: MouseEvent) => {
      if (!isSuggestOpen) return;
      const target = e.target as Node | null;
      if (!target) return;
      if (suggestionRef.current && suggestionRef.current.contains(target)) return;
      if (inputRef.current && inputRef.current.contains(target as Node)) return;
      setIsSuggestOpen(false);
      setActiveSuggestion(-1);
    };
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, [isSuggestOpen]);

  return (
    <main className="blog-page">
      <a className="blog-skip-link" href={`#${contentId}`}>
        Skip to blog content
      </a>

      <header className="blog-hero" aria-label="Blog hero section">
        <div className="blog-hero-inner">
          <p className="blog-hero-eyebrow">Learn</p>
          <h1 className="blog-hero-title">Clinically grounded insights, built for real life</h1>
          <p className="blog-hero-subtitle">
            Explore guides on pain, recovery, and performance—written to help you take the next right step.
          </p>
          <div className="blog-hero-actions">
            <button type="button" className="blog-cta" onClick={scrollToArticles} aria-label="Explore articles">
              Explore articles
            </button>
            <button
              type="button"
              className="blog-cta blog-cta-secondary"
              onClick={() => navigate('/contact')}
              aria-label="Book an appointment"
            >
              Book an appointment
            </button>
          </div>
        </div>
        <div className="blog-hero-backdrop" aria-hidden="true" />
      </header>

      <section className="blog-shell" id={contentId}>
        <div className="blog-mobile-sidebar-row">
          <button
            type="button"
            className="blog-mobile-sidebar-toggle"
            aria-label="Open blog filters"
            aria-expanded={sidebarOpen}
            onClick={() => setSidebarOpen(true)}
          >
            Filters
          </button>
          <button
            type="button"
            className="blog-mobile-sidebar-toggle blog-mobile-sidebar-clear"
            aria-label="Clear blog filters"
            onClick={clearFilters}
            disabled={!query && category === 'All' && !dateFrom && !dateTo && selectedTags.length === 0}
          >
            Clear
          </button>
        </div>

        <div className="blog-layout">
          <aside className="blog-sidebar" aria-label="Blog sidebar">
            <div className="blog-sidebar-sticky">
              {sidebarBody}
            </div>
          </aside>

          <div className="blog-main">
            <section className="blog-search" aria-label="Search and filters">
              <div className="blog-search-card">
                <form
                  className="blog-search-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    scrollToArticles();
                  }}
                >
                  <label className="blog-label" htmlFor="blog-search-input">
                    Search articles
                  </label>
                  <div className="blog-search-inputRow">
                    <div className="blog-search-inputWrap">
                      <input
                        id="blog-search-input"
                        ref={inputRef}
                        value={query}
                        onChange={(e) => {
                          const next = clampQuery(e.target.value);
                          setQuery(next);
                          setIsSuggestOpen(next.trim().length >= 2);
                          setActiveSuggestion(-1);
                        }}
                        onFocus={() => {
                          if (query.trim().length >= 2) setIsSuggestOpen(true);
                        }}
                        onKeyDown={(e) => {
                          if (!isSuggestOpen || suggestions.length === 0) return;
                          if (e.key === 'ArrowDown') {
                            e.preventDefault();
                            setActiveSuggestion((i) => Math.min(i + 1, suggestions.length - 1));
                          } else if (e.key === 'ArrowUp') {
                            e.preventDefault();
                            setActiveSuggestion((i) => Math.max(i - 1, 0));
                          } else if (e.key === 'Enter') {
                            if (activeSuggestion >= 0) {
                              e.preventDefault();
                              onSelectSuggestion(suggestions[activeSuggestion]);
                            }
                          } else if (e.key === 'Escape') {
                            setIsSuggestOpen(false);
                            setActiveSuggestion(-1);
                          }
                        }}
                        className="blog-search-input"
                        placeholder="Try “cervical”, “sleep”, “stress”…"
                        role="combobox"
                        aria-autocomplete="list"
                        aria-expanded={isSuggestOpen && suggestions.length > 0}
                        aria-controls={listboxId}
                        aria-activedescendant={
                          activeSuggestion >= 0 ? suggestions[activeSuggestion]?.id : undefined
                        }
                      />
                      {query && (
                        <button
                          type="button"
                          className="blog-search-clear"
                          aria-label="Clear search query"
                          onClick={() => {
                            setQuery('');
                            setIsSuggestOpen(false);
                            setActiveSuggestion(-1);
                            if (inputRef.current) inputRef.current.focus();
                          }}
                        >
                          ×
                        </button>
                      )}
                    </div>
                    <button
                      type="submit"
                      className="blog-search-submit"
                      aria-label="Search blog posts"
                      disabled={Boolean(queryError || dateError)}
                    >
                      Search
                    </button>
                  </div>

                  {queryError && <p className="blog-field-error">{queryError}</p>}
                  {dateError && <p className="blog-field-error">{dateError}</p>}

                  {isSuggestOpen && suggestions.length > 0 && (
                    <div className="blog-suggest" ref={suggestionRef}>
                      <div id={listboxId} role="listbox" className="blog-suggest-list" aria-label="Suggestions">
                        {suggestions.map((s, idx) => (
                          <button
                            key={s.id}
                            id={s.id}
                            type="button"
                            role="option"
                            aria-selected={idx === activeSuggestion}
                            className={idx === activeSuggestion ? 'blog-suggest-item blog-suggest-item-active' : 'blog-suggest-item'}
                            onMouseEnter={() => setActiveSuggestion(idx)}
                            onClick={() => onSelectSuggestion(s)}
                          >
                            <span className="blog-suggest-label">{s.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="blog-filters" aria-label="Filters">
                    <div className="blog-filter">
                      <label className="blog-filter-label" htmlFor="blog-category">
                        Category
                      </label>
                      <select
                        id="blog-category"
                        className="blog-select"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        {categories.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="blog-filter">
                      <label className="blog-filter-label" htmlFor="blog-from">
                        From
                      </label>
                      <input
                        id="blog-from"
                        type="date"
                        className="blog-date"
                        value={dateFrom}
                        onChange={(e) => setDateFrom(e.target.value)}
                      />
                    </div>

                    <div className="blog-filter">
                      <label className="blog-filter-label" htmlFor="blog-to">
                        To
                      </label>
                      <input
                        id="blog-to"
                        type="date"
                        className="blog-date"
                        value={dateTo}
                        onChange={(e) => setDateTo(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="blog-tagRow" aria-label="Tag filters">
                    {Array.from(new Set([...selectedTags, ...allTags.slice(0, 12)])).map((t) => {
                      const active = selectedTags.includes(t);
                      return (
                        <button
                          key={t}
                          type="button"
                          className={active ? 'blog-tag blog-tag-active' : 'blog-tag'}
                          aria-pressed={active}
                          onClick={() => toggleTag(t)}
                        >
                          {t}
                        </button>
                      );
                    })}
                  </div>
                </form>
              </div>
            </section>

            <section className="blog-featured" aria-label="Featured learning articles">
              <header className="blog-section-head">
                <h2 className="blog-section-title">Featured learning articles</h2>
                <p className="blog-section-subtitle">
                  Start here for the most-read guides from our clinical team.
                </p>
              </header>

              <div className="blog-cardGrid blog-cardGrid-featured" role="list">
                {featured.map((p) => (
                  <article key={p.slug} className="blog-card" role="listitem">
                    <div className="blog-card-media">
                      <img
                        src={p.featuredImage.src}
                        alt={p.featuredImage.alt}
                        loading="lazy"
                        decoding="async"
                        className="blog-card-img"
                      />
                    </div>
                    <div className="blog-card-body">
                      <p className="blog-card-meta">
                        <span className="blog-pill">{p.category}</span>
                        <span aria-hidden="true"> · </span>
                        <span>{formatDate(p.dateISO)}</span>
                        <span aria-hidden="true"> · </span>
                        <span>{p.readTimeMins} min read</span>
                      </p>
                      <h3 className="blog-card-title">{p.title}</h3>
                      <p className="blog-card-excerpt">{p.excerpt}</p>
                      <div className="blog-card-footer">
                        <p className="blog-card-author">
                          <span className="blog-author-name">{p.author.name}</span>
                          <span className="blog-author-role">{p.author.role}</span>
                        </p>
                        <Link className="blog-readMore" to={p.to} aria-label={`Read more: ${p.title}`}>
                          Read More <span aria-hidden="true">→</span>
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section
              className="blog-results"
              ref={(el) => {
                articlesRef.current = el;
              }}
              aria-label="All articles"
              aria-busy={isPaging}
            >
              <header className="blog-section-head blog-section-head-row">
                <div>
                  <h2 className="blog-section-title">All articles</h2>
                  <p className="blog-section-subtitle">
                    {totalResults} result{totalResults === 1 ? '' : 's'}
                    {query.trim() ? ` for “${query.trim()}”` : ''}
                    {totalPages > 1 ? ` · Page ${safeCurrentPage} of ${totalPages}` : ''}
                  </p>
                </div>
                <button
                  type="button"
                  className="blog-miniCta"
                  onClick={scrollToArticles}
                  aria-label="Scroll to results"
                >
                  Jump to results
                </button>
              </header>

              {isPaging ? (
                <p className="blog-pagination-status" role="status" aria-live="polite">
                  Loading…
                </p>
              ) : null}

              {totalResults === 0 ? (
                <div className="blog-empty" role="status" aria-live="polite">
                  <h3 className="blog-empty-title">No matches found</h3>
                  <p className="blog-empty-body">Try a different keyword or clear filters to see more articles.</p>
                  <button type="button" className="blog-cta" onClick={clearFilters} aria-label="Clear filters">
                    Clear filters
                  </button>
                </div>
              ) : pageSlice.length > 20 ? (
                <VirtualBlogGrid posts={pageSlice} isLoading={isPaging} />
              ) : (
                <div className={isPaging ? 'blog-cardGrid blog-cardGrid-loading' : 'blog-cardGrid'} role="list">
                  {pageSlice.map((p) => (
                    <BlogCardCompact key={p.slug} post={p} />
                  ))}
                </div>
              )}

              <Pagination
                totalItems={totalResults}
                currentPage={safeCurrentPage}
                itemsPerPage={safeItemsPerPage}
                onPageChange={onPageChange}
                onItemsPerPageChange={onItemsPerPageChange}
                isLoading={isPaging}
                scrollToTop={scrollToArticles}
              />
            </section>
          </div>
        </div>
      </section>

      {sidebarOpen && (
        <div className="blog-drawerOverlay" role="presentation" onClick={() => setSidebarOpen(false)}>
          <div
            className="blog-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Blog filters"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="blog-drawer-head">
              <h2 className="blog-drawer-title">Filters</h2>
              <button
                type="button"
                className="blog-drawer-close"
                ref={mobileDrawerCloseRef}
                onClick={() => setSidebarOpen(false)}
                aria-label="Close filters"
              >
                Close
              </button>
            </div>

            <div className="blog-drawer-body">
              <div className="blog-drawer-actions">
                <button type="button" className="blog-cta blog-cta-secondary" onClick={clearFilters}>
                  Clear filters
                </button>
                <button
                  type="button"
                  className="blog-cta"
                  onClick={() => {
                    setSidebarOpen(false);
                    scrollToArticles();
                  }}
                >
                  Show results
                </button>
              </div>
              <div className="blog-drawer-sections">{sidebarBody}</div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default BlogPage;
