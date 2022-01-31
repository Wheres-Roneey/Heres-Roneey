let fakeData = [
  {
    to: "to one",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ac consectetur nunc. Maecenas vulputate enim non lorem consectetur, at vulputate diam mollis. Integer congue accumsan lectus vel dignis",
    tags: "sad",
  },
  {
    to: "to two",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ac consectetur nunc. Maecenas vulputate enim non lorem consectetur, at vulputate diam mollis. Integer congue accumsan lectus vel dignis",
    tags: "truth",
  },
  {
    to: "to three",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ac consectetur nunc. Maecenas vulputate enim non lorem consectetur, at vulputate diam mollis. Integer congue accumsan lectus vel dignis",
    tags: "sad",
  },
  {
    to: "to four",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ac consectetur nunc. Maecenas vulputate enim non lorem consectetur, at vulputate diam mollis. Integer congue accumsan lectus vel dignis",
    tags: "happy",
  },
  {
    to: "to one",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ac consectetur nunc. Maecenas vulputate enim non lorem consectetur, at vulputate diam mollis. Integer congue accumsan lectus vel dignis",
    tags: "sad",
  },
  {
    to: "to two",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ac consectetur nunc. Maecenas vulputate enim non lorem consectetur, at vulputate diam mollis. Integer congue accumsan lectus vel dignis",
    tags: "truth",
  },
  {
    to: "to three",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ac consectetur nunc. Maecenas vulputate enim non lorem consectetur, at vulputate diam mollis. Integer congue accumsan lectus vel dignis",
    tags: "sad",
  },
  {
    to: "to four",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ac consectetur nunc. Maecenas vulputate enim non lorem consectetur, at vulputate diam mollis. Integer congue accumsan lectus vel dignis",
    tags: "happy",
  },
];

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

fakeData.forEach((card) => {
  let to = card["to"];
  let message = card["message"];
  let tags = card["tags"];

  createCard(to, message, tags);
});
