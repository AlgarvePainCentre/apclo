export function sanitizeQuery(input) {
  if (typeof input !== 'string') return '';
  const stripped = input.replace(/[\u0000-\u001F\u007F]/g, '');
  const collapsed = stripped.replace(/\s+/g, ' ').trim();
  return collapsed.slice(0, 80);
}

export function buildSearchIndex(items) {
  const list = Array.isArray(items) ? items : [];
  return list
    .filter(Boolean)
    .map((item) => {
      const title = item.title || '';
      const subtitle = item.subtitle || '';
      const keywords = item.keywords || '';
      return {
        ...item,
        _titleLower: String(title).toLowerCase(),
        _subtitleLower: String(subtitle).toLowerCase(),
        _keywordsLower: String(keywords).toLowerCase(),
      };
    });
}

export function scoreItem(item, qLower) {
  if (!qLower) return 0;
  const title = item._titleLower || '';
  const subtitle = item._subtitleLower || '';
  const keywords = item._keywordsLower || '';

  if (title === qLower) return 200;
  if (title.startsWith(qLower)) return 150;
  if (title.includes(qLower)) return 120;
  if (subtitle.includes(qLower)) return 80;
  if (keywords.includes(qLower)) return 70;
  return 0;
}

export function searchIndex(index, query, limit = 8) {
  const q = sanitizeQuery(query);
  if (!q) return [];
  const qLower = q.toLowerCase();
  const items = Array.isArray(index) ? index : [];
  const max = Number.isFinite(limit) ? Math.max(1, Math.min(50, limit)) : 8;

  const best = [];
  for (let i = 0; i < items.length; i += 1) {
    const item = items[i];
    if (!item) continue;
    const score = scoreItem(item, qLower);
    if (score <= 0) continue;
    const entry = { item, score };

    let inserted = false;
    for (let j = 0; j < best.length; j += 1) {
      if (entry.score > best[j].score) {
        best.splice(j, 0, entry);
        inserted = true;
        break;
      }
    }
    if (!inserted) best.push(entry);
    if (best.length > max) best.length = max;
  }

  return best.map((x) => x.item);
}

