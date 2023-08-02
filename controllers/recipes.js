const recipesRouter = require("express").Router()
const queries = require("../database/queries")

recipesRouter.get("/", async (req, res) => {
  try {
    const recipes = await queries.getAllRecipes()
    // format res to not include created_at and updated_at
    const formattedRecipes = recipes.map((recipe) => {
      const { created_at, updated_at, ...rest } = recipe
      return rest
    })
    res.json(formattedRecipes).status(200)
  } catch (error) {
    console.error(error)
    res.status(404).json({ error: "An error occurred" })
  }
})

recipesRouter.post("/", async (req, res) => {
  const recipeData = req.body

  try {
    const newRecipeId = await queries.insertRecipe(recipeData)
    res.status(200).json({
      message: "Recipe successfully created!",
      recipe: [
        {
          id: newRecipeId,
          ...recipeData,
          created_at: new Date().toISOString().slice(0, 19).replace("T", " "),
          updated_at: new Date().toISOString().slice(0, 19).replace("T", " "),
        },
      ],
    })
  } catch (error) {
    console.error(error)
    res
      .status(404)
      .json({
        message: "Recipe creation failed!",
        required: "title, making_time, serves, ingredients, cost",
      })
  }
})

recipesRouter.get("/:id", async (req, res) => {
  const id = req.params.id

  try {
    const recipe = await queries.getRecipe(id)
    if (recipe) {
      const formattedRecipe = {
        message: "Recipe details by id",
        recipe: {
          id: recipe.id,
          title: recipe.title,
          making_time: recipe.making_time,
          serves: recipe.serves,
          ingredients: recipe.ingredients,
          cost: recipe.cost,
        }
      }
      res.json(formattedRecipe).status(200)
    } else {
      res.status(404).json({ error: "Recipe not found" })
    }
  } catch (error) {
    console.error(error)
    res.status(404).json({ error: "An error occurred" })
  }
})

recipesRouter.patch("/:id", async (req, res) => {
  const id = req.params.id
  const updatedData = req.body

  try {
    const updatedRecipe = await queries.updateRecipe(id, updatedData)
    if (updatedRecipe) {
      // get the updated recipe
      const recipe = await queries.getRecipe(id)
      const formattedRecipe = {
        message: "Recipe successfully updated!",
        recipe: [
          {
            title: recipe.title,
            making_time: recipe.making_time,
            serves: recipe.serves,
            ingredients: recipe.ingredients,
            cost: recipe.cost,
          },
        ],
      }
      res.json(formattedRecipe).status(200)
    } else {
      res.status(404).json({ error: "Recipe not found" })
    }
  } catch (error) {
    console.error(error)
    res.status(404).json({ error: "An error occurred" })
  }
})

recipesRouter.delete("/:id", async (req, res) => {
  const id = req.params.id
  console.log("id:", id)

  try {
    const deletedRecipe = await queries.deleteRecipeById(id)
    if (deletedRecipe) {
      res.json(deletedRecipe).status(200).message("Recipe successfully removed!")
    } else {
      res.status(404).json({ error: "No recipe found" })
    }
  } catch (error) {
    console.error(error)
    res.status(404).json({ error: "An error occurred" })
  }
})

module.exports = recipesRouter
