import { useState } from 'react';
import { useDispatch } from 'react-redux';
import './CardComponent.scss';
import PropTypes from 'prop-types';
import { FaBullhorn } from 'react-icons/fa';
import moment from 'moment';

import {
  memorySetDueDateAction,
  memoryIsCompleteAction,
} from '../../Store/actions/memoriesActions';

import StarsComponent from '../Stars/StarsComponent';
import { TagsComponent } from '../Tags/TagsComponent';
import MemoriesImagesComponent, {
  MemoryImageDisplayComponent,
} from '../MemoriesImages/MemoriesImagesComponent';

import ModalComponent from '../Modal/ModalComponent';
import EditMemoryComponent from '../EditMemory/EditMemoryComponent';
import DeleteMemoryComponent from '../DeleteMemory/DeleteMemoryComponent';
import ButtonComponent from '../Button/ButtonComponent';

const CardComponent = ({ memory }) => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
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
  const canReadAloud = typeof window.responsiveVoice?.speak === 'function';

  const activateVoice = (text) => {
    if (canReadAloud) window.responsiveVoice.speak(text);
  };

  const handleSetDueDate = () => {
    dispatch(memorySetDueDateAction({ id: _id, setDueDate: !setDueDate }));
  };

  const handleIsComplete = () => {
    dispatch(memoryIsCompleteAction({ id: _id, isComplete: !isComplete }));
  };

  const isOverdue = moment(dueDate).isBefore(moment());
  const titleId = `memory-title-${_id}`;

  return (
    <article className="card-wrapper" aria-labelledby={titleId}>
      <fieldset className="fieldSet" aria-labelledby={titleId}>
        <legend className="card-title" aria-hidden="true">
          <span className="card-title-plate">{title}</span>
        </legend>
        <h3 id={titleId} className="card-title-heading">{title}</h3>
        <div className="card-body">
          {tag ? (
            <div className="card-tag-row">
              <TagsComponent memoryId={_id} tag={tag} variant="warning" />
            </div>
          ) : null}
          <p className="card-copy">{memoryText}</p>
          <MemoryImageDisplayComponent
            imgSrc={memoryImage}
            altText={`Image for ${title}`}
          />

          <div className="card-signal-row">
            <div className="card-due-state">
              {setDueDate ? (
                <span className={isOverdue ? 'late' : 'early'}>
                  {isOverdue ? 'Overdue' : 'Due'} {moment(dueDate).fromNow()}
                </span>
              ) : (
                <span>No date set.</span>
              )}
            </div>
            <div className="card-priority" aria-label="Memory priority">
              <span>Priority</span>
              <StarsComponent priority={priority} />
            </div>
          </div>

          <div className="card-primary-actions">
            <ButtonComponent
              onClick={handleIsComplete}
              type="button"
              text={isComplete ? 'Unmark as complete' : 'Mark complete'}
              variant="primary"
              className="card-complete-action"
              aria-pressed={isComplete}
            />
            <ButtonComponent
              onClick={() => setEditModalOpen(true)}
              type="button"
              text="Edit"
              variant="warning"
              className="card-edit-action"
            />
          </div>
          <ModalComponent
            isOpen={isEditModalOpen}
            onClose={() => setEditModalOpen(false)}
            ariaLabel={`Edit memory: ${title}`}
            closeButtonTitle="Close edit memory dialog"
          >
            <EditMemoryComponent updateMemory={memory} />
          </ModalComponent>

          <details className="card-more-actions">
            <summary>Details and more actions</summary>
            <div className="card-more-actions-content">
              <div className="card-footer">
                <div>
                  <span>Created</span>
                  {moment(createdAt).format('Do MMM YYYY')}
                </div>
                <div>
                  <span>Updated</span>
                  {moment(updatedAt).format('Do MMM YYYY')}
                </div>
              </div>

              <div className="card-secondary-actions">
                <MemoriesImagesComponent
                  id={_id}
                  imgSrc={memoryImage}
                />
                <button
                  type="button"
                  className="card-icon-button"
                  onClick={() => activateVoice(memoryText)}
                  disabled={!canReadAloud}
                  title={
                    canReadAloud
                      ? 'Read this memory aloud'
                      : 'Read aloud is unavailable'
                  }
                >
                  <FaBullhorn size={15} className="bullhorn-icon" aria-hidden="true" />
                  Read aloud
                </button>

                {setDueDate ? (
                  <label className="card-reminder-control">
                    <span>Reminder settings</span>
                    <span className="card-reminder-state">
                      <input
                        type="checkbox"
                        name="setDueDate"
                        checked={setDueDate}
                        onChange={handleSetDueDate}
                        aria-label="Due date enabled"
                      />
                      Due date enabled
                    </span>
                  </label>
                ) : (
                  <div className="card-reminder-control">
                    <span>Reminder settings</span>
                    <span>Edit memory to set a due date.</span>
                  </div>
                )}

                <DeleteMemoryComponent memory={memory} />
              </div>
            </div>
          </details>
        </div>
      </fieldset>
    </article>
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
