2. App-Specific Terms
---------------------

Status
------
Accepted

Context
--------
We would like to keep a record of app-specific terms that may otherwise be overloaded in technical contexts.

Decision
--------
In the context of this app, we will use the following terms in the associated ways:

**Assessment** refers to the interactive form for filling out an assessment.  These can be either editable or read-only.
* Assessment views will load the top-level `Assessment` component from `src/components/Assessment` and it will determine the appropriate
* The `Graded` view specifically renders a set of read-only assessments directly from `src/components/Assessment/ReadonlyAssessment`.

**Response** refers to a learner/team’s response to the ORA prompt (that which is graded in assessments).  
* In Assessment views, the loaded `response` is the one being graded.

**Rubric** refers to the definition data for assessments.  this includes all of the metadata for criteria and options.
* the `Rubric` component from `src/components/Rubric` is used for the Submission view, where we want to display the assessment metadata without providing interactive fields for filling out an actual assessment.
