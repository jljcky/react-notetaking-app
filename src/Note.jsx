import React, { Component } from "react";
import NoteField from "./NoteField";
import NoteDrag from "./NoteDrag";
import NoteResize from "./NoteResize";
import NoteDelete from "./NoteDelete";

class Note extends Component {
  render() {
    let { note } = this.props;
    // let display = this.props.selected ? "solid" : "hidden";
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
          // borderStyle: display,
        }}
        onMouseDown={(e) => {
          this.props.selectNote(e, note.id);
          if (e.target.className === "note-drag")
            this.props.dragNote(e, note.id, "mousedown");
          else if (e.target.className === "note-resize")
            this.props.resizeNote(e, note.id, "mousedown");
        }}
      >
        <NoteDrag isDragging={this.props.isDragging} />
        <NoteField
          description={note.description}
          isNotIdle={this.props.isNotIdle}
        />
        <NoteResize
          selected={this.props.selected}
          side={20}
          x={width}
          y={height}
        />
        <NoteDelete
          deleteNote={this.props.deleteNote}
          id={note.id}
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
