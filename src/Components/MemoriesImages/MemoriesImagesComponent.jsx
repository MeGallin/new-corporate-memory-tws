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

const MemoriesImagesComponent = ({ id, imgSrc, altText }) => {
  const dispatch = useDispatch();
  const { loading: memoryImageUploadLoading } = useSelector(
    (state) => state.memoryImageUpload,
  );
  const { loading: memoryDeleteImageLoading } = useSelector(
    (state) => state.memoryDeleteImage,
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
      <img src={previewImage} alt="New memory preview" className="preview-image" />
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
      <img src={imgSrc} alt={altText} className="memories-image" />
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
      <FaUpload
        onClick={() => setShowUploadInput((prev) => !prev)}
        size={22}
        title="Upload an Image"
        className="upload-icon"
      />
    </div>
  );

  if (memoryImageUploadLoading || memoryDeleteImageLoading) {
    return <SpinnerComponent />;
  }

  return (
    <div className="memories-image-wrapper">
      {previewImage ? (
        renderImagePreview()
      ) : imgSrc ? (
        renderExistingImage()
      ) : (
        renderUploadState()
      )}

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
  altText: PropTypes.string.isRequired,
};

export default MemoriesImagesComponent;
