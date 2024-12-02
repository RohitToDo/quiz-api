const express = require("express");
const bodyParser = require("body-parser");
const quizRoutes = require("./routes/quizRoutes");

const app = express();
app.use(bodyParser.json());

app.use("/api/quizzes", quizRoutes);

module.exports = app;
