import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import './UserProfileImageComponent.scss';

import {
  userProfileImageUploadAction,
  userProfileImageDeleteAction,
} from '../../Store/actions/imageUploadActions';

import { FaUpload, FaTrash, FaPencilAlt } from 'react-icons/fa';
import InputComponent from '../Input/InputComponent';
import ButtonComponent from '../Button/ButtonComponent';
import SpinnerComponent from '../Spinner/SpinnerComponent';

const UserProfileImageComponent = ({ id, imgSrc, altText }) => {
  const dispatch = useDispatch();

  const { loading: userProfileImageUploading } = useSelector(
    (state) => state.userProfileImageUpload,
  );
  const { loading: userProfileDeleteImageLoading } = useSelector(
    (state) => state.userProfileImageDelete,
  );

  const [showUploadInput, setShowUploadInput] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewImageFile, setPreviewImageFile] = useState('');

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
  };

  const uploadFileHandler = (e) => {
    const imageFile = e.target.files[0];
    if (imageFile) {
      setPreviewImageFile(imageFile);
      previewFile(imageFile);
    }
  };

  const handleCancelUpload = () => {
    setPreviewImage('');
    setPreviewImageFile('');
    setShowUploadInput(false);
  };

  const handleImageUpdate = (e) => {
    e.preventDefault();
    const formImageData = new FormData();
    formImageData.append('userProfileImage', previewImageFile);
    dispatch(userProfileImageUploadAction(id, formImageData));
    handleCancelUpload(); // Reset state after upload
  };

  const handleImageDelete = () => {
    if (window.confirm(`Are you sure you want to delete this image?`)) {
      dispatch(userProfileImageDeleteAction(id));
    }
  };

  const renderImagePreview = () => (
    <form onSubmit={handleImageUpdate}>
      <img
        width="214"
        height="214"
        src={previewImage}
        alt="New profile preview"
        className="preview-image"
      />
      <ButtonComponent
        type="submit"
        text="Yes, like it!"
        variant="success"
        disabled={false}
      />
      <ButtonComponent
        onClick={handleCancelUpload}
        type="button"
        text="No, Don't like it!"
        variant="danger"
        disabled={false}
      />
    </form>
  );

  const renderExistingImage = () => (
    <div className="image-wrapper">
      <img
        width="214"
        height="214"
        src={imgSrc}
        alt={altText}
        className="user-profile-image"
      />
      <div className="image-icon-wrapper">
        <FaTrash
          onClick={handleImageDelete}
          className="trash-icon"
          size={22}
          title="Delete this Image"
        />
        <FaPencilAlt
          onClick={() => setShowUploadInput(!showUploadInput)}
          className="pencil-icon"
          size={22}
          title="EDIT this Image"
        />
      </div>
    </div>
  );

  const renderUploadState = () => (
    <div className="image-wrapper">
      <img
        width="214"
        height="214"
        src="/assets/images/sample.jpg"
        alt="Default Profile"
        className="user-profile-image"
      />
      <FaUpload
        onClick={() => setShowUploadInput((prev) => !prev)}
        size={22}
        title="Upload an Image"
        className="upload-icon"
      />
    </div>
  );

  if (userProfileImageUploading || userProfileDeleteImageLoading) {
    return <SpinnerComponent />;
  }

  return (
    <div className="user-profile-image-wrapper">
      {previewImage ? (
        renderImagePreview()
      ) : imgSrc ? (
        renderExistingImage()
      ) : (
        renderUploadState()
      )}

      {showUploadInput && !previewImage && (
        <div className="user-profile-image-selector">
          <InputComponent
            id={`userProfileImage-${id}`}
            label={imgSrc ? 'Change Image' : 'Add an Image'}
            type="file"
            name="userProfileImage"
            onChange={uploadFileHandler}
          />
        </div>
      )}
    </div>
  );
};

UserProfileImageComponent.propTypes = {
  id: PropTypes.string.isRequired,
  imgSrc: PropTypes.string,
  altText: PropTypes.string.isRequired,
};

export default UserProfileImageComponent;
