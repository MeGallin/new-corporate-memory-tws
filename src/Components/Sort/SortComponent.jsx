import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FaSortAmountDownAlt, FaSortAmountUpAlt } from 'react-icons/fa';
import moment from 'moment';

import { sortedMemoriesAction } from '../../Store/actions/sortedMemories';

const SortComponent = ({ props }) => {
  const dispatch = useDispatch();
  const [sortedMemories, setSortedMemories] = useState(props);
  const sortByDueDateNewest = (a, b) => {
    return moment(a.dueDate).valueOf() - moment(b.dueDate).valueOf();
  };
  const sortByDueDateOldest = (a, b) => {
    return moment(b.dueDate).valueOf() - moment(a.dueDate).valueOf();
  };

  const handleSort = (value) => {
    const sortedMemories = [...props];
    switch (value) {
      case 'up':
        props.sort(sortByDueDateNewest);
        break;
      case 'down':
        props.sort(sortByDueDateOldest);
        break;
      default:
        break;
    }
    setSortedMemories(sortedMemories);
  };

  useEffect(() => {
    setSortedMemories(sortedMemories);
    //Fire Action to save to state
    dispatch(sortedMemoriesAction(sortedMemories));
  }, [sortedMemories, dispatch]);

  return (
    <>
      <div
        style={{
          border: '2px solid lightGrey',
          borderRadius: '4px',
          backgroundColor: 'white',
          padding: '4px 4px',
          width: 'auto',
          height: 'auto',
          display: 'flex',
          justifyContent: 'space-between',
          gap: '0.2em',
        }}
      >
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
    </>
  );
};

export default SortComponent;
