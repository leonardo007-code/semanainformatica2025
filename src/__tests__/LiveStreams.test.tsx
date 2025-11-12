import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import LiveStreams from '../components/LiveStreams';

describe('LiveStreams', () => {
  it('renders live streams section with title', () => {
    render(<LiveStreams />);
    expect(screen.getByText('Transmisiones en Vivo')).toBeInTheDocument();
  });

  it('renders stream cards', () => {
    render(<LiveStreams />);
    const watchButtons = screen.getAllByRole('button', { name: /ver transmisión/i });
    expect(watchButtons.length).toBeGreaterThan(0);
  });

  it('opens modal when clicking watch button', () => {
    render(<LiveStreams />);
    const firstWatchButton = screen.getAllByRole('button', { name: /ver transmisión/i })[0];
    fireEvent.click(firstWatchButton);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});
