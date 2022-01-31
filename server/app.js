const express = require("express");
const app = express();
const cors = require("cors");
const messages = require("./messages.json");
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/messages", (req, res) => {
  res.send(messages);
});

app.get("/messages/:id", (req, res) => {
  let messageId = req.params.id;
  let index = parseInt(messageId);
  res.json(messages[index]);
});

module.exports = app;
