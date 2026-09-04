import { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import ForgotPWSendEmailComponent from '../../Components/ForgotPWSendEmail/ForgotPWSendEmailComponent';
import LoginComponent from '../../Components/Login/LoginComponent';
import RegisterComponent from '../../Components/Register/RegisterComponent';
import '../../Css/authWorkspace.scss';

const ACCOUNT_MODES = {
  login: {
    actionLabel: 'Sign in',
    eyebrow: 'Secure account access',
    heading: 'Sign in to your memories',
    FormComponent: LoginComponent,
  },
  register: {
    actionLabel: 'Create account',
    eyebrow: 'New account',
    heading: 'Create your account',
    FormComponent: RegisterComponent,
  },
  forgot: {
    actionLabel: 'Reset password',
    eyebrow: 'Account recovery',
    heading: 'Reset your password',
    FormComponent: ForgotPWSendEmailComponent,
  },
};

const ACCOUNT_ACTIONS = Object.entries(ACCOUNT_MODES).map(
  ([id, { actionLabel }]) => ({ id, label: actionLabel }),
);

const FormsView = () => {
  const [mode, setMode] = useState('login');
  const { userInfo } = useSelector((state) => state.userLogin);
  const { userDetails } = useSelector((state) => state.userInfoDetails);
  const showAccountForms = !userInfo && !userDetails?.isConfirmed;

  const currentMode = ACCOUNT_MODES[mode];
  const ActiveForm = currentMode.FormComponent;

  return (
    <section className="auth-workbench" aria-labelledby="auth-heading">
      <div className="auth-workbench__header">
        <div>
          <p>{showAccountForms ? currentMode.eyebrow : 'Secure account access'}</p>
          <h1 id="auth-heading">
            {showAccountForms ? currentMode.heading : 'Account workspace'}
          </h1>
        </div>
        {!showAccountForms && <span>Account status</span>}
      </div>

      {showAccountForms ? (
        <div className="auth-workbench__grid">
          <div className="auth-entry-panel">
            <ActiveForm />
            <fieldset className="query-fieldset auth-mode-switcher">
              <legend>Other account options</legend>
              <p>Choose a different action only if you need it.</p>
              <nav
                className="auth-mode-switcher__actions"
                aria-label="Other account options"
              >
                {ACCOUNT_ACTIONS
                  .filter(({ id }) => id !== mode)
                  .map(({ id, label }) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setMode(id)}
                    >
                      {label}
                    </button>
                  ))}
              </nav>
            </fieldset>
          </div>

          <aside className="auth-guidance" aria-label="Account access guidance">
            <fieldset className="query-fieldset">
              <legend>Account guidance</legend>
              <div className="auth-guidance__intro">
                <h2>Your memories stay private</h2>
              </div>
              <dl className="auth-guidance__list">
                <div>
                  <dt>Private access</dt>
                  <dd>Only you can retrieve your memories.</dd>
                </div>
                <div>
                  <dt>Choose how to sign in</dt>
                  <dd>Use your email and password or your Google account.</dd>
                </div>
                <div>
                  <dt>Forgot your password?</dt>
                  <dd>Request a secure reset link if you forget your password.</dd>
                </div>
              </dl>
            </fieldset>
          </aside>
        </div>
      ) : (
        <fieldset className="query-fieldset auth-account-status">
          <legend>Account status</legend>
          {userDetails?.isConfirmed ? (
            <div>
              <h2>Welcome back, {userDetails.name}</h2>
              <p>Your account is confirmed and ready to use.</p>
              <div className="auth-account-status__actions">
                <NavLink className="auth-workspace-link" to="/memories">
                  View memories
                </NavLink>
                <NavLink className="auth-workspace-link" to="/user-admin">
                  Open dashboard
                </NavLink>
              </div>
            </div>
          ) : (
            <div>
              <h2>Email confirmation required</h2>
              <p>
                Your email address has not been confirmed. If the confirmation
                message did not arrive, please use the contact workspace.
              </p>
              <NavLink className="auth-workspace-link" to="/contact">
                Contact us
              </NavLink>
            </div>
          )}
        </fieldset>
      )}
    </section>
  );
};

export default FormsView;
