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

  componentDidMount() {
    let noteboard = localStorage.getItem("notes");
    if (noteboard) {
      noteboard = JSON.parse(noteboard);
      this.setState({
        noteID: noteboard.noteID,
        zIndex: noteboard.zIndex,
        notes: noteboard.notes,
      });
    }
  }

  componentDidUpdate() {
    if (this.state.notes.length === 0) {
      localStorage.removeItem("notes");
    } else {
      localStorage.setItem(
        "notes",
        JSON.stringify({
          noteID: this.state.noteID,
          zIndex: this.state.zIndex,
          notes: this.state.notes,
        })
      );
    }
  }

  selectNote = (id, zIndex) => {
    let notes = this.state.notes.map((note) => {
      if (note.noteID === id) {
        if (note.zIndex !== this.state.zIndex) note.zIndex = this.state.zIndex;
      } else if (note.zIndex > zIndex) note.zIndex--;
      return note;
    });
    this.setState(() => {
      return {
        notes: notes,
        selectedNoteID: id,
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
    let note = {
      width: 250,
      height: 250,
      noteID: this.state.noteID,
      x: e.clientX,
      y: e.clientY,
      zIndex: this.state.zIndex,
      description: "",
    };
    notes.push(note);
    this.setState((prevState) => {
      return {
        zIndex: prevState.zIndex + 1,
        noteID: prevState.noteID + 1,
        notes: notes,
      };
    });
    return note.noteID;
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
    this.setState({
      notes: notes,
      zIndex: notes.length === 0 ? 0 : this.state.zIndex,
    });
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
      />
    ));
    return (
      <div
        className="noteboard"
        onDoubleClick={(e) => {
          if (e.target.className !== "noteboard") return;
          let newNoteID = this.createNote(e);
          this.selectNote(newNoteID);
        }}
        onMouseDown={(e) => {
          if (e.target.className === "note-drag")
            this.setState({ isDragging: true });
          else if (e.target.className === "note-resize")
            this.setState({ isResizing: true });
          else if (e.target.className === "noteboard") this.deselectNote();
        }}
        onMouseMove={(e) => {
          if (this.state.selectedNoteID === -1) return;
          else if (this.state.isDragging) this.dragNote(e);
          else if (this.state.isResizing) this.resizeNote(e);
        }}
        onMouseUp={(e) => {
          this.setState({ isResizing: false, isDragging: false });
        }}
      >
        <div className="noteboard-header">
          <h1>Note-taking App</h1>
          <h3>by Jacky Lo</h3>
          <br />
          <div>Double-Click to create a note</div>
        </div>
        {notes}
      </div>
    );
  }
}

export default Noteboard;
