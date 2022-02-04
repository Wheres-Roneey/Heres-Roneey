/**
 * @jest-environment jsdom
 */
const cards = require("../client/cards");
describe("the cards", () => {
  describe("create TO space in the card", () => {
    let thetoDiv;
    beforeEach(() => {
      document.body.innerHTML = "";
      document.body.appendChild(cards.createTo("ew"));
      thetoDiv = document.querySelector("h2");
    });
    it("has a class of to elem", () => {
      let toElem = document.querySelector(".toElem");
      expect(toElem).not.toBe(null);
    });

    it("has card_child", () => {
      let card_child = document.querySelector(".card_child");
      expect(card_child).not.toBe(null);
    });

    it("has message element", () => {
      let message_elem = document.querySelector(".message_elem");
      expect(message_elem).not.toBe(null);
    });

    it("has tag_elem", () => {
      let tag_elem = document.querySelector(".tag_elem");
      expect(tag_elem).not.toBe(null);
    });

    it("has tag_span", () => {
      let tag_span = document.querySelector(".tag_span");
      expect(tag_span).not.toBe(null);
    });

    it("has tag_span", () => {
      let tag_span = document.querySelector(".tag_span");
      expect(tag_span).not.toBe(null);
    });
  });
});

// describe("generate message for bad words function", () => {
//   let messagesDiv;
//   beforeEach(() => {
//     document.body.innerHTML = "";
//     document.body.appendChild(cards.createMessage());
//     messagesDiv = document.querySelector("p");
//   });

//   it("message  for bad words", () => {
//     let message_elem = document.querySelector(".message_elem");
//     expect(message_elem).not.toBe(null);
//   });

//   // it("has a filter for bad words", () => {
//   //   let badWords = document.querySelector(".badWords");
//   //   expect(badWords).toBe(null);
//   // });

// describe("generates tag section", () => {
//   let tagSect;
//   beforeEach(() => {
//     document.body.innerHTML = "";
//     document.body.appendChild(cards.createTag());
//     tagSect = document.querySelector("div");
//   });

//   it("creates tag section ", () => {
//     let tag_elem = document.querySelector(".tag_elem");
//     expect(tag_elem).not.toBe(null);
//   });
// });

// describe("generates tag area", () => {
//   let tagSection;
//   beforeEach(() => {
//     document.body.innerHTML = "";
//     document.body.appendChild(cards.createTag());
//     tagSection = document.querySelector("span");
//   });

//   it("creates tag section - span area ", () => {
//     let tag_span = document.querySelector(".tag_span");
//     expect(tag_span).not.toBe(null);
//   });
// });

// describe("generates comment section on confessions", () => {
//   let commentSect;
//   beforeEach(() => {
//     document.body.innerHTML = "";
//     document.body.appendChild(cards.createCommentSection());
//     commentSect = document.querySelector("div");
//   });

//   it(" actual comment ", () => {
//     let commentSection = document.querySelector(". commentSection");
//     expect(commentSection).not.toBe(null);
//   });
// });

// // describe("cards.js", () => {
// //   beforeEach(() => {
// //     document.documentElement.innerHTML = html.toString();
// //   });
// //   test("who the card is for ", () => {
// //     const wrapper = document.getElementsByClassName("wrapper");
// //     document.getElement("h2");

// //     var character = "TO:";
// //     if (character == character.toUpperCase()) {
// //       alert("upper case true");
// //     }
// //     if (character == character.toLowerCase()) {
// //       alert("lower case detected");
// //     }
// //     expect(wrapper.innerHTML).toBe(".wrapper");
// //   });
// // });
