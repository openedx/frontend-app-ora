import React from 'react';
import PropTypes from 'prop-types';

import { useIsPageDataLoaded } from 'data/services/lms/hooks/selectors';

const PageDataProvider = ({ children }) => useIsPageDataLoaded() ? children : null;
PageDataProvider.propTypes = { children: PropTypes.node.isRequired };

export default PageDataProvider;
