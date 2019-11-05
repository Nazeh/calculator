import React, { useState } from 'react';
import Display from './Display';
import ButtonPanel from './ButtonPanel';

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <div id="App">
      <Display />
      <ButtonPanel />
    </div>
  );
};

export default App;
