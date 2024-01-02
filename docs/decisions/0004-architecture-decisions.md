4. Architecture Decisions
-------------------------

Status
------
Accepted

Context
-------
We would like to keep a historical record on the architectural decisions we make with this app as
it evolves over time.

Decision
--------
# `constants/` directory
* `src/constants`
  * `stepNames` is a keystore of names for discrete steps within the ORA lifecycle
  * `stepRoutes` and `routeSteps` are objects that map `stepName`s to `route` strings and back
    * these route strings are the base of the uri for the different views
  * `stepStates` is a keystore of available states for a step to be in.
    * This includes 2 ui-only states: `submitted` and `trainingValidation` which are used locally on consumption to override the value passed from upstream API based on local state.
  * `MutationStatus` is a keystore of available values for tanstack mutation statuses
  * `feedbackRequirement` is a keystore of available values for feedback requirement fields.
  * `closedReasons` is keystore of available values for `closed_reason` data for an ORA step
  * `queryKeys` is a keyStore that provides root query Keys for tanstack fetch queries.
* src/constants/mockData

# `views/` and `components/` directories
* The `views` folder specifically holds top-level views for the app.  The goal of this folder is to provide a location where engineers can look for the top-level access-points of the app (minus the actual arch/data setup from the `App.jsx` component.
  * Components that are ONLY used within the confines of a single view may be defined as children of that view’s code directory
* The components directory holds all re-useable components that are accessed/used across views.
  * These components may have children
    * (`Assessment/ReadonlyAssessment/AssessmentCriterion.jsx`, etc)
  * They may also be interdependent
    * `Rubric` and `Assessment` both use/leverage the `CriterionContainer` component for different uses.

# `data/` directory
This directory houses the various data models for the app.

`data/redux` houses the redux app reducer and selectors, used to track assessment, form, and submissions tate.

`data/services/lms` houses the LMS service code, which has its own section in this doc.

# `hooks/` directory
Provides a top-level set of hooks for non-component-specific behaviors and data access.

## `assessment` hooks
This is a set of hooks specifically targeted towards data and behavior necessary for the running and displaying of assessment steps in the UI.

It provides hooks that communicate between the redux data storing assessment form data and just-submitted assessments and the lms service shooks to manage tasks like:
* Providing arguments for form field components
* Providing `isInvalid` check for the assessment
* Submitting assessments

## `actions` hooks
Provides the props for paragon `Button` components for “simple” (instant) actions and props for `StatefulButton` components for asynchronous tasks.

Provides local message configuration and internationalization.

These hooks are used in various components and are written to try and provide their relevant functionality dependent on the current app state.

Actions (buttons) include: Finish Later, Exit, Start next step, Load next response in current step.

## `app` hooks
This module forwards app-level selectors and action hooks from lms service and redux for app-level data.

This is the core place for components that can be run from anywhere in the app to be able to draw app state.

## `modal` hooks
This module provides a pair of hooks to open the modal (from xblock view) to a given view, or to close said modal (from within the modal view).

## `routing` hooks
This module provides hooks to fetch the active view and associated step
