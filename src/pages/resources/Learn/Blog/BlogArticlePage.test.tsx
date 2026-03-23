import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import BlogArticlePage from './articlePage';

function renderArticle(slug: string) {
  return render(
    <MemoryRouter
      initialEntries={[`/blog/${slug}`]}
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <Routes>
        <Route path="/blog/:slug" element={<BlogArticlePage />} />
      </Routes>
    </MemoryRouter>
  );
}

describe('BlogArticlePage', () => {
  it('renders breadcrumb navigation', () => {
    renderArticle('about-head-pain');
    expect(screen.getByRole('navigation', { name: /breadcrumb/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /^home$/i })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: /^blog$/i })).toHaveAttribute('href', '/blog');
    expect(screen.getByRole('heading', { name: /about head pain/i })).toBeInTheDocument();
  });

  it('injects JSON-LD schema markup', () => {
    renderArticle('about-head-pain');
    const script = document.getElementById('schema-blog-article');
    expect(script).toBeTruthy();
    const json = JSON.parse(script?.textContent || 'null') as unknown;
    expect(Array.isArray(json)).toBe(true);
    expect(JSON.stringify(json)).toMatch(/\"@type\":\"MedicalWebPage\"/);
    expect(JSON.stringify(json)).toMatch(/\"@type\":\"MedicalArticle\"/);
  });

  it('allows posting a comment', async () => {
    renderArticle('about-head-pain');
    await userEvent.type(screen.getByLabelText(/^name$/i), 'Sam');
    await userEvent.type(
      screen.getByLabelText(/^comment$/i),
      'This was helpful and clearly explained.'
    );
    await userEvent.click(screen.getByRole('button', { name: /post comment/i }));
    expect(screen.getByText('Sam')).toBeInTheDocument();
    expect(screen.getByText(/this was helpful and clearly explained/i)).toBeInTheDocument();
  });
});
