import React from 'react';
import PropTypes from 'prop-types';

import { ActionRow, AlertModal } from '@openedx/paragon';
import { FormattedMessage } from '@edx/frontend-platform/i18n';

import ActionButton from 'components/ActionButton';

import messages from './messages';

const ConfirmDialog = ({
  title,
  description,
  action,
  isOpen,
  close,
}) => (
  <AlertModal
    title={title}
    isOpen={isOpen}
    footerNode={(
      <ActionRow>
        <ActionButton variant="light" onClick={close}>
          <FormattedMessage {...messages.goBack} />
        </ActionButton>
        <ActionButton {...action} />
      </ActionRow>
    )}
  >
    {description}
  </AlertModal>
);
ConfirmDialog.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  action: PropTypes.shape({
    onClick: PropTypes.func.isRequired,
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};

export default ConfirmDialog;
