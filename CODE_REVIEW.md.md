Code Smells:

1. In Book-search.component.ts, getAllBooks Selector is subscribed but not unsubscribed which can cause memory leak.

Instead of using unsubscribe in ngOndestory I have changed variable book to async and used it in template.[Fixed]

2. Missing reducer to failedAddToReadingList and failedRemoveFromReadingList so added it in reading-list.reducer.spec.ts [Fixed]






Improvements:

We can create reusable component for search result which will improve performance of application.





Accessibility issues reported by Lighthouse:

Buttons do not have an accessible name

Added `aria-label` to search icon button. [Fixed]


Background and foreground colors do not have a sufficient contrast ratio.
1.Reading list button in navbar.

Changed $pink-accent color from #ff4081 to #b90060 in variables.scss.[Fixed]


2. p (paragraph) tag

Added high contrast grey to paragraph tag. [Fixed]


Additional items to manually check:

The page has a logical tab order
Tabbing through the page follows the visual layout. Users cannot focus elements that are offscreen.

Interactive controls are keyboard focusable
Custom interactive controls are keyboard focusable and display a focus indicator.

Interactive elements indicate their purpose and state
Interactive elements, such as links and buttons, should indicate their state and be distinguishable from non-interactive elements.

The user's focus is directed to new content added to the page
If new content, such as a dialog, is added to the page, the user's focus is directed to it. 

User focus is not accidentally trapped in a region
A user can tab into and out of any control or region without accidentally trapping their focus. 

Custom controls have associated labels
Custom interactive controls have associated labels, provided by aria-label or aria-labelledby.

Custom controls have ARIA roles
Custom interactive controls have appropriate ARIA roles. 

Visual order on the page follows DOM order
DOM order matches the visual order, improving navigation for assistive technology. 

Offscreen content is hidden from assistive technology
Offscreen content is hidden with display: none or aria-hidden=true.

HTML5 landmark elements are used to improve navigation
Landmark elements (<main>, <nav>, etc.) are used to improve the keyboard navigation of the page for assistive technology.

