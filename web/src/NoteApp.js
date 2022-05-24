import { useEffect, useState } from 'react';
import { NotesList } from './components/NotesList';
import { NoteEditor } from './components/NoteEditor';
import { randomID } from './utils/random-id';
import './App.css';

const apiUrl = 'http://localhost:8080';

async function getNoteList() {
  const token = JSON.parse(localStorage.getItem('token'));
  const response = await fetch(`${apiUrl}/notes`, {
    headers: {
      authorization: token,
    }
  });

  const json = await response.json();

  return json.map(note => ({
    ...note,
    updated: new Date(note.updated),
  }));
}

function App() {
  const [noteList, setNoteList] = useState([]);
  const [note, setNote] = useState(null);

  useEffect(() => {
    getNoteList().then(setNoteList);
  }, []);

  function loadNote(note) {
    setNote(note);
    // TODO: load note from server
  }

  async function saveNote() {
    if (note.id) {
      // send a request to update the note
      const response = await fetch(`${apiUrl}/notes/${note.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(note),
      });
      // get back the updated version
      const updatedNote = await response.json();
      // convert the date back from a string
      updatedNote.updated = new Date(updatedNote.updated);
      // update the local version of our note list
      setNoteList(noteList.map(eachNote => eachNote.id === note.id ? updatedNote : eachNote));
    } else {
      // send a request to create the note
      const response = await fetch(`${apiUrl}/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(note),
      });
      // get back the updated version
      const updatedNote = await response.json();
      // convert the date back from a string
      updatedNote.updated = new Date(updatedNote.updated);
      setNoteList([updatedNote, ...noteList]);
      setNote(updatedNote);
    }

    // TODO: send note to server
  }

  async function deleteNote() {
    if (note) {
      await fetch(`${apiUrl}/notes/${note.id}`, { method: 'DELETE' });

      setNote(null);
      setNoteList(noteList.filter(eachNote => eachNote.id !== note.id));
    }
  }

  return (
    <div className="app">
      <NotesList
        list={noteList}
        selected={note}
        onSelect={loadNote}
        setNote={setNote}
        onSave={saveNote}
        onDelete={deleteNote}
      />
      <NoteEditor note={note} setNote={setNote} />
    </div>
  );
}

export default App;
