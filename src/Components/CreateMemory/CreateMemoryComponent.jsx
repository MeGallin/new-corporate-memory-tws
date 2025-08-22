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
  dueDate: new Date(),
  priority: '',
  tag: '',
};

const CreateMemoryComponent = ({ onCloseModal }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const { title, memory, dueDate, priority, tag } = formData;

  const { loading, success } = useSelector((state) => state.memoryCreate);

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

  const isFormInvalid = !title || !memory || memory.length < 3;

  return (
    <div className="create-memory-wrapper">
      {loading ? (
        <SpinnerComponent />
      ) : (
        <fieldset className="fieldSet">
          <legend>Create a new memory</legend>

          <div>
            <form onSubmit={handleCreateMemory}>
              <InputComponent
                label="Title"
                value={title}
                type="text"
                name="title"
                onChange={handleOnchange}
              />
              <p className="small-text">
                Memory needs to have at least 5 characters [{memory.length}]
              </p>
              <textarea
                id="memory"
                name="memory"
                value={memory}
                placeholder="memory"
                onChange={handleOnchange}
              />

              <div className="create-input-wrapper">
                <div>
                  <label>
                    Priority
                    <input
                      type="number"
                      id="priority"
                      name="priority"
                      value={priority}
                      min="1"
                      max="5"
                      onChange={handleOnchange}
                    />
                  </label>
                </div>

                <InputComponent
                  label="Tag"
                  value={tag}
                  type="text"
                  name="tag"
                  onChange={handleOnchange}
                />
              </div>

              <div>
                Set Reminder
                <DatePicker
                  selected={dueDate}
                  onChange={handleOnChangeDate}
                  minDate={new Date()}
                  showTimeInput
                />
              </div>

              <div className="update-memory-button-wrapper">
                <ButtonComponent
                  type="submit"
                  text={isFormInvalid ? 'Disabled' : 'Create & Close'}
                  variant="dark"
                  disabled={isFormInvalid}
                  onClick={handleCreateAndClose}
                />
                {!isFormInvalid && (
                  <ButtonComponent
                    type="submit"
                    text={'Create & Add Another'}
                    variant="info"
                    onClick={handleCreateAndAddAnother}
                  />
                )}
              </div>
            </form>
          </div>
        </fieldset>
      )}
    </div>
  );
};

CreateMemoryComponent.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
};

export default CreateMemoryComponent;

