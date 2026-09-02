import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { registerAction } from '../../Store/actions/userActions';
import { USER_REGISTER_RESET } from '../../Store/constants/userConstants';
import {
  PASSWORD_REQUIREMENT,
  isValidEmail,
  isValidName,
  isValidNewPassword,
} from '../../Utils/validation';

import InputComponent from '../Input/InputComponent';
import ButtonComponent from '../Button/ButtonComponent';
import SpinnerComponent from '../Spinner/SpinnerComponent';
import ErrorComponent from '../Error/ErrorComponent';
import SuccessComponent from '../Success/SuccessComponent';

const RegisterComponent = () => {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector(
    (state) => state.userRegistration,
  );

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const { name, email, password, confirmPassword } = formData;

  const handleOnchange = (event) => {
    setFormData((previousState) => ({
      ...previousState,
      [event.target.name]: event.target.value,
    }));
  };

  const isNameInvalid = !isValidName(name) && name.length > 0;
  const isEmailInvalid = !isValidEmail(email) && email.length > 0;
  const isPasswordInvalid =
    !isValidNewPassword(password) && password.length > 0;
  const isConfirmPasswordInvalid =
    password !== confirmPassword && confirmPassword.length > 0;
  const isFormInvalid =
    !isValidName(name) ||
    !isValidEmail(email) ||
    !isValidNewPassword(password) ||
    password !== confirmPassword;

  const handleRegistrationSubmit = (event) => {
    event.preventDefault();
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
    <>
      {error && <ErrorComponent error={error} />}
      {success && (
        <SuccessComponent
          message="You have successfully registered."
          onClose={() => dispatch({ type: USER_REGISTER_RESET })}
        />
      )}
      {loading ? (
        <SpinnerComponent />
      ) : (
        <fieldset className="query-fieldset auth-form-section">
          <legend>Create account</legend>
          <div className="auth-form-header">
            <h2>Build your memory workspace</h2>
            <p>Use your name, email address, and a secure password.</p>
          </div>

          <form onSubmit={handleRegistrationSubmit}>
            <div className="auth-form-grid">
              <InputComponent
                id="register-name"
                label="Name"
                value={name}
                type="text"
                name="name"
                placeholder="First name and surname"
                autoComplete="name"
                required
                className={
                  isNameInvalid ? 'invalid' : name.length > 0 ? 'entered' : ''
                }
                error={
                  isNameInvalid
                    ? 'Enter your first name and surname.'
                    : null
                }
                onChange={handleOnchange}
              />

              <InputComponent
                id="register-email"
                label="Email"
                type="email"
                name="email"
                value={email}
                placeholder="you@example.com"
                autoComplete="email"
                required
                className={
                  isEmailInvalid ? 'invalid' : email.length > 0 ? 'entered' : ''
                }
                error={isEmailInvalid ? 'Enter a valid email address.' : null}
                onChange={handleOnchange}
              />

              <InputComponent
                id="register-password"
                label="Password"
                type="password"
                name="password"
                value={password}
                placeholder="Create a secure password"
                autoComplete="new-password"
                required
                className={
                  isPasswordInvalid
                    ? 'invalid'
                    : password.length > 0
                      ? 'entered'
                      : ''
                }
                error={
                  isPasswordInvalid
                    ? PASSWORD_REQUIREMENT
                    : null
                }
                onChange={handleOnchange}
              />

              <InputComponent
                id="register-confirm-password"
                label="Confirm password"
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                placeholder="Repeat your password"
                autoComplete="new-password"
                required
                className={
                  isConfirmPasswordInvalid
                    ? 'invalid'
                    : confirmPassword.length > 0
                      ? 'entered'
                      : ''
                }
                error={
                  isConfirmPasswordInvalid ? 'Passwords do not match.' : null
                }
                onChange={handleOnchange}
              />
            </div>

            <div className="auth-form-actions">
              <ButtonComponent
                type="submit"
                text="Create account"
                variant="success"
                disabled={isFormInvalid}
              />
            </div>
          </form>
        </fieldset>
      )}
    </>
  );
};

export default RegisterComponent;
