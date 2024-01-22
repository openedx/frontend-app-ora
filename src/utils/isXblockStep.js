import { stepNames } from 'constants/index';

export default (step) => [stepNames.xblock, stepNames.xblockStudio, stepNames.xblockPreview].includes(step);
