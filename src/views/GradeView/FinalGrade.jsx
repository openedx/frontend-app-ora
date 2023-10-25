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
    const stepName = formatMessage(messages.staffStep);
    result.push(
      <CollapsibleFeedback
        stepName={stepName}
        stepScore={assessments.staff.stepScore}
      >
        <AssessmentCriterion {...assessments.staff} stepName={stepName} />
      </CollapsibleFeedback>
    );
  }
  if (assessments.peer) {
    finalStepScore = finalStepScore || assessments.peer.stepScore;
    const stepName = formatMessage(messages.peerStep);
    result.push(
      <div className='my-2'>
        <CollapsibleFeedback
          stepName={stepName}
          stepScore={assessments.peer.stepScore}
        >
          {assessments.peer.assessment?.map((peer, index) => (
            <Fragment key={index}>
              <p className='mb-0'>
                {stepName} {index}:
              </p>
              <AssessmentCriterion {...peer} stepName={stepName} />
              <hr className='my-4' />
            </Fragment>
          ))}
        </CollapsibleFeedback>
      </div>
    );
  }
  if (assessments.peerUnweighted) {
    const stepName = formatMessage(messages.unweightedPeerStep);
    result.push(
      <div className='my-2'>
        <CollapsibleFeedback
          stepName={stepName}
          stepScore={assessments.peerUnweighted.stepScore}
        >
          {assessments.peerUnweighted.assessment?.map((peer, index) => (
            <Fragment key={index}>
              <p className='mb-0'>
                {stepName} {index}:
              </p>
              <AssessmentCriterion {...peer} stepName={stepName} />
              <hr className='my-4' />
            </Fragment>
          ))}
        </CollapsibleFeedback>
      </div>
    );
  }
  if (assessments.self) {
    finalStepScore = finalStepScore || assessments.self.stepScore;
    const stepName = formatMessage(messages.selfStep);
    result.push(
      <CollapsibleFeedback
        stepName={stepName}
        stepScore={assessments.self.stepScore}
      >
        <AssessmentCriterion {...assessments.self} stepName={stepName} />
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
