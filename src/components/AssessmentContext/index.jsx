import { createContext, useMemo } from 'react';
import PropTypes from 'prop-types';

import { StrictDict, useKeyedState } from '@edx/react-unit-test-utils';

import { useEmptyRubric } from 'data/services/lms/hooks/selectors';

export const AssessmentContext = createContext({
  selectedOptions: {},
  criterionFeedback: {},
  overallFeedback: '',
});

export const stateKeys = StrictDict({
  selectedOptions: 'selectedOptions',
  criterionFeedback: 'criterionFeedback',
  overallFeedback: 'overallFeedback',
});

export const AssessmentContextProvider = ({
  children,
}) => {
  const emptyRubric = useEmptyRubric();
  const [selectedOptions, setSelectedOptions] = useKeyedState(
    stateKeys.selectedOptions,
    emptyRubric.selectedOptions,
  );
  const [criterionFeedback, setCriterionFeedback] = useKeyedState(
    stateKeys.criterionFeedback,
    emptyRubric.criterionFeedback,
  );
  const [overallFeedback, setOverallFeedback] = useKeyedState(
    stateKeys.overallFeedback,
    '',
  );

  const genCriterionData = (name) => ({
    options: {
      value: selectedOptions[name],
      onChange: (e) => {
        setSelectedOptions({ ...selectedOptions, [name]: e.target.value });
      },
      isInvalid: selectedOptions[name] === '',
    },
    feedback: {
      value: criterionFeedback[name],
      onChange: (e) => {
        setCriterionFeedback({ ...criterionFeedback, [name]: e.target.value });
      },
      isInvalid: criterionFeedback[name] === '',
      isDisabled: false, // TODO: check config logic
    },
  });

  const criteriaData = Object.keys(selectedOptions).reduce(
    ({ obj, name }) => ({ ...obj, [name]: genCriterionData(name) }),
    {},
  );

  const overallFeedbackData = useMemo(() => ({
    value: overallFeedback,
    onChange: (e) => {
      setOverallFeedback(e.target.value);
    },
    isInvalid: false,
    isDisabled: false, // TODO: check config logic
  }), [overallFeedback, setOverallFeedback]);

  const currentValue = useMemo(() => ({
    selectedOptions,
    criterionFeedback,
    overallFeedback,
  }), [selectedOptions, criterionFeedback, overallFeedback]);

  const value = useMemo(
    () => ({
      formFields: { criteria: criteriaData, overallFeedback: overallFeedbackData },
      currentValue,
    }),
    [
      criteriaData,
      overallFeedbackData,
      currentValue,
    ],
  );
  return (
    <AssessmentContext.Provider value={value}>
      {children}
    </AssessmentContext.Provider>
  );
};
AssessmentContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
