import React from "react";

const NoteResize = (props) => {
  let display = props.selected ? "initial" : "none";
  return (
    <div
      className="note-resize"
      style={{
        left: props.x - props.side / 2,
        top: props.y - props.side / 2,
        width: props.side,
        height: props.side,
        display: display,
      }}
    ></div>
  );
};

export default NoteResize;
