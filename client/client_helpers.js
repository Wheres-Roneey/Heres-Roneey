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

module.exports = { handleConfess };
