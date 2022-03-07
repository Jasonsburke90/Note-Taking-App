const notes = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const {
  readAndAppend,
  readFromFile,
  writeToFile,
} = require("../helpers/fsUtils");

// GET route to display notes on the side (should return an array of objects)
notes.get("/notes", (req, res) =>
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)))
);
//POST Route create a note
notes.post("/notes", (req, res) => {
  const { title, text, id } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    readAndAppend(newNote, "./db/db.json");
    res.json(`Note added!`);
  } else {
    res.error("Error adding note");
  }
});

// DELETE Route
notes.delete(`/notes/:id`, (req, res) => {
  let deleteID = req.params.id;
  readFromFile("./db/db.json")
    .then((data) => JSON.parse(data))
    .then((notesArray) => {
      let filteredNotes = notesArray.filter((notes) => notes.id !== deleteID);
      writeToFile("./db/db.json", filteredNotes);
      res.json(`Note ${deleteID} has been deleted`);
    });
});

module.exports = notes;
