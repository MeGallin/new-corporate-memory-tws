import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import './MemoriesComponent.scss';

import { memoriesGetAction } from '../../Store/actions/memoriesActions';
import { userInfoDetailsAction } from '../../Store/actions/userActions';

import CardComponent from '../Card/CardComponent';
import SpinnerComponent from '../Spinner/SpinnerComponent';
import SearchComponent from '../Search/SearchComponent';
import ModalComponent from '../Modal/ModalComponent';
import CreateMemoryComponent from '../CreateMemory/CreateMemoryComponent';
import SortComponent from '../Sort/SortComponent';
import ButtonComponent from '../Button/ButtonComponent';
import AgentChatComponent from '../AgentChat/AgentChatComponent';

const Memories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);

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
  const {
    loading: userDetailsLoading,
    error: userDetailsError,
    userDetails,
  } = useSelector((state) => state.userInfoDetails);

  const isAuthenticated = !!(userInfo || googleUserInfo);

  useEffect(() => {
    if (!isAuthenticated) return;

    if (!userDetails) {
      if (!userDetailsLoading && !userDetailsError) {
        dispatch(userInfoDetailsAction());
      }
      return;
    }

    if (!userDetails.isConfirmed) {
      navigate('/forms');
      return;
    }

    dispatch(memoriesGetAction());
  }, [
    dispatch,
    isAuthenticated,
    navigate,
    userDetails,
    userDetailsError,
    userDetailsLoading,
  ]);

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

  const totalMemoriesCount = memories?.length || 0;

  const handleSearch = (e) => {
    setKeyword(e.target.value);
  };

  const renderHeader = () => (
    <fieldset className="memories-search-wrapper query-fieldset">
      <legend>Find a memory</legend>
      <SearchComponent
        id="memory-search"
        ariaLabel="Search memory titles and notes"
        placeholder="Search titles and notes"
        value={keyword}
        onChange={handleSearch}
      />
      <div className="memories-status-wrapper">
        <fieldset
          className="memories-results compact-fieldset"
          aria-live="polite"
        >
          <legend>Memory status</legend>
          <span>
            <strong>{visibleSearchedMemories.length}</strong>{' '}
            {visibleSearchedMemories.length === 1
              ? 'active memory'
              : 'active memories'}
          </span>
          <Link
            to="/user-admin"
            className="memories-completed-link"
            aria-label={`${completedMemoriesCount} completed ${
              completedMemoriesCount === 1 ? 'memory' : 'memories'
            }. View completed memories.`}
          >
            <strong>{completedMemoriesCount}</strong> completed
          </Link>
        </fieldset>
      </div>
    </fieldset>
  );

  const renderMemoryActions = () => (
    <section className="memories-actions-wrapper" aria-label="Memory actions">
      <SortComponent memories={memories || []} />
      <ButtonComponent
        onClick={() => setCreateModalOpen(true)}
        type="button"
        text="Create memory"
        variant="success"
        className="create-memory-button"
      />
      <ModalComponent
        isOpen={isCreateModalOpen}
        onClose={() => setCreateModalOpen(false)}
        ariaLabel="Create memory"
        closeButtonTitle="Close create memory dialog"
      >
        <CreateMemoryComponent onCloseModal={() => setCreateModalOpen(false)} />
      </ModalComponent>
    </section>
  );

  const renderContent = () => {
    if (isAuthenticated && userDetailsLoading && !userDetails) {
      return <SpinnerComponent />;
    }
    if (userDetailsError && !userDetails) {
      return (
        <div className="error-message">
          <p>Error loading your account: {userDetailsError}</p>
          <button onClick={() => dispatch(userInfoDetailsAction())}>
            Try Again
          </button>
        </div>
      );
    }
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
            Start creating your first memory by clicking the "Create memory"
            button above.
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
      <section className="memories-workbench" aria-labelledby="memory-workspace-title">
        <header className="memories-workbench__header">
          <h1 id="memory-workspace-title">Memory workspace</h1>
          <span>
            {totalMemoriesCount} {totalMemoriesCount === 1 ? 'memory' : 'memories'}
          </span>
        </header>
        <div className="memories-query-grid">
          {renderHeader()}
          <AgentChatComponent actions={renderMemoryActions()} />
        </div>
      </section>
      <section className="memories-library" aria-labelledby="active-memories-title">
        <header className="memories-library__header">
          <h2 id="active-memories-title">Active memories</h2>
          <span>
            {loading
              ? 'Loading memories'
              : error
                ? 'Memories unavailable'
                : `Showing ${visibleSearchedMemories.length}`}
          </span>
        </header>
        {renderContent()}
      </section>
    </>
  );
};

export default Memories;
