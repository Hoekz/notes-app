import { useEffect, useRef, useState } from 'react';

export function NoteEditor({ note, setNote }) {
  const titleRef = useRef(null); // use a reference to the title input
  const newNote = () => setNote({ id: null, title: '', text: '' });
  const [isPressed, setPressed] = useState(false);

  useEffect(() => {
    titleRef.current?.focus(); // if we have a good reference, focus the title input
  }, [note?.id]); // when the id of the selected note changes

  if (!note) {
    return (
      <div className="note-editor empty">
        <h2>No Note Selected.</h2>
        <p>Choose a note from the side panel or create a new one.</p>
        <button tabIndex="1" className={isPressed ? 'pressed new-note' : `new-note`} onClick={newNote} onMouseDown={() => setPressed(true)}>Create New Note</button>
      </div>
    );
  }

  return (
    <div className="note-editor">
      {/* attach reference to input element */}
      <input ref={titleRef} tabIndex="1" className="title" value={note.title} onChange={(e) => setNote({ ...note, title: e.target.value })} placeholder="Title" />
      <textarea tabIndex="1" className="text" value={note.text} onChange={(e) => setNote({ ...note, text: e.target.value })} placeholder="Write a note..." />
    </div>
  );
}
