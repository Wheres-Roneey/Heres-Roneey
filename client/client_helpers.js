const { doc } = require("prettier");
const { giphySearch } = require("./giphyapi");

const handleConfess = async (e) => {
  if (e.target.parentElement.checkValidity()) {
    e.preventDefault();
    // selecting user input
    const to = document.querySelector("#to").value;
    const message = document.querySelector("#message").value;
    const select = document.querySelectorAll(".tag_option");

    const searchElem = document.querySelector("#search");
    let gifLink;
    let searchTerm;
    if (!searchElem) {
      console.log("not gif");
      gifLink = "";
    } else {
      console.log("here");
      searchTerm = searchElem.value;
      gifLink = await giphySearch(searchTerm);
    }
    let tags = [];
    select.forEach((option) => {
      if (option.selected) tags.push(option.value);
    });

    // submitting post request
    const postRequest = await fetch(
      "https://powerful-peak-34201.herokuapp.com/messages",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          to: to,
          body: message,
          tags: tags,
          gif: gifLink
        })
      }
    );
  }
};

const handleReply = async (e) => {
  const card = e.target.parentElement.parentElement;
  const comment = e.target.parentElement.querySelector(".input").value;
  const cardId = card.id;
  const postRequest = await fetch(
    "https://powerful-peak-34201.herokuapp.com/messages/reply",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: cardId,
        replies: comment
      })
    }
  );
};

const appendComments = (comment, container) => {
  const anotherOne = document.createElement("p");
  anotherOne.classList.add("comments");
  anotherOne.innerText = comment;
  container.appendChild(anotherOne);
};

const clicktag = document.querySelector("#click1");

let click1 = parseInt(clicktag.innerText);
let clicksEl = document.querySelector("#emj1");
clicksEl.addEventListener("click", () => {
  click1++;
  clicktag.innerText = click1;
});
const clicktag2 = document.querySelector("#click2");
let click2 = parseInt(clicktag2.innerText);
let clicksE2 = document.querySelector("#emj2");
clicksE2.addEventListener("click", () => {
  click2++;
  clicktag2.innerText = click2;
});

const clicktag3 = document.querySelector("#click3");
let click3 = parseInt(clicktag3.innerText);
let clicksE3 = document.querySelector("#emj3");
clicksE3.addEventListener("click", () => {
  click3++;
  clicktag3.innerText = click3;
});

module.exports = { handleConfess, appendComments, handleReply };
