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
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        to: to,
        body: message,
        tags: tags
      })
    });
  }
};

const handleReply = async (e) => {
  const card = e.target.parentElement.parentElement;
  const comment = e.target.parentElement.querySelector(".input").value;
  const cardId = card.id;
  const postRequest = await fetch("http://localhost:3000/messages/reply", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id: cardId,
      replies: comment
    })
  });
};

const appendComments = (comment, container) => {
  const anotherOne = document.createElement("p");
  anotherOne.classList.add("comments");
  anotherOne.innerText = comment;
  container.appendChild(anotherOne);
};

module.exports = { handleConfess, appendComments, handleReply };
