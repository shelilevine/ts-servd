/* eslint-disable symbol-description */
/* eslint-disable camelcase */
const Router = require("koa-router");
const router = new Router();
const { firebase } = require("../index");
const { admin } = require("../db");
const { getUserData, parseUserData } = require("../utility");

module.exports = router.routes();

let firebase_auth_wrap = async (promise) => {
  let rejected = Symbol();
  let value_or_error = await promise.catch((error) => {
    return { [rejected]: true, error: error };
  });

  if (value_or_error[rejected]) {
    throw value_or_error.error;
  } else {
    return value_or_error;
  }
};

router.post("/signup", async (ctx, next) => {
  const { email, password } = ctx.request.body;
  const user = await firebase_auth_wrap(
    firebase.auth().createUserWithEmailAndPassword(email, password)
  );
  ctx.session.user = user.user;
  ctx.body = getUserData(user.user);
});

router.post("/signin", async (ctx, next) => {
  const { email, password } = ctx.request.body;
  const user = await firebase_auth_wrap(
    firebase.auth().signInWithEmailAndPassword(email, password)
  );
  ctx.session.user = user.user;
  ctx.body = getUserData(user.user);
});

router.post("/signout", async (ctx, next) => {
  await firebase.auth().signOut();
  ctx.session = null;
  ctx.body = "logout success";
});

router.post("/google", async (ctx, next) => {
  const id_token = ctx.request.body.token;
  const credential = await firebase.auth.GoogleAuthProvider.credential(
    id_token
  );
  const user = await firebase.auth().signInWithCredential(credential);
  ctx.session.user = user.user;
  ctx.body = getUserData(user.user);
});

router.get("/", (ctx, next) => {
  const user = ctx.session.user ? getUserData(ctx.session.user) : {};
  ctx.body = user;
});

router.put("/", async (ctx, next) => {
  if (!ctx.session.user) ctx.throw(404, "Not logged in");
  const updatedInfo = parseUserData(ctx.request.body);
  const user = await admin.auth().updateUser(ctx.session.user.uid, updatedInfo);
  ctx.session.user = user;
  ctx.body = getUserData(user);
});
