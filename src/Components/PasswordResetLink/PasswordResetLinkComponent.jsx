import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

import { userResetPasswordAction } from '../../Store/actions/userActions';
import { USER_RESET_PASSWORD_RESET } from '../../Store/constants/userConstants';
import {
  PASSWORD_REQUIREMENT,
  isValidNewPassword,
} from '../../Utils/validation';

import InputComponent from '../Input/InputComponent';
import ButtonComponent from '../Button/ButtonComponent';
import SpinnerComponent from '../Spinner/SpinnerComponent';
import ErrorComponent from '../Error/ErrorComponent';
import SuccessComponent from '../Success/SuccessComponent';
import '../../Css/authWorkspace.scss';

const PasswordResetLinkComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const [password, setPassword] = useState('');
  const isPasswordInvalid = !isValidNewPassword(password);
  const { loading, error, success } = useSelector(
    (state) => state.userResetPassword,
  );

  useEffect(() => {
    if (!success) {
      return undefined;
    }

    const redirectTimer = setTimeout(() => {
      navigate('/forms');
    }, 6000);

    return () => clearTimeout(redirectTimer);
  }, [success, navigate]);

  const handleOnChange = (event) => {
    setPassword(event.target.value);
  };

  const handlePasswordResetSubmit = (event) => {
    event.preventDefault();
    if (isPasswordInvalid || !params.token) return;
    dispatch(
      userResetPasswordAction({
        password,
        resetPasswordToken: params.token,
      }),
    );
    setPassword('');
  };

  return (
    <section className="auth-reset-workbench" aria-labelledby="reset-heading">
      <div className="auth-workbench__header">
        <div>
          <p>Secure account recovery</p>
          <h1 id="reset-heading">Password workspace</h1>
        </div>
        <span>Reset password</span>
      </div>

      {error && <ErrorComponent error={error} />}
      {success && (
        <SuccessComponent
          message="Your password was changed successfully. You will be redirected shortly."
          onClose={() => dispatch({ type: USER_RESET_PASSWORD_RESET })}
        />
      )}
      {loading ? (
        <SpinnerComponent />
      ) : (
        <fieldset className="query-fieldset auth-form-section">
          <legend>Choose a new password</legend>
          <div className="auth-form-header">
            <h2>Protect your account</h2>
            <p>{PASSWORD_REQUIREMENT}</p>
          </div>

          <form onSubmit={handlePasswordResetSubmit}>
            <InputComponent
              id="reset-password"
              label="New password"
              type="password"
              name="password"
              value={password}
              placeholder="Enter a secure password"
              autoComplete="new-password"
              required
              className={
                password && isPasswordInvalid
                  ? 'invalid'
                  : password
                    ? 'entered'
                    : ''
              }
              error={
                isPasswordInvalid && password.length !== 0
                  ? PASSWORD_REQUIREMENT
                  : null
              }
              onChange={handleOnChange}
            />

            <div className="auth-form-actions">
              <ButtonComponent
                type="submit"
                text="Update password"
                variant="success"
                disabled={isPasswordInvalid}
              />
            </div>
          </form>
        </fieldset>
      )}
    </section>
  );
};

export default PasswordResetLinkComponent;
