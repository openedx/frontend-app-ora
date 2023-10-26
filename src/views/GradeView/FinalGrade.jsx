import React, { Fragment } from 'react';

import { useIntl } from '@edx/frontend-platform/i18n';

import CollapsibleFeedback from 'components/CollapsibleFeedback';
import { useAssessmentsData } from 'data/services/lms/hooks/selectors';
import messages from './messages';
import AssessmentCriterion from 'components/CollapsibleFeedback/AssessmentCriterion';

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
      >
        <AssessmentCriterion {...assessments.staff.assessment} stepLabel={stepLabel} />
      </CollapsibleFeedback>
    );
  }
  if (assessments.peer) {
    finalStepScore = finalStepScore || assessments.peer.stepScore;
    const stepLabel = formatMessage(messages.peerStepLabel);
    result.push(
      <div className='my-2'>
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
      <div className='my-2'>
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
      >
        <AssessmentCriterion {...assessments.self.assessment} stepLabel={stepLabel} />
      </CollapsibleFeedback>
    );
  }

  const [finalGrade, ...rest] = result;

  return (
    <div>
      <h3>{formatMessage(messages.yourFinalGrade, finalStepScore)}</h3>
      {finalGrade}
      <div className='my-2' />
      <h3>{formatMessage(messages.unweightedGrades)}</h3>
      {rest}
    </div>
  );
};

FinalGrade.defaultProps = {};
FinalGrade.propTypes = {};

export default FinalGrade;
