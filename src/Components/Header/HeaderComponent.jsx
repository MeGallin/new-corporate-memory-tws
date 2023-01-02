import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './HeaderComponent.scss';

import LogoutComponent from '../Logout/LogoutComponent';

const HeaderComponent = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userInfoDetails = useSelector((state) => state.userInfoDetails);
  const { userDetails } = userInfoDetails;

  return (
    <>
      <header>
        <nav className="nav-wrapper">
          {userInfo ? (
            <span>
              <NavLink
                className={(navData) => (navData.isActive ? 'active' : '')}
                to="/memories"
              >
                Memories
              </NavLink>
            </span>
          ) : (
            <span>
              <NavLink
                className={(navData) => (navData.isActive ? 'active' : '')}
                to="/"
              >
                Home
              </NavLink>
            </span>
          )}

          <span>
            <NavLink
              className={(navData) => (navData.isActive ? 'active' : '')}
              to="/about"
            >
              About
            </NavLink>
          </span>

          <span>
            <NavLink
              className={(navData) => (navData.isActive ? 'active' : '')}
              to="/contact"
            >
              Contact
            </NavLink>
          </span>

          {userInfo ? (
            <span>
              <LogoutComponent />
            </span>
          ) : (
            <span>
              <NavLink
                className={(navData) => (navData.isActive ? 'active' : '')}
                to="/forms"
              >
                Login
              </NavLink>
            </span>
          )}
        </nav>
        {userInfo ? (
          <>
            <div className="header-user">
              <div className="user-info-nav-link">
                <NavLink to="/user-admin" className="header-user-name">
                  DASHBOARD: {userDetails?.name}
                </NavLink>
              </div>
            </div>
          </>
        ) : null}
      </header>
    </>
  );
};

export default HeaderComponent;
