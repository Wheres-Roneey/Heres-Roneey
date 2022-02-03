function darkMode() {
  const body = document.querySelector("body");
  body.className = "dark";
  const icon = document.querySelector(".toggle_icon");
  icon.classList.add("fa-sun");
  icon.classList.remove("fa-moon");
}

function lightMode() {
  const body = document.querySelector("body");
  body.className = "light";
  const icon = document.querySelector(".toggle_icon");
  icon.classList.remove("fa-sun");
  icon.classList.add("fa-moon");
}

function switchMode() {
  const body = document.querySelector("body");
  body.className == "dark" ? lightMode() : darkMode();
}

function lightDark() {
  const modeCheck = document.getElementById("light-mode");
  modeCheck.addEventListener("click", switchMode);
}
lightDark();

module.exports = { lightDark };
