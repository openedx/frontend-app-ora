import React from 'react';
import PropTypes from 'prop-types';
import { useORAConfigData } from 'hooks/app';

import ProgressBar from 'components/ProgressBar';

/* The purpose of this component is to wrap views with a header/footer for situations
 * where we need to run non-embedded. It is a replicated style of FullScreenModal from
 * paragon. The reason we use this instead of FullScreenModal is because FullScreenModal
 * is very opinionated on other components that it uses on top of it. Since we are not
 * using the modality of the component, it would be better to just replicate the style
 * instead of using the component.
 */

const ModalContainer = ({ children }) => {
  const { title } = useORAConfigData();
  return (
    <div className="h-100">
      <div className="sticky-top bg-white">
        <h3 className="bg-dark text-white p-3 m-0">{title}</h3>
        <ProgressBar className="px-2 shadow-sm" />
      </div>
      <div className="content-body bg-light-300 p-4">
        {children}
      </div>
    </div>
  );
};
ModalContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ModalContainer;
