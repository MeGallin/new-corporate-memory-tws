import React from 'react';
import './AboutComponent.scss';

const AboutComponent = () => {
  return (
    <div className="fieldSet">
      <h1>About Us</h1>
      <p>
        YCM is a productivity tool that is easy to use and allows you to save,
        retrieve, and edit information in a secure environment.
      </p>
      <p>
        To get started, create an account, confirm your email address, and log
        into your secure dashboard. From there, you can create new memories, add
        optional tags, and set reminders.
      </p>
      <p>There is no limit to the number of memories that you can create.</p>

      <h2>The Tech</h2>
      <p>
        Our application is built on the MERN stack, a powerful and widely
        adopted technology stack for modern web development. MERN brings
        together four open-source components:
      </p>
      <ul>
        <li>
          <strong>MongoDB</strong> – a flexible NoSQL database for storing and
          managing data.
        </li>
        <li>
          <strong>Express.js</strong> – a lightweight Node.js framework for
          building efficient APIs and server logic.
        </li>
        <li>
          <strong>React</strong> – a dynamic JavaScript library for creating
          interactive, responsive user interfaces.
        </li>
        <li>
          <strong>Node.js</strong> – a fast and scalable JavaScript runtime for
          executing server-side code.
        </li>
      </ul>
      <p>
        By combining these technologies, we deliver a seamless experience with a
        robust, scalable back end and a flexible, intuitive front end — all
        powered by a single language across the stack.
      </p>
      <div className="highlight-box">
        <p>
          To further strengthen our platform, we’ve introduced{' '}
          <strong>field-level encryption</strong> for sensitive data. This
          means that even though your information is stored securely in
          MongoDB, critical fields such as user memories are{' '}
          <strong>encrypted before they ever touch the database</strong>. The
          result is a system that not only scales and performs but also
          protects user data by design.
        </p>
      </div>
      <p>
        Together, the MERN stack and our enhanced encryption ensure that our
        application is fast, secure, and future-ready.
      </p>
      <h2>Contact</h2>
      <p>Feel free to contact us via our contact form.</p>
    </div>
  );
};

export default AboutComponent;
