import { useState } from 'react';
import { useSelector } from 'react-redux';
import LoginComponent from '../../Components/Login/LoginComponent';
import RegisterComponent from '../../Components/Resgister/RegisterComponent';
import './FormsView.scss';

const FormsView = () => {
  const [register, setRegister] = useState(false);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  return (
    <>
      {!userInfo ? (
        <>
          {!register ? (
            <>
              <LoginComponent />
              <div className="forms-text-wrapper">
                <div
                  className="forms-register"
                  onClick={() => setRegister((prev) => !prev)}
                >
                  Not Registered yet?
                </div>
                <div className="forms-register">Forgotten your password?</div>
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
    </>
  );
};

export default FormsView;
