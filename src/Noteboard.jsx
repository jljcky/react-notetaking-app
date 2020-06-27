import React, { Component } from "react";
import Note from "./Note";

class Noteboard extends Component {
  state = {
    noteID: 0,
    selectedNoteID: -1,
    isTyping: false,
    isDragging: false,
    zIndex: 0,
    notes: [],
    mouseX: 0,
    mouseY: 0,
    dX: 0,
    dY: 0,
  };

  startTyping = (e) => {
    if (e.target.className === "note-field") {
      this.setState({ isTyping: true });
    }
  };

  selectNote = (e, id) => {
    e.currentTarget.style.zIndex = this.state.zIndex;
    let mouseInfo = this.getMouseInfoFromNote(e, id);
    this.setState((prevState) => {
      return {
        selectedNoteID: id,
        mouseX: mouseInfo[0],
        mouseY: mouseInfo[1],
        dX: mouseInfo[2],
        dY: mouseInfo[3],
        isDragging: true,
        zIndex: prevState.zIndex++,
      };
    });
  };

  deselectNote = (e) => {
    if (e.target.className === "noteboard")
      this.setState({
        selectedNoteID: -1,
        isTyping: false,
        isDragging: false,
        isResizing: false,
      });
  };

  createNote = (e) => {
    if (e.target.className !== "noteboard") return;
    let notes = this.state.notes;
    notes.push({
      id: this.state.noteID,
      width: 250,
      height: 250,
      x: e.clientX,
      y: e.clientY,
      zIndex: this.state.zIndex,
    });
    this.setState((prevState) => {
      return {
        noteID: prevState.noteID++,
        notes: notes,
        zIndex: prevState.zIndex++,
      };
    });
  };

  getMouseInfoFromNote = (e, id) => {
    let mouseX = e.clientX;
    let mouseY = e.clientY;
    let note = this.state.notes.find((x) => x.id === id);
    let dX = mouseX - note.x;
    let dY = mouseY - note.y;
    return [mouseX, mouseY, dX, dY];
  };

  resizeNote = () => {};

  dragNote = (e, action) => {
    switch (action) {
      case "mousemove":
        if (!this.state.isDragging) return;
        let notes = this.state.notes.map((note) => {
          if (note.id === this.state.selectedNoteID) {
            note.x = e.clientX - this.state.dX;
            note.y = e.clientY - this.state.dY;
          }
          return note;
        });
        this.setState({
          notes: notes,
        });
        break;
      case "mouseup":
        this.setState({
          isDragging: false,
        });
        break;
      default:
        break;
    }
  };

  deleteNote = () => {};

  handleNote = (e, action) => {
    if (this.state.isTyping) return;
    this.dragNote(e, action);
  };

  render() {
    let notes = this.state.notes.map((note) => (
      <Note
        key={note.id}
        note={note}
        isTyping={this.state.isTyping}
        isDragging={this.state.isDragging}
        startTyping={this.startTyping}
        selectNote={this.selectNote}
        handleNote={this.handleNote}
      />
    ));
    return (
      <div
        className="noteboard"
        onDoubleClick={(e) => {
          this.createNote(e);
        }}
        onMouseMove={(e) => {
          this.handleNote(e, "mousemove");
        }}
        onMouseUp={(e) => {
          this.handleNote(e, "mouseup");
          this.deselectNote(e);
        }}
      >
        {notes}
      </div>
    );
  }
}

export default Noteboard;
