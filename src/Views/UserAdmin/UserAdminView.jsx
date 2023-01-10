import { useSelector } from 'react-redux';
import DashboardComponent from '../../Components/Dashboard/DashboardComponent';
import ErrorComponent from '../../Components/Error/ErrorComponent';
import SuccessComponent from '../../Components/Success/SuccessComponent';

const UserAdminView = () => {
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
          type={'ADMIN_IS_ADMIN_SUCCESS'}
          message={'User admin status has been updated.'}
        />
      ) : null}
      {isSuspendedError ? <ErrorComponent error={isSuspendedError} /> : null}
      {isSuspendedSuccess ? (
        <SuccessComponent
          type={'ADMIN_IS_ADMIN_SUCCESS'}
          message={'User Suspension status has been updated.'}
        />
      ) : null}
      {deleteAllUserDataError ? (
        <ErrorComponent error={deleteAllUserDataError} />
      ) : null}
      {deleteAllUserDataSuccess ? (
        <SuccessComponent
          type={'ADMIN_DELETE_ALL_USER_DATA_SUCCESS'}
          message={
            'User account and all their memories have been successfully deleted.'
          }
        />
      ) : null}
      <DashboardComponent />
    </>
  );
};

export default UserAdminView;
