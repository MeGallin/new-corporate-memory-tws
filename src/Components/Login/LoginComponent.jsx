import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleLogin } from '@react-oauth/google';

import {
  loginAction,
  googleUserLoginAction,
} from '../../Store/actions/userActions';
import {
  USER_LOGIN_RESET,
  GOOGLE_USER_LOGIN_FAILURE,
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
  const googleLoginContainerRef = useRef(null);
  const [googleButtonWidth, setGoogleButtonWidth] = useState(320);
  const { email, password } = formData;
  const isEmailInvalid = email.length > 0 && !isValidEmail(email);
  const isPasswordInvalid =
    password.length > 0 && !isValidLoginPassword(password);
  const isFormInvalid = !isValidEmail(email) || !isValidLoginPassword(password);

  useEffect(() => {
    const container = googleLoginContainerRef.current;
    if (!container) return undefined;

    const updateGoogleButtonWidth = () => {
      const measuredWidth = Math.floor(container.getBoundingClientRect().width);
      setGoogleButtonWidth(Math.max(200, Math.min(400, measuredWidth)));
    };

    updateGoogleButtonWidth();

    if (typeof ResizeObserver === 'undefined') return undefined;
    const resizeObserver = new ResizeObserver(updateGoogleButtonWidth);
    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, [googleLoading]);

  useEffect(() => {
    if (success) setFormData({ email: '', password: '' });
  }, [success]);

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    if (isFormInvalid) return;
    dispatch(loginAction(formData));
  };

  const googleSuccess = async (googleResponse) => {
    dispatch(googleUserLoginAction(googleResponse));
  };

  const googleFailure = () => {
    dispatch({
      type: GOOGLE_USER_LOGIN_FAILURE,
      payload: 'Google sign-in was cancelled or could not be completed.',
    });
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

            <div className="auth-login-actions">
              <ButtonComponent
                type="submit"
                text="Sign in"
                variant="success"
                className="auth-login-submit"
                disabled={isFormInvalid}
              />

              <span className="auth-provider-divider">
                Or continue with
              </span>

              {googleLoading ? (
                <div
                  className="google-login-container"
                  ref={googleLoginContainerRef}
                >
                  <SpinnerComponent />
                </div>
              ) : (
                <div
                  className="google-login-container"
                  ref={googleLoginContainerRef}
                >
                  <GoogleLogin
                    onSuccess={googleSuccess}
                    onError={googleFailure}
                    width={String(googleButtonWidth)}
                  />
                </div>
              )}
            </div>
          </form>
        </fieldset>
      )}
    </>
  );
};

export default LoginComponent;
