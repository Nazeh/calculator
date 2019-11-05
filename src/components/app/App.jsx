import React from 'react';
import PropTypes from 'prop-types';
import './App.scss';

const App = ({ name }) => {
  const stuff = 'grara';

  return (
    <div className="App">
      gree
      {stuff}
      {name}
    </div>
  );
};


App.propTypes = {
  name: PropTypes.string.isRequired,
};

export default App;
