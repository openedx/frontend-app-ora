import React from 'react';

import { useIntl } from '@edx/frontend-platform/i18n';
import { Collapsible } from '@edx/paragon';
import { useORAConfigData } from 'hooks/app';

import StepInfo from './StepInfo';
import { useXBlockStudioViewContext } from '../XBlockStudioViewProvider';
import FormatDateTime from './FormatDateTime';

import messages from '../messages';

const StudioSchedule = () => {
  const { formatMessage } = useIntl();
  const { assessmentSteps, submissionConfig } = useORAConfigData();

  const { scheduleIsOpen, toggleSchedule } = useXBlockStudioViewContext();

  return (
    <Collapsible
      title={<h3 className="py-3">{formatMessage(messages.scheduleHeader)}</h3>}
      open={scheduleIsOpen}
      onToggle={toggleSchedule}
    >
      <div>
        <p>
          <strong>{formatMessage(messages.responseLabel)} {formatMessage(messages.startLabel)}</strong>
          <FormatDateTime date={submissionConfig.startDatetime} />
        </p>
        <p>
          <strong>{formatMessage(messages.responseLabel)} {formatMessage(messages.dueLabel)}</strong>
          <FormatDateTime date={submissionConfig.endDatetime} />
        </p>
        {Object.keys(assessmentSteps.settings).map((stepName) => (
          <StepInfo
            key={stepName}
            stepName={formatMessage(messages[stepName])}
            {...assessmentSteps.settings[stepName]}
          />
        ))}
      </div>
    </Collapsible>
  );
};

export default StudioSchedule;
