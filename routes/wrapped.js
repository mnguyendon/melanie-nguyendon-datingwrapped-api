const express = require("express");
const _ = require("lodash");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

router.get("/", (req, res) => {
  const pastDatesFileData = JSON.parse(
    fs.readFileSync(`./data/pastdatedetails.json`)
  );
  const personFileData = JSON.parse(fs.readFileSync(`./data/person.json`));

  const numOfFirstDates = _.uniqBy(
    pastDatesFileData,
    (date) => date["person-id"]
  ).length;
  const numGotToSecondDate = _.chain(pastDatesFileData)
    .groupBy((date) => date["person-id"])
    .countBy("length")
    .reduce((result, value, key) => {
      let count = 0;
      if (Number(key) > 1) {
        count += value;
      }
      return count;
    });
  const groupByStatus = _.groupBy(personFileData, "status");
  const groupByMeeting = _.groupBy(personFileData, "met");
  const numEndedByMe = _.filter(
    pastDatesFileData,
    (person) => person.end === "Me"
  ).length;
  const numMadeMeCry = _.chain(pastDatesFileData)
    .filter((dates) => Number(dates.cry) > 0)
    .groupBy((obj) => obj["person-id"])
    .size()
    .value();

  const data = {
    numOfFirstDates,
    numGotToSecondDate,
    groupByStatus,
    groupByMeeting,
    numEndedByMe,
    numMadeMeCry,
  };

  res.status(200).json(data);
});

module.exports = router;
