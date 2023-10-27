import React from 'react';

import { useIntl } from '@edx/frontend-platform/i18n';

import { useAssessmentsData } from 'data/services/lms/hooks/selectors';
import messages from './messages';
import InfoPopover from 'components/InfoPopover';
import {
  SingleAssessmentStep,
  MultipleAssessmentStep,
} from 'components/CollapsibleFeedback';

const FinalGrade = () => {
  const { formatMessage } = useIntl();
  const { effectiveAssessmentType, ...steps } = useAssessmentsData();

  const finalStepScore = steps[effectiveAssessmentType]?.stepScore;

  let result = [];
  Object.keys(steps).forEach((step) => {
    const stepLabel = formatMessage(messages[`${step}StepLabel`]);
    const StepComponent = ['staff', 'self'].includes(step)
      ? SingleAssessmentStep
      : MultipleAssessmentStep;
    if (step === effectiveAssessmentType) {
      result = [
        <StepComponent
          {...steps[step]}
          stepLabel={stepLabel}
          step={step}
          key={step}
          defaultOpen
        />,
        ...result,
      ];
    } else {
      result.push(
        <StepComponent
          {...steps[step]}
          stepLabel={stepLabel}
          step={step}
          key={step}
        />
      );
    }
  });

  const [finalGrade, ...rest] = result;

  return (
    <div>
      <h3>
        {formatMessage(messages.yourFinalGrade, finalStepScore)}
        <InfoPopover onClick={() => {}}>
          <p>
            {effectiveAssessmentType === 'peer'
              ? formatMessage(messages.peerAsFinalGradeInfo)
              : formatMessage(messages.finalGradeInfo, {
                  step: effectiveAssessmentType,
                })}
          </p>
        </InfoPopover>
      </h3>
      {finalGrade}
      <div className='my-2' />
      <h3>
        {formatMessage(messages.unweightedGrades)}
        <InfoPopover onClick={() => {}}>
          <p>{formatMessage(messages.unweightedGradesInfo)}</p>
        </InfoPopover>
      </h3>
      {rest}
    </div>
  );
};

FinalGrade.defaultProps = {};
FinalGrade.propTypes = {};

export default FinalGrade;
