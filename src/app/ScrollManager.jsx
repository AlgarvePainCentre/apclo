import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { createLenis } from './lenis';

export default function ScrollManager() {
  const location = useLocation();
  const lenisRef = useRef(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);
    updatePreference();

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', updatePreference);
      return () => mediaQuery.removeEventListener('change', updatePreference);
    }

    mediaQuery.addListener(updatePreference);
    return () => mediaQuery.removeListener(updatePreference);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (prefersReducedMotion) return;

    // GSAP (~45KB gz) is only needed for smooth scroll / ScrollTrigger, and
    // only when motion is allowed. Load it on demand so it stays out of the
    // initial bundle for every route.
    let cancelled = false;
    let cleanup = null;

    (async () => {
      const { ensureGsapPlugins, gsap, ScrollTrigger } = await import('./gsap');
      if (cancelled) return;

      ensureGsapPlugins();
      const lenis = createLenis();
      lenisRef.current = lenis;

      const onLenisScroll = () => ScrollTrigger.update();
      lenis.on?.('scroll', onLenisScroll);

      const tick = (time) => {
        lenis.raf(time * 1000);
      };

      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      ScrollTrigger.refresh();

      cleanup = () => {
        gsap.ticker.remove(tick);
        lenis.off?.('scroll', onLenisScroll);
        lenisRef.current = null;
        try {
          lenis.destroy();
        } catch {}
        ScrollTrigger.refresh();
      };
    })();

    return () => {
      cancelled = true;
      if (cleanup) cleanup();
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const lenis = lenisRef.current;
    if (location.hash) {
      const elementId = decodeURIComponent(location.hash.slice(1));
      // The target can render a few frames late (lazy routes), and it should
      // land below the fixed navbar rather than under it. Images and reveals
      // above it keep changing the page height for a moment after arrival, so
      // the position is corrected while that settles, until the visitor
      // scrolls or 2.5s pass.
      let frame = 0;
      let rafId = 0;
      let settled = false;
      let settleWatcher = null;
      let settleTimer = 0;
      const stopSettling = () => {
        settled = true;
        settleWatcher?.disconnect();
        window.clearTimeout(settleTimer);
        ['wheel', 'touchstart', 'keydown', 'pointerdown'].forEach((type) =>
          window.removeEventListener(type, stopSettling),
        );
      };
      const scrollToTarget = (immediate) => {
        const targetElement = document.getElementById(elementId);
        if (!targetElement) return false;
        const header = document.querySelector('header.navbar');
        const offset = (header ? header.getBoundingClientRect().height : 0) + 16;
        const currentLenis = lenisRef.current;
        if (currentLenis && typeof currentLenis.scrollTo === 'function') {
          currentLenis.scrollTo(targetElement, { offset: -offset, immediate });
        } else {
          const top = targetElement.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: immediate ? 'auto' : 'smooth' });
        }
        return true;
      };
      const start = () => {
        if (!scrollToTarget(prefersReducedMotion)) {
          if (frame < 60) {
            frame += 1;
            rafId = window.requestAnimationFrame(start);
          }
          return;
        }
        ['wheel', 'touchstart', 'keydown', 'pointerdown'].forEach((type) =>
          window.addEventListener(type, stopSettling, { passive: true }),
        );
        // Pinned scroll sections add space without resizing <body>, so check
        // where the target actually is rather than waiting for a resize.
        const check = () => {
          if (settled) return;
          const targetElement = document.getElementById(elementId);
          const header = document.querySelector('header.navbar');
          const wanted = (header ? header.getBoundingClientRect().height : 0) + 16;
          if (targetElement && Math.abs(targetElement.getBoundingClientRect().top - wanted) > 4) {
            scrollToTarget(true);
          }
        };
        const intervalId = window.setInterval(check, 150);
        settleWatcher = { disconnect: () => window.clearInterval(intervalId) };
        settleTimer = window.setTimeout(stopSettling, 2500);
      };
      start();
      return () => {
        window.cancelAnimationFrame(rafId);
        stopSettling();
      };
    }

    if (lenis && typeof lenis.scrollTo === 'function') {
      lenis.scrollTo(0, { immediate: true });
      return;
    }
    window.scrollTo(0, 0);
  }, [location.pathname, location.search, location.hash, prefersReducedMotion]);

  return null;
}
