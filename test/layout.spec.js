/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const path = require("path");
const html = fs.readFileSync(
  path.resolve(__dirname, "../client/index.html"),
  "utf8"
);

describe("index.html", () => {
  beforeEach(() => {
    document.documentElement.innerHTML = html.toString();
  });

  describe("head", () => {
    test("has a title", () => {
      const title = document.querySelector("head title");
      expect(title).toBeTruthy();
      expect(title.textContent).toContain("Tl;dr");
    });
  });

  describe("body", () => {
    describe("button", () => {
      test("contains button for changing colour modes", () => {
        const lightMode = document.getElementsByClassName("#light-mode");

        expect(lightMode).toBeTruthy();
      });
      test("contains icons", () => {
        const fasFaMoon = document.getElementsByClassName(".fas fa-moon");
        expect(fasFaMoon).toBeTruthy();
      });
    });

    describe("div", () => {
      test("contains wrap for title, div for the title and buttons within", () => {
        const titleWrap = document.getElementsByClassName(".titleWrap");
        expect(titleWrap).toBeTruthy();
      });
      test("contains div for the title ", () => {
        const titleDiv = document.getElementsByClassName(".titleDiv");
        expect(titleDiv).toBeTruthy();
      });

      test("contains h1 ", () => {
        const h1 = document.querySelector("h1");
        expect(h1).toBeTruthy();
      });
    });

    describe("button", () => {
      test("contains button  for tag bar", () => {
        const btns = document.getElementsByClassName(".btns");

        expect(btns).toBeTruthy();
      });
    });
  });
});

// describe('submit button', () => {
//   test('it says sign up', () => {
//       submit = form.querySelector('[type="submit"]')
//       expect(submit.value).toBe('Sign Up');
//   })
// })

//         describe('main', () => {

//             describe('form', () => {
//                 let form;
//                 let nameInput, submit;
//                 beforeEach(() => {
//                     form = document.querySelector('form')
//                     // let age = form.querySelector('#age')
//                     // let eyeColor = form.querySelector('#eye-colour')
//                     // let hairColor = form.querySelector('#hair-colour')
//                     // let pokemon = form.querySelector('#pokemon')
//                 })
//                 test('it exists', () => {
//                     expect(form).toBeTruthy();
//                 })
//                 describe('name input', () => {
//                     beforeEach(() => {
//                         nameInput = form.querySelector('#name')
//                     })
//                     test('it exists', () => {
//                         expect(nameInput).toBeTruthy();
//                     })
//                     test('it is a text input', () => {
//                         expect(nameInput.getAttribute('type')).toBe('text');
//                     })
//                     test('it has a label', () => {
//                         expect(document.querySelector('[for="name"]')).toBeTruthy();
//                     })
//                 })
//                 // Repeat for all inputs
//                 describe('submit button', () => {
//                     test('it says sign up', () => {
//                         submit = form.querySelector('[type="submit"]')
//                         expect(submit.value).toBe('Sign Up');
//                     })
//                 })
//             })

//         })

//     })

// })
