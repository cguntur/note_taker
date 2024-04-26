const notes = require('express').Router();
//const uuid = require('../helpers/uuid');
const { v4: uuidv4 } = require('uuid');

const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');

// GET Route for retrieving all the notes
notes.get('/', (req, res) => {
  console.info(`${req.method} request received for notes test`);
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

//POST route for a new note
notes.post('/', (req, res) => {
  console.log(req.body);

  const {title, text} = req.body;

  if(req.body){
    const newNote = {
      id: uuidv4(),
      title,
      text
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully`);
  }else {
    res.errored('Error in adding a note');
  }
});

//DELETE route
notes.delete('/:id', (req, res) => {
  console.info(`${req.method} request received for note`);
  const noteId = req.params.id;
  console.info(`Request received to delete Item ${noteId}`);
    readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      // Make a new array of all tips except the one with the ID provided in the URL
      const result = json.filter(note => note.id != noteId);

      // Save that array to the filesystem
      writeToFile('./db/db.json', result);

      // Respond to the DELETE request
      res.json(`Item ${noteId} has been deleted`);
    });
});

  module.exports = notes;