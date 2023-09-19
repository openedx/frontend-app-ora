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

export const notImplemented = () => {
  throw 'Not implemented';
};

export default { feedbackRequirement, queryKeys, notImplemented };
