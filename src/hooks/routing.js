import { useLocation } from 'react-router-dom';
// eslint-disable-next-line import/no-cycle
import { useActiveStepName } from 'data/services/lms/hooks/selectors';
import { routeSteps } from 'constants/index';
import { isXblockStep } from 'utils';

export const hooks = {
  /**
   * useActiveView
   * @description returns the active view
   * @returns {string} active view
   */
  useActiveView: () => useLocation().pathname.split('/')[1],
};
Object.assign(hooks, {
  /**
   * useViewStep()
   * @description returns the step of the active view
   * @returns {number} step of the active view
   */
  useViewStep: () => routeSteps[hooks.useActiveView()],
});
Object.assign(hooks, {
  /**
   * useEffectiveStep()
   * @description returns the effective step of the active view (active step if view is xblock)
   * @returns {string} effective step of the active view
   */
  useEffectiveStep: () => {
    const viewStep = hooks.useViewStep();
    const activeStep = useActiveStepName();
    return isXblockStep(viewStep) ? activeStep : viewStep;
  },
});
export const {
  useActiveView,
  useViewStep,
  useEffectiveStep,
} = hooks;
