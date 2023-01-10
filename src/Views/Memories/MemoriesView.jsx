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
  const memoryIsComplete = useSelector((state) => state.memoryIsComplete);
  const { success: isCompleteSuccess, error: isCompleteError } =
    memoryIsComplete;
  const memoryDeleteTag = useSelector((state) => state.memoryDeleteTag);
  const { success: deleteTagSuccess, error: deleteTagError } = memoryDeleteTag;
  const memorySetDueDate = useSelector((state) => state.memorySetDueDate);
  const { success: setDueDateSuccess, error: setDueDateError } =
    memorySetDueDate;

  return (
    <>
      {setDueDateError ? <ErrorComponent error={setDueDateError} /> : null}
      {setDueDateSuccess ? (
        <SuccessComponent
          type={'MEMORIES_SET_DUE_DATE_SUCCESS'}
          message={'Memory Due Date has been changed.'}
        />
      ) : null}

      {deleteTagError ? <ErrorComponent error={deleteTagError} /> : null}
      {deleteTagSuccess ? (
        <SuccessComponent
          type={'MEMORIES_DELETE_TAG_SUCCESS'}
          message={'TAG has been successfully Deleted.'}
        />
      ) : null}

      {isCompleteError ? <ErrorComponent error={isCompleteError} /> : null}
      {isCompleteSuccess ? (
        <SuccessComponent
          type={'MEMORIES_IS_COMPETE_SUCCESS'}
          message={'Memory has been MARKED as Complete.'}
        />
      ) : null}

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
