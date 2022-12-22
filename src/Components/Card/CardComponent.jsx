import { useState, useEffect } from 'react';
import './CardComponent.scss';
import PropTypes from 'prop-types';
import StarsComponent from '../Stars/StarsComponent';
import moment from 'moment';
import { TagsComponent } from '../Tags/TagsComponent';

const CardComponent = ({
  title,
  memory,
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
          <StarsComponent priority={priority} />
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
