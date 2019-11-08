import React, { useState } from 'react';
import Display from './Display';
import ButtonPanel from './ButtonPanel';
import calculate from '../logic/calculate';

import './App.scss';

const App = () => {
  const [state, setState] = useState({
    LHS: null,
    operation: null,
    RHS: null,
  });

  const handleClick = (buttonName) => {
    setState(calculate({ ...state }, buttonName));
  };

  return (
    <div id="App">
      <Display total={state.RHS || state.LHS || '0'} />
      <ButtonPanel clickHandler={handleClick} />
    </div>
  );
};

export default App;
