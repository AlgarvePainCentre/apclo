import { ensureGsapPlugins, gsap, ScrollTrigger } from '../../../app/gsap';

type Cleanup = () => void;
type StepState = 'past' | 'current' | 'upcoming';

type StepElements = {
  cards: HTMLElement[];
  marker: HTMLElement;
  line: HTMLElement;
  progress: HTMLElement;
};

type RedLineTarget = {
  host: HTMLElement;
  animatee: HTMLElement;
  kind: 'element' | 'pseudo';
  sequenceIndex: number;
};

const AUTOPLAY_KEY = 'apc_steps_timeline_autoplay_v1';
const MOBILE_CAROUSEL_QUERY = '(max-width: 768px)';
const DESKTOP_QUERY = '(min-width: 768px)';
const WIDE_QUERY = '(min-width: 1024px)';
const FINE_POINTER_QUERY = '(pointer: fine)';
const RED_LINE_SCALE_VAR = '--treatment-red-line-scale';
const RED_LINE_OPACITY_VAR = '--treatment-red-line-opacity';
const BENEFITS_CAROUSEL_ID_PREFIX = 'treatment-benefits-carousel';
const RED_LINE_GROUP_SELECTOR =
  '.minimally-invasive-treatment-details-grid, [role="list"], [class$="-benefits-grid"], [class$="-aftercare-panel"], [class$="-steps-grid"], section';
const RED_LINE_PSEUDO_SELECTOR = [
  "[class$='-step-title']",
  "[class$='-aftercare-item-title']",
  "[class$='-expect-item-title']",
  "[class$='-benefit-title']",
  "[class$='-condition-title']",
  '.minimally-invasive-treatment-card-title',
  '.treatment-details__card-title',
].join(', ');
const RED_LINE_ELEMENT_SELECTOR = [
  '.treatments-feature-accent',
  '.treatments-overview-card-accent',
  '.treatments-approach-card-accent',
  '.pain-learn-accent',
  '.st-benefits-divider',
].join(', ');

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function matchesQuery(query: string): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
  return window.matchMedia(query).matches;
}

function supportsRedLineAnimation(): boolean {
  if (typeof window === 'undefined' || typeof CSS === 'undefined' || typeof CSS.supports !== 'function') return true;
  return CSS.supports('transform', 'scaleX(0.5)') && CSS.supports('transform-origin', 'left center');
}

function throttle(callback: () => void, wait = 140): () => void {
  let timeoutId: number | null = null;
  let lastRun = 0;

  return () => {
    const now = Date.now();
    const remaining = wait - (now - lastRun);

    if (remaining <= 0) {
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
        timeoutId = null;
      }

      lastRun = now;
      callback();
      return;
    }

    if (timeoutId !== null) return;

    timeoutId = window.setTimeout(() => {
      timeoutId = null;
      lastRun = Date.now();
      callback();
    }, remaining);
  };
}

function addMediaQueryListener(query: MediaQueryList, listener: () => void): Cleanup {
  if (typeof query.addEventListener === 'function') {
    query.addEventListener('change', listener);
    return () => query.removeEventListener('change', listener);
  }

  query.addListener(listener);
  return () => query.removeListener(listener);
}

function getStepsGrids(scope: ParentNode): HTMLElement[] {
  const candidates = Array.from(scope.querySelectorAll<HTMLElement>('div'));
  return candidates.filter((el) => Array.from(el.classList).some((className) => className.endsWith('-steps-grid')));
}

function getCards(grid: HTMLElement): HTMLElement[] {
  return Array.from(grid.querySelectorAll<HTMLElement>('article')).filter((el) =>
    Array.from(el.classList).some((className) => className.endsWith('-step-card')),
  );
}

function getBenefitsGrids(scope: ParentNode): HTMLElement[] {
  return Array.from(scope.querySelectorAll<HTMLElement>('div')).filter((el) => {
    const hasGridClass = Array.from(el.classList).some((className) => className.endsWith('-benefits-grid'));
    if (!hasGridClass) return false;

    return Array.from(el.children).some((child) => child instanceof HTMLElement && child.tagName === 'ARTICLE');
  });
}

