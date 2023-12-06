import React from 'react';
import PropTypes from 'prop-types';
import { FullscreenModal } from '@edx/paragon';

import { nullMethod } from 'utils';
import { useORAConfigData } from 'hooks/app';

import ProgressBar from 'components/ProgressBar';

/* The purpose of this component is to wrap views with a header/footer for situations
 * where we need to run non-embedded
 */

const ModalContainer = ({ children }) => {
  const { title } = useORAConfigData();
  return (
    <FullscreenModal
      isOpen
      onClose={nullMethod}
      hasCloseButton={false}
      title={title}
      modalBodyClassName="content-body bg-light-300"
      beforeBodyNode={<ProgressBar className="px-2" />}
    >
      <div className="h-100">
        {children}
      </div>
    </FullscreenModal>
  );
};
ModalContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ModalContainer;
