const { init } = require("express/lib/application");
const request = require("supertest");
const { app } = require("./server/app");

// starting and stopping server
describe("api server", () => {
  let api;
});

beforeAll(() => {
  api = server.listen(5000, () =>
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
      gif: "https://media0.giphy.com/media/y9uEf41y1rmBMbNVr8/giphy.gif?cid=70c8e1eblr2sep5pq5j0yzqlm81wxi97x2xf15hmsrmun25y&rid=giphy.gif&ct=g"
    }
  ];

  it("GET /messages responds with status code 400", (done) => {
    request(app).get("/messages").expect(400, done);
  });
});
