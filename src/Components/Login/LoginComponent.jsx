import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

import {
  loginAction,
  googleUserLoginAction,
} from '../../Store/actions/userActions';
import {
  USER_LOGIN_RESET,
  GOOGLE_USER_LOGIN_RESET,
} from '../../Store/constants/userConstants';
import {
  isValidEmail,
  isValidLoginPassword,
} from '../../Utils/validation';

import InputComponent from '../Input/InputComponent';
import ButtonComponent from '../Button/ButtonComponent';
import SpinnerComponent from '../Spinner/SpinnerComponent';
import ErrorComponent from '../Error/ErrorComponent';
import SuccessComponent from '../Success/SuccessComponent';

const LoginComponent = () => {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.userLogin);
  const {
    loading: googleLoading,
    error: googleError,
    success: googleSuccessState,
  } = useSelector((state) => state.googleUserLogin);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;
  const isEmailInvalid = email.length > 0 && !isValidEmail(email);
  const isPasswordInvalid =
    password.length > 0 && !isValidLoginPassword(password);
  const isFormInvalid = !isValidEmail(email) || !isValidLoginPassword(password);

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    if (isFormInvalid) return;
    dispatch(loginAction(formData));
    setFormData({ email: '', password: '' });
  };

  const googleSuccess = async (googleResponse) => {
    dispatch(googleUserLoginAction(googleResponse));
  };

  const googleFailure = (googleErrorDetails) => {
    console.error('Error with Google login:', googleErrorDetails);
  };

  const handleOnchange = (event) => {
    setFormData((previousState) => ({
      ...previousState,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <>
      {error && <ErrorComponent error={error} />}
      {googleError && <ErrorComponent error={googleError} />}
      {success && (
        <SuccessComponent
          message="You have successfully logged in."
          onClose={() => dispatch({ type: USER_LOGIN_RESET })}
        />
      )}
      {googleSuccessState && (
        <SuccessComponent
          message="You have successfully logged in with Google."
          onClose={() => dispatch({ type: GOOGLE_USER_LOGIN_RESET })}
        />
      )}

      {loading ? (
        <SpinnerComponent />
      ) : (
        <fieldset className="query-fieldset auth-form-section">
          <legend>Sign in</legend>
          <div className="auth-form-header">
            <h2>Welcome back</h2>
            <p>Use your account details or continue with Google.</p>
          </div>

          <form onSubmit={handleLoginSubmit}>
            <InputComponent
              id="login-email"
              label="Email"
              type="email"
              name="email"
              value={email}
              placeholder="you@example.com"
              autoComplete="email"
              required
              className={isEmailInvalid ? 'invalid' : email ? 'entered' : ''}
              error={isEmailInvalid ? 'Enter a valid email address.' : null}
              onChange={handleOnchange}
            />
            <InputComponent
              id="login-password"
              label="Password"
              type="password"
              name="password"
              value={password}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
              className={
                isPasswordInvalid ? 'invalid' : password ? 'entered' : ''
              }
              error={
                isPasswordInvalid
                  ? 'Enter a password containing at least 6 characters.'
                  : null
              }
              onChange={handleOnchange}
            />

            <div className="auth-form-actions">
              <ButtonComponent
                type="submit"
                text="Sign in"
                variant="success"
                disabled={isFormInvalid}
              />
            </div>

            <div className="auth-provider-divider">Or</div>

            {googleLoading ? (
              <SpinnerComponent />
            ) : (
              <div className="google-login-container">
                <GoogleOAuthProvider
                  clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
                >
                  <GoogleLogin
                    onSuccess={googleSuccess}
                    onError={googleFailure}
                  />
                </GoogleOAuthProvider>
              </div>
            )}
          </form>
        </fieldset>
      )}
    </>
  );
};

export default LoginComponent;
