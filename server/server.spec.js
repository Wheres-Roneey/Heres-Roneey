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
    let testReply = {
      id: 1,
      replies: "hi"
    };
    let testReact = {
      id: 1,
      astonish: 1,
      heartEye: 2,
      thumbsDown: 3
    };
    it("GET / with status 200", (done) => {
      request(api).get("/").expect(200, done);
    });

    it("GET /messages responds with status code 200", (done) => {
      request(app).get("/messages").expect(200, done);
    });

    it("POST /messages/reply with status code 406 with no params", (done) => {
      request(app).post("/messages/reply").expect(406, done);
    });

    it("POST /messages/reply with status code 201 with correct params", (done) => {
      request(app)
        .post("/messages/reply")
        .send(testReply)
        .expect("Reply added")
        .expect(201, done);
    });

    it("POST /messages/reacts with status code 201 with correct params", (done) => {
      request(app)
        .post("/messages/react")
        .send(testReact)
        .expect("react added")
        .expect(201, done);
    });
  });
});
