/**
 * @jest-environment node
 */

async function createSession(agent, user) {
  const res = await agent.post("/api/auth/signin").send(user);
  expect(res.statusCode).toBe(200);
  const cookie = res.headers["set-cookie"][0]
    .split(",")
    .map((item) => item.split(";")[0]);
  agent.jar.setCookies(cookie);
}

module.exports = { createSession };
