import React from 'react';
import PropTypes from 'prop-types';

import {
  useSubmissionConfig,
  useSubmissionResponse,
  useSubmissionStatus,
  useSubmissionTeamInfo,
} from 'data/services/lms/hooks/selectors';

export const TextResponse = ({ promptIndex }) => {
  const config = useSubmissionConfig().textResponseConfig;
  const response = useSubmissionResponse();
  const submissionStatus = useSubmissionStatus();
  const teamInfo = useSubmissionTeamInfo();
  console.log({
    TextResponse: {
      config,
      response,
      submissionStatus,
      teamInfo,
    },
  });
  return (
    <div>
      <h3>Text Response</h3>
      {response.textResponses[promptIndex]}
    </div>
  );
};

TextResponse.propTypes = {
  promptIndex: PropTypes.number.isRequired,
};

export default TextResponse;
