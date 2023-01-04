import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  const memoryImageUpload = useSelector((state) => state.memoryImageUpload);
  const { loading } = memoryImageUpload;

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
    setPreviewImageFile(imageFile);
    previewFile(imageFile);
  };
  const handelCancelUpload = () => {
    document.querySelectorAll('[name="memoryImage"]').value = '';
    // document.getElementById('memoryImage').value = null;
    setPreviewImage('');
    setShowUploadInput(false);
  };
  const handleImageUpdate = (e) => {
    e.preventDefault();
    const formImageData = new FormData();
    formImageData.append('memoryImage', previewImageFile);
    // Dispatch Profile image upload Action
    dispatch(memoryImageUploadAction(id, formImageData));
    setPreviewImage('');
    setShowUploadInput(false);
  };
  const handleImageDelete = (id) => {
    if (window.confirm(`Are you sure you want to delete this image ${id}`)) {
      // Dispatch delete Image Action
      dispatch(deleteMemoryImageAction(id));
    }
  };
  const memoryDeleteImage = useSelector((state) => state.memoryDeleteImage);
  const { loading: memoryDeleteLoading } = memoryDeleteImage;

  return (
    <div className="memories-image-wrapper">
      {previewImage ? (
        <>
          {loading || memoryDeleteLoading ? (
            <SpinnerComponent />
          ) : (
            <form onSubmit={handleImageUpdate}>
              <img
                src={previewImage}
                alt="profile preview"
                className="preview-image"
              />
              <ButtonComponent
                type="submit"
                text="Yes, like it!"
                variant="success"
                disabled={false}
              />
              <ButtonComponent
                onClick={handelCancelUpload}
                type="button"
                text="No, Don't like it!"
                variant="danger"
                disabled={false}
              />
            </form>
          )}
        </>
      ) : null}

      <div className="image-wrapper">
        {imgSrc && !previewImage ? (
          <>
            <img src={imgSrc} alt={altText} className="memories-image" />
            <div className="image-icon-wrapper">
              <FaTrash
                onClick={() => handleImageDelete(id)}
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
          </>
        ) : !previewImage ? (
          <FaUpload
            onClick={() => setShowUploadInput((prev) => !prev)}
            size={22}
            title="Upload an Image"
            className="upload-icon"
          />
        ) : null}
      </div>

      {showUploadInput && !previewImage ? (
        <div className="memories-image-selector">
          <InputComponent
            id="memoryImage"
            label={imgSrc ? 'Change Image' : 'Add an Image'}
            type="file"
            name="memoryImage"
            onChange={uploadFileHandler}
          />
        </div>
      ) : null}
    </div>
  );
};

export default MemoriesImagesComponent;
