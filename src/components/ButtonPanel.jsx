import React from 'react';
import Button from './Button';
import './ButtonPanel.scss';

const ButtonPanel = () => {
  const Grey = '#e0e0e0';
  return (
    <div className="ButtonPanel">
      <div className="ButtonPanel__row">
        <Button name="AC" color={Grey} />
        <Button name="+/-" color={Grey} />
        <Button name="%" color={Grey} />
        <Button name="÷" />
      </div>
      <div className="ButtonPanel__row">
        <Button name="7" color={Grey} />
        <Button name="8" color={Grey} />
        <Button name="9" color={Grey} />
        <Button name="x" />
      </div>
      <div className="ButtonPanel__row">
        <Button name="4" color={Grey} />
        <Button name="5" color={Grey} />
        <Button name="6" color={Grey} />
        <Button name="-" />
      </div>
      <div className="ButtonPanel__row">
        <Button name="1" color={Grey} />
        <Button name="2" color={Grey} />
        <Button name="3" color={Grey} />
        <Button name="+" />
      </div>
      <div className="ButtonPanel__row">
        <Button name="0" color={Grey} wide />
        <Button name="." color={Grey} />
        <Button name="=" />
      </div>
    </div>
  );
};

export default ButtonPanel;
