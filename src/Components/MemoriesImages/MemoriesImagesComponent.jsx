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
    formImageData.append('memoryImage', previewImageFile);
    dispatch(memoryImageUploadAction(id, formImageData));
    handleCancelUpload(); // Reset state after upload
  };

  const handleImageDelete = () => {
    if (window.confirm(`Are you sure you want to delete this image?`)) {
      dispatch(deleteMemoryImageAction(id));
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
      <div className="image-icon-wrapper">
        <button
          type="button"
          className="memory-image-action"
          onClick={() => setShowUploadInput(!showUploadInput)}
          aria-label="Change memory image"
          title="Change memory image"
        >
          <FaPencilAlt className="pencil-icon" size={15} />
        </button>
        <button
          type="button"
          className="memory-image-action"
          onClick={handleImageDelete}
          aria-label="Delete memory image"
          title="Delete memory image"
        >
          <FaTrash className="trash-icon" size={15} />
        </button>
      </div>
    </div>
  );

  const renderUploadState = () => (
    <div className="image-wrapper">
      <button
        type="button"
        className="memory-image-action"
        onClick={() => setShowUploadInput((prev) => !prev)}
        aria-label="Upload a memory image"
        title="Upload a memory image"
      >
        <FaUpload size={15} className="upload-icon" />
      </button>
    </div>
  );

  if (isCurrentMemoryLoading) {
    return <SpinnerComponent />;
  }

  return (
    <div className="memories-image-wrapper">
      {previewImage
        ? renderImagePreview()
        : imgSrc
        ? renderExistingImage()
        : renderUploadState()}

      {showUploadInput && !previewImage && (
        <div className="memories-image-selector">
          <InputComponent
            id={`memoryImage-${id}`}
            label={imgSrc ? 'Change Image' : 'Add an Image'}
            type="file"
            name="memoryImage"
            onChange={uploadFileHandler}
          />
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
