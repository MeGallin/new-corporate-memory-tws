import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

  const userProfileImageUpload = useSelector(
    (state) => state.userProfileImageUpload,
  );
  const { loading: userProfileImageUploading } = userProfileImageUpload;

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
    document.querySelectorAll('[name="userProfileImage"]').value = '';
    // document.getElementById('userProfileImage').value = null;
    setPreviewImage('');
    setShowUploadInput(false);
  };
  const handleImageUpdate = (e) => {
    e.preventDefault();
    const formImageData = new FormData();
    formImageData.append('userProfileImage', previewImageFile);
    // Dispatch Profile image upload Action
    dispatch(userProfileImageUploadAction(id, formImageData));

    setPreviewImage('');
    setShowUploadInput(false);
  };
  const handleImageDelete = (id) => {
    if (window.confirm(`Are you sure you want to delete this image ${id}`)) {
      // Dispatch delete Image Action
      dispatch(userProfileImageDeleteAction(id));
    }
  };

  const userProfileImageDelete = useSelector(
    (state) => state.userProfileImageDelete,
  );
  const { loading: userProfileDeleteImageLoading } = userProfileImageDelete;

  return (
    <div className="user-profile-image-wrapper">
      {previewImage ? (
        <>
          {userProfileImageUploading || userProfileDeleteImageLoading ? (
            <SpinnerComponent />
          ) : (
            <form onSubmit={handleImageUpdate}>
              <img
                width="214"
                height="214"
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
            <img
              width="214"
              height="214"
              src={imgSrc}
              alt={altText}
              className="user-profile-image"
            />
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
        <div className="user-profile-image-selector">
          <InputComponent
            id="userProfileImage"
            label={imgSrc ? 'Change Image' : 'Add an Image'}
            type="file"
            name="userProfileImage"
            onChange={uploadFileHandler}
          />
        </div>
      ) : null}
    </div>
  );
};

export default UserProfileImageComponent;
