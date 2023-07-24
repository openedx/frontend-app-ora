import { StrictDict } from 'utils';

export const ButtonStates = StrictDict({
  default: 'default',
  pending: 'pending',
  complete: 'complete',
  error: 'error',
});

export const rendererHooks = ({
  isGrading
}) => {

  const criteria = useRubricConfig().criteria.map((criteria, index) => ({
    isGrading,
    key: index,
    orderNum: index,
  }));
  const submitButtonState = ButtonStates.default;

  return {
    criteria,
    showFooter: isGrading,
    buttonProps: {
      onClick: () => ({}),
      state: submitButtonState,
      disabledStates: [ButtonStates.pending, ButtonStates.complete],
    },
  };
};
