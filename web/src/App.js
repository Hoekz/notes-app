import { useEffect, useState } from 'react';
import { NotesList } from './components/NotesList';
import { NoteEditor } from './components/NoteEditor';
import { randomID } from './utils/random-id';
import './App.css';

async function getNoteList() {
  // TODO: load note list from server
  return [
    { id: 'abc', title: 'Hello World', updated: new Date(), text: 'Hi' },
  ];
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

  function saveNote(updatedNote) {
    setNote(updatedNote);

    if (updatedNote.id) {
      setNoteList(noteList.map(note => note.id === updatedNote.id ? updatedNote : note));
    } else {
      setNoteList([{ ...updatedNote, id: randomID() }, ...noteList])
    }

    // TODO: send note to server
  }

  function deleteNote() {
    if (note) {
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
