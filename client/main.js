const { addCard, createCard } = require("./cards");
const { lightDark } = require("./lightMode");
const { giphySearch } = require("./giphyapi");
const { appendComments } = require("./client_helpers");

const generateConfessions = (data) => {
  document.querySelector(".wrapper").innerHTML = "";
  data.forEach((card, index) => {
    let to = card["to"];
    let message = card["body"];
    let tags = card["tags"];
    let tag = tags[0];
    let replies = card["replies"];
    let gif = card["gif"];
    let reacts = card["reacts"];
    if (!gif) gif = "";
    createCard(index, to, message, tag, replies, gif, reacts);
  });
  addCard();
};
const loadPage = async () => {
  const response = await fetch(
    "https://safe-wave-84228.herokuapp.com/messages"
  );
  const data = await response.json();
  generateConfessions(data);
};

loadPage();

const btns = document.querySelectorAll(".btns");

btns.forEach((btn) => {
  btn.addEventListener("click", async (e) => {
    const tagTarget = e.target.innerText.slice(1);
    if (tagTarget.slice(-3) === "all") {
      loadPage();
    } else {
      const response = await fetch(
        `https://safe-wave-84228.herokuapp.com/messages/tags/${tagTarget}`
      );
      const data = await response.json();
      generateConfessions(data);
    }
    window.location.hash = "";
    window.location.hash = "#wrapper";
  });
});
