import React, { Component } from "react";

class NoteField extends Component {
  state = {};

  componentDidUpdate() {
    if (this.props.isTyping) {
    }
  }

  render() {
    return (
      <div
        className="note-field"
        contentEditable={this.props.isTyping}
        onClick={(e) => {
          this.props.startTyping(e);
        }}
        style={{
          userSelect: this.props.isTyping ? "auto" : "none",
        }}
      ></div>
    );
  }
}

export default NoteField;
