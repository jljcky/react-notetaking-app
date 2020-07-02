import React, { Component } from "react";

class NoteField extends Component {
  render() {
    return (
      <textarea
        className="note-field"
        disabled={this.props.isNotIdle}
        value={this.props.description}
        onChange={(e) => {
          this.props.writeNote(e);
        }}
      ></textarea>
    );
  }
}

export default NoteField;
