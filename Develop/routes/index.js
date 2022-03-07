const fb = require("express").Router();
// const { v4: uuidv4 } = require("uuid");
const { readAndAppend, readFromFile } = require("../helpers/fsUtils");

// get route to display notes on the side (should return an array of objects)
// GET Route for retrieving all the feedback
fb.get("/", (req, res) =>
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)))
);
// create a note (post route)

// EXTRA credit, delete notes

module.exports = fb;
