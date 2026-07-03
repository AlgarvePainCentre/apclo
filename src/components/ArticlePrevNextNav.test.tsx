import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route, useLocation } from 'react-router-dom';
import ArticlePrevNextNav from './ArticlePrevNextNav';

function LocationProbe() {
  const location = useLocation();
  return <div data-testid="location">{location.pathname}</div>;
}

function renderWithRouter(ui: React.ReactNode, initialEntry: string) {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>
        <Route
          path="*"
          element={
            <>
              <LocationProbe />
              {ui}
            </>
          }
        />
      </Routes>
    </MemoryRouter>
  );
}

describe('ArticlePrevNextNav', () => {
  const items = [
    { to: '/a', title: 'A', heroImage: '/assets/images/a.webp' },
    { to: '/b', title: 'B', heroImage: '/assets/images/b.webp' },
    { to: '/c', title: 'C', heroImage: '/assets/images/c.webp' },
  ];

  const originalImage = globalThis.Image;

  beforeEach(() => {
    vi.useFakeTimers();
    globalThis.Image = class FakeImage {
      onload: null | (() => void) = null;
      onerror: null | (() => void) = null;
      set src(_value: string) {
        queueMicrotask(() => {
          this.onload?.();
        });
      }
    } as unknown as typeof Image;
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
    globalThis.Image = originalImage;
  });

  it('renders previous and next links based on location', () => {
    renderWithRouter(<ArticlePrevNextNav items={items} />, '/b');
    expect(screen.getByRole('link', { name: /previous page: a/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /next page: c/i })).toBeInTheDocument();
  });

  it('does not render invalid navigation beyond edges', () => {
    renderWithRouter(<ArticlePrevNextNav items={items} />, '/a');
    expect(screen.queryByRole('link', { name: /previous page/i })).toBeNull();
    expect(screen.getByRole('link', { name: /next page: b/i })).toBeInTheDocument();
  });

  it('preloads adjacent hero images and swaps background on hover', async () => {
    renderWithRouter(<ArticlePrevNextNav items={items} />, '/b');
    const container = screen.getByLabelText(/page navigation/i);
    expect(container.getAttribute('data-nav-has-hero')).toBe('true');

    const nextLink = screen.getByRole('link', { name: /next page: c/i });
    fireEvent.mouseEnter(nextLink);
    await vi.runAllTicks();
    vi.advanceTimersByTime(300);

    expect(container.getAttribute('data-nav-phase')).toBe('idle');
  });

  it('navigates after transition when clicking next', async () => {
    renderWithRouter(<ArticlePrevNextNav items={items} />, '/b');
    const nextLink = screen.getByRole('link', { name: /next page: c/i });

    fireEvent.click(nextLink);
    await vi.runAllTicks();
    vi.advanceTimersByTime(300);

    expect(screen.getByTestId('location')).toHaveTextContent('/c');
  });

  it('skips hero update when image fails to load', async () => {
    globalThis.Image = class FakeFailImage {
      onload: null | (() => void) = null;
      onerror: null | (() => void) = null;
      set src(_value: string) {
        queueMicrotask(() => {
          this.onerror?.();
        });
      }
    } as unknown as typeof Image;

    renderWithRouter(<ArticlePrevNextNav items={items} />, '/b');
    const nextLink = screen.getByRole('link', { name: /next page: c/i });
    fireEvent.mouseEnter(nextLink);
    await vi.runAllTicks();
    vi.advanceTimersByTime(300);

    const container = screen.getByLabelText(/page navigation/i);
    expect(container.getAttribute('data-nav-phase')).toBe('idle');
  });
});

