import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Footer from '../Footer';

function setup() {
  render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>
  );
}

describe('Footer', () => {
  it('renders health center contact information', () => {
    setup();
    expect(
      screen.getByText(/Av\. do Mar/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /\+351 915 915 001/ })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /info@algarvepaincentre\.com/i })
    ).toBeInTheDocument();
  });

  it('renders all main footer categories as headings', () => {
    setup();
    const titles = [
      'Specialities',
      'Treatments',
      'Resource',
      'Company',
    ];

    titles.forEach((title) => {
      const headings = screen.getAllByRole('heading', { name: title });
      expect(headings.length).toBeGreaterThan(0);
    });
  });

  it('renders links inside the Specialities column', () => {
    setup();
    const links = screen.getAllByRole('link', {
      name: /Head Pain|Cervical Spine Pain|Lumbar Spine Pain/,
    });
    expect(links.length).toBeGreaterThan(0);
  });

  it('does not render Support or Pricing links', () => {
    setup();
    expect(screen.queryByRole('link', { name: /Support/i })).toBeNull();
    expect(screen.queryByRole('link', { name: /Pricing/i })).toBeNull();
  });
});
