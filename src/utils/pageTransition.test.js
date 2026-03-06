import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { performPageTransition, preloadPageContent } from './pageTransition';

function createContainer() {
  const div = document.createElement('div');
  div.id = 'page-root';
  div.innerHTML = '<p>Current</p>';
  document.body.appendChild(div);
  return div;
}

describe('pageTransition utilities', () => {
  let originalFetch;
  let originalMatchMedia;
  let originalLocation;
  let originalHistory;

  beforeEach(() => {
    document.body.innerHTML = '';
    originalFetch = global.fetch;
    originalMatchMedia = window.matchMedia;
    originalLocation = window.location;
    originalHistory = window.history;
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: {
        href: 'http://example.com/current',
      },
    });
    Object.defineProperty(window, 'history', {
      configurable: true,
      value: {
        pushState: vi.fn(),
      },
    });
    window.matchMedia = vi.fn().mockImplementation(() => ({
      matches: false,
      addListener: vi.fn(),
      removeListener: vi.fn(),
    }));
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    global.fetch = originalFetch;
    window.matchMedia = originalMatchMedia;
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: originalLocation,
    });
    Object.defineProperty(window, 'history', {
      configurable: true,
      value: originalHistory,
    });
  });

  it('throws when container is missing', async () => {
    await expect(
      performPageTransition({ container: null, url: '/next' })
    ).rejects.toThrow(/container must be an HTMLElement/);
  });

  it('throws when url is missing', async () => {
    const container = createContainer();
    await expect(
      performPageTransition({ container, url: '' })
    ).rejects.toThrow(/url must be a non-empty string/);
  });

  it('performs a fade transition and updates history', async () => {
    const container = createContainer();
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      text: () =>
        Promise.resolve('<div id="page-root"><p>Next content</p></div>'),
    });
    const onBefore = vi.fn();
    const onAfter = vi.fn();
    const promise = performPageTransition({
      container,
      url: '/next',
      transitionType: 'fade',
      duration: 300,
      easing: 'ease-out',
      onBefore,
      onAfter,
    });
    await vi.runAllTimersAsync();
    await promise;
    expect(onBefore).toHaveBeenCalled();
    expect(onAfter).toHaveBeenCalled();
    expect(container.innerHTML).toContain('Next content');
    expect(window.history.pushState).toHaveBeenCalledWith(
      { url: '/next' },
      '',
      '/next'
    );
  });

  it('supports slide transition type', async () => {
    const container = createContainer();
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      text: () =>
        Promise.resolve('<div id="page-root"><p>Slide content</p></div>'),
    });
    const promise = performPageTransition({
      container,
      url: '/slide',
      transitionType: 'slide',
      duration: 200,
    });
    await vi.runAllTimersAsync();
    await promise;
    expect(container.innerHTML).toContain('Slide content');
  });

  it('supports zoom transition type', async () => {
    const container = createContainer();
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      text: () =>
        Promise.resolve('<div id="page-root"><p>Zoom content</p></div>'),
    });
    const promise = performPageTransition({
      container,
      url: '/zoom',
      transitionType: 'zoom',
      duration: 200,
    });
    await vi.runAllTimersAsync();
    await promise;
    expect(container.innerHTML).toContain('Zoom content');
  });

  it('supports custom transition class without throwing', async () => {
    const container = createContainer();
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      text: () =>
        Promise.resolve('<div id="page-root"><p>Custom content</p></div>'),
    });
    const promise = performPageTransition({
      container,
      url: '/custom',
      transitionType: 'custom',
      customClassName: 'is-transitioning',
      duration: 150,
    });
    await vi.runAllTimersAsync();
    await promise;
    expect(container.innerHTML).toContain('Custom content');
  });

  it('respects reduced motion preference by skipping animations', async () => {
    const container = createContainer();
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      text: () =>
        Promise.resolve('<div id="page-root"><p>Reduced motion content</p></div>'),
    });
    window.matchMedia = vi.fn().mockImplementation(() => ({
      matches: true,
      addListener: vi.fn(),
      removeListener: vi.fn(),
    }));
    await performPageTransition({
      container,
      url: '/reduced',
      transitionType: 'fade',
      duration: 400,
    });
    await vi.runAllTimersAsync();
    expect(container.innerHTML).toContain('Reduced motion content');
  });

  it('falls back to full navigation when fetch is not supported', async () => {
    const container = createContainer();
    global.fetch = undefined;
    await performPageTransition({
      container,
      url: '/no-fetch',
    });
    expect(window.location.href).toBe('/no-fetch');
  });

  it('invokes error handler and falls back on failed fetch', async () => {
    const container = createContainer();
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      text: () => Promise.resolve(''),
    });
    const onError = vi.fn();
    await performPageTransition({
      container,
      url: '/error',
      onError,
    });
    expect(onError).toHaveBeenCalled();
    expect(window.location.href).toBe('/error');
  });

  it('allows custom preload implementation through preloadPageContent', async () => {
    const result = await preloadPageContent('/preloaded', {
      preload: (url) => Promise.resolve(`content for ${url}`),
    });
    expect(result).toBe('content for /preloaded');
  });
});
