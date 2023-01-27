import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { registerAction } from '../../Store/actions/userActions';

import { nameRegEx, emailRegEx, passwordRegEx } from '../../Utils/regEx';

import InputComponent from '../Input/InputComponent';
import ButtonComponent from '../Button/ButtonComponent';
import SpinnerComponent from '../Spinner/SpinnerComponent';
import ErrorComponent from '../Error/ErrorComponent';
import SuccessComponent from '../Success/SuccessComponent';

const RegisterComponent = () => {
  const dispatch = useDispatch();

  const userRegistration = useSelector((state) => state.userRegistration);
  const { loading, error, success } = userRegistration;

  const [pwMessage, setPwMessage] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const { name, email, password, confirmPassword } = formData;

  const handleRegistrationSubmit = (e) => {
    e.preventDefault();
    //Check that passwords match
    if (password === confirmPassword) {
      dispatch(registerAction(formData));
      setPwMessage(true);
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    } else {
      setPwMessage(false);
    }
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
        <SuccessComponent message={'You have successfully registered.'} />
      ) : null}
      {loading ? (
        <SpinnerComponent />
      ) : (
        <fieldset className="fieldSet">
          <legend>Registration</legend>
          {!pwMessage ? (
            <ErrorComponent error="Seems like your password does not match" />
          ) : null}
          <form onSubmit={handleRegistrationSubmit}>
            <InputComponent
              label="Name"
              value={name}
              type="text"
              name="name"
              required
              className={!nameRegEx.test(name) ? 'invalid' : 'entered'}
              error={
                !nameRegEx.test(name) && name.length !== 0
                  ? `Name field must contain a first name and surname both of which must start with a capital letter.`
                  : null
              }
              onChange={handleOnchange}
            />

            <InputComponent
              label="Email"
              type="email"
              name="email"
              value={email}
              className={!emailRegEx.test(email) ? 'invalid' : 'entered'}
              error={
                !emailRegEx.test(email) && email.length !== 0
                  ? `Invalid email address.`
                  : null
              }
              onChange={handleOnchange}
            />

            <InputComponent
              label="Password"
              type="password"
              name="password"
              value={password}
              required
              className={!passwordRegEx.test(password) ? 'invalid' : 'entered'}
              error={
                !passwordRegEx.test(password) && password.length !== 0
                  ? `Password must contain at least l Capital letter, 1 number and 1 special character.`
                  : null
              }
              onChange={handleOnchange}
            />

            <InputComponent
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              required
              className={
                !passwordRegEx.test(confirmPassword) ? 'invalid' : 'entered'
              }
              error={
                !passwordRegEx.test(confirmPassword) &&
                confirmPassword.length !== 0
                  ? `Password must contain at least l Capital letter, 1 number and 1 special character.`
                  : null
              }
              onChange={handleOnchange}
            />

            <div>
              <ButtonComponent
                type="submit"
                text={
                  !emailRegEx.test(email) ||
                  !nameRegEx.test(name) ||
                  password.length <= 5
                    ? 'Disabled'
                    : 'Register'
                }
                variant="dark"
                disabled={
                  !emailRegEx.test(email) ||
                  !nameRegEx.test(name) ||
                  password.length <= 5
                }
              />
            </div>
          </form>
        </fieldset>
      )}
    </div>
  );
};

export default RegisterComponent;
