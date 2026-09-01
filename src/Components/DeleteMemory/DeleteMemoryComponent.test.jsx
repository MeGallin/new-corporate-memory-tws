import { fireEvent, render, screen } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { memoryDeleteAction } from '../../Store/actions/memoriesActions';
import DeleteMemoryComponent from './DeleteMemoryComponent';

vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
  useSelector: vi.fn(),
}));

vi.mock('../../Store/actions/memoriesActions', () => ({
  memoryDeleteAction: vi.fn((id) => ({
    type: 'TEST_MEMORY_DELETE',
    payload: id,
  })),
}));

describe('DeleteMemoryComponent', () => {
  const dispatch = vi.fn();

  beforeEach(() => {
    document.body.innerHTML = '<div id="root"></div><div id="modal-root"></div>';
    dispatch.mockClear();
    memoryDeleteAction.mockReset();
    memoryDeleteAction.mockImplementation((id) => ({
      type: 'TEST_MEMORY_DELETE',
      payload: id,
    }));
    useDispatch.mockReturnValue(dispatch);
    useSelector.mockReturnValue({ loading: false });
  });

  test('requires a separate confirmation before dispatching deletion', () => {
    render(<DeleteMemoryComponent id="memory-123" />);

    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));

    expect(screen.getByText('Delete this memory?')).toBeInTheDocument();
    expect(dispatch).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));

    expect(screen.queryByText('Delete this memory?')).not.toBeInTheDocument();
    expect(dispatch).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
    fireEvent.click(screen.getByRole('button', { name: 'Delete memory' }));

    expect(memoryDeleteAction).toHaveBeenCalledWith('memory-123');
    expect(dispatch).toHaveBeenCalledWith({
      type: 'TEST_MEMORY_DELETE',
      payload: 'memory-123',
    });
  });
});
