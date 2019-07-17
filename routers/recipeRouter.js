const express = require("express");
const router = express.Router();

const { validateRecipe } = require("../middleware");

const recipeDb = require("../data/dbConfig");

router.get("/", async (req, res, next) => {
  try {
    const recipes = await recipeDb("recipes");
    res.status(200).json(recipes);
  } catch (error) {
    // error.status = 500;
    next(error);
  }
});

router.get("/:recipeId", async (req, res, next) => {
  console.log("inside here");
  const { recipeId } = req.params;
  try {
    const recipe = await recipeDb("recipes")
      .where({ id: recipeId })
      .first();
    if (recipe) {
      res.status(200).json(recipe);
    } else {
      const error = Error("No entry at that id");
      error.status = 404;
      next(error);
    }
    // const recipe = await recipeDb("recipes")
    //   .where({ id: recipeId })
    // if (recipe.length !== 0) {
    //   res.status(200).json(recipe[0]);
    // } else {
    //   res.status(404).json({ errorMessage: "There is nothing there" });
    // }
  } catch (error) {
    next(error);
  }
});

router.post("/", validateRecipe, async (req, res) => {
  try {
    // const arrayOfIds = recipeDb("recipes").insert(req.body, "id");
    const [id] = await recipeDb("recipes").insert(req.body, "id");
    const recipe = await recipeDb("recipes")
      .where({ id })
      .first();
    if (recipe) {
      res.status(200).json(recipe);
    } else {
      res.status(404).json({ errorMessage: "There is nothing there" });
    }
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ errorMessage: "Something went wrong when adding the recipe" });
  }
});

router.put("/:recipeId", validateRecipe, async (req, res) => {
  const id = req.params.recipeId;
  try {
    const count = await recipeDb("recipes")
      .where({ id })
      .update(req.body);
    if (count > 0) {
      const recipe = await recipeDb("recipes")
        .where({ id })
        .first();
      res.status(200).json(recipe);
    } else {
      res.status(422).json({ error: "There is no record there" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ errorMessage: "Something went wrong when adding the recipe" });
  }
});

module.exports = router;
