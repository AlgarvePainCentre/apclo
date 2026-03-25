import { describe, it, expect, beforeAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Contact from './Contact';

describe('Contact page', () => {
  beforeAll(() => {
    // @ts-ignore
    if (!window.matchMedia) {
      // @ts-ignore
      window.matchMedia = () => ({ matches: false, addListener() {}, removeListener() {} });
    }
  });
  it('renders PSX hero and actions', () => {
    render(
      <MemoryRouter>
        <Contact />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: /contact us/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /contact form/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /visit details/i })).toBeInTheDocument();
  });

  it('renders form fields and submit button', () => {
    render(
      <MemoryRouter>
        <Contact />
      </MemoryRouter>
    );
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });
});
