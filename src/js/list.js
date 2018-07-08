import React from "react";

//Lost for list in history list
const List = props => (
  <div className="list">
    <button className="list-button" style={props.style} onClick={props.onClick}>
      {props.description}
    </button>
    <p>{props.coordinateMsg}</p>
  </div>
);

export default List;
