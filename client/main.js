const { addCard, createCard } = require("./cards");
const { lightDark } = require("./lightMode");

const loadPage = async () => {
  const response = await fetch("http://localhost:3000/messages");
  const data = await response.json();
  data.forEach((card, index) => {
    let to = card["to"];
    let message = card["body"];
    let tags = card["tags"];

    createCard(index, to, message, tags);
  });
  addCard();
};

loadPage();

const btns = document.querySelectorAll(".btns");
btns.forEach((btn) => {
  btn.addEventListener("click", async (e) => {
    const tagTarget = e.target.innerText.slice(1);
    const response = await fetch(
      `http://localhost:3000/messages/tags/${tagTarget}`
    );
    const data = await response.json();
    data.forEach((card, index) => {
      let to = card["to"];
      let message = card["body"];
      let tags = card["tags"];

      createCard(index, to, message, tags);
    });
    addCard();
  });
});
