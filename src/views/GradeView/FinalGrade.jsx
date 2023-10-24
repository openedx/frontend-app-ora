import React from 'react';

import { useIntl } from '@edx/frontend-platform/i18n';

import CollapsibleFeedback from 'components/CollapsibleFeedback';
import { useAssessmentsData } from 'data/services/lms/hooks/selectors';
import messages from './messages';

const FinalGrade = () => {
  const { formatMessage } = useIntl();
  const assessments = useAssessmentsData();

  const result = [];
  let finalStepScore = null;
  if (assessments.staff) {
    finalStepScore = assessments.staff.stepScore;
    result.push(
      <CollapsibleFeedback
        {...assessments.staff}
        stepName={formatMessage(messages.staffStep)}
      />
    );
  }
  if (assessments.peer) {
    finalStepScore = finalStepScore || assessments.peer.stepScore;
    result.push(
      <div className='my-2'>
        {assessments.peer.assessment?.map((peer, index) => (
          <CollapsibleFeedback
            assessment={peer}
            stepName={formatMessage(messages.peerStep)}
            key={index}
          />
        ))}
      </div>
    );
  }
  if (assessments.peerUnweighted) {
    result.push(
      <div className='my-2'>
        {assessments.peerUnweighted.assessment?.map((peer, index) => (
          <CollapsibleFeedback
            assessment={peer}
            stepName={formatMessage(messages.unweightedPeerStep)}
            key={index}
          />
        ))}
      </div>
    );
  }
  if (assessments.self) {
    finalStepScore = finalStepScore || assessments.self.stepScore;
    result.push(
      <CollapsibleFeedback
        {...assessments.self}
        stepName={formatMessage(messages.selfStep)}
      />
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
