import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
  name, wide, color, clickHandler,
}) => {
  const style = {
    width: wide ? '50%' : '25%',
    backgroundColor: color,
    border: '1px solid #d1d1d1',
    fontSize: '2rem',
  };

  const handleClick = () => clickHandler(name);

  return (
    <button
      type="button"
      style={style}
      onClick={handleClick}
    >
      {name}
    </button>
  );
};

Button.propTypes = {
  name: PropTypes.string.isRequired,
  clickHandler: PropTypes.func.isRequired,
  wide: PropTypes.bool,
  color: PropTypes.string,
};

Button.defaultProps = {
  wide: false,
  color: 'orange',
};

export default Button;
