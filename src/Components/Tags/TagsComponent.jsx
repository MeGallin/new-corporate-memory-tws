import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import './TagsComponent.scss';

import { memoryDeleteTagAction } from '../../Store/actions/memoriesActions';

export const TagsComponent = ({ memoryId, tag, variant }) => {
  const dispatch = useDispatch();
  const handleDeleteTag = () => {
    dispatch(memoryDeleteTagAction(memoryId));
  };
  return tag ? (
    <div className={`tags-wrapper ${variant}`}>
      {tag}
      <span
        className="tag-x"
        onClick={() => handleDeleteTag()}
        title="Delete Tag"
      >
        X
      </span>
    </div>
  ) : null;
};
TagsComponent.propTypes = {
  id: PropTypes.string,
  tag: PropTypes.string,
  variant: PropTypes.string,
};
