import React from 'react';

import { Col, Icon, Row } from '@edx/paragon';
import { CheckCircle } from '@edx/paragon/icons';
import { useIntl } from '@edx/frontend-platform/i18n';

import { useStepState } from 'data/services/lms/hooks/selectors';
import { stepNames, stepStates } from 'data/services/lms/constants';

import Rubric from 'components/Rubric';
import ModalActions from 'components/ModalActions';
import FileUpload from 'components/FileUpload';
import Instructions from 'components/Instructions';
import StatusAlert from 'components/StatusAlert';

import SubmissionPrompts from './SubmissionPrompts';
import useSubmissionViewData from './useSubmissionViewData';

import './index.scss';

import messages from './messages';

export const SubmissionView = () => {
  const {
    actionOptions,
    showRubric,
    textResponses,
    onUpdateTextResponse,
    isDraftSaved,
    uploadedFiles,
    onDeletedFile,
    onFileUploaded,
  } = useSubmissionViewData();

  const stepState = useStepState({ step: stepNames.submission });
  const isReadOnly = stepState === stepStates.completed;
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

              <StatusAlert />
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