function compareDomOrder(a: HTMLElement, b: HTMLElement) {
  if (a === b) return 0;
  const position = a.compareDocumentPosition(b);
  if (position & Node.DOCUMENT_POSITION_FOLLOWING) return -1;
  if (position & Node.DOCUMENT_POSITION_PRECEDING) return 1;
  return 0;
}

function getRedLineGroup(target: HTMLElement): HTMLElement {
  return target.closest<HTMLElement>(RED_LINE_GROUP_SELECTOR) ?? target.parentElement ?? target;
}

function hasPseudoRedLine(target: HTMLElement): boolean {
  const style = window.getComputedStyle(target, '::after');
  return style.content !== 'none' && style.display !== 'none' && parseFloat(style.width) > 0 && parseFloat(style.height) > 0;
}

function hasVisibleRedLine(target: HTMLElement): boolean {
  const style = window.getComputedStyle(target);
  return style.display !== 'none' && style.visibility !== 'hidden' && parseFloat(style.width) > 0 && parseFloat(style.height) > 0;
}

function getRedLineStart(sequenceIndex: number): string {
  const base = matchesQuery(WIDE_QUERY) ? 88 : matchesQuery(DESKTOP_QUERY) ? 91 : 94;
  return `top ${Math.max(58, base - sequenceIndex * 4)}%`;
}

function getRedLineEnd(sequenceIndex: number): string {
  const base = matchesQuery(WIDE_QUERY) ? 64 : matchesQuery(DESKTOP_QUERY) ? 68 : 72;
  return `bottom ${Math.max(32, base - sequenceIndex * 2)}%`;
}

function getRedLineTargets(scope: ParentNode): RedLineTarget[] {
  if (typeof window === 'undefined') return [];

  const groupedTargets = new Map<HTMLElement, RedLineTarget[]>();
  const pushTarget = (target: RedLineTarget) => {
    const group = getRedLineGroup(target.host);
    const entries = groupedTargets.get(group) ?? [];
    entries.push(target);
    groupedTargets.set(group, entries);
  };

  const pseudoSeen = new Set<HTMLElement>();
  Array.from(scope.querySelectorAll<HTMLElement>(RED_LINE_PSEUDO_SELECTOR)).forEach((target) => {
    if (pseudoSeen.has(target) || !hasPseudoRedLine(target)) return;
    pseudoSeen.add(target);
    pushTarget({ host: target, animatee: target, kind: 'pseudo', sequenceIndex: 0 });
  });

  const lineSeen = new Set<HTMLElement>();
  Array.from(scope.querySelectorAll<HTMLElement>(RED_LINE_ELEMENT_SELECTOR)).forEach((target) => {
    if (lineSeen.has(target) || !hasVisibleRedLine(target)) return;
    lineSeen.add(target);
    pushTarget({ host: target, animatee: target, kind: 'element', sequenceIndex: 0 });
  });

  const ordered: RedLineTarget[] = [];
  groupedTargets.forEach((targets) => {
    targets
      .sort((a, b) => compareDomOrder(a.host, b.host))
      .forEach((target, index) => {
        target.sequenceIndex = index;
        ordered.push(target);
      });
  });

  return ordered.sort((a, b) => compareDomOrder(a.host, b.host));
}

function getLineLeftPx(): number {
  return matchesQuery(DESKTOP_QUERY) ? 28 : 24;
}

