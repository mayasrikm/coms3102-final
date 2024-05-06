import React, { useState } from "react";
function AddNote({ onAdd }) {
  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  function submitNote(event) {
    event.preventDefault();
    onAdd(note);
    setNote({
      title: "",
      content: "",
    });
  }
  function handleChange(event) {
    const { name, value } = event.target;
    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }
  return (
    <div>
      <form>
        <input
          onChange={handleChange}
          value={note.title}
          placeholder="Title"
          name="title"
        />
        <textarea
          placeholder="Take a note..."
          row="4"
          onChange={handleChange}
          value={note.content}
          name="content"
        ></textarea>
        <button onClick={submitNote}>Add</button>
      </form>
    </div>
  );
}
export default AddNote;
