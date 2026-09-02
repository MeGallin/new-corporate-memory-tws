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
      <button
        type="button"
        className="tag-x"
        onClick={handleDeleteTag}
        title="Delete tag"
        aria-label={`Delete ${tag} tag`}
      >
        X
      </button>
    </div>
  ) : null;
};
TagsComponent.propTypes = {
  memoryId: PropTypes.string.isRequired,
  tag: PropTypes.string,
  variant: PropTypes.string,
};
