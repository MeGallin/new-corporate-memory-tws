import { useDispatch, useSelector } from 'react-redux';
import ErrorComponent from '../../Components/Error/ErrorComponent';
import MemoriesComponent from '../../Components/Memories/MemoriesComponent';
import SuccessComponent from '../../Components/Success/SuccessComponent';

import {
  MEMORIES_CREATE_RESET,
  MEMORIES_EDIT_RESET,
  MEMORIES_DELETE_RESET,
  MEMORIES_DELETE_TAG_RESET,
  MEMORIES_SET_DUE_DATE_RESET,
  MEMORIES_IS_COMPETE_RESET,
} from '../../Store/constants/memoriesConstants';

import {
  MEMORY_IMAGE_DELETE_RESET,
  MEMORY_IMAGE_UPLOAD_RESET,
} from '../../Store/constants/imageUploadConstants';

const MemoriesView = () => {
  const dispatch = useDispatch();
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
          message={'Memory Due Date has been changed.'}
          onClose={() => dispatch({ type: MEMORIES_SET_DUE_DATE_RESET })}
        />
      ) : null}

      {deleteTagError ? <ErrorComponent error={deleteTagError} /> : null}
      {deleteTagSuccess ? (
        <SuccessComponent
          message={'TAG has been successfully Deleted.'}
          onClose={() => dispatch({ type: MEMORIES_DELETE_TAG_RESET })}
        />
      ) : null}

      {isCompleteError ? <ErrorComponent error={isCompleteError} /> : null}
      {isCompleteSuccess ? (
        <SuccessComponent
          message={'Memory has been MARKED as Complete.'}
          onClose={() => dispatch({ type: MEMORIES_IS_COMPETE_RESET })}
        />
      ) : null}

      {CreateError ? <ErrorComponent error={CreateError} /> : null}
      {CreateSuccess ? (
        <SuccessComponent
          message={'Memory has been successfully created.'}
          onClose={() => dispatch({ type: MEMORIES_CREATE_RESET })}
        />
      ) : null}

      {editError ? <ErrorComponent error={editError} /> : null}
      {editSuccess ? (
        <SuccessComponent
          message={'Memory has been successfully updated.'}
          onClose={() => dispatch({ type: MEMORIES_EDIT_RESET })}
        />
      ) : null}
      {deleteError ? <ErrorComponent error={deleteError} /> : null}
      {deleteSuccess ? (
        <SuccessComponent
          message={'Memory has been successfully Deleted.'}
          onClose={() => dispatch({ type: MEMORIES_DELETE_RESET })}
        />
      ) : null}
      {memoryImageError ? <ErrorComponent error={memoryImageError} /> : null}
      {memoryImageSuccess ? (
        <SuccessComponent
          message={'You have successfully uploaded your image.'}
          onClose={() => dispatch({ type: MEMORY_IMAGE_UPLOAD_RESET })}
        />
      ) : null}
      {memoryDeleteImageError ? (
        <ErrorComponent error={memoryDeleteImageError} />
      ) : null}
      {memoryDeleteImageSuccess ? (
        <SuccessComponent
          message={'You have successfully Deleted your image.'}
          onClose={() => dispatch({ type: MEMORY_IMAGE_DELETE_RESET })}
        />
      ) : null}

      <MemoriesComponent />
    </>
  );
};

export default MemoriesView;
