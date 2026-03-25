import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { enforceHttpsRedirect } from './utils/security';
import { gsap } from 'gsap';

enforceHttpsRedirect();

const rootElement = document.getElementById('root');
const reactRoot = ReactDOM.createRoot(rootElement);

reactRoot.render(
  <React.StrictMode>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

if (import.meta.env.PROD && typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  window.addEventListener(
    'load',
    () => {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    },
    { once: true }
  );
}

const reduceMotion = (() => {
  try {
    return !!window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch {
    return false;
  }
})();

if (!window.__apcEntranceOrchestratorInitialized) {
  window.__apcEntranceOrchestratorInitialized = true;

  let tl;
  let started = false;
  let removedListeners = false;

  const preloaderCompleteHandler = () => {
    startEntranceTransition();
  };

  window.addEventListener('apc:preloaderComplete', preloaderCompleteHandler);

  if (window.__apcPreloaderComplete) {
    startEntranceTransition();
  }

  window.__apcEntranceStart = startEntranceTransition;

  async function startEntranceTransition() {
    if (started) return;
    started = true;

    const preloader = document.getElementById('apc-preloader');
    const rootEl = document.getElementById('root');

    if (!rootEl) {
      cleanup();
      return;
    }

    if (reduceMotion) {
      try {
        rootEl.style.opacity = '';
        rootEl.style.willChange = '';
      } catch {}

      if (preloader) {
        preloader.setAttribute('data-apc-gsap-done', '1');
        if (typeof window.__apcHidePreloader === 'function') window.__apcHidePreloader();
      }

      cleanup();
      return;
    }

    await waitForRootContent(rootEl, 5000);
    await waitForOptionalAppData(6000);
    await waitForCriticalImages(rootEl, 4500);

    if (!preloader) {
      try {
        gsap.set(rootEl, { clearProps: 'opacity,transform,willChange' });
      } catch {}
      cleanup();
      return;
    }

    const heroEl = document.querySelector('.hero--home');
    const heroLeftEl = await waitForElement('.hero--home .hero-home-left', 2000);
    const navbarEl = await waitForElement('header.navbar', 2000);
    const navbarLogoEl = await waitForElement('img.navbar-logo', 2000);
    const preloaderLogoEl = document.getElementById('apc-preloader-logo');

    const preloaderFadeDuration = 1.0;
    const heroFadeDuration = 1.0;
    const headerDelay = 0.3;
    const headerFadeDuration = 0.7;
    const headerStartAt = preloaderFadeDuration + headerDelay;
    const logoMoveDuration = 1.0;

    preloader.style.transition = 'none';
    preloader.style.willChange = 'opacity, transform';
    rootEl.style.willChange = 'opacity';

    gsap.set(rootEl, { opacity: 0, force3D: true });
    if (heroEl) gsap.set(heroEl, { opacity: 0 });
    if (navbarEl) {
      gsap.set(navbarEl, { opacity: 0 });
      navbarEl.style.pointerEvents = 'none';
    }
    if (navbarLogoEl) gsap.set(navbarLogoEl, { opacity: 0 });
    gsap.set(preloader, { opacity: 1, force3D: true });

    const heroLeftRevealTargets = heroLeftEl ? Array.from(heroLeftEl.children) : [];
    if (heroLeftRevealTargets.length) {
      gsap.set(heroLeftRevealTargets, { autoAlpha: 0, y: 18, force3D: true, willChange: 'transform,opacity' });
    }

    let movingLogoEl = null;
    let cleanupMovingLogo = null;

    if (preloaderLogoEl && navbarLogoEl) {
      const startRect = preloaderLogoEl.getBoundingClientRect();
      const endRect = navbarLogoEl.getBoundingClientRect();

      if (startRect.width > 0 && startRect.height > 0 && endRect.width > 0 && endRect.height > 0) {
        movingLogoEl = preloaderLogoEl.cloneNode(true);
        movingLogoEl.removeAttribute('id');
        movingLogoEl.style.position = 'fixed';
        movingLogoEl.style.left = `${startRect.left}px`;
        movingLogoEl.style.top = `${startRect.top}px`;
        movingLogoEl.style.width = `${startRect.width}px`;
        movingLogoEl.style.height = `${startRect.height}px`;
        movingLogoEl.style.margin = '0';
        movingLogoEl.style.zIndex = '2147483647';
        movingLogoEl.style.pointerEvents = 'none';
        movingLogoEl.style.willChange = 'transform, opacity';
        movingLogoEl.style.transformOrigin = '0 0';
        movingLogoEl.style.animation = 'none';

        try {
          preloaderLogoEl.style.opacity = '0';
        } catch {}

        document.body.appendChild(movingLogoEl);

        const dx = endRect.left - startRect.left;
        const dy = endRect.top - startRect.top;
        const scale = endRect.width / startRect.width;

        cleanupMovingLogo = () => {
          if (movingLogoEl && movingLogoEl.parentNode) movingLogoEl.parentNode.removeChild(movingLogoEl);
          movingLogoEl = null;
        };

        movingLogoEl.dataset.apcDx = String(dx);
        movingLogoEl.dataset.apcDy = String(dy);
        movingLogoEl.dataset.apcScale = String(scale);
      }
    }

    tl = gsap.timeline({
      onComplete: () => {
        try {
          gsap.set(rootEl, { clearProps: 'willChange' });
          gsap.set(preloader, { clearProps: 'willChange,transition' });
        } catch {}

        if (navbarEl) navbarEl.style.pointerEvents = '';
        if (cleanupMovingLogo) cleanupMovingLogo();
        if (navbarLogoEl) gsap.set(navbarLogoEl, { clearProps: 'opacity' });

        try {
          gsap.set(rootEl, { clearProps: 'opacity,willChange' });
        } catch {}

        killTimeline();
        cleanup();
      },
    });

    tl.to(
      preloader,
      {
        opacity: 0,
        duration: preloaderFadeDuration,
        ease: 'power1.inOut',
      },
      0
    );

    tl.to(
      rootEl,
      {
        opacity: 1,
        duration: heroFadeDuration,
        ease: 'power1.inOut',
      },
      0
    );

    if (heroEl) {
      tl.to(
        heroEl,
        {
          opacity: 1,
          duration: heroFadeDuration,
          ease: 'power1.inOut',
        },
        0
      );
    }

    tl.call(
      () => {
        if (!preloader) return;
        preloader.setAttribute('data-apc-gsap-done', '1');
        if (typeof window.__apcHidePreloader === 'function') window.__apcHidePreloader();
      },
      null,
      preloaderFadeDuration
    );

    if (navbarEl) {
      tl.to(
        navbarEl,
        {
          opacity: 1,
          duration: headerFadeDuration,
          ease: 'power1.inOut',
          onComplete: () => {
            if (navbarEl) navbarEl.style.pointerEvents = '';
          },
        },
        headerStartAt
      );
    }

    if (movingLogoEl && navbarLogoEl) {
      const dx = Number(movingLogoEl.dataset.apcDx || '0');
      const dy = Number(movingLogoEl.dataset.apcDy || '0');
      const scale = Number(movingLogoEl.dataset.apcScale || '1');

      tl.to(
        movingLogoEl,
        {
          x: dx,
          y: dy,
          scale,
          duration: logoMoveDuration,
          ease: 'power2.inOut',
        },
        headerStartAt
      )
        .set(
          navbarLogoEl,
          {
            opacity: 1,
          },
          headerStartAt + logoMoveDuration - 0.05
        )
        .to(
          movingLogoEl,
          {
            opacity: 0,
            duration: 0.12,
            ease: 'power1.out',
          },
          headerStartAt + logoMoveDuration - 0.05
        );
    }

    const logoLandingAt = movingLogoEl && navbarLogoEl ? headerStartAt + logoMoveDuration - 0.05 : headerStartAt;

    if (navbarLogoEl && !movingLogoEl) {
      tl.set(
        navbarLogoEl,
        {
          opacity: 1,
        },
        logoLandingAt
      );
    }

    if (heroLeftRevealTargets.length) {
      tl.fromTo(
        heroLeftRevealTargets,
        { autoAlpha: 0, y: 18 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          ease: 'power2.out',
          stagger: 0.12,
          clearProps: 'opacity,visibility,transform,willChange',
        },
        logoLandingAt
      );
    }
  }

  function killTimeline() {
    if (!tl) return;
    try {
      tl.kill();
    } catch {}
    tl = null;
  }

  function cleanup() {
    if (removedListeners) return;
    removedListeners = true;
    window.removeEventListener('apc:preloaderComplete', preloaderCompleteHandler);
    killTimeline();
  }

  function waitForRootContent(rootEl, maxWaitMs) {
    return new Promise((resolve) => {
      if (rootEl.childElementCount > 0) {
        resolve();
        return;
      }

      let done = false;
      const finish = () => {
        if (done) return;
        done = true;
        try {
          observer.disconnect();
        } catch {}
        resolve();
      };

      const observer = new MutationObserver(() => {
        if (rootEl.childElementCount > 0) finish();
      });

      try {
        observer.observe(rootEl, { childList: true, subtree: true });
      } catch {
        resolve();
        return;
      }

      window.setTimeout(finish, maxWaitMs);
    });
  }

  function waitForElement(selector, maxWaitMs) {
    return new Promise((resolve) => {
      const found = () => document.querySelector(selector);
      const initial = found();
      if (initial) {
        resolve(initial);
        return;
      }

      let done = false;
      const finish = () => {
        if (done) return;
        done = true;
        try {
          observer.disconnect();
        } catch {}
        resolve(found() || null);
      };

      const observer = new MutationObserver(() => {
        if (found()) finish();
      });

      try {
        observer.observe(document.documentElement, { childList: true, subtree: true });
      } catch {
        resolve(null);
        return;
      }

      window.setTimeout(finish, maxWaitMs);
    });
  }

  function waitForCriticalImages(rootEl, maxWaitMs) {
    const imgs = Array.from(rootEl.querySelectorAll('img'));
    if (imgs.length === 0) return Promise.resolve();

    const pending = imgs.filter((img) => !img.complete);
    if (pending.length === 0) return Promise.resolve();

    return new Promise((resolve) => {
      let remaining = pending.length;
      let done = false;
      const listeners = [];

      const finish = () => {
        if (done) return;
        done = true;
        listeners.forEach(({ img, onDone }) => {
          img.removeEventListener('load', onDone);
          img.removeEventListener('error', onDone);
        });
        resolve();
      };

      const onOneDone = () => {
        remaining -= 1;
        if (remaining <= 0) finish();
      };

      pending.forEach((img) => {
        img.addEventListener('load', onOneDone);
        img.addEventListener('error', onOneDone);
        listeners.push({ img, onDone: onOneDone });
      });

      window.setTimeout(finish, maxWaitMs);
    });
  }

  function waitForOptionalAppData(maxWaitMs) {
    const maybe = window.__apcAppReadyPromise;
    if (!maybe || typeof maybe.then !== 'function') return Promise.resolve();

    return Promise.race([
      maybe.catch(() => undefined),
      new Promise((resolve) => window.setTimeout(resolve, maxWaitMs)),
    ]);
  }
}
