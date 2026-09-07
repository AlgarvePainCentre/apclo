import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ManagedEmbed from './ManagedEmbed';
import { COOKIE_CONSENT_COOKIE_NAME, acceptAllCookieConsent } from '../utils/consentManager';

function clearConsentState() {
  document.cookie = `${COOKIE_CONSENT_COOKIE_NAME}=; Max-Age=0; Path=/`;
  window.localStorage?.removeItem?.(COOKIE_CONSENT_COOKIE_NAME);
}

describe('ManagedEmbed', () => {
  beforeEach(() => {
    clearConsentState();
  });

  it('blocks third-party content until media consent is granted', () => {
    render(<ManagedEmbed src="https://www.youtube-nocookie.com/embed/demo" title="Patient story video" openHref="https://example.com" />);

    expect(screen.getByRole('heading', { name: /media disabled until consent/i })).toBeInTheDocument();
    expect(screen.queryByTitle(/patient story video/i)).not.toBeInTheDocument();
  });

  it('loads the iframe after the user allows media and maps', async () => {
    render(<ManagedEmbed src="https://www.youtube-nocookie.com/embed/demo" title="Patient story video" openHref="https://example.com" />);

    await userEvent.click(screen.getByRole('button', { name: /allow media and maps/i }));

    expect(await screen.findByTitle(/patient story video/i)).toBeInTheDocument();
    expect(document.cookie).toContain(COOKIE_CONSENT_COOKIE_NAME);
  });

  it('renders immediately when consent was previously granted', async () => {
    acceptAllCookieConsent();

    render(<ManagedEmbed src="https://www.youtube-nocookie.com/embed/demo" title="Patient story video" openHref="https://example.com" />);

    expect(await screen.findByTitle(/patient story video/i)).toBeInTheDocument();
  });
});
