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
    dueDate: new Date(),
    priority: '',
    tag: '',
  });

  useEffect(() => {
    if (updateMemory) {
      setFormData({
        id: updateMemory._id,
        title: updateMemory.title || '',
        memory: updateMemory.memory || '',
        dueDate: new Date(updateMemory.dueDate),
        priority: updateMemory.priority || '',
        tag: updateMemory.tag || '',
      });
    }
  }, [updateMemory]);

  const { title, memory, dueDate, priority, tag } = formData;

  const handleEditMemory = (e) => {
    e.preventDefault();
    dispatch(memoryEditAction(formData));
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

  const isFormInvalid = !title || !memory || memory.length <= 8;

  return (
    <div className="update-memory-wrapper">
      {loading ? (
        <SpinnerComponent />
      ) : (
        <fieldset className="fieldSet">
          <legend>Update memory</legend>

          <div>
            <form onSubmit={handleEditMemory}>
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

              <div className="update-input-wrapper">
                <InputComponent
                  label="Priority"
                  type="number"
                  name="priority"
                  value={priority}
                  min="1"
                  max="5"
                  onChange={handleOnchange}
                />

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
                  text={isFormInvalid ? 'Disabled' : 'UPDATE'}
                  variant="dark"
                  disabled={isFormInvalid}
                />
              </div>
            </form>
          </div>
        </fieldset>
      )}
    </div>
  );
};

EditMemoryComponent.propTypes = {
  updateMemory: PropTypes.object.isRequired,
};

export default EditMemoryComponent;
