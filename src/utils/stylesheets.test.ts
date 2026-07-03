import { describe, it, expect } from 'vitest';
import { withStylesheetLoadTracking } from './stylesheets';

function createStylesheetLink(href: string) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  return link;
}

describe('withStylesheetLoadTracking', () => {
  it('resolves after newly added stylesheet links load', async () => {
    const p = withStylesheetLoadTracking(
      async () => {
        const link = createStylesheetLink('/assets/test.css');
        document.head.appendChild(link);
        link.dispatchEvent(new Event('load'));
        return 123;
      },
      { timeoutMs: 2000, settleMs: 10 }
    );

    await expect(p).resolves.toBe(123);
  });

  it('waits for stylesheet load when added asynchronously', async () => {
    const resultPromise = withStylesheetLoadTracking(
      async () => {
        await new Promise<void>((r) => setTimeout(r, 10));
        const link = createStylesheetLink('/assets/async.css');
        document.head.appendChild(link);
        await new Promise<void>((r) => setTimeout(r, 10));
        link.dispatchEvent(new Event('load'));
        return 'ok';
      },
      { timeoutMs: 2000, settleMs: 20 }
    );

    await expect(resultPromise).resolves.toBe('ok');
  });
});
