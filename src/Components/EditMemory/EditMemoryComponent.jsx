import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './EditMemoryComponent.scss';
import PropTypes from 'prop-types';

import { memoryEditAction } from '../../Store/actions/memoriesActions';

import InputComponent from '../Input/InputComponent';
import SpinnerComponent from '../Spinner/SpinnerComponent';
import ButtonComponent from '../Button/ButtonComponent';

const EditMemoryComponent = ({ updateMemory }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.memoryEdit);

  const [formData, setFormData] = useState({
    id: '',
    title: '',
    memory: '',
    dueDate: null,
    priority: '',
    tag: '',
  });

  const [addDueDate, setAddDueDate] = useState(false); // New state for toggle

  useEffect(() => {
    if (updateMemory) {
      const hasDueDate = updateMemory.dueDate && !isNaN(new Date(updateMemory.dueDate));
      setFormData({
        id: updateMemory._id,
        title: updateMemory.title || '',
        memory: updateMemory.memory || '',
        dueDate: hasDueDate ? new Date(updateMemory.dueDate) : null,
        priority: updateMemory.priority || '',
        tag: updateMemory.tag || '',
      });
      setAddDueDate(updateMemory.setDueDate); // Initialize toggle based on existing setDueDate
    }
  }, [updateMemory]);

  const { title, memory, dueDate, priority, tag } = formData;

  const handleEditMemory = (e) => {
    e.preventDefault();
    dispatch(memoryEditAction(formData));
  };

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setFormData((previousState) => {
      if (name === 'priority') {
        const numValue = parseInt(value, 10);
        if (isNaN(numValue) || numValue < 1) {
          return { ...previousState, [name]: 1 }; // Default to 1 if invalid or too low
        }
        if (numValue > 5) {
          return { ...previousState, [name]: 5 }; // Cap at 5 if too high
        }
        return { ...previousState, [name]: numValue };
      }
      return { ...previousState, [name]: value };
    });
  };

  const handleOnChangeDate = (date) => {
    setFormData((prev) => ({ ...prev, dueDate: date }));
  };

  const handleToggleDueDate = () => {
    setAddDueDate((prev) => !prev);
    if (addDueDate) {
      setFormData((prev) => ({ ...prev, dueDate: null }));
    }
  };

  const isFormInvalid = !title || !memory || memory.length < 5;

  return (
    <div className="update-memory-wrapper">
      {loading ? (
        <SpinnerComponent />
      ) : (
        <div className="memory-form-dialog">
          <div className="memory-form-header">
            <h2>Edit memory</h2>
            <p>Update the note, organisation, or reminder details for this memory.</p>
          </div>

          <form onSubmit={handleEditMemory}>
            <fieldset className="query-fieldset memory-form-section">
              <legend>Memory details</legend>
              <InputComponent
                id="edit-memory-title"
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
                  <label htmlFor="edit-memory-note">Memory note</label>
                  <span id="edit-memory-note-help">
                    {memory.length} characters, 5 minimum
                  </span>
                </div>
                <textarea
                  id="edit-memory-note"
                  name="memory"
                  value={memory}
                  placeholder="Write the information you want to remember"
                  aria-describedby="edit-memory-note-help"
                  required
                  onChange={handleOnchange}
                />
              </div>

              <div className="memory-form-grid">
                <InputComponent
                  id="edit-memory-priority"
                  label="Priority"
                  type="number"
                  name="priority"
                  value={priority}
                  min="1"
                  max="5"
                  onChange={handleOnchange}
                />

                <InputComponent
                  id="edit-memory-tag"
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
              <label htmlFor="edit-memory-reminder">
                <input
                  id="edit-memory-reminder"
                  type="checkbox"
                  checked={addDueDate}
                  onChange={handleToggleDueDate}
                />
                Set a reminder
              </label>
              {addDueDate && (
                <DatePicker
                  id="edit-memory-due-date"
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
                text="Save changes"
                variant="success"
                disabled={isFormInvalid}
              />
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

EditMemoryComponent.propTypes = {
  updateMemory: PropTypes.object.isRequired,
};

export default EditMemoryComponent;
