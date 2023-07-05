/*
Kontrolleri on tehty jotta saadaan sovellukseen parempi arkkitehtuuri.
Reitit ja tietokantahakujen sovelluslogiikka on erotettu toisistaan.
*/
// Haetaan model
const Recipe = require('../models/Recipe');

// tietokannan käsittelymetodit tehdään olion sisään
const RecipeController = {
  // Haetaan kaikki reseptit
  findAll: async (req, res) => {
    try {
      const recipes = await Recipe.find({});
      res.status(200).json(recipes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  // Haetaan yksittäinen resepti
  findOneRecipe: async (req, res) => {
    await Recipe.findOne({ id: req.params.id }).then((recipe) => {
      res.status(200).json(recipe);
    });
  },
  // Lisätään resepti
  addNewRecipe: async (req, res) => {
    await Recipe.create(req.body).then((recipe) => {
      res.status(200).json(recipe);
    });
  },
  // Poistetaan resepti
  deleteRecipe: async (req, res) => {
    await Recipe.deleteOne({ id: req.params.id }).then((recipe) => {
      res.status(200).json(recipe);
    });
  },

  // Päivitetään resepti (Ei vielä käytössä clientissa)
  // updateRecipe: async (req, res) => {
  //   try {
  //     const { id } = req.params;
  //     const recipe = await Recipe.findByIdAndUpdate(id, req.body);
  //     if (!recipe) {
  //       return res
  //         .status(404)
  //         .json({ message: `Cannot find any product with ID ${id}` });
  //     }
  //     const updatedRecipe = await Recipe.findById(id);
  //     res.status(200).json(updatedRecipe);
  //   } catch (error) {
  //     console.log(error.message);
  //     res.status(500).json({ message: error.message });
  //   }
  // },

  updateRecipe: async (req, res) => {
    await Recipe.findOneAndUpdate({ id: req.params.id }, req.body)
      .then((result) => {
        res.status(200).json({ result });
      })
      .catch((err) => {
        return res.status(500).json({ message: err.message });
      });
  },
};

module.exports = RecipeController;
