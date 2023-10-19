import React from 'react';
import PropTypes from 'prop-types';

import { Col, Row } from '@edx/paragon';

import Rubric from 'components/Rubric';
import ProgressBar from 'components/ProgressBar';
import { useIsPageDataLoaded } from 'data/services/lms/hooks/selectors';

import Content from './Content';
import Actions from './Actions';
import useSubmissionViewData from './hooks';

import './index.scss';

export const SubmissionView = () => {
  const { actionsProps, formProps, showRubric } = useSubmissionViewData();
  return (
    <>
      <div className="assessment-content-layout mr-auto ml-auto">
        <div className="content-wrapper">
          <Row className="flex-nowrap m-0">
            <Col className="p-0">
              <Content {...formProps} />
            </Col>
            {showRubric && <Rubric />}
          </Row>
        </div>
      </div>
      <Actions {...actionsProps} />
    </>
  );
};

export default SubmissionView;
