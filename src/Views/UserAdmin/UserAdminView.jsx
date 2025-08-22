import { useDispatch, useSelector } from 'react-redux';
import DashboardComponent from '../../Components/Dashboard/DashboardComponent';
import ErrorComponent from '../../Components/Error/ErrorComponent';
import SuccessComponent from '../../Components/Success/SuccessComponent';

import {
  ADMIN_DELETE_ALL_USER_DATA_RESET,
  ADMIN_IS_ADMIN_RESET,
  ADMIN_IS_SUSPENDED_RESET,
} from '../../Store/constants/adminConstants';

const UserAdminView = () => {
  const dispatch = useDispatch();
  const adminIsAdmin = useSelector((state) => state.adminIsAdmin);
  const { success: isAdminSuccess, error: isAdminError } = adminIsAdmin;
  const adminIsSuspended = useSelector((state) => state.adminIsSuspended);
  const { success: isSuspendedSuccess, error: isSuspendedError } =
    adminIsSuspended;
  const adminDeleteAllUser = useSelector((state) => state.adminDeleteAllUser);
  const { success: deleteAllUserDataSuccess, error: deleteAllUserDataError } =
    adminDeleteAllUser;
  return (
    <>
      {isAdminError ? <ErrorComponent error={isAdminError} /> : null}
      {isAdminSuccess ? (
        <SuccessComponent
          message={'User admin status has been updated.'}
          onClose={() => dispatch({ type: ADMIN_IS_ADMIN_RESET })}
        />
      ) : null}
      {isSuspendedError ? <ErrorComponent error={isSuspendedError} /> : null}
      {isSuspendedSuccess ? (
        <SuccessComponent
          message={'User Suspension status has been updated.'}
          onClose={() => dispatch({ type: ADMIN_IS_SUSPENDED_RESET })}
        />
      ) : null}
      {deleteAllUserDataError ? (
        <ErrorComponent error={deleteAllUserDataError} />
      ) : null}
      {deleteAllUserDataSuccess ? (
        <SuccessComponent
          message={
            'User account and all their memories have been successfully deleted.'
          }
          onClose={() => dispatch({ type: ADMIN_DELETE_ALL_USER_DATA_RESET })}
        />
      ) : null}
      <DashboardComponent />
    </>
  );
};

export default UserAdminView;
