import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ name, wide, color }) => {
  const style = {
    width: wide ? '50%' : '25%',
    backgroundColor: color,
    border: '1px solid #d1d1d1',
    fontSize: '2rem',
  };

  return (
    <button type="button" style={style}>
      {name}
    </button>
  );
};

Button.propTypes = {
  name: PropTypes.string.isRequired,
  wide: PropTypes.bool,
  color: PropTypes.string,
};

Button.defaultProps = {
  wide: false,
  color: 'orange',
};

export default Button;
