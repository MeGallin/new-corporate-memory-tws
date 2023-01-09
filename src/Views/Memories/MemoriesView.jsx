import { useSelector } from 'react-redux';
import ErrorComponent from '../../Components/Error/ErrorComponent';
import MemoriesComponent from '../../Components/Memories/MemoriesComponent';
import SuccessComponent from '../../Components/Success/SuccessComponent';
const MemoriesView = () => {
  const memoryCreate = useSelector((state) => state.memoryCreate);
  const { success: CreateSuccess, error: CreateError } = memoryCreate;
  const memoryEdit = useSelector((state) => state.memoryEdit);
  const { success: editSuccess, error: editError } = memoryEdit;
  const memoryDelete = useSelector((state) => state.memoryDelete);
  const { success: deleteSuccess, error: deleteError } = memoryDelete;
  const memoryImageUpload = useSelector((state) => state.memoryImageUpload);
  const { success: memoryImageSuccess, error: memoryImageError } =
    memoryImageUpload;
  const memoryDeleteImage = useSelector((state) => state.memoryDeleteImage);
  const { success: memoryDeleteImageSuccess, error: memoryDeleteImageError } =
    memoryDeleteImage;

  return (
    <>
      {CreateError ? <ErrorComponent error={CreateError} /> : null}
      {CreateSuccess ? (
        <SuccessComponent
          type={'MEMORIES_CREATE_SUCCESS'}
          message={'Memory has been successfully created.'}
        />
      ) : null}

      {editError ? <ErrorComponent error={editError} /> : null}
      {editSuccess ? (
        <SuccessComponent
          type={'MEMORIES_EDIT_SUCCESS'}
          message={'Memory has been successfully updated.'}
        />
      ) : null}
      {deleteError ? <ErrorComponent error={deleteError} /> : null}
      {deleteSuccess ? (
        <SuccessComponent
          type={'MEMORIES_DELETE_SUCCESS'}
          message={'Memory has been successfully Deleted.'}
        />
      ) : null}
      {memoryImageError ? <ErrorComponent error={memoryImageError} /> : null}
      {memoryImageSuccess ? (
        <SuccessComponent
          type={'MEMORY_IMAGE_UPLOAD_SUCCESS'}
          message={'You have successfully uploaded your image.'}
        />
      ) : null}
      {memoryDeleteImageError ? (
        <ErrorComponent error={memoryDeleteImageError} />
      ) : null}
      {memoryDeleteImageSuccess ? (
        <SuccessComponent
          type={'MEMORY_IMAGE_DELETE_SUCCESS'}
          message={'You have successfully Deleted your image.'}
        />
      ) : null}

      <MemoriesComponent />
    </>
  );
};

export default MemoriesView;
