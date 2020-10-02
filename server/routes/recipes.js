const Router = require("koa-router");
const router = new Router();
const { getRecipes } = require("../spoonAPI");
const { db, saveRecipe } = require("../db");

module.exports = router.routes();

//search recipes by ingredients
router.get("/", async (ctx, next) => {
  if (!ctx.query || !ctx.query.ingredients)
    ctx.throw(404, "Could not get recipes");
  const recipes = await getRecipes(ctx.query);
  ctx.body = recipes;
});

//save a recipe to a user account
router.post("/", async (ctx, next) => {
  if (!ctx.session.user) ctx.throw(404, "Must be logged in to save recipe");
  const userId = ctx.session.user.uid;
  const recipe = await saveRecipe(ctx.request.body, userId);
  if (!recipe) ctx.throw(500, "Could not add recipe");
  ctx.status = 201;
});

//get a users saved recipes
router.get("/saved", async (ctx, next) => {
  if (!ctx.session.user) ctx.throw(404, "Must be logged in for saved recipes");
  const recipes = [];
  const recipeCollection = db.collection(ctx.session.user.uid);
  const snapshot = await recipeCollection.get();
  snapshot.forEach((doc) => {
    recipes.push(doc.data());
  });
  ctx.body = recipes;
});

//remove a recipe from a user's account
router.delete("/:title", async (ctx, next) => {
  if (!ctx.session.user) ctx.throw(404, "Must be logged in to remove a recipe");
  await db.collection(ctx.session.user.uid).doc(ctx.params.title).delete();
  ctx.status = 200;
});
