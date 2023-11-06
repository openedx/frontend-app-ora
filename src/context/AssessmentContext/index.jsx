import React from 'react';
import PropTypes from 'prop-types';

import useAssessmentContextData, { AssessmentContext } from './useAssessmentContextData';
export { AssessmentContext } from './useAssessmentContextData';

const AssessmentContextProvider = ({
  children,
}) => {
  const value = useAssessmentContextData();
  return (
    <AssessmentContext.Provider value={value}>
      {children}
    </AssessmentContext.Provider>
  );
};
AssessmentContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AssessmentContextProvider;
