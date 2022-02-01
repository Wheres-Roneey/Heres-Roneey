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
