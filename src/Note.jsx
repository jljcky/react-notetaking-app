import React, { Component } from "react";
import NoteField from "./NoteField";
import NoteDrag from "./NoteDrag";
import NoteResize from "./NoteResize";
import NoteDelete from "./NoteDelete";

class Note extends Component {
  render() {
    let { note } = this.props;
    let minWidth = 100;
    let minHeight = 100;
    let width = note.width > minWidth ? note.width : minWidth;
    let height = note.height > minHeight ? note.height : minHeight;

    return (
      <div
        className="note"
        style={{
          width: width,
          height: height,
          left: note.x,
          top: note.y,
          zIndex: note.zIndex,
        }}
        onMouseDown={(e) => {
          this.props.selectNote(note.noteID);
          this.props.getMouseInfoFromNote(e, note.noteID);
        }}
      >
        <NoteDrag isDragging={this.props.isDragging} />
        <NoteField
          description={note.description}
          writeNote={this.props.writeNote}
          isNotIdle={this.props.isDragging || this.props.isResizing}
          selected={this.props.selected}
        />
        <NoteResize
          noteID={note.noteID}
          selected={this.props.selected}
          side={20}
          x={width}
          y={height}
        />
        <NoteDelete
          noteID={note.noteID}
          deleteNote={this.props.deleteNote}
          selected={this.props.selected}
          side={30}
          x={width}
          y={height}
        />
      </div>
    );
  }
}

export default Note;
