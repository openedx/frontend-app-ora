import React from 'react';

import { Col, Row } from '@edx/paragon';

import { useRubricConfig } from 'data/services/lms/hooks/selectors';
import Rubric from 'components/Rubric';
import AssessmentContent from './AssessmentContent';

import './AssessmentContentLayout.scss';

const AssessmentContentLayout = () => {
  console.log(useRubricConfig());
  const showRubric = useRubricConfig().showDuringResponse;
  return (
    <div className="assessment-content-layout mr-auto ml-auto">
      <div className="content-wrapper">
        <Row className="flex-nowrap m-0">
          <Col className="p-0">
            <AssessmentContent />
          </Col>
          {showRubric && (<Rubric isGrading={false} />)}
        </Row>
      </div>
    </div>
  );
};

export default AssessmentContentLayout;
