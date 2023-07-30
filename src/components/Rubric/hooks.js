import { StrictDict } from 'utils';
import { useRubricConfig } from 'data/services/lms/hooks/selectors';

export const ButtonStates = StrictDict({
  default: 'default',
  pending: 'pending',
  complete: 'complete',
  error: 'error',
});

export const useRubricData = ({
  isGrading,
}) => {
  const criteria = useRubricConfig().criteria.map(
    (_, index) => ({
      isGrading,
      key: index,
      orderNum: index,
    }),
  );
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
