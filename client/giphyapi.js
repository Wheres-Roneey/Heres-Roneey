// const { response } = require("express");

// function sendApiRequest(){
//   let giphyInput = document.getElementById("input").value
//   console.log(giphyInput)

const form = document.querySelector("form");
form.addEventListener("click", (e) => {
  e.preventDefault();
  giphySearch(e.target.value);
});

const giphyKey = "UTn30CTrQ5AweWYK7c50BaP6Fd28hUr3";

function giphySearch(keyword) {
  fetch(`http://api.giphy.com/v1/gifs/search?q=${keyword}&api_key=${giphyKey}`)
    .then((resp) => resp.json())
    .then((data) => console.log(data));
}

module.exports = { giphySearch };
