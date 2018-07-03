import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Game from "./game.js";

ReactDOM.render(
  <BrowserRouter>
    <Game />
  </BrowserRouter>,
  document.getElementById("root")
);
