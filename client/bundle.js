(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const { showForm } = require("./form");

const createTo = (to) => {
  // TODO: check that there is no other h2s, if is change this to a h3
  let toElem = document.createElement("h2");
  toElem.classList.add("toElem", "card_child");
  toElem.innerText = `TO: ${to.toUpperCase()}`;
  return toElem;
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

const createCard = (index, to, body, tag) => {
  let wrapper = document.querySelector(".wrapper");

  let card = document.createElement("div");
  card.classList.add("card");
  card.id = index;
  card.append(createTo(to), createMessage(body), createTag(tag));
  if (!card.querySelector(".tag_span")) {
    card.classList.add("no_tag");
  } else {
    let tagType = card.querySelector(".tag_span").innerText.slice(1);
    card.classList.add(`tag_${tagType}`);
  }
  wrapper.prepend(card);
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

},{"./form":3}],2:[function(require,module,exports){
const handleConfess = async (e) => {
  if (e.target.parentElement.checkValidity()) {
    e.preventDefault();
    // selecting user input
    const to = document.querySelector("#to").value;
    const message = document.querySelector("#message").value;
    const select = document.querySelectorAll(".tag_option");
    let tags = [];
    select.forEach((option) => {
      if (option.selected) tags.push(option.value);
    });

    // submitting post request
    const postRequest = await fetch("http://localhost:3000/messages", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: to,
        body: message,
        tags: tags,
      }),
    });
  }
};

document.querySelector(".sub-comment").addEventListener("click", function () {
  document.querySelector(".comment").classList.add("commentClicked");
});
// document
//   .querySelector(".textarea")
//   .addEventListener("keyup.enter", function () {

//     document.querySelector(".comment").classList.add("commentClicked");
//   });
document.querySelector(".input").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    document.querySelector(".comment").classList.add("commentClicked");

    // code for enter
  }
});
new Vue({
  el: "#app",
  data: {
    title: "Write a comment",
    newItem: "",
    item: [],
  },
  methods: {
    addItem() {
      this.item.push(this.newItem);
      this.newItem = "";
    },
  },
});

// window.postComment = function () {
//   var div = document.getElementById("comments");

//   div.innerHTML =
//     div.innerHTML + "<br>" + document.getElementById("comment").value;
// };

module.exports = { handleConfess };

},{}],3:[function(require,module,exports){
const { handleConfess } = require("./client_helpers");

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
const generateMessage = () => {
  const formDiv = document.createElement("div");
  formDiv.classList.add("form_elem", "message_form");

  const messageArea = document.createElement("textarea");
  messageArea.id = "message";
  messageArea.name = "message";
  messageArea.maxLength = "200";
  messageArea.required = true;
  messageArea.placeholder = "Message:";
  formDiv.appendChild(messageArea);

  return formDiv;
};

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

  wrapper.prepend(form);
};
const showForm = () => {
  generateForm();
  document.querySelector(".add_div").classList.add("hide");
};

module.exports = { generateForm, showForm };

},{"./client_helpers":2}],4:[function(require,module,exports){
function darkMode() {
  const body = document.querySelector("body");
  body.className = "dark";
}

function lightMode() {
  const body = document.querySelector("body");
  body.className = "light";
}

function switchMode(e) {
  const body = document.querySelector("body");
  body.className == "dark" ? lightMode() : darkMode();
}

function lightDark() {
  const modeCheck = document.getElementById("light-mode");
  modeCheck.addEventListener("click", switchMode);
}
lightDark();

module.exports = { lightDark };

},{}],5:[function(require,module,exports){
const { addCard, createCard } = require("./cards");
const { lightDark } = require("./lightMode");

const generateConfessions = (data) => {
  document.querySelector(".wrapper").innerHTML = "";
  data.forEach((card, index) => {
    let to = card["to"];
    let message = card["body"];
    let tags = card["tags"];

    createCard(index, to, message, tags);
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
    const response = await fetch(
      `http://localhost:3000/messages/tags/${tagTarget}`
    );
    const data = await response.json();
    generateConfessions(data);
  });
});

},{"./cards":1,"./lightMode":4}]},{},[5]);
