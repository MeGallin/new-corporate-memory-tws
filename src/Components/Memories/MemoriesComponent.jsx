import { useEffect, useState, useMemo, useRef } from 'react';
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
  const memoriesCollectionRef = useRef(null);

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
        memory?.title?.toLowerCase().includes(lowercasedKeyword) ||
        memory?.memory?.toLowerCase().includes(lowercasedKeyword),
    );
  }, [memories, keyword]);

  const visibleSearchedMemories = useMemo(() => {
    return searchedMemories.filter((memory) => !memory?.isComplete);
  }, [searchedMemories]);

  useEffect(() => {
    const collection = memoriesCollectionRef.current;
    if (!collection) return undefined;

    let animationFrameId = null;

    const applyVisualCardTones = () => {
      const cards = [...collection.children]
        .map((wrapper, sourceIndex) => ({
          wrapper,
          sourceIndex,
          rect: wrapper.getBoundingClientRect(),
        }))
        .filter(({ wrapper }) => wrapper.querySelector('.card-wrapper'))
        .sort((left, right) => {
          const topDelta = left.rect.top - right.rect.top;
          if (Math.abs(topDelta) > 1) return topDelta;

          const leftDelta = left.rect.left - right.rect.left;
          if (Math.abs(leftDelta) > 1) return leftDelta;

          return left.sourceIndex - right.sourceIndex;
        });

      cards.forEach(({ wrapper }, visualIndex) => {
        wrapper.dataset.cardTone = visualIndex % 2 === 1 ? 'light' : 'dark';
      });
      collection.dataset.cardOrderReady = 'true';
    };

    const scheduleVisualCardTones = () => {
      if (animationFrameId !== null) return;

      if (typeof window.requestAnimationFrame !== 'function') {
        applyVisualCardTones();
        return;
      }

      animationFrameId = window.requestAnimationFrame(() => {
        animationFrameId = null;
        applyVisualCardTones();
      });
    };

    applyVisualCardTones();

    const resizeObserver =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(scheduleVisualCardTones)
        : null;
    resizeObserver?.observe(collection);
    window.addEventListener('resize', scheduleVisualCardTones);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener('resize', scheduleVisualCardTones);
      if (
        animationFrameId !== null &&
        typeof window.cancelAnimationFrame === 'function'
      ) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [visibleSearchedMemories]);

  const { activeMemoriesCount, completedMemoriesCount } = useMemo(() => {
    return (memories || []).reduce(
      (counts, memory) => {
        if (!memory) return counts;
        if (memory.isComplete) counts.completedMemoriesCount += 1;
        else counts.activeMemoriesCount += 1;
        return counts;
      },
      { activeMemoriesCount: 0, completedMemoriesCount: 0 },
    );
  }, [memories]);

  const handleSearch = (e) => {
    setKeyword(e.target.value);
  };

  const renderSearch = () => (
    <fieldset className="memories-search-wrapper query-fieldset">
      <legend>Find a memory</legend>
      <SearchComponent
        id="memory-search"
        ariaLabel="Search memory titles and notes"
        placeholder="Search titles and notes"
        value={keyword}
        onChange={handleSearch}
      />
    </fieldset>
  );

  const renderStatus = () => (
    <fieldset
      className="memories-results compact-fieldset"
      aria-live="polite"
    >
      <legend>Memory status</legend>
      <span>
        <strong>{activeMemoriesCount}</strong> active
      </span>
      {completedMemoriesCount > 0 ? (
        <Link
          to="/user-admin"
          className="memories-completed-link"
          aria-label={`${completedMemoriesCount} completed ${
            completedMemoriesCount === 1 ? 'memory' : 'memories'
          }. View completed memories.`}
        >
          <strong>{completedMemoriesCount}</strong> completed
        </Link>
      ) : (
        <span className="memories-completed-status">
          <strong>0</strong> completed
        </span>
      )}
    </fieldset>
  );

  const renderCreateAction = () => (
    <>
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
    </>
  );

  const renderContent = () => {
    if (isAuthenticated && userDetailsLoading && !userDetails) {
      return <SpinnerComponent />;
    }
    if (userDetailsError && !userDetails) {
      return (
        <div className="error-message">
          <p>Error loading your account: {userDetailsError}</p>
          <button
            type="button"
            onClick={() => dispatch(userInfoDetailsAction())}
          >
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
          <button type="button" onClick={() => dispatch(memoriesGetAction())}>
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
    if (!activeMemoriesCount) {
      return (
        <div className="empty-state-message">
          <h3>No active memories</h3>
          <p>
            All your memories are complete. You can review them from your
            dashboard or create a new memory.
          </p>
          <Link to="/user-admin" className="empty-state-link">
            View completed memories
          </Link>
        </div>
      );
    }
    if (!visibleSearchedMemories.length && keyword) {
      const completedMatches = searchedMemories.filter(
        (memory) => memory?.isComplete,
      ).length;

      return (
        <div className="no-search-results">
          <div className="empty-state-message">
            <h3>
              {completedMatches
                ? 'Matching memories are completed'
                : 'No active memories found'}
            </h3>
            <p>
              {completedMatches
                ? `Your search “${keyword}” matched completed memories. Review them from your dashboard or try another search.`
                : `No active memories match “${keyword}”. Try another search.`}
            </p>
            {completedMatches ? (
              <Link to="/user-admin" className="empty-state-link">
                View completed memories
              </Link>
            ) : null}
          </div>
        </div>
      );
    }

    return (
      <div
        ref={memoriesCollectionRef}
        className="memories-component-wrapper"
      >
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
      <section
        className="memories-workbench"
        aria-labelledby="memory-workspace-title"
      >
        <header className="memories-workbench__header">
          <div>
            <span>Personal knowledge</span>
            <h1 id="memory-workspace-title">Memory workspace</h1>
          </div>
          {renderCreateAction()}
        </header>
        <div className="memories-query-grid">
          <div className="memories-primary-tools">
            {renderSearch()}
            {renderStatus()}
          </div>
          <fieldset className="memories-fine-tune-fieldset query-fieldset">
            <legend>Fine-tune results</legend>
            <details className="memories-fine-tune-disclosure">
              <summary>
                <span>Sort by due date or ask AI</span>
                <small>Optional search tools</small>
              </summary>
              <div className="memories-fine-tune-content">
                <SortComponent memories={memories || []} />
                <AgentChatComponent />
              </div>
            </details>
          </fieldset>
        </div>
      </section>
      <section
        className="memories-library"
        aria-labelledby="active-memories-title"
      >
        <header className="memories-library__header">
          <h2 id="active-memories-title">Active memories</h2>
          {loading || error ? (
            <span>{loading ? 'Loading memories' : 'Memories unavailable'}</span>
          ) : null}
        </header>
        {renderContent()}
      </section>
    </>
  );
};

export default Memories;
