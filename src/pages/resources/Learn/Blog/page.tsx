import React, { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
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
  searchText: string;
};

function formatDate(dateISO: string) {
  const date = new Date(dateISO);
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

function monthYearLabel(dateISO: string) {
  const date = new Date(dateISO);
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long' });
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

function buildSearchText(article: (typeof blogArticles)[number]) {
  let text = `${article.title} ${article.description} ${article.category} ${article.tags.join(' ')} ${article.author.name} ${article.author.role}`;
  article.sections.forEach((s) => {
    text += ` ${s.heading}`;
    s.blocks.forEach((b) => {
      if (b.type === 'p' || b.type === 'h3') text += ` ${b.text}`;
      if (b.type === 'ul') text += ` ${b.items.join(' ')}`;
    });
  });
  return text.toLowerCase();
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
  const contentId = useId();
  const sidebarPrefix = useId();
  const drawerPrefix = useId();
  const articlesRef = useRef<HTMLElement | null>(null);
  const mobileDrawerCloseRef = useRef<HTMLButtonElement | null>(null);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [isPaging, setIsPaging] = useState(false);

  const urlQuery = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get('q') || '';
  }, [location.search]);
  const normalizedQuery = urlQuery.trim().toLowerCase();

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
      searchText: buildSearchText(a),
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

  const allTags = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [posts]);

  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const rawCategory = searchParams.get('category') || 'All';
  const category = categories.includes(rawCategory) ? rawCategory : 'All';
  const rawTags = searchParams.get('tags') || '';
  const selectedTagsKey = rawTags
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean)
    .join(',');
  const selectedTags = useMemo(() => {
    const list = rawTags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
    const set = new Set<string>();
    list.forEach((t) => {
      if (allTags.includes(t)) set.add(t);
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [allTags, rawTags]);
  const dateFrom = searchParams.get('from') || '';
  const dateTo = searchParams.get('to') || '';
  const rawPerPage = searchParams.get('perPage');
  const parsedPerPage = rawPerPage ? Number(rawPerPage) : 10;
  const safeItemsPerPage = [10, 20, 50].includes(parsedPerPage) ? parsedPerPage : 10;
  const rawPage = searchParams.get('page');
  const parsedPage = rawPage ? Number(rawPage) : 1;
  const requestedPage = Number.isFinite(parsedPage) ? Math.max(1, Math.floor(parsedPage)) : 1;

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

  const updateSearch = useCallback(
    (mutate: (params: URLSearchParams) => void, options: { replace?: boolean } = {}) => {
      const params = new URLSearchParams(location.search);
      mutate(params);
      const nextSearch = normalizeSearchParams(params);
      const currentSearch = normalizeSearchParams(new URLSearchParams(location.search));
      if (nextSearch !== currentSearch) {
        navigate(
          { pathname: location.pathname, search: nextSearch ? `?${nextSearch}` : '' },
          { replace: Boolean(options.replace) },
        );
      }
    },
    [location.pathname, location.search, navigate],
  );

  const [queryState, setQueryState] = useState<{
    items: BlogPost[];
    isLoading: boolean;
    error: string | null;
  }>({ items: posts, isLoading: false, error: null });
  const queryRequestRef = useRef(0);

  useEffect(() => {
    const requestId = (queryRequestRef.current += 1);
    setQueryState((prev) => ({ ...prev, isLoading: true, error: null }));

    const timer = window.setTimeout(() => {
      try {
        const tagSet = new Set(selectedTags);
        const fromTsRaw = dateFrom ? Date.parse(dateFrom) : Number.NaN;
        const toTsRaw = dateTo ? Date.parse(dateTo) : Number.NaN;
        const fromTs = Number.isFinite(fromTsRaw) ? fromTsRaw : null;
        const toTs = Number.isFinite(toTsRaw) ? toTsRaw : null;
        const hasQuery = normalizedQuery.length > 0;

        const next = posts
          .filter((p) => (category === 'All' ? true : p.category === category))
          .filter((p) => {
            if (tagSet.size === 0) return true;
            return p.tags.some((t) => tagSet.has(t));
          })
          .filter((p) => {
            if (!fromTs && !toTs) return true;
            const ts = Date.parse(p.dateISO);
            if (!Number.isFinite(ts)) return false;
            if (fromTs && ts < fromTs) return false;
            if (toTs && ts > toTs) return false;
            return true;
          })
          .filter((p) => {
            if (!hasQuery) return true;
            return p.searchText.includes(normalizedQuery);
          })
          .sort((a, b) => b.dateISO.localeCompare(a.dateISO));

        if (requestId !== queryRequestRef.current) return;
        setQueryState({ items: next, isLoading: false, error: null });
      } catch {
        if (requestId !== queryRequestRef.current) return;
        setQueryState({ items: [], isLoading: false, error: 'Unable to load articles.' });
      }
    }, 150);

    return () => window.clearTimeout(timer);
  }, [category, dateFrom, dateTo, normalizedQuery, posts, selectedTagsKey]);

  const totalResults = queryState.items.length;
  const totalPages = totalResults > 0 ? Math.ceil(totalResults / safeItemsPerPage) : 0;
  const safeCurrentPage = totalPages > 0 ? clampNumber(requestedPage, 1, totalPages) : 1;

  useEffect(() => {
    if (queryState.isLoading || queryState.error) return;

    updateSearch(
      (params) => {
        if (safeItemsPerPage === 10) params.delete('perPage');
        else params.set('perPage', String(safeItemsPerPage));

        if (safeCurrentPage <= 1) params.delete('page');
        else params.set('page', String(safeCurrentPage));

        if (!urlQuery.trim()) params.delete('q');

        if (category === 'All') params.delete('category');
        else params.set('category', category);

        if (selectedTags.length === 0) params.delete('tags');
        else params.set('tags', selectedTags.join(','));

        if (!dateFrom) params.delete('from');
        else params.set('from', dateFrom);

        if (!dateTo) params.delete('to');
        else params.set('to', dateTo);
      },
      { replace: true },
    );
  }, [
    category,
    dateFrom,
    dateTo,
    queryState.error,
    queryState.isLoading,
    safeCurrentPage,
    safeItemsPerPage,
    selectedTags,
    updateSearch,
    urlQuery,
  ]);

  const pageSlice = useMemo(() => {
    if (totalResults === 0) return [];
    const start = (safeCurrentPage - 1) * safeItemsPerPage;
    const end = start + safeItemsPerPage;
    return queryState.items.slice(start, end);
  }, [queryState.items, safeCurrentPage, safeItemsPerPage, totalResults]);

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
    if (next === safeCurrentPage) return;
    setIsPaging(true);
    updateSearch(
      (params) => {
        if (next <= 1) params.delete('page');
        else params.set('page', String(next));
      },
      { replace: false },
    );
    schedulePagingDone();
  };

  const onItemsPerPageChange = (next: number) => {
    const desired = [10, 20, 50].includes(next) ? next : 10;
    if (desired === safeItemsPerPage) return;
    setIsPaging(true);
    updateSearch(
      (params) => {
        if (desired === 10) params.delete('perPage');
        else params.set('perPage', String(desired));
        params.delete('page');
      },
      { replace: false },
    );
    schedulePagingDone();
  };

  const toggleTag = (tag: string) => {
    updateSearch(
      (params) => {
        const existing = (params.get('tags') || '')
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean);
        const set = new Set(existing);
        if (set.has(tag)) set.delete(tag);
        else set.add(tag);
        const nextTags = Array.from(set)
          .filter((t) => allTags.includes(t))
          .sort((a, b) => a.localeCompare(b));
        if (nextTags.length === 0) params.delete('tags');
        else params.set('tags', nextTags.join(','));
        params.delete('page');
      },
      { replace: false },
    );
  };

  const clearFilters = () => {
    updateSearch(
      (params) => {
        params.delete('q');
        params.delete('category');
        params.delete('tags');
        params.delete('from');
        params.delete('to');
        params.delete('page');
      },
      { replace: false },
    );
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

  const renderSidebarBody = (prefix: string) => {
    return (
      <>
      <div className="blog-sidebar-header">
        <h2 className="blog-sidebar-title">Browse</h2>
        <button
          type="button"
          className="blog-sidebar-clear-btn"
          onClick={clearFilters}
          aria-label="Clear filters"
          disabled={!normalizedQuery && category === 'All' && !dateFrom && !dateTo && selectedTags.length === 0}
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
                updateSearch(
                  (params) => {
                    if (c === 'All') params.delete('category');
                    else params.set('category', c);
                    params.delete('page');
                  },
                  { replace: false },
                );
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
                    updateSearch(
                      (params) => {
                        params.set('from', `${a.key}-01`);
                        params.set('to', endOfMonthISO(a.key));
                        params.delete('page');
                      },
                      { replace: false },
                    );
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
  };

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

  const isBusy = isPaging || queryState.isLoading;

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
            disabled={!normalizedQuery && category === 'All' && !dateFrom && !dateTo && selectedTags.length === 0}
          >
            Clear
          </button>
        </div>

        <div className="blog-layout">
          <aside className="blog-sidebar" aria-label="Blog sidebar">
            <div className="blog-sidebar-sticky">
              {renderSidebarBody(sidebarPrefix)}
            </div>
          </aside>

          <div className="blog-main">
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
              aria-busy={isBusy}
            >
              <header className="blog-section-head blog-section-head-row">
                <div>
                  <h2 className="blog-section-title">All articles</h2>
                  <p className="blog-section-subtitle">
                    {totalResults} result{totalResults === 1 ? '' : 's'}
                    {normalizedQuery ? ` for “${urlQuery.trim()}”` : ''}
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

              {isBusy ? (
                <p className="blog-pagination-status" role="status" aria-live="polite">
                  Loading…
                </p>
              ) : null}

              {queryState.error ? (
                <div className="blog-empty" role="status" aria-live="polite">
                  <h3 className="blog-empty-title">Something went wrong</h3>
                  <p className="blog-empty-body">{queryState.error}</p>
                  <button type="button" className="blog-cta" onClick={clearFilters} aria-label="Clear filters">
                    Clear filters
                  </button>
                </div>
              ) : totalResults === 0 ? (
                <div className="blog-empty" role="status" aria-live="polite">
                  <h3 className="blog-empty-title">No matches found</h3>
                  <p className="blog-empty-body">Clear filters to see more articles.</p>
                  <button type="button" className="blog-cta" onClick={clearFilters} aria-label="Clear filters">
                    Clear filters
                  </button>
                </div>
              ) : pageSlice.length > 20 ? (
                <VirtualBlogGrid posts={pageSlice} isLoading={isBusy} />
              ) : (
                <div className={isBusy ? 'blog-cardGrid blog-cardGrid-loading' : 'blog-cardGrid'} role="list">
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
                isLoading={isBusy}
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
              <div className="blog-drawer-sections">{renderSidebarBody(drawerPrefix)}</div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default BlogPage;