function injectProgressElements(grid: HTMLElement): StepElements | null {
  const cards = getCards(grid);
  if (cards.length === 0) return null;

  const existing = grid.querySelector<HTMLElement>(':scope > .treatment-steps-progress');
  if (existing) {
    const marker = existing.querySelector<HTMLElement>('.treatment-steps-marker');
    const line = existing.querySelector<HTMLElement>('.treatment-steps-line');
    const progress = existing.querySelector<HTMLElement>('.treatment-steps-line-progress');
    if (marker && line && progress) return { cards, marker, line, progress };
  }

  const wrapper = document.createElement('div');
  wrapper.className = 'treatment-steps-progress';
  wrapper.setAttribute('aria-hidden', 'true');

  const line = document.createElement('div');
  line.className = 'treatment-steps-line';

  const progress = document.createElement('div');
  progress.className = 'treatment-steps-line-progress';
  line.appendChild(progress);

  const marker = document.createElement('div');
  marker.className = 'treatment-steps-marker';

  wrapper.append(line, marker);
  grid.insertBefore(wrapper, grid.firstChild);

  return { cards, marker, line, progress };
}

function setStepState(card: HTMLElement, state: StepState) {
  card.dataset.stepState = state;
}

function setupHover(card: HTMLElement): Cleanup {
  if (typeof window === 'undefined' || prefersReducedMotion() || !matchesQuery(FINE_POINTER_QUERY)) {
    return () => {};
  }

  const onEnter = () => {
    gsap.to(card, { y: -4, duration: 0.22, ease: 'power2.out' });
  };

  const onLeave = () => {
    gsap.to(card, { y: 0, duration: 0.25, ease: 'power2.out' });
  };

  card.addEventListener('mouseenter', onEnter);
  card.addEventListener('mouseleave', onLeave);

  return () => {
    card.removeEventListener('mouseenter', onEnter);
    card.removeEventListener('mouseleave', onLeave);
  };
}

function setupEntrance(card: HTMLElement): ScrollTrigger | null {
  if (prefersReducedMotion()) {
    gsap.set(card, { clearProps: 'opacity,transform' });
    return null;
  }

  gsap.set(card, { autoAlpha: 0, y: 24, willChange: 'transform,opacity' });

  return ScrollTrigger.create({
    trigger: card,
    start: 'top 85%',
    onEnter: () => {
      gsap.to(card, { autoAlpha: 1, y: 0, duration: 0.55, ease: 'power2.out' });
    },
    onEnterBack: () => {
      gsap.to(card, { autoAlpha: 1, y: 0, duration: 0.45, ease: 'power2.out' });
    },
    onLeaveBack: () => {
      gsap.to(card, { autoAlpha: 0, y: 24, duration: 0.25, ease: 'power2.out' });
    },
  });
}

function setupStateTracker(cards: HTMLElement[]): ScrollTrigger[] {
  return cards.map((card) => {
    setStepState(card, 'upcoming');
    return ScrollTrigger.create({
      trigger: card,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => setStepState(card, 'current'),
      onEnterBack: () => setStepState(card, 'current'),
      onLeave: () => setStepState(card, 'past'),
      onLeaveBack: () => setStepState(card, 'upcoming'),
    });
  });
}

function setupProgress(grid: HTMLElement, elements: StepElements): ScrollTrigger | null {
  if (prefersReducedMotion()) {
    gsap.set(elements.progress, { scaleY: 1, transformOrigin: 'top' });
    gsap.set(elements.marker, { autoAlpha: 0 });
    return null;
  }

  gsap.set(elements.progress, { scaleY: 0, transformOrigin: 'top' });
  gsap.set(elements.marker, { autoAlpha: 1 });

  const markerHeight = 14;
  const update = (self: ScrollTrigger) => {
    const left = getLineLeftPx();
    elements.line.style.left = `${left}px`;
    elements.marker.style.left = `${left + 1}px`;

    const totalHeight = grid.scrollHeight;
    const markerY = Math.max(
      0,
      Math.min(totalHeight - markerHeight, self.progress * (totalHeight - markerHeight)),
    );

    gsap.set(elements.progress, { scaleY: self.progress });
    gsap.set(elements.marker, { y: markerY });
  };

  const computeSnapPoints = () => {
    const offsets = elements.cards.map((card) => card.offsetTop);
    const min = offsets[0] ?? 0;
    const max = offsets[offsets.length - 1] ?? 1;
    const span = max - min || 1;
    return offsets.map((offset) => (offset - min) / span);
  };

  return ScrollTrigger.create({
    trigger: grid,
    start: 'top 75%',
    end: 'bottom 25%',
    onUpdate: update,
    onRefresh: update,
    snap: matchesQuery(FINE_POINTER_QUERY)
      ? {
          snapTo: (value) => {
            const snap = gsap.utils.snap(computeSnapPoints());
            return snap(value);
          },
          duration: { min: 0.18, max: 0.45 },
          delay: 0.06,
          ease: 'power2.out',
        }
      : undefined,
  });
}

