import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './HeaderComponent.scss';

import LogoutComponent from '../Logout/LogoutComponent';
import BetaReleaseComponent from '../BetaRelease/BetaReleaseComponent';

const HeaderComponent = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  const { userInfo: googleUserInfo } = useSelector((state) => state.googleUserLogin);
  const { userDetails } = useSelector((state) => state.userInfoDetails);

  const isAuthenticated = !!(userInfo || googleUserInfo);

  return (
    <>
      <BetaReleaseComponent />
      <header>
        <nav>
          <ul className="nav-wrapper">
            <li>
              <NavLink
                className={(navData) => (navData.isActive ? 'active' : '')}
                to={isAuthenticated ? '/memories' : '/'}
              >
                {isAuthenticated ? 'Memories' : 'Home'}
              </NavLink>
            </li>
            <li>
              <NavLink
                className={(navData) => (navData.isActive ? 'active' : '')}
                to="/about"
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                className={(navData) => (navData.isActive ? 'active' : '')}
                to="/contact"
              >
                Contact
              </NavLink>
            </li>
            <li>
              {isAuthenticated ? (
                <LogoutComponent />
              ) : (
                <NavLink
                  className={(navData) => (navData.isActive ? 'active' : '')}
                  to="/forms"
                >
                  Login
                </NavLink>
              )}
            </li>
          </ul>
        </nav>
        {isAuthenticated && (
          <div className="header-user">
            <div className="user-info-nav-link">
              <NavLink to="/user-admin" className="header-user-name">
                DASHBOARD: {userDetails?.name}
              </NavLink>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default HeaderComponent;
