import { describe, expect, it, vi } from 'vitest';
import { enforceHttpsRedirect, serializeJsonForHtmlScript } from './security';

describe('serializeJsonForHtmlScript', () => {
  it('escapes script-breaking sequences', () => {
    const payload = {
      a: '</script><script>alert(1)</script>',
      b: '<img src=x onerror=alert(1)>',
      c: '-->',
    };
    const escaped = serializeJsonForHtmlScript(payload);
    expect(escaped).not.toContain('<script');
    expect(escaped).not.toContain('</script');
    expect(escaped).toContain('\\u003c');
    expect(escaped).toContain('--\\u003e');
  });

  it('accepts an already-stringified json string', () => {
    const json = '{"k":"</script>"}';
    expect(serializeJsonForHtmlScript(json)).not.toContain('</script');
  });
});

describe('enforceHttpsRedirect', () => {
  it('redirects http to https for non-localhost', () => {
    const replace = vi.fn();
    enforceHttpsRedirect({
      protocol: 'http:',
      hostname: 'example.com',
      href: 'http://example.com/path?x=1',
      replace,
    });
    expect(replace).toHaveBeenCalledWith('https://example.com/path?x=1');
  });

  it('does not redirect on localhost', () => {
    const replace = vi.fn();
    enforceHttpsRedirect({
      protocol: 'http:',
      hostname: 'localhost',
      href: 'http://localhost:5173/',
      replace,
    });
    expect(replace).not.toHaveBeenCalled();
  });
});
