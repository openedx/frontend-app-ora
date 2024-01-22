import React from 'react';

import { useIntl } from '@edx/frontend-platform/i18n';
import { Collapsible } from '@edx/paragon';
import { useORAConfigData } from 'hooks/app';

import { useXBlockStudioViewContext } from './XBlockStudioViewProvider';

import messages from './messages';

const StudioViewSteps = () => {
  const { formatMessage } = useIntl();
  const { assessmentSteps } = useORAConfigData();

  const { assessmentStepsIsOpen, toggleAssessmentSteps } = useXBlockStudioViewContext();

  return (
    <Collapsible title={<h3 className="py-3">{formatMessage(messages.assessmentStepsHeader)}</h3>} open={assessmentStepsIsOpen} onToggle={toggleAssessmentSteps}>
      <div>
        {assessmentSteps.order.map((step, index) => (
          <p key={step}>
            <strong>{formatMessage(messages.stepLabel)} {index + 1}: </strong>
            <span>{formatMessage(messages[step])}</span>
          </p>
        ))}
      </div>
    </Collapsible>
  );
};

export default StudioViewSteps;
