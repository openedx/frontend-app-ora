import { StrictDict } from '@edx/react-unit-test-utils';

export const feedbackRequirement = StrictDict({
  disabled: 'disabled',
  required: 'required',
  optional: 'optional',
});

export const queryKeys = StrictDict({
  oraConfig: 'oraConfig',
  submissionData: 'submissionData',
});

export default { feedbackRequirement, queryKeys };
