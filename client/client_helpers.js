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

document.querySelector(".sub-comment").addEventListener("click", () => {
  let commentBox = document.querySelector(".comment");
  commentBox.classList.add("commentClicked");
  const textbox = document.querySelector(".input");
  const anotherOne = document.createElement("p");
  anotherOne.classList.add("comments");
  anotherOne.innerText = textbox.value;
  commentBox.appendChild(anotherOne);
  textbox.value = "";
});

module.exports = { handleConfess };
