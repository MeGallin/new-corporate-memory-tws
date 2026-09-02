import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { agentChatAction } from '../../Store/actions/agentActions';
import ButtonComponent from '../Button/ButtonComponent';
import SpinnerComponent from '../Spinner/SpinnerComponent';
import './AgentChatComponent.scss';

const citationMarkerPattern = /\[M-([^\]]+)\]/g;

const getCitationPresentation = (answerText, citations) => {
  if (!Array.isArray(citations) || !citations.length) {
    return { citations: [], hasInlineReferences: false };
  }

  const referencedIds = new Set(
    [...String(answerText || '').matchAll(citationMarkerPattern)].map(
      (match) => match[1],
    ),
  );
  const referencedCitations = citations.filter((citation) =>
    referencedIds.has(String(citation.id)),
  );

  return {
    citations: referencedCitations.length
      ? referencedCitations
      : citations.slice(0, 3),
    hasInlineReferences: referencedCitations.length > 0,
  };
};

const renderCitedText = (text, citations) => {
  const citationIndexes = new Map(
    citations.map((citation, index) => [String(citation.id), index + 1]),
  );

  return String(text || '')
    .split(citationMarkerPattern)
    .map((part, index) => {
      if (index % 2 === 0) return part;

      const citationNumber = citationIndexes.get(part);
      if (!citationNumber) return null;

      return (
        <a
          key={`${part}-${index}`}
          href={`#agent-chat-source-${citationNumber}`}
          className="agent-chat__citation-marker"
          aria-label={`Source ${citationNumber}`}
        >
          [{citationNumber}]
        </a>
      );
    });
};

