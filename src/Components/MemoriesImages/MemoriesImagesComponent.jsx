import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import './MemoriesImagesComponent.scss';

import {
  memoryImageUploadAction,
  deleteMemoryImageAction,
} from '../../Store/actions/imageUploadActions';

import { FaUpload, FaTrash, FaPencilAlt } from 'react-icons/fa';
import InputComponent from '../Input/InputComponent';
import ButtonComponent from '../Button/ButtonComponent';
import SpinnerComponent from '../Spinner/SpinnerComponent';
import ModalComponent from '../Modal/ModalComponent';
import { getImageFileError, IMAGE_ACCEPT } from '../../Utils/validation';

export const MemoryImageDisplayComponent = ({ imgSrc, altText }) => {
  const [isImageModalOpen, setImageModalOpen] = useState(false);

  if (!imgSrc) {
    return null;
  }

  return (
    <div className="memory-image-display">
      <button
        type="button"
        onClick={() => setImageModalOpen(true)}
        className="clickable-image"
        aria-label={`View ${altText}`}
      >
        <img src={imgSrc} alt={altText} className="memories-image" />
      </button>
      <ModalComponent
        isOpen={isImageModalOpen}
        onClose={() => setImageModalOpen(false)}
        ariaLabel={`Image preview: ${altText}`}
        closeButtonTitle="Close image preview"
        size="media"
      >
        <img src={imgSrc} alt={altText} className="modal-image-large" />
      </ModalComponent>
    </div>
  );
};

MemoryImageDisplayComponent.propTypes = {
  imgSrc: PropTypes.string,
  altText: PropTypes.string.isRequired,
};

const MemoriesImagesComponent = ({ id, imgSrc }) => {
  const dispatch = useDispatch();
  const { loading: memoryImageUploadLoading } = useSelector(
    (state) => state.memoryImageUpload,
  );
  const { loading: memoryDeleteImageLoading } = useSelector(
    (state) => state.memoryDeleteImage,
  );

  const isCurrentMemoryLoading = memoryImageUploadLoading[id] || memoryDeleteImageLoading[id];

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
    formImageData.append('memoryImage', previewImageFile);
    dispatch(memoryImageUploadAction(id, formImageData));
    handleCancelUpload(); // Reset state after upload
  };

  const handleImageDelete = () => {
    if (window.confirm(`Are you sure you want to delete this image?`)) {
      dispatch(deleteMemoryImageAction(id));
      setShowUploadInput(false);
    }
  };

  const renderImagePreview = () => (
    <form onSubmit={handleImageUpdate}>
      <img
        src={previewImage}
        alt="New memory preview"
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
        variant="secondary"
        disabled={false}
      />
    </form>
  );

  const renderImageAction = () => (
    <button
      type="button"
      className="memory-image-action"
      onClick={() => setShowUploadInput((prev) => !prev)}
      aria-expanded={showUploadInput}
      aria-controls={`memory-image-options-${id}`}
    >
      {imgSrc ? (
        <FaPencilAlt className="pencil-icon" size={15} aria-hidden="true" />
      ) : (
        <FaUpload size={15} className="upload-icon" aria-hidden="true" />
      )}
      {imgSrc ? 'Change image' : 'Add image'}
    </button>
  );

  if (isCurrentMemoryLoading) {
    return <SpinnerComponent />;
  }

  return (
    <div
      className={`memories-image-wrapper${showUploadInput || previewImage ? ' memories-image-wrapper--expanded' : ''}`}
    >
      {previewImage ? renderImagePreview() : renderImageAction()}

      {showUploadInput && !previewImage && (
        <div
          className="memories-image-selector"
          id={`memory-image-options-${id}`}
        >
          <InputComponent
            id={`memoryImage-${id}`}
            label={imgSrc ? 'Change Image' : 'Add an Image'}
            type="file"
            name="memoryImage"
            accept={IMAGE_ACCEPT}
            error={fileError}
            onChange={uploadFileHandler}
          />
          {imgSrc ? (
            <button
              type="button"
              className="memory-image-delete-action"
              onClick={handleImageDelete}
            >
              <FaTrash size={15} aria-hidden="true" />
              Delete image
            </button>
          ) : null}
        </div>
      )}
    </div>
  );
};

MemoriesImagesComponent.propTypes = {
  id: PropTypes.string.isRequired,
  imgSrc: PropTypes.string,
};

export default MemoriesImagesComponent;
