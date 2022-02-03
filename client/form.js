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
