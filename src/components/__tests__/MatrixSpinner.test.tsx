import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MatrixSpinner, useMatrixSpinner } from '../MatrixSpinner';
import { renderHook, act } from '@testing-library/react';

// Mock animejs
vi.mock('animejs', () => ({
  animate: vi.fn(() => ({ pause: vi.fn() })),
  stagger: vi.fn((delay) => delay)
}));

describe('MatrixSpinner', () => {
  it('renders when isLoading is true', () => {
    render(<MatrixSpinner isLoading={true} />);
    
    const spinner = screen.getByLabelText('Loading');
    expect(spinner).toBeInTheDocument();
  });

  it('does not render when isLoading is false', () => {
    const { container } = render(<MatrixSpinner isLoading={false} />);
    
    expect(container.firstChild).toBeNull();
  });

  it('displays custom loading text', () => {
    render(<MatrixSpinner isLoading={true} text="Saving changes..." />);
    
    const spinner = screen.getByLabelText('Saving changes...');
    expect(spinner).toBeInTheDocument();
    expect(screen.getByText('Saving changes...')).toBeInTheDocument();
  });

  it('applies size classes correctly', () => {
    const { rerender } = render(<MatrixSpinner isLoading={true} size="small" />);
    expect(document.querySelector('.small')).toBeInTheDocument();

    rerender(<MatrixSpinner isLoading={true} size="large" />);
    expect(document.querySelector('.large')).toBeInTheDocument();
  });

  it('shows progress bar when enabled', () => {
    render(<MatrixSpinner isLoading={true} showProgress={true} progress={50} />);
    
    const progressBar = document.querySelector('.matrixSpinnerProgressBar');
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveStyle({ transform: 'scaleX(0.5)' });
  });

  it('renders correct number of matrix characters', () => {
    render(<MatrixSpinner isLoading={true} />);
    
    const chars = document.querySelectorAll('.spinnerChar');
    expect(chars).toHaveLength(8);
  });

  it('includes accessibility text for screen readers', () => {
    render(<MatrixSpinner isLoading={true} showProgress={true} progress={75} />);
    
    const srText = screen.getByText('Loading - 75% complete');
    expect(srText).toHaveClass('matrixSpinnerSrOnly');
  });
});

describe('useMatrixSpinner hook', () => {
  it('manages loading state correctly', () => {
    const { result } = renderHook(() => useMatrixSpinner());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.progress).toBe(0);

    act(() => {
      result.current.showSpinner('Processing...');
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.progress).toBe(0);

    act(() => {
      result.current.updateProgress(50);
    });

    expect(result.current.progress).toBe(50);

    act(() => {
      result.current.hideSpinner();
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.progress).toBe(0);
  });

  it('clamps progress values between 0 and 100', () => {
    const { result } = renderHook(() => useMatrixSpinner());

    act(() => {
      result.current.updateProgress(-10);
    });
    expect(result.current.progress).toBe(0);

    act(() => {
      result.current.updateProgress(150);
    });
    expect(result.current.progress).toBe(100);
  });

  it('provides SpinnerComponent with bound props', () => {
    const { result } = renderHook(() => useMatrixSpinner());

    act(() => {
      result.current.showSpinner();
      result.current.updateProgress(25);
    });

    const { SpinnerComponent } = result.current;
    render(<SpinnerComponent text="Custom text" />);

    expect(screen.getByLabelText('Custom text')).toBeInTheDocument();
    const progressBar = document.querySelector('.matrixSpinnerProgressBar');
    expect(progressBar).toHaveStyle({ transform: 'scaleX(0.25)' });
  });
});