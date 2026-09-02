import { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import ForgotPWSendEmailComponent from '../../Components/ForgotPWSendEmail/ForgotPWSendEmailComponent';
import LoginComponent from '../../Components/Login/LoginComponent';
import RegisterComponent from '../../Components/Register/RegisterComponent';
import '../../Css/authWorkspace.scss';

const FormsView = () => {
  const [mode, setMode] = useState('login');
  const { userInfo } = useSelector((state) => state.userLogin);
  const { userDetails } = useSelector((state) => state.userInfoDetails);
  const showAccountForms = !userInfo && !userDetails?.isConfirmed;

  const renderForm = () => {
    if (mode === 'register') {
      return <RegisterComponent />;
    }

    if (mode === 'forgot') {
      return <ForgotPWSendEmailComponent />;
    }

    return <LoginComponent />;
  };

  return (
    <section className="auth-workbench" aria-labelledby="auth-heading">
      <div className="auth-workbench__header">
        <div>
          <p>Secure account access</p>
          <h1 id="auth-heading">Account workspace</h1>
        </div>
        <span>{showAccountForms ? 'Authentication' : 'Account status'}</span>
      </div>

      {showAccountForms ? (
        <div className="auth-workbench__grid">
          <aside className="auth-guidance" aria-label="Account access guidance">
            <fieldset className="query-fieldset">
              <legend>Access your memories</legend>
              <div className="auth-guidance__intro">
                <h2>Your knowledge stays connected to your account</h2>
                <p>
                  Sign in to manage existing memories or create an account to
                  begin building your own private workspace.
                </p>
              </div>
              <dl className="auth-guidance__list">
                <div>
                  <dt>Private access</dt>
                  <dd>Your account controls which memories you can retrieve.</dd>
                </div>
                <div>
                  <dt>Flexible sign in</dt>
                  <dd>Use your email and password or your Google account.</dd>
                </div>
                <div>
                  <dt>Account recovery</dt>
                  <dd>Request a secure reset link if you forget your password.</dd>
                </div>
              </dl>
            </fieldset>
          </aside>

          <div className="auth-entry-panel">
            <div className="auth-mode-switcher" aria-label="Choose account action">
              <button
                type="button"
                className={mode === 'login' ? 'is-active' : ''}
                aria-pressed={mode === 'login'}
                onClick={() => setMode('login')}
              >
                Sign in
              </button>
              <button
                type="button"
                className={mode === 'register' ? 'is-active' : ''}
                aria-pressed={mode === 'register'}
                onClick={() => setMode('register')}
              >
                Create account
              </button>
              <button
                type="button"
                className={mode === 'forgot' ? 'is-active' : ''}
                aria-pressed={mode === 'forgot'}
                onClick={() => setMode('forgot')}
              >
                Reset password
              </button>
            </div>
            {renderForm()}
          </div>
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
