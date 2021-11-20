const Joi = require('joi');
const mongoose = require('mongoose');

const Inventory = mongoose.model('Inventory', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  price: {
    type: Number,
    min: 1,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  }
}));

function validateInventory(inventory) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    price: Joi.number().min(1).required(),
    quantity: Joi.number().min(1).required()
  });

  return schema.validate(inventory);
}

exports.Inventory = Inventory; 
exports.validate = validateInventory;