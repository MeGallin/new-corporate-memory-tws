import { render, screen } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import LoginComponent from './LoginComponent';

vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
  useSelector: vi.fn(),
}));

vi.mock('@react-oauth/google', () => ({
  GoogleLogin: () => <button type="button">Sign in with Google</button>,
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
});
