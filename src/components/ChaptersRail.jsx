import { useEffect, useRef, useState } from 'react';

/*
 * Shared "chapters" rail: scroll-spy (active chapter + progress fill) with a
 * manual sticky (native position:sticky is broken by the site's Lenis smooth
 * scroll). Used by the speciality and treatment templates so both are one system.
 *
 * Usage:
 *   const { activeCh, shellRef, tocRef } = useChaptersRail(chapters);
 *   <div className="stpl-shell" ref={shellRef}>
 *     <ChaptersRailNav chapters={chapters} activeCh={activeCh} tocRef={tocRef} />
 *     <div className="stpl-main"> ...sections with matching ids... </div>
 *   </div>
 *
 * `chapters` = [{ id, label }]; each id must match a section id in the main column.
 */
export function useChaptersRail(chapters) {
  const chapterKey = chapters.map((c) => c.id).join('|');
  const [activeCh, setActiveCh] = useState(0);
  const shellRef = useRef(null);
  const tocRef = useRef(null);

  // Scroll-spy: highlight the topmost section crossing the upper band.
  useEffect(() => {
    const ids = chapterKey.split('|');
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!els.length) return undefined;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          const idx = ids.indexOf(visible[0].target.id);
          if (idx >= 0) setActiveCh(idx);
        }
      },
      { rootMargin: '-18% 0px -72% 0px', threshold: 0 },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [chapterKey]);

  // Manual sticky — keep the rail 104px from the top, clamped within the shell.
  useEffect(() => {
    const shell = shellRef.current;
    const toc = tocRef.current;
    if (!shell || !toc) return undefined;
    const TOP = 104;
    let raf = 0;
    const update = () => {
      raf = 0;
      if (window.innerWidth <= 1024) {
        toc.style.transform = '';
        return;
      }
      const s = shell.getBoundingClientRect();
      const max = Math.max(0, s.height - toc.offsetHeight);
      const t = Math.min(Math.max(0, TOP - s.top), max);
      toc.style.transform = `translateY(${t}px)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [chapterKey]);

  // Anchor the track + fill to the actual dot centres (items can wrap).
  useEffect(() => {
    const toc = tocRef.current;
    const list = toc?.querySelector('.stpl-toc-list');
    if (!list) return undefined;
    const measure = () => {
      const dots = Array.from(list.querySelectorAll('.stpl-toc-dot'));
      if (dots.length < 2) return;
      const listTop = list.getBoundingClientRect().top;
      const centres = dots.map((dt) => {
        const r = dt.getBoundingClientRect();
        return r.top - listTop + r.height / 2;
      });
      const first = centres[0];
      const last = centres[centres.length - 1];
      list.style.setProperty('--line-top', `${first}px`);
      list.style.setProperty('--line-height', `${last - first}px`);
      const idx = Math.min(activeCh, centres.length - 1);
      list.style.setProperty('--fill-px', `${centres[idx] - first}px`);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [activeCh, chapterKey]);

  return { activeCh, shellRef, tocRef };
}

export function ChaptersRailNav({ chapters, activeCh, tocRef, label = 'Chapters' }) {
  return (
    <nav className="stpl-toc" aria-label="On this page" ref={tocRef}>
      <p className="stpl-toc-label">{label}</p>
      <ul className="stpl-toc-list">
        {chapters.map((c, i) => (
          <li key={c.id} className={`stpl-toc-item${i === activeCh ? ' is-active' : ''}${i < activeCh ? ' is-done' : ''}`}>
            <a
              href={`#${c.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(c.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
            >
              <span className="stpl-toc-dot" aria-hidden="true" />
              <span className="stpl-toc-name">{c.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
