import { useEffect, useMemo } from 'react';
import { preloaders } from '../routes';
import { matchPath } from 'react-router-dom';

export function usePreloadForPathname() {
  return useMemo(() => {
    const cache = new Map();
    return async (pathname) => {
      if (!pathname || typeof pathname !== 'string') return;
      if (cache.has(pathname)) return cache.get(pathname);

      const match = preloaders.find((entry) => matchPath({ path: entry.path, end: true }, pathname));
      if (!match) return;

      const p = Promise.resolve()
        .then(() => match.preload())
        .catch((err) => {
          cache.delete(pathname);
          throw err;
        });

      cache.set(pathname, p);
      return p;
    };
  }, []);
}

export default function PrefetchManager() {
  const preloadForPathname = usePreloadForPathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const w = window;
    w.__apcPreloadRoute = (to) => {
      try {
        const url = typeof to === 'string' ? new URL(to, w.location.origin) : null;
        if (!url || url.origin !== w.location.origin) return;
        return preloadForPathname(url.pathname);
      } catch {
        return;
      }
    };

    const conn = w.navigator?.connection;
    const saveData = Boolean(conn && conn.saveData);
    const effectiveType = conn && typeof conn.effectiveType === 'string' ? conn.effectiveType : '';
    const shouldPrefetchOnIdle = !saveData && !/2g/.test(effectiveType);

    const prefetchTimers = new WeakMap();

    const maybePrefetch = (rawHref) => {
      if (!rawHref || rawHref.startsWith('mailto:') || rawHref.startsWith('tel:')) return;
      let url;
      try {
        url = new URL(rawHref, w.location.origin);
      } catch {
        return;
      }
      if (url.origin !== w.location.origin) return;
      preloadForPathname(url.pathname);
    };

    const onPointerOver = (e) => {
      if (e && typeof e.pointerType === 'string' && e.pointerType === 'touch') return;
      const target = e.target;
      if (!(target instanceof Element)) return;
      const a = target.closest('a[href]');
      if (!a) return;
      if (a.getAttribute('target') === '_blank') return;

      const existing = prefetchTimers.get(a);
      if (existing) w.clearTimeout(existing);

      const t = w.setTimeout(() => {
        prefetchTimers.delete(a);
        maybePrefetch(a.getAttribute('href'));
      }, 80);
      prefetchTimers.set(a, t);
    };

    const onFocusIn = (e) => {
      const target = e.target;
      if (!(target instanceof Element)) return;
      const a = target.closest('a[href]');
      if (!a) return;
      if (a.getAttribute('target') === '_blank') return;
      maybePrefetch(a.getAttribute('href'));
    };

    document.addEventListener('pointerover', onPointerOver, true);
    document.addEventListener('focusin', onFocusIn, true);

    let idleId = null;
    const idle = (cb) => {
      if (!shouldPrefetchOnIdle) return null;
      if (typeof w.requestIdleCallback === 'function') return w.requestIdleCallback(cb, { timeout: 2500 });
      return w.setTimeout(cb, 1800);
    };
    idleId = idle(() => {
      preloadForPathname('/contact');
      preloadForPathname('/about');
      preloadForPathname('/blog');
    });

    return () => {
      document.removeEventListener('pointerover', onPointerOver, true);
      document.removeEventListener('focusin', onFocusIn, true);
      if (idleId) {
        if (typeof w.cancelIdleCallback === 'function') w.cancelIdleCallback(idleId);
        else w.clearTimeout(idleId);
      }
      try {
        delete w.__apcPreloadRoute;
      } catch {}
    };
  }, [preloadForPathname]);

  return null;
}
