import React, { Fragment } from 'react';

import { useIntl } from '@edx/frontend-platform/i18n';

import CollapsibleFeedback from 'components/CollapsibleFeedback';
import { useAssessmentsData } from 'data/services/lms/hooks/selectors';
import messages from './messages';
import AssessmentCriterion from 'components/CollapsibleFeedback/AssessmentCriterion';
import InfoPopover from 'components/InfoPopover';

const FinalGrade = () => {
  const { formatMessage } = useIntl();
  const assessments = useAssessmentsData();

  const result = [];
  let finalStepScore = null;
  if (assessments.staff) {
    finalStepScore = assessments.staff.stepScore;
    const stepLabel = formatMessage(messages.staffStepLabel);
    result.push(
      <CollapsibleFeedback
        stepLabel={stepLabel}
        stepScore={assessments.staff.stepScore}
        key='staff'
      >
        <AssessmentCriterion
          {...assessments.staff.assessment}
          stepLabel={stepLabel}
        />
      </CollapsibleFeedback>
    );
  }
  if (assessments.peer) {
    finalStepScore = finalStepScore || assessments.peer.stepScore;
    const stepLabel = formatMessage(messages.peerStepLabel);
    result.push(
      <div className='my-2' key='peer'>
        <CollapsibleFeedback
          stepLabel={stepLabel}
          stepScore={assessments.peer.stepScore}
        >
          {assessments.peer.assessments?.map((peer, index) => (
            <Fragment key={index}>
              <p className='mb-0'>
                {stepLabel} {index + 1}:
              </p>
              <AssessmentCriterion {...peer} stepLabel={stepLabel} />
              <hr className='my-4' />
            </Fragment>
          ))}
        </CollapsibleFeedback>
      </div>
    );
  }
  if (assessments.peerUnweighted) {
    const stepLabel = formatMessage(messages.unweightedPeerStepLabel);
    result.push(
      <div className='my-2' key='peerUnweighted'>
        <CollapsibleFeedback
          stepLabel={stepLabel}
          stepScore={assessments.peerUnweighted.stepScore}
        >
          {assessments.peerUnweighted.assessments?.map((peer, index) => (
            <Fragment key={index}>
              <p className='mb-0'>
                {stepLabel} {index + 1}:
              </p>
              <AssessmentCriterion {...peer} stepLabel={stepLabel} />
              <hr className='my-4' />
            </Fragment>
          ))}
        </CollapsibleFeedback>
      </div>
    );
  }
  if (assessments.self) {
    finalStepScore = finalStepScore || assessments.self.stepScore;
    const stepLabel = formatMessage(messages.selfStepLabel);
    result.push(
      <CollapsibleFeedback
        stepLabel={stepLabel}
        stepScore={assessments.self.stepScore}
        key='self'
      >
        <AssessmentCriterion
          {...assessments.self.assessment}
          stepLabel={stepLabel}
        />
      </CollapsibleFeedback>
    );
  }

  const [finalGrade, ...rest] = result;

  return (
    <div>
      <h3>
        {formatMessage(messages.yourFinalGrade, finalStepScore)}
        <InfoPopover onClick={() => {}}>
          <p>{formatMessage(messages.finalGradeInfo)}</p>
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