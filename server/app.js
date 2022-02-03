const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
const req = require("express/lib/request");
const fileName = "./messages.json";
const messages = require(fileName);

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

app.get("/messages", (req, res) => {
  res.send(messages);
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

app.post("/messages/reply", (req, res) => {
  try {
    const id = parseInt(req.body.id);
    const reply = req.body.replies;
    if (reply.length <= 100) {
      messages[id]["replies"].push(reply);
      fs.writeFile(fileName, JSON.stringify(messages), (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });
      res.status(201).send("Reply added");
    } else {
      throw new Error("Reply must be less than 200 characters");
    }
  } catch (error) {
    return res.status(406).send(error.message);
  }
});

app.post("/messages", (req, res) => {
  try {
    if (req.body.body.length <= 100) {
      let newMessage = {
        to: req.body.to,
        body: req.body.body,
        tags: req.body.tags,
        replies: [],
        gif: req.body.gif,
        reacts: [0, 0, 0]
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

app.post("/messages/react", (req, res) => {
  try {
    const id = parseInt(req.body.id);
    const reactMessages = [];
    reactMessages.push(req.body.astonish);
    reactMessages.push(req.body.heartEye);
    reactMessages.push(req.body.thumbsDown);

    console.log(reactMessages);

    messages[id]["reacts"] = reactMessages;
    fs.writeFile(fileName, JSON.stringify(messages), (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });
    res.status(201).send("react added");
  } catch (error) {}
});

app.post("/messages/gif", (req, res) => {
  const id = parseInt(req.body.id);
  const gif = req.body.gif;

  messages[id]["gif"] = gif;
  fs.writeFile(fileName, JSON.stringify(messages), (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
  res.status(201).send("gif added");
});

module.exports = app;
