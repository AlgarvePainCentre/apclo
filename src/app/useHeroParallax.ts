import { useLayoutEffect, type RefObject } from 'react';
import { ensureGsapPlugins, gsap } from './gsap';

type HeroParallaxOptions = {
  rootRef: RefObject<HTMLElement | null>;
  mediaRef?: RefObject<HTMLElement | null>;
  contentRef?: RefObject<HTMLElement | null>;
  mediaY?: number;
  contentYDesktop?: number;
  contentYMobile?: number;
};

function prefersReducedMotion() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return true;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function useHeroParallax({
  rootRef,
  mediaRef,
  contentRef,
  mediaY = -90,
  contentYDesktop = -42,
  contentYMobile = -24,
}: HeroParallaxOptions) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return undefined;

    ensureGsapPlugins();

    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      const createTween = (target: HTMLElement | null | undefined, y: number) => {
        if (!target) return;

        gsap.set(target, { willChange: 'transform' });
        gsap.fromTo(
          target,
          { y: 0 },
          {
            y,
            ease: 'none',
            scrollTrigger: {
              trigger: root,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      };

      mm.add('(max-width: 768px)', () => {
        createTween(contentRef?.current, contentYMobile);
        createTween(mediaRef?.current, mediaY * 0.5);
      });

      mm.add('(min-width: 769px)', () => {
        createTween(contentRef?.current, contentYDesktop);
        createTween(mediaRef?.current, mediaY);
      });
    }, root);

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, [contentRef, contentYDesktop, contentYMobile, mediaRef, mediaY, rootRef]);
}
