/*
Kontrolleri on tehty jotta saadaan sovellukseen parempi arkkitehtuuri.
Reitit ja tietokantahakujen sovelluslogiikka on erotettu toisistaan.
*/
// Haetaan model
const Recipe = require('../models/Recipe');

// tietokannan käsittelymetodit tehdään olion sisään
const RecipeController = {
  findAll: async (req, res) => {
    try {
      const recipes = await Recipe.find({});
      res.status(200).json(recipes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Nää täytys tehä

  // findOneRecipe: async (req, res) => {
  //   await Recipe.findOne({ id: req.params.id }).then((recipe) => {
  //     res.status(200).json(recipe);
  //   });
  // },

  addNewRecipe: async (req, res) => {
    await Recipe.create(req.body).then((recipe) => {
      res.status(200).json(recipe);
    });
  },

  // deleteRecipe: async (req, res) => {
  //   const { id } = req.params;
  //   await Recipe.findByIdAndDelete(id).then((recipe) => {
  //     res.status(200).json(recipe);
  //   });
  // },
};

module.exports = RecipeController;
