import React from 'react';
import PropTypes from 'prop-types';

import AssessmentContextProvider from 'context/AssessmentContext';
import AssessmentContent from './AssessmentContent';

import './BaseAssessmentView.scss';

const BaseAssessmentView = ({
  children,
}) => (
  <AssessmentContextProvider>
    <AssessmentContent>{children}</AssessmentContent>
  </AssessmentContextProvider>
);
BaseAssessmentView.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BaseAssessmentView;
