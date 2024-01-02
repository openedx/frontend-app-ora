7. App-State Components
------------------------

Status
------
Accepted

Context
--------
We would like to keep a historical record of decisions for top-level componentry patterns for the
app as it evolves over time

Decision
---------
Because of the complexity of trying to share functionality/behaviors across views in ways that did not require an excessive amount of configuration per-use, we opted for this app to write a set of top-level app-state-aware components (`ModalActions`, `StatusAlerts`, and `StepProgressIndicator`) in the `components/` directory.  These components interrogate the global state (mostly through use of the `useGlobalState` hook), and provide the appropriate experience based on the current state.

**`ModalActions`** component provides the `ActionRow` for the bottom of the Modal view.
**`StatusAlerts`** component provides the top-level `StatusAlert`s for the top of both the XBlock and Modal views
**`StepProgressIndicator`** component provides the component that lives in the header for Modal components, providing in-step progress as well as next-step actions when available.

This provides the benefit of being able to map/configure **all** of the variants/behaviors of these components in a single location, and provides a clean place to make modifications to that workflow based on global app state, rather than just based on which view is hosting them.

Consequences
-------------
Because of the consolidated nature of this behavior, there will not be nearly as many per-view variants of app-state components, grouped with the views.  Thus for people wishing to inspect the behavior of a view, they will need to know the states in which that view can be displayed, and then inspect the top-level componentry areas they want to examine in those states.
