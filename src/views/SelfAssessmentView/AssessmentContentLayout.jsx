import React from 'react';
import PropTypes from 'prop-types';

import { Col, Row } from '@edx/paragon';

import Rubric from 'components/Rubric';
import AssessmentContent from './AssessmentContent';

import './AssessmentContentLayout.scss';

const AssessmentContentLayout = ({
  submission,
  oraConfigData,
}) => (
  <div className="assessment-content-layout mr-auto ml-auto">
    <div className="content-wrapper">
      <Row className="flex-nowrap m-0">
        <Col className="p-0">
          <AssessmentContent
            submission={submission}
            oraConfigData={oraConfigData}
          />
        </Col>
        <Rubric isGrading />
      </Row>
    </div>
  </div>
);

AssessmentContentLayout.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  submission: PropTypes.any.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  oraConfigData: PropTypes.any.isRequired,
};

export default AssessmentContentLayout;
