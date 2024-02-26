const express = require("express");
const personRoutes = require("./routes/person");
const pastDatesRoutes = require("./routes/pastdatedetails");
const wrappedRoutes = require("./routes/wrapped");

const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(express.json());

app.use(cors());

const PORT = process.env.PORT || 8000;
const { VERSION, BASE_PATH } = process.env;

app.use(`/person`, personRoutes);
app.use(`/past-dates`, pastDatesRoutes);
app.use(`/wrapped`, wrappedRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
