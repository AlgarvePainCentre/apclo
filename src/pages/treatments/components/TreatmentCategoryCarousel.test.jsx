import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { TreatmentCategoryCarousel } from './TreatmentCategoryCarousel';

const items = [
  {
    id: 1,
    title: 'Vertebroplasty',
    description: 'Stabilises vertebral fractures with targeted cement injection.',
    link: '/treatments/minimally-invasive-treatments/vertebroplasty',
    iconSrc: '/assets/images/Treatments-Icons/Vertebroplasty.webp',
  },
  {
    id: 2,
    title: 'Radiofrequency',
    description: 'Targets pain-signalling nerves using controlled heat.',
    link: '/treatments/minimally-invasive-treatments/radiofrequency',
    iconSrc: '/assets/images/Treatments-Icons/Radiofrequency.webp',
  },
  {
    id: 3,
    title: 'Cryoblation',
    description: 'Applies controlled cold to interrupt persistent pain signals.',
    link: '/treatments/minimally-invasive-treatments/cryoablation',
    iconSrc: '/assets/images/Treatments-Icons/Cryoablation.webp',
  },
];

function renderCarousel() {
  return render(
    <MemoryRouter>
      <TreatmentCategoryCarousel items={items} ariaLabel="Treatment categories carousel" />
    </MemoryRouter>
  );
}

describe('TreatmentCategoryCarousel', () => {
  it('renders each treatment card and its destination link', () => {
    renderCarousel();

    const region = screen.getByRole('region', { name: 'Treatment categories carousel' });
    const links = within(region).getAllByRole('link');
    const images = region.querySelectorAll('img');

    expect(links).toHaveLength(3);
    expect(within(region).getByRole('link', { name: /learn more about vertebroplasty/i })).toHaveAttribute(
      'href',
      '/treatments/minimally-invasive-treatments/vertebroplasty'
    );
    expect(images).toHaveLength(3);
    expect(images[0]).toHaveAttribute('src', '/assets/images/Treatments-Icons/Vertebroplasty.webp');
  });

  it('scrolls right when the next control is pressed', () => {
    renderCarousel();

    const region = screen.getByRole('region', { name: 'Treatment categories carousel' });
    const track = region.querySelector('.treatment-category-carousel__track');
    const nextButton = within(region).getByRole('button', { name: /scroll treatment categories carousel to the right/i });

    let scrollLeft = 0;

    Object.defineProperty(track, 'clientWidth', { configurable: true, value: 320 });
    Object.defineProperty(track, 'scrollWidth', { configurable: true, value: 1200 });
    Object.defineProperty(track, 'scrollLeft', {
      configurable: true,
      get: () => scrollLeft,
    });

    Object.defineProperty(window, 'getComputedStyle', {
      configurable: true,
      value: vi.fn(() => ({ columnGap: '18', gap: '18' })),
    });

    Object.defineProperty(track, 'querySelector', {
      configurable: true,
      value: vi.fn(() => ({ offsetWidth: 300 })),
    });

    const scrollBy = vi.fn(({ left }) => {
      scrollLeft += left;
      fireEvent.scroll(track);
    });

    Object.defineProperty(track, 'scrollBy', {
      configurable: true,
      value: scrollBy,
    });

    fireEvent(window, new Event('resize'));
    fireEvent.click(nextButton);

    expect(scrollBy).toHaveBeenCalledWith({
      left: 318,
      behavior: 'smooth',
    });
  });

  it('supports keyboard navigation for the track', () => {
    renderCarousel();

    const region = screen.getByRole('region', { name: 'Treatment categories carousel' });
    const track = region.querySelector('.treatment-category-carousel__track');

    Object.defineProperty(window, 'getComputedStyle', {
      configurable: true,
      value: vi.fn(() => ({ columnGap: '18', gap: '18' })),
    });

    Object.defineProperty(track, 'querySelector', {
      configurable: true,
      value: vi.fn(() => ({ offsetWidth: 300 })),
    });

    const scrollBy = vi.fn();
    const scrollTo = vi.fn();

    Object.defineProperty(track, 'scrollBy', {
      configurable: true,
      value: scrollBy,
    });

    Object.defineProperty(track, 'scrollTo', {
      configurable: true,
      value: scrollTo,
    });

    fireEvent.keyDown(track, { key: 'ArrowRight' });
    fireEvent.keyDown(track, { key: 'Home' });
    fireEvent.keyDown(track, { key: 'End' });

    expect(scrollBy).toHaveBeenCalledWith({
      left: 318,
      behavior: 'smooth',
    });
    expect(scrollTo).toHaveBeenNthCalledWith(1, {
      left: 0,
      behavior: 'smooth',
    });
    expect(scrollTo).toHaveBeenNthCalledWith(2, {
      left: expect.any(Number),
      behavior: 'smooth',
    });
  });
});
