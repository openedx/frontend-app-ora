import React from 'react';
import PropTypes from 'prop-types';
import { FullscreenModal } from '@edx/paragon';
import { IntlProvider } from '@edx/frontend-platform/i18n';

import AppContainer from 'components/AppContainer';

/* The purpose of this component is to wrap views with a header/footer for situations
 * where we need to run non-embedded
 */

const ModalContainer = ({ title, children }) => {
  console.log({ children, title });
  return (
    <FullscreenModal
      isOpen
      onClose={null}
      hasCloseButton={false}
      title={title}
      modalBodyClassName="content-body bg-light-300"
    >
      {children}
    </FullscreenModal>
  );
};
ModalContainer.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export default ModalContainer;
