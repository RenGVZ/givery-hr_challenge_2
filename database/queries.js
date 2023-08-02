const db = require("./db")

const getAllRecipes = async () => {
  const query = "SELECT * FROM recipes"

  try {
    const [rows] = await db.query(query)
    return rows
  } catch (error) {
    throw error
  }
}

const insertRecipe = async (recipeData) => {
  const { title, making_time, serves, ingredients, cost } = recipeData

  const query = `
    INSERT INTO recipes (title, making_time, serves, ingredients, cost)
    VALUES (?, ?, ?, ?, ?)
  `

  try {
    const [result] = await db.query(query, [
      title,
      making_time,
      serves,
      ingredients,
      cost,
    ])
    return result.insertId
  } catch (error) {
    throw error
  }
}

const getRecipe = async (id) => {
  const [rows] = await db.query(
    `
  SELECT *
  FROM recipes
  WHERE id = ?
  `,
    [id]
  )
  return rows[0]
}

const updateRecipe = async (recipeId, updatedData) => {
  const fieldsToUpdate = Object.keys(updatedData).filter(
    (field) => field !== "id"
  ) // Exclude 'id' field
  const fieldValues = fieldsToUpdate.map((field) => `${field} = ?`).join(", ")
  const values = fieldsToUpdate.map((field) => updatedData[field])
  const query = `
    UPDATE recipes
    SET ${fieldValues}
    WHERE id = ?
  `

  try {
    const [result] = await db.query(query, [...values, recipeId])

    if (result.affectedRows === 0) {
      return null
    }

    return recipeId
  } catch (error) {
    throw error
  }
}

const deleteRecipeById = async (recipeId) => {
  const query = "DELETE FROM recipes WHERE id = ?"

  try {
    const [result] = await db.query(query, [recipeId])

    if (result.affectedRows === 0) {
      return false
    }

    return true
  } catch (error) {
    throw error
  }
}

module.exports = {
  getAllRecipes,
  insertRecipe,
  getRecipe,
  updateRecipe,
  deleteRecipeById,
}
