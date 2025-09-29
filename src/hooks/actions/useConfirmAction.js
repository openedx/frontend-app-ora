import { useState, useCallback } from 'react';

import { stepNames } from 'constants/index';

export const assessmentSteps = [
  stepNames.studentTraining,
  stepNames.self,
  stepNames.peer,
];

const useConfirmAction = (validateBeforeOpen = () => true) => {
  const [isOpen, setIsOpen] = useState(false);
  const close = useCallback(() => setIsOpen(false), [setIsOpen]);
  const open = useCallback(() => {
    if (validateBeforeOpen()) {
      setIsOpen(true);
    }
  }, [setIsOpen, validateBeforeOpen]);
  return useCallback((config) => {
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
