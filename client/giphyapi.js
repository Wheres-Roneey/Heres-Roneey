const giphyKey = "UTn30CTrQ5AweWYK7c50BaP6Fd28hUr3";

async function giphySearch(keyword) {
  try {
      const resp = await fetch(
    `http://api.giphy.com/v1/gifs/search?q=${keyword}&api_key=${giphyKey}`
  );
  const jsonData = await resp.json();
  let img = document.createElement("img");
  const gifLink = jsonData.data[0].images.downsized.url;
  img.src = gifLink;
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

const gifFrom = (e) => {
  const form = document.createElement("form");
  form.classList.add("gif_form");

  const input = document.createElement("input");
  input.id = "search";
  input.type = "search";
  input.placeholder = "Post Gif";
  form.append(input);

  const btn = document.createElement("button");
  btn.id = "btnSearch";
  btn.innerText = "Giphy!";
  form.appendChild(btn);

  const card = e.currentTarget.parentElement;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    giphySearch(e.target.querySelector("#search").value);
    const form = e.target.querySelector("#search").parentElement;
    card.removeChild(form);
  });
  card.appendChild(form);
};

module.exports = { giphySearch, gifFrom };
