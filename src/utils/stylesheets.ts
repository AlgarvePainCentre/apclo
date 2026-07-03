export type StylesheetTrackingOptions = {
  timeoutMs?: number;
  settleMs?: number;
};

function getStylesheetHref(link: HTMLLinkElement) {
  const href = link.getAttribute('href');
  if (!href) return null;
  try {
    return new URL(href, window.location.origin).href;
  } catch {
    return href;
  }
}

function linkLoaded(link: HTMLLinkElement) {
  return Boolean((link as any).sheet);
}

function waitForLinkLoad(link: HTMLLinkElement) {
  if (linkLoaded(link)) return Promise.resolve();

  return new Promise<void>((resolve) => {
    const onDone = () => {
      link.removeEventListener('load', onDone);
      link.removeEventListener('error', onDone);
      resolve();
    };
    link.addEventListener('load', onDone, { once: true });
    link.addEventListener('error', onDone, { once: true });
  });
}

export async function withStylesheetLoadTracking<T>(
  run: () => Promise<T> | T,
  options: StylesheetTrackingOptions = {}
): Promise<T> {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return Promise.resolve(run());
  }

  const timeoutMs = options.timeoutMs ?? 8000;
  const settleMs = options.settleMs ?? 120;

  const known = new Set<string>();
  const pending = new Map<string, Promise<void>>();

  const scan = () => {
    const links = Array.from(document.querySelectorAll('link[rel="stylesheet"][href]')) as HTMLLinkElement[];
    for (const link of links) {
      const href = getStylesheetHref(link);
      if (!href) continue;
      if (known.has(href)) continue;
      known.add(href);
      pending.set(href, waitForLinkLoad(link));
    }
  };

  scan();

  let settleTimer = 0;
  let settleResolve: (() => void) | null = null;
  const settlePromise = new Promise<void>((resolve) => {
    settleResolve = resolve;
  });

  const bumpSettle = () => {
    if (settleTimer) window.clearTimeout(settleTimer);
    settleTimer = window.setTimeout(() => {
      settleTimer = 0;
      settleResolve?.();
    }, settleMs);
  };

  bumpSettle();

  const observer = new MutationObserver(() => {
    scan();
    bumpSettle();
  });

  observer.observe(document.head, { childList: true, subtree: true });

  const startedAt = typeof performance !== 'undefined' && performance.now ? performance.now() : 0;
  const timeoutPromise = new Promise<void>((resolve) => {
    window.setTimeout(resolve, timeoutMs);
  });

  try {
    const result = await run();
    await new Promise<void>((r) => {
      if (typeof window.requestAnimationFrame === 'function') window.requestAnimationFrame(() => r());
      else window.setTimeout(() => r(), 0);
    });
    scan();
    bumpSettle();

    await Promise.race([settlePromise, timeoutPromise]);
    await Promise.race([Promise.all(Array.from(pending.values())), timeoutPromise]);

    const endedAt = typeof performance !== 'undefined' && performance.now ? performance.now() : 0;
    const durationMs = startedAt && endedAt ? Math.round(endedAt - startedAt) : 0;
    if (durationMs) {
      try {
        (window as any).__apcStyleLoad = { lastMs: durationMs, at: Date.now() };
      } catch {}
    }

    return result;
  } finally {
    observer.disconnect();
    if (settleTimer) window.clearTimeout(settleTimer);
  }
}
