const request = require("supertest");
const app = require("./app");

// starting and stopping server
describe("api server", () => {
  let api;

  beforeAll(() => {
    api = app.listen(5000, () =>
      console.log("Test server running on port 5000")
    );
  });

  afterAll((done) => {
    console.log("Stopping Server");
    api.close(done);
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

    let testGif = {
      id: 2,
      gif: "https://media0.giphy.com/media/y9uEf41y1rmBMbNVr8/giphy.gif?cid=70c8e1eblr2sep5pq5j0yzqlm81wxi97x2xf15hmsrmun25y&rid=giphy.gif&ct=g"
    };

    it("GET /messages responds with status code 200", (done) => {
      request(app).get("/messages").expect(200, done);
    });

    it("GET /messages?q responds with json", (done) => {
      request(app)
        .get("/messages?q")
        .expect("Content-Type", "application/json; charset=utf-8", done);
    });

    it("POST /message/gif responds with a status code 201", (done) => {
      request(app)
        .post("/messages/gif")
        .send(testGif)
        .expect(201)
        .expect("gif added", done);
    });
  });
});
