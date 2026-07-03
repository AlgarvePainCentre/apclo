import { describe, expect, it } from 'vitest';
import { getChatbotReply, getInitialChatbotMessage } from './chatbotEngine';

describe('chatbotEngine', () => {
  it('returns a welcome message', () => {
    const reply = getInitialChatbotMessage();

    expect(reply.text).toContain('I can help');
    expect(reply.actions.length).toBeGreaterThan(0);
  });

  it('returns contact guidance for whatsapp queries', () => {
    const reply = getChatbotReply('How can I contact you on WhatsApp?');

    expect(reply.text).toContain('WhatsApp');
    expect(reply.actions.some((action) => action.href?.includes('wa.me'))).toBe(true);
  });

  it('matches speciality content from website data', () => {
    const reply = getChatbotReply('I need help with knee pain');

    expect(reply.text).toContain('knee pain');
    expect(reply.actions.some((action) => action.label === 'Knee Pain')).toBe(true);
  });

  it('matches treatment content from website data', () => {
    const reply = getChatbotReply('Tell me about radiofrequency treatment');

    expect(reply.actions.some((action) => action.label === 'Radiofrequency')).toBe(true);
  });

  it('explains the difference between specialities and treatments', () => {
    const reply = getChatbotReply('What is the difference between specialities and treatments?');

    expect(reply.text).toContain('specialities describe the medical areas');
    expect(reply.actions.some((action) => action.label === 'Browse Specialities')).toBe(true);
    expect(reply.actions.some((action) => action.label === 'Browse Treatments')).toBe(true);
  });

  it('returns booking guidance with contact escalation', () => {
    const reply = getChatbotReply('How do I book an appointment?');

    expect(reply.text).toContain('contact Algarve Pain Centre directly');
    expect(reply.actions.some((action) => action.label === 'WhatsApp')).toBe(true);
  });

  it('uses context for follow-up questions', () => {
    const firstReply = getChatbotReply('Tell me about radiofrequency');
    const followUpReply = getChatbotReply('show me more', firstReply.context);

    expect(firstReply.context.lastMatchedServiceLabel).toBe('Radiofrequency');
    expect(followUpReply.text).toContain('Radiofrequency');
    expect(followUpReply.actions.length).toBeGreaterThan(1);
  });
});
