import React from 'react';
import PropTypes from 'prop-types';

/* The purpose of this component is to wrap views with a header/footer for situations
 * where we need to run non-embedded
 */

const AppContainer = ({ Component }) => (
  <div className="bg-light-300">
    <Component />
  </div>
);
AppContainer.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default AppContainer;
