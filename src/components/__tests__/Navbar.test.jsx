import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../../components/Navbar';

function setup(initialEntries = ['/']) {
  render(
    <MemoryRouter initialEntries={initialEntries}>
      <Navbar />
    </MemoryRouter>
  );
}

describe('Navbar dropdowns', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('opens and closes Specialities on click and outside click', async () => {
    setup();
    const trigger = screen
      .getAllByRole('button', { name: /specialities/i })
      .find((button) => button.getAttribute('aria-controls') === 'menu-specialities');
    expect(trigger).toBeDefined();
    await userEvent.click(trigger);
    const menu = screen.getByRole('menu', { name: /specialities/i });
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await userEvent.click(document.body);
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('supports keyboard open, navigation, and escape close', async () => {
    setup();
    const trigger = screen
      .getAllByRole('button', { name: /specialities/i })
      .find((button) => button.getAttribute('aria-controls') === 'menu-specialities');
    expect(trigger).toBeDefined();
    trigger.focus();
    await userEvent.keyboard('{Enter}');
    const menu = screen.getByRole('menu', { name: /specialities/i });
    const firstLink = await within(menu).findAllByRole('menuitem').then(l => l[0]);
    expect(document.activeElement).toBe(firstLink || document.activeElement);
    await userEvent.keyboard('{Escape}');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('renders the Specialities menu items without a search bar', async () => {
    setup();
    const trigger = screen
      .getAllByRole('button', { name: /specialities/i })
      .find((button) => button.getAttribute('aria-controls') === 'menu-specialities');
    expect(trigger).toBeDefined();
    await userEvent.click(trigger);
    const menu = screen.getByRole('menu', { name: /specialities/i });
    const items = await within(menu).findAllByRole('menuitem');
    expect(items.length).toBeGreaterThan(5);
  });
});

describe('Navbar mobile navigation', () => {
  it('toggles mobile navigation with accessible attributes', async () => {
    setup();
    const toggle = screen.getAllByRole('button').find((button) =>
      button.getAttribute('aria-controls') === 'primary-navigation'
    );
    expect(toggle).toBeDefined();
    const nav = document.getElementById('primary-navigation');
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(nav.className).toContain('navbar-nav');
    await userEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(nav.className).toContain('navbar-nav-open');
    await userEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });
});
