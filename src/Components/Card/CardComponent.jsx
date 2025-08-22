import { useDispatch } from 'react-redux';
import './CardComponent.scss';
import PropTypes from 'prop-types';
import { FaBullhorn } from 'react-icons/fa';
import moment from 'moment';

import {  memorySetDueDateAction,  memoryIsCompleteAction,} from '../../Store/actions/memoriesActions';

import StarsComponent from '../Stars/StarsComponent';
import { TagsComponent } from '../Tags/TagsComponent';
import MemoriesImagesComponent from '../MemoriesImages/MemoriesImagesComponent';

const CardComponent = ({ memory }) => {
  const {
    _id,
    title,
    memory: memoryText,
    memoryImage,
    setDueDate,
    isComplete,
    createdAt,
    updatedAt,
    dueDate,
    priority,
    tag,
  } = memory;

  const dispatch = useDispatch();

  const activateVoice = (text) => {
    window.responsiveVoice.speak(text);
  };

  const handleSetDueDate = () => {
    dispatch(memorySetDueDateAction({ id: _id, setDueDate: !setDueDate }));
  };

  const handleIsComplete = () => {
    dispatch(memoryIsCompleteAction({ id: _id, isComplete: !isComplete }));
  };

  const isOverdue = moment(dueDate).isBefore(moment());

  return (
    <div className="card-wrapper">
      <div className="fieldSet">
        <h2 className="card-title">{title}</h2>
        <div className="card-header">
          {setDueDate ? (
            <div className={isOverdue ? 'late' : 'early'}>
              {isOverdue ? 'Overdue' : 'Due'} {moment(dueDate).fromNow()}
            </div>
          ) : (
            <p>No date set.</p>
          )}
          <TagsComponent memoryId={_id} tag={tag} variant="warning" />
        </div>
        <div className="card-body">
          <p>{memoryText}</p>
          <div onClick={() => activateVoice(memoryText)}>
            <FaBullhorn
              size={22}
              title="Activate voice text"
              className="bullhorn-icon"
            />
          </div>
          <MemoriesImagesComponent
            id={_id}
            imgSrc={memoryImage}
            altText={`Image for ${title}`}
          />
          <StarsComponent priority={priority} />

          <div className="memories-priority-wrapper small-text">
            <label>
              Set Due Date:
              <input
                type="checkbox"
                name="setDueDate"
                checked={setDueDate}
                onChange={handleSetDueDate}
              />
            </label>

            <label>
              <input
                type="checkbox"
                name="isComplete"
                checked={isComplete}
                onChange={handleIsComplete}
              />
              Mark as Complete.
            </label>
          </div>
        </div>
        <div className="card-footer">
          <div>Created: {moment(createdAt).format('Do MMM YYYY')}</div>
          <div>Updated: {moment(updatedAt).format('Do MMM YYYY')}</div>
        </div>
      </div>
    </div>
  );
};

CardComponent.propTypes = {
  memory: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    memory: PropTypes.string.isRequired,
    memoryImage: PropTypes.string,
    setDueDate: PropTypes.bool.isRequired,
    isComplete: PropTypes.bool.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    dueDate: PropTypes.string,
    priority: PropTypes.number,
    tag: PropTypes.string,
  }).isRequired,
};

export default CardComponent;

