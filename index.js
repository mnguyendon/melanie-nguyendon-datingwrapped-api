const express = require("express");
const pastPersonRoutes = require("./routes/person");
const pastDatesRoutes = require("./routes/pastdatedetails");
// const housesRoutes = require("./routes/houses");
// const authMiddleware = require("./middleware/authMiddleware");
// INSTALL cors NPM LIBRARY AND IMPORT
const cors = require("cors");

// REQUIRED LINE OF CODE TO GET ACCESS TO process.env
require("dotenv").config();

const app = express();

app.use(express.json());
// USE CORS TO ENABLE
app.use(cors());

// app.use('/', authMiddleware)

// CREATE VARIABLES FOR YOUR ENVIRONMENT VARIABLES
// PROCESS.ENV = object that contains your environment variables
const PORT = process.env.PORT || 8000;
const { VERSION, BASE_PATH } = process.env;

// /api/v1/characters
// app.use(`${BASE_PATH}/${VERSION}/characters`, charactersRoutes)
app.use(`/past-dates`, pastPersonRoutes);
app.use(`/past-dates`, pastDatesRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
