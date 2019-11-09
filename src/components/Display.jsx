import React from 'react';
import PropTypes from 'prop-types';
import './Display.scss';

const Display = ({ queue, total }) => (
  <div className="Display">
    <p>{queue.join(' ')}</p>
    <p className="Display__total">{total}</p>
  </div>
);

Display.propTypes = {
  queue: PropTypes.string.isRequired,
  total: PropTypes.string.isRequired,
};

export default Display;
