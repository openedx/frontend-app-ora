import React from 'react';
import PropTypes from 'prop-types';

import ProgressBar from 'components/ProgressBar';

import { useIsPageDataLoaded, useIsORAConfigLoaded } from 'data/services/lms/hooks/selectors';

/* The purpose of this component is to wrap views with a header/footer for situations
 * where we need to run non-embedded
 */

const AppContainer = ({ children }) => {
  const isConfigLoaded = useIsORAConfigLoaded();
  const isPageDataLoaded = useIsPageDataLoaded();
  if (!isConfigLoaded || !isPageDataLoaded) {
    return null;
  }
  return (
    <div style={{ width: '100%' }}>
      {children}
    </div>
  );
};
AppContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppContainer;
