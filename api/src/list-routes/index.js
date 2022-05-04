const { Router } = require('express');

function randomID() {
  return Math.floor(Math.random() * 0xFFFFFFFFFFFF).toString(16);
}

const routes = Router();

const noteList = [
  { id: 'abc', title: 'Hello World', text: 'hey', updated: new Date() },
];

routes.get('/', (req, res) => {
  res.json(noteList); // return all the notes
});

routes.post('/', (req, res) => {
  const note = { ...req.body, id: randomID(), updated: new Date() };

  noteList.unshift(note);

  res.status(201).json(note);
});

routes.put('/:noteId', (req, res) => {
  const { noteId } = req.params; // get the id of the note we're updating

  const foundNote = noteList.find(note => note.id === noteId); // find the note

  if (!foundNote) { // we didn't find the note
    return res.status(404).json({ message: 'did not find note' });
  }

  const now = new Date();

  foundNote.title = req.body.title;
  foundNote.text = req.body.text;
  foundNote.updated = now;

  res.json(foundNote); // note has been updated, send back the updated version
});

routes.delete('/:noteId', (req, res) => {
  const { noteId } = req.params; // get the id of the note we're deleting

  const foundNoteIndex = noteList.findIndex(note => note.id === noteId); // find the note

  if (foundNoteIndex === -1) { // we didn't find the note
    return res.status(404).json({ message: 'did not find note' });
  }

  noteList.splice(foundNoteIndex, 1);

  res.json({ message: 'note deleted' });
});

module.exports = routes;
