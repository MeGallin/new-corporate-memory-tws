import { useEffect, useState, useMemo } from 'react';
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
  const googleUserLogin = useSelector((state) => state.googleUserLogin);
  const { userInfo: googleUserInfo } = googleUserLogin;
  const memoriesGet = useSelector((state) => state.memoriesGet);
  const { loading, memories, error } = memoriesGet;
  const userInfoDetails = useSelector((state) => state.userInfoDetails);
  const { userDetails } = userInfoDetails;

  useEffect(() => {
    if ((userInfo || googleUserInfo) && userDetails?.isConfirmed) {
      dispatch(memoriesGetAction());
    } else if (userDetails && !userDetails.isConfirmed) {
      navigate('/forms');
    }
  }, [userInfo, googleUserInfo, userDetails, navigate, dispatch]);

  // Memoized search and filter operations for better performance
  const searchKeywordLower = useMemo(() => keyword.toLowerCase(), [keyword]);

  const searchedMemories = useMemo(() => {
    if (!memories || memories.length === 0) return [];

    return memories.filter((memory) => {
      const title = memory?.title?.toLowerCase() || '';
      const content = memory?.memory?.toLowerCase() || '';

      return (
        title.includes(searchKeywordLower) ||
        content.includes(searchKeywordLower)
      );
    });
  }, [memories, searchKeywordLower]);

  const completedMemories = useMemo(() => {
    if (!memories || memories.length === 0) return [];
    return memories.filter((memory) => memory.isComplete);
  }, [memories]);

  const handleSearch = (e) => {
    setKeyword(e.target.value);
  };

  // Show error state for actual errors
  if (error) {
    return (
      <div className="error-message">
        <p>Error loading memories: {error}</p>
        <button onClick={() => dispatch(memoriesGetAction())}>Try Again</button>
      </div>
    );
  }

  // Handle empty state (no memories)
  const hasNoMemories = !memories || memories.length === 0;

  if (!loading && hasNoMemories) {
    return (
      <div className="empty-memories-state">
        <div className="memories-search-wrapper">
          <div>
            <div className="search-sort-wrapper">
              <SearchComponent
                placeholder="search"
                value={keyword}
                handleSearch={handleSearch}
              />
              <SortComponent memories={[]} />
            </div>
            <p>[0] memories and [0] marked as complete.</p>
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
        <div className="empty-state-message">
          <h3>No memories yet!</h3>
          <p>
            Start creating your first memory by clicking the "Create" button
            above.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="memories-search-wrapper">
        <div>
          <div className="search-sort-wrapper">
            <SearchComponent
              placeholder="search"
              value={keyword}
              handleSearch={handleSearch}
            />
            <SortComponent memories={memories} />
          </div>

          <p>
            [{searchedMemories?.length}]{' '}
            {searchedMemories?.length === 1 ? 'memory found.' : 'memories'} and
            [{completedMemories?.length}] marked as complete.
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
      {loading ? (
        <SpinnerComponent />
      ) : (
        <>
          {searchedMemories.length === 0 && keyword ? (
            <div className="no-search-results">
              <div className="empty-state-message">
                <h3>No memories found</h3>
                <p>
                  No memories match your search "{keyword}". Try a different
                  search term.
                </p>
              </div>
            </div>
          ) : (
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
          )}
        </>
      )}
    </>
  );
};

export default Memories;
