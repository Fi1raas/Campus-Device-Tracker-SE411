# Campus Device Tracker

Campus Device Tracker is a small React application for keeping track of computers and other devices used around campus. Part 1 uses an in-memory collection of JavaScript asset objects, **not a database or backend**.

## Run

```bash
npm install
npm start
```

Open http://localhost:3000. Data resets after refreshing the page.

## Tests and build

```bash
CI=true npm test -- --watch=false --runInBand
npm run build
```

## Architecture

- `src/App.js`: React Router navigation, Home, Add, Edit and About views; React Context holds the collection in application state.
- `src/assetStore.js`: pure immutable CRUD functions and validation for the array of asset objects.
- `src/assetStore.test.js`: Jest tests for collection behavior.
- `src/assets/logo.png`: application logo.

Data flow: user action -> React page -> Context action -> assetStore function -> updated React state -> re-render. No network calls are required.

## Technology stack

React 19, JavaScript, React Router 7, HTML/CSS (inline React styles), Create React App / react-scripts 5, Jest (via react-scripts).

## Features

- View university IT assets and counts by status.
- Search devices by name or status.
- Add a device with a name and status.
- Edit an existing device.
- Delete a device.
- Navigate between Home, Add Asset and About.
- About lists Firas Alwashmi (221211353) as the sole project member.

## Development process and AI assistance

AI assistance was used while preparing this SE411 Part 1 submission. The work followed the assignment requirements and was refined through review of the existing project.

- **Requirements:** The SE411 brief was used to check the required navigation, add/view/edit/delete/search operations, About page, and in-memory data collection. The requirements checklist helped identify missing or inconsistent items.
- **Visual design:** AI assistance was used to review the existing interface and its navigation and page structure. The final application uses a simple dashboard with asset counts, a searchable list, Add/Edit forms, and an About page. The archive does not contain a separate AI-generated mockup or original design prompts.
- **Frontend code:** AI assistance was used to revise the React frontend, including moving asset operations to an in-memory JavaScript collection and updating the About page and project naming.
- **Tests:** AI assistance was used to write the Jest unit tests in `src/assetStore.test.js`. Recorded results are in `TEST_RESULTS.md` and `test-run.log`.
- **Code review:** AI assistance was used to review security, performance, code quality, and code reuse. Findings and remaining limitations are in `AI_CODE_REVIEW.md`.

See `DEVELOPMENT_NOTES.md` for concrete examples and evidence limitations. These notes describe the development process; they are not a substitute for original chat logs or design screenshots if those are requested by the instructor.

## Part 1 limitations

The in-memory collection resets on browser refresh. There is no authentication or database. A backend may be developed separately in Part 2.

## Verification

AI-generated Jest tests: 7 passed, 0 failed. Production build: compiled successfully. See `TEST_RESULTS.md` and `AI_CODE_REVIEW.md`.
