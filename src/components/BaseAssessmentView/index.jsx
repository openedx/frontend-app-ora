import React from 'react';
import PropTypes from 'prop-types';

import {
  ActionRow,
  Col,
  Row,
} from '@edx/paragon';

import { AssessmentContextProvider } from 'components/AssessmentContext';
import ProgressBar from 'components/ProgressBar';
import Assessment from 'components/Assessment';

import { nullMethod } from 'hooks';

import './BaseAssessmentView.scss';

const BaseAssessmentView = ({
  children,
  submitAssessment,
  actions,
  getValues,
}) => (
  <AssessmentContextProvider>
    <div className="assessment-content-layout mr-auto ml-auto">
      <div className="content-wrapper">
        <Row className="flex-nowrap m-0">
          <Col className="p-0">
            {children}
          </Col>
          <Assessment {...{ submitAssessment, getValues }} />
        </Row>
      </div>
    </div>
    <ActionRow className="border mt-3">
      {actions}
    </ActionRow>
  </AssessmentContextProvider>
);
BaseAssessmentView.defaultProps = {
  getValues: nullMethod,
};
BaseAssessmentView.propTypes = {
  children: PropTypes.node.isRequired,
  actions: PropTypes.arrayOf(PropTypes.node).isRequired,
  submitAssessment: PropTypes.func.isRequired,
  getValues: PropTypes.func,
};

export default BaseAssessmentView;
