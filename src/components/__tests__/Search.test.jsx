import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Search from '../Search';

describe('Search Component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  const setup = () => {
    render(
      <MemoryRouter>
        <Search />
      </MemoryRouter>
    );
  };

  it('opens on input focus', async () => {
    setup();
    const input = screen.getByRole('textbox', { name: /search/i });
    
    await act(async () => {
      input.focus();
    });
    
    expect(input).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('closes on outside click', async () => {
    setup();
    const input = screen.getByRole('textbox', { name: /search/i });
    
    await act(async () => {
      input.focus();
    });
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    
    // Simulate mousedown on document body (outside)
    await act(async () => {
      fireEvent.mouseDown(document.body);
    });
    
    expect(input).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('prevents premature closure on suggestion interaction', async () => {
    setup();
    const input = screen.getByRole('textbox', { name: /search/i });
    
    await act(async () => {
      input.focus();
    });
    
    // Check for popular searches
    const listbox = screen.getByRole('listbox');
    const suggestions = screen.getAllByRole('button'); // Should find suggestion buttons
    const suggestion = suggestions[0];

    // Test 1: Verify mousedown prevents default (to stop blur)
    // Instead of spying on preventDefault, we check if focus remains on input
    expect(document.activeElement).toBe(input);
    fireEvent.mouseDown(suggestion);
    expect(document.activeElement).toBe(input);

    // Test 2: Verify timeout reset mechanism
    // Trigger blur (which starts the close timer)
    fireEvent.blur(input);
    
    // Should still be open immediately
    expect(input).toHaveAttribute('aria-expanded', 'true');

    // Simulate interaction resetting timeout within the 200ms window
    fireEvent.mouseDown(listbox); 
    
    // Advance time past the original timeout
    act(() => {
      vi.advanceTimersByTime(300);
    });
    
    // Should still be open because mouseDown reset the timeout (or rather cleared it)
    expect(input).toHaveAttribute('aria-expanded', 'true');
  });

  it('handles touch interactions correctly', async () => {
    setup();
    const input = screen.getByRole('textbox', { name: /search/i });
    
    await act(async () => {
      input.focus();
    });
    
    const listbox = screen.getByRole('listbox');
    
    // Simulate blur
    fireEvent.blur(input);
    
    // Simulate touch start on dropdown (should clear timeout)
    fireEvent.touchStart(listbox);
    
    // Advance time past timeout
    act(() => {
      vi.advanceTimersByTime(300);
    });
    
    expect(input).toHaveAttribute('aria-expanded', 'true');
  });

  it('closes after timeout if no interaction', async () => {
    setup();
    const input = screen.getByRole('textbox', { name: /search/i });
    
    await act(async () => {
      input.focus();
    });
    expect(input).toHaveAttribute('aria-expanded', 'true');
    
    // Blur and wait
    fireEvent.blur(input);
    
    act(() => {
      vi.advanceTimersByTime(300);
    });
    
    expect(input).toHaveAttribute('aria-expanded', 'false');
  });
});
