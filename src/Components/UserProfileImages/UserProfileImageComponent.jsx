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
import { getImageFileError, IMAGE_ACCEPT } from '../../Utils/validation';

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
  const [fileError, setFileError] = useState(null);

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
  };

  const uploadFileHandler = (e) => {
    const imageFile = e.target.files[0];
    const validationError = getImageFileError(imageFile);
    setFileError(validationError);
    if (validationError) {
      e.target.value = '';
      setPreviewImage('');
      setPreviewImageFile('');
      return;
    }
    setPreviewImageFile(imageFile);
    previewFile(imageFile);
  };

  const handleCancelUpload = () => {
    setPreviewImage('');
    setPreviewImageFile('');
    setFileError(null);
    setShowUploadInput(false);
  };

  const handleImageUpdate = (e) => {
    e.preventDefault();
    const validationError = getImageFileError(previewImageFile);
    if (validationError) {
      setFileError(validationError);
      return;
    }
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
        disabled={!previewImageFile}
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
        <button
          type="button"
          onClick={handleImageDelete}
          title="Delete this Image"
          aria-label="Delete profile image"
        >
          <FaTrash className="trash-icon" size={16} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => setShowUploadInput(!showUploadInput)}
          title="EDIT this Image"
          aria-label="Change profile image"
        >
          <FaPencilAlt className="pencil-icon" size={16} aria-hidden="true" />
        </button>
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
      <button
        type="button"
        onClick={() => setShowUploadInput((prev) => !prev)}
        title="Upload an Image"
        className="upload-icon"
        aria-label="Upload profile image"
      >
        <FaUpload size={16} aria-hidden="true" />
      </button>
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
            accept={IMAGE_ACCEPT}
            error={fileError}
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
