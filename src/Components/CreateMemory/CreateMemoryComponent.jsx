import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './CreateMemoryComponent.scss';
import PropTypes from 'prop-types';

import { memoryCreateAction } from '../../Store/actions/memoriesActions';
import { MEMORIES_CREATE_RESET } from '../../Store/constants/memoriesConstants';

import InputComponent from '../Input/InputComponent';
import SpinnerComponent from '../Spinner/SpinnerComponent';
import ButtonComponent from '../Button/ButtonComponent';

const INITIAL_FORM_STATE = {
  title: '',
  memory: '',
  dueDate: null,
  priority: '1',
  tag: '',
};

const CreateMemoryComponent = ({ onCloseModal }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const { title, memory, dueDate, priority, tag } = formData;

  const [addDueDate, setAddDueDate] = useState(false);

  const { loading, success } = useSelector((state) => state.memoryCreate);

  const handleToggleDueDate = () => {
    setAddDueDate((prev) => !prev);
    if (addDueDate) {
      setFormData((prev) => ({ ...prev, dueDate: null }));
    }
  };

  // State to control whether to close modal after successful submission
  const [shouldCloseModal, setShouldCloseModal] = useState(true);

  useEffect(() => {
    if (success) {
      // If submission was successful and we should close the modal
      if (shouldCloseModal) {
        onCloseModal();
      } else {
        // If submission was successful and we should keep modal open, just reset form
        setFormData(INITIAL_FORM_STATE);
      }
      // Reset success state in Redux to prevent re-triggering
      dispatch({ type: MEMORIES_CREATE_RESET });
    }
  }, [success, shouldCloseModal, onCloseModal, dispatch]);

  const handleCreateMemory = (e) => {
    e.preventDefault();
    dispatch(memoryCreateAction(formData));
    // Form reset and modal close handled by useEffect now
  };

  const handleCreateAndClose = () => {
    setShouldCloseModal(true);
  };

  const handleCreateAndAddAnother = () => {
    setShouldCloseModal(false);
  };

  const handleOnchange = (e) => {
    setFormData((previousState) => ({
      ...previousState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnChangeDate = (date) => {
    setFormData((prev) => ({ ...prev, dueDate: date }));
  };

  const isFormInvalid = !title || !memory || memory.length < 5;

  return (
    <div className="create-memory-wrapper">
      {loading ? (
        <SpinnerComponent />
      ) : (
        <div className="memory-form-dialog">
          <div className="memory-form-header">
            <h2>Create memory</h2>
            <p>Capture the note first, then add any useful organisation or reminder details.</p>
          </div>

          <form onSubmit={handleCreateMemory}>
            <fieldset className="query-fieldset memory-form-section">
              <legend>Memory details</legend>
              <InputComponent
                id="create-memory-title"
                label="Title"
                value={title}
                type="text"
                name="title"
                placeholder="Give this memory a clear title"
                required
                onChange={handleOnchange}
              />

              <div className="memory-note-field">
                <div>
                  <label htmlFor="create-memory-note">Memory note</label>
                  <span id="create-memory-note-help">
                    {memory.length} characters, 5 minimum
                  </span>
                </div>
                <textarea
                  id="create-memory-note"
                  name="memory"
                  value={memory}
                  placeholder="Write the information you want to remember"
                  aria-describedby="create-memory-note-help"
                  required
                  onChange={handleOnchange}
                />
              </div>

              <div className="memory-form-grid">
                <InputComponent
                  id="create-memory-priority"
                  label="Priority"
                  type="number"
                  name="priority"
                  value={priority}
                  min="1"
                  max="5"
                  onChange={handleOnchange}
                />

                <InputComponent
                  id="create-memory-tag"
                  label="Tag"
                  value={tag}
                  type="text"
                  name="tag"
                  placeholder="Optional category"
                  onChange={handleOnchange}
                />
              </div>
            </fieldset>

            <fieldset className="query-fieldset memory-form-reminder">
              <legend>Reminder</legend>
              <label htmlFor="create-memory-reminder">
                <input
                  id="create-memory-reminder"
                  type="checkbox"
                  checked={addDueDate}
                  onChange={handleToggleDueDate}
                />
                Add a due date
              </label>
              {addDueDate && (
                <DatePicker
                  id="create-memory-due-date"
                  selected={dueDate}
                  onChange={handleOnChangeDate}
                  minDate={new Date()}
                  placeholderText="Choose a due date"
                  showTimeInput
                />
              )}
            </fieldset>

            <div className="memory-form-actions">
              <ButtonComponent
                type="submit"
                text="Create memory"
                variant="success"
                disabled={isFormInvalid}
                onClick={handleCreateAndClose}
              />
              {!isFormInvalid && (
                <ButtonComponent
                  type="submit"
                  text="Create and add another"
                  variant="secondary"
                  onClick={handleCreateAndAddAnother}
                />
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

CreateMemoryComponent.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
};

export default CreateMemoryComponent;
