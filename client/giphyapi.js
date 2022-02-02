const giphyKey = "UTn30CTrQ5AweWYK7c50BaP6Fd28hUr3";

async function giphySearch(keyword) {
  try {
    const resp = await fetch(
      `http://api.giphy.com/v1/gifs/search?q=${keyword}&api_key=${giphyKey}`
    );
    const jsonData = await resp.json();
    const gifLink = jsonData.data[0].images.downsized.url;
    return gifLink;
  } catch (err) {
    nf = "not found";
    console.log(err.message);
    const resp1 = await fetch(
      `http://api.giphy.com/v1/gifs/search?q=${nf}&api_key=${giphyKey}`
    );
  }
}

const gifFrom = (e) => {
  e.preventDefault();
  const card = e.currentTarget.parentElement;
  let oldForm = document.querySelector(".gif_form");
  if (oldForm) card.removeChild(oldForm);
  const form = document.createElement("form");
  form.classList.add("gif_form");

  const input = document.createElement("input");
  input.id = "search";
  input.type = "search";
  input.required = true;
  input.placeholder = "Post Gif";
  form.append(input);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    giphySearch(e.target.querySelector("#search").value, card);
    const form = e.target.querySelector("#search").parentElement;
    card.removeChild(form);
  });
  card.appendChild(form);
};

module.exports = { giphySearch, gifFrom };
