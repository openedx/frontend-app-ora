import { stepNames } from 'constants/index';

// eslint-disable-next-line import/no-cycle
import * as actions from './actions';
import * as app from './app';
import * as assessment from './assessment';
import * as modalHooks from './modal';
import * as routingHooks from './routing';
import * as utils from './utils';

/**
 * useIsRevisit()
 * @description Returns true if the user is revisiting the step.
 * @returns {boolean}
 */
export const useIsRevisit = () => {
  const step = routingHooks.useViewStep();
  const { activeStepName } = app.useGlobalState({ step });
  return ![stepNames.xblock, activeStepName].includes(step);
};

export default {
  actions,
  app,
  assessment,
  modalHooks,
  routingHooks,
  useIsRevisit,
  utils,
};
