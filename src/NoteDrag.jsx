import React from "react";

const NoteDrag = (props) => {
  let cursor = !props.isDragging ? "grab" : "grabbing";
  return <div className="note-drag" style={{ cursor: cursor }}></div>;
};

export default NoteDrag;
