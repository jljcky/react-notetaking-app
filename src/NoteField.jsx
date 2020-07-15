import React from "react";

const NoteField = (props) => {
  // const [disableText, setTextDisabled] = useState(true);
  return (
    <textarea
      className={"note-field" /* + (disableText ? " disabled-text" : "")*/}
      disabled={props.isNotIdle}
      value={props.description}
      onChange={(e) => {
        props.writeNote(e);
      }}
      // onFocus={() => setTextDisabled(false)}
      // onBlur={() => setTextDisabled(true)}
    ></textarea>
  );
};

export default NoteField;
