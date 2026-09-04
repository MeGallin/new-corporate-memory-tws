import { act, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import DateTimeComponent from './DateTimeComponent';

describe('DateTimeComponent', () => {
  it('uses one interval and clears it on unmount', () => {
    vi.useFakeTimers();
    const clearIntervalSpy = vi.spyOn(window, 'clearInterval');
    const { unmount } = render(<DateTimeComponent />);

    expect(screen.getByText(/\d{4}/)).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(3000));
    expect(vi.getTimerCount()).toBe(1);

    unmount();
    expect(clearIntervalSpy).toHaveBeenCalledTimes(1);
    expect(vi.getTimerCount()).toBe(0);

    clearIntervalSpy.mockRestore();
    vi.useRealTimers();
  });
});
