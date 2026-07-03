import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { TreatmentBreadcrumb } from './TreatmentBreadcrumb';

function renderBreadcrumb(initialEntry: string, currentLabel: string) {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>
        <Route path="*" element={<TreatmentBreadcrumb currentLabel={currentLabel} />} />
      </Routes>
    </MemoryRouter>
  );
}

describe('TreatmentBreadcrumb', () => {
  it('renders the breadcrumb trail and the unified all-treatments navigation', () => {
    renderBreadcrumb('/treatments/surgical-treatments/disc-replacement', 'Disc replacement');

    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Treatments' })).toHaveAttribute('href', '/treatments');
    expect(screen.getByText('Disc replacement')).toHaveAttribute('aria-current', 'page');

    const nav = screen.getByRole('navigation', { name: 'All treatments navigation' });
    const links = within(nav).getAllByRole('link');

    expect(links).toHaveLength(25);
    expect(within(nav).getByRole('link', { name: /physiotherapy/i })).toHaveAttribute(
      'href',
      '/treatments/non-invasive-treatments/physiotherapy'
    );
    expect(within(nav).getByRole('link', { name: /disc replacement/i })).toHaveAttribute('aria-current', 'page');
  });

  it('renders the correct icon card for the active cryoblation item', () => {
    renderBreadcrumb('/treatments/minimally-invasive-treatments/cryoblation', 'Cryoblation');

    const nav = screen.getByRole('navigation', { name: 'All treatments navigation' });
    const cryoLink = within(nav).getByRole('link', { name: /cryoblation/i });
    const cryoIcon = cryoLink.querySelector('img');

    expect(cryoLink).toHaveAttribute('aria-current', 'page');
    expect(cryoIcon).not.toBeNull();
    expect(cryoIcon?.getAttribute('src')).toBe('/assets/images/Treatments-Icons/Cryoablation.webp');
  });

  it('scrolls the carousel when the right control is pressed', () => {
    renderBreadcrumb('/treatments/minimally-invasive-treatments/cryoblation', 'Cryoblation');

    const nav = screen.getByRole('navigation', { name: 'All treatments navigation' });
    const list = nav.querySelector('.treatment-related-nav-list') as HTMLUListElement;
    const nextButton = screen.getByRole('button', { name: /scroll treatments to the right/i });

    let scrollLeft = 0;
    Object.defineProperty(list, 'clientWidth', { configurable: true, value: 320 });
    Object.defineProperty(list, 'scrollWidth', { configurable: true, value: 1800 });
    Object.defineProperty(list, 'scrollLeft', {
      configurable: true,
      get: () => scrollLeft,
    });

    const scrollBy = vi.fn(({ left }: { left: number }) => {
      scrollLeft += left;
      fireEvent.scroll(list);
    });

    Object.defineProperty(list, 'scrollBy', {
      configurable: true,
      value: scrollBy,
    });

    fireEvent(window, new Event('resize'));

    expect(nextButton).not.toBeDisabled();
    fireEvent.click(nextButton);

    expect(scrollBy).toHaveBeenCalledWith({
      left: expect.any(Number),
      behavior: 'smooth',
    });
  });
});
