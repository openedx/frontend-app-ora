import { stepNames } from 'constants/index';

import * as actions from './actions';
import * as app from './app';
import * as assessment from './assessment';
import * as modalHooks from './modal';
import * as routingHooks from './routing';

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
};
