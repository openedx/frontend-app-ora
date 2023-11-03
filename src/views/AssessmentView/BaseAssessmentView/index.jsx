import React from 'react';
import PropTypes from 'prop-types';

import {
  Col,
  Row,
} from '@edx/paragon';

import AssessmentContextProvider from 'context/AssessmentContext';
import Assessment from 'components/Assessment';
import ModalActions from 'components/ModalActions';

import './BaseAssessmentView.scss';

const BaseAssessmentView = ({
  children,
}) => (
  <AssessmentContextProvider>
    <div className="assessment-content-layout mr-auto ml-auto">
      <div className="content-wrapper">
        <Row className="flex-nowrap m-0">
          <Col className="p-0">
            {children}
            <ModalActions />
          </Col>
          <Assessment />
        </Row>
      </div>
    </div>
  </AssessmentContextProvider>
);
BaseAssessmentView.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BaseAssessmentView;
