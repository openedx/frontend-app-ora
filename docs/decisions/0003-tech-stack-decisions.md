3. Tech Stack Decisions
------------------------

Status
------
Accepted

Context
-------
We would like to keep a historical record of decisions about the tech stack for this app as it evolves over time.

Decision
--------
We will use the following technologies in this app:
**redux**
We use redux in this app to track top/app-level data.  This includes submitted assessments, submission status, validation status, and active form fields.  Our redux implementation has a single `app` reducer, with a small set of actions and selectors, which are loaded through hooks before access in components.  These hooks are then forwarded through app-level hooks under `src/hooks` in a hook file based on the the areas they touch.

**@reduxjs-toolkit**
We use a simple utility library wrapped around the basic redux functionality to provide cleaner action definition and memoized selector creation, following with edX frontend engineering practices.

**@tanstack/react-query**
We use Tanstack’s react-query library in this app to manage and track upstream api data.  This allows us to manage static upstream data in a distinct data environment from the app-level data, and provides built-in memoization and tracking of network event status.

**jest-when**
We use jest-when in this app to manage mock behavior in tests, especially in Typescript tests, where inspecting mock method usage is diffucult otherwise.

**@edx/react-unit-test-utils**
We use a small testing utils library to provide:
* mocks and mock utils for messaging and various hooks/libraries
* `StrictDict` utility for keystores that complain when called with invalid keys (reduces/simplifies bugs)
* Snapshot/validation library for components, similar to enzyme, but based on still-supported technology.

**@edx/frontend-platform/i18n**
We use the edX `frontend-platform`'s internationalization (i18n) library to manage message translation.  All user-facing strings in the app should be wrapped in `formatMessage` calls, provided by the `useIntl` method in the above library (forwarded from `react-intl`).

**@edx/frontend-platform/auth**
We use the edX `frontend-platform`'s authentication library to manage authenticated communication with edX backend services.

**@edx/frontend-platform/react**
We use the edX `frontend-platform`'s `React` library to provide app-level setup code, wrapping the app in top-level componentry that allows the app to respond to the state of its connection the the devstack.
