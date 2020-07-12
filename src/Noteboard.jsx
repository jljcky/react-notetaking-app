import React, { Component } from "react";
import Note from "./Note";

class Noteboard extends Component {
  state = {
    isDragging: false,
    isResizing: false,
    selectedNoteID: -1,
    noteID: 0,
    zIndex: 0,
    notes: [],
    mouseX: 0,
    mouseY: 0,
    dX: 0,
    dY: 0,
  };

  selectNote = (id) => {
    let notes = this.state.notes.map((note) => {
      if (note.noteID === id) {
        note.zIndex = this.state.zIndex;
      }
      return note;
    });
    this.setState((prevState) => {
      return {
        notes: notes,
        selectedNoteID: id,
        zIndex: prevState.zIndex + 1,
      };
    });
  };

  deselectNote = () => {
    this.setState({
      selectedNoteID: -1,
    });
  };

  createNote = (e) => {
    let notes = this.state.notes;
    notes.push({
      width: 250,
      height: 250,
      noteID: this.state.noteID,
      x: e.clientX,
      y: e.clientY,
      zIndex: this.state.zIndex,
      description: "",
    });
    this.setState((prevState) => {
      return {
        zIndex: prevState.zIndex + 1,
        noteID: prevState.noteID + 1,
        notes: notes,
      };
    });
  };

  getMouseInfoFromNote = (e, id) => {
    let mouseX = e.clientX;
    let mouseY = e.clientY;
    let note = this.state.notes.find((note) => note.noteID === id);
    let dX = mouseX - note.x;
    let dY = mouseY - note.y;
    this.setState({
      mouseX: mouseX,
      mouseY: mouseY,
      dX: dX,
      dY: dY,
    });
  };

  workWithNote = (id, func) => {
    let notes = this.state.notes;
    let index = notes.findIndex((note) => note.noteID === id);
    notes[index] = func(notes[index]);
    return notes;
  };

  dragNote = (e) => {
    let notes = this.workWithNote(this.state.selectedNoteID, (note) => {
      note.x = e.clientX - this.state.dX;
      note.y = e.clientY - this.state.dY;
      return note;
    });

    this.setState({
      notes: notes,
    });
  };

  resizeNote = (e) => {
    let notes = this.workWithNote(this.state.selectedNoteID, (note) => {
      note.width = e.clientX - note.x;
      note.height = e.clientY - note.y;
      return note;
    });

    this.setState({
      notes: notes,
    });
  };

  deleteNote = (id) => {
    let notes = this.state.notes.filter((note) => note.noteID !== id);
    this.setState({ notes: notes });
  };

  writeNote = (e) => {
    let notes = this.workWithNote(this.state.selectedNoteID, (note) => {
      note.description = e.target.value;
      return note;
    });

    this.setState({
      notes: notes,
    });
  };

  render() {
    let notes = this.state.notes.map((note, index) => (
      <Note
        key={index}
        note={note}
        selectNote={this.selectNote}
        getMouseInfoFromNote={this.getMouseInfoFromNote}
        dragNote={this.dragNote}
        resizeNote={this.resizeNote}
        deleteNote={this.deleteNote}
        writeNote={this.writeNote}
        selected={this.state.selectedNoteID === note.noteID}
        isDragging={this.state.isDragging}
        isResizing={this.state.isResizing}
        isNotIdle={this.state.isDragging || this.state.isResizing}
      />
    ));
    return (
      <div
        className="noteboard"
        onDoubleClick={(e) => {
          if (e.target.className !== "noteboard") return;
          this.createNote(e);
        }}
        onMouseDown={(e) => {
          if (e.target.className === "note-drag")
            this.setState({ isDragging: true });
          else if (e.target.className === "note-resize")
            this.setState({ isResizing: true });
        }}
        onMouseMove={(e) => {
          if (this.state.selectedNoteID === -1) return;
          else if (this.state.isDragging)
            this.dragNote(e, this.state.selectedNoteID, "mousemove");
          else if (this.state.isResizing)
            this.resizeNote(e, this.state.selectedNoteID, "mousemove");
        }}
        onMouseUp={(e) => {
          this.setState({ isResizing: false, isDragging: false });
          if (e.target.className === "noteboard") this.deselectNote();
        }}
      >
        {notes}
      </div>
    );
  }
}

export default Noteboard;
