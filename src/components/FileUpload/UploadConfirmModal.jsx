import React from 'react';
import PropTypes from 'prop-types';

import { Form, FormLabel, ModalDialog, Button, ActionRow } from '@edx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';
import messages from './messages';
import { useUploadConfirmModalHooks } from './hooks';

const UploadConfirmModal = ({ open, files, closeHandler, uploadHandler }) => {
  const { formatMessage } = useIntl();

  const { errors, exitHandler, confirmUploadClickHandler } =
    useUploadConfirmModalHooks({
      files,
      closeHandler,
      uploadHandler,
    });

  return (
    <ModalDialog
      isOpen={open}
      title={formatMessage(messages.uploadFileModalTitle)}
      hasCloseButton={false}
      onClose={exitHandler}
    >
      <ModalDialog.Header>
        <ModalDialog.Title>
          {formatMessage(messages.uploadFileModalTitle)}
        </ModalDialog.Title>
      </ModalDialog.Header>

      <ModalDialog.Body>
        <div>
          {files.map((file, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <Form.Group key={i}>
              <FormLabel>
                <strong>
                  {formatMessage(messages.uploadFileDescriptionFieldLabel)}
                </strong>
                <span className='file-name-ellipsis'>{file.name}</span>
              </FormLabel>
              <Form.Control
                isInvalid={errors[i]}
                name={`file-${i}-description`}
                // eslint-disable-next-line no-param-reassign
                onChange={(e) => {
                  file.description = e.target.value;
                }}
              />
              {errors[i] && (
                <Form.Control.Feedback type='invalid'>
                  {errors[i] && formatMessage(messages.fileDescriptionMissingError)}
                </Form.Control.Feedback>
              )}
            </Form.Group>
          ))}
        </div>
      </ModalDialog.Body>
      <ModalDialog.Footer>
        <ActionRow>
          <ModalDialog.CloseButton variant='tertiary' onClick={exitHandler}>
            {formatMessage(messages.cancelUploadFileButton)}
          </ModalDialog.CloseButton>
          <Button variant='primary' onClick={confirmUploadClickHandler}>
            {formatMessage(messages.confirmUploadFileButton)}
          </Button>
        </ActionRow>
      </ModalDialog.Footer>
    </ModalDialog>
  );
};

UploadConfirmModal.defaultProps = {
  open: false,
  files: [],
  closeHandler: () => {},
  uploadHandler: () => {},
};
UploadConfirmModal.propTypes = {
  open: PropTypes.bool,
  files: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
    })
  ),
  closeHandler: PropTypes.func,
  uploadHandler: PropTypes.func,
};

export default UploadConfirmModal;
