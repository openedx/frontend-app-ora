import { combineReducers } from 'redux';
import { reducer as specialExams } from '@edx/frontend-lib-special-exams';

import { StrictDict } from 'utils';

import * as app from './app';

const modules = {
  app,
};

const moduleProps = (propName) => Object.keys(modules).reduce(
  (obj, moduleKey) => {
    const value = modules[moduleKey][propName];
    return value ? { ...obj, [moduleKey]: value } : obj;
  },
  {},
);

const rootReducer = combineReducers({ ...moduleProps('reducer'), specialExams });

const actions = StrictDict(moduleProps('actions'));

const selectors = StrictDict(moduleProps('selectors'));

export { actions, selectors };

export default rootReducer;
