import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import AddNote from "./AddNote";


function App() {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const [notes, setNotes] = useState([{}]);
  
  useEffect(()=> {
    fetch("http://coms3102-final-production.up.railway.app/api").then(
      response => response.json()
    ).then(
      data=>{
        setNotes(data.notes)
      }
    )
  },[])
  console.log(notes);
  var length = notes.length;
  console.log(length);
  function addNote(note) {
    console.log(note)
    fetch("http://coms3102-final-production.up.railway.app/api/add/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({key:length, title:note.title, content: note.content}) 
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

  function deleteNote(id) {
    fetch(`http://coms3102-final-production.up.railway.app/api/delete/${id}`, {
      method: "DELETE",
    })
      .then(response => {
        if (!response.ok) {
          console.log(response.json())
          throw new Error("Failed to delete note");
        }
        return response.json();
      })
      .then(() => {
        setNotes(prevNotes => prevNotes.filter((noteItem, index) => index !== id));
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
