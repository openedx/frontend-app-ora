import React from 'react';
import PropTypes from 'prop-types';
import { FullscreenModal } from '@edx/paragon';

import ProgressBar from 'components/ProgressBar';

/* The purpose of this component is to wrap views with a header/footer for situations
 * where we need to run non-embedded
 */

const ModalContainer = ({ title, children }) => (
  <FullscreenModal
    isOpen
    onClose={null}
    hasCloseButton={false}
    title={title}
    modalBodyClassName="content-body bg-light-300"
    beforeBodyNode={<ProgressBar className="px-2" />}
  >
    {children}
  </FullscreenModal>
);
ModalContainer.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export default ModalContainer;
