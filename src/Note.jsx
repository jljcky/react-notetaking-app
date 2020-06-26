import React, { Component } from "react";
import NoteField from "./NoteField";

class Note extends Component {
  state = {
    width: 250,
    height: 250,
    x: this.props.x,
    y: this.props.y,
    zIndex: this.props.zIndex,
  };

  render() {
    return (
      <div
        className="note"
        style={{
          width: this.state.width,
          height: this.state.height,
          left: this.state.x,
          top: this.state.y,
          zIndex: this.state.zIndex,
        }}
        onClick={(e) => {
          this.props.handleNote(e);
        }}
        onDrag={(e) => {
          this.props.handleNote(e, 1);
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
