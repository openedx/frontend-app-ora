import React from 'react';
import { StrictDict, useKeyedState } from '@edx/react-unit-test-utils';

import { useViewStep } from 'hooks/routing';
import { stepNames } from 'constants/index';

export const stateKeys = StrictDict({
  isOpen: 'isOpen',
});

export const assessmentSteps = [
  stepNames.studentTraining,
  stepNames.self,
  stepNames.peer,
];
const useConfirmAction = () => {
  const viewStep = useViewStep();
  const [isOpen, setIsOpen] = useKeyedState(stateKeys.isOpen, false);
  const close = React.useCallback(() => setIsOpen(false), [setIsOpen]);
  const open = React.useCallback(() => setIsOpen(true), [setIsOpen]);
  return React.useCallback(({ action, description, title }) => {
    const confirmProps = assessmentSteps.includes(viewStep)
      ? {
        isOpen,
        close,
        title,
        description,
        action,
      } : { isOpen: false };
    return {
      action: {
        onClick: open,
        children: action.labels ? action.labels.default : action.children,
      },
      confirmProps,
    };
  }, [
    viewStep,
    open,
    isOpen,
    close,
  ]);
};

export default useConfirmAction;
