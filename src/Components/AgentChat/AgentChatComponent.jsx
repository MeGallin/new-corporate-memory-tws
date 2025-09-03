import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { agentChatAction } from '../../Store/actions/agentActions';
import ButtonComponent from '../Button/ButtonComponent';
import SpinnerComponent from '../Spinner/SpinnerComponent';
import './AgentChatComponent.scss';

const AgentChatComponent = () => {
  const dispatch = useDispatch();
  const [question, setQuestion] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [lastQuestion, setLastQuestion] = useState('');
  const [filters, setFilters] = useState({ tags: [], priority: [], dueOnly: false });

  const { loading, error, data } = useSelector((state) => state.agentChat);
  const { userInfo } = useSelector((state) => state.userLogin);
  const { userInfo: googleUserInfo } = useSelector((state) => state.googleUserLogin);
  const isAuthenticated = !!(userInfo || googleUserInfo);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!isAuthenticated) return;
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
      .map((p) => p.trim())
      .filter(Boolean);
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
    <div className="agent-chat">
      <form onSubmit={onSubmit} className="agent-chat__form">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask your memories (e.g., high-priority due this week)"
          className="agent-chat__input"
        />
        {question.trim() && (
          <div className="agent-chat__actions">
            <ButtonComponent
              type="submit"
              text={loading ? 'Asking...' : 'Ask'}
              variant="success"
              disabled={!question.trim() || !isAuthenticated || loading}
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

      {showAdvanced && (
        <div id="agent-chat-filters" className="agent-chat__filters">
          <div className="agent-chat__field">
            <label>Tags (comma-separated)</label>
            <input type="text" onChange={handleTagsChange} placeholder="e.g., project-x, finance" />
          </div>
          <div className="agent-chat__field">
            <label>Priority (comma-separated: low, med, high)</label>
            <input type="text" onChange={handlePriorityChange} placeholder="e.g., high" />
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
             const cleaned = data.answerText
               .replace(/\[M-[^\]]+\]/g, '')
               .trim();

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
                  {intro && <div className="agent-chat__intro">{intro}</div>}
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
                          <div className="agent-chat__item-title">{title}</div>
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
                                      <span className={valueClass}>{value}</span>
                                    </li>
                                  );
                                }
                                return <li key={i}>{m}</li>;
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
            return <div className="agent-chat__answer-text">{normalized}</div>;
          })()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentChatComponent;