const AgentChatComponent = ({ actions = null }) => {
  const dispatch = useDispatch();
  const [question, setQuestion] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [lastQuestion, setLastQuestion] = useState('');
  const [filters, setFilters] = useState({ tags: [], priority: [], dueOnly: false });
  const [priorityError, setPriorityError] = useState('');

  const { loading, error, data } = useSelector((state) => state.agentChat);
  const { userInfo } = useSelector((state) => state.userLogin);
  const { userInfo: googleUserInfo } = useSelector((state) => state.googleUserLogin);
  const isAuthenticated = !!(userInfo || googleUserInfo);
  const citationPresentation = getCitationPresentation(
    data?.answerText,
    data?.citations,
  );

  const onSubmit = (e) => {
    e.preventDefault();
    if (!isAuthenticated || !question.trim() || priorityError) return;
    const payload = { question: question.trim() };
    setLastQuestion(payload.question);
    try {
      // Persist the last asked question separately from the draft
      if (payload.question) localStorage.setItem('agentChat.lastQ', payload.question);
    } catch {}
    const cleanedFilters = {};
    if (filters.tags?.length) cleanedFilters.tags = filters.tags;
    if (filters.priority?.length) cleanedFilters.priority = filters.priority;
    if (filters.dueOnly) cleanedFilters.dueOnly = true;
    if (Object.keys(cleanedFilters).length) payload.filters = cleanedFilters;
    dispatch(agentChatAction(payload));
  };

  const handleTagsChange = (e) => {
    const val = e.target.value;
    const tags = val
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
    setFilters((f) => ({ ...f, tags }));
  };

  const handlePriorityChange = (e) => {
    const val = e.target.value;
    const parts = val
      .split(',')
      .map((p) => p.trim().toLowerCase())
      .filter(Boolean);
    const invalidPriorities = parts.filter(
      (priority) => !['low', 'med', 'high'].includes(priority.toLowerCase()),
    );
    setPriorityError(
      invalidPriorities.length ? 'Use only low, med, or high.' : '',
    );
    setFilters((f) => ({ ...f, priority: parts }));
  };

  // Load draft input and last asked question from localStorage on mount
  useEffect(() => {
    try {
      const draft = localStorage.getItem('agentChat.draft');
      if (draft && !question) setQuestion(draft);
      const lastQ = localStorage.getItem('agentChat.lastQ');
      if (lastQ) setLastQuestion(lastQ);
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist non-empty draft while typing; clear when empty
  useEffect(() => {
    try {
      const trimmed = question.trim();
      if (trimmed) localStorage.setItem('agentChat.draft', question);
      else localStorage.removeItem('agentChat.draft');
    } catch {}
  }, [question]);

  // Clear only the draft once a successful response arrives; keep lastQ
  useEffect(() => {
    if (!loading && data && !error) {
      setQuestion('');
      try {
        localStorage.removeItem('agentChat.draft');
      } catch {}
    }
  }, [loading, data, error]);

  // On logout, clear in-memory state for question and lastQuestion
  useEffect(() => {
    if (!isAuthenticated) {
      setQuestion('');
      setLastQuestion('');
    }
  }, [isAuthenticated]);

  return (
    <fieldset className="agent-chat query-fieldset">
      <legend>Ask AI</legend>
      <form onSubmit={onSubmit} className="agent-chat__form">
        <input
          id="agent-chat-question"
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask AI about your memories"
          className="agent-chat__input"
          aria-label="Ask AI about your memories"
          required
          maxLength={500}
        />
        {question.trim() && (
          <div className="agent-chat__actions">
            <ButtonComponent
              type="submit"
              text={loading ? 'Asking...' : 'Ask'}
              variant="success"
              disabled={!question.trim() || !isAuthenticated || loading || !!priorityError}
            />
            <ButtonComponent
              type="button"
              text={showAdvanced ? 'Hide Filters' : 'Filters'}
              variant="secondary"
              onClick={() => setShowAdvanced((s) => !s)}
              aria-expanded={showAdvanced}
              aria-controls="agent-chat-filters"
            />
            <ButtonComponent
              type="button"
              text="Clear Input"
              variant="warning"
              onClick={() => { setQuestion(''); try { localStorage.removeItem('agentChat.draft'); } catch {} }}
              disabled={!question}
            />
          </div>
        )}
      </form>

      {actions}

      {showAdvanced && (
        <div id="agent-chat-filters" className="agent-chat__filters">
          <div className="agent-chat__field">
            <label htmlFor="agent-chat-tags">Tags (comma-separated)</label>
            <input id="agent-chat-tags" type="text" onChange={handleTagsChange} placeholder="e.g., project-x, finance" />
          </div>
          <div className="agent-chat__field">
            <label htmlFor="agent-chat-priority">Priority (comma-separated: low, med, high)</label>
            <input
              id="agent-chat-priority"
              type="text"
              onChange={handlePriorityChange}
              placeholder="e.g., high"
              aria-invalid={priorityError ? 'true' : undefined}
              aria-describedby={priorityError ? 'agent-chat-priority-error' : undefined}
            />
            {priorityError && (
              <p id="agent-chat-priority-error" className="validation-error">
                {priorityError}
              </p>
            )}
          </div>
          <div className="agent-chat__field agent-chat__checkbox">
            <label>
              <input
                type="checkbox"
                checked={!!filters.dueOnly}
                onChange={(e) => setFilters((f) => ({ ...f, dueOnly: e.target.checked }))}
              />
              Due only
            </label>
          </div>
        </div>
      )}

      {!isAuthenticated && (
        <div className="agent-chat__notice">Log in to ask the agent.</div>
      )}

      {error && <div className="agent-chat__error">{error}</div>}

      {loading && (
        <div className="agent-chat__qa">
          {lastQuestion && (
            <>
              <span className="agent-chat__pill agent-chat__pill--last">Last question asked</span>
              <div className="agent-chat__question">
                <div className="agent-chat__question-row">
                  <div className="agent-chat__question-text">
                    <span className="agent-chat__question-label">Q.</span>
                    <span className="agent-chat__question-content">{lastQuestion}</span>
                  </div>
                </div>
              </div>
            </>
          )}
          <div className="agent-chat__answer-row">
            <div className="agent-chat__answer-label">A.</div>
            <div className="agent-chat__answer-body"><SpinnerComponent /></div>
          </div>
        </div>
      )}

      {!loading && data?.answerText && (
        <div className="agent-chat__qa">
          {lastQuestion && (
            <>
              <span className="agent-chat__pill agent-chat__pill--last">Last question asked</span>
              <div className="agent-chat__question">
                <div className="agent-chat__question-row">
                  <div className="agent-chat__question-text">
                    <span className="agent-chat__question-label">Q.</span>
                    <span className="agent-chat__question-content">{lastQuestion}</span>
                  </div>
                </div>
              </div>
            </>
          )}
          <div className="agent-chat__answer-row">
            <div className="agent-chat__answer-label">A.</div>
            <div className="agent-chat__answer-body">
          {(() => {
             const cleaned = data.answerText.trim();

            // Try to split an intro (before first colon) from the body
            let intro = '';
            let body = cleaned;
            const colonIdx = cleaned.indexOf(':');
            if (colonIdx !== -1 && colonIdx < 140) {
              intro = cleaned.slice(0, colonIdx + 1);
              body = cleaned.slice(colonIdx + 1).trim();
            }

            // Insert line breaks before numbered items like "1. ", then split
            const withBreaks = body.replace(/(\d+)\.\s+/g, '\n$1. ');
            const lines = withBreaks
              .split('\n')
              .map((s) => s.trim())
              .filter(Boolean);

            const items = lines
              .map((line) => line.match(/^(\d+)\.\s+(.*)$/))
              .filter(Boolean)
              .map((m) => m[2]);

            if (items.length >= 2) {
              return (
                <>
                  {intro && (
                    <div className="agent-chat__intro">
                      {renderCitedText(intro, citationPresentation.citations)}
                    </div>
                  )}
                  <ol className="agent-chat__list">
                    {items.map((content, idx) => {
                      const titleMatch = content.match(/\*\*(.+?)\*\*/);
                      const title = titleMatch ? titleMatch[1] : content.split(' - ')[0];
                      const remainder = titleMatch
                        ? content.replace(/\*\*(.+?)\*\*/, '').trim()
                        : content.slice(title.length).trim();
                      const meta = remainder
                        .split(' - ')
                        .map((s) => s.trim())
                        .filter(Boolean);
                      return (
                        <li key={idx} className="agent-chat__item">
                          <div className="agent-chat__item-title">
                            {renderCitedText(title, citationPresentation.citations)}
                          </div>
                          {meta.length > 0 && (
                            <ul className="agent-chat__item-meta">
                              {meta.map((m, i) => {
                                const kv = m.match(/^([^:]+):\s*(.+)$/);
                                if (kv) {
                                  const label = kv[1];
                                  const value = kv[2];
                                  const labelLc = label.toLowerCase();
                                  let valueClass = 'agent-chat__meta-value';
                                  if (/date|due|deadline/.test(labelLc)) {
                                    const parsed = new Date(value);
                                    if (!isNaN(parsed.getTime())) {
                                      const today = new Date();
                                      today.setHours(0,0,0,0);
                                      const diffDays = Math.floor((parsed - today) / (1000*60*60*24));
                                      if (diffDays < 0) valueClass += ' is-overdue';
                                      else if (diffDays <= 14) valueClass += ' is-upcoming';
                                      else valueClass += ' is-future';
                                    }
                                  }
                                  return (
                                    <li key={i}>
                                      <span className="agent-chat__label">{label}:</span>{' '}
                                      <span className={valueClass}>
                                        {renderCitedText(
                                          value,
                                          citationPresentation.citations,
                                        )}
                                      </span>
                                    </li>
                                  );
                                }
                                return (
                                  <li key={i}>
                                    {renderCitedText(
                                      m,
                                      citationPresentation.citations,
                                    )}
                                  </li>
                                );
                              })}
                            </ul>
                          )}
                        </li>
                      );
                    })}
                  </ol>
                </>
              );
            }

            // Fallback: show cleaned text with normalized whitespace
            const normalized = cleaned.replace(/\s{2,}/g, ' ');
            return (
              <div className="agent-chat__answer-text">
                {renderCitedText(
                  normalized,
                  citationPresentation.citations,
                )}
              </div>
            );
          })()}
            </div>
          </div>
          {citationPresentation.citations.length > 0 && (
            <fieldset className="agent-chat__sources compact-fieldset">
              <legend>
                {citationPresentation.hasInlineReferences
                  ? 'Referenced memories'
                  : 'Relevant memories'}
              </legend>
              <ol>
                {citationPresentation.citations.map((citation, index) => {
                  const score = Number(citation.score);
                  const rankingScore = Number.isFinite(score)
                    ? score.toFixed(2)
                    : null;

                  return (
                    <li
                      id={`agent-chat-source-${index + 1}`}
                      key={citation.id || `${citation.title}-${index}`}
                    >
                      <span>{citation.title || 'Untitled memory'}</span>
                      {rankingScore !== null && (
                        <small>Ranking score {rankingScore}</small>
                      )}
                    </li>
                  );
                })}
              </ol>
            </fieldset>
          )}
        </div>
      )}
    </fieldset>
  );
};

AgentChatComponent.propTypes = {
  actions: PropTypes.node,
};

export default AgentChatComponent;
