import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import './TagsComponent.scss';

import { memoryDeleteTagAction } from '../../Store/actions/memoriesActions';

export const TagsComponent = ({ memoryId, tag, variant }) => {
  const dispatch = useDispatch();
  const handleDeleteTag = () => {
    dispatch(memoryDeleteTagAction(memoryId));
  };
  return (
    <>
      {tag[0]?.tagName ? (
        <div className={`tags-wrapper ${variant}`}>
          {tag[0]?.tagName}
          <span
            className="tag-x"
            onClick={() => handleDeleteTag()}
            title="Delete Tag"
          >
            X
          </span>
        </div>
      ) : null}
    </>
  );
};
TagsComponent.propTypes = {
  id: PropTypes.string,
  tag: PropTypes.array,
  variant: PropTypes.string,
};
