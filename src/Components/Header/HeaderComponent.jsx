import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './HeaderComponent.scss';

import LogoutComponent from '../Logout/LogoutComponent';

const HeaderComponent = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

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
            <p className="header-user">
              {userInfo?.name}
              <span className="user-info-nav-link">
                <NavLink
                  className={(navData) => (navData.isActive ? 'active' : '')}
                  to="/user-admin"
                >
                  Your Admin Dashboard
                </NavLink>
              </span>
            </p>
          </>
        ) : null}
      </header>
    </>
  );
};

export default HeaderComponent;
