import { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import ForgotPWSendEmailComponent from '../../Components/ForgotPWSendEmail/ForgotPWSendEmailComponent';
import LoginComponent from '../../Components/Login/LoginComponent';
import RegisterComponent from '../../Components/Register/RegisterComponent';

import './FormsView.scss';

const FormsView = () => {
  const [register, setRegister] = useState(false);
  const [forgetPWSendEmail, setForgotPWSendEmail] = useState(false);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userInfoDetails = useSelector((state) => state.userInfoDetails);
  const { userDetails } = userInfoDetails;

  console.log(userDetails);

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
      ) : (
        <div className="forms-email-confirmation-wrapper">
          {userDetails?.isConfirmed ? (
            <div>
              <h1>{userDetails?.name}, you have successfully logged in.</h1>
              <p>
                You can view your{' '}
                <NavLink to="/memories">
                  {' '}
                  <span className="logged-in">MEMORIES</span>{' '}
                </NavLink>{' '}
                or go to your
                <NavLink to="/user-admin">
                  {' '}
                  <span className="logged-in">ADMIN DASHBOARD</span>{' '}
                </NavLink>{' '}
              </p>
            </div>
          ) : (
            <>
              <div>
                <h1 className="warning">
                  Your emil address has not been confirmed.
                </h1>
                <p>
                  If you for any reason did not receive a email with a
                  confirmation link the please contact us{' '}
                  <NavLink to="/contact">
                    {' '}
                    <span className="warning">HERE!!</span>{' '}
                  </NavLink>
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default FormsView;
