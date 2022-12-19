import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loginAction } from '../../Store/actions/userActions';

import { emailRegEx, passwordRegEx } from '../../Utils/regEx';

import InputComponent from '../../Components/Input/InputComponent';
import ButtonComponent from '../../Components/Button/ButtonComponent';
import SpinnerComponent from '../Spinner/SpinnerComponent';
import ErrorComponent from '../Error/ErrorComponent';
import SuccessComponent from '../Success/SuccessComponent';

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

  const handleOnchange = (e) => {
    setFormData((previousState) => ({
      ...previousState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div>
      {error ? <ErrorComponent error={error} /> : null}
      {success ? (
        <SuccessComponent message={'You have successfully logged in.'} />
      ) : null}
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

              <div>
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
              </div>
            </form>
          </div>
        </fieldset>
      )}
    </div>
  );
};

export default LoginComponent;
