import React, { Component } from "react";
import NoteField from "./NoteField";
import NoteDrag from "./NoteDrag";

class Note extends Component {
  render() {
    let { note } = this.props;
    return (
      <div
        className="note"
        style={{
          width: note.width,
          height: note.height,
          left: note.x,
          top: note.y,
          zIndex: note.zIndex,
        }}
        onMouseDown={(e) => {
          this.props.selectNote(e, note.id);
          if (e.target.className === "note-drag")
            this.props.dragNote(e, note.id, "mousedown");
        }}
      >
        <NoteDrag />
        <NoteField description={note.description} />
      </div>
    );
  }
}

export default Note;
