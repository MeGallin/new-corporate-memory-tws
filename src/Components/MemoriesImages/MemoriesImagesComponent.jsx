import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MemoriesImagesComponent.scss';

import { memoryImageUploadAction } from '../../Store/actions/imageUploadActions';

import { FaUpload } from 'react-icons/fa';
import InputComponent from '../Input/InputComponent';
import ButtonComponent from '../Button/ButtonComponent';
import SpinnerComponent from '../Spinner/SpinnerComponent';
import ErrorComponent from '../Error/ErrorComponent';
import SuccessComponent from '../Success/SuccessComponent';

const MemoriesImagesComponent = ({ id, imgSrc, altText }) => {
  const dispatch = useDispatch();
  const memoryImageUpload = useSelector((state) => state.memoryImageUpload);
  const { loading, error, success } = memoryImageUpload;

  console.log(error, loading, success);

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

  return (
    <div className="memories-image-wrapper">
      {error ? <ErrorComponent error={error} /> : null}
      {success ? (
        <SuccessComponent
          message={'You have successfully uploaded your image.'}
        />
      ) : null}
      {previewImage ? (
        <>
          {loading ? (
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

      {imgSrc ? (
        <img src={imgSrc} alt={altText} className="memories-image" />
      ) : !previewImage ? (
        <FaUpload
          onClick={() => setShowUploadInput((prev) => !prev)}
          size={22}
          title="Upload an Image"
          className="upload-icon"
        />
      ) : null}
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
