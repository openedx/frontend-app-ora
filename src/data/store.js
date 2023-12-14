import * as redux from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import { createLogger } from 'redux-logger';

import reducer, { actions, selectors } from './redux';

export const createStore = (withLogger = true) => {
  const loggerMiddleware = createLogger();

  const middleware = [loggerMiddleware];

  const store = withLogger
    ? redux.createStore(
      reducer,
      composeWithDevTools(redux.applyMiddleware(...middleware)),
    ) : redux.createStore(reducer);

  /**
   * Dev tools for redux work
   */
  if (process.env.NODE_ENV === 'development') {
    window.store = store;
    window.actions = actions;
    window.selectors = selectors;
  }

  return store;
};

const store = createStore();

export default store;
