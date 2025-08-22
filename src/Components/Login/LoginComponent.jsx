import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {  loginAction,  googleUserLoginAction,} from '../../Store/actions/userActions';

import { emailRegEx, passwordRegEx } from '../../Utils/regEx';

import InputComponent from '../../Components/Input/InputComponent';
import ButtonComponent from '../../Components/Button/ButtonComponent';
import SpinnerComponent from '../Spinner/SpinnerComponent';
import ErrorComponent from '../Error/ErrorComponent';
import SuccessComponent from '../Success/SuccessComponent';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import './LoginComponent.scss';

const LoginComponent = () => {
  const dispatch = useDispatch();

  const { loading, error, success } = useSelector((state) => state.userLogin);
  const { loading: googleLoading, error: googleError } = useSelector(
    (state) => state.googleUserLogin,
  );

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;

  const isFormInvalid = !emailRegEx.test(email) || password.length <= 5;

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    dispatch(loginAction(formData));
    setFormData({ email: '', password: '' });
  };

  const googleSuccess = async (googleRes) => {
    dispatch(googleUserLoginAction(googleRes));
  };

  const googleFailure = (error) => {
    console.error('Error with Google login:', error);
  };

  const handleOnchange = (e) => {
    setFormData((previousState) => ({
      ...previousState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div>
      {error && <ErrorComponent error={error} />}
      {googleError && <ErrorComponent error={googleError} />}
      {success && (
        <SuccessComponent message={'You have successfully logged in.'} />
      )}

      {loading ? (
        <SpinnerComponent />
      ) : (
        <fieldset className="fieldSet">
          <legend>Login</legend>

          <div>
            <form onSubmit={handleLoginSubmit}>
              <InputComponent
                id="login-email"
                label="Email"
                type="email"
                name="email"
                value={email}
                className={!emailRegEx.test(email) ? 'invalid' : 'entered'}
                onChange={handleOnchange}
              />
              <InputComponent
                id="login-password"
                label="Password"
                type="password"
                name="password"
                value={password}
                required
                className={
                  !passwordRegEx.test(password) ? 'invalid' : 'entered'
                }
                onChange={handleOnchange}
              />

              <div className="login-actions-wrapper">
                <ButtonComponent
                  type="submit"
                  text={isFormInvalid ? 'Disabled' : 'Login'}
                  variant="dark"
                  disabled={isFormInvalid}
                />

                {googleLoading ? (
                  <SpinnerComponent />
                ) : (
                  <div className="google-login-container">
                    <GoogleOAuthProvider
                      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                    >
                      <GoogleLogin
                        onSuccess={googleSuccess}
                        onError={googleFailure}
                      />
                    </GoogleOAuthProvider>
                  </div>
                )}
              </div>
            </form>
          </div>
        </fieldset>
      )}
    </div>
  );
};

export default LoginComponent;
