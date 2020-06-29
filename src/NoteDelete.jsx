import React from "react";

const NoteDelete = (props) => {
  let display = props.selected ? "initial" : "none";
  return (
    <div
      className="note-delete"
      onClick={(e) => {
        props.deleteNote(e, props.id);
      }}
      style={{
        left: props.x - props.side / 2 - 5,
        top: 0 - props.side / 2 - 5,
        width: props.side,
        height: props.side,
        display: display,
      }}
    ></div>
  );
};

export default NoteDelete;
