import { NavLink } from 'react-router-dom';
import './AboutComponent.scss';

const AboutComponent = () => {
  return (
    <section className="about-workbench" aria-labelledby="about-heading">
      <div className="about-workbench__header">
        <div>
          <p>Product and platform</p>
          <h1 id="about-heading">About YCM</h1>
        </div>
        <span>Your Corporate Memory</span>
      </div>

      <div className="about-overview-grid">
        <fieldset className="query-fieldset">
          <legend>What YCM does</legend>
          <h2>Keep important information within reach</h2>
          <p>
            YCM is a productivity tool that allows you to save, retrieve, and
            edit information in a secure environment.
          </p>
          <p>
            There is no limit to the number of memories that you can create,
            helping your useful information grow with you.
          </p>
        </fieldset>

        <fieldset className="query-fieldset">
          <legend>Getting started</legend>
          <h2>From account to first memory</h2>
          <ol className="about-steps">
            <li>Create your account.</li>
            <li>Confirm your email address.</li>
            <li>Log in to your secure dashboard.</li>
            <li>Add memories, tags, priorities, and reminders.</li>
          </ol>
        </fieldset>
      </div>

      <fieldset className="query-fieldset about-ai-panel">
        <legend>AI features</legend>
        <div className="about-panel-heading">
          <h2>Ask questions about your own memories</h2>
          <p>
            The authenticated assistant helps you discover information already
            stored in your account.
          </p>
        </div>
        <dl className="about-feature-grid">
          <div>
            <dt>Agent chat</dt>
            <dd>Ask natural questions from the Memories page.</dd>
          </div>
          <div>
            <dt>Secure by default</dt>
            <dd>Your signed-in session limits answers to your own data.</dd>
          </div>
          <div>
            <dt>Private UI state</dt>
            <dd>Draft and last-question details remain local to your browser.</dd>
          </div>
          <div>
            <dt>Clear presentation</dt>
            <dd>Structured answers highlight useful lists and date information.</dd>
          </div>
        </dl>
      </fieldset>

      <div className="about-platform-grid">
        <fieldset className="query-fieldset">
          <legend>Technology foundation</legend>
          <div className="about-panel-heading">
            <h2>The MERN stack</h2>
            <p>One JavaScript-based platform across the client and API.</p>
          </div>
          <dl className="about-technology-list">
            <div>
              <dt>MongoDB</dt>
              <dd>Flexible data storage and management.</dd>
            </div>
            <div>
              <dt>Express.js</dt>
              <dd>Efficient API and server logic.</dd>
            </div>
            <div>
              <dt>React</dt>
              <dd>Responsive, interactive user interfaces.</dd>
            </div>
            <div>
              <dt>Node.js</dt>
              <dd>JavaScript execution across the back end.</dd>
            </div>
          </dl>
        </fieldset>

        <fieldset className="query-fieldset about-security-panel">
          <legend>Data protection</legend>
          <h2>Protection by design</h2>
          <p>
            Sensitive memory fields are encrypted before they reach the
            database, strengthening protection for stored information.
          </p>
          <p>
            Authentication and account boundaries keep retrieval focused on the
            signed-in user's memories.
          </p>
        </fieldset>
      </div>

      <fieldset className="query-fieldset about-contact-panel">
        <legend>Contact</legend>
        <div>
          <h2>Need help or want to ask a question?</h2>
          <p>Use the contact workspace to send us an enquiry.</p>
        </div>
        <NavLink className="about-contact-link" to="/contact">
          Contact us
        </NavLink>
      </fieldset>
    </section>
  );
};

export default AboutComponent;
