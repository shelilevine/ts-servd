const Koa = require("koa");
const morgan = require("koa-morgan");
const app = new Koa();
const Router = require("koa-router");
const router = new Router();
const mount = require("koa-mount");
const path = require("path");
const koaBody = require("koa-body");
const session = require("koa-session");
const cors = require("@koa/cors");
const compress = require("koa-compress");
const fs = require("fs");
const PORT = process.env.PORT || 8080;
const firebase = require("firebase/app");
require("firebase/auth");
const { firebaseConfig, keys } = require("../secrets");
firebase.initializeApp(firebaseConfig);

module.exports = { app, firebase };

// set up logger
app.use(morgan("dev"));

//set up body parser
app.use(koaBody());

//enable CORS
app.use(cors({ credentials: true }));

//enable compression
app.use(compress());

//session middleware
app.keys = keys;
app.use(session(app));

//error handling middleware
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
    ctx.app.emit("error", err, ctx);
  }
});

// API routes
require("./routes")(router);
app.use(mount("/api", router.routes()));

//static middleware
app.use(require("koa-static")(path.join(__dirname, "..", "build")));

//Send index.html for requests to non-api routes
app.use((ctx) => {
  ctx.response.type = "html";
  ctx.response.body = fs.createReadStream(
    path.join(__dirname, "..", "build/index.html")
  );
});

//start listening to requests
const server = app.listen(PORT, () =>
  console.log(`Mixing it up on port ${PORT}`)
);

module.exports.server = server;
