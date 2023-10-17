import React from 'react';
import PropTypes from 'prop-types';

import { Col, Row } from '@edx/paragon';

import Rubric from 'components/Rubric';
import ProgressBar from 'components/ProgressBar';
import { useIsPageDataLoaded } from 'data/services/lms/hooks/selectors';

import SubmissionContent from './SubmissionContent';
import SubmissionActions from './SubmissionActions';
import useSubmissionViewData from './hooks';

import './index.scss';

export const SubmissionView = () => {
  const { actionsProps, formProps, showRubric } = useSubmissionViewData();
  return (
    <>
      <ProgressBar />
      <div className="assessment-content-layout mr-auto ml-auto">
        <div className="content-wrapper">
          <Row className="flex-nowrap m-0">
            <Col className="p-0">
              <SubmissionContent {...formProps} />
            </Col>
            {showRubric && <Rubric />}
          </Row>
        </div>
      </div>
      <SubmissionActions {...actionsProps} />
    </>
  );
};

export default SubmissionView;
