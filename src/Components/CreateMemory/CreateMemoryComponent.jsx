import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './CreateMemoryComponent.scss';

import { memoryCreateAction } from '../../Store/actions/memoriesActions';

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

const CreateMemoryComponent = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const { title, memory, dueDate, priority, tag } = formData;

  const { loading } = useSelector((state) => state.memoryCreate);

  const handleCreateMemory = (e) => {
    e.preventDefault();
    dispatch(memoryCreateAction(formData));
    setFormData(INITIAL_FORM_STATE); // Reset to initial state
  };

  const handleOnChangeDate = (date) => {
    setFormData((prev) => ({ ...prev, dueDate: date }));
  };

  const handleOnchange = (e) => {
    setFormData((previousState) => ({
      ...previousState,
      [e.target.name]: e.target.value,
    }));
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

              <ButtonComponent
                type="submit"
                text={isFormInvalid ? 'DISABLED' : 'CREATE'}
                variant="dark"
                disabled={isFormInvalid}
              />
            </form>
          </div>
        </fieldset>
      )}
    </div>
  );
};

export default CreateMemoryComponent;
