import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './EditMemoryComponent.scss';

import { memoryEditAction } from '../../Store/actions/memoriesActions';

import InputComponent from '../Input/InputComponent';
import SpinnerComponent from '../Spinner/SpinnerComponent';
import ErrorComponent from '../Error/ErrorComponent';
import SuccessComponent from '../Success/SuccessComponent';
import ButtonComponent from '../Button/ButtonComponent';

const EditMemoryComponent = ({ updateMemory }) => {
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    id: updateMemory._id,
    title: updateMemory.title,
    memory: updateMemory.memory,
    dueDate: new Date(updateMemory.dueDate),
    priority: updateMemory.priority,
    tags: updateMemory.tags[0]?.tagName || 'TAG',
  });
  const { id, title, memory, dueDate, priority, tags } = formData;

  const handleEditMemory = (e) => {
    e.preventDefault();

    //Dispatch Action here
    dispatch(memoryEditAction(formData));
    setFormData({
      title: '',
      memory: '',
      priority: '',
      tags: [],
    });
    setShowForm(false);
  };

  const handleOnchange = (e) => {
    setFormData((previousState) => ({
      ...previousState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnChangeDate = (date) => {
    setFormData({
      id,
      title,
      memory,
      dueDate: date,
      priority,
      tags: tags,
    });
  };

  const memoryEdit = useSelector((state) => state.memoryEdit);
  const { loading, success, error } = memoryEdit;

  return (
    <div className="update-memory-wrapper">
      {error ? <ErrorComponent error={error} /> : null}
      {success ? (
        <SuccessComponent message={'Memory has bee successfully created.'} />
      ) : null}
      {loading ? (
        <SpinnerComponent />
      ) : !showForm ? (
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

                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={tags}
                  placeholder="Tags"
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
                  text={memory.length <= 8 ? 'Disabled' : 'UPDATE'}
                  variant="dark"
                  disabled={memory.length <= 8}
                />
              </div>
            </form>
          </div>
        </fieldset>
      ) : null}
    </div>
  );
};

export default EditMemoryComponent;