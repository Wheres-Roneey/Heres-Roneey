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

const appendComments = (comment, container) => {
  const anotherOne = document.createElement("p");
  anotherOne.classList.add("comments");
  anotherOne.innerText = comment;
  container.appendChild(anotherOne);
};

const clicktag = document.querySelector("#click1");

let click1 = parseInt(clicktag.innerText);
let clicksEl = document.querySelector("#emj1");
clicksEl.addEventListener("click", () => {
  click1++;
  clicktag.innerText = click1;
});
const clicktag2 = document.querySelector("#click2");
let click2 = parseInt(clicktag2.innerText);
let clicksE2 = document.querySelector("#emj2");
clicksE2.addEventListener("click", () => {
  click2++;
  clicktag2.innerText = click2;
});

const clicktag3 = document.querySelector("#click3");
let click3 = parseInt(clicktag3.innerText);
let clicksE3 = document.querySelector("#emj3");
clicksE3.addEventListener("click", () => {
  click3++;
  clicktag3.innerText = click3;
});

module.exports = { handleConfess, appendComments };
