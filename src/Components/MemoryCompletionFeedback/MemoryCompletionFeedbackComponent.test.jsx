import { fireEvent, render, screen } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { MEMORIES_IS_COMPETE_RESET } from '../../Store/constants/memoriesConstants';
import MemoryCompletionFeedbackComponent from './MemoryCompletionFeedbackComponent';

vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
  useSelector: vi.fn(),
}));

vi.mock('../Error/ErrorComponent', () => ({
  default: ({ error }) => <div>{error}</div>,
}));

vi.mock('../Success/SuccessComponent', () => ({
  default: ({ message, onClose }) => (
    <button type="button" onClick={onClose}>{message}</button>
  ),
}));

describe('MemoryCompletionFeedbackComponent', () => {
  const dispatch = vi.fn();

  beforeEach(() => {
    dispatch.mockClear();
    useDispatch.mockReturnValue(dispatch);
  });

  test('confirms that a memory was marked as complete', () => {
    useSelector.mockReturnValue({ success: true, isComplete: true });

    render(<MemoryCompletionFeedbackComponent />);

    expect(
      screen.getByText('Memory has been marked as complete.'),
    ).toBeInTheDocument();
  });

  test('confirms that a memory is no longer marked as complete', () => {
    useSelector.mockReturnValue({ success: true, isComplete: false });

    render(<MemoryCompletionFeedbackComponent />);

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Memory is no longer marked as complete.',
      }),
    );

    expect(dispatch).toHaveBeenCalledWith({
      type: MEMORIES_IS_COMPETE_RESET,
    });
  });
});
