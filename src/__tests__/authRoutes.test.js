/**
 * @jest-environment node
 */

const request = require("supertest");
const { server } = require("../../server");
const agent = request.agent(server);
const { createSession } = require("./login");

const user = {
  email: "testtest@test.com",
  password: "test1234",
};

// close the server after each test
afterAll(() => {
  server.close();
  console.log("server closed!");
});

describe("POST sign up route", () => {
  let response;

  beforeAll(async () => {
    response = await request(server)
      .post("/api/signup")
      .set({ withCredentials: true })
      .send(user);
  });

  it("sends a 200 status code", () => {
    expect(response.statusCode).toBe(200);
  });
});

describe("POST sign in route", () => {
  let response;

  beforeAll(async () => {
    response = await request(server).post("/api/auth/signin").send(user);
  });

  it("sends a 200 status code", () => {
    expect(response.statusCode).toBe(200);
  });

  it("sends back the signed in user's id", async () => {
    expect(response.body).toHaveProperty("id");
  });
});

describe("GET user", () => {
  it("sends back an empty object when user is not logged in", async () => {
    const response = await request(server).get("/api/auth");
    expect(response.statusCode).toBe(200);
    expect(Object.keys(response.body).length).toBe(0);
  });

  it("sends back the user's id when the user is logged in", async () => {
    await createSession(agent, user);
    const response = await agent.get("/api/auth");

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("id");
  });
});
