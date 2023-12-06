import React from 'react';
import { v4 as uuid } from 'uuid';

import { useIntl } from '@edx/frontend-platform/i18n';

import {
  usePrompts,
  useResponseData,
  useEffectiveGradeStep,
} from 'hooks/app';
import { stepNames } from 'constants';
import apiMessages from 'data/services/lms/messages';

import FileUpload from 'components/FileUpload';
import Prompt from 'components/Prompt';
import TextResponse from 'components/TextResponse';
import messages from './messages';

const Content = () => {
  const prompts = usePrompts();
  const response = useResponseData();
  const effectiveGradeStep = useEffectiveGradeStep();
  const { formatMessage } = useIntl();
  const stepLabel = formatMessage(apiMessages[effectiveGradeStep]);
  return (
    <div>
      <strong>{formatMessage(messages.aboutYourGrade)}</strong>
      <p>
        {formatMessage(messages.finalGradeInfo, { step: stepLabel })}
        {effectiveGradeStep === stepNames.peer && (
          <>
            <br />
            {formatMessage(messages.peerAsFinalGradeInfo)}
          </>
        )}
      </p>
      <div>
        {
          prompts.map((prompt, index) => (
            <div key={uuid()}>
              <Prompt prompt={prompt} defaultOpen={false} />
              {response.textResponses[index] && <TextResponse response={response.textResponses[index]} />}
            </div>
          ))
        }
        <FileUpload isReadOnly uploadedFiles={response.uploadedFiles} defaultCollapsePreview />
      </div>
    </div>
  );
};

Content.defaultProps = {};
Content.propTypes = {};

export default Content;
