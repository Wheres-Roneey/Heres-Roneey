/**
 * @jest-environment jsdom
 */
const forms = require("../client/form");
describe("THE FORMS", () => {
  describe("generateTo function", () => {
    let toDiv;
    beforeEach(() => {
      document.body.innerHTML = "";
      document.body.appendChild(forms.generateTo());
      toDiv = document.querySelector("div");
    });
    it("has a class of form elem", () => {
      let formElem = document.querySelector(".form_elem");
      expect(formElem).not.toBe(null);
    });
    it("has a class of to form", () => {
      let toForm = document.querySelector(".to_form");
      expect(toForm).not.toBe(null);
    });
    it("contains a label element", () => {
      let label = toDiv.querySelector("label");
      expect(label).not.toBe(null);
    });
    it("contains an input element with a type of text", () => {
      let input = toDiv.querySelector("input[type='text']");
      expect(input).not.toBe(null);
    });
  });

  describe("generateMessage function", () => {
    let messageDiv;
    beforeEach(() => {
      document.body.innerHTML = "";
      document.body.appendChild(forms.generateMessage());
      messageDiv = document.querySelector("div");
    });
    it("has a class of form_elem", () => {
      let formElem = document.querySelector(".form_elem");
      expect(formElem).not.toBe(null);
    });
    it("has a class of message_form", () => {
      let messageForm = document.querySelector(".message_form");
      expect(messageForm).not.toBe(null);
    });
    it("contains a textarea element", () => {
      let messageArea = messageDiv.querySelector("textarea");
      expect(messageArea).not.toBe(null);
    });
    it("has a text area with a maxlength of 100chr", () => {
      let messageArea = messageDiv.querySelector("textarea");
      expect(messageArea.maxLength).toBe(100);
    });
  });

  describe("generateTags function", () => {
    let tagsDiv;
    beforeEach(() => {
      document.body.innerHTML = "";
      document.body.appendChild(forms.generateTags());
      tagsDiv = document.querySelector("div");
    });
    it("has a class of tags_elem", () => {
      let tagsElem = tagsDiv.querySelector(".tag_option");
      expect(tagsElem).not.toBe(null);
    });
    it("contains a label element", () => {
      let label = tagsDiv.querySelector("label");
      expect(label).not.toBe(null);
    });
    it("contain a select elem", () => {
      let select = tagsDiv.querySelector("select");
      expect(select).not.toBe(null);
    });
  });
  describe("generateForm function", () => {
    let form;
    beforeEach(() => {
      document.body.innerHTML = `<div class="wrapper" id="wrapper"></div>`;
      forms.generateForm();
      form = document.querySelector("form");
    });
    it("has a class of card", () => {
      let formClass = document.querySelector(".card");
      expect(formClass).not.toBe(null);
    });
  });
});
