const createTo = (to) => {
  // TODO: check that there is no other h2s, if is change this to a h3
  let toElem = document.createElement("h2");
  toElem.classList.add("toElem", "card_child");
  toElem.innerText = `TO: ${to}`;

  return toElem;
};

const createMessage = (body) => {
  let message = document.createElement("p");
  message.classList.add("message_elem", "card_child");
  message.innerText = body;

  return message;
};

const createTag = (tag) => {
  let tagElem = document.createElement("div");
  tagElem.classList.add("tagElem_elem", "card_child");
  tagElem.innerText = tag;

  return tagElem;
};

const createCard = (to, body, tag) => {
  let wrapper = document.querySelector(".wrapper");

  let card = document.createElement("div");
  card.classList.add("card");
  card.append(createTo(to), createMessage(body), createTag(tag));

  wrapper.prepend(card);
};

const loadPage = async () => {
  const response = await fetch("http://localhost:3000/messages");
  const data = await response.json();
  data.forEach((card) => {
    let to = card["to"];
    let message = card["message"];
    let tags = card["tags"];

    createCard(to, message, tags);
  });
};

loadPage();
