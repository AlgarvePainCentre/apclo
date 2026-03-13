import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import BlogPage from './page';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={['/blog']}>
      <BlogPage />
    </MemoryRouter>
  );
}

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

describe('BlogPage', () => {
  it('renders hero and search input', () => {
    renderPage();
    expect(
      screen.getByRole('heading', { name: /clinically grounded insights/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/search articles/i)).toBeInTheDocument();
  });

  it('filters results in real time based on query', async () => {
    renderPage();

    const resultsSection = screen.getByRole('region', { name: /all articles/i });
    const queryInput = screen.getByLabelText(/search articles/i);

    await userEvent.type(queryInput, 'cervical');

    expect(within(resultsSection).getByText(/result.*for/i)).toBeInTheDocument();
    expect(
      within(resultsSection).getByRole('heading', { name: /cervical spine pain/i })
    ).toBeInTheDocument();
  });

  it('supports autocomplete suggestions and applies a tag suggestion', async () => {
    renderPage();

    const queryInput = screen.getByLabelText(/search articles/i);
    await userEvent.type(queryInput, 're');

    const listbox = screen.getByRole('listbox', { name: /suggestions/i });
    const tagOption = within(listbox).getAllByRole('option', { name: /^tag:/i })[0];
    const rawLabel = tagOption.textContent || '';
    const tagLabel = rawLabel.replace(/^tag:\s*/i, '').trim();
    await userEvent.click(tagOption);

    const tagChip = screen.getAllByRole('button', { name: new RegExp(`^${escapeRegExp(tagLabel)}$`, 'i') })[0];
    expect(tagChip).toHaveAttribute('aria-pressed', 'true');
  });

  it('applies category filter via select', async () => {
    renderPage();

    await userEvent.selectOptions(screen.getByLabelText(/category/i), 'Sports medicine');
    expect(screen.getByRole('heading', { name: /^injuries$/i })).toBeInTheDocument();
  });

  it('validates date range and disables search', async () => {
    renderPage();

    await userEvent.type(screen.getByLabelText(/^from$/i), '2024-06-01');
    await userEvent.type(screen.getByLabelText(/^to$/i), '2024-05-01');

    expect(screen.getByText(/start date must be before end date/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search blog posts/i })).toBeDisabled();
  });

  it('opens and closes mobile filters drawer', async () => {
    renderPage();

    await userEvent.click(screen.getByRole('button', { name: /open blog filters/i }));
    expect(screen.getByRole('dialog', { name: /blog filters/i })).toBeInTheDocument();

    await userEvent.keyboard('{Escape}');
    expect(screen.queryByRole('dialog', { name: /blog filters/i })).not.toBeInTheDocument();
  });
});
