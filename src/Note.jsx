import React, { Component } from "react";

class Note extends Component {
  state = {
    width: 250,
    height: 250,
    x: this.props.x,
    y: this.props.y,
    zIndex: 0,
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
        <div
          className="note-field"
          contentEditable={this.props.isTyping}
          onDoubleClick={() => {
            this.props.toggleTyping(true);
          }}
        ></div>
        <div className="note-resize"></div>
        <div className="note-delete"></div>
      </div>
    );
  }
}

export default Note;
