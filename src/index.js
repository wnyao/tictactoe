import React from 'react';
import ReactDOM from 'react-dom';
import GameContainer from './js/gameContainer.js';

const renderer = () =>
  ReactDOM.render(<GameContainer />, document.getElementById('root'));

if (module.hot) module.hot.accept(Component => renderer());

renderer();
