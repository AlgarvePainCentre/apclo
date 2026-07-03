import React from 'react';
import { describe, it, expect } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../../../../app/store';
import BlogPage from './page';

function renderPage() {
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/blog']} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <BlogPage />
      </MemoryRouter>
    </Provider>
  );
}

describe('BlogPage', () => {
  it('renders hero and filters', () => {
    renderPage();
    expect(
      screen.getByRole('heading', { name: /clinically grounded insights/i })
    ).toBeInTheDocument();
  });

  it('applies category filter via sidebar chips', async () => {
    renderPage();

    await userEvent.click(screen.getByRole('button', { name: /open blog filters/i }));
    const dialog = screen.getByRole('dialog', { name: /blog filters/i });
    await userEvent.click(within(dialog).getByRole('button', { name: /sports medicine/i }));
    expect(await screen.findByRole('heading', { name: /^injuries$/i })).toBeInTheDocument();
  });

  it('clears filters from the mobile controls row', async () => {
    renderPage();

    fireEvent.click(screen.getByRole('button', { name: /open blog filters/i }));
    const dialog = screen.getByRole('dialog', { name: /blog filters/i });
    fireEvent.click(within(dialog).getByRole('button', { name: /sports medicine/i }));
    expect(await screen.findByRole('heading', { name: /^injuries$/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /clear blog filters/i }));
    fireEvent.click(screen.getByRole('button', { name: /open blog filters/i }));
    const dialogAfterClear = screen.getByRole('dialog', { name: /blog filters/i });
    expect(within(dialogAfterClear).getByRole('button', { name: /^all$/i })).toHaveAttribute('aria-pressed', 'true');
  });

  it('filters results by search query from the URL', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/blog?q=plantar']} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <BlogPage />
        </MemoryRouter>
      </Provider>
    );

    expect(await screen.findByRole('heading', { name: /foot and ankle pain/i })).toBeInTheDocument();
  });

  it('clamps out-of-range page numbers from the URL', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/blog?page=999']} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <BlogPage />
        </MemoryRouter>
      </Provider>
    );

    expect(await screen.findByText(/page 6 of 6/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /page 6/i })).toHaveAttribute('aria-current', 'page');
  });

  it('respects perPage from the URL', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/blog?perPage=50']} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <BlogPage />
        </MemoryRouter>
      </Provider>
    );

    expect(await screen.findByText(/showing 1–50 of 55 articles/i)).toBeInTheDocument();
  });

  it('handles zero results with large page numbers', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/blog?q=zzzzzzzz&page=999']} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <BlogPage />
        </MemoryRouter>
      </Provider>
    );

    expect(await screen.findByRole('heading', { name: /no matches found/i })).toBeInTheDocument();
  });

  it('opens and closes mobile filters drawer', async () => {
    renderPage();

    fireEvent.click(screen.getByRole('button', { name: /open blog filters/i }));
    expect(screen.getByRole('dialog', { name: /blog filters/i })).toBeInTheDocument();

    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape', keyCode: 27, charCode: 27 });
    expect(screen.queryByRole('dialog', { name: /blog filters/i })).not.toBeInTheDocument();
  });
});
