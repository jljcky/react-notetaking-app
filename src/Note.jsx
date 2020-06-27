import React, { Component } from "react";
import NoteField from "./NoteField";

class Note extends Component {
  // state = {
  //   width: 250,
  //   height: 250,
  //   x: this.props.x,
  //   y: this.props.y,
  // };

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
        }}
      >
        <div className="note-options">
          <div className="note-delete"></div>
          <div className="note-resize"></div>
        </div>
        <NoteField
          isTyping={this.props.isTyping}
          startTyping={this.props.startTyping}
        />
      </div>
    );
  }
}

export default Note;
