import React from 'react';
import PropTypes from 'prop-types';

import ActionButton from 'components/ActionButton';
import ConfirmDialog from 'components/ConfirmDialog';

import { useExitWithoutSavingAction, useSubmitAssessmentAction } from 'hooks/actions';

/**
 * <Rubric />
 */
const AssessmentActions = () => {
  const exitWithoutSavingAction = useExitWithoutSavingAction();
  const submitAssessmentAction = useSubmitAssessmentAction();

  return (
    <div className="assessment-footer">
      <ActionButton variant="outline-primary" {...exitWithoutSavingAction.action} />
      <ConfirmDialog {...exitWithoutSavingAction.confirmProps} />
      <ActionButton variant="primary" {...submitAssessmentAction.action} />
      {submitAssessmentAction.confirmProps && (
        <ConfirmDialog {...submitAssessmentAction.confirmProps} />
      )}
    </div>
  );
};

AssessmentActions.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  submitStatus: PropTypes.string.isRequired,
};

export default AssessmentActions;
