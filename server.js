const express = require("express");
const temperature = require("./sensor/temp");

const app = express();

app.get("/", (req, res) => {
  res.send("hello, world");
});

app.get("/temp", (req, res) => {
  const tempData = temperature();
  console.log(tempData);
  res.send(tempData);
});

app.listen(3000, () => {
  console.log("Listening at http://localhost:3000/");
});