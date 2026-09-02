import { useDispatch, useSelector } from 'react-redux';
import ErrorComponent from '../Error/ErrorComponent';
import SuccessComponent from '../Success/SuccessComponent';
import { MEMORIES_IS_COMPETE_RESET } from '../../Store/constants/memoriesConstants';

const MemoryCompletionFeedbackComponent = () => {
  const dispatch = useDispatch();
  const { success, error, isComplete } = useSelector(
    (state) => state.memoryIsComplete,
  );

  return (
    <>
      {error ? <ErrorComponent error={error} /> : null}
      {success ? (
        <SuccessComponent
          message={
            isComplete
              ? 'Memory has been marked as complete.'
              : 'Memory is no longer marked as complete.'
          }
          onClose={() => dispatch({ type: MEMORIES_IS_COMPETE_RESET })}
        />
      ) : null}
    </>
  );
};

export default MemoryCompletionFeedbackComponent;
