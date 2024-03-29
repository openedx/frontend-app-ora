import React, { useCallback } from 'react';
import { v4 as uuid } from 'uuid';

import { useIntl } from '@edx/frontend-platform/i18n';

import {
  usePrompts,
  useResponseData,
  useEffectiveGradeStep,
} from 'hooks/app';
import { stepNames } from 'constants/index';
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

  const [open, setOpen] = React.useState(false);
  const onToggle = useCallback(() => setOpen(!open), [open]);

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
              <Prompt prompt={prompt} open={open} onToggle={onToggle} />
              <h3 className="pt-2">{formatMessage(messages.yourResponse)}</h3>
              {response.textResponses[index] && <TextResponse response={response.textResponses[index]} />}
            </div>
          ))
        }
        <FileUpload isReadOnly uploadedFiles={response.uploadedFiles} defaultCollapsePreview hideHeader />
      </div>
    </div>
  );
};

Content.defaultProps = {};
Content.propTypes = {};

export default Content;
