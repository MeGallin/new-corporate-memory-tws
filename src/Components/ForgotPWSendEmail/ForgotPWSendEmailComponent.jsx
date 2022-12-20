import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { emailRegEx } from '../../Utils/regEx';

import { userForgotPWSendEmailAction } from '../../Store/actions/userActions';

import InputComponent from '../Input/InputComponent';
import ButtonComponent from '../Button/ButtonComponent';
import SpinnerComponent from '../Spinner/SpinnerComponent';
import ErrorComponent from '../Error/ErrorComponent';
import SuccessComponent from '../Success/SuccessComponent';

const ForgotPWSendEmailComponent = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');

  const handleOnChange = (e) => {
    setEmail(e.target.value);
  };

  const handleForgotPWSubmit = (e) => {
    e.preventDefault();
    //Dispatch action
    console.log(email);
    dispatch(userForgotPWSendEmailAction(email));
    setEmail('');
  };

  const userForgotPWSendEmail = useSelector(
    (state) => state.userForgotPWSendEmail,
  );
  const { loading, error, success } = userForgotPWSendEmail;
  return (
    <>
      {error ? <ErrorComponent error={error} /> : null}
      {success ? (
        <SuccessComponent message="Your request was successfully. Please check your email!" />
      ) : null}
      {loading ? (
        <SpinnerComponent />
      ) : (
        <fieldset className="fieldSet">
          <legend>Forgot Password Form</legend>
          <div>
            <p>
              Simply send us your email address and we will send you an email
              with a reset link.
            </p>
            <form onSubmit={handleForgotPWSubmit}>
              <InputComponent
                label="EMAIL"
                value={email}
                type="email"
                name="email"
                required
                className={!emailRegEx.test(email) ? 'invalid' : 'entered'}
                error={
                  !emailRegEx.test(email) && email.length !== 0
                    ? `Invalid email address.`
                    : null
                }
                onChange={handleOnChange}
              />

              <ButtonComponent
                type="submit"
                text={
                  !emailRegEx.test(email) ? 'Disabled' : 'send email address'
                }
                variant="info"
                disabled={!emailRegEx.test(email)}
              />
            </form>
          </div>
        </fieldset>
      )}
    </>
  );
};

export default ForgotPWSendEmailComponent;
