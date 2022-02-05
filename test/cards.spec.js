/**
 * @jest-environment jsdom
 */

const cards = require("../client/cards");
describe("the cards", () => {
  describe("createTo function", () => {
    let toElem;
    beforeEach(() => {
      document.body.innerHTML = ``;
      document.body.appendChild(cards.createTo("ew"));
      toElem = document.querySelector("h2");
    });
    it("contains a h2 element", () => {
      expect(toElem).not.toBe(null);
    });
    it("the h2 element returns EW", () => {
      expect(toElem.innerText).toBe("TO: EW");
    });
  });

  describe("createMessage function", () => {
    let messageElem;
    beforeEach(() => {
      document.body.innerHTML = ``;
      document.body.appendChild(
        cards.createMessage("I like cats, but I like dogs more")
      );
      messageElem = document.querySelector("p");
    });
    it("contains a p element", () => {
      expect(messageElem).not.toBe(null);
    });
    it("the function returns I like cats, but I like dogs more", () => {
      expect(messageElem.innerText).toBe("I like cats, but I like dogs more");
    });
    it("censors jQuery", () => {
      document.body.innerHTML = ``;
      document.body.appendChild(
        cards.createMessage("I like cats, but I like jQuery more")
      );
      messageElem = document.querySelector("p");
      expect(messageElem.innerText).toBe("I like cats, but I like ****** more");
    });
  });

  describe("createTag function", () => {
    let tagElem;
    let span;
    beforeEach(() => {
      document.body.innerHTML = ``;
      document.body.appendChild(cards.createTag("cats"));
      tagElem = document.querySelector("div");
      span = tagElem.querySelector("span");
    });
    it("contains a div element", () => {
      expect(tagElem).not.toBe(null);
    });
    it("it has a nested span element", () => {
      expect(span).not.toBe(null);
    });
    it("has a tag of cats", () => {
      expect(span.innerText).toBe("#cats");
    });
    it("returns no tag for an empty string", () => {
      document.body.innerHTML = ``;
      document.body.appendChild(cards.createTag(""));
      tagElem = document.querySelector("div");
      span = tagElem.querySelector("span");
      expect(span.innerText).toBe("");
    });
  });

  describe("createCommentSection function", () => {
    let commentSect;
    beforeEach(() => {
      document.body.innerHTML = ``;
      document.body.appendChild(
        cards.createCommentSection(["hello", "edward"])
      );
      commentSect = document.querySelector(".comment-sect");
      comments = document.querySelector(".comment");
    });
    it("contains returns div element", () => {
      expect(commentSect).not.toBe(null);
    });
    it("contains a nested div for comments", () => {
      expect(comments).not.toBe(null);
    });
    it("has two comments", () => {
      expect(comments.childElementCount).toBe(2);
    });
  });

  describe("createReacts function", () => {
    let emojiElem;
    beforeEach(() => {
      document.body.innerHTML = ``;
      document.body.appendChild(
        cards.createReacts([
          ["em em--1", 0],
          ["em em-astonished", 1],
          ["em em-heart_eyes", 4]
        ])
      );
      emojiElem = document.querySelector("div");
    });
    it("contains returns div element", () => {
      expect(emojiElem).not.toBe(null);
    });
    it("contains three btns", () => {
      expect(emojiElem.childElementCount).toBe(3);
    });
  });

  describe("replyBtn function", () => {
    let replyElem;
    beforeEach(() => {
      document.body.innerHTML = ``;
      document.body.appendChild(cards.replyBtn());
      replyElem = document.querySelector("button");
    });
    it("contains returns a button element", () => {
      expect(replyElem).not.toBe(null);
    });
  });

  describe("loadGif function", () => {
    let gifElem;
    beforeEach(() => {
      document.body.innerHTML = ``;
      document.body.appendChild(cards.loadGif("afakeurl"));
      gifElem = document.querySelector("img");
    });
    it("contains returns an image element", () => {
      expect(gifElem).not.toBe(null);
    });
    it("has an src of afakeurl", () => {
      expect(gifElem.src).toContain("afakeurl");
    });
  });

  describe("createCard function", () => {
    let cardElem;
    beforeEach(() => {
      document.body.innerHTML = `<div class="wrapper" id="wrapper"></div>`;
      cards.createCard(
        "0",
        "ja",
        "hello, this is my test",
        "motivated",
        ["hi", "car"],
        "url",
        "[0,1,0]"
      );
      cardElem = document.querySelector(".card");
    });
    it("contains appends an element with class card", () => {
      expect(cardElem).not.toBe(null);
    });
    it("contains the to elem", () => {
      expect(cardElem.querySelector(".toElem")).not.toBe(null);
    });
    it("contains the message elem", () => {
      expect(cardElem.querySelector(".message_elem")).not.toBe(null);
    });
    it("contains the gif image", () => {
      expect(cardElem.querySelector(".gif_img")).not.toBe(null);
    });
    it("contains the tag elem", () => {
      expect(cardElem.querySelector(".tag_elem")).not.toBe(null);
    });
    it("contains the reply btn elem", () => {
      expect(cardElem.querySelector(".reply_btn")).not.toBe(null);
    });
    it("contains the emoji button elem", () => {
      expect(cardElem.querySelector(".emoji_btns")).not.toBe(null);
    });
  });

  describe("addCard function", () => {
    let addDiv;
    beforeEach(() => {
      document.body.innerHTML = `<div class="wrapper" id="wrapper"></div>`;
      cards.addCard();
      addDiv = document.querySelector(".add_div");
    });
    it("returns a div with class add_div", () => {
      expect(addDiv).not.toBe(null);
    });
    it("contains a plus", () => {
      expect(addDiv.innerText).toBe("+");
    });
  });
});
