
## Local development

The client uses Vite and React 18.

1. Copy `.env.example` to `.env.development` and supply the local API endpoint and Google web client ID.
2. Install locked dependencies with `npm ci`.
3. Start the development server with `npm start` (port 3000).

Run `npm test` for the focused client tests, `npm run build` to create the production site in `build/`, and `npm run preview` to serve that build locally.

Vite loads `.env.development` for the development server and `.env.production` for production builds. Both files remain ignored because their values are deployment-specific.

## Recent Improvements

*   **State Management Refinement:**
    *   Centralized API endpoint definitions and URL building into `Store/utils/api.js`.
    *   Centralized authentication and configuration logic into `Store/utils/auth.js`.
    *   Enhanced `logoutAction` to ensure comprehensive Redux state reset across various modules upon user logout.
*   **Improved Due Date User Experience:**
    *   **Memory Creation (`CreateMemoryComponent`):** The due date field no longer defaults to the current date. Users are now prompted with a checkbox to optionally add a future due date, making the date selection intentional.
    *   **Memory Editing (`EditMemoryComponent`):** The due date input now gracefully handles existing dates. If a memory has a due date, the date picker is visible; otherwise, a toggle allows users to add one. Form validation for memory content length was also refined.
    *   **Memory Card Display (`CardComponent`):** The display of due date information is now dynamic. It shows an active "Set Due Date" checkbox when a date is set, and a clear message ("Edit memory to set a due date.") when no date is active, preventing inconsistent states.
*   **Input Field Consistency:**
    *   Fixed an issue where input text color would change to an unintended orange when focused. Input fields now maintain the `$main-font-colour` when active.
    *   The "Priority" input in memory creation now defaults to `1` and maintains consistent text color on focus.
*   **Success Notification Enhancement:**
    *   The `SuccessComponent` now appears as a fixed overlay in the top-right corner of the viewport, ensuring it doesn't disrupt the layout of other elements when it animates in.
*   **Image Placeholder Fallbacks:**
    *   Implemented default placeholder images (`/assets/images/sample.jpg`) for `UserProfileImageComponent` and `MemoriesImagesComponent` when no specific user profile or memory image is available, ensuring a consistent visual experience.
