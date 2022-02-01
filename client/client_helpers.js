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
