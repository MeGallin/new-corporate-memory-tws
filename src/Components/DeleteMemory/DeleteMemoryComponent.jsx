import { useDispatch, useSelector } from 'react-redux';
import './DeleteMemoryComponent.scss';
import PropTypes from 'prop-types';

import ButtonComponent from '../Button/ButtonComponent';
import { memoryDeleteAction } from '../../Store/actions/memoriesActions';
import SpinnerComponent from '../Spinner/SpinnerComponent';

const DeleteMemoryComponent = ({ id }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.memoryDelete);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this memory?')) {
      dispatch(memoryDeleteAction(id));
    }
  };

  return (
    <>
      {loading ? (
        <SpinnerComponent />
      ) : (
        <ButtonComponent
          type="button"
          text="Delete"
          variant="danger"
          className="delete-memory-btn"
          onClick={handleDelete}
          disabled={false}
        />
      )}
    </>
  );
};

DeleteMemoryComponent.propTypes = {
  id: PropTypes.string.isRequired,
};

export default DeleteMemoryComponent;
