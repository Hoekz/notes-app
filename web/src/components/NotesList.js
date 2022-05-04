
function ListItem({ id, title, updated, selected, onSelect, onSave, onDelete }) {
  if (selected) {
    return (
      <li className="active">
        <div className={id ? 'list-item' : 'list-item new-item'}>
          <span className="title">{title || 'New Note'}</span>
          <button className="save" onClick={onSave}></button>
          <button className="delete" onClick={onDelete}></button>
        </div>
      </li>
    )
  }

  return (
    <li>
      <button className="list-item" onClick={onSelect}>
        <span className="title">{title}</span>
        <span className="updated">{updated.toLocaleString()}</span>
      </button>
    </li>
  );
}

export function NotesList({ list, selected, onSelect, onSave, onDelete, setNote }) {
  const newNote = (selected && !selected.id);

  return (
    <div className="notes-list">
      <ul>
        {newNote
          ? <ListItem {...selected} selected={true} onDelete={() => setNote(null)} onSave={onSave} />
          : <li><button className="list-item new-note" onClick={() => setNote({ title: '', text: '', updated: new Date() })}>Create New Note</button></li>
        }
        {list.map((note) => (
          <ListItem
            key={note.id}
            {...note}
            selected={selected?.id === note.id}
            onSelect={() => onSelect(note)}
            onSave={onSave}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </div>
  );
}
