import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

const TextResponse = ({ response }) => (
  <div className="mt-2 p-2 bg-white">
    <div dangerouslySetInnerHTML={{ __html: response }} />
  </div>
);

TextResponse.propTypes = {
  response: PropTypes.string.isRequired,
};

export default TextResponse;
