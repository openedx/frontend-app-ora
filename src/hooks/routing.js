import { useLocation } from 'react-router-dom';
import { useActiveStepName } from 'data/services/lms/hooks/selectors';
import { routeSteps, stepNames } from 'constants/index';

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
   * isXblockStep(step)
   * @description returns true if the step is an xblock step
   * @param {string} step - step to check
   * @returns {boolean} true if the step is an xblock step
   */
  isXblockStep: (step) => [stepNames.xblock, stepNames.xblockStudio, stepNames.xblockPreview].includes(step),
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
    return hooks.isXblockStep(isXblockStep) ? activeStep : viewStep;
  },
});
export const {
  useActiveView,
  useViewStep,
  useEffectiveStep,
  isXblockStep,
} = hooks;
