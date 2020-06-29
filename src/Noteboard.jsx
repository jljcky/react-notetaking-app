import React, { Component } from "react";
import Note from "./Note";

class Noteboard extends Component {
  state = {
    isDragging: false,
    noteID: 0,
    selectedNoteID: -1,
    zIndex: 0,
    notes: [],
    mouseX: 0,
    mouseY: 0,
    dX: 0,
    dY: 0,
  };

  selectNote = (e, id) => {
    e.currentTarget.style.zIndex = this.state.zIndex;
    this.setState((prevState) => {
      return {
        selectedNoteID: id,
        zIndex: prevState.zIndex++,
      };
    });
  };

  deselectNote = () => {
    this.setState({
      selectedNoteID: -1,
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
      description: "",
    });
    this.setState((prevState) => {
      return {
        noteID: prevState.noteID++,
        zIndex: prevState.zIndex++,
        notes: notes,
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

  workWithNote = (id, func) => {
    let notes = this.state.notes;
    let index = notes.findIndex((x) => x.id === id);
    notes[index] = func(notes[index]);
    return notes;
  };

  resizeNote = () => {};

  dragNote = (e, id, action) => {
    switch (action) {
      case "mousedown":
        let mouseInfo = this.getMouseInfoFromNote(e, id);
        this.setState({
          isDragging: true,
          mouseX: mouseInfo[0],
          mouseY: mouseInfo[1],
          dX: mouseInfo[2],
          dY: mouseInfo[3],
        });
        break;
      case "mousemove":
        let notes = this.workWithNote(this.state.selectedNoteID, (note) => {
          note.x = e.clientX - this.state.dX;
          note.y = e.clientY - this.state.dY;
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

  render() {
    let notes = this.state.notes.map((note) => (
      <Note
        key={note.id}
        note={note}
        selectNote={this.selectNote}
        dragNote={this.dragNote}
      />
    ));
    return (
      <div
        className="noteboard"
        onDoubleClick={(e) => {
          this.createNote(e);
        }}
        onMouseMove={(e) => {
          if (this.state.selectedNoteID === -1) return;
          if (this.state.isDragging)
            this.dragNote(e, this.state.selectedNoteID, "mousemove");
        }}
        onMouseUp={(e) => {
          this.dragNote(e, this.state.selectedNoteID, "mouseup");
          this.deselectNote();
        }}
      >
        {notes}
      </div>
    );
  }
}

export default Noteboard;
