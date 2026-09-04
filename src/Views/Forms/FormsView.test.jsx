import { fireEvent, render, screen } from '@testing-library/react';
import { useSelector } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import FormsView from './FormsView';

vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
}));

vi.mock('../../Components/Login/LoginComponent', () => ({
  default: () => <fieldset><legend>Sign in form</legend></fieldset>,
}));

vi.mock('../../Components/Register/RegisterComponent', () => ({
  default: () => <fieldset><legend>Create account form</legend></fieldset>,
}));

vi.mock('../../Components/ForgotPWSendEmail/ForgotPWSendEmailComponent', () => ({
  default: () => <fieldset><legend>Reset password form</legend></fieldset>,
}));

describe('FormsView', () => {
  beforeEach(() => {
    useSelector.mockImplementation((selector) =>
      selector({
        userLogin: { userInfo: null },
        userInfoDetails: { userDetails: null },
      }),
    );
  });

  test('switches between semantic account forms', () => {
    render(
      <MemoryRouter>
        <FormsView />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole('heading', { name: 'Sign in to your memories' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('group', { name: 'Sign in form' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('group', { name: 'Account guidance' }),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Create account' }));
    expect(
      screen.getByRole('heading', { name: 'Create your account' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('group', { name: 'Create account form' }),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Reset password' }));
    expect(
      screen.getByRole('heading', { name: 'Reset your password' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('group', { name: 'Reset password form' }),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Sign in' }));
    expect(
      screen.getByRole('group', { name: 'Sign in form' }),
    ).toBeInTheDocument();
  });

  test('places only the alternative account actions after the active form', () => {
    render(
      <MemoryRouter>
        <FormsView />
      </MemoryRouter>,
    );

    const signInForm = screen.getByRole('group', { name: 'Sign in form' });
    const accountOptions = screen.getByRole('navigation', {
      name: 'Other account options',
    });
    const accountGuidance = screen.getByRole('complementary', {
      name: 'Account access guidance',
    });
    expect(
      screen.getByRole('group', { name: 'Other account options' }),
    ).toContainElement(accountOptions);

    expect(
      signInForm.compareDocumentPosition(accountOptions) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(
      accountOptions.compareDocumentPosition(accountGuidance) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(
      screen.queryByRole('button', { name: 'Sign in' }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Create account' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Reset password' }),
    ).toBeInTheDocument();
  });
});
