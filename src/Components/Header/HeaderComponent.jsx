import { NavLink } from 'react-router-dom';

import './HeaderComponent.scss';

const HeaderComponent = () => {
  return (
    <>
      <header>
        <nav className="nav-wrapper">
          <span>
            <NavLink
              className={(navData) => (navData.isActive ? 'active' : '')}
              to="/"
            >
              Memories
            </NavLink>
          </span>
          <span>
            <NavLink
              className={(navData) => (navData.isActive ? 'active' : '')}
              to="/"
            >
              Home
            </NavLink>
          </span>
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
        </nav>
      </header>
    </>
  );
};

export default HeaderComponent;
