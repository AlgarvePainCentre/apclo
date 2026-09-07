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
      const targetElement = document.getElementById(elementId);

      if (!targetElement) return;

      if (lenis && typeof lenis.scrollTo === 'function') {
        lenis.scrollTo(targetElement, { immediate: prefersReducedMotion });
        return;
      }

      targetElement.scrollIntoView({ block: 'start', behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      return;
    }

    if (lenis && typeof lenis.scrollTo === 'function') {
      lenis.scrollTo(0, { immediate: true });
      return;
    }
    window.scrollTo(0, 0);
  }, [location.pathname, location.search, location.hash, prefersReducedMotion]);

  return null;
}
