import React from 'react';
import PropTypes from 'prop-types';

import { useIsPageDataLoaded, useIsORAConfigLoaded } from 'data/services/lms/hooks/selectors';

/* The purpose of this component is to wrap views with a header/footer for situations
 * where we need to run non-embedded
 */

const AppContainer = ({ Component }) => {
  const isConfigLoaded = useIsORAConfigLoaded();
  const isPageDataLoaded = useIsPageDataLoaded();
  if (!isConfigLoaded || !isPageDataLoaded) {
    return null;
  }
  return <Component />;
};
AppContainer.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default AppContainer;
