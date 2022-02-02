const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  giphySearch(e.target.querySelector("#search").value);
});

const giphyKey = "UTn30CTrQ5AweWYK7c50BaP6Fd28hUr3";

async function giphySearch(keyword) {
  try {
    const resp = await fetch(
      `http://api.giphy.com/v1/gifs/search?q=${keyword}&api_key=${giphyKey}`
    );
    const jsonData = await resp.json();
    // console.log(jsonData);
    // console.log("META", jsonData.meta);
    if (jsonData.data.length == 0) {
      throw new Error("not found");
    }
    let img = document.createElement("img");
    img.src = jsonData.data[0].images.downsized.url;
    let out = document.querySelector(".out");
    out.insertAdjacentElement("afterbegin", img);
    document.querySelector("#search").value = " ";
  } catch (err) {
    nf = "not found";
    console.log(err.message);
    const resp1 = await fetch(
      `http://api.giphy.com/v1/gifs/search?q=${nf}&api_key=${giphyKey}`
    );
    const jsonData1 = await resp1.json();
    // console.log(jsonData1);
    // console.log("META", jsonData1.meta);
    let img = document.createElement("img");
    img.src = jsonData1.data[0].images.downsized.url;
    let out = document.querySelector(".out");
    out.insertAdjacentElement("afterbegin", img);
    document.querySelector("#search").value = " ";
  }
}

module.exports = { giphySearch };
