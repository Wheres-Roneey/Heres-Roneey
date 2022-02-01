const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
const fileName = "../server/messages.json";
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

app.get("/messages/tags/:tag", (req, res) => {
  const tagName = req.params.tag;
  const matchingMessages = [];
  try {
    messages.forEach(function (message, index) {
      if (messages[index]["tags"].includes(tagName)) {
        matchingMessages.push(messages[index]);
      }
    });
    if (matchingMessages.length > 0) {
      res.send(matchingMessages);
    } else {
      throw new Error("Could not find any confessions with that tag");
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.post("/messages", (req, res) => {
  try {
    if (req.body.body.length <= 200) {
      let newMessage = {
        to: req.body.to,
        body: req.body.body,
        tags: req.body.tags,
      };
      messages.push(newMessage);
      fs.writeFile(fileName, JSON.stringify(messages), (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });
      res.status(201).send("message added");
    } else {
      throw new Error("Confession must be less than 200 characters");
    }
  } catch (error) {
    return res.status(406).send(error.message);
  }
});

module.exports = app;
