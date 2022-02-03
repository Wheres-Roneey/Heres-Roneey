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
      "https://safe-wave-84228.herokuapp.com/messages",
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
  window.location.reload();
};

const handleReply = async (e) => {
  const card = e.target.parentElement.parentElement;
  const comment = e.target.parentElement.querySelector(".input").value;
  const cardId = card.id;
  const postRequest = await fetch(
    "https://safe-wave-84228.herokuapp.com/messages/reply",
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

const handleRating = async (e) => {
  const card = e.target.parentElement.parentElement.parentElement;
  const cardId = card.id;
  const buttonBar = e.target.parentElement.parentElement;
  const clickID = e.target.parentElement.querySelector(".clicks").id;
  let astonishCount = parseInt(buttonBar.querySelector("#click0").innerText);
  let heartEyeCount = parseInt(buttonBar.querySelector("#click1").innerText);
  let thumbsDownCount = parseInt(buttonBar.querySelector("#click2").innerText);

  if (clickID == "click0") {
    astonishCount++;
  } else if (clickID == "click1") {
    heartEyeCount++;
  } else {
    thumbsDownCount++;
  }

  const postRequest = await fetch(
    "https://safe-wave-84228.herokuapp.com/messages/react",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: cardId,
        astonish: astonishCount,
        heartEye: heartEyeCount,
        thumbsDown: thumbsDownCount
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

module.exports = { handleConfess, appendComments, handleReply, handleRating };
