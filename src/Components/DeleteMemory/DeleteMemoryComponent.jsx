import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './DeleteMemoryComponent.scss';
import PropTypes from 'prop-types';

import ButtonComponent from '../Button/ButtonComponent';
import { memoryDeleteAction } from '../../Store/actions/memoriesActions';
import SpinnerComponent from '../Spinner/SpinnerComponent';
import ModalComponent from '../Modal/ModalComponent';
import moment from 'moment';

const DeleteMemoryComponent = ({ memory }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.memoryDelete);
  const [isConfirmOpen, setConfirmOpen] = useState(false);
  const {
    _id,
    title,
    memory: memoryText,
    setDueDate,
    dueDate,
    createdAt,
    updatedAt,
  } = memory;
  const dueMoment = dueDate ? moment(dueDate) : null;
  const hasDueDate = Boolean(setDueDate && dueMoment?.isValid());

  const handleConfirmDelete = () => {
    setConfirmOpen(false);
    dispatch(memoryDeleteAction(_id));
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
        ariaLabel={`Delete memory: ${title}`}
        closeButtonTitle="Close delete memory confirmation"
        size="standard"
        tone="danger"
      >
        <div className="delete-memory-confirmation">
          <div className="delete-memory-header">
            <h2>Delete this memory?</h2>
            <p>Check that this is the memory you intend to remove.</p>
          </div>
          <fieldset className="query-fieldset delete-memory-record">
            <legend>Memory to delete</legend>
            <h3>{title}</h3>
            <p className="delete-memory-note">{memoryText}</p>
          </fieldset>
          <fieldset className="query-fieldset delete-memory-dates">
            <legend>Dates</legend>
            <dl>
              <div>
                <dt>Created</dt>
                <dd>
                  <time dateTime={createdAt}>
                    {moment(createdAt).format('Do MMM YYYY')}
                  </time>
                </dd>
              </div>
              <div>
                <dt>Updated</dt>
                <dd>
                  <time dateTime={updatedAt}>
                    {moment(updatedAt).format('Do MMM YYYY')}
                  </time>
                </dd>
              </div>
              {hasDueDate ? (
                <div>
                  <dt>Due</dt>
                  <dd>
                    <time dateTime={dueDate}>
                      {dueMoment.format('Do MMM YYYY')}
                    </time>
                    <small>
                      {dueMoment.isBefore(moment()) ? 'Overdue' : 'Due'}{' '}
                      {dueMoment.fromNow()}
                    </small>
                  </dd>
                </div>
              ) : null}
            </dl>
          </fieldset>
          <p className="delete-memory-final-warning">
            This memory cannot be recovered after deletion.
          </p>
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
  memory: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    memory: PropTypes.string.isRequired,
    setDueDate: PropTypes.bool.isRequired,
    dueDate: PropTypes.string,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default DeleteMemoryComponent;
