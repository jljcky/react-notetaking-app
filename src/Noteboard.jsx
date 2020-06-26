import React, { Component } from "react";
import Note from "./Note";

class Noteboard extends Component {
  state = { isTyping: false, zIndex: 0, notes: [] };

  startTyping = (e) => {
    if (e.target.className === "note-field") {
      this.setState({ isTyping: true });
    }
  };

  stopTyping = (e) => {
    if (e.target.className === "noteboard") this.setState({ isTyping: false });
  };

  createNote = (e) => {
    if (e.target.className !== "noteboard") return;
    let notes = this.state.notes;
    notes.push({ x: e.clientX, y: e.clientY, zIndex: this.state.zIndex });
    this.setState((prevState) => {
      return {
        notes: notes,
        zIndex: prevState.zIndex++,
      };
    });
  };

  resizeNote = () => {};

  dragNote = () => {
    if (this.state.isTyping) return;
  };

  deleteNote = () => {};

  handleNote = (event, action) => {
    event.target.style.zIndex = this.state.zIndex;
    switch (action) {
      case 0:
        this.resizeNote();
        break;
      case 1:
        this.dragNote();
        break;
      case 2:
        this.deleteNote();
        break;
      default:
        break;
    }
    this.setState((prevState) => {
      return {
        zIndex: prevState.zIndex++,
      };
    });
  };

  render() {
    let notes = this.state.notes.map((note, index) => (
      <Note
        key={index}
        isTyping={this.state.isTyping}
        x={note.x}
        y={note.y}
        zIndex={note.zIndex}
        startTyping={this.startTyping}
        handleNote={this.handleNote}
      />
    ));
    return (
      <div
        className="noteboard"
        onClick={(e) => {
          this.stopTyping(e);
        }}
        onDoubleClick={(e) => {
          this.createNote(e);
        }}
      >
        {notes}
      </div>
    );
  }
}

export default Noteboard;
