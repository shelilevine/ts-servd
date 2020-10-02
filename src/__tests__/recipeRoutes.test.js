/**
 * @jest-environment node
 */

const request = require("supertest");
const { server } = require("../../server");
const agent = request.agent(server);
const { createSession } = require("./login");

// close the server after each test
afterAll(() => {
  server.close();
  console.log("server closed!");
});

describe("GET recipes", () => {
  let query, response;
  beforeAll(async () => {
    query = { ingredients: "potato" };
    response = await request(server)
      .get("/api/recipes")
      .set({ withCredentials: false })
      .query(query);
  });

  it("should return status code 200", () => {
    expect(response.status).toEqual(200);
  });

  it("should return 6 recipes", () => {
    expect(JSON.parse(response.text).length).toEqual(6);
  });

  it("should recipes with the queried ingredients", () => {
    expect(response.text).toContain(query.ingredients);
  });
});

describe("POST save a recipe to user account", () => {
  let saveRecipeResponse;

  const recipe = {
    title: "Banana Pancakes",
    steps: [],
    sourceUrl: null,
    imgUrl: null,
    time: 120,
    ingredients: ["banana", "sugar"],
    servings: 3,
  };

  const user = {
    email: "testtest@test.com",
    password: "test1234",
  };

  beforeAll(async () => {
    await createSession(agent, user);

    saveRecipeResponse = await agent.post("/api/recipes").send(recipe);
  });

  it("should respond with a 201", () => {
    expect(saveRecipeResponse.statusCode).toBe(201);
  });

  describe("GET a user's saved recipes", () => {
    let response;
    beforeAll(async () => {
      response = await agent.get("/api/recipes/saved");
    });

    it("should return status code of 200", () => {
      expect(response.statusCode).toBe(200);
    });

    it("should return all saved recipes for a  user", () => {
      expect(response.body.length).toEqual(1);
    });

    it("should return the details of a saved recipe", () => {
      expect(response.body[0].title).toEqual(recipe.title);
      expect(JSON.stringify(response.body[0].ingredients)).toEqual(
        JSON.stringify(recipe.ingredients)
      );
    });
  });
});
