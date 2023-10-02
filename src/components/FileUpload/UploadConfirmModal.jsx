import React from 'react';
import PropTypes from 'prop-types';

import {
  Form, FormLabel, ModalDialog, Button, ActionRow,
} from '@edx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';
import messages from './messages';
import { useUploadConfirmModalHooks } from './hooks';

const UploadConfirmModal = ({
  open, file, closeHandler, uploadHandler,
}) => {
  const { formatMessage } = useIntl();

  const {
    shouldShowError,
    exitHandler,
    confirmUploadClickHandler,
    onFileDescriptionChange,
  } = useUploadConfirmModalHooks({
    file,
    closeHandler,
    uploadHandler,
  });

  return (
    <ModalDialog
      isOpen={open}
      title={formatMessage(messages.uploadFileModalTitle)}
      hasCloseButton={false}
      onClose={exitHandler}
      isBlocking
    >
      <ModalDialog.Header>
        <ModalDialog.Title>
          {formatMessage(messages.uploadFileModalTitle)}
        </ModalDialog.Title>
      </ModalDialog.Header>

      <ModalDialog.Body>
        <div>
          {file && (
            <Form.Group>
              <FormLabel>
                <strong>
                  {formatMessage(messages.uploadFileDescriptionFieldLabel)}
                </strong>
                <span className="file-name-ellipsis">{file.name}</span>
              </FormLabel>
              <Form.Control
                isInvalid={shouldShowError}
                name="file-description"
                onChange={onFileDescriptionChange}
              />
              {shouldShowError && (
                <Form.Control.Feedback type="invalid">
                  formatMessage(messages.fileDescriptionMissingError)
                </Form.Control.Feedback>
              )}
            </Form.Group>
          )}
        </div>
      </ModalDialog.Body>
      <ModalDialog.Footer>
        <ActionRow>
          <ModalDialog.CloseButton variant="tertiary" onClick={exitHandler}>
            {formatMessage(messages.cancelUploadFileButton)}
          </ModalDialog.CloseButton>
          <Button variant="primary" onClick={confirmUploadClickHandler}>
            {formatMessage(messages.confirmUploadFileButton)}
          </Button>
        </ActionRow>
      </ModalDialog.Footer>
    </ModalDialog>
  );
};

UploadConfirmModal.defaultProps = {
  open: false,
  closeHandler: () => {},
  uploadHandler: () => {},
};
UploadConfirmModal.propTypes = {
  open: PropTypes.bool,
  file: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  closeHandler: PropTypes.func,
  uploadHandler: PropTypes.func,
};

export default UploadConfirmModal;
