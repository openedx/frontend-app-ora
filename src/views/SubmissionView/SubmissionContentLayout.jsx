import React from 'react';
import PropTypes from 'prop-types';

import { Col, Row } from '@edx/paragon';

import Rubric from 'components/Rubric';
import SubmissionContent from './SubmissionContent';

import './SubmissionContentLayout.scss';

const SubmissionContentLayout = ({
  submission,
  oraConfigData,
  onTextResponseChange,
  onFileUploaded,
  onDeletedFile,
  draftSaved,
}) => (
  <div className="assessment-content-layout mr-auto ml-auto">
    <div className="content-wrapper">
      <Row className="flex-nowrap m-0">
        <Col className="p-0">
          <SubmissionContent
            submission={submission}
            oraConfigData={oraConfigData}
            onTextResponseChange={onTextResponseChange}
            onFileUploaded={onFileUploaded}
            onDeletedFile={onDeletedFile}
            draftSaved={draftSaved}
          />
        </Col>
        {oraConfigData.showDuringResponse && <Rubric isGrading={false} />}
      </Row>
    </div>
  </div>
);

SubmissionContentLayout.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  submission: PropTypes.any.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  oraConfigData: PropTypes.any.isRequired,
  onTextResponseChange: PropTypes.func.isRequired,
  onFileUploaded: PropTypes.func.isRequired,
  onDeletedFile: PropTypes.func.isRequired,
  draftSaved: PropTypes.bool.isRequired,
};

export default SubmissionContentLayout;
