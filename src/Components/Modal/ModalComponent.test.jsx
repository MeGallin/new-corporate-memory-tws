import { fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';
import ModalComponent from './ModalComponent';

const ModalHarness = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        Open dialog
      </button>
      <ModalComponent
        isOpen={isOpen}
        onClose={() => setOpen(false)}
        ariaLabel="Test dialog"
        closeButtonTitle="Close test dialog"
      >
        <p>Dialog content</p>
      </ModalComponent>
    </>
  );
};

describe('ModalComponent', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="root"></div><div id="modal-root"></div>';
  });

  test('provides dialog semantics, locks scrolling, and restores trigger focus', () => {
    render(<ModalHarness />);

    const trigger = screen.getByRole('button', { name: 'Open dialog' });
    trigger.focus();
    fireEvent.click(trigger);

    expect(
      screen.getByRole('dialog', { name: 'Test dialog' }),
    ).toBeInTheDocument();
    expect(document.body).toHaveStyle({ overflow: 'hidden' });

    fireEvent.click(
      screen.getByRole('button', { name: 'Close test dialog' }),
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe('');
    expect(trigger).toHaveFocus();
  });

  test('closes when Escape is pressed', () => {
    render(<ModalHarness />);
    fireEvent.click(screen.getByRole('button', { name: 'Open dialog' }));

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
