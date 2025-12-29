---
name: mobile_nav_labs_toggle_restore
overview: Restore the toggle behavior for Labs navigation on mobile, where clicking 'Labs' replaces the menu content. Add a 'Close' button in the Labs view to return to the main menu.
todos:
  - id: restore-toggle
    content: Restore mobile toggle logic (Main vs Labs views)
    status: pending
  - id: implement-main-view
    content: Implement Main Menu View (items + Labs trigger + Close overlay)
    status: pending
  - id: implement-labs-view
    content: Implement Labs Menu View (Header + Items + Back to Menu)
    status: pending
---

1.  **Restore Toggle Logic** in `src/layout/MainNav.tsx`:

    -   Revert the mobile navigation to use `{!isLabsExpanded ? (MainView) : (LabsView)}` conditional rendering instead of a single list.

2.  **Configure Main Menu View**:

    -   List standard items (Home, About, etc.).
    -   Add **Labs Button**: Clicking it sets `isLabsExpanded(true)`.
        -   Text: "Labs" (clean, no arrow).
    -   Add **Close Button**: Clicking it sets `setIsOpen(false)` (Closes overlay).

3.  **Configure Labs Menu View**:

    -   Header: "MS::LABS:" (styled as before).
    -   List Lab Projects (Zeroth, Crypto, THTH).
    -   Add **Back/Close Button**:
        -   Text: "Back" or "Close Labs" (to distinguish from closing the overlay, or just "Close" if context is clear). *Decision: Use "Back to Menu" or "Close" with back behavior as requested.*
        -   Action: `setIsLabsExpanded(false)` (Returns to Main Menu).

4.  **Verify Styles**:

    -   Ensure `w-screen h-screen` and `z-[60]` are preserved for the overlay.
    -   Ensure vertical centering and spacing look good in both views.