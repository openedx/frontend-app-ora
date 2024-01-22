import React from 'react';

import { useIntl } from '@edx/frontend-platform/i18n';
import { useFileUploadConfig } from 'hooks/app';

import messages from '../messages';

import RequiredConfig from './RequiredConfig';

const FileUploadConfig = () => {
  const { formatMessage } = useIntl();
  const {
    enabled, fileUploadLimit, required,
  } = useFileUploadConfig() || {};

  if (!enabled) {
    return null;
  }

  return (
    <>
      <p>
        <strong>{formatMessage(messages.fileUploadLabel)}</strong>
        <RequiredConfig required={required} />
      </p>
      <p>
        <strong>{formatMessage(messages.fileUploadLimitLabel)}</strong>
        <span>{fileUploadLimit}</span>
      </p>
    </>
  );
};

export default FileUploadConfig;
