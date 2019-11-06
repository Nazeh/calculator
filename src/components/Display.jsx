import React from 'react';
import PropTypes from 'prop-types';
import './Display.scss';

const Display = ({ result }) => (
  <div className="Display">
    <p className="result">{result}</p>
  </div>
);

Display.propTypes = {
  result: PropTypes.string,
};

Display.defaultProps = {
  result: '0',
};

export default Display;
