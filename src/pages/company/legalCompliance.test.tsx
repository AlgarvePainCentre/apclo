import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, within } from '@testing-library/react';
import Footer from '../../components/Footer';
import AccessibilityStatementPage from './AccessibilityStatement/page';
import CookiePolicyPage from './CookiePolicy/page';
import CookiesPage from './Cookies/page';
import TermsOfServicePage from './TermsOfService/page';

const legalPages = [
  {
    name: 'Cookie Policy',
    Component: CookiePolicyPage,
    navLabel: 'What cookies are',
  },
  {
    name: 'Terms of Service',
    Component: TermsOfServicePage,
    navLabel: 'Acceptance of terms',
  },
  {
    name: 'Cookies',
    Component: CookiesPage,
    navLabel: 'Summary',
  },
  {
    name: 'Accessibility Statement',
    Component: AccessibilityStatementPage,
    navLabel: 'Accessibility commitment',
  },
];

describe('legal compliance pages', () => {
  it.each(legalPages)('renders $name with on-page navigation', ({ name, Component, navLabel }) => {
    render(
      <MemoryRouter>
        <Component />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { level: 1, name })).toBeInTheDocument();

    const pageNav = screen.getByRole('navigation', { name: new RegExp(`${name} page navigation`, 'i') });
    expect(pageNav).toBeInTheDocument();

    const navLink = within(pageNav).getByRole('link', { name: navLabel });
    expect(navLink).toHaveAttribute('href', expect.stringMatching(/^#/));
  });

  it('exposes the legal documents from the footer', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    expect(screen.getByRole('link', { name: /terms of service/i })).toHaveAttribute('href', '/company/terms-of-service');
    expect(screen.getByRole('link', { name: /cookie policy/i })).toHaveAttribute('href', '/company/cookie-policy');
    expect(screen.getByRole('link', { name: /^cookies$/i })).toHaveAttribute('href', '/company/cookies');
    expect(screen.getByRole('link', { name: /accessibility statement/i })).toHaveAttribute(
      'href',
      '/company/accessibility-statement'
    );
  });
});
