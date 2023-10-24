import React from 'react';
import PropTypes from 'prop-types';

import { Card, Collapsible } from '@edx/paragon';

import './FileCard.scss';

/**
 * <FileCard />
 */
const FileCard = ({ file, children, defaultOpen }) => (
  <Card className="file-card" key={file.fileName}>
    <Collapsible
      className="file-collapsible"
      defaultOpen={defaultOpen}
      title={<h3 className="file-card-title">{file.fileName}</h3>}
    >
      <div className="preview-panel">
        {children}
      </div>
    </Collapsible>
  </Card>
);
FileCard.propTypes = {
  file: PropTypes.shape({ fileName: PropTypes.string.isRequired }).isRequired,
  children: PropTypes.node.isRequired,
  defaultOpen: PropTypes.bool.isRequired,
};

export default FileCard;
