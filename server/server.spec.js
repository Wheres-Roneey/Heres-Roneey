import mock from "mock-fs";
const request = require("supertest");
const app = require("./app.js");

// starting and stopping server
describe("api server", () => {
  let api;
  let messages;

  beforeAll(() => {
    api = app.listen(5000, () =>
      console.log("Test server running on port 5000")
    );
    mock({
      folderName: {
        "index.md": "# Hello world!"
      }
    });
  });

  afterAll((done) => {
    console.log("Stopping Server");
    api.close(done);
    mock.restore();
  });

  // testing get requests
  describe("/messages", () => {
    let testData = [
      {
        to: "EW",
        body: " a message under two hundred characters",
        tags: "motivated",
        replies: ["hello", "I agree"],
        gif: "https://media0.giphy.com/media/y9uEf41y1rmBMbNVr8/giphy.gif?cid=70c8e1eblr2sep5pq5j0yzqlm81wxi97x2xf15hmsrmun25y&rid=giphy.gif&ct=g",
        reacts: [3, 1, 4]
      }
    ];

    it("GET /messages responds with status code 200", (done) => {
      request(app).get("/messages").expect(200, done);
    });

    it("GET /messages responds with all test data", (done) => {
      request(app)
        .get("/messages")
        .expect(
          [
            {
              to: "EW",
              body: " a message under two hundred characters",
              tags: "motivated",
              replies: ["hello", "I agree"],
              gif: "https://media0.giphy.com/media/y9uEf41y1rmBMbNVr8/giphy.gif?cid=70c8e1eblr2sep5pq5j0yzqlm81wxi97x2xf15hmsrmun25y&rid=giphy.gif&ct=g",
              reacts: [3, 1, 4]
            }
          ],
          done
        );
    });
  });
});
