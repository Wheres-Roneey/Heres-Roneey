const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
const fileName = "./messages.json";
const messages = require(fileName);

app.use(express.json());
app.use(cors());

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

app.post("/messages", (req, res) => {
  let newMessage = {
    to: req.body.to,
    body: req.body.body,
    tags: req.body.tags
  };

  messages.push(newMessage);

  fs.writeFile(fileName, JSON.stringify(messages), (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });

  res.send("message added");
});

module.exports = app;
