/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const path = require("path");
const html = fs.readFileSync(
  path.resolve(__dirname, "../client/index.html"),
  "utf8"
);
const cards = require("../client/cards");
const lightMode = require("../client/lightMode");

// describe("who the card is for  "), () => {
//   it("dedicates who the card for"), () => {
//     let
//   }
// }

// describe('card dedicated to'), ()=> {
//   expect(createElement.add("toElem", "card_child")).toBe("h2")
// }

// if you require here, the file will not have access to `document`

describe("index.html", () => {
  beforeEach(() => {
    document.documentElement.innerHTML = html.toString();
  });

  test("it has a header title", () => {
    let header = document.querySelector("header");
    expect(header.textContent).toContain("h1");
  });
});

describe("creates a new card", () => {
  describe("able to confess when creating", () => {
    beforeEach(() => {
      document.documentElement.innerHTML =
        '<div class="btns"><button class="btn1 btn">healthcare</button>';
      global.btns = document.querySelector(".btns");
    });

    test("createCard returns a new card element with passed index, to, body, tag, replies and gif ", () => {
      const newCard = cards.newCard("card");
      expect(newCard.querySelector("wrapper").className).toBe(".wrapper");
      expect(newCard.createElement("card").className).toBe("div");
      expect(newCard.textContent).toContain("index");
    });

    test("addItem adds new features to the DOM", () => {
      helpers.addItem();
      expect(btns.querySelector("to").length).toBe(createTo);
      expect(btns.querySelector("body").length).toBe(createMessage);
      expect(btns.querySelector("gif").length).toBe(loadGif);
      expect(btns.querySelector("tag").length).toBe(createTag);
      expect(btns.querySelector(" ").length).toBe(replyBtn);
    });
  });

  describe("dark mode helpers", () => {
    let main, modeBtn, dark;
    beforeEach(() => {
      document.documentElement.innerHTML =
        '<body class="dark"><button type="button" id="light-mode"><i class="fas fa-moon"></i></button>';
      body = document.querySelector("dark");
      lightMode = document.querySelector("#light-mode");
    });

    test("switchMode returns a boolean value", () => {
      dark = true;
      expect(darkMode.lightMode(dark)).toEqual(false);
      dark = false;
      expect(darkMode.lightMode(dark)).toEqual(true);
    });

    test("darkMode updates text color and button text", () => {
      helpers.darkMode();
      expect(body.style.color).toBe("dark");
      expect(body.style.backgroundColor).not.toBe("white");
      expect(lightMode.textContent).toBe("Switch to Light Mode");
    });

    test("lightMode updates text color and button text", () => {
      helpers.lightMode();
      expect(body.style.color).not.toBe("white");
      expect(main.style.backgroundColor).toBe("white");
      expect(lightMode.textContent).toBe("Switch to Dark Mode");
    });
  });
});
