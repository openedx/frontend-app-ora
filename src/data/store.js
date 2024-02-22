import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';

import reducer, { actions, selectors } from './redux';

export const createStore = (withLogger = true) => {
  const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => {
      const middleware = getDefaultMiddleware();
      if (withLogger) {
        middleware.push(createLogger());
      }
      return middleware;
    },
  });

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
