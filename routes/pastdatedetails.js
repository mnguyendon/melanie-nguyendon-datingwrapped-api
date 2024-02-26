const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

router.get("/details", (req, res) => {
  const fileData = JSON.parse(fs.readFileSync(`./data/pastdatedetails.json`));

  return res.status(200).json(fileData);
});

router.post("/details", (req, res) => {
  const body = req.body;
  const newDate = {
    id: uuidv4(),
    ...body,
  };

  const fileData = JSON.parse(fs.readFileSync(`./data/pastdatedetails.json`));

  fs.writeFileSync(
    "./data/pastdatedetails.json",
    JSON.stringify([newDate, ...fileData])
  );

  return res.status(200).json(newDate);
});

module.exports = router;
