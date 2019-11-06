import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import './ButtonPanel.scss';

const ButtonPanel = ({ clickHandler }) => {
  const Grey = '#e0e0e0';
  const handleClick = (buttonName) => clickHandler(buttonName);

  return (
    <div className="ButtonPanel">
      <div className="ButtonPanel__row">
        <Button name="AC" clickHandler={handleClick} color={Grey} />
        <Button name="+/-" clickHandler={handleClick} color={Grey} />
        <Button name="%" clickHandler={handleClick} color={Grey} />
        <Button name="÷" clickHandler={handleClick} />
      </div>
      <div className="ButtonPanel__row">
        <Button name="7" clickHandler={handleClick} color={Grey} />
        <Button name="8" clickHandler={handleClick} color={Grey} />
        <Button name="9" clickHandler={handleClick} color={Grey} />
        <Button name="x" clickHandler={handleClick} />
      </div>
      <div className="ButtonPanel__row">
        <Button name="4" clickHandler={handleClick} color={Grey} />
        <Button name="5" clickHandler={handleClick} color={Grey} />
        <Button name="6" clickHandler={handleClick} color={Grey} />
        <Button name="-" clickHandler={handleClick} />
      </div>
      <div className="ButtonPanel__row">
        <Button name="1" clickHandler={handleClick} color={Grey} />
        <Button name="2" clickHandler={handleClick} color={Grey} />
        <Button name="3" clickHandler={handleClick} color={Grey} />
        <Button name="+" clickHandler={handleClick} />
      </div>
      <div className="ButtonPanel__row">
        <Button name="0" clickHandler={handleClick} color={Grey} wide />
        <Button name="." clickHandler={handleClick} color={Grey} />
        <Button name="=" clickHandler={handleClick} />
      </div>
    </div>
  );
};

ButtonPanel.propTypes = {
  clickHandler: PropTypes.func.isRequired,
};

export default ButtonPanel;
