6. LMS Service decisions
------------------------

Status
------
Accepted

Context
-------
We would like to keep a historical record of our LMS service code decisions for the app as it
evolves over time.

Decision
---------
The data for this app is coming from the edX Learning Management System (LMS).  We have defined a fine-tuned Backend for the app that provides a small set of API endpoints to load the configuration information for an ORA, load the learner data/progress, and all of the actions a learner would need to take upon their response or assessments.

File structure:
* `api.js` for isolated api definitions
* `urls.js` for url generators, based on existing url
* `hooks/data.js` for loading data models (`oraConfig` and `pageData`)
  * `pageData` is queried optionally with a page argument for modal views not in the `hasSubmitted` state
* `hooks/selectors` is a collection of selector hooks that access the data from the data queries.  Some notable top-level examples are:
  * `useIsPageDataLoaded` and `useIsOraConfigLoaded` from `src/hooks/app` allow the app to determine if these values are loaded before attempting to render components that require them.
  * `useStepState({ step })` draws on the ora config and progress state to return a string state value (from `stepStates`)
  * `useGlobalState({ step })` draws together a number of other selectors to provide one top-level state (with optional view-step passed).
    * `activeStepName` - current workflow step name (from `stepNames`)
    * `activeStepState` - state of current workflow step. (from `stepStates`)
    * `cancellationInfo`
    * `effectiveGrade` - the assessment(s) of the type specified as the `effective_assessment_type` in the api.
      * `null` if has not received final grade
      * includes one or more assessment objects for the learner’s response.
      * includes a `stepScore` object (points earned / total)
    * `hasReceivedFinalGrade` - boolean value for if the learner has received a final grade
    * `lastStep` - returns the stepName for the final step in the step order (or submission if no assessment types are provided)
    * `stepState` - returns the `stepState` of the **passed** step, which may or may not be equal to the activeStepName
* `hooks/actions` is a collection of action hooks that send commands to the upstream api endpoints, including submitting responses or assessments, saving drafts, and refreshing page data.
