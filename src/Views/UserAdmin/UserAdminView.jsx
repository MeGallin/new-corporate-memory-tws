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
      <DashboardComponent />
    </>
  );
};

export default UserAdminView;
