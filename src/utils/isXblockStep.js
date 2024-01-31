import { stepNames } from 'constants/index';

/**
 * isXblockStep(step)
 * @description returns true if the step is an xblock step
 * @param {string} step - step to check
 * @returns {boolean} true if the step is an xblock step
 */
export default (step) => [stepNames.xblock, stepNames.xblockStudio, stepNames.xblockPreview].includes(
  step,
);
