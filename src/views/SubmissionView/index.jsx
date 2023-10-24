import React from 'react';

import { Col, Row } from '@edx/paragon';

import Rubric from 'components/Rubric';
import Actions from 'components/ModalActions';

import Content from './Content';
import useSubmissionViewData from './hooks';

import './index.scss';

export const SubmissionView = () => {
  const { actionsProps, formProps, showRubric } = useSubmissionViewData();
  return (
    <div className="assessment-content-layout mr-auto ml-auto">
      <div className="content-wrapper">
        <Row className="flex-nowrap m-0">
          <Col className="p-0">
            <Content {...formProps} />
            <Actions {...actionsProps} />
          </Col>
          {showRubric && <Rubric />}
        </Row>
      </div>
    </div>
  );
};

export default SubmissionView;
