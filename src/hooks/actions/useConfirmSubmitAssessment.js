import React from 'react';
import { StrictDict, useKeyedState } from '@edx/react-unit-test-utils';

import { useViewStep } from 'hooks/routing';
import { useSubmitAssessmentAction } from 'hooks/actions';
import { stepNames } from 'constants/index';

export const stateKeys = StrictDict({
  isOpen: 'isOpen',
});

export const assessmentSteps = [
  stepNames.studentTraining,
  stepNames.self,
  stepNames.peer,
];

const useConfirmSubmitAssessment = () => {
  const viewStep = useViewStep();
  const submitAssessmentAction = useSubmitAssessmentAction();
  const [isOpen, setIsOpen] = useKeyedState(stateKeys.isOpen, false);
  const close = React.useCallback(() => setIsOpen(false), [setIsOpen]);

  return React.useMemo(() => (assessmentSteps.includes(viewStep)
    ? {
      isOpen,
      close,
      title: 'title',
      description: 'description',
      action: submitAssessmentAction,
    } : { isOpen: false }
  ), [
    close,
    isOpen,
    submitAssessmentAction,
    viewStep,
  ]);
};

export default useConfirmSubmitAssessment;
