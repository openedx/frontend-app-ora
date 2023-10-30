import React from 'react';
import PropTypes from 'prop-types';

import { ActionRow, Col, Row } from '@edx/paragon';

import { AssessmentContextProvider } from 'components/AssessmentContext';

import FinalGrade from './FinalGrade';
import Content from './Content';

import './index.scss';

const GradeView = ({}) => (
  <AssessmentContextProvider>
    <div className='m-0 d-flex justify-content-center'>
      <Row className='grade-view-body'>
        <div className='p-0 col-lg-6 col-md-8 col-sm-12'>
          <FinalGrade />
        </div>
        <div className='p-0 col-lg-6 col-md-4 col-sm-12'>
          <Content />
        </div>
      </Row>
    </div>
  </AssessmentContextProvider>
);
GradeView.defaultProps = {};
GradeView.propTypes = {};

export default GradeView;
