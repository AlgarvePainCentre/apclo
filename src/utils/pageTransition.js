function getReducedMotionPreference() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch {
    return false;
  }
}

function supportsHistory() {
  return typeof window !== 'undefined' && typeof window.history !== 'undefined' && 'pushState' in window.history;
}

function supportsFetch() {
  return typeof window !== 'undefined' && typeof window.fetch === 'function';
}

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function extractContent(html, container) {
  if (typeof window === 'undefined' || typeof window.DOMParser !== 'function') {
    return html;
  }
  try {
    const parser = new window.DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    if (container && container.id) {
      const sameId = doc.getElementById(container.id);
      if (sameId) {
        return sameId.innerHTML;
      }
    }
    const root = doc.querySelector('[data-page-root]') || doc.body;
    return root ? root.innerHTML : html;
  } catch {
    return html;
  }
}

async function preloadPage(url, container, customPreload) {
  if (typeof customPreload === 'function') {
    return customPreload(url);
  }
  if (!supportsFetch()) {
    return null;
  }
  const response = await window.fetch(url, {
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
    },
  });
  if (!response.ok) {
    const error = new Error('Failed to load next page');
    error.status = response.status;
    throw error;
  }
  const html = await response.text();
  return extractContent(html, container);
}

function applyTransitionState(container, type, phase, duration, easing, customClassName) {
  if (!container) {
    return;
  }
  if (type === 'custom') {
    if (customClassName) {
      if (phase === 'out') {
        container.classList.add(customClassName);
      } else {
        container.classList.remove(customClassName);
      }
    }
    return;
  }
  const transitionValue = `opacity ${duration}ms ${easing}, transform ${duration}ms ${easing}`;
  if (phase === 'initial') {
    container.style.transition = transitionValue;
    container.style.opacity = '1';
    container.style.transform = 'none';
    return;
  }
  if (phase === 'out') {
    if (!container.style.transition) {
      container.style.transition = transitionValue;
    }
    if (type === 'fade') {
      container.style.opacity = '0';
      container.style.transform = 'none';
    } else if (type === 'slide') {
      container.style.opacity = '0';
      container.style.transform = 'translate3d(-16px, 0, 0)';
    } else if (type === 'zoom') {
      container.style.opacity = '0';
      container.style.transform = 'scale(0.96)';
    }
    return;
  }
  if (phase === 'in') {
    if (type === 'fade') {
      container.style.opacity = '1';
      container.style.transform = 'none';
    } else if (type === 'slide') {
      container.style.opacity = '1';
      container.style.transform = 'translate3d(0, 0, 0)';
    } else if (type === 'zoom') {
      container.style.opacity = '1';
      container.style.transform = 'scale(1)';
    }
  }
}

export async function performPageTransition(options) {
  const {
    container,
    url,
    transitionType = 'fade',
    duration = 400,
    easing = 'ease',
    customClassName,
    onBefore,
    onAfter,
    onError,
    preload,
    historyState,
  } = options || {};
  if (!container || !(container instanceof HTMLElement)) {
    throw new Error('performPageTransition: container must be an HTMLElement');
  }
  if (!url || typeof url !== 'string') {
    throw new Error('performPageTransition: url must be a non-empty string');
  }
  const type = transitionType || 'fade';
  const resolvedDuration = typeof duration === 'number' && duration >= 0 ? duration : 400;
  const resolvedEasing = easing || 'ease';
  const reducedMotion = getReducedMotionPreference();
  if (typeof onBefore === 'function') {
    onBefore();
  }
  if (!supportsFetch()) {
    if (typeof window !== 'undefined' && window.location && url) {
      window.location.href = url;
      return;
    }
  }
  try {
    applyTransitionState(container, type, 'initial', resolvedDuration, resolvedEasing, customClassName);
    const preloadPromise = preloadPage(url, container, preload);
    if (reducedMotion) {
      const nextContent = await preloadPromise;
      if (nextContent != null) {
        container.innerHTML = nextContent;
      }
    } else {
      applyTransitionState(container, type, 'out', resolvedDuration, resolvedEasing, customClassName);
      const [nextContent] = await Promise.all([preloadPromise, wait(resolvedDuration)]);
      if (nextContent != null) {
        container.innerHTML = nextContent;
      }
      applyTransitionState(container, type, 'in', resolvedDuration, resolvedEasing, customClassName);
      if (resolvedDuration > 0) {
        await wait(resolvedDuration);
      }
    }
    if (supportsHistory()) {
      const state = historyState || { url };
      window.history.pushState(state, '', url);
    } else if (typeof window !== 'undefined' && window.location && url) {
      window.location.href = url;
      return;
    }
    if (typeof onAfter === 'function') {
      onAfter();
    }
  } catch (error) {
    if (typeof onError === 'function') {
      onError(error);
    }
    if (typeof window !== 'undefined' && window.location && url) {
      window.location.href = url;
    }
  }
}

export function preloadPageContent(url, options) {
  const { container, preload } = options || {};
  return preloadPage(url, container || null, preload);
}

