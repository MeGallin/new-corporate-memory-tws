import React from 'react';

const AboutComponent = () => {
  return (
    <fieldset className="fieldSet">
      <legend>About Us</legend>
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

      <h1>The Tech</h1>
      <p>Construct using the MERN stack </p>
      <p>
        The MERN stack is a popular stack of technologies for building web
        applications. It consists of four open-source components: MongoDB, a
        NoSQL database; Express, a web application framework for Node.js; React,
        a JavaScript library for building user interfaces; and Node.js, a
        runtime environment for executing JavaScript code on the server side.
        Together, these technologies provide a strong foundation for building
        web applications with a robust and scalable back-end, a powerful and
        flexible front-end, and a common language for both.
      </p>
      <h1>Contact</h1>
      <p>Feel free to contact us via our contact form.</p>
    </fieldset>
  );
};

export default AboutComponent;
