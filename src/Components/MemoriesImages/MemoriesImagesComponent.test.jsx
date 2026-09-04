import { fireEvent, render, screen } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMemoryImageAction } from '../../Store/actions/imageUploadActions';
import MemoriesImagesComponent from './MemoriesImagesComponent';

vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
  useSelector: vi.fn(),
}));

vi.mock('../../Store/actions/imageUploadActions', () => ({
  memoryImageUploadAction: vi.fn(),
  deleteMemoryImageAction: vi.fn((id) => ({
    type: 'TEST_DELETE_MEMORY_IMAGE',
    payload: id,
  })),
}));

vi.mock('../Input/InputComponent', () => ({
  default: ({ id, label, type, name, accept, onChange }) => (
    <label htmlFor={id}>
      {label}
      <input
        id={id}
        type={type}
        name={name}
        accept={accept}
        onChange={onChange}
      />
    </label>
  ),
}));

vi.mock('../Button/ButtonComponent', () => ({
  default: ({ text, type, onClick, disabled }) => (
    <button type={type} onClick={onClick} disabled={disabled}>{text}</button>
  ),
}));

vi.mock('../Spinner/SpinnerComponent', () => ({
  default: () => <div>Loading image</div>,
}));

describe('MemoriesImagesComponent', () => {
  const dispatch = vi.fn();

  beforeEach(() => {
    dispatch.mockClear();
    deleteMemoryImageAction.mockClear();
    useDispatch.mockReturnValue(dispatch);
    useSelector.mockImplementation((selector) => selector({
      memoryImageUpload: { loading: {} },
      memoryDeleteImage: { loading: {} },
    }));
  });

  test('reveals the add-image input from one labelled action', () => {
    render(<MemoriesImagesComponent id="memory-1" />);

    const imageAction = screen.getByRole('button', { name: 'Add image' });
    expect(imageAction).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(imageAction);

    expect(imageAction).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByLabelText('Add an Image')).toBeInTheDocument();
  });

  test('keeps image deletion available inside existing-image options', () => {
    const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(true);
    render(
      <MemoriesImagesComponent
        id="memory-2"
        imgSrc="https://example.test/memory.jpg"
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Change image' }));
    fireEvent.click(screen.getByRole('button', { name: 'Delete image' }));

    expect(confirmSpy).toHaveBeenCalledOnce();
    expect(deleteMemoryImageAction).toHaveBeenCalledWith('memory-2');
    expect(dispatch).toHaveBeenCalledWith({
      type: 'TEST_DELETE_MEMORY_IMAGE',
      payload: 'memory-2',
    });

    confirmSpy.mockRestore();
  });
});
