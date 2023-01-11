import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './MemoriesComponent.scss';

import { memoriesGetAction } from '../../Store/actions/memoriesActions';

import CardComponent from '../Card/CardComponent';
import SpinnerComponent from '../Spinner/SpinnerComponent';
import SearchComponent from '../Search/SearchComponent';
import ModalComponent from '../Modal/ModalComponent';
import CreateMemoryComponent from '../CreateMemory/CreateMemoryComponent';
import EditMemoryComponent from '../EditMemory/EditMemoryComponent';
import DeleteMemoryComponent from '../DeleteMemory/DeleteMemoryComponent';
import SortComponent from '../Sort/SortComponent';

const Memories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const memoriesGet = useSelector((state) => state.memoriesGet);
  const { loading, success, memories } = memoriesGet;
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

  return (
    <>
      {loading || !success ? (
        <SpinnerComponent />
      ) : (
        <>
          <div className="memories-search-wrapper">
            <div>
              <div className="search-sort-wrapper">
                <SearchComponent
                  placeholder="search"
                  value={keyword}
                  handleSearch={handleSearch}
                />
                <SortComponent props={memories} />
              </div>

              <p>
                [{searchedMemories?.length}]{' '}
                {searchedMemories?.length === 1 ? 'memory found.' : 'memories'}{' '}
                and [{completedMemories?.length}] marked as complete.
              </p>
            </div>

            <div>
              <ModalComponent
                className="create-btn"
                openButtonTitle="Create"
                closeButtonTitle="X"
                variant={'success'}
                props={<CreateMemoryComponent />}
              />
            </div>
          </div>

          <div className="memories-component-wrapper">
            {searchedMemories?.map((memory) => (
              <div
                key={memory._id}
                className={
                  memory.isComplete
                    ? 'memories-completed'
                    : 'memories-card-wrapper'
                }
              >
                <CardComponent
                  id={memory._id}
                  title={memory.title}
                  dueDate={memory.dueDate}
                  memory={memory.memory}
                  voice={memory.memory}
                  imgSrc={memory.memoryImage}
                  setDueDate={memory.setDueDate}
                  isComplete={memory.isComplete}
                  priority={memory.priority}
                  tag={memory.tag}
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