function setupAutoplay(grid: HTMLElement, cards: HTMLElement[]): Cleanup {
  if (prefersReducedMotion() || typeof window === 'undefined') return () => {};
  if (window.sessionStorage.getItem(AUTOPLAY_KEY)) return () => {};

  const rect = grid.getBoundingClientRect();
  const inView = rect.top < window.innerHeight * 0.9 && rect.bottom > window.innerHeight * 0.1;
  if (!inView) return () => {};

  const timeline = gsap.timeline({ paused: true });
  timeline.set(cards, { autoAlpha: 0, y: 24 });
  timeline.to(cards, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out', stagger: 0.12 });
  timeline.play(0);
  window.sessionStorage.setItem(AUTOPLAY_KEY, '1');

  const controls = document.createElement('div');
  controls.className = 'treatment-steps-controls';

  const pauseButton = document.createElement('button');
  pauseButton.type = 'button';
  pauseButton.className = 'treatment-steps-control';
  pauseButton.textContent = 'Pause';

  const restartButton = document.createElement('button');
  restartButton.type = 'button';
  restartButton.className = 'treatment-steps-control';
  restartButton.textContent = 'Restart';

  controls.append(pauseButton, restartButton);
  grid.appendChild(controls);

  const onPause = () => {
    if (timeline.paused()) {
      timeline.play();
      pauseButton.textContent = 'Pause';
      return;
    }

    timeline.pause();
    pauseButton.textContent = 'Play';
  };

  const onRestart = () => {
    timeline.restart(true);
    pauseButton.textContent = 'Pause';
  };

  pauseButton.addEventListener('click', onPause);
  restartButton.addEventListener('click', onRestart);

  return () => {
    pauseButton.removeEventListener('click', onPause);
    restartButton.removeEventListener('click', onRestart);
    controls.remove();
    timeline.kill();
  };
}

function easeInOutQuad(progress: number): number {
  return progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
}

function animateHorizontalScroll(container: HTMLElement, targetLeft: number, duration = 300): Cleanup {
  const startLeft = container.scrollLeft;
  const distance = targetLeft - startLeft;

  if (Math.abs(distance) < 1 || prefersReducedMotion()) {
    container.scrollLeft = targetLeft;
    return () => {};
  }

  let frameId = 0;
  let cancelled = false;
  const startTime = performance.now();

  const step = (now: number) => {
    if (cancelled) return;

    const progress = Math.min(1, (now - startTime) / duration);
    container.scrollLeft = startLeft + distance * easeInOutQuad(progress);

    if (progress < 1) {
      frameId = window.requestAnimationFrame(step);
    }
  };

  frameId = window.requestAnimationFrame(step);

  return () => {
    cancelled = true;
    window.cancelAnimationFrame(frameId);
  };
}

function setupBenefitsCarousel(grid: HTMLElement, gridIndex: number): Cleanup {
  const slides = Array.from(grid.querySelectorAll<HTMLElement>(':scope > article'));
  if (slides.length === 0 || typeof window === 'undefined') return () => {};

  const host = grid.parentElement;
  if (!host) return () => {};

  const label = grid.getAttribute('aria-label') ?? 'Treatment benefits';
  const carouselId = `${BENEFITS_CAROUSEL_ID_PREFIX}-${gridIndex}`;
  const originalGridId = grid.getAttribute('id');
  const gridId = originalGridId ?? carouselId;
  const createdSlideIds = new Set<string>();
  const slideIds = slides.map((slide, index) => {
    if (slide.id) return slide.id;
    const id = `${gridId}-slide-${index + 1}`;
    createdSlideIds.add(id);
    return id;
  });
  let activeIndex = 0;
  let scrollFrame: number | null = null;
  let cancelScrollAnimation: Cleanup | null = null;

  const controls = document.createElement('div');
  controls.className = 'treatment-benefits-carousel-controls';
  controls.setAttribute('aria-label', `${label} navigation`);
  controls.setAttribute('aria-hidden', slides.length <= 1 ? 'true' : 'false');

  const previousButton = document.createElement('button');
  previousButton.type = 'button';
  previousButton.className = 'treatment-benefits-carousel-button treatment-benefits-carousel-button--previous';
  previousButton.setAttribute('aria-controls', gridId);
  previousButton.setAttribute('aria-label', `Show previous ${label.toLowerCase()} item`);
  previousButton.innerHTML = '<span aria-hidden="true">‹</span>';

  const nextButton = document.createElement('button');
  nextButton.type = 'button';
  nextButton.className = 'treatment-benefits-carousel-button treatment-benefits-carousel-button--next';
  nextButton.setAttribute('aria-controls', gridId);
  nextButton.setAttribute('aria-label', `Show next ${label.toLowerCase()} item`);
  nextButton.innerHTML = '<span aria-hidden="true">›</span>';

  const status = document.createElement('p');
  status.className = 'treatment-benefits-carousel-status';
  status.setAttribute('aria-live', 'polite');
  status.setAttribute('aria-atomic', 'true');

  controls.append(previousButton, nextButton, status);
  host.insertBefore(controls, grid.nextSibling);

  grid.id = gridId;
  grid.classList.add('is-mobile-benefits-carousel');
  grid.setAttribute('aria-roledescription', 'carousel');
  grid.setAttribute('tabindex', '0');

  slides.forEach((slide, index) => {
    slide.classList.add('treatment-benefits-carousel-slide');
    slide.setAttribute('aria-roledescription', 'slide');
    slide.setAttribute('aria-label', `${index + 1} of ${slides.length}`);
    slide.id = slideIds[index];

    slide.querySelectorAll<HTMLImageElement>('img').forEach((image) => {
      image.loading = index === 0 ? 'eager' : 'lazy';
      image.decoding = 'async';
    });

    slide.querySelectorAll<HTMLIFrameElement>('iframe').forEach((iframe) => {
      iframe.loading = index <= 1 ? 'eager' : 'lazy';
    });
  });

  const updateActiveState = (nextIndex: number, focusSlide = false) => {
    activeIndex = Math.max(0, Math.min(slides.length - 1, nextIndex));
    const activeSlide = slides[activeIndex];
    if (!activeSlide) return;

    grid.style.height = `${activeSlide.offsetHeight}px`;
    status.textContent = `Slide ${activeIndex + 1} of ${slides.length}`;

    slides.forEach((slide, index) => {
      const isActive = index === activeIndex;
      slide.setAttribute('aria-hidden', isActive ? 'false' : 'true');
      slide.tabIndex = isActive ? 0 : -1;
    });

    previousButton.disabled = activeIndex === 0;
    nextButton.disabled = activeIndex === slides.length - 1;

    if (focusSlide) {
      activeSlide.focus({ preventScroll: true });
    }
  };

  const getNearestIndex = () => {
    let nearestIndex = 0;
    let smallestDelta = Number.POSITIVE_INFINITY;

    slides.forEach((slide, index) => {
      const delta = Math.abs(slide.offsetLeft - grid.scrollLeft);
      if (delta < smallestDelta) {
        smallestDelta = delta;
        nearestIndex = index;
      }
    });

    return nearestIndex;
  };

  const scrollToIndex = (nextIndex: number, focusSlide = false) => {
    const targetIndex = Math.max(0, Math.min(slides.length - 1, nextIndex));
    const targetSlide = slides[targetIndex];
    if (!targetSlide) return;

    cancelScrollAnimation?.();
    cancelScrollAnimation = animateHorizontalScroll(grid, targetSlide.offsetLeft, 300);
    updateActiveState(targetIndex, focusSlide);
  };

  const syncFromScroll = () => {
    scrollFrame = null;
    updateActiveState(getNearestIndex());
  };

  const onScroll = () => {
    if (scrollFrame !== null) return;
    scrollFrame = window.requestAnimationFrame(syncFromScroll);
  };

  const onPrevious = () => scrollToIndex(activeIndex - 1, true);
  const onNext = () => scrollToIndex(activeIndex + 1, true);
  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowRight' || event.key === 'PageDown') {
      event.preventDefault();
      scrollToIndex(activeIndex + 1, true);
    }

    if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
      event.preventDefault();
      scrollToIndex(activeIndex - 1, true);
    }

    if (event.key === 'Home') {
      event.preventDefault();
      scrollToIndex(0, true);
    }

    if (event.key === 'End') {
      event.preventDefault();
      scrollToIndex(slides.length - 1, true);
    }
  };

  previousButton.addEventListener('click', onPrevious);
  nextButton.addEventListener('click', onNext);
  grid.addEventListener('scroll', onScroll, { passive: true });
  grid.addEventListener('keydown', onKeyDown);

  const resizeObserver =
    typeof ResizeObserver === 'undefined'
      ? null
      : new ResizeObserver(() => {
          updateActiveState(activeIndex);
        });

  resizeObserver?.observe(grid);
  slides.forEach((slide) => resizeObserver?.observe(slide));

  updateActiveState(0);

  return () => {
    cancelScrollAnimation?.();

    if (scrollFrame !== null) {
      window.cancelAnimationFrame(scrollFrame);
    }

    resizeObserver?.disconnect();
    previousButton.removeEventListener('click', onPrevious);
    nextButton.removeEventListener('click', onNext);
    grid.removeEventListener('scroll', onScroll);
    grid.removeEventListener('keydown', onKeyDown);
    controls.remove();

    grid.classList.remove('is-mobile-benefits-carousel');
    grid.removeAttribute('aria-roledescription');
    grid.removeAttribute('tabindex');
    grid.style.removeProperty('height');
    if (originalGridId) {
      grid.id = originalGridId;
    } else {
      grid.removeAttribute('id');
    }

    slides.forEach((slide, index) => {
      slide.classList.remove('treatment-benefits-carousel-slide');
      slide.removeAttribute('aria-roledescription');
      slide.removeAttribute('aria-hidden');
      slide.removeAttribute('tabindex');

      if (createdSlideIds.has(slideIds[index])) {
        slide.removeAttribute('id');
      }
    });
  };
}

