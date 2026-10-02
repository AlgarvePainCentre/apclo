import Lenis from 'lenis';

export type CreateLenisOptions = {
  smoothWheel?: boolean;
  smoothTouch?: boolean;
  lerp?: number;
  wheelMultiplier?: number;
  touchMultiplier?: number;
};

export function createLenis(options: CreateLenisOptions = {}) {
  return new Lenis({
    smoothWheel: options.smoothWheel ?? true,
    smoothTouch: options.smoothTouch ?? false,
    // Slightly snappier than Lenis' default 0.1 so the smooth scroll feels
    // responsive rather than floaty/laggy (a recurring "slow scroll" report).
    lerp: options.lerp ?? 0.12,
    wheelMultiplier: options.wheelMultiplier ?? 1,
    touchMultiplier: options.touchMultiplier ?? 1,
  });
}
