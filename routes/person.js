const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

router.get("/", (req, res) => {
  const fileData = JSON.parse(fs.readFileSync(`./data/person.json`));

  return res.status(200).json(fileData);
});

router.post("/", (req, res) => {
  const body = req.body;
  const newPerson = {
    id: uuidv4(),
    ...body,
  };

  const fileData = JSON.parse(fs.readFileSync(`./data/person.json`));

  fs.writeFileSync(
    "./data/person.json",
    JSON.stringify([newPerson, ...fileData])
  );

  return res.status(200).json(newPerson);
});

router.post("/:id", (req, res) => {
  const body = req.body;
  const id = req.params.id;
  let fileData = JSON.parse(fs.readFileSync(`./data/person.json`));
  const personIndex = fileData.findIndex((person) => person.id == id);
  const updatedPerson = {
    ...fileData[personIndex],
    ...body,
  };
  fileData[personIndex] = updatedPerson;
  fs.writeFileSync("./data/person.json", JSON.stringify(fileData));

  res.status(200).json(fileData[personIndex]);
});

module.exports = router;