function setupBenefitsCarousels(scope: ParentNode): Cleanup {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return () => {};

  const mobileQuery = window.matchMedia(MOBILE_CAROUSEL_QUERY);
  const controllers = getBenefitsGrids(scope).map((grid, index) => {
    let cleanup: Cleanup = () => {};

    const sync = () => {
      cleanup();
      cleanup = mobileQuery.matches ? setupBenefitsCarousel(grid, index) : () => {};
    };

    sync();

    return {
      sync,
      cleanup: () => cleanup(),
    };
  });

  const handleChange = () => {
    controllers.forEach((controller) => controller.sync());
  };

  const removeMediaQueryListener = addMediaQueryListener(mobileQuery, handleChange);

  return () => {
    removeMediaQueryListener();
    controllers.forEach((controller) => controller.cleanup());
  };
}

function clearRedLineTarget(target: RedLineTarget) {
  if (target.kind === 'pseudo') {
    target.host.style.removeProperty(RED_LINE_SCALE_VAR);
    target.host.style.removeProperty(RED_LINE_OPACITY_VAR);
    return;
  }

  gsap.set(target.animatee, { clearProps: 'opacity,transform,transformOrigin,willChange' });
}

function setupRedLineReveal(target: RedLineTarget): ScrollTrigger | null {
  if (!supportsRedLineAnimation() || prefersReducedMotion()) {
    if (target.kind === 'pseudo') {
      target.host.style.setProperty(RED_LINE_SCALE_VAR, '1');
      target.host.style.setProperty(RED_LINE_OPACITY_VAR, '1');
    } else {
      gsap.set(target.animatee, { scaleX: 1, autoAlpha: 1, transformOrigin: 'left center' });
    }

    return null;
  }

  const timeline = gsap.timeline({
    defaults: {
      duration: 1,
      ease: 'sine.inOut',
    },
  });

  if (target.kind === 'pseudo') {
    target.host.style.setProperty(RED_LINE_SCALE_VAR, '0');
    target.host.style.setProperty(RED_LINE_OPACITY_VAR, '0');
    timeline.to(target.host, {
      [RED_LINE_SCALE_VAR]: 1,
      [RED_LINE_OPACITY_VAR]: 1,
    });
  } else {
    gsap.set(target.animatee, {
      scaleX: 0,
      autoAlpha: 0,
      transformOrigin: 'left center',
      willChange: 'transform,opacity',
    });
    timeline.to(target.animatee, {
      scaleX: 1,
      autoAlpha: 1,
    });
  }

  return ScrollTrigger.create({
    trigger: target.host,
    start: () => getRedLineStart(target.sequenceIndex),
    end: () => getRedLineEnd(target.sequenceIndex),
    animation: timeline,
    scrub: 0.4,
    fastScrollEnd: true,
    invalidateOnRefresh: true,
  });
}

