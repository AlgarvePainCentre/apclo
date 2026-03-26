import { describe, it, expect } from 'vitest';
import { buildSearchIndex, sanitizeQuery, searchIndex } from './search';

describe('search utils', () => {
  it('sanitizes query input', () => {
    expect(sanitizeQuery('   hello   world   ')).toBe('hello world');
    expect(sanitizeQuery('a\u0000b\u0008c')).toBe('abc');
    expect(sanitizeQuery('')).toBe('');
  });

  it('returns results for title and keywords', () => {
    const idx = buildSearchIndex([
      { key: 'a', title: 'Spinal fusion', keywords: 'spine surgery', to: '/treatments/spinal-fusion' },
      { key: 'b', title: 'Physiotherapy', keywords: 'rehabilitation', to: '/treatments/physiotherapy' },
    ]);

    expect(searchIndex(idx, 'spinal')[0].key).toBe('a');
    expect(searchIndex(idx, 'rehabilitation')[0].key).toBe('b');
  });

  it('handles empty queries', () => {
    const idx = buildSearchIndex([{ key: 'a', title: 'Home', to: '/' }]);
    expect(searchIndex(idx, '')).toEqual([]);
    expect(searchIndex(idx, '   ')).toEqual([]);
  });

  it('runs within 2 seconds for a large index', () => {
    const raw = [];
    for (let i = 0; i < 20000; i += 1) {
      raw.push({ key: `k-${i}`, title: `Item ${i}`, keywords: i % 10 === 0 ? 'spine surgery' : 'other', to: `/x/${i}` });
    }
    const idx = buildSearchIndex(raw);
    const start = Date.now();
    const out = searchIndex(idx, 'spine', 8);
    const elapsed = Date.now() - start;
    expect(out.length).toBeGreaterThan(0);
    expect(elapsed).toBeLessThan(2000);
  });
});

