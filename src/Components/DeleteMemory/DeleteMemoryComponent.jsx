import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './DeleteMemoryComponent.scss';
import PropTypes from 'prop-types';

import ButtonComponent from '../Button/ButtonComponent';
import { memoryDeleteAction } from '../../Store/actions/memoriesActions';
import SpinnerComponent from '../Spinner/SpinnerComponent';
import ModalComponent from '../Modal/ModalComponent';

const DeleteMemoryComponent = ({ id }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.memoryDelete);
  const [isConfirmOpen, setConfirmOpen] = useState(false);

  const handleConfirmDelete = () => {
    setConfirmOpen(false);
    dispatch(memoryDeleteAction(id));
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
          onClick={() => setConfirmOpen(true)}
          disabled={false}
        />
      )}
      <ModalComponent
        isOpen={isConfirmOpen}
        onClose={() => setConfirmOpen(false)}
        ariaLabel="Delete memory confirmation"
        closeButtonTitle="Close delete memory confirmation"
        size="compact"
      >
        <div className="delete-memory-confirmation">
          <div className="delete-memory-header">
            <h2>Delete memory?</h2>
            <p>Review this permanent action before continuing.</p>
          </div>
          <fieldset className="query-fieldset delete-memory-warning">
            <legend>Permanent action</legend>
            <p>This memory cannot be recovered after it is deleted.</p>
          </fieldset>
          <div className="delete-memory-confirmation-actions">
            <ButtonComponent
              type="button"
              text="Cancel"
              variant="secondary"
              onClick={() => setConfirmOpen(false)}
            />
            <ButtonComponent
              type="button"
              text="Delete memory"
              variant="danger"
              onClick={handleConfirmDelete}
            />
          </div>
        </div>
      </ModalComponent>
    </>
  );
};

DeleteMemoryComponent.propTypes = {
  id: PropTypes.string.isRequired,
};

export default DeleteMemoryComponent;
