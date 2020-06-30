import React from "react";

const NoteDrag = (props) => {
  let cursor = props.isDragging ? "grabbing" : "grab";
  return <div className="note-drag" style={{ cursor: cursor }}></div>;
};

export default NoteDrag;
