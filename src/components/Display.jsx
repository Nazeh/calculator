import React from 'react';
import PropTypes from 'prop-types';

const Display = ({ result = '0' }) => (
  <div>
    {result}
  </div>
);

Display.propTypes = {
  result: PropTypes.string.isRequired,
};

export default Display;
