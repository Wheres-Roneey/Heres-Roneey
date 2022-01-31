const createTo = (to) => {
  // TODO: check that there is no other h2s, if is change this to a h3
  let toElem = document.createElement("h2");
  toElem.classList.add("toElem", "card_child");
  toElem.innerText = `TO: ${to}`;

  return toElem;
};

const createMessage = (body) => {
  const badWords = ["jQuery"];

  let message = document.createElement("p");
  message.classList.add("message_elem", "card_child");
  let newBody = body;
  badWords.forEach((word) => {
    newBody = body.replace(word, "***");
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

const createCard = (to, body, tag) => {
  let wrapper = document.querySelector(".wrapper");

  let card = document.createElement("div");
  card.classList.add("card");
  card.append(createTo(to), createMessage(body), createTag(tag));

  wrapper.prepend(card);
};

const addCard = () => {
  let wrapper = document.querySelector(".wrapper");

  let addDiv = document.createElement("div");
  addDiv.classList.add("add_div", "card");
  addDiv.innerText = "+";
  addDiv.addEventListener("click", showForm);
  wrapper.prepend(addDiv);
};

// Create form elements:
const generateTo = () => {
  const formDiv = document.createElement("div");
  formDiv.classList.add("form_elem");

  const toLabel = document.createElement("label");
  toLabel.for = "to";
  toLabel.innerText = "TO:";
  formDiv.appendChild(toLabel);

  const toInput = document.createElement("input");
  toInput.type = "text";
  toInput.id = "to";
  toInput.name = "to";
  toInput.maxLength = "3";
  toInput.required = true;
  formDiv.appendChild(toInput);

  return formDiv;
};
const generateMessage = () => {
  const formDiv = document.createElement("div");
  formDiv.classList.add("form_elem");

  const messageLabel = document.createElement("label");
  messageLabel.for = "message";
  messageLabel.innerText = "Message:";
  formDiv.appendChild(messageLabel);

  const messageArea = document.createElement("textarea");
  messageArea.id = "message";
  messageArea.name = "message";
  messageArea.maxLength = "200";
  messageArea.required = true;
  formDiv.appendChild(messageArea);

  return formDiv;
};

const generateSelect = (options) => {
  const select = document.createElement("select");
  select.name = "tags";
  select.id = "tags";
  select.multiple = true;

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
  formDiv.classList.add("form_elem");

  const tagsLabel = document.createElement("label");
  tagsLabel.for = "tags";
  tagsLabel.innerText = "Tags:";
  formDiv.appendChild(tagsLabel);

  const tags = [
    "motivated",
    "regrets",
    "mentalhealth",
    "vent",
    "goodnews",
    "COVID",
  ];
  const select = generateSelect(tags);
  formDiv.appendChild(select);

  return formDiv;
};

const generateForm = () => {
  let wrapper = document.querySelector(".wrapper");
  const form = document.createElement("form");
  form.classList.add("card");

  const submit = document.createElement("input");
  submit.type = "submit";
  submit.value = "Confess";
  submit.id = "confess_btn";
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

const handleConfess = async (e) => {
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
};

const loadPage = async () => {
  const response = await fetch("http://localhost:3000/messages");
  const data = await response.json();
  data.forEach((card) => {
    let to = card["to"];
    let message = card["body"];
    let tags = card["tags"];

    createCard(to, message, tags);
  });
  addCard();
};

loadPage();
