import { fireEvent, render, screen } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { contactFormAction } from '../../Store/actions/ContactFormActions';
import ContactComponent from './ContactComponent';

vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
  useSelector: vi.fn(),
}));

vi.mock('../../Store/actions/ContactFormActions', () => ({
  contactFormAction: vi.fn((formData) => ({
    type: 'TEST_CONTACT_FORM',
    payload: formData,
  })),
}));

describe('ContactComponent', () => {
  const dispatch = vi.fn();

  beforeEach(() => {
    dispatch.mockClear();
    contactFormAction.mockClear();
    useDispatch.mockReturnValue(dispatch);
    useSelector.mockReturnValue({
      loading: false,
      error: null,
      success: false,
    });
  });

  test('presents a focused contact workspace and submits valid form data', () => {
    render(<ContactComponent />);

    expect(
      screen.getByRole('heading', { name: 'Contact workspace' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('group', { name: 'Before you send' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('group', { name: 'Send an enquiry' }),
    ).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'About' })).not.toBeInTheDocument();

    const submitButton = screen.getByRole('button', { name: 'Send enquiry' });
    expect(submitButton).toBeDisabled();

    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'Gary Allin' },
    });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'gary@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Message'), {
      target: { value: 'Please help with my account.' },
    });
    fireEvent.click(submitButton);

    expect(contactFormAction).toHaveBeenCalledWith({
      name: 'Gary Allin',
      email: 'gary@example.com',
      message: 'Please help with my account.',
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: 'TEST_CONTACT_FORM',
      payload: {
        name: 'Gary Allin',
        email: 'gary@example.com',
        message: 'Please help with my account.',
      },
    });
  });
});
