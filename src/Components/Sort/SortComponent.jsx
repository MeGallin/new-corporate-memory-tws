import { useDispatch } from 'react-redux';
import { FaSortAmountDownAlt, FaSortAmountUpAlt } from 'react-icons/fa';
import moment from 'moment';
import PropTypes from 'prop-types';

import { sortedMemoriesAction } from '../../Store/actions/sortedMemories';

const SortComponent = ({ memories }) => {
  const dispatch = useDispatch();

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
    dispatch(sortedMemoriesAction(memoriesCopy));
  };

  return (
    <div className="sort-component-wrapper">
      <FaSortAmountDownAlt
        onClick={() => handleSort('down')}
        className="sort-down-arrow-icon"
        size={18}
        title="sort DOWN by Due Date"
      />
      <FaSortAmountUpAlt
        onClick={() => handleSort('up')}
        className="sort-down-up-icon"
        size={18}
        title="sort UP by Due Date"
      />
    </div>
  );
};

SortComponent.propTypes = {
  memories: PropTypes.array.isRequired,
};

export default SortComponent;
