const { addCard, createCard } = require("./cards");
const lightMode = require("./lightMode");
const loadPage = async () => {
  const response = await fetch("http://localhost:3000/messages");
  const data = await response.json();
  data.forEach((card) => {
    let to = card["to"];
    let message = card["body"];
    let tags = card["tags"];

    createCard(to, message, tags);
  });
  addCard();
};

loadPage();
