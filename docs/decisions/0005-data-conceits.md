5. Data Conceits
------------------

Status
-------
Accepted

Context
-------
We would like to keep a historical record of data conceits for the app as it evolves over time.

Decision
--------
# Active Step
The Active Step is the current workflow step of the ORA, independent of the UI.
* Values from `stepNames` in `src/constants`
* access from hooks with:
  * `useActiveStepName()` from `src/hooks/app` if you only need the name
  * `useGlobalState().activeStepName` from `src/hooks/app` if you need other global state info as well

# Active View Step
The Active View Step is the step that is being currently viewed  in the UI (or `xblock` for the base XBlock view)
* values from `stepNames` in `src/constants`
* Access from hooks with `useViewStep()` from `src/hooks/routing`

# “Has submitted”
`hasSubmitted` (in redux app state) refers explicitly to whether the associate form/action for a given step has been submitted.
* For `submission` step, this means that the response has just been submitted.
* For assessment steps, this means that a given assessment has been submitted
  * This does not necessarily mean that the full assessment step is done, in the case of peer and self assessment steps.
* Access from hook with `useHasSubmitted()` from `src/hooks/app` or `src/hooks/assessment`
