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
    let replies = card["replies"];
    let gif = card["gif"];
    if (!gif) gif = "";
    createCard(index, to, message, tags, replies, gif);
  });
  addCard();
};
const loadPage = async () => {
  const response = await fetch("http://localhost:3000/messages");
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
        `http://localhost:3000/messages/tags/${tagTarget}`
      );
      const data = await response.json();
      generateConfessions(data);
      location.hash = "";
    }
    location.hash = "#wrapper";
  });
});

// document.querySelector(".sub-comment").addEventListener("click", () => {
//   let commentBox = document.querySelector(".comment");
//   const textbox = document.querySelector(".input");
//   commentBox.classList.add("commentClicked");
//   appendComments(textbox.value, commentBox);
//   textbox.value = "";
// });
