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
  const memory = {
    _id: 'memory-123',
    title: 'Quarterly supplier review',
    memory: 'Confirm the revised delivery terms with the supplier.',
    setDueDate: true,
    dueDate: '2026-10-01T10:00:00.000Z',
    createdAt: '2026-09-01T10:00:00.000Z',
    updatedAt: '2026-09-02T10:00:00.000Z',
  };

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
    render(<DeleteMemoryComponent memory={memory} />);

    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));

    const dialog = screen.getByRole('dialog', {
      name: 'Delete memory: Quarterly supplier review',
    });

    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveClass('modal-wrapper--danger');
    expect(
      screen.getByRole('heading', { name: 'Quarterly supplier review' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Confirm the revised delivery terms with the supplier.'),
    ).toBeInTheDocument();
    expect(screen.getByText('1st Sep 2026')).toBeInTheDocument();
    expect(screen.getByText('2nd Sep 2026')).toBeInTheDocument();
    expect(screen.getByText('1st Oct 2026')).toBeInTheDocument();
    expect(dispatch).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));

    expect(
      screen.queryByRole('dialog', {
        name: 'Delete memory: Quarterly supplier review',
      }),
    ).not.toBeInTheDocument();
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
