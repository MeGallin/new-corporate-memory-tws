import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './CardComponent.scss';
import PropTypes from 'prop-types';
import { FaBullhorn } from 'react-icons/fa';

import {
  memorySetDueDateAction,
  memoryIsCompleteAction,
} from '../../Store/actions/memoriesActions';

import StarsComponent from '../Stars/StarsComponent';
import { TagsComponent } from '../Tags/TagsComponent';
import MemoriesImagesComponent from '../MemoriesImages/MemoriesImagesComponent';
import moment from 'moment';

const CardComponent = ({
  title,
  memory,
  voice,
  imgSrc,
  setDueDate,
  isComplete,
  created,
  updated,
  dueDate,
  id,
  priority,
  tag,
}) => {
  const dispatch = useDispatch();
  const [dateTime, setDateTime] = useState(moment());

  useEffect(() => {
    setDateTime(moment().valueOf());
  }, [title]);

  const activateVoice = (text) => {
    window.responsiveVoice.speak(text);
  };

  const handleSetDueDate = (id, value) => {
    const toggledValue = (value = !value);
    //Dispatch Action
    dispatch(memorySetDueDateAction({ id: id, setDueDate: toggledValue }));
  };

  const handleIsComplete = (id, value) => {
    const toggledValue = (value = !value);
    //Dispatch Action
    dispatch(memoryIsCompleteAction({ id: id, isComplete: toggledValue }));
  };

  return (
    <>
      <div className="card-wrapper">
        <fieldset className="fieldSet">
          <legend>{title}</legend>
          <div className="card-header">
            {setDueDate ? (
              <div
                className={`${
                  moment(dueDate).valueOf() < dateTime ? 'late' : 'early'
                } `}
              >
                {moment(dueDate).valueOf() < dateTime
                  ? 'Over due by '
                  : 'Due in '}{' '}
                {moment(dueDate).fromNow(dateTime)}
              </div>
            ) : (
              <p>No date set.</p>
            )}

            <TagsComponent memoryId={id} tag={tag} variant="warning" />
          </div>
          <div className="card-body">
            <p>{memory}</p>
            <div onClick={() => activateVoice(voice)}>
              <FaBullhorn size={22} title="Activate voice text" />
            </div>
            <MemoriesImagesComponent imgSrc={imgSrc} altText={'Female Image'} />
            <StarsComponent priority={priority} />

            <div className="memories-priority-wrapper small-text">
              <label>
                Set Due Date:
                <input
                  type="checkbox"
                  id="setDueDate"
                  name="setDueDate"
                  checked={setDueDate}
                  onChange={() => handleSetDueDate(id, setDueDate)}
                />
              </label>

              <label>
                <input
                  type="checkbox"
                  id="isComplete"
                  name="isComplete"
                  checked={isComplete}
                  onChange={() => handleIsComplete(id, isComplete)}
                />
                Mark as Complete.
              </label>
            </div>
          </div>
          <div className="card-footer">
            <div>Created: {moment(created).format('Do MMM YYYY')}</div>
            <div>Updated: {moment(updated).format('Do MMM YYYY')}</div>
          </div>
        </fieldset>
      </div>
    </>
  );
};

CardComponent.propTypes = {
  title: PropTypes.string,
  dueDate: PropTypes.string,
  memory: PropTypes.string,
  priority: PropTypes.number,
  created: PropTypes.string,
  updated: PropTypes.string,
};

export default CardComponent;
