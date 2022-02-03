const { createCard } = require("./cards");
const { giphySearch } = require("./giphyapi");

// Function to handle the form for new confessions
const handleConfess = async (e) => {
  if (e.target.parentElement.checkValidity()) {
    e.preventDefault();
    // selecting user input
    const to = document.querySelector("#to").value;
    const message = document.querySelector("#message").value;
    const select = document.querySelectorAll(".tag_option");
    const searchElem = document.querySelector("#search");

    // handling cases where no gif was chosen
    let gifLink;
    let searchTerm;
    if (!searchElem) {
      gifLink = "";
    } else {
      searchTerm = searchElem.value;
      gifLink = await giphySearch(searchTerm);
    }
    // creating an array of tags
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
    // This is to force the window to scroll back to the cards on reload
    window.location.hash = "";
    window.location.hash = "#wrapper";
    window.location.reload();
    window.location.hash = "";
    window.location.hash = "#wrapper";
  }
};

// A function to handle the replies to a message
const handleReply = async (e) => {
  const card = e.target.parentElement.parentElement;
  const comment = e.target.parentElement.querySelector(".input").value;
  const cardId = card.id;
  const commentSection = card.querySelector(".comment-sect");
  // Sends the comments to be added to the messages.json
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
  // also adds comment to the current load so you can see what you send
  appendComments(comment, commentSection.querySelector(".comment"));
  commentSection.querySelector(".input").value = "";
};

// a function to handle what happens when you click on the emoji
const handleRating = async (e) => {
  const card = e.target.parentElement.parentElement.parentElement;
  const cardId = card.id;
  const buttonBar = e.target.parentElement.parentElement;
  const clickID = e.target.parentElement.querySelector(".clicks").id;
  // getting the emoji count and making it an integer
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
  // posting the increase to the server
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
  // also updating client side so that they don't need page reload
  buttonBar.querySelector("#click0").innerText = astonishCount;
  buttonBar.querySelector("#click1").innerText = heartEyeCount;
  buttonBar.querySelector("#click2").innerText = thumbsDownCount;
};

// A function to add the comments to the confessions
const appendComments = (comment, container) => {
  const anotherOne = document.createElement("p");
  anotherOne.classList.add("comments");
  anotherOne.innerText = comment;
  container.appendChild(anotherOne);
};

module.exports = { handleConfess, appendComments, handleReply, handleRating };
