# Your Corporate Memory - Client

## Overview

This is the frontend for the "Your Corporate Memory" application, built with React. It provides a user interface for interacting with the backend API to manage personal and corporate memories. The application uses Redux for state management and React Router for navigation.

## Features

*   **User Authentication:** User registration, login, and logout functionality.
*   **Google OAuth:** "Login with Google" option.
*   **Dashboard:** A personalized dashboard for logged-in users to view their profile information, stats, and completed memories.
*   **Memory Management:**
    *   Create, view, edit, and delete memories.
    *   Search and sort memories.
    *   Mark memories as complete.
    *   Set due dates and priorities for memories.
    *   Add and remove tags.
*   **Image Uploads:** Users can upload and manage their profile picture and images associated with their memories.
*   **Admin Panel:** An interface for administrators to manage users.
*   **Responsive Design:** The UI is styled with SCSS and is designed to be responsive.
*   **Notifications:** Users receive success and error notifications for various actions.

## State Management (Redux)

The application uses Redux to manage its global state. The Redux store is structured as follows:

*   **`Store/actions/`**: Contains action creators that dispatch actions to the reducers. These actions handle asynchronous API calls using `redux-thunk`.
*   **`Store/reducers/`**: Contains reducers that specify how the application's state changes in response to actions. Each feature (e.g., user auth, memories, admin) has its own reducer.
*   **`Store/constants/`**: Defines constants for all action types to avoid typos and maintain consistency.
*   **`Store/store.js`**: The main store configuration file where reducers are combined and middleware is applied.

## Components and Views

The application is structured into reusable `Components` and page-level `Views`.

*   **`src/Components/`**: Contains individual UI pieces like `ButtonComponent`, `CardComponent`, `InputComponent`, `ModalComponent`, etc.
*   **`src/Views/`**: Contains the main pages of the application, which are rendered by React Router. These include:
    *   `HomeView`: The landing page.
    *   `MemoriesView`: The main page for viewing and managing memories.
    *   `UserAdminView`: The user's dashboard and admin panel.
    *   `FormsView`: Handles login and registration.
    *   And others for About, Contact, etc.

## Environment Variables

The client application is configured using environment variables. Create the following files in the root of the `client` directory:

*   **`.env.development`**:
    ```
    REACT_APP_END_POINT=http://localhost:5000/
    REACT_APP_GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
    ```
*   **`.env.production`**:
    ```
    REACT_APP_END_POINT=YOUR_PRODUCTION_API_URL
    REACT_APP_GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
    ```

## Setup and Installation

1.  Navigate to the `client` directory.
2.  Install the dependencies:
    ```bash
    npm install
    ```
3.  Create the `.env.development` and `.env.production` files as described above.
4.  Run the development server:
    ```bash
    npm start
    ```
    This will open the application at `http://localhost:3000`.
5.  To create a production build:
    ```bash
    npm run build
    ```

## Project Structure

```
/client
├───public/         # Public assets and index.html
└───src/
    ├───Assets/     # Images and other static assets
    ├───Components/ # Reusable React components
    ├───Css/        # Global SCSS files
    ├───Store/      # Redux state management (actions, reducers, constants)
    ├───Utils/      # Utility functions (e.g., regex)
    ├───Views/      # Page-level components
    ├───App.js      # Main application component with routing
    └───index.js    # Application entry point
```