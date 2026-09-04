import { fireEvent, render, screen } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import { memoryIsCompleteAction } from '../../Store/actions/memoriesActions';
import CardComponent from './CardComponent';

vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
}));

vi.mock('../../Store/actions/memoriesActions', () => ({
  memorySetDueDateAction: vi.fn(),
  memoryIsCompleteAction: vi.fn((memoryData) => ({
    type: 'TEST_MEMORY_COMPLETION',
    payload: memoryData,
  })),
}));

vi.mock('../Stars/StarsComponent', () => ({
  default: () => <div>Priority</div>,
}));

vi.mock('../Tags/TagsComponent', () => ({
  TagsComponent: () => null,
}));

vi.mock('../MemoriesImages/MemoriesImagesComponent', () => ({
  default: () => <button type="button">Image action</button>,
  MemoryImageDisplayComponent: () => null,
}));

vi.mock('../Modal/ModalComponent', () => ({
  default: () => null,
}));

vi.mock('../EditMemory/EditMemoryComponent', () => ({
  default: () => null,
}));

vi.mock('../DeleteMemory/DeleteMemoryComponent', () => ({
  default: () => <button type="button">Delete</button>,
}));

vi.mock('../Button/ButtonComponent', () => ({
  default: ({ onClick, text, type, variant, className, ...buttonProps }) => (
    <button
      type={type}
      onClick={onClick}
      className={[variant, className].filter(Boolean).join(' ')}
      {...buttonProps}
    >
      {text}
    </button>
  ),
}));

describe('CardComponent completion control', () => {
  const dispatch = vi.fn();
  const completedMemory = {
    _id: 'completed-memory',
    title: 'Completed memory',
    memory: 'This memory is complete.',
    setDueDate: false,
    isComplete: true,
    createdAt: '2026-09-01T10:00:00.000Z',
    updatedAt: '2026-09-02T10:00:00.000Z',
    priority: 1,
  };

  beforeEach(() => {
    dispatch.mockClear();
    memoryIsCompleteAction.mockClear();
    useDispatch.mockReturnValue(dispatch);
  });

  test('offers to unmark a completed memory and requests the active state', () => {
    render(<CardComponent memory={completedMemory} />);

    const completionButton = screen.getByRole('button', {
      name: 'Unmark as complete',
    });

    expect(completionButton).toHaveAttribute('aria-pressed', 'true');
    fireEvent.click(completionButton);

    expect(memoryIsCompleteAction).toHaveBeenCalledWith({
      id: 'completed-memory',
      isComplete: false,
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: 'TEST_MEMORY_COMPLETION',
      payload: {
        id: 'completed-memory',
        isComplete: false,
      },
    });
  });

  test('keeps supporting details and secondary actions in a disclosure', () => {
    render(
      <CardComponent
        memory={{
          ...completedMemory,
          _id: 'active-memory',
          title: 'Active memory',
          setDueDate: true,
          isComplete: false,
          dueDate: '2026-10-01T10:00:00.000Z',
        }}
      />,
    );

    expect(screen.getByText('This memory is complete.')).toBeVisible();
    expect(screen.queryByText('No date set.')).not.toBeInTheDocument();

    const disclosureControl = screen.getByText('Details and more actions');
    const disclosure = disclosureControl.closest('details');

    expect(disclosure).not.toHaveAttribute('open');
    fireEvent.click(disclosureControl);
    expect(disclosure).toHaveAttribute('open');
    expect(screen.getByText('Created')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Image action' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Read aloud' })).toBeInTheDocument();
    expect(screen.getByLabelText('Due date enabled')).toBeChecked();
    expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument();
  });
});
