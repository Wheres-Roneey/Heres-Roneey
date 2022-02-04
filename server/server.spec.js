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
  let testData = {
    to: "EW",
    body: " a message under two hundred characters",
    tags: "motivated",
    replies: ["hello", "I agree"],
    gif: "https://media0.giphy.com/media/y9uEf41y1rmBMbNVr8/giphy.gif?cid=70c8e1eblr2sep5pq5j0yzqlm81wxi97x2xf15hmsrmun25y&rid=giphy.gif&ct=g"
  };

  let testGif = {
    id: 2,
    gif: "https://media0.giphy.com/media/y9uEf41y1rmBMbNVr8/giphy.gif?cid=70c8e1eblr2sep5pq5j0yzqlm81wxi97x2xf15hmsrmun25y&rid=giphy.gif&ct=g"
  };

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
  it("GET /messages responds with status code 200", (done) => {
    request(app).get("/messages").expect(200, done);
  });

  it("GET /messages?q responds with json", (done) => {
    request(app)
      .get("/messages?q")
      .expect("Content-Type", "application/json; charset=utf-8", done);
  });

  it("GET /messages responds with status code 200", (done) => {
    request(app).get("/messages").expect(200, done);
  });

  it("POST /message/gif responds with a status code 201", (done) => {
    request(app)
      .post("/messages/gif")
      .send(testGif)
      .expect(201)
      .expect("gif added", done);
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

  it("POST /messages with status code 201 with correct params", (done) => {
    request(app)
      .post("/messages/")
      .send(testData)
      .expect("message added")
      .expect(201, done);
  });
});
