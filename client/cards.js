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
const createTag = (tagStr) => {
  let tagElem = document.createElement("div");
  tagElem.classList.add("tag_elem", "card_child");

  let span = document.createElement("span");
  span.classList.add("tag_span");
  span.innerText = `#${tagStr}`;
  if (!tagStr) span.innerText = "";
  tagElem.appendChild(span);

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
  if (card.querySelector(".tag_span").innerText === "") {
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

module.exports = {
  addCard,
  createCard,
  createTo,
  createMessage,
  createTag,
  createCommentSection,
  createReacts,
  replyBtn,
  loadGif
};
