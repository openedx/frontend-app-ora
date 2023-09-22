import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from '@edx/frontend-platform/i18n';
import filesize from 'filesize';

import messages from './messages';

const FileMetaDisplay = ({ name, description, size }) => (
  <>
    <div className="file-meta-option">
      <strong><FormattedMessage {...messages.filePopoverNameTitle} /></strong>
      <br />
      {name}
    </div>
    <div className="file-meta-option">
      <strong><FormattedMessage {...messages.filePopoverDescriptionTitle} /></strong>
      <br />
      {description}
    </div>
    <div className="file-meta-option">
      <strong><FormattedMessage {...messages.fileSizeTitle} /></strong>
      <br />
      {typeof (size) === 'number' ? filesize(size) : 'Unknown'}
    </div>
  </>
);

FileMetaDisplay.defaultProps = {
  description: '',
  size: null,
};

FileMetaDisplay.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  size: PropTypes.number,
};

export default FileMetaDisplay;
