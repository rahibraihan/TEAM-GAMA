const Food = require('../models/Food');

// Get all foods
exports.getAllFoods = async (req, res) => {
  try {
    const foods = await Food.find();
    res.status(200).json({
      success: true,
      count: foods.length,
      data: foods,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create a new food item
exports.createFood = async (req, res) => {
  try {
    const newFood = await Food.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Food item added successfully!',
      data: newFood,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
// Update Food
exports.updateFood = async (req, res) => {
    try {
        const updatedFood = await Food.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedFood) {
            return res.status(404).json({ success: false, message: "Food item not found" });
        }
        res.status(200).json({ success: true, message: "Food updated successfully!", data: updatedFood });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Delete Food
exports.deleteFood = async (req, res) => {
    try {
        const deletedFood = await Food.findByIdAndDelete(req.params.id);
        if (!deletedFood) {
            return res.status(404).json({ success: false, message: "Food item not found" });
        }
        res.status(200).json({ success: true, message: "Food deleted successfully!" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};