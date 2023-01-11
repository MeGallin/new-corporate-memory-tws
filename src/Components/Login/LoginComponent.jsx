import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  loginAction,
  googleUserLoginAction,
} from '../../Store/actions/userActions';

import { emailRegEx, passwordRegEx } from '../../Utils/regEx';

import InputComponent from '../../Components/Input/InputComponent';
import ButtonComponent from '../../Components/Button/ButtonComponent';
import SpinnerComponent from '../Spinner/SpinnerComponent';
import ErrorComponent from '../Error/ErrorComponent';
import SuccessComponent from '../Success/SuccessComponent';

import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const LoginComponent = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, success } = userLogin;

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Dispatch Action
    dispatch(loginAction(formData));

    setFormData({
      email: '',
      password: '',
    });
  };

  //Google auth stuff
  const googleSuccess = async (googleRes) => {
    //Dispatch action that save google info from googleRes.
    dispatch(googleUserLoginAction(googleRes));
  };
  const googleFailure = (error) => {
    console.log('Error, with google login', error);
  };

  const handleOnchange = (e) => {
    setFormData((previousState) => ({
      ...previousState,
      [e.target.name]: e.target.value,
    }));
  };
  const googleUserLogin = useSelector((state) => state.googleUserLogin);
  const {
    loading: googleLoading,
    success: googleSuccessState,
    error: googleError,
    userInfo: googleUserInfo,
  } = googleUserLogin;
  //Google auth stuff

  return (
    <div>
      {error ? <ErrorComponent error={error} /> : null}
      {success ? (
        <SuccessComponent message={'You have successfully logged in.'} />
      ) : null}

      {googleError ? <ErrorComponent error={error} /> : null}
      {googleSuccessState ? (
        <SuccessComponent message="You have successfully logged in through GOOGLE" />
      ) : null}

      {googleUserInfo && googleSuccessState ? googleUserInfo?.username : null}

      {loading ? (
        <SpinnerComponent />
      ) : (
        <fieldset className="fieldSet">
          <legend>Login</legend>

          <div>
            <form onSubmit={handleLoginSubmit}>
              <InputComponent
                label="Email"
                type="email"
                name="email"
                value={email}
                className={!emailRegEx.test(email) ? 'invalid' : 'entered'}
                onChange={handleOnchange}
              />
              <InputComponent
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

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <ButtonComponent
                  type="submit"
                  text={
                    !emailRegEx.test(email) || password.length <= 5
                      ? 'Disabled'
                      : 'Login'
                  }
                  variant="dark"
                  disabled={!emailRegEx.test(email) || password.length <= 5}
                />

                {googleLoading ? (
                  <SpinnerComponent />
                ) : (
                  <div
                    style={{
                      padding: '2px 2px 4px 2px',
                      backgroundColor: 'hsla(0deg, 0%, 45%, 0.1)',
                    }}
                  >
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
