(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const { appendComments } = require("./client_helpers");
const { handleReply, handleRating } = require("./client_helpers");
const { showForm } = require("./form");

// Creates the 'TO:' section on confessions
const createTo = (to) => {
  let toElem = document.createElement("h2");
  toElem.classList.add("toElem", "card_child");
  toElem.innerText = `TO: ${to.toUpperCase()}`;

  return toElem;
};

// Creates the message part on confessions
const createMessage = (body) => {
  // Declare words to censor
  const badWords = ["jQuery"];

  let message = document.createElement("p");
  message.classList.add("message_elem", "card_child");

  let newBody = body;
  badWords.forEach((word) => {
    let stars = "";
    for (let i = 0; i < word.length; i++) stars += "*";
    newBody = body.replace(word, stars);
  });
  message.innerText = newBody;

  return message;
};
// Creates the tag section of the confessions
const createTag = (tagArr) => {
  let tagElem = document.createElement("div");
  tagElem.classList.add("tag_elem", "card_child");

  tagArr.forEach((tag) => {
    let span = document.createElement("span");
    span.classList.add("tag_span");
    span.innerText = `#${tag}`;
    tagElem.appendChild(span);
  });

  return tagElem;
};
// Creates the comment section on confessions
const createCommentSection = (replies) => {
  let commentSection = document.createElement("div");
  commentSection.classList.add("comment-sect", "hide");

  let comments = document.createElement("div");
  comments.classList.add("comment");

  if (replies.length != 0) {
    replies.forEach((reply) => {
      appendComments(reply, comments);
    });
  }

  let newCommentSection = document.createElement("textarea");
  newCommentSection.classList.add("input");
  newCommentSection.type = "text";
  newCommentSection.placeholder = "Write a comment";
  newCommentSection.maxLength = "100";
  newCommentSection.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      handleReply(e);
    }
  });

  let submitButton = document.createElement("button");
  submitButton.classList.add("sub-comment");
  submitButton.type = "submit";
  submitButton.innerText = "Respond";
  submitButton.addEventListener("click", handleReply);

  commentSection.appendChild(comments);
  commentSection.appendChild(newCommentSection);
  commentSection.appendChild(submitButton);

  return commentSection;
};

// Creates the emoji react options. The parameter should be an array.
const createReacts = (emojis) => {
  const emojiBar = document.createElement("div");
  emojiBar.classList.add("emoji_btns");

  for (let i = 0; i < emojis.length; i++) {
    const emojiBtn = document.createElement("button");
    emojiBtn.classList.add("emoji");
    emojiBtn.id = "emoji";

    const emojiLogo = document.createElement("i");
    let classArray = emojis[i][0].split(" ");
    emojiLogo.classList.add(classArray[0]);
    emojiLogo.classList.add(classArray[1]);

    const clickCount = document.createElement("p");
    clickCount.classList.add("clicks");
    clickCount.id = `click${i}`;
    clickCount.innerText = emojis[i][1];

    emojiBtn.addEventListener("click", (e) => handleRating(e), { once: true });
    emojiBtn.appendChild(emojiLogo);
    emojiBtn.appendChild(clickCount);
    emojiBar.appendChild(emojiBtn);
  }

  return emojiBar;
};

// Create the reply btn for the cards
const replyBtn = () => {
  let replyBtn = document.createElement("button");
  replyBtn.classList.add("btn", "reply_btn");

  let icon = document.createElement("i");
  icon.classList.add("fas", "fa-reply");
  replyBtn.appendChild(icon);

  replyBtn.addEventListener("click", (e) => {
    const clickedBtn = e.currentTarget;
    const commentSect = clickedBtn.parentElement.querySelector(".comment-sect");
    commentSect.classList.toggle("hide");
    document.querySelectorAll(".comment-sect").forEach((comment) => {
      if (comment !== commentSect) {
        comment.classList.remove("hide");
        comment.classList.add("hide");
      }
    });
  });

  return replyBtn;
};

// add the gif to an img container. The parameter should be a link
const loadGif = (gif) => {
  let img = document.createElement("img");
  img.classList.add("gif_img");
  img.src = gif;

  return img;
};

// Creates the card an prepends it to the existing wrapper
const createCard = (index, to, body, tag, replies, gif, reacts) => {
  let wrapper = document.querySelector(".wrapper");
  let card = document.createElement("div");
  card.classList.add("card");
  card.id = index;
  card.append(
    createTo(to),
    createMessage(body),
    loadGif(gif),
    createTag(tag),
    replyBtn()
  );
  // giving the card a card based on it's tag to colour it
  if (!card.querySelector(".tag_span")) {
    card.classList.add("no_tag");
  } else {
    let tagType = card.querySelector(".tag_span").innerText.slice(1);
    card.classList.add(`tag_${tagType}`);
  }
  // emoji stuff
  let countDown = reacts[0];
  let countAstonished = reacts[1];
  let countHeartEyes = reacts[2];
  let commentSection = createCommentSection(replies);
  let emojis = [
    ["em em--1", countDown],
    ["em em-astonished", countAstonished],
    ["em em-heart_eyes", countHeartEyes]
  ];
  let emojiBar = createReacts(emojis);
  wrapper.prepend(card);
  card.append(commentSection);
  card.appendChild(emojiBar);
};

// Creates a card that lets you create a confession
const addCard = () => {
  let wrapper = document.querySelector(".wrapper");

  let addDiv = document.createElement("div");
  addDiv.classList.add("add_div", "card", "no_tag");
  addDiv.innerText = "+";
  addDiv.addEventListener("click", showForm);

  wrapper.prepend(addDiv);
};

