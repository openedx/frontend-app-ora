import React from 'react';
import PropTypes from 'prop-types';

import { Spinner } from '@edx/paragon';

import {
  useIsPageDataLoaded, useIsORAConfigLoaded, usePageDataError, useORAConfigDataError,
} from 'hooks/app';

/* The purpose of this component is to wrap views with a header/footer for situations
 * where we need to run non-embedded
 */

const AppContainer = ({ children }) => {
  const isConfigLoaded = useIsORAConfigLoaded();
  const isPageDataLoaded = useIsPageDataLoaded();
  const pageDataError = usePageDataError();
  const oraConfigDataError = useORAConfigDataError();
  const isLoaded = (isConfigLoaded && isPageDataLoaded);

  if (pageDataError || oraConfigDataError) {
    console.error('Fail to load data.', pageDataError, oraConfigDataError);
    throw new Error('Fail to load data.');
  }
  return (
    <div className="w-100 h-100">
      {isLoaded ? children : <Spinner animation="border" screenReaderText="loading" />}
    </div>
  );
};
AppContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppContainer;
