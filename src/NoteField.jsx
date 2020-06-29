import React, { Component } from "react";

class NoteField extends Component {
  render() {
    return (
      <textarea
        className="note-field"
        disabled={this.props.isNotIdle}
      ></textarea>
    );
  }
}

export default NoteField;
