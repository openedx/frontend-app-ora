import React from 'react';
import PropTypes from 'prop-types';
import { FullscreenModal } from '@edx/paragon';

/* The purpose of this component is to wrap views with a header/footer for situations
 * where we need to run non-embedded
 */

const ModalContainer = ({ Component, title }) => (
  <FullscreenModal
    isOpen
    onClose={null}
    hasCloseButton={false}
    title={title}
    modalBodyClassName="content-body"
  >
    <Component />
  </FullscreenModal>
);
ModalContainer.propTypes = {
  Component: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
};

export default ModalContainer;
