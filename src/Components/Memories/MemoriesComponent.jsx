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

const Memories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const memoriesGet = useSelector((state) => state.memoriesGet);
  const { loading, success, error, memories } = memoriesGet;

  useEffect(() => {
    let ignore = false;
    if (userInfo) {
      dispatch(memoriesGetAction());
    } else {
      navigate('/forms');
    }
    if (!ignore);
    return () => (ignore = true);
  }, [userInfo, navigate, dispatch]);

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
      {error ? <ErrorComponent error={error} /> : null}
      {loading && !success ? (
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
            props={<CreateMemoryComponent />}
          />
          <div className="memories-component-wrapper">
            {searchedMemories?.map((memory) => (
              <div key={memory._id}>
                {console.log(memory)}
                <CardComponent
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
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Memories;
