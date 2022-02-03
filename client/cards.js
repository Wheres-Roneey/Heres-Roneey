const { appendComments } = require("./client_helpers");
const { handleReply } = require("./client_helpers");
const { showForm } = require("./form");

const createTo = (to) => {
  // TODO: check that there is no other h2s, if is change this to a h3
  let toElem = document.createElement("h2");
  toElem.classList.add("toElem", "card_child");
  toElem.innerText = `TO: ${to.toUpperCase()}`;
  return toElem;
};

// the to header of card

const createCommentSection = (replies) => {
  let commentSection = document.createElement("div");
  commentSection.classList.add("comment-sect", "hide");
  let comments = document.createElement("div");
  comments.classList.add("comment");

  // creates comment section

  if (replies.length != 0) {
    replies.forEach((reply) => {
      appendComments(reply, comments);
    });
  }
  // checks if reply exists

  let newCommentSection = document.createElement("textarea");
  newCommentSection.classList.add("input");
  newCommentSection.type = "text";
  newCommentSection.placeholder = "Write a comment";
  newCommentSection.maxLength = "200";
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

  // submit section for the comment  - above it , is the existing comments
};

const createMessage = (body) => {
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
// creating a new card

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

const loadGif = (gif) => {
  let img = document.createElement("img");
  img.classList.add("gif_img");
  img.src = gif;

  return img;
};

const createCard = (index, to, body, tag, replies, gif) => {
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
  if (!card.querySelector(".tag_span")) {
    card.classList.add("no_tag");
  } else {
    let tagType = card.querySelector(".tag_span").innerText.slice(1);
    card.classList.add(`tag_${tagType}`);
  }
  let commentSection = createCommentSection(replies);
  wrapper.prepend(card);
  card.append(commentSection);
};

const addCard = () => {
  let wrapper = document.querySelector(".wrapper");

  let addDiv = document.createElement("div");
  addDiv.classList.add("add_div", "card", "no_tag");
  addDiv.innerText = "+";
  addDiv.addEventListener("click", showForm);
  wrapper.prepend(addDiv);
};

module.exports = { addCard, createCard };
