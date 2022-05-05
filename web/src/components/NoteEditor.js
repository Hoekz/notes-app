import { useEffect, useRef } from 'react';

export function NoteEditor({ note, setNote }) {
  const titleRef = useRef(null);
  const newNote = () => setNote({ id: null, title: '', text: '' });

  useEffect(() => {
    titleRef.current?.focus();
  }, [note?.id]);

  if (!note) {
    return (
      <div className="note-editor empty">
        <h2>No Note Selected.</h2>
        <p>Choose a note from the side panel or create a new one.</p>
        <button tabIndex="1" className="new-note" onClick={newNote}>Create New Note</button>
      </div>
    );
  }

  return (
    <div className="note-editor">
      <input ref={titleRef} tabIndex="1" className="title" value={note.title} onChange={(e) => setNote({ ...note, title: e.target.value })} placeholder="Title" />
      <textarea tabIndex="1" className="text" value={note.text} onChange={(e) => setNote({ ...note, text: e.target.value })} placeholder="Write a note..." />
    </div>
  );
}
