# Campus Device Tracker

SE411 Part 1 React frontend for managing campus computing devices. Assets are JavaScript objects held in memory; changes reset when the page is refreshed. No database or backend is used.

## Run

```bash
npm install
npm start
```

Open http://localhost:3000.

## Features

- Home, Add Asset, Edit, and About pages with navigation.
- Display, add, update, delete, and search devices by name or status.
- Device status: Available or In Use.
- Summary counts and input validation.
- About page: Firas Alwashmi, student ID 221211353.

## Architecture and technology stack

React 19, JavaScript, React Router 7, HTML/CSS, Create React App (react-scripts 5), and Jest.

- `src/index.js` mounts the application.
- `src/App.js` provides the pages, navigation, and React Context/state.
- `src/assetStore.js` contains the initial object collection, validation, and immutable add/update/delete functions.
- `src/assetStore.test.js` tests the collection operations.
- `public/` contains the HTML entry point and browser assets; `src/assets/logo.png` is the application logo.

Data flow: user action -> page -> Context action -> asset-store function -> updated React state -> display.

## AI assistance

AI assistance was used to review the submission against the assignment requirements, review the interface and navigation, revise the React frontend for in-memory data management, and prepare documentation, tests, and a code review. Original requirements-generation and visual-design prompts are not retained.

## Tests and recorded results

```bash
npm test -- --watch=false --runInBand
npm run build
```

The supplied execution records dated 20 October 2026 report 1 passing suite, 7 passing tests, and a successful production build. These are recorded results, not a new run after this documentation cleanup.

Tests cover the initial collection, adding assets and unique IDs, updating while retaining IDs, deletion, blank names and invalid statuses, missing-asset updates, and ID collisions after deletion. They exercise store functions; browser interactions have not been tested end to end.

## AI-assisted code review

- **Security:** Names are trimmed and validated, statuses are restricted, and React escapes displayed text. There is no authentication or authorization.
- **Performance:** Immutable array operations suit a small inventory. Search and status counts traverse the collection on each render.
- **Code quality:** Data operations are separated from the UI and unit-tested. Invalid edit IDs show an asset-not-found page. The large App.js and inline styles could be separated for maintainability.
- **Code reuse:** Store functions and StatCard are reused. Add and Edit duplicate form markup that could be shared.
- **Remaining limitation:** Validation feedback uses browser alerts; accessible inline messages would improve usability.
