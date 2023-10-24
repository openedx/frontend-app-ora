import React from 'react';

import { useIntl } from '@edx/frontend-platform/i18n';

import {
  usePrompts,
  useResponseData,
} from 'data/services/lms/hooks/selectors';

import FileUpload from 'components/FileUpload';
import Prompt from 'components/Prompt';
import TextResponse from 'components/TextResponse';
import messages from './messages';

const Content = () => {
  const prompts = usePrompts();
  const response = useResponseData();
  const { formatMessage } = useIntl();
  return (
    <div>
      <strong>{formatMessage(messages.aboutYourGrade)}</strong>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
      <div>
        {
          prompts.map((prompt, index) => (
            <div key={index}>
              <Prompt prompt={prompt} defaultOpen={false} />
              <TextResponse response={response.textResponses[index]} />
            </div>
          ))
        }
        <FileUpload isReadOnly uploadedFiles={response.uploadedFiles} defaultCollapsePreview={true} />
      </div>
    </div>
  );
};

Content.defaultProps = {};
Content.propTypes = {};

export default Content;
