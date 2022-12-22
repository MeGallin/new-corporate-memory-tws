import './LogoutComponent.scss';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutAction } from '../../Store/actions/userActions';

const LogoutComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutAction());
    navigate('/forms');
  };
  return (
    <div className="link-effect" onClick={handleLogout}>
      LOGOUT
    </div>
  );
};

export default LogoutComponent;
