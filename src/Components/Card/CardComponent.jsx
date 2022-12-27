import { useState, useEffect } from 'react';
import './CardComponent.scss';
import PropTypes from 'prop-types';
import StarsComponent from '../Stars/StarsComponent';
import moment from 'moment';
import { TagsComponent } from '../Tags/TagsComponent';
import MemoriesImagesComponent from '../MemoriesImages/MemoriesImagesComponent';
import { FaBullhorn } from 'react-icons/fa';

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
  priority,
  tag,
}) => {
  const [dateTime, setDateTime] = useState(moment());

  useEffect(() => {
    setDateTime(moment().valueOf());
  }, [title]);

  const activateVoice = (text) => {
    window.responsiveVoice.speak(text);
  };

  return (
    <div className="card-wrapper">
      <fieldset className="fieldSet">
        <legend>{title}</legend>
        <div className="card-header">
          <div
            className={`${
              moment(dueDate).valueOf() < dateTime ? 'late' : 'early'
            } `}
          >
            {moment(dueDate).valueOf() < dateTime ? 'Over due by ' : 'Due in '}{' '}
            {moment(dueDate).fromNow(dateTime)}
          </div>
          <TagsComponent tag={tag} variant="warning" />
        </div>
        <div className="card-body">
          <p>{memory}</p>
          <div onClick={() => activateVoice(voice)}>
            <FaBullhorn size={22} title="Activate voice text" />
          </div>
          <MemoriesImagesComponent imgSrc={imgSrc} altText={'Female Image'} />
          <StarsComponent priority={priority} />
          <p>{setDueDate ? 'Set Due Date: true' : 'Set Due Date: false'}</p>
          <p>{isComplete ? 'Is Complete: true' : 'Is Complete: false'}</p>
        </div>
        <div className="card-footer">
          <div>Created: {moment(created).format('Do MMM YYYY')}</div>
          <div>Updated: {moment(updated).format('Do MMM YYYY')}</div>
        </div>
      </fieldset>
    </div>
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
