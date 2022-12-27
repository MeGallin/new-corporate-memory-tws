import PropTypes from 'prop-types';
import './TagsComponent.scss';

const handleDeleteTag = (id) => {
  alert('tag ID ' + id);
};

export const TagsComponent = ({ tag, variant }) => {
  return (
    <div className={`tags-wrapper ${variant}`}>
      {tag[0]?.tagName}

      <span
        className="tag-x"
        onClick={() => handleDeleteTag(tag[0]?._id)}
        title="Delete Tag"
      >
        X
      </span>
    </div>
  );
};
TagsComponent.propTypes = {
  id: PropTypes.string,
  tag: PropTypes.array,
  variant: PropTypes.string,
};
