1. Run Environment Decisions
-----------------------------

Status
------
Accepted

Context
--------
We would like a historical record of decisions about the run environment for the app as it evolves over time.

Decision
---------
This app is designed to be run within the context of the Learning MFE (@edx/frontend-app-learning) as an embedded view for Open Response Assessment (ORA) xblocks.  It consists of a base (`xblock`) view rendered in an iframe **within the Learning MFE’s unit display iframe**

This view (the **xblock** view) provides high-level configuration and progress information about the ORA, and allows the user to jump to the current active step (or certain previous steps that may be re-visit-able) in a “distraction-free” modal experience.

The modal is launched **by the Learning MFE**, triggered by a message sent from the **xblock** view (using JS `postMessage` interface to communicate across iframe boundaries).

The modal view allows the learner to work their way through the assessment process for a submission and review their grades when available.

Consequences
------------
Environments that run this MFE **outside of the learning MFE** will not be able to approprately render this navigation scheme without creating some kind of listener for the `plugin.modal` message sent over `postMessage` to open the "modal" views from the **xblock** view.
