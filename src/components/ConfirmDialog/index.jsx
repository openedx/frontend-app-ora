import React from 'react';
import PropTypes from 'prop-types';

import { ActionRow, AlertModal } from '@edx/paragon';

import ActionButton from 'components/ActionButton';

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
        <ActionButton variant="tertiary" onClick={close}>
          Go back
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
