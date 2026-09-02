import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FaSortAmountDownAlt, FaSortAmountUpAlt } from 'react-icons/fa';
import moment from 'moment';
import PropTypes from 'prop-types';
import './SortComponent.scss';

import { sortedMemoriesAction } from '../../Store/actions/sortedMemories';

const SortComponent = ({ memories }) => {
  const dispatch = useDispatch();
  const [activeSort, setActiveSort] = useState('');

  const sortByDueDateNewest = (a, b) => {
    return moment(a.dueDate).valueOf() - moment(b.dueDate).valueOf();
  };
  const sortByDueDateOldest = (a, b) => {
    return moment(b.dueDate).valueOf() - moment(a.dueDate).valueOf();
  };

  const handleSort = (value) => {
    const memoriesCopy = [...memories]; // Create a copy to avoid mutating props
    switch (value) {
      case 'up':
        memoriesCopy.sort(sortByDueDateNewest);
        break;
      case 'down':
        memoriesCopy.sort(sortByDueDateOldest);
        break;
      default:
        break;
    }
    setActiveSort(value);
    dispatch(sortedMemoriesAction(memoriesCopy));
  };

  return (
    <fieldset className="sort-component-wrapper compact-fieldset">
      <legend>Filter due date</legend>
      <button
        type="button"
        className="sort-button"
        onClick={() => handleSort('down')}
        aria-pressed={activeSort === 'down'}
        aria-label="Sort by due date descending"
        title="Sort by due date descending"
      >
        <FaSortAmountDownAlt className="sort-down-arrow-icon" size={18} />
        <span>Latest</span>
      </button>
      <button
        type="button"
        className="sort-button"
        onClick={() => handleSort('up')}
        aria-pressed={activeSort === 'up'}
        aria-label="Sort by due date ascending"
        title="Sort by due date ascending"
      >
        <FaSortAmountUpAlt className="sort-down-up-icon" size={18} />
        <span>Soonest</span>
      </button>
    </fieldset>
  );
};

SortComponent.propTypes = {
  memories: PropTypes.array.isRequired,
};

export default SortComponent;
