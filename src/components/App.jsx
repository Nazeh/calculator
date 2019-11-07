import React, { useState } from 'react';
import Display from './Display';
import ButtonPanel from './ButtonPanel';
import calculate from '../logic/calculate';

import './App.scss';

const App = () => {
  const [state, setState] = useState({
    total: null,
    next: '0',
    operation: null,
  });

  const handleClick = (buttonName) => {
    setState(calculate({ ...state }, buttonName));
  };

  return (
    <div id="App">
      <Display total={state.next || state.total || '0'} />
      <ButtonPanel clickHandler={handleClick} />
    </div>
  );
};

export default App;
