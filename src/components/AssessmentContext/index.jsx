import { createContext, useMemo } from 'react';
import PropTypes from 'prop-types';

import { StrictDict, useKeyedState } from '@edx/react-unit-test-utils';

import { useEmptyRubric } from 'data/services/lms/hooks/selectors';

export const AssessmentContext = createContext({
  optionsSelected: {},
  criterionFeedback: {},
  overallFeedback: '',
});

export const stateKeys = StrictDict({
  optionsSelected: 'optionsSelected',
  criterionFeedback: 'criterionFeedback',
  overallFeedback: 'overallFeedback',
});

export const AssessmentContextProvider = ({
  children,
}) => {
  const emptyRubric = useEmptyRubric();
  const [optionsSelected, setSelectedOptions] = useKeyedState(
    stateKeys.optionsSelected,
    emptyRubric.optionsSelected,
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
      value: optionsSelected[name],
      onChange: (e) => {
        setSelectedOptions({ ...optionsSelected, [name]: e.target.value });
      },
      isInvalid: optionsSelected[name] === '',
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

  const criteriaData = Object.keys(optionsSelected).reduce(
    (obj, name) => ({ ...obj, [name]: genCriterionData(name) }),
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
    optionsSelected,
    criterionFeedback,
    overallFeedback,
  }), [optionsSelected, criterionFeedback, overallFeedback]);

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
