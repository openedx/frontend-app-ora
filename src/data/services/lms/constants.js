import { StrictDict } from '@edx/react-unit-test-utils';

export const feedbackRequirement = StrictDict({
  disabled: 'disabled',
  required: 'required',
  optional: 'optional',
});

export const queryKeys = StrictDict({
  oraConfig: 'oraConfig',
  pageData: 'pageData',
});

export const MutationStatus = StrictDict({
  idle: 'idle',
  loading: 'loading',
  error: 'error',
  success: 'success',
});

export default { feedbackRequirement, queryKeys, MutationStatus };
