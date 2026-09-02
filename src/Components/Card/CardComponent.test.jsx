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
  default: () => null,
}));

vi.mock('../Button/ButtonComponent', () => ({
  default: ({ onClick, text, type }) => (
    <button type={type} onClick={onClick}>{text}</button>
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

    fireEvent.click(screen.getByLabelText('Unmark as complete'));

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
});
