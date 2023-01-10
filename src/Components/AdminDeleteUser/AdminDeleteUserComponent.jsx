import { useDispatch, useSelector } from 'react-redux';
import { adminDeleteAllUserDataAction } from '../../Store/actions/adminActions';
import ButtonComponent from '../Button/ButtonComponent';
import SpinnerComponent from '../Spinner/SpinnerComponent';

const AdminDeleteUserComponent = ({ id, name }) => {
  const dispatch = useDispatch();
  const handleDelete = (id) => {
    if (
      window.confirm(
        `Are you sure you want to delete ${name} account?. You will be removing all their details including memories. ARE YOU SURE?`,
      )
    ) {
      //Dispatch Action here
      dispatch(adminDeleteAllUserDataAction(id));
    }
  };

  const adminDeleteAllUser = useSelector((state) => state.adminDeleteAllUser);
  const { loading } = adminDeleteAllUser;

  return (
    <>
      {loading ? (
        <SpinnerComponent />
      ) : (
        <ButtonComponent
          type="button"
          text={`Delete ${name} account`}
          variant="danger"
          id={id}
          onClick={() => handleDelete(id)}
          disabled={false}
        />
      )}
    </>
  );
};

export default AdminDeleteUserComponent;
