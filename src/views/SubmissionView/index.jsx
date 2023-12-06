import React from 'react';

import { Col, Icon, Row } from '@edx/paragon';
import { CheckCircle } from '@edx/paragon/icons';
import { useIntl } from '@edx/frontend-platform/i18n';

import { stepNames } from 'constants';

import Rubric from 'components/Rubric';
import ModalActions from 'components/ModalActions';
import FileUpload from 'components/FileUpload';
import Instructions from 'components/Instructions';
import StatusAlert from 'components/StatusAlert';

import SubmissionPrompts from './SubmissionPrompts';
import useSubmissionViewData from './hooks';

import './index.scss';

import messages from './messages';

export const SubmissionView = () => {
  const {
    actionOptions,
    showRubric,
    response: {
      textResponses,
      uploadedFiles,
    },
    onUpdateTextResponse,
    isDraftSaved,
    onDeletedFile,
    onFileUploaded,
    isReadOnly,
  } = useSubmissionViewData();

  const { formatMessage } = useIntl();

  const draftIndicator = (!isReadOnly && isDraftSaved) && (
    <p className="d-flex text-primary">
      <Icon src={CheckCircle} />
      {formatMessage(messages.draftSaved)}
    </p>
  );

  return (
    <div className="assessment-content-layout mr-auto ml-auto">
      <div className="content-wrapper">
        <Row className="flex-nowrap m-0">
          <Col className="p-0">
            <div>
              <div className="d-flex justify-content-between">
                <h2 className="mb-4">{formatMessage(messages.yourResponse)}</h2>
                {draftIndicator}
              </div>

              <StatusAlert hasSubmitted={actionOptions.hasSubmitted} />
              <Instructions />
              <SubmissionPrompts {...{ textResponses, onUpdateTextResponse, isReadOnly }} />
              <FileUpload
                onDeletedFile={onDeletedFile}
                onFileUploaded={onFileUploaded}
                uploadedFiles={uploadedFiles}
                isReadOnly={isReadOnly}
              />
            </div>
            <ModalActions step={stepNames.submission} options={actionOptions} />
          </Col>
          {showRubric && <Rubric />}
        </Row>
      </div>
    </div>
  );
};

export default SubmissionView;
