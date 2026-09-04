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
        <nav aria-label="Primary navigation">
          <NavLink
            className="header-identity"
            to={isAuthenticated ? '/memories' : '/'}
            aria-label="Your Corporate Memory home"
          >
            <span className="header-identity__copy" aria-hidden="true">
              <strong>
                <span className="header-wordmark__your">Your</span>
                <span className="header-wordmark__corporate">Corporate</span>
                <b>Memory</b>
              </strong>
              <small>Keep knowledge in reach</small>
            </span>
          </NavLink>
          <ul className="nav-wrapper">
            <li>
              <NavLink
                className={(navData) => (navData.isActive ? 'active' : '')}
                to={isAuthenticated ? '/memories' : '/'}
              >
                <span>{isAuthenticated ? 'Memories' : 'Home'}</span>
                <small aria-hidden="true">
                  {isAuthenticated ? 'Workspace' : 'Overview'}
                </small>
              </NavLink>
            </li>
            <li>
              <NavLink
                className={(navData) => (navData.isActive ? 'active' : '')}
                to="/about"
              >
                <span>About</span>
                <small aria-hidden="true">The platform</small>
              </NavLink>
            </li>
            <li>
              <NavLink
                className={(navData) => (navData.isActive ? 'active' : '')}
                to="/contact"
              >
                <span>Contact</span>
                <small aria-hidden="true">Get support</small>
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
                  <span>Sign in</span>
                  <small aria-hidden="true">Account access</small>
                </NavLink>
              )}
            </li>
          </ul>
        </nav>
        {isAuthenticated && (
          <div className="header-user">
            <div className="user-info-nav-link">
              <NavLink to="/user-admin" className="header-user-name">
                <span>Dashboard</span>
                <strong>{userDetails?.name || 'Account'}</strong>
                <small>Manage account</small>
              </NavLink>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default HeaderComponent;