function setupRedLineReveals(scope: ParentNode): Cleanup {
  const targets = getRedLineTargets(scope);
  const triggers = targets
    .map((target) => setupRedLineReveal(target))
    .filter((trigger): trigger is ScrollTrigger => trigger !== null);

  return () => {
    triggers.forEach((trigger) => trigger.kill());
    targets.forEach((target) => clearRedLineTarget(target));
  };
}

export function initTreatmentStepsTimelines(scope: ParentNode = document): Cleanup {
  if (typeof window === 'undefined') return () => {};
  ensureGsapPlugins();

  const grids = getStepsGrids(scope);
  const cleanups: Cleanup[] = [];
  const refresh = throttle(() => ScrollTrigger.refresh(), 160);

  window.addEventListener('resize', refresh, { passive: true });
  window.addEventListener('orientationchange', refresh, { passive: true });

  cleanups.push(() => {
    window.removeEventListener('resize', refresh);
    window.removeEventListener('orientationchange', refresh);
  });
  cleanups.push(setupRedLineReveals(scope));
  cleanups.push(setupBenefitsCarousels(scope));

  grids.forEach((grid) => {
    const elements = injectProgressElements(grid);
    if (!elements) return;

    const entranceTriggers: ScrollTrigger[] = [];
    const hoverCleanups: Cleanup[] = [];

    elements.cards.forEach((card) => {
      const trigger = setupEntrance(card);
      if (trigger) entranceTriggers.push(trigger);
      hoverCleanups.push(setupHover(card));
    });

    const stateTriggers = setupStateTracker(elements.cards);
    const progressTrigger = setupProgress(grid, elements);
    const autoplayCleanup = setupAutoplay(grid, elements.cards);

    cleanups.push(() => {
      autoplayCleanup();
      hoverCleanups.forEach((cleanup) => cleanup());
      entranceTriggers.forEach((trigger) => trigger.kill());
      stateTriggers.forEach((trigger) => trigger.kill());
      progressTrigger?.kill();

      const wrapper = grid.querySelector<HTMLElement>(':scope > .treatment-steps-progress');
      wrapper?.remove();

      elements.cards.forEach((card) => {
        delete card.dataset.stepState;
        gsap.set(card, { clearProps: 'opacity,transform,willChange' });
      });
    });
  });

  ScrollTrigger.refresh();
  return () => cleanups.forEach((cleanup) => cleanup());
}
