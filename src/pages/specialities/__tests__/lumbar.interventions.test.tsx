import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LumbarInterventions from '../../../components/LumbarInterventions';

describe('LumbarInterventions', () => {
  beforeEach(() => {
    // @ts-expect-error dataLayer typeless
    window.dataLayer = [];
  });

  it('renders intervention cards', () => {
    render(
      <MemoryRouter>
        <LumbarInterventions />
      </MemoryRouter>
    );
    const titles = [
      'Radiofrequency',
      'Cryoablation',
      'Corticosteroid Injection',
      'Platelet Rich Plasma',
      'Peripheral Nerve Block',
      'Pharmacological Management',
    ];
    for (const t of titles) {
      expect(screen.getByRole('heading', { name: t })).toBeInTheDocument();
    }
  });

  it('pushes analytics event on card click', () => {
    render(
      <MemoryRouter>
        <LumbarInterventions />
      </MemoryRouter>
    );
    const link = screen.getByRole('link', { name: /radiofrequency/i });
    fireEvent.click(link);
    // @ts-expect-error dataLayer typeless
    const layer = window.dataLayer as Array<any>;
    const evt = layer.find((e) => e && e.event === 'lumbar_intervention_click');
    expect(evt).toBeTruthy();
    expect(evt.intervention).toBe('radiofrequency');
  });
});
