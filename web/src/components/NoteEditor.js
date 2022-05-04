
export function NoteEditor({ note, setNote }) {
  const newNote = () => setNote({ id: null, title: '', text: '', updated: new Date() });

  if (!note) {
    return (
      <div className="note-editor empty">
        <h2>No Note Selected.</h2>
        <p>Choose a note from the side panel or create a new one.</p>
        <button className="new-note" onClick={newNote}>Create New Note</button>
      </div>
    );
  }

  return (
    <div className="note-editor">
      <input className="title" value={note.title} onChange={(e) => setNote({ ...note, title: e.target.value })} placeholder="Title" />
      <textarea className="text" value={note.text} onChange={(e) => setNote({ ...note, text: e.target.value })} placeholder="Write a note..." />
    </div>
  );
}
