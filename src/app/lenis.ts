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
    lerp: options.lerp ?? 0.1,
    wheelMultiplier: options.wheelMultiplier ?? 1,
    touchMultiplier: options.touchMultiplier ?? 1,
  });
}