module.exports = { addCard, createCard };

},{"./client_helpers":2,"./form":3}],2:[function(require,module,exports){
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

},{"./cards":1,"./giphyapi":4}],3:[function(require,module,exports){
const { handleConfess } = require("./client_helpers");
const { gifFrom } = require("./giphyapi");

// Create form elements:
const generateTo = () => {
  const formDiv = document.createElement("div");
  formDiv.classList.add("form_elem", "to_form");

  const toLabel = document.createElement("label");
  toLabel.for = "to";
  toLabel.innerText = "TO: ";
  formDiv.appendChild(toLabel);

  const toInput = document.createElement("input");
  toInput.type = "text";
  toInput.id = "to";
  toInput.name = "to";
  toInput.maxLength = "3";
  toInput.required = true;
  toInput.placeholder = "initials";
  formDiv.appendChild(toInput);

  return formDiv;
};

// generate the confession body
const generateMessage = () => {
  const formDiv = document.createElement("div");
  formDiv.classList.add("form_elem", "message_form");

  const messageArea = document.createElement("textarea");
  messageArea.id = "message";
  messageArea.name = "message";
  messageArea.maxLength = "100";
  messageArea.required = true;
  messageArea.placeholder = "Message:";
  formDiv.appendChild(messageArea);

  return formDiv;
};

// generate the select box and options for the tags
const generateSelect = (options) => {
  const select = document.createElement("select");
  select.name = "tags";
  select.id = "tags";

  const selectOption = document.createElement("option");
  selectOption.selected = true;
  selectOption.innerText = "add a tag?";
  select.appendChild(selectOption);
  options.forEach((option) => {
    const optionElem = document.createElement("option");
    optionElem.value = option;
    optionElem.innerText = option;
    optionElem.classList.add("tag_option");
    select.appendChild(optionElem);
  });

  return select;
};

const generateTags = () => {
  const formDiv = document.createElement("div");
  formDiv.classList.add("form_elem", "tags_elem");

  const tagsLabel = document.createElement("label");
  tagsLabel.for = "tags";
  tagsLabel.innerText = "Tag:";
  formDiv.appendChild(tagsLabel);

  const tags = ["motivated", "regrets", "mentalhealth", "vent"];
  const select = generateSelect(tags);
  formDiv.appendChild(select);

  return formDiv;
};

// Adds the giphy logo to the cards for selecting
const giphyLogo = () => {
  let giphyBtn = document.createElement("button");
  giphyBtn.classList.add("btn", "giphy_btn");

  let logo = document.createElement("img");
  logo.src = "./imgs/giphyLogo.svg";
  giphyBtn.appendChild(logo);
  giphyBtn.addEventListener("click", gifFrom);

  return giphyBtn;
};

// Generates the form for the user
const generateForm = () => {
  let wrapper = document.querySelector(".wrapper");
  const form = document.createElement("form");
  form.classList.add("card", "no_tag");

  const submit = document.createElement("input");
  submit.type = "submit";
  submit.value = "Confess";
  submit.id = "confess_btn";
  submit.classList.add("btn");
  submit.addEventListener("click", handleConfess);

  form.appendChild(generateTo());
  form.appendChild(generateMessage());
  form.appendChild(generateTags());
  form.appendChild(submit);
  form.appendChild(giphyLogo());

  wrapper.prepend(form);
};

// this creates the form when the big plus is clicked on
const showForm = () => {
  generateForm();
  document.querySelector(".add_div").classList.add("hide");
};

module.exports = { generateForm, showForm };

},{"./client_helpers":2,"./giphyapi":4}],4:[function(require,module,exports){
const giphyKey = "UTn30CTrQ5AweWYK7c50BaP6Fd28hUr3";

async function giphySearch(keyword) {
  try {
    const resp = await fetch(
      `http://api.giphy.com/v1/gifs/search?q=${keyword}&api_key=${giphyKey}`
    );
    const jsonData = await resp.json();
    const gifLink = jsonData.data[0].images.downsized.url;
    return gifLink;
  } catch (err) {
    nf = "not found";
    const resp1 = await fetch(
      `http://api.giphy.com/v1/gifs/search?q=${nf}&api_key=${giphyKey}`
    );
  }
}

const gifFrom = (e) => {
  e.preventDefault();
  const form = document.createElement("form");
  form.classList.add("gif_form");

  const input = document.createElement("input");
  input.id = "search";
  input.type = "search";
  input.required = true;
  input.placeholder = "Post Gif";
  form.append(input);

  const card = e.currentTarget.parentElement;
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    giphySearch(e.target.querySelector("#search").value, card);
    const form = e.target.querySelector("#search").parentElement;
    card.removeChild(form);
  });
  card.appendChild(form);
};

module.exports = { giphySearch, gifFrom };

},{}],5:[function(require,module,exports){
function darkMode() {
  const body = document.querySelector("body");
  body.className = "dark";
  const icon = document.querySelector(".toggle_icon");
  icon.classList.add("fa-sun");
  icon.classList.remove("fa-moon");
}

function lightMode() {
  const body = document.querySelector("body");
  body.className = "light";
  const icon = document.querySelector(".toggle_icon");
  icon.classList.remove("fa-sun");
  icon.classList.add("fa-moon");
}

function switchMode() {
  const body = document.querySelector("body");
  body.className == "dark" ? lightMode() : darkMode();
}

function lightDark() {
  const modeCheck = document.getElementById("light-mode");
  modeCheck.addEventListener("click", switchMode);
}
lightDark();

module.exports = { lightDark };

},{}],6:[function(require,module,exports){
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
    let reacts = card["reacts"];
    if (!gif) gif = "";
    createCard(index, to, message, tags, replies, gif, reacts);
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

},{"./cards":1,"./client_helpers":2,"./giphyapi":4,"./lightMode":5}]},{},[6]);
