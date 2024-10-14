import React from 'react';
import { StrictDict, useKeyedState } from '@edx/react-unit-test-utils';

import { stepNames } from 'constants/index';

export const stateKeys = StrictDict({
  isOpen: 'isOpen',
});

export const assessmentSteps = [
  stepNames.studentTraining,
  stepNames.self,
  stepNames.peer,
];

const useConfirmAction = (validateBeforeOpen = () => true) => {
  const [isOpen, setIsOpen] = useKeyedState(stateKeys.isOpen, false);
  const close = React.useCallback(() => setIsOpen(false), [setIsOpen]);
  const open = React.useCallback(() => {
    if (validateBeforeOpen()) {
      setIsOpen(true);
    }
  }, [setIsOpen, validateBeforeOpen]);
  return React.useCallback((config) => {
    const { description, title } = config;
    const action = config.action.action ? config.action.action : config.action;
    const confirmProps = {
      isOpen,
      close,
      title,
      description,
      action,
    };
    return {
      action: {
        onClick: open,
        children: action.labels ? action.labels.default : action.children,
      },
      confirmProps,
    };
  }, [
    close,
    isOpen,
    open,
  ]);
};

export default useConfirmAction;
