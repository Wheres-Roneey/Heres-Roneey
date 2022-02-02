const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  giphySearch(e.target.querySelector("#search").value);
});

const giphyKey = "UTn30CTrQ5AweWYK7c50BaP6Fd28hUr3";

async function giphySearch(keyword) {
  const resp = await fetch(
    `http://api.giphy.com/v1/gifs/search?q=${keyword}&api_key=${giphyKey}`
  );
  const jsonData = await resp.json();
  console.log(jsonData);
  console.log("META", jsonData.meta);
  let img = document.createElement("img");
  img.src = jsonData.data[0].images.downsized.url;
  let out = document.querySelector(".out");
  out.insertAdjacentElement("afterbegin", img);
  document.querySelector("#search").value = " ";
}

module.exports = { giphySearch };
