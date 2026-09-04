import { fireEvent, render, screen } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { GOOGLE_USER_LOGIN_FAILURE } from '../../Store/constants/userConstants';
import LoginComponent from './LoginComponent';

vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
  useSelector: vi.fn(),
}));

vi.mock('@react-oauth/google', () => ({
  GoogleLogin: ({ onError }) => (
    <button type="button" onClick={onError}>Sign in with Google</button>
  ),
}));

describe('LoginComponent', () => {
  beforeEach(() => {
    useDispatch.mockReturnValue(vi.fn());
    useSelector.mockImplementation((selector) =>
      selector({
        userLogin: { loading: false, error: null, success: false },
        googleUserLogin: {
          loading: false,
          error: null,
          success: false,
        },
      }),
    );
  });

  test('presents Google as a clearly separated alternative to sign in', () => {
    render(<LoginComponent />);

    const actions = screen.getByText('Or continue with').parentElement;
    const primaryAction = screen.getByRole('button', { name: 'Sign in' });
    const googleAction = screen.getByRole('button', {
      name: 'Sign in with Google',
    });

    expect(actions).toContainElement(primaryAction);
    expect(actions).toContainElement(googleAction);
    expect(screen.queryByRole('heading', { name: 'Welcome back' })).toBeNull();
    expect(
      primaryAction.compareDocumentPosition(googleAction) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  test('shows a useful error when Google sign-in cannot complete', () => {
    const dispatch = vi.fn();
    useDispatch.mockReturnValue(dispatch);
    render(<LoginComponent />);

    fireEvent.click(screen.getByRole('button', { name: 'Sign in with Google' }));

    expect(dispatch).toHaveBeenCalledWith({
      type: GOOGLE_USER_LOGIN_FAILURE,
      payload: 'Google sign-in was cancelled or could not be completed.',
    });
  });
});
