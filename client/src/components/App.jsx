import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import AddNote from "./AddNote";


function App() {
  const [notes, setNotes] = useState([{}]);
  
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/`)
      .then(response => {
        if (!response.ok) {
          console.log("hi",response);
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setNotes(data.notes);
      })
      .catch(error => {
        console.error('Error fetching data:', error);

      });
  }, []);
  console.log(notes);
  
  let maxKey = 0;
  for (const note of notes) {
    if (note.key > maxKey) {
      maxKey = note.key;
    }
  }
  function addNote(note) {
    console.log(note)
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/add/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({key:maxKey+1, title:note.title, content: note.content}) 
    })
      .then(response => {
        if (!response.ok) {
          console.log(response.json())
          throw new Error("Failed to add note");
          
        }
        return response.json();
      })
      .then(newNote => {
        setNotes(prevNotes => [...prevNotes, newNote]);
      })
      .catch(error => console.error("Error adding note:", error));
  }

  function deleteNote(key) {
    const noteToDelete = notes[key];
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/delete/${noteToDelete.key}`, {
      method: "DELETE",
    })
      .then(response => {
        console.log("hello",noteToDelete.key);
        if (!response.ok) {
          console.log(response.json())
          throw new Error("Failed to delete note");
        }
        return response.json();
      })
      .then(() => {
        setNotes(prevNotes => prevNotes.filter(noteItem =>  noteItem.key !== noteToDelete.key))
      })
      .catch(error => console.error("Error deleting note:", error));
  
  }

  return (
    <div>
      <Header />
      <AddNote onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}
export default App;
