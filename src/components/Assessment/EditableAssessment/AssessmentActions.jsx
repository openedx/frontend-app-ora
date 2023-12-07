import React from 'react';
import PropTypes from 'prop-types';

import ActionButton from 'components/ActionButton';
import ConfirmDialog from 'components/ConfirmDialog';

import { useFinishLaterAction, useSubmitAssessmentAction } from 'hooks/actions';

/**
 * <Rubric />
 */
const AssessmentActions = () => {
  const finishLaterAction = useFinishLaterAction();
  const submitAssessmentAction = useSubmitAssessmentAction();
  console.log({ finishLaterAction, submitAssessmentAction });

  return (
    <div className="assessment-footer">
      <ActionButton variant="outline-primary" {...finishLaterAction.action} />
      <ConfirmDialog {...finishLaterAction.confirmProps} />
      <ActionButton variant="primary" {...submitAssessmentAction} />
    </div>
  );
};

AssessmentActions.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  submitStatus: PropTypes.string.isRequired,
};

export default AssessmentActions;
