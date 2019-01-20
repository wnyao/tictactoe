import React from 'react';
import ReactDOM from 'react-dom';
import GameContainer from './js/gameContainer.js';

const renderer = () =>
  ReactDOM.render(<GameContainer />, document.getElementById('root'));

// Hot Module Replacement
if (module.hot) module.hot.accept(Component => renderer());

// Initial load
renderer();
