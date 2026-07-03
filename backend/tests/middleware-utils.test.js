import { describe, expect, it } from 'vitest';
import { deepSanitize, getNestedValue } from '../src/utils/core.js';
import { detectLocale, getMessages, translate } from '../src/services/systemService.js';

describe('utility and service foundations', () => {
  it('deepSanitize removes dangerous html and keys', () => {
    const input = {
      '$where': '<script>alert(1)</script> test ',
      profile: {
        'name.first': ' Alice ',
      },
    };

    const output = deepSanitize(input);

    expect(output.where).not.toContain('<script>');
    expect(output.where).toContain('test');
    expect(output.profile.name_first).toBe('Alice');
  });

  it('getNestedValue resolves nested paths', () => {
    expect(getNestedValue({ a: { b: { c: 7 } } }, 'a.b.c')).toBe(7);
    expect(getNestedValue({ a: { b: 1 } }, 'a.x')).toBeUndefined();
  });

  it('loads translation namespaces and individual messages', async () => {
    const messages = await getMessages('en', 'common');
    const greeting = await translate('pt', 'common:messages.greeting');

    expect(messages.locale).toBe('en');
    expect(messages.messages.meta.tagline).toContain('Scalable');
    expect(greeting).toContain('Bem-vindo');
  });

  it('detects locale from query and headers', () => {
    expect(detectLocale({ query: { locale: 'pt' }, headers: {} })).toBe('pt');
    expect(detectLocale({ query: {}, headers: { 'x-locale': 'es' } })).toBe('es');
    expect(detectLocale({ query: {}, headers: { 'accept-language': 'fr-FR,fr;q=0.8' } })).toBe('en');
  });
});
