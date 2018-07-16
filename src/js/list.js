import React from "react";
import PropTypes from "prop-types";

//Lost for list in history list
const List = props => (
  <div className="list">
    <button
      className="button--list"
      style={props.style}
      onClick={props.onClick}
    >
      {props.description}
    </button>
    <p>{props.coordinateMsg}</p>
  </div>
);

List.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object]),
  onClick: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
  coordinateMsg: PropTypes.string.isRequired
};

export default List;
