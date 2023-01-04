import { useDispatch, useSelector } from 'react-redux';
import './DeleteMemoryComponent.scss';

import ButtonComponent from '../Button/ButtonComponent';

import { memoryDeleteAction } from '../../Store/actions/memoriesActions';

import SpinnerComponent from '../Spinner/SpinnerComponent';

const DeleteMemoryComponent = ({ id }) => {
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    if (window.confirm(`Are you sure you want to delete ${id}`)) {
      //Dispatch Action here
      dispatch(memoryDeleteAction(id));
    }
  };

  const memoryDelete = useSelector((state) => state.memoryDelete);
  const { loading } = memoryDelete;

  return (
    <>
      {loading ? (
        <SpinnerComponent />
      ) : (
        <ButtonComponent
          type="button"
          text="Delete"
          variant="danger"
          id={id}
          onClick={() => handleDelete(id)}
          disabled={false}
        />
      )}
    </>
  );
};

export default DeleteMemoryComponent;
