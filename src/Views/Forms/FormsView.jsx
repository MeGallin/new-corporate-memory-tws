import { useState } from 'react';
import { useSelector } from 'react-redux';
import ForgotPWSendEmailComponent from '../../Components/ForgotPWSendEmail/ForgotPWSendEmailComponent';
import LoginComponent from '../../Components/Login/LoginComponent';
import RegisterComponent from '../../Components/Register/RegisterComponent';
import './FormsView.scss';

const FormsView = () => {
  const [register, setRegister] = useState(false);
  const [forgetPWSendEmail, setForgotPWSendEmail] = useState(false);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  return (
    <>
      {!userInfo ? (
        <>
          {forgetPWSendEmail ? (
            <ForgotPWSendEmailComponent />
          ) : !register ? (
            <>
              <LoginComponent />
              <div
                className="forms-register"
                onClick={() => setRegister((prev) => !prev)}
              >
                Not Registered yet?
              </div>
            </>
          ) : (
            <>
              <RegisterComponent />
              <div
                className="forms-register"
                onClick={() => setRegister((prev) => !prev)}
              >
                Already registered?
              </div>
            </>
          )}
        </>
      ) : null}
      <div className="forms-text-wrapper">
        <div
          className="forms-register"
          onClick={() => setForgotPWSendEmail((prev) => !prev)}
        >
          {!forgetPWSendEmail
            ? 'Forgotten your password?'
            : 'Hide, forgotten your password?'}
        </div>
      </div>
    </>
  );
};

export default FormsView;
