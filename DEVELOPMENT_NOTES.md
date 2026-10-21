# Development notes — Campus Device Tracker

## Requirements

The SE411 Part 1 project description was used as a checklist. It calls for a React frontend, navigation, add/remove/update/search/display operations, an About page, and an in-memory collection of objects. The original submitted implementation was compared against these requirements, revealing a Spring Boot API dependency that did not match the Part 1 in-memory approach.

## Visual design

The final interface organizes the main tasks into Home, Add Asset, Edit, and About views. The Home screen includes summary counts and a searchable asset list. AI assistance was used in reviewing and refining the existing project; no original AI design prompt, wireframe, or design-generation log is included in this archive. This is a documentation limitation, not evidence that a separate mockup was produced.

## Frontend implementation

The React application was revised to keep its asset objects in React state rather than requesting them from the backend. CRUD and validation logic are separated into `src/assetStore.js`. The About page identifies Firas Alwashmi (221211353), and the project is named Campus Device Tracker.

## Tests

AI-assisted Jest tests in `src/assetStore.test.js` cover CRUD behavior, ID handling, validation, and immutable updates. Consult `TEST_RESULTS.md` and `test-run.log` for the recorded execution outcome; the logs relate to the tested version and are not proof of a new run after documentation edits.

## Code review

`AI_CODE_REVIEW.md` records observations about security, performance, code quality, and reuse, including remaining improvements. The review is an analysis of the source, not a formal security audit.

## Evidence boundaries

The included source, tests, logs, and review support the implementation and verification claims. The archive does not include the original AI chat transcript, requirements-generation prompts, or a standalone visual design artifact. Provide those separately if the instructor asks for primary evidence.
