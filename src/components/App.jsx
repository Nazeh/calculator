import React, { useState } from 'react';
import Display from './Display';
import ButtonPanel from './ButtonPanel';
import process from '../logic/process';

import './App.scss';

const App = () => {
  const [state, setState] = useState({ queue: [], next: null, total: null });

  const handleClick = (buttonName) => {
    setState(process({ ...state }, buttonName));
  };

  return (
    <div id="App">
      <Display
        queue={[...state.queue, state.next]}
        total={state.total || '0'}
      />
      <ButtonPanel clickHandler={handleClick} />
    </div>
  );
};

export default App;
