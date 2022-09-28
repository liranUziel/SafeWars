const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const { errorHandler } = require("./middleware/errorMiddleware");

const cors = require("cors");
// X const bodyParser = require('body-parser');
const morgan = require("morgan");

//all configuretion are store in .env file
require("dotenv").config();

const app = express();

//==== Middleware ====
// X app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// request logger
app.use(morgan("tiny"));
//overwrite express defult error handler
app.use(errorHandler);
app.use(cors());

//MongoDB

const connectDB = require("./database/db");
connectDB();

//==== DB ====

//mongodb - using mongoose

//==== Multer ====
// File upload
// Set Storage Engine

app.use(express.static("/public"));

//==== ROUTES ====

//Import Routes

const usersRoute = require("./routes/Users");
const safeRoute = require("./routes/Safe");
const classRoute = require("./routes/Class");

app.use("/users", usersRoute);
app.use("/safe", safeRoute);
app.use("/class", classRoute);

//defult route

app.get("/", (req, res) => {
  res.status(200).send("home");
});

PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server runs on http://localhost:${PORT}`);
});
