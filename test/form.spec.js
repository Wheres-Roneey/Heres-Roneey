/**
 * @jest-environment jsdom
 */
const forms = require("../client/form");
describe("THE FORMS", () => {
  describe("generateTo function", () => {
    beforeEach(() => {
      document.body.innerHTML = "";
      document.body.appendChild(forms.generateTo());
    });
    it("provides a class of form elem", () => {
      let formElem = document.querySelector(".form_elem");
      expect(formElem).not.toBe(null);
    });
  });
});
