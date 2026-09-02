import { fireEvent, render, screen } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { userResetPasswordAction } from '../../Store/actions/userActions';
import PasswordResetLinkComponent from './PasswordResetLinkComponent';

vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
  useSelector: vi.fn(),
}));

vi.mock('../../Store/actions/userActions', () => ({
  userResetPasswordAction: vi.fn((payload) => ({
    type: 'TEST_PASSWORD_RESET',
    payload,
  })),
}));

describe('PasswordResetLinkComponent', () => {
  const dispatch = vi.fn();

  beforeEach(() => {
    dispatch.mockClear();
    userResetPasswordAction.mockClear();
    useDispatch.mockReturnValue(dispatch);
    useSelector.mockReturnValue({
      loading: false,
      error: null,
      success: false,
    });
  });

  test('submits a valid password with the route token', () => {
    render(
      <MemoryRouter initialEntries={['/password-reset/test-token']}>
        <Routes>
          <Route
            path="/password-reset/:token"
            element={<PasswordResetLinkComponent />}
          />
        </Routes>
      </MemoryRouter>,
    );

    expect(
      screen.getByRole('heading', { name: 'Password workspace' }),
    ).toBeInTheDocument();

    const submitButton = screen.getByRole('button', {
      name: 'Update password',
    });
    expect(submitButton).toBeDisabled();

    fireEvent.change(screen.getByLabelText('New password'), {
      target: { value: 'Valid1!' },
    });
    fireEvent.click(submitButton);

    expect(userResetPasswordAction).toHaveBeenCalledWith({
      password: 'Valid1!',
      resetPasswordToken: 'test-token',
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: 'TEST_PASSWORD_RESET',
      payload: {
        password: 'Valid1!',
        resetPasswordToken: 'test-token',
      },
    });
  });
});
