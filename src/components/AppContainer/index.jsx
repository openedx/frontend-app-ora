import React from 'react';
import PropTypes from 'prop-types';

import { useIntl } from '@edx/frontend-platform/i18n';
import { ErrorPage } from '@edx/frontend-platform/react';
import { Spinner } from '@edx/paragon';

import {
  useIsPageDataLoaded,
  useIsORAConfigLoaded,
  usePageDataError,
  useORAConfigDataError,
} from 'hooks/app';

import messages from './messages';

/* The purpose of this component is to wrap views with a header/footer for situations
 * where we need to run non-embedded
 */

const AppContainer = ({ children }) => {
  const { formatMessage } = useIntl();
  const isConfigLoaded = useIsORAConfigLoaded();
  const isPageDataLoaded = useIsPageDataLoaded();
  const pageDataError = usePageDataError();
  const oraConfigDataError = useORAConfigDataError();
  const isLoaded = isConfigLoaded && isPageDataLoaded;

  if (pageDataError || oraConfigDataError) {
    const { response } = pageDataError || oraConfigDataError;
    const errorMessage = messages[response?.data?.error?.errorCode] || messages.unknownError;

    return <ErrorPage message={formatMessage(errorMessage)} />;
  }
  return (
    <div className="w-100 h-100">
      {isLoaded ? (
        children
      ) : (
        <Spinner
          animation="border"
          screenReaderText="loading"
          className="app-loading"
        />
      )}
    </div>
  );
};
AppContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppContainer;
