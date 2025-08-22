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

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const { name, email, password, confirmPassword } = formData;

  const handleOnchange = (e) => {
    setFormData((previousState) => ({
      ...previousState,
      [e.target.name]: e.target.value,
    }));
  };

  const isNameInvalid = !nameRegEx.test(name) && name.length > 0;
  const isEmailInvalid = !emailRegEx.test(email) && email.length > 0;
  const isPasswordInvalid = !passwordRegEx.test(password) && password.length > 0;
  const isConfirmPasswordInvalid = password !== confirmPassword && confirmPassword.length > 0;

  const isFormInvalid =
    !nameRegEx.test(name) ||
    !emailRegEx.test(email) ||
    !passwordRegEx.test(password) ||
    password !== confirmPassword;

  const handleRegistrationSubmit = (e) => {
    e.preventDefault();
    if (!isFormInvalid) {
      dispatch(registerAction(formData));
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    }
  };

  return (
    <div>
      {error && <ErrorComponent error={error} />}
      {success && <SuccessComponent message={'You have successfully registered.'} />}
      {loading ? (
        <SpinnerComponent />
      ) : (
        <fieldset className="fieldSet">
          <legend>Registration</legend>
          <form onSubmit={handleRegistrationSubmit}>
            <InputComponent
              id="register-name"
              label="Name"
              value={name}
              type="text"
              name="name"
              required
              className={isNameInvalid ? 'invalid' : (name.length > 0 ? 'entered' : '')}
              error={isNameInvalid ? `Name field must contain a first name and surname both of which must start with a capital letter.` : null}
              onChange={handleOnchange}
            />

            <InputComponent
              id="register-email"
              label="Email"
              type="email"
              name="email"
              value={email}
              required
              className={isEmailInvalid ? 'invalid' : (email.length > 0 ? 'entered' : '')}
              error={isEmailInvalid ? `Invalid email address.` : null}
              onChange={handleOnchange}
            />

            <InputComponent
              id="register-password"
              label="Password"
              type="password"
              name="password"
              value={password}
              required
              className={isPasswordInvalid ? 'invalid' : (password.length > 0 ? 'entered' : '')}
              error={isPasswordInvalid ? `Password must contain at least 1 Capital letter, 1 number and 1 special character.` : null}
              onChange={handleOnchange}
            />

            <InputComponent
              id="register-confirm-password"
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              required
              className={isConfirmPasswordInvalid ? 'invalid' : (confirmPassword.length > 0 ? 'entered' : '')}
              error={isConfirmPasswordInvalid ? `Passwords do not match.` : null}
              onChange={handleOnchange}
            />

            <div>
              <ButtonComponent
                type="submit"
                text={isFormInvalid ? 'Disabled' : 'Register'}
                variant="dark"
                disabled={isFormInvalid}
              />
            </div>
          </form>
        </fieldset>
      )}
    </div>
  );
};

export default RegisterComponent;
