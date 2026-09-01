const express = require('express');
const router = express.Router();
const foodController = require('../controllers/foodController');

// All foods & Create food
router.route('/')
    .get(foodController.getAllFoods)
    .post(foodController.createFood);

// Update & Delete by ID
router.route('/:id')
    .put(foodController.updateFood)
    .delete(foodController.deleteFood);

module.exports = router;