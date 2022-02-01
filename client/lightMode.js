function darkMode() {
  const body = document.querySelector("body");
  body.className = "dark";
}

function lightMode() {
  const body = document.querySelector("body");
  body.className = "light";
}

function switchMode(e) {
  console.log("mode");
  e.target.checked ? lightMode() : darkMode();
}

function lightDark() {
  const modeCheck = document.getElementById("light-mode");
  modeCheck.addEventListener("click", switchMode);
}
lightDark();

module.exports = { lightDark };
