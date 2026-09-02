import { NavLink } from 'react-router-dom';
import './HomeComponent.scss';

const HomeComponent = () => {
  return (
    <section className="home-workbench" aria-labelledby="home-heading">
      <div className="home-workbench__header">
        <div>
          <p>Knowledge continuity</p>
          <h1 id="home-heading">Corporate memory</h1>
        </div>
        <span>Built to remember</span>
      </div>

      <div className="home-introduction">
        <fieldset className="query-fieldset home-introduction__content">
          <legend>Why it matters</legend>
          <h2>Keep useful knowledge available</h2>
          <p>
            Corporate memory is the collective knowledge, experience, and
            history of an organisation. It brings together the processes,
            records, and practical understanding that keep work moving.
          </p>
          <p>
            Maintaining that memory helps an organisation learn from past
            experience, make informed decisions, and retain information when
            people or systems change.
          </p>
          <div className="home-introduction__actions">
            <NavLink className="workspace-link workspace-link--primary" to="/forms">
              Get started
            </NavLink>
            <NavLink className="workspace-link" to="/about">
              Learn more
            </NavLink>
          </div>
        </fieldset>

        <fieldset className="query-fieldset home-introduction__summary">
          <legend>Memory model</legend>
          <dl>
            <div>
              <dt>Capture</dt>
              <dd>Save useful knowledge while it is current.</dd>
            </div>
            <div>
              <dt>Organise</dt>
              <dd>Add context, tags, priority, and reminders.</dd>
            </div>
            <div>
              <dt>Recall</dt>
              <dd>Search directly or ask AI about your memories.</dd>
            </div>
          </dl>
        </fieldset>
      </div>

      <div className="home-knowledge-grid" aria-label="Corporate memory sources">
        <fieldset className="query-fieldset">
          <legend>AI discovery</legend>
          <h2>Turn stored knowledge into useful answers</h2>
          <p>
            AI enhances discovery and recall across your corporate memory,
            helping turn saved information into actionable insight.
          </p>
        </fieldset>

        <fieldset className="query-fieldset">
          <legend>Knowledge</legend>
          <h2>Retain practical experience</h2>
          <p>
            Employee skills, expertise, and situational knowledge can disappear
            when people leave. Capturing that context makes it available to the
            people who need it next.
          </p>
        </fieldset>

        <fieldset className="query-fieldset">
          <legend>Information</legend>
          <h2>Make records easier to reuse</h2>
          <p>
            Documents, meeting notes, training material, and communication logs
            are valuable only when people can find and understand them.
          </p>
        </fieldset>

        <fieldset className="query-fieldset">
          <legend>Data and culture</legend>
          <h2>Preserve operational context</h2>
          <p>
            Data, established processes, values, and working habits provide
            continuity through employee turnover and system change.
          </p>
        </fieldset>
      </div>
    </section>
  );
};

export default HomeComponent;
