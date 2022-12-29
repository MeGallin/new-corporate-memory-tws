import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './MemoriesComponent.scss';
import femaleImage from '../../Assets/Images/female.png';

import { memoriesGetAction } from '../../Store/actions/memoriesActions';

import CardComponent from '../Card/CardComponent';
import ErrorComponent from '../Error/ErrorComponent';
import SpinnerComponent from '../Spinner/SpinnerComponent';
import SearchComponent from '../Search/SearchComponent';
import ModalComponent from '../Modal/ModalComponent';
import CreateMemoryComponent from '../CreateMemory/CreateMemoryComponent';
import EditMemoryComponent from '../EditMemory/EditMemoryComponent';
import DeleteMemoryComponent from '../DeleteMemory/DeleteMemoryComponent';
import SuccessComponent from '../Success/SuccessComponent';

const Memories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const memoriesGet = useSelector((state) => state.memoriesGet);
  const { loading, success, error, memories } = memoriesGet;
  const userInfoDetails = useSelector((state) => state.userInfoDetails);
  const { userDetails } = userInfoDetails;

  useEffect(() => {
    let ignore = false;
    if (userInfo && userDetails?.isConfirmed) {
      dispatch(memoriesGetAction());
    } else {
      navigate('/forms');
    }
    if (!ignore);
    return () => (ignore = true);
  }, [userInfo, userDetails?.isConfirmed, navigate, dispatch]);

  //Searched memories
  const searchedMemories = memories?.filter((memory) => {
    if (memory?.title || memory?.memory) {
      return (
        memory.title.toLowerCase().includes(keyword.toLowerCase()) ||
        memory.memory.toLowerCase().includes(keyword.toLowerCase())
      );
    }
    return false;
  });

  const handleSearch = (e) => {
    setKeyword(e.target.value);
  };
  // Searched memories

  const completedMemories = memories?.filter((memory) => {
    if (memory.isComplete) {
      return memory;
    }
    return false;
  });

  const memoryDeleteTag = useSelector((state) => state.memoryDeleteTag);
  const {
    loading: deleteTagLoading,
    success: deleteTagSuccess,
    error: deleteTagError,
  } = memoryDeleteTag;

  const memorySetDueDate = useSelector((state) => state.memorySetDueDate);
  const {
    loading: setDueDateLoading,
    success: setDueDateSuccess,
    error: setDueDateError,
  } = memorySetDueDate;

  const memoryIsComplete = useSelector((state) => state.memoryIsComplete);
  const {
    loading: isCompleteLoading,
    success: isCompleteSuccess,
    error: isCompleteError,
  } = memoryIsComplete;

  return (
    <>
      {error || isCompleteError || setDueDateError || deleteTagError ? (
        <ErrorComponent error={error} />
      ) : null}
      {isCompleteSuccess || setDueDateSuccess || deleteTagSuccess ? (
        <SuccessComponent message={'Memory has bee successfully Updated.'} />
      ) : null}
      {loading ||
      setDueDateLoading ||
      isCompleteLoading ||
      deleteTagLoading ||
      !success ? (
        <SpinnerComponent />
      ) : (
        <>
          <SearchComponent
            placeholder="search"
            value={keyword}
            handleSearch={handleSearch}
          />
          <p>
            [{searchedMemories?.length}]{' '}
            {searchedMemories?.length === 1 ? 'memory found.' : 'memories'} and
            [{completedMemories?.length}] marked as complete.
          </p>
          <ModalComponent
            className="create-btn"
            openButtonTitle="Create"
            closeButtonTitle="X"
            variant={'success'}
            props={<CreateMemoryComponent />}
          />
          <div className="memories-component-wrapper">
            {searchedMemories?.map((memory) => (
              <div key={memory._id} className="memories-card-wrapper">
                {console.log(memory)}
                <CardComponent
                  id={memory._id}
                  title={memory.title}
                  dueDate={memory.dueDate}
                  memory={memory.memory}
                  voice={memory.memory}
                  imgSrc={femaleImage}
                  setDueDate={memory.setDueDate}
                  isComplete={memory.isComplete}
                  priority={memory.priority}
                  tag={memory.tags.map((tag) => tag)}
                  created={memory.createdAt}
                  updated={memory.updatedAt}
                />
                <ModalComponent
                  className="edit-btn"
                  openButtonTitle="EDIT"
                  closeButtonTitle="X"
                  variant={'warning'}
                  props={<EditMemoryComponent updateMemory={{ ...memory }} />}
                />
                <DeleteMemoryComponent id={memory._id} />
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Memories;
