import React from 'react';
import PropTypes from 'prop-types';

import { useIsPageDataLoaded } from 'hooks/app';

const PageDataProvider = ({ children }) => (useIsPageDataLoaded() ? children : null);
PageDataProvider.propTypes = { children: PropTypes.node.isRequired };

export default PageDataProvider;
