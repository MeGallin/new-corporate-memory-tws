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
import SortComponent from '../Sort/SortComponent';

const Memories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');

  const { userInfo } = useSelector((state) => state.userLogin);
  const { userInfo: googleUserInfo } = useSelector(
    (state) => state.googleUserLogin,
  );
  const {
    loading,
    memories: fetchedMemories,
    error,
  } = useSelector((state) => state.memoriesGet);
  const { memories: sortedMemories } = useSelector(
    (state) => state.sortedMemories,
  );

  const memories =
    sortedMemories?.length > 0 ? sortedMemories : fetchedMemories;
  const { userDetails } = useSelector((state) => state.userInfoDetails);

  const isAuthenticated = !!(userInfo || googleUserInfo);

  useEffect(() => {
    if (isAuthenticated && userDetails?.isConfirmed) {
      dispatch(memoriesGetAction());
    } else if (userDetails && !userDetails.isConfirmed) {
      navigate('/forms');
    }
  }, [isAuthenticated, userDetails, navigate, dispatch]);

  const searchedMemories = useMemo(() => {
    if (!memories) return [];
    const lowercasedKeyword = keyword.toLowerCase();
    return memories.filter(
      (memory) =>
        memory.title?.toLowerCase().includes(lowercasedKeyword) ||
        memory.memory?.toLowerCase().includes(lowercasedKeyword),
    );
  }, [memories, keyword]);

  const visibleSearchedMemories = useMemo(() => {
    return searchedMemories.filter((memory) => !memory.isComplete);
  }, [searchedMemories]);

  const completedMemoriesCount = useMemo(() => {
    return memories?.filter((memory) => memory.isComplete).length || 0;
  }, [memories]);

  const handleSearch = (e) => {
    setKeyword(e.target.value);
  };

  const renderHeader = () => (
    <div className="memories-search-wrapper">
      <div>
        <div className="search-sort-wrapper">
          <SearchComponent
            placeholder="search"
            value={keyword}
            onChange={handleSearch}
          />
          <SortComponent memories={memories || []} />
        </div>
        <p>
          [{searchedMemories.length}]{' '}
          {searchedMemories.length === 1 ? 'memory found' : 'memories'} and [
          {completedMemoriesCount}] marked as complete.
        </p>
      </div>
      <div>
        <ModalComponent
          className="create-btn"
          openButtonTitle="Create"
          closeButtonTitle="X"
          variant={'success'}
        >
          {(closeModal) => <CreateMemoryComponent onCloseModal={closeModal} />}
        </ModalComponent>
      </div>
    </div>
  );

  const renderContent = () => {
    if (loading) return <SpinnerComponent />;
    if (error) {
      return (
        <div className="error-message">
          <p>Error loading memories: {error}</p>
          <button onClick={() => dispatch(memoriesGetAction())}>
            Try Again
          </button>
        </div>
      );
    }
    if (!memories?.length) {
      return (
        <div className="empty-state-message">
          <h3>No memories yet!</h3>
          <p>
            Start creating your first memory by clicking the "Create" button
            above.
          </p>
        </div>
      );
    }
    if (!searchedMemories.length && keyword) {
      return (
        <div className="no-search-results">
          <div className="empty-state-message">
            <h3>No memories found</h3>
            <p>
              No memories match your search "{keyword}". Try a different search
              term.
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="memories-component-wrapper">
        {visibleSearchedMemories.map((memory) => (
          <div key={memory._id}>
            <CardComponent memory={memory} />
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      {renderHeader()}
      {renderContent()}
    </>
  );
};

export default Memories;
