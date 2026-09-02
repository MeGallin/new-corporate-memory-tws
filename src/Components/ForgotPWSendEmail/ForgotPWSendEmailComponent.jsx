import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { userForgotPWSendEmailAction } from '../../Store/actions/userActions';
import { USER_FORGOT_PW_SEND_EMAIL_RESET } from '../../Store/constants/userConstants';
import { isValidEmail } from '../../Utils/validation';

import InputComponent from '../Input/InputComponent';
import ButtonComponent from '../Button/ButtonComponent';
import SpinnerComponent from '../Spinner/SpinnerComponent';
import ErrorComponent from '../Error/ErrorComponent';
import SuccessComponent from '../Success/SuccessComponent';

const ForgotPWSendEmailComponent = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const isEmailInvalid = !isValidEmail(email);
  const { loading, error, success } = useSelector(
    (state) => state.userForgotPWSendEmail,
  );

  const handleOnChange = (event) => {
    setEmail(event.target.value);
  };

  const handleForgotPWSubmit = (event) => {
    event.preventDefault();
    if (isEmailInvalid) return;
    dispatch(userForgotPWSendEmailAction(email));
    setEmail('');
  };

  return (
    <>
      {error && <ErrorComponent error={error} />}
      {success && (
        <SuccessComponent
          message="Your request was successful. Please check your email."
          onClose={() =>
            dispatch({ type: USER_FORGOT_PW_SEND_EMAIL_RESET })
          }
        />
      )}
      {loading ? (
        <SpinnerComponent />
      ) : (
        <fieldset className="query-fieldset auth-form-section">
          <legend>Reset password</legend>
          <div className="auth-form-header">
            <h2>Request a secure reset link</h2>
            <p>Enter the email address connected to your account.</p>
          </div>

          <form onSubmit={handleForgotPWSubmit}>
            <InputComponent
              id="forgot-password-email"
              label="Email"
              value={email}
              type="email"
              name="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
              className={
                email && isEmailInvalid ? 'invalid' : email ? 'entered' : ''
              }
              error={
                isEmailInvalid && email.length !== 0
                  ? 'Enter a valid email address.'
                  : null
              }
              onChange={handleOnChange}
            />

            <div className="auth-form-actions">
              <ButtonComponent
                type="submit"
                text="Send reset link"
                variant="success"
                disabled={isEmailInvalid}
              />
            </div>
          </form>
        </fieldset>
      )}
    </>
  );
};

export default ForgotPWSendEmailComponent;
