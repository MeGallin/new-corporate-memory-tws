
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
