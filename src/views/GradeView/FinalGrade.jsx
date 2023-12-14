import React from 'react';

import { useIntl } from '@edx/frontend-platform/i18n';

import {
  useAssessmentData,
  useStepInfo,
} from 'hooks/app';
import InfoPopover from 'components/InfoPopover';
import ReadOnlyAssessment from 'components/Assessment/ReadonlyAssessment';
import messages, { labelMessages } from './messages';

const FinalGrade = () => {
  const { formatMessage } = useIntl();
  const { effectiveAssessmentType, ...assessments } = useAssessmentData();
  const stepInfo = useStepInfo();

  const loadStepData = (step) => ({
    ...assessments[step],
    key: step,
    step,
    stepLabel: formatMessage(labelMessages[step]),
  });

  const effectiveAssessment = loadStepData(effectiveAssessmentType);
  const finalStepScore = effectiveAssessment?.stepScore;

  const extraGrades = Object.keys(assessments)
    .filter((type) => !!stepInfo[type] && type !== effectiveAssessmentType)
    .map(loadStepData);

  const renderAssessment = (stepData, defaultOpen = false) => (
    <ReadOnlyAssessment {...stepData} defaultOpen={defaultOpen} />
  );

  return (
    <div>
      <h1>
        {formatMessage(messages.yourFinalGrade, finalStepScore)}
        <InfoPopover>
          <p>
            {effectiveAssessmentType === 'peer'
              ? formatMessage(messages.peerAsFinalGradeInfo)
              : formatMessage(messages.finalGradeInfo, { step: effectiveAssessmentType })}
          </p>
        </InfoPopover>
      </h1>
      <div className='py-2'>
        {renderAssessment(effectiveAssessment, true)}
      </div>
      <div className="my-2" />
      {extraGrades.length > 0 && (
        <h3>
          {formatMessage(messages.unweightedGrades)}
          <InfoPopover>
            <p>{formatMessage(messages.unweightedGradesInfo)}</p>
          </InfoPopover>
        </h3>
      )}
      {extraGrades.map((assessment) => renderAssessment(assessment, false))}
    </div>
  );
};

FinalGrade.defaultProps = {};
FinalGrade.propTypes = {};

export default FinalGrade;
