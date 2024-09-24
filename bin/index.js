const express = require("express");
const MongoClient = require("mongodb").MongoClient;

const PORT = process.env.PORT || 3010;
const app = express();
let db;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

const diaries = require("../mock/diaries.json");
const { MongoClient } = require("mongodb");

app.get("/api/diaries", (req, res) => {
  res.json({ data: diaries });
});

MongoClient.connect("mongodb://localhost:27017/myapi", (err, database) => {
  if (err) {
    return console.log(err);
  }

  db = database;

  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
});
